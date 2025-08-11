
import React, { useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';
import ChatMessageList from './ChatMessageList';
import ChatInputForm from './ChatInputForm';
import ApiKeyDialog from '@/components/ai/ApiKeyDialog';
import { useChatMessages } from './useChatMessages';
import { useSupabaseApiKey } from '@/hooks/use-supabase-api-key';

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
  
  const { apiKeyState } = useSupabaseApiKey();
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
      <CardHeader className="pb-3 bg-agrimarket-green">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2">
              <AgrimarketLogo size="sm" />
            </div>
            <div className="text-white">
              <CardTitle className="text-white">Assistant AgriMarket</CardTitle>
              <CardDescription className="text-white/90">Posez vos questions sur l'agriculture biologique et nos services</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!apiKeyState.isKeySet && (
              <div className="text-xs text-white/80 mr-2">
                ⚠️ Config requise
              </div>
            )}
            <ApiKeyDialog 
              trigger={
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="h-4 w-4" />
                </Button>
              }
            />
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
