
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

const ChatInterface = () => {
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

  // Formater la date
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="w-full h-[600px] max-h-[80vh] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <div className="mr-2">
            <AgrimarketLogo size="small" />
          </div>
          <div>
            <CardTitle>Assistant AgriMarket</CardTitle>
            <CardDescription>Posez vos questions sur l'agriculture biologique et nos services</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden p-0 relative">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4 pb-0">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`flex items-start max-w-[80%] ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  } rounded-lg p-3`}
                >
                  <div className="flex-shrink-0 mr-2">
                    {message.role === 'user' ? (
                      <Avatar className="h-8 w-8 bg-primary-foreground">
                        <User className="h-4 w-4 text-primary" />
                      </Avatar>
                    ) : (
                      <Avatar className="h-8 w-8 bg-green-100">
                        <Bot className="h-4 w-4 text-green-600" />
                      </Avatar>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center bg-muted rounded-lg p-3">
                  <Avatar className="h-8 w-8 bg-green-100 mr-2">
                    <Bot className="h-4 w-4 text-green-600" />
                  </Avatar>
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </ScrollArea>
        
        {showScrollBtn && (
          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-2 right-3 rounded-full shadow-md z-10"
            onClick={scrollToBottom}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <form onSubmit={handleSendMessage} className="w-full flex items-center space-x-2 pt-2">
          <Input
            placeholder="Écrivez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
