import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Order {
  id: string;
  buyer_id: string;
  farmer_id?: string;
  status: string;
  total: number;
  delivery_address?: string;
  delivery_date?: string;
  delivery_method: string;
  payment_status: string;
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
  farmer?: {
    id: string;
    name: string;
    location: string;
  };
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product?: {
    id: string;
    name: string;
    image_url?: string;
    unit: string;
  };
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
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
          ),
          farmer:farmers (
            id,
            name,
            location
          )
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (orderId: string) => {
    try {
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
          ),
          farmer:farmers (
            id,
            name,
            location
          )
        `)
        .eq('id', orderId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors du chargement');
    }
  };

  const createOrder = async (orderData: {
    farmer_id?: string;
    total: number;
    delivery_address?: string;
    delivery_date?: string;
    delivery_method: string;
    payment_method?: string;
    notes?: string;
    items: Array<{
      product_id: string;
      quantity: number;
      unit_price: number;
    }>;
  }) => {
    if (!user) throw new Error('Utilisateur non connecté');

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          buyer_id: user.id,
          farmer_id: orderData.farmer_id,
          total: orderData.total,
          delivery_address: orderData.delivery_address,
          delivery_date: orderData.delivery_date,
          delivery_method: orderData.delivery_method,
          payment_method: orderData.payment_method,
          notes: orderData.notes,
          status: 'pending'
        }])
        .select()
        .single();
      
      if (orderError) throw orderError;

      // Créer les items de commande
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;

      await fetchOrders();
      return order;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création');
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();
      
      if (error) throw error;
      await fetchOrders();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ payment_status: paymentStatus })
        .eq('id', orderId)
        .select()
        .single();
      
      if (error) throw error;
      await fetchOrders();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus
  };
};