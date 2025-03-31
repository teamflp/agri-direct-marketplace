
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDown, Loader2, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ChatMessage as ChatMessageType } from '@/services/chat-service';
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  showScrollBtn: boolean;
  scrollToBottom: () => void;
}

const ChatMessageList = ({ 
  messages, 
  isLoading, 
  showScrollBtn,
  scrollToBottom 
}: ChatMessageListProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="flex-grow overflow-hidden p-0 relative">
      <ScrollArea ref={scrollAreaRef} className="h-full px-4">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <Avatar className="mt-0.5 bg-agrimarket-green">
                  <Bot className="h-4 w-4 text-white" />
                </Avatar>
                <div className="rounded-lg px-3 py-2 bg-gray-100 text-gray-800">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={endOfMessagesRef} />
        </div>
      </ScrollArea>
      
      {showScrollBtn && (
        <div className="absolute bottom-16 right-4">
          <Button 
            size="sm" 
            variant="outline" 
            className="rounded-full w-8 h-8 p-0 bg-white shadow-md"
            onClick={scrollToBottom}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatMessageList;
