
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatError {
  message: string;
  code?: 'MISSING_API_KEY' | 'INVALID_REQUEST' | 'RATE_LIMITED' | 'OPENAI_ERROR' | 'INTERNAL' | 'TIMEOUT' | 'NETWORK_ERROR';
  correlationId?: string;
  details?: any;
}

const MAX_MESSAGE_LENGTH = 2000;
const REQUEST_TIMEOUT = 15000; // 15 seconds
const MAX_RETRIES = 2;

class ChatService {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private validateMessage(message: string): void {
    if (!message || typeof message !== 'string') {
      throw new Error('Le message est requis et doit être une chaîne de caractères');
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Le message ne peut pas dépasser ${MAX_MESSAGE_LENGTH} caractères`);
    }
  }

  private validateConversationHistory(history: ChatMessage[]): void {
    if (!Array.isArray(history)) {
      throw new Error('L\'historique de conversation doit être un tableau');
    }
    if (history.length > 20) {
      throw new Error('L\'historique de conversation ne peut pas dépasser 20 messages');
    }
  }

  private normalizeError(error: any, correlationId?: string): ChatError {
    console.error("Chat service error:", error, "Correlation ID:", correlationId);

    // Handle structured errors from Edge Function
    if (error.error_code) {
      return {
        message: error.error || error.message || "Erreur inconnue",
        code: error.error_code,
        correlationId: error.correlation_id || correlationId,
        details: error
      };
    }

    // Handle timeout errors
    if (error.name === 'AbortError') {
      return {
        message: "La requête a expiré. Veuillez réessayer.",
        code: 'TIMEOUT',
        correlationId
      };
    }

    // Handle network errors
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return {
        message: "Erreur de connexion. Vérifiez votre connection internet.",
        code: 'NETWORK_ERROR',
        correlationId
      };
    }

    // Handle validation errors
    if (error.message?.includes('caractères') || error.message?.includes('requis')) {
      return {
        message: error.message,
        code: 'INVALID_REQUEST',
        correlationId
      };
    }

    // Handle API key errors
    if (error.message?.includes('OpenAI API key') || error.message?.includes('OPENAI_API_KEY')) {
      return {
        message: "Clé API OpenAI non configurée. Veuillez configurer votre clé API dans les paramètres.",
        code: 'MISSING_API_KEY',
        correlationId
      };
    }

    // Generic error
    return {
      message: error.message || "Erreur lors de la communication avec le service de chat",
      code: 'INTERNAL',
      correlationId
    };
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
    const latestMessage = messages[messages.length - 1];
    if (!latestMessage || latestMessage.role !== 'user') {
      throw new Error("Le dernier message doit être de l'utilisateur");
    }

    // Validation
    this.validateMessage(latestMessage.content);
    const conversationHistory = messages.slice(0, -1); // Keep full ChatMessage objects
    this.validateConversationHistory(conversationHistory);

    let lastError: any;
    
    // Retry logic with exponential backoff
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        console.log(`Sending to agrimarket-chat (attempt ${attempt + 1}):`, {
          message: latestMessage.content.substring(0, 100) + (latestMessage.content.length > 100 ? '...' : ''),
          historyLength: conversationHistory.length
        });

        // Send simplified format to Edge Function (role/content only)
        const { data, error } = await supabase.functions.invoke('agrimarket-chat', {
          body: { 
            message: latestMessage.content,
            conversation_history: conversationHistory.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          }
        });

        clearTimeout(timeoutId);

        if (error) {
          console.error("Edge Function error:", error);
          throw error;
        }

        if (!data) {
          throw new Error("Aucune réponse reçue du service de chat");
        }

        // Log correlation ID if available
        if (data.correlation_id) {
          console.log("Response correlation ID:", data.correlation_id);
        }

        // Handle both new format (message) and old format (reply) for backward compatibility
        const responseContent = data.message || data.reply;
        
        if (!responseContent) {
          console.error("Invalid response format:", data);
          throw new Error("Format de réponse invalide du service de chat");
        }

        return {
          role: 'assistant',
          content: responseContent,
          timestamp: new Date()
        };

      } catch (error) {
        lastError = error;
        
        // Don't retry on validation errors or API key errors
        const normalizedError = this.normalizeError(error);
        if (normalizedError.code === 'INVALID_REQUEST' || normalizedError.code === 'MISSING_API_KEY') {
          throw normalizedError;
        }

        // Don't retry on final attempt
        if (attempt === MAX_RETRIES) {
          break;
        }

        // Exponential backoff: 1s, 2s for retries
        const delayMs = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${delayMs}ms...`);
        await this.delay(delayMs);
      }
    }

    // All retries failed
    throw this.normalizeError(lastError);
  }
}

export const chatService = new ChatService();
