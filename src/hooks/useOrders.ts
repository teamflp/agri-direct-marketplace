import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { parseJsonField, parseJsonArray } from '@/types/database';
import { Tables } from '@/integrations/supabase/types';

type OrderWithRelations = Tables<'orders'> & {
  order_items: (Tables<'order_items'> & {
    product: Pick<Tables<'products'>, 'id' | 'name' | 'image_url' | 'images' | 'primary_image_url' | 'unit'> | null;
  })[];
  farmer: Pick<Tables<'farmers'>, 'id' | 'name' | 'location'> | null;
};

export interface Order {
  id: string;
  buyer_id: string | null;
  farmer_id?: string | null;
  status: string | null;
  total: number;
  delivery_address?: string | null;
  delivery_date?: string | null;
  delivery_method: string | null;
  payment_status: string | null;
  payment_method?: string | null;
  stripe_session_id?: string | null;
  stripe_payment_intent_id?: string | null;
  invoice_url?: string | null;
  payment_metadata?: Record<string, unknown> | null;
  notes?: string | null;
  created_at: string | null;
  updated_at: string | null;
  order_items?: OrderItem[];
  farmer?: {
    id: string;
    name: string;
    location: string;
  } | null;
  buyer?: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

export interface OrderItem {
  id: string;
  order_id: string | null;
  product_id: string | null;
  quantity: number;
  unit_price: number;
  product?: {
    id: string;
    name: string;
    image_url?: string | null;
    images?: string[];
    primary_image_url?: string | null;
    unit: string | null;
  } | null;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string | null;
  old_status: string | null;
  new_status: string;
  changed_by: string | null;
  notes: string | null;
  created_at: string | null;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
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

      const typedData = (data as OrderWithRelations[]) || [];
      const ordersWithParsedJson: Order[] = typedData.map(o => ({
          ...o,
          payment_metadata: parseJsonField<Record<string, unknown>>(o.payment_metadata),
          order_items: o.order_items.map(oi => ({
              ...oi,
              product: oi.product ? {
                  ...oi.product,
                  images: parseJsonArray(oi.product.images)
              } : null
          }))
      })) as any;
      setOrders(ordersWithParsedJson);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getOrderById = useCallback(async (orderId: string): Promise<Order> => {
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

    const orderData = data as OrderWithRelations;

    return {
      ...orderData,
      payment_metadata: parseJsonField<Record<string, unknown>>(orderData.payment_metadata),
      order_items: orderData.order_items.map(oi => ({
          ...oi,
          product: oi.product ? {
              ...oi.product,
              images: parseJsonArray(oi.product.images)
          } : null
      }))
    } as any;
  }, []);

  const createOrder = useCallback(async (orderData: {
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
  }): Promise<Tables<'orders'>> => {
    if (!user) throw new Error('Utilisateur non connecté');

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        buyer_id: user.id,
        farmer_id: orderData.farmer_id || null,
        total: orderData.total,
        delivery_address: orderData.delivery_address || null,
        delivery_date: orderData.delivery_date || null,
        delivery_method: orderData.delivery_method,
        payment_method: orderData.payment_method || null,
        notes: orderData.notes || null,
        status: 'pending',
        payment_status: 'pending'
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    if (itemsError) throw itemsError;

    const { error: deliveryError } = await supabase.from('delivery_tracking').insert({
      order_id: order.id,
      status: 'pending',
      notes: 'Commande créée, en attente de traitement'
    });
    if (deliveryError) console.warn('Erreur création tracking:', deliveryError);

    await fetchOrders();
    return order;
  }, [user, fetchOrders]);

  const updateOrderStatus = useCallback(async (orderId: string, status: string, notes?: string) => {
    const { error } = await supabase.rpc('update_order_status', {
      order_id: orderId,
      new_status: status,
      notes: notes || null
    });

    if (error) {
      const { error: directError } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);
      if (directError) throw directError;
    }

    await supabase.from('delivery_tracking').upsert({
      order_id: orderId,
      status: status,
      notes: notes || `Statut mis à jour: ${status}`,
      updated_at: new Date().toISOString()
    });

    await fetchOrders();
    return true;
  }, [fetchOrders]);

  const updatePaymentStatus = useCallback(async (orderId: string, paymentStatus: string, sessionId?: string, paymentIntentId?: string): Promise<Tables<'orders'>> => {
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

    if (paymentStatus === 'paid') {
      await supabase.from('delivery_tracking').upsert({
        order_id: orderId,
        status: 'confirmed',
        notes: 'Paiement confirmé, commande en cours de préparation'
      });
    }

    await fetchOrders();
    return data;
  }, [fetchOrders]);

  const getOrderStatusHistory = useCallback(async (orderId: string): Promise<OrderStatusHistory[]> => {
    const { data, error } = await supabase
      .from('order_status_history')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }, []);

  const checkPaymentStatus = useCallback(async (sessionId?: string, orderId?: string) => {
    const { data, error } = await supabase.functions.invoke('check-payment-status', {
      body: { sessionId, orderId }
    });
    if (error) throw error;
    return data;
  }, []);

  const fetchFarmerOrders = useCallback(async () => {
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
            product:products (id, name, image_url)
          ),
          buyer:profiles (id, first_name, last_name, email)
        `)
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data as any || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchFarmerOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    getOrderStatusHistory,
    checkPaymentStatus
  };
};
