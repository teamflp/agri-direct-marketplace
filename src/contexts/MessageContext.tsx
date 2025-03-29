
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Types for messages
export type Message = {
  id: number;
  senderId: number;
  senderType: 'farmer' | 'customer';
  receiverId: number;
  text: string;
  date: string;
  read: boolean;
};

export type Conversation = {
  id: number;
  customerId: number;
  customerName: string;
  customerAvatar: string;
  farmerId: number;
  farmerName: string;
  farmerAvatar: string;
  lastMessage: string;
  lastMessageDate: string;
  unread: boolean;
  messages: Message[];
};

type MessageState = {
  conversations: Conversation[];
  activeConversationId: number | null;
};

type MessageAction =
  | { type: 'SET_ACTIVE_CONVERSATION'; payload: number }
  | { type: 'SEND_MESSAGE'; payload: { conversationId: number; text: string; senderId: number; senderType: 'farmer' | 'customer' } }
  | { type: 'MARK_AS_READ'; payload: number }
  | { type: 'LOAD_CONVERSATIONS'; payload: Conversation[] };

type MessageContextType = {
  messageState: MessageState;
  setActiveConversation: (id: number) => void;
  sendMessage: (conversationId: number, text: string, senderId: number, senderType: 'farmer' | 'customer') => void;
  markAsRead: (conversationId: number) => void;
};

// Mock data for initial state - in a real app this would come from an API
const mockConversations: Conversation[] = [
  {
    id: 1,
    customerId: 1,
    customerName: "Martin Pasquier",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    farmerId: 1,
    farmerName: "Sophie Dubois",
    farmerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    lastMessage: "Bonjour, votre commande sera prête demain comme prévu!",
    lastMessageDate: new Date().toISOString(),
    unread: true,
    messages: [
      {
        id: 1,
        senderId: 1,
        senderType: 'farmer',
        receiverId: 1,
        text: "Bonjour M. Pasquier, j'espère que vous allez bien!",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        read: true
      },
      {
        id: 2,
        senderId: 1,
        senderType: 'customer',
        receiverId: 1,
        text: "Bonjour Mme Dubois, tout va bien merci! Je voulais savoir si ma commande serait prête demain?",
        date: new Date().toISOString(),
        read: true
      },
      {
        id: 3,
        senderId: 1,
        senderType: 'farmer',
        receiverId: 1,
        text: "Bonjour, votre commande sera prête demain comme prévu!",
        date: new Date().toISOString(),
        read: false
      }
    ]
  },
  {
    id: 2,
    customerId: 1,
    customerName: "Martin Pasquier",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    farmerId: 2,
    farmerName: "Jean Leclerc",
    farmerAvatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop",
    lastMessage: "Merci pour votre commande, n'hésitez pas si vous avez des questions.",
    lastMessageDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    unread: false,
    messages: [
      {
        id: 1,
        senderId: 2,
        senderType: 'farmer',
        receiverId: 1,
        text: "Bonjour M. Pasquier, je vous confirme que votre commande a bien été préparée.",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        read: true
      },
      {
        id: 2,
        senderId: 2,
        senderType: 'farmer',
        receiverId: 1,
        text: "Merci pour votre commande, n'hésitez pas si vous avez des questions.",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        read: true
      }
    ]
  }
];

const initialState: MessageState = {
  conversations: mockConversations,
  activeConversationId: null
};

// Reducer function to handle message actions
const messageReducer = (state: MessageState, action: MessageAction): MessageState => {
  switch (action.type) {
    case 'SET_ACTIVE_CONVERSATION':
      return {
        ...state,
        activeConversationId: action.payload
      };
    
    case 'SEND_MESSAGE': {
      const { conversationId, text, senderId, senderType } = action.payload;
      const now = new Date().toISOString();
      
      return {
        ...state,
        conversations: state.conversations.map(conv => {
          if (conv.id === conversationId) {
            const newMessage: Message = {
              id: Math.max(0, ...conv.messages.map(m => m.id)) + 1,
              senderId,
              senderType,
              receiverId: senderType === 'farmer' ? conv.customerId : conv.farmerId,
              text,
              date: now,
              read: false
            };
            
            return {
              ...conv,
              lastMessage: text,
              lastMessageDate: now,
              unread: senderType === 'farmer', // If farmer sent it, mark as unread for customer
              messages: [...conv.messages, newMessage]
            };
          }
          return conv;
        })
      };
    }
    
    case 'MARK_AS_READ':
      return {
        ...state,
        conversations: state.conversations.map(conv => {
          if (conv.id === action.payload) {
            return {
              ...conv,
              unread: false,
              messages: conv.messages.map(message => ({
                ...message,
                read: true
              }))
            };
          }
          return conv;
        })
      };
    
    case 'LOAD_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload
      };
      
    default:
      return state;
  }
};

// Create context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Provider component
export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messageState, dispatch] = useReducer(messageReducer, initialState, () => {
    if (typeof window === 'undefined') return initialState;
    
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : initialState;
  });
  
  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messageState));
  }, [messageState]);
  
  // Message actions
  const setActiveConversation = (id: number) => {
    dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: id });
    dispatch({ type: 'MARK_AS_READ', payload: id });
  };
  
  const sendMessage = (conversationId: number, text: string, senderId: number, senderType: 'farmer' | 'customer') => {
    if (!text.trim()) return;
    
    dispatch({ 
      type: 'SEND_MESSAGE', 
      payload: { conversationId, text, senderId, senderType } 
    });
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
  };
  
  const markAsRead = (conversationId: number) => {
    dispatch({ type: 'MARK_AS_READ', payload: conversationId });
  };
  
  return (
    <MessageContext.Provider value={{ messageState, setActiveConversation, sendMessage, markAsRead }}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the message context
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
