
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class ChatService {
  async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
    try {
      // Get the latest user message
      const latestMessage = messages[messages.length - 1];
      if (!latestMessage || latestMessage.role !== 'user') {
        throw new Error("Le dernier message doit être de l'utilisateur");
      }

      // Format conversation history (exclude the latest message)
      const conversationHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      console.log("Sending to agrimarket-chat:", {
        message: latestMessage.content,
        conversation_history: conversationHistory
      });

      const { data, error } = await supabase.functions.invoke('agrimarket-chat', {
        body: { 
          message: latestMessage.content,
          conversation_history: conversationHistory 
        }
      });

      if (error) {
        console.error("Erreur lors de l'appel à la fonction de chat:", error);
        
        // Check if it's an OpenAI API key issue
        if (error.message?.includes('OpenAI API key') || error.message?.includes('OPENAI_API_KEY')) {
          throw new Error("Clé API OpenAI non configurée. Veuillez configurer votre clé API dans les paramètres.");
        }
        
        throw new Error(error.message || "Erreur lors de la communication avec le service de chat");
      }

      if (!data) {
        throw new Error("Aucune réponse reçue du service de chat");
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
      console.error("Erreur lors de l'envoi du message:", error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
