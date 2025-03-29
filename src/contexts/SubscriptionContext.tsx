
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
export type Subscription = {
  id: number;
  farmerId: number;
  farmerName: string;
  farmerAvatar?: string;
  userId: number;
  plan: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  price: number;
  startDate: string;
  nextDelivery: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    image?: string;
  }[];
  status: 'active' | 'paused' | 'cancelled';
  isAutoRenew: boolean;
};

type SubscriptionState = {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
};

type SubscriptionAction =
  | { type: 'SUBSCRIBE'; payload: Subscription }
  | { type: 'UNSUBSCRIBE'; payload: number }
  | { type: 'PAUSE_SUBSCRIPTION'; payload: number }
  | { type: 'RESUME_SUBSCRIPTION'; payload: number }
  | { type: 'TOGGLE_AUTO_RENEW'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Mock data
const initialSubscriptions: Subscription[] = [
  {
    id: 1,
    farmerId: 2,
    farmerName: "Ferme des Quatre Saisons",
    farmerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    userId: 1,
    plan: "Panier Légumes",
    frequency: "weekly",
    price: 2500,
    startDate: "2023-09-15",
    nextDelivery: "2023-10-22",
    items: [
      { id: 1, name: "Tomates", quantity: 1, image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300&h=300&fit=crop" },
      { id: 2, name: "Carottes", quantity: 1, image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=300&h=300&fit=crop" },
      { id: 3, name: "Salades", quantity: 2, image: "https://images.unsplash.com/photo-1621194066807-89dfbf5eb682?w=300&h=300&fit=crop" },
    ],
    status: "active",
    isAutoRenew: true
  }
];

// Initial state
const initialState: SubscriptionState = {
  subscriptions: initialSubscriptions,
  loading: false,
  error: null
};

// Reducer
const subscriptionReducer = (state: SubscriptionState, action: SubscriptionAction): SubscriptionState => {
  switch (action.type) {
    case 'SUBSCRIBE':
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };
    case 'UNSUBSCRIBE':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub => 
          sub.id === action.payload ? { ...sub, status: 'cancelled' } : sub
        ),
      };
    case 'PAUSE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub => 
          sub.id === action.payload ? { ...sub, status: 'paused' } : sub
        ),
      };
    case 'RESUME_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub => 
          sub.id === action.payload ? { ...sub, status: 'active' } : sub
        ),
      };
    case 'TOGGLE_AUTO_RENEW':
      return {
        ...state,
        subscriptions: state.subscriptions.map(sub => 
          sub.id === action.payload ? { ...sub, isAutoRenew: !sub.isAutoRenew } : sub
        ),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Context
type SubscriptionContextType = {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  subscribe: (subscription: Omit<Subscription, 'id'>) => void;
  unsubscribe: (subscriptionId: number) => void;
  pauseSubscription: (subscriptionId: number) => void;
  resumeSubscription: (subscriptionId: number) => void;
  toggleAutoRenew: (subscriptionId: number) => void;
  getUserSubscriptions: () => Subscription[];
  getFarmerSubscribers: (farmerId: number) => Subscription[];
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Provider
export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);
  const { toast } = useToast();

  const subscribe = (subscriptionData: Omit<Subscription, 'id'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // In a real app, this would be an API call
      const newSubscription = {
        ...subscriptionData,
        id: Math.floor(Math.random() * 1000000), // Generate a random ID
      };
      
      dispatch({ type: 'SUBSCRIBE', payload: newSubscription });
      toast({
        title: "Abonnement réussi",
        description: `Vous êtes maintenant abonné au panier ${subscriptionData.plan}`,
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de l\'abonnement' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'abonnement",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const unsubscribe = (subscriptionId: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // In a real app, this would be an API call
      dispatch({ type: 'UNSUBSCRIBE', payload: subscriptionId });
      toast({
        title: "Abonnement annulé",
        description: "Votre abonnement a été annulé avec succès",
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de l\'annulation' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'annulation",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const pauseSubscription = (subscriptionId: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // In a real app, this would be an API call
      dispatch({ type: 'PAUSE_SUBSCRIPTION', payload: subscriptionId });
      toast({
        title: "Abonnement suspendu",
        description: "Votre abonnement a été suspendu temporairement",
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de la suspension' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suspension",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const resumeSubscription = (subscriptionId: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // In a real app, this would be an API call
      dispatch({ type: 'RESUME_SUBSCRIPTION', payload: subscriptionId });
      toast({
        title: "Abonnement repris",
        description: "Votre abonnement a été réactivé avec succès",
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de la réactivation' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réactivation",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleAutoRenew = (subscriptionId: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // In a real app, this would be an API call
      dispatch({ type: 'TOGGLE_AUTO_RENEW', payload: subscriptionId });
      
      const subscription = state.subscriptions.find(sub => sub.id === subscriptionId);
      const newStatus = subscription?.isAutoRenew ? false : true;
      
      toast({
        title: "Renouvellement automatique",
        description: `Le renouvellement automatique a été ${newStatus ? 'activé' : 'désactivé'}`,
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors du changement de renouvellement' });
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Get subscriptions for the current user
  const getUserSubscriptions = () => {
    // In a real app, this would filter by the current user ID
    return state.subscriptions;
  };

  // Get subscribers for a specific farmer
  const getFarmerSubscribers = (farmerId: number) => {
    return state.subscriptions.filter(sub => sub.farmerId === farmerId);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions: state.subscriptions,
        loading: state.loading,
        error: state.error,
        subscribe,
        unsubscribe,
        pauseSubscription,
        resumeSubscription,
        toggleAutoRenew,
        getUserSubscriptions,
        getFarmerSubscribers,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

// Hook to use the Subscription context
export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
