
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { parseJsonField } from '@/types/database';

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
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  payment_metadata?: Record<string, any>;
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
    images?: string[];
    primary_image_url?: string;
    unit: string;
  };
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string | null;
  notes: string | null;
  created_at: string;
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
              images,
              primary_image_url,
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

      // Convertir les données avec les bons types
      const convertedOrders: Order[] = (data || []).map(order => ({
        ...order,
        payment_metadata: parseJsonField<Record<string, any>>(order.payment_metadata)
      }));

      setOrders(convertedOrders);
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
              images,
              primary_image_url,
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
      
      return {
        ...data,
        payment_metadata: parseJsonField<Record<string, any>>(data.payment_metadata)
      };
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
          status: 'pending',
          payment_status: 'pending'
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

      // Créer une entrée de suivi de livraison
      const { error: deliveryError } = await supabase
        .from('delivery_tracking')
        .insert({
          order_id: order.id,
          status: 'pending',
          notes: 'Commande créée, en attente de traitement'
        });

      if (deliveryError) console.warn('Erreur création tracking:', deliveryError);

      await fetchOrders();
      return order;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création');
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, notes?: string) => {
    try {
      // Utiliser la fonction RPC pour mettre à jour avec historique
      const { error } = await supabase.rpc('update_order_status', {
        order_id: orderId,
        new_status: status,
        notes: notes || null
      });

      if (error) {
        // Fallback: mise à jour directe si la RPC échoue
        const { error: directError } = await supabase
          .from('orders')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', orderId);
        
        if (directError) throw directError;
      }

      // Mettre à jour le suivi de livraison aussi
      await supabase
        .from('delivery_tracking')
        .upsert({
          order_id: orderId,
          status: status,
          notes: notes || `Statut mis à jour: ${status}`,
          updated_at: new Date().toISOString()
        });

      await fetchOrders();
      return true;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string, sessionId?: string, paymentIntentId?: string) => {
    try {
      const updateData: any = { 
        payment_status: paymentStatus,
        updated_at: new Date().toISOString()
      };
      
      if (sessionId) updateData.stripe_session_id = sessionId;
      if (paymentIntentId) updateData.stripe_payment_intent_id = paymentIntentId;

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .single();
      
      if (error) throw error;

      // Si le paiement est confirmé, mettre à jour le statut de livraison
      if (paymentStatus === 'paid') {
        await supabase
          .from('delivery_tracking')
          .upsert({
            order_id: orderId,
            status: 'confirmed',
            notes: 'Paiement confirmé, commande en cours de préparation'
          });
      }

      await fetchOrders();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  const getOrderStatusHistory = async (orderId: string): Promise<OrderStatusHistory[]> => {
    try {
      const { data, error } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching status history:', err);
      return [];
    }
  };

  const checkPaymentStatus = async (sessionId?: string, orderId?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('check-payment-status', {
        body: { sessionId, orderId }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la vérification');
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
    updatePaymentStatus,
    getOrderStatusHistory,
    checkPaymentStatus
  };
};
