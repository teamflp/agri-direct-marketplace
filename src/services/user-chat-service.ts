// @ts-nocheck
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel, User } from '@supabase/supabase-js';

// Since the new tables are not yet in the auto-generated types,
// we define them here. In a real workflow, we would regenerate
// the types from the database schema.

export type ChatUserProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  // In a real app, you would add avatar_url here if it exists
};

export type Conversation = {
  id: string;
  created_at: string;
  participants: string[];
  // Enriched data
  other_participant: ChatUserProfile;
  last_message: Message | null;
};

export type Message = {
  id: string;
  created_at: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  // Enriched data
  sender: ChatUserProfile;
};

class UserChatService {

  /**
   * Fetches all conversations for a given user.
   * NOTE: This implementation has a N+1 query problem for fetching last messages and participant profiles.
   * For a production app, this should be optimized, probably with a database function (RPC).
   */
  async getConversations(userId: string): Promise<Conversation[]> {
    const { data: conversationsData, error } = await supabase
      .from('am_conversations')
      .select('id, created_at, participants')
      .contains('participants', [userId]);

    if (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }

    const conversations: Conversation[] = await Promise.all(
      conversationsData.map(async (convo) => {
        const otherParticipantId = convo.participants.find(p => p !== userId);

        let other_participant: ChatUserProfile = { id: '', first_name: 'Utilisateur', last_name: 'Supprimé' };
        if (otherParticipantId) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('id, first_name, last_name')
            .eq('id', otherParticipantId)
            .single();
          if (profileData) {
            other_participant = profileData;
          }
        }

        const { data: lastMessageData } = await supabase
          .from('am_messages')
          .select('*, sender:profiles(id, first_name, last_name)')
          .eq('conversation_id', convo.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        return {
          ...convo,
          other_participant,
          last_message: lastMessageData as Message | null,
        };
      })
    );

    // Sort conversations by last message date
    conversations.sort((a, b) => {
        if (!a.last_message) return 1;
        if (!b.last_message) return -1;
        return new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime();
    });

    return conversations;
  }

  /**
   * Fetches all messages for a given conversation ID.
   */
  async getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('am_messages')
      .select('*, sender:profiles(id, first_name, last_name)')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return data as Message[];
  }

  /**
   * Finds an existing conversation between two users or creates a new one.
   */
  async findOrCreateConversation(userId1: string, userId2: string): Promise<string> {
    // Check if a conversation already exists
    const { data: existing, error: existingError } = await supabase
      .from('am_conversations')
      .select('id')
      .contains('participants', [userId1])
      .contains('participants', [userId2])
      .limit(1)
      .single();

    if (existingError && existingError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error finding conversation:', existingError);
        throw existingError;
    }

    if (existing) {
      return existing.id;
    }

    // Create a new conversation if none exists
    const { data: newConvo, error: newConvoError } = await supabase
      .from('am_conversations')
      .insert({ participants: [userId1, userId2] })
      .select('id')
      .single();

    if (newConvoError) {
      console.error('Error creating conversation:', newConvoError);
      throw newConvoError;
    }

    return newConvo.id;
  }

  /**
   * Sends a new message to a conversation.
   */
  async sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    const { data, error } = await supabase
      .from('am_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content: content,
      })
      .select('*, sender:profiles(id, first_name, last_name)')
      .single();

    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }

    return data as Message;
  }

  /**
   * Subscribes to new messages in a specific conversation.
   */
  subscribeToMessages(
    conversationId: string,
    onNewMessage: (message: Message) => void
  ): RealtimeChannel {
    const channel = supabase.channel(`am_messages:${conversationId}`);

    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'am_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          // The payload.new contains the new row, but it doesn't have the joined 'sender' profile.
          // We need to fetch the full message to get the sender's details.
          const { data: message, error } = await supabase
            .from('am_messages')
            .select('*, sender:profiles(id, first_name, last_name)')
            .eq('id', payload.new.id)
            .single();

          if (error) {
            console.error('Error fetching new message with profile:', error);
          } else if (message) {
            onNewMessage(message as Message);
          }
        }
      )
      .subscribe();

    return channel;
  }

  /**
   * Searches for user profiles to start a conversation.
   */
  async searchUsers(query: string, currentUserId: string): Promise<ChatUserProfile[]> {
    if (!query) {
        return [];
    }

    // This is a simple search. A more advanced implementation would use a dedicated search index.
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
      .neq('id', currentUserId) // Exclude the current user from results
      .limit(10);

    if (error) {
        console.error('Error searching users:', error);
        throw error;
    }

    return data;
  }
}

export const userChatService = new UserChatService();
