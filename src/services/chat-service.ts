
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class ChatService {
  async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
    try {
      // Convertir nos messages au format attendu par l'API OpenAI
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('agrimarket-chat', {
        body: { messages: formattedMessages }
      });

      if (error) {
        console.error("Erreur lors de l'appel à la fonction de chat:", error);
        throw new Error(error.message);
      }

      if (!data || !data.reply) {
        throw new Error("Réponse invalide du service de chat");
      }

      return {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      };
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
