
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'annual';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  features: string[];
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  setSubscription: (subscription: Subscription | null) => void;
  cancelSubscription: (id: string) => Promise<void>;
  upgradeSubscription: (newPlan: Omit<Subscription, 'id' | 'status' | 'startDate'>) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  // Sauvegarder l'abonnement dans le localStorage quand il change
  useEffect(() => {
    if (subscription) {
      localStorage.setItem('subscription', JSON.stringify(subscription));
    } else {
      localStorage.removeItem('subscription');
    }
  }, [subscription]);

  const cancelSubscription = async (id: string): Promise<void> => {
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

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        error,
        setSubscription,
        cancelSubscription,
        upgradeSubscription
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
