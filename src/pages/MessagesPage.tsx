import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ConversationList } from '@/components/chat/ConversationList';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { UserSearch } from '@/components/chat/UserSearch';
import { useAuth } from '@/contexts/AuthContext';
import { userChatService, ChatUserProfile } from '@/services/user-chat-service';
import { Separator } from '@/components/ui/separator';
import { MessageSquare } from 'lucide-react';

const ChatPage: React.FC = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const findOrCreateConversationMutation = useMutation({
    mutationFn: (otherUser: ChatUserProfile) => {
        if (!user) throw new Error("User not authenticated");
        return userChatService.findOrCreateConversation(user.id, otherUser.id);
    },
    onSuccess: (conversationId) => {
        setSelectedConversationId(conversationId);
        queryClient.invalidateQueries({ queryKey: ['conversations', user?.id] });
    },
    onError: (error) => {
        console.error("Error finding or creating conversation:", error);
    }
  });

  const handleSelectUser = (otherUser: ChatUserProfile) => {
    findOrCreateConversationMutation.mutate(otherUser);
  };

  if (!profile) {
    return <div className="p-4 text-center">Chargement du profil...</div>;
  }

  return (
    <div className="h-screen w-full flex">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <div className="flex flex-col h-full border-r">
            <div className="p-4">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Messages</h2>
              <UserSearch onSelectUser={handleSelectUser} />
            </div>
            <Separator />
            <ConversationList
              onSelectConversation={setSelectedConversationId}
              selectedConversationId={selectedConversationId}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex flex-col h-full">
            {selectedConversationId ? (
              <>
                <div className="flex-1 overflow-y-auto">
                  <MessageList conversationId={selectedConversationId} />
                </div>
                <div className="p-4 border-t bg-background">
                  <MessageInput conversationId={selectedConversationId} />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <MessageSquare className="h-16 w-16 mb-4" />
                <h3 className="text-xl font-semibold">Bienvenue sur votre messagerie</h3>
                <p className="text-sm">
                  Sélectionnez une conversation dans la liste de gauche ou recherchez un utilisateur pour démarrer une nouvelle discussion.
                </p>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChatPage;
