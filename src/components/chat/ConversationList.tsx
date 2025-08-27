import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userChatService } from '@/services/user-chat-service';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';

interface ConversationListProps {
  onSelectConversation: (conversationId: string) => void;
  selectedConversationId: string | null;
}

export const ConversationList: React.FC<ConversationListProps> = ({ onSelectConversation, selectedConversationId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: () => {
        if (!user) return Promise.resolve([]);
        return userChatService.getConversations(user!.id)
    },
    enabled: !!user,
  });

  // This is a simple way to refresh the conversation list when any new message arrives.
  // A more sophisticated implementation would update only the affected conversation.
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('public:am_messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'am_messages' },
        (payload) => {
          console.log('New message detected, refetching conversations');
          queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  if (isLoading) {
    return <div className="p-4 text-center">Chargement des conversations...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Erreur: Impossible de charger les conversations.</div>;
  }

  if (!conversations || conversations.length === 0) {
      return <div className="p-4 text-center text-muted-foreground">Aucune conversation.</div>;
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-2 space-y-1">
        {conversations?.map((convo) => (
          <div
            key={convo.id}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-accent",
              selectedConversationId === convo.id && "bg-accent"
            )}
            onClick={() => onSelectConversation(convo.id)}
          >
            <Avatar>
              <AvatarFallback>
                {convo.other_participant.first_name?.[0]}
                {convo.other_participant.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="font-semibold truncate">
                {convo.other_participant.first_name} {convo.other_participant.last_name}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {convo.last_message?.content ?? 'Aucun message'}
              </p>
            </div>
            {convo.last_message && (
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(new Date(convo.last_message.created_at), { addSuffix: true, locale: fr })}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
