
import React, { useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';
import ChatMessageList from './ChatMessageList';
import ChatInputForm from './ChatInputForm';
import { useChatMessages } from './useChatMessages';

interface ChatInterfaceProps {
  className?: string;
  compact?: boolean;
}

const ChatInterface = ({ className = "", compact = false }: ChatInterfaceProps) => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    showScrollBtn,
    handleSendMessage,
    handleScroll
  } = useChatMessages();
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  // Add scroll event listener
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    
    if (!scrollArea) return;
    
    const handleScrollEvent = () => handleScroll(scrollArea);
    
    scrollArea.addEventListener('scroll', handleScrollEvent);
    return () => scrollArea.removeEventListener('scroll', handleScrollEvent);
  }, [handleScroll]);

  return (
    <Card className={`${compact ? 'h-[500px]' : 'h-[600px] max-h-[80vh]'} flex flex-col ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <div className="mr-2">
            <AgrimarketLogo size="sm" />
          </div>
          <div>
            <CardTitle>Assistant AgriMarket</CardTitle>
            <CardDescription>Posez vos questions sur l'agriculture biologique et nos services</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <ChatMessageList 
        messages={messages}
        isLoading={isLoading}
        showScrollBtn={showScrollBtn}
        scrollToBottom={scrollToBottom}
      />
      
      <CardFooter className="border-t p-3">
        <ChatInputForm 
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
