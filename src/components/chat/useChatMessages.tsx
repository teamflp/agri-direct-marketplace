
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { chatService, ChatMessage, ChatError } from '@/services/chat-service';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { toast } = useToast();

  const MAX_MESSAGE_LENGTH = 2000;

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

  const showErrorToast = (error: ChatError) => {
    console.error("Chat error with correlation ID:", error.correlationId, error);

    switch (error.code) {
      case 'MISSING_API_KEY':
        toast({
          variant: "destructive",
          title: "Configuration requise",
          description: "La clé API OpenAI n'est pas configurée. Utilisez le bouton 'Config IA' pour la configurer.",
          duration: 6000,
        });
        break;
      
      case 'INVALID_REQUEST':
        toast({
          variant: "destructive",
          title: "Requête invalide",
          description: error.message,
          duration: 4000,
        });
        break;
      
      case 'RATE_LIMITED':
        toast({
          variant: "destructive",
          title: "Trop de requêtes",
          description: "Vous envoyez trop de messages. Veuillez patienter quelques minutes avant de réessayer.",
          duration: 6000,
        });
        break;
      
      case 'OPENAI_ERROR':
        toast({
          variant: "destructive",
          title: "Erreur du service IA",
          description: "Le service OpenAI rencontre des difficultés. Veuillez réessayer dans quelques instants.",
          duration: 5000,
        });
        break;
      
      case 'TIMEOUT':
        toast({
          variant: "destructive",
          title: "Délai d'attente dépassé",
          description: "La requête a pris trop de temps. Veuillez réessayer.",
          duration: 4000,
        });
        break;
      
      case 'NETWORK_ERROR':
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Vérifiez votre connexion internet et réessayez.",
          duration: 4000,
        });
        break;
      
      default:
        toast({
          variant: "destructive",
          title: "Erreur de communication",
          description: error.message || "Impossible de recevoir une réponse. Veuillez réessayer.",
          duration: 4000,
        });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Check message length
    if (input.length > MAX_MESSAGE_LENGTH) {
      toast({
        variant: "destructive",
        title: "Message trop long",
        description: `Votre message ne peut pas dépasser ${MAX_MESSAGE_LENGTH} caractères (${input.length}/${MAX_MESSAGE_LENGTH}).`,
        duration: 4000,
      });
      return;
    }
    
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
      
      // Handle both old and new error formats
      if (error && typeof error === 'object' && 'code' in error) {
        showErrorToast(error as ChatError);
      } else {
        // Fallback for non-structured errors
        const fallbackError: ChatError = {
          message: error instanceof Error ? error.message : "Erreur inconnue",
          code: 'INTERNAL'
        };
        showErrorToast(fallbackError);
      }
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

  const isMessageTooLong = input.length > MAX_MESSAGE_LENGTH;
  const characterCount = input.length;

  return {
    messages,
    input,
    setInput,
    isLoading,
    showScrollBtn,
    handleSendMessage,
    handleScroll,
    isMessageTooLong,
    characterCount,
    maxLength: MAX_MESSAGE_LENGTH
  };
};
