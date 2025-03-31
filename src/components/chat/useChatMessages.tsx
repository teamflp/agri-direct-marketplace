
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { chatService, ChatMessage } from '@/services/chat-service';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { toast } = useToast();

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Bonjour ! Je suis l\'assistant virtuel d\'AgriMarket. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me poser des questions sur l\'agriculture biologique, les produits de saison, ou toute question concernant notre plateforme.',
        timestamp: new Date()
      }
    ]);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
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
      // Send message to API
      const botReply = await chatService.sendMessage(updatedMessages);
      
      // Add bot response
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

  const handleScroll = useCallback((scrollArea: HTMLDivElement) => {
    if (scrollArea) {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollBtn(isScrolledUp);
    }
  }, []);

  return {
    messages,
    input,
    setInput,
    isLoading,
    showScrollBtn,
    handleSendMessage,
    handleScroll
  };
};
