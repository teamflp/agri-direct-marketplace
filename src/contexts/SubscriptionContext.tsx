
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SubscriptionItem {
  id: number;
  name: string;
  quantity: number;
  image?: string;
}

export interface Subscription {
  id: string | number;
  name?: string;
  description?: string;
  price: number;
  billingCycle?: 'monthly' | 'annual';
  status: 'active' | 'cancelled' | 'expired' | 'paused';
  startDate: Date;
  endDate?: Date;
  features?: string[];
  
  // Propriétés additionnelles utilisées dans les composants
  plan?: string;
  farmerName?: string;
  frequency?: 'weekly' | 'biweekly' | 'monthly';
  nextDelivery?: string | Date;
  isAutoRenew?: boolean;
  items?: SubscriptionItem[];
}

interface SubscriptionData {
  farmerId: number;
  farmerName: string;
  farmerAvatar?: string;
  userId: number;
  plan: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  price: number;
  startDate: string;
  nextDelivery: string;
  items: SubscriptionItem[];
  status: 'active' | 'cancelled' | 'expired' | 'paused';
  isAutoRenew: boolean;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  setSubscription: (subscription: Subscription | null) => void;
  cancelSubscription: (id: string | number) => Promise<void>;
  upgradeSubscription: (newPlan: Omit<Subscription, 'id' | 'status' | 'startDate'>) => Promise<void>;
  
  // Méthodes additionnelles utilisées dans les composants
  subscribe: (data: SubscriptionData) => void;
  unsubscribe: (id: string | number) => void;
  pauseSubscription: (id: string | number) => void;
  resumeSubscription: (id: string | number) => void;
  toggleAutoRenew: (id: string | number) => void;
  getUserSubscriptions: () => Subscription[];
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);

  // Charger l'abonnement depuis le localStorage au démarrage (mock)
  useEffect(() => {
    const storedSubscription = localStorage.getItem('subscription');
    if (storedSubscription) {
      try {
        // Parse the subscription, ensuring dates are correctly converted
        const parsed = JSON.parse(storedSubscription);
        if (parsed) {
          // Convert date strings back to Date objects
          if (parsed.startDate) parsed.startDate = new Date(parsed.startDate);
          if (parsed.endDate) parsed.endDate = new Date(parsed.endDate);
          setSubscription(parsed);
        }
      } catch (err) {
        console.error("Error loading subscription:", err);
        setError("Failed to load subscription data");
      }
    }
    
    // Charger les abonnements utilisateur
    const storedUserSubscriptions = localStorage.getItem('userSubscriptions');
    if (storedUserSubscriptions) {
      try {
        setUserSubscriptions(JSON.parse(storedUserSubscriptions));
      } catch (err) {
        console.error("Error loading user subscriptions:", err);
      }
    }
  }, []);

  // Sauvegarder l'abonnement dans le localStorage quand il change
  useEffect(() => {
    if (subscription) {
      localStorage.setItem('subscription', JSON.stringify(subscription));
    } else {
      localStorage.removeItem('subscription');
    }
  }, [subscription]);
  
  // Sauvegarder les abonnements utilisateur
  useEffect(() => {
    localStorage.setItem('userSubscriptions', JSON.stringify(userSubscriptions));
  }, [userSubscriptions]);

  const cancelSubscription = async (id: string | number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (subscription && subscription.id === id) {
        setSubscription({
          ...subscription,
          status: 'cancelled',
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
        });
      } else {
        throw new Error("Subscription not found");
      }
    } catch (err) {
      console.error("Error cancelling subscription:", err);
      setError("Failed to cancel subscription");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeSubscription = async (newPlan: Omit<Subscription, 'id' | 'status' | 'startDate'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new subscription with the upgraded plan
      setSubscription({
        ...newPlan,
        id: `sub_${Date.now()}`,
        status: 'active',
        startDate: new Date(),
      });
    } catch (err) {
      console.error("Error upgrading subscription:", err);
      setError("Failed to upgrade subscription");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Méthodes additionnelles pour gérer les abonnements utilisateur
  const subscribe = (data: SubscriptionData) => {
    const newSubscription: Subscription = {
      id: `sub_${Date.now()}`,
      plan: data.plan,
      price: data.price,
      status: 'active',
      startDate: new Date(),
      farmerName: data.farmerName,
      frequency: data.frequency,
      nextDelivery: data.nextDelivery,
      isAutoRenew: data.isAutoRenew,
      items: data.items
    };
    
    setUserSubscriptions([...userSubscriptions, newSubscription]);
  };
  
  const unsubscribe = (id: string | number) => {
    setUserSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'cancelled', endDate: new Date() } : sub
      )
    );
  };
  
  const pauseSubscription = (id: string | number) => {
    setUserSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'paused' } : sub
      )
    );
  };
  
  const resumeSubscription = (id: string | number) => {
    setUserSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'active' } : sub
      )
    );
  };
  
  const toggleAutoRenew = (id: string | number) => {
    setUserSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, isAutoRenew: !sub.isAutoRenew } : sub
      )
    );
  };
  
  const getUserSubscriptions = () => {
    // Mock data
    if (userSubscriptions.length === 0) {
      const mockSubscriptions: Subscription[] = [
        {
          id: 'sub_1',
          plan: 'Panier de légumes bio',
          price: 2500,
          status: 'active',
          startDate: new Date(),
          farmerName: 'Ferme des Quatre Saisons',
          frequency: 'weekly',
          nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          isAutoRenew: true,
          items: [
            { id: 1, name: 'Tomates bio', quantity: 3 },
            { id: 2, name: 'Courgettes', quantity: 2 },
            { id: 3, name: 'Salades', quantity: 1 }
          ]
        }
      ];
      
      return mockSubscriptions;
    }
    
    return userSubscriptions;
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        error,
        setSubscription,
        cancelSubscription,
        upgradeSubscription,
        subscribe,
        unsubscribe,
        pauseSubscription,
        resumeSubscription,
        toggleAutoRenew,
        getUserSubscriptions
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
