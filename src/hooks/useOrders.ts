import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { parseJsonField, parseJsonArray } from '@/types/database';

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
  invoice_url?: string;
  payment_metadata?: Record<string, unknown>;
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
      const convertedOrders: Order[] = (data || []).map((item: Record<string, any>) => ({
        id: item.id,
        buyer_id: item.buyer_id || user.id,
        farmer_id: item.farmer_id,
        status: item.status,
        total: item.total,
        delivery_address: item.delivery_address,
        delivery_date: item.delivery_date,
        delivery_method: item.delivery_method || 'standard',
        payment_status: item.payment_status || 'pending',
        payment_method: item.payment_method,
        stripe_session_id: item.stripe_session_id,
        stripe_payment_intent_id: item.stripe_payment_intent_id,
        invoice_url: item.invoice_url,
        payment_metadata: parseJsonField<Record<string, unknown>>(item.payment_metadata),
        notes: item.notes,
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || item.created_at || new Date().toISOString(),
        order_items: item.order_items?.map((orderItem: Record<string, any>) => ({
          id: orderItem.id,
          order_id: orderItem.order_id,
          product_id: orderItem.product_id,
          quantity: orderItem.quantity,
          unit_price: orderItem.unit_price,
          product: orderItem.product ? {
            id: (orderItem.product as Record<string, any>).id,
            name: (orderItem.product as Record<string, any>).name,
            image_url: (orderItem.product as Record<string, any>).image_url,
            images: parseJsonArray((orderItem.product as Record<string, any>).images),
            primary_image_url: (orderItem.product as Record<string, any>).primary_image_url,
            unit: (orderItem.product as Record<string, any>).unit
          } : undefined
        })) || [],
        farmer: item.farmer ? {
          id: (item.farmer as Record<string, any>).id,
          name: (item.farmer as Record<string, any>).name,
          location: (item.farmer as Record<string, any>).location
        } : undefined
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
      
      const orderData = data as Record<string, any>;

      return {
        id: orderData.id,
        buyer_id: orderData.buyer_id || '',
        farmer_id: orderData.farmer_id,
        status: orderData.status,
        total: orderData.total,
        delivery_address: orderData.delivery_address,
        delivery_date: orderData.delivery_date,
        delivery_method: orderData.delivery_method || 'standard',
        payment_status: orderData.payment_status || 'pending',
        payment_method: orderData.payment_method,
        stripe_session_id: orderData.stripe_session_id,
        stripe_payment_intent_id: orderData.stripe_payment_intent_id,
        invoice_url: orderData.invoice_url,
        payment_metadata: parseJsonField<Record<string, unknown>>(orderData.payment_metadata),
        notes: orderData.notes,
        created_at: orderData.created_at || new Date().toISOString(),
        updated_at: orderData.updated_at || orderData.created_at || new Date().toISOString(),
        order_items: orderData.order_items?.map((orderItem: Record<string, any>) => ({
          id: orderItem.id,
          order_id: orderItem.order_id,
          product_id: orderItem.product_id,
          quantity: orderItem.quantity,
          unit_price: orderItem.unit_price,
          product: orderItem.product ? {
            id: (orderItem.product as Record<string, any>).id,
            name: (orderItem.product as Record<string, any>).name,
            image_url: (orderItem.product as Record<string, any>).image_url,
            images: parseJsonArray((orderItem.product as Record<string, any>).images),
            primary_image_url: (orderItem.product as Record<string, any>).primary_image_url,
            unit: (orderItem.product as Record<string, any>).unit
          } : undefined
        })) || [],
        farmer: orderData.farmer ? {
          id: (orderData.farmer as Record<string, any>).id,
          name: (orderData.farmer as Record<string, any>).name,
          location: (orderData.farmer as Record<string, any>).location
        } : undefined
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
      interface UpdateData {
        payment_status: string;
        updated_at: string;
        stripe_session_id?: string;
        stripe_payment_intent_id?: string;
      }

      const updateData: UpdateData = {
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
