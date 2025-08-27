import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userChatService, Message } from '@/services/user-chat-service';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface MessageListProps {
  conversationId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ conversationId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const viewportRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error } = useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: () => userChatService.getMessages(conversationId),
    enabled: !!conversationId,
    // Realtime updates will handle new messages, so stale time can be longer
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!conversationId) return;

    const channel = userChatService.subscribeToMessages(conversationId, (newMessage) => {
      queryClient.setQueryData(['messages', conversationId], (oldData: Message[] | undefined) => {
        if (oldData && oldData.find((m: Message) => m.id === newMessage.id)) {
            return oldData;
        }
        return oldData ? [...oldData, newMessage] : [newMessage];
      });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    });

    return () => {
      channel.unsubscribe();
    };
  }, [conversationId, queryClient]);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Chargement des messages...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">Erreur: Impossible de charger les messages.</div>;
  }

  return (
    <ScrollArea className="h-full" viewportRef={viewportRef}>
      <div className="p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-end space-x-3",
              message.sender_id === user?.id ? "justify-end" : "justify-start"
            )}
          >
            {message.sender_id !== user?.id && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {message.sender?.first_name?.[0]}
                  {message.sender?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "p-3 rounded-lg max-w-xs lg:max-w-md",
                message.sender_id === user?.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
