
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders, Order } from './useOrders';

export const useFarmerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { updateOrderStatus } = useOrders();

  const fetchFarmerOrders = async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // First get farmer_id for current user
      const { data: farmerData, error: farmerError } = await supabase
        .from('farmers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (farmerError || !farmerData) {
        console.log('User is not a farmer or farmer not found');
        setOrders([]);
        setLoading(false);
        return;
      }

      // Then get orders for this farmer
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (
              id,
              name,
              image_url,
              unit
            )
          )
        `)
        .eq('farmer_id', farmerData.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription for farmer orders
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('farmer-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          fetchFarmerOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    fetchFarmerOrders();
  }, [user]);

  return {
    orders,
    loading,
    error,
    fetchFarmerOrders,
    updateOrderStatus,
  };
};
