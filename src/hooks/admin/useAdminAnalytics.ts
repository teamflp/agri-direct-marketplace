
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminAnalytics {
  totalUsers: number;
  activeFarmers: number;
  monthlyRevenue: number;
  totalOrders: number;
  pendingDisputes: number;
  newUsersThisMonth: number;
  newFarmersThisWeek: number;
  ordersThisWeek: number;
}

interface RecentOrder {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  buyer_id: string;
}

interface RecentFarmer {
  id: string;
  name: string;
  location: string;
  created_at: string;
}

export const useAdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics>({
    totalUsers: 0,
    activeFarmers: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    pendingDisputes: 0,
    newUsersThisMonth: 0,
    newFarmersThisWeek: 0,
    ordersThisWeek: 0,
  });
  
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentFarmers, setRecentFarmers] = useState<RecentFarmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get total users count
      const { count: totalUsers } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Get active farmers count
      const { count: activeFarmers } = await supabase
        .from('farmers')
        .select('*', { count: 'exact', head: true });

      // Get total orders count
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // Get orders for revenue calculation (this month)
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: monthlyOrders } = await supabase
        .from('orders')
        .select('total_amount')
        .gte('created_at', startOfMonth.toISOString())
        .eq('status', 'completed');

      const monthlyRevenue = monthlyOrders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      // Get new users this month
      const { count: newUsersThisMonth } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString());

      // Get new farmers this week
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);

      const { count: newFarmersThisWeek } = await supabase
        .from('farmers')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfWeek.toISOString());

      // Get orders this week
      const { count: ordersThisWeek } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfWeek.toISOString());

      // Get recent orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('id, total_amount, status, created_at, buyer_id')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent farmers
      const { data: farmersData } = await supabase
        .from('farmers')
        .select('id, name, location, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      setAnalytics({
        totalUsers: totalUsers || 0,
        activeFarmers: activeFarmers || 0,
        monthlyRevenue,
        totalOrders: totalOrders || 0,
        pendingDisputes: 7, // Static for now as we don't have disputes table
        newUsersThisMonth: newUsersThisMonth || 0,
        newFarmersThisWeek: newFarmersThisWeek || 0,
        ordersThisWeek: ordersThisWeek || 0,
      });

      setRecentOrders(ordersData || []);
      setRecentFarmers(farmersData || []);

    } catch (err) {
      console.error('Error fetching admin analytics:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analytics,
    recentOrders,
    recentFarmers,
    loading,
    error,
    refetch: fetchAnalytics,
  };
};
