
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';

export interface DeliveryTracking {
  id: string;
  order_id: string;
  status: string;
  tracking_number?: string;
  estimated_delivery?: string;
  location?: string;
  delivery_person?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useDeliveryTracking = () => {
  const [deliveries, setDeliveries] = useState<Record<string, DeliveryTracking>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { addNotification } = useNotification();

  const fetchDeliveryTracking = async (orderId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('delivery_tracking')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setDeliveries(prev => ({
          ...prev,
          [orderId]: data
        }));
        return data;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (
    orderId: string, 
    status: string, 
    updates?: {
      tracking_number?: string;
      estimated_delivery?: string;
      location?: string;
      delivery_person?: string;
      notes?: string;
    }
  ) => {
    try {
      const updateData = {
        order_id: orderId,
        status,
        updated_at: new Date().toISOString(),
        ...updates
      };

      const { data, error } = await supabase
        .from('delivery_tracking')
        .upsert(updateData)
        .select()
        .single();

      if (error) throw error;

      setDeliveries(prev => ({
        ...prev,
        [orderId]: data
      }));

      // Notification pour les changements de statut importants
      const statusMessages: Record<string, string> = {
        'confirmed': 'Votre commande a été confirmée',
        'preparing': 'Votre commande est en cours de préparation',
        'shipped': 'Votre commande a été expédiée',
        'out_for_delivery': 'Votre commande est en cours de livraison',
        'delivered': 'Votre commande a été livrée'
      };

      if (statusMessages[status]) {
        addNotification({
          type: 'order',
          title: 'Mise à jour de livraison',
          message: statusMessages[status]
        });
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  };

  const subscribeToDeliveryUpdates = (orderId: string) => {
    const channel = supabase
      .channel(`delivery-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'delivery_tracking',
          filter: `order_id=eq.${orderId}`
        },
        (payload) => {
          if (payload.new) {
            setDeliveries(prev => ({
              ...prev,
              [orderId]: payload.new as DeliveryTracking
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return {
    deliveries,
    loading,
    error,
    fetchDeliveryTracking,
    updateDeliveryStatus,
    subscribeToDeliveryUpdates
  };
};
