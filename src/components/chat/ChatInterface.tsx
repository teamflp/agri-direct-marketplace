
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Bot, User, ArrowDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { chatService, ChatMessage } from '@/services/chat-service';
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';

interface ChatInterfaceProps {
  className?: string;
  compact?: boolean;
}

const ChatInterface = ({ className = "", compact = false }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Ajouter un message de bienvenue au chargement du composant
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Bonjour ! Je suis l\'assistant virtuel d\'AgriMarket. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me poser des questions sur l\'agriculture biologique, les produits de saison, ou toute question concernant notre plateforme.',
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ajouter un gestionnaire de défilement pour afficher le bouton de défilement
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    
    if (!scrollArea) return;
    
    const handleScroll = () => {
      if (scrollArea) {
        const { scrollTop, scrollHeight, clientHeight } = scrollArea;
        const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
        setShowScrollBtn(isScrolledUp);
      }
    };
    
    scrollArea.addEventListener('scroll', handleScroll);
    return () => scrollArea.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    
    try {
      // Envoyer le message à l'API
      const botReply = await chatService.sendMessage(updatedMessages);
      
      // Ajouter la réponse du bot
      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast({
        variant: "destructive",
        title: "Erreur de communication",
        description: "Impossible de recevoir une réponse. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
      
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                  <Avatar className={`mt-0.5 ${message.role === 'user' ? 'bg-agrimarket-orange' : 'bg-agrimarket-green'}`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </Avatar>
                  
                  <div>
                    <div 
                      className={`rounded-lg px-3 py-2 text-sm ${
                        message.role === 'user' 
                          ? 'bg-agrimarket-orange text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className={`text-xs mt-1 text-gray-500 ${message.role === 'user' ? 'text-right' : ''}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
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
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input 
            placeholder="Tapez votre message..." 
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            className="border-agrimarket-lightGreen focus-visible:ring-agrimarket-green"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="bg-agrimarket-green hover:bg-agrimarket-darkGreen"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
