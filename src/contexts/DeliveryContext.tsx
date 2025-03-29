
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DeliveryMethod = 'standard' | 'express' | 'pickup';

export type DeliveryStatus = 
  | 'pending' 
  | 'preparing' 
  | 'shipped' 
  | 'in_transit' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'failed' 
  | 'cancelled';

export interface DeliverySlot {
  id: string;
  date: Date;
  timeWindow: string;
  available: boolean;
}

export interface DeliveryOption {
  id: string;
  method: DeliveryMethod;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
}

export interface DeliveryDetails {
  orderId: string;
  method: DeliveryMethod;
  status: DeliveryStatus;
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  scheduledSlot?: DeliverySlot;
  updates: DeliveryUpdate[];
  carrier?: string;
  notes?: string;
}

export interface DeliveryUpdate {
  id: string;
  date: Date;
  status: DeliveryStatus;
  location?: string;
  description: string;
}

interface DeliveryContextType {
  deliveryOptions: DeliveryOption[];
  deliveries: Record<string, DeliveryDetails>;
  availableSlots: DeliverySlot[];
  getDeliveryByOrderId: (orderId: string) => DeliveryDetails | undefined;
  scheduleDelivery: (orderId: string, slotId: string) => void;
  updateDeliveryStatus: (orderId: string, status: DeliveryStatus, description: string) => void;
  selectDeliveryMethod: (orderId: string, methodId: string) => void;
  getDeliveryUpdates: (orderId: string) => DeliveryUpdate[];
  cancelDelivery: (orderId: string) => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

// Mock delivery options
const defaultDeliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    method: 'standard',
    name: 'Livraison standard',
    description: 'Livraison en 3-5 jours ouvrables',
    price: 1500,
    estimatedDays: 4
  },
  {
    id: 'express',
    method: 'express',
    name: 'Livraison express',
    description: 'Livraison en 1-2 jours ouvrables',
    price: 3500,
    estimatedDays: 1
  },
  {
    id: 'pickup',
    method: 'pickup',
    name: 'Retrait à la ferme',
    description: 'Récupérez vos produits directement chez l\'agriculteur',
    price: 0,
    estimatedDays: 0
  }
];

// Generate delivery slots for the next 7 days
const generateDeliverySlots = (): DeliverySlot[] => {
  const slots: DeliverySlot[] = [];
  const now = new Date();
  
  // Generate for next 7 days
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    // Morning slots
    slots.push({
      id: `slot-${i}-1`,
      date: new Date(date),
      timeWindow: '08:00 - 12:00',
      available: Math.random() > 0.3 // 70% chance of being available
    });
    
    // Afternoon slots
    slots.push({
      id: `slot-${i}-2`,
      date: new Date(date),
      timeWindow: '14:00 - 18:00',
      available: Math.random() > 0.3
    });
  }
  
  return slots;
};

// Sample mock delivery data
const mockDeliveries: Record<string, DeliveryDetails> = {
  'CMD-2023-001': {
    orderId: 'CMD-2023-001',
    method: 'standard',
    status: 'delivered',
    trackingNumber: 'TRK123456',
    estimatedDeliveryDate: new Date('2023-09-30'),
    updates: [
      {
        id: 'upd-1',
        date: new Date('2023-09-27'),
        status: 'preparing',
        description: 'Commande en cours de préparation'
      },
      {
        id: 'upd-2',
        date: new Date('2023-09-28'),
        status: 'shipped',
        location: 'Centre de distribution Abidjan',
        description: 'Colis expédié'
      },
      {
        id: 'upd-3',
        date: new Date('2023-09-30'),
        status: 'delivered',
        location: 'Abidjan',
        description: 'Colis livré'
      }
    ],
    carrier: 'Livreur Express'
  },
  'CMD-2023-002': {
    orderId: 'CMD-2023-002',
    method: 'express',
    status: 'in_transit',
    trackingNumber: 'TRK789012',
    estimatedDeliveryDate: new Date('2023-09-28'),
    updates: [
      {
        id: 'upd-4',
        date: new Date('2023-09-26'),
        status: 'preparing',
        description: 'Commande en cours de préparation'
      },
      {
        id: 'upd-5',
        date: new Date('2023-09-27'),
        status: 'shipped',
        location: 'Centre de distribution Abidjan',
        description: 'Colis expédié'
      },
      {
        id: 'upd-6',
        date: new Date('2023-09-27'),
        status: 'in_transit',
        location: 'En route vers Abidjan',
        description: 'Colis en transit'
      }
    ],
    carrier: 'Rapido Livraison'
  },
  'CMD-2023-003': {
    orderId: 'CMD-2023-003',
    method: 'pickup',
    status: 'pending',
    updates: [
      {
        id: 'upd-7',
        date: new Date('2023-09-25'),
        status: 'pending',
        description: 'En attente de retrait par le client'
      }
    ]
  }
};

export const DeliveryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deliveryOptions] = useState<DeliveryOption[]>(defaultDeliveryOptions);
  const [deliveries, setDeliveries] = useState<Record<string, DeliveryDetails>>(mockDeliveries);
  const [availableSlots] = useState<DeliverySlot[]>(generateDeliverySlots());

  const getDeliveryByOrderId = (orderId: string): DeliveryDetails | undefined => {
    return deliveries[orderId];
  };

  const scheduleDelivery = (orderId: string, slotId: string) => {
    const slot = availableSlots.find(s => s.id === slotId);
    if (!slot || !slot.available) return;

    setDeliveries(prev => {
      const delivery = prev[orderId];
      if (!delivery) return prev;

      return {
        ...prev,
        [orderId]: {
          ...delivery,
          scheduledSlot: slot,
          updates: [
            ...delivery.updates,
            {
              id: `upd-${Date.now()}`,
              date: new Date(),
              status: delivery.status,
              description: `Livraison programmée pour le ${slot.date.toLocaleDateString()} entre ${slot.timeWindow}`
            }
          ]
        }
      };
    });
  };

  const updateDeliveryStatus = (orderId: string, status: DeliveryStatus, description: string) => {
    setDeliveries(prev => {
      const delivery = prev[orderId];
      if (!delivery) return prev;

      return {
        ...prev,
        [orderId]: {
          ...delivery,
          status,
          updates: [
            ...delivery.updates,
            {
              id: `upd-${Date.now()}`,
              date: new Date(),
              status,
              description
            }
          ]
        }
      };
    });
  };

  const selectDeliveryMethod = (orderId: string, methodId: string) => {
    const method = deliveryOptions.find(opt => opt.id === methodId);
    if (!method) return;

    setDeliveries(prev => {
      const delivery = prev[orderId] || {
        orderId,
        method: 'standard',
        status: 'pending',
        updates: []
      };

      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + method.estimatedDays);

      return {
        ...prev,
        [orderId]: {
          ...delivery,
          method: method.method,
          estimatedDeliveryDate: method.method !== 'pickup' ? estimatedDate : undefined,
          updates: [
            ...delivery.updates,
            {
              id: `upd-${Date.now()}`,
              date: new Date(),
              status: 'pending',
              description: `Méthode de livraison sélectionnée: ${method.name}`
            }
          ]
        }
      };
    });
  };

  const getDeliveryUpdates = (orderId: string): DeliveryUpdate[] => {
    const delivery = deliveries[orderId];
    return delivery?.updates || [];
  };

  const cancelDelivery = (orderId: string) => {
    setDeliveries(prev => {
      const delivery = prev[orderId];
      if (!delivery) return prev;

      return {
        ...prev,
        [orderId]: {
          ...delivery,
          status: 'cancelled',
          updates: [
            ...delivery.updates,
            {
              id: `upd-${Date.now()}`,
              date: new Date(),
              status: 'cancelled',
              description: 'Livraison annulée'
            }
          ]
        }
      };
    });
  };

  return (
    <DeliveryContext.Provider
      value={{
        deliveryOptions,
        deliveries,
        availableSlots,
        getDeliveryByOrderId,
        scheduleDelivery,
        updateDeliveryStatus,
        selectDeliveryMethod,
        getDeliveryUpdates,
        cancelDelivery
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
};
