import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Interfaces for the report data structures
export interface MonthlySales {
  month: string;
  ventes: number;
}

export interface UserGrowth {
  month: string;
  utilisateurs: number;
  agriculteurs: number;
}

export interface SalesByCategory {
  name: string;
  value: number;
}

export interface TopSellingProduct {
  id: number;
  name: string;
  farmer: string;
  sales: number;
  revenue: number;
  growth: number; // This might be complex to calculate, will start with 0
}

export interface ReportKPIs {
  totalUsers: number;
  totalFarmers: number;
  totalSales: number;
  totalRevenue: number;
}

export interface YearlyRevenue {
  year: string;
  revenue: number;
}

export interface AdminReportData {
  kpis: ReportKPIs;
  monthlySales: MonthlySales[];
  userGrowth: UserGrowth[];
  salesByCategory: SalesByCategory[];
  topSellingProducts: TopSellingProduct[];
  yearlyRevenue: YearlyRevenue[];
}

export const useAdminReports = () => {
  const [data, setData] = useState<AdminReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // --- 1. Fetch all necessary raw data in parallel ---
      const [
        { count: totalUsers, error: usersError },
        { count: totalFarmers, error: farmersError },
        { data: completedOrders, error: ordersError },
        { data: products, error: productsError },
        { data: farmers, error: farmersDataError },
        { data: allUsers, error: allUsersError },
        { data: farmerProfiles, error: farmerProfilesError },
      ] = await Promise.all([
        supabase.from('user_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('farmers').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*, order_items(*)').eq('status', 'completed'),
        supabase.from('products').select('id, name, category, farmer_id'),
        supabase.from('farmers').select('id, name'),
        supabase.from('user_profiles').select('created_at'),
        supabase.from('user_profiles').select('created_at').eq('role', 'FARMER'),
      ]);

      if (usersError || farmersError || ordersError || productsError || farmersDataError || allUsersError || farmerProfilesError) {
        throw new Error('Failed to fetch initial data.');
      }

      // --- 2. Process KPIs ---
      const totalSales = completedOrders.length;
      const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.total || 0), 0);

      // --- 3. Process time-series data (last 12 months) ---
      const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      const now = new Date();

      const userGrowthMap = new Map<string, { utilisateurs: number, agriculteurs: number }>();
      const monthlySalesMap = new Map<string, number>();

      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        userGrowthMap.set(monthKey, { utilisateurs: 0, agriculteurs: 0 });
        monthlySalesMap.set(monthKey, 0);
      }

      allUsers?.forEach(user => {
        const userDate = new Date(user.created_at);
        if (userDate >= new Date(now.getFullYear(), now.getMonth() - 11, 1)) {
          const monthKey = `${monthNames[userDate.getMonth()]} ${userDate.getFullYear()}`;
          const current = userGrowthMap.get(monthKey);
          if (current) {
            current.utilisateurs++;
          }
        }
      });

      farmerProfiles?.forEach(farmerProfile => {
        const farmerDate = new Date(farmerProfile.created_at);
        if (farmerDate >= new Date(now.getFullYear(), now.getMonth() - 11, 1)) {
          const monthKey = `${monthNames[farmerDate.getMonth()]} ${farmerDate.getFullYear()}`;
          const current = userGrowthMap.get(monthKey);
          if (current) {
            current.agriculteurs++;
          }
        }
      });

      completedOrders.forEach(order => {
        const orderDate = new Date(order.created_at);
        if (orderDate >= new Date(now.getFullYear(), now.getMonth() - 11, 1)) {
          const monthKey = `${monthNames[orderDate.getMonth()]} ${orderDate.getFullYear()}`;
          const current = monthlySalesMap.get(monthKey) || 0;
          monthlySalesMap.set(monthKey, current + (order.total || 0));
        }
      });

      const userGrowth = Array.from(userGrowthMap.entries()).map(([month, data]) => ({ month, ...data }));
      const monthlySales = Array.from(monthlySalesMap.entries()).map(([month, ventes]) => ({ month, ventes }));

      // --- 4. Process categorical and top product data ---
      const productMap = new Map(products.map(p => [p.id, p]));
      const farmerMap = new Map(farmers.map(f => [f.id, f.name]));

      const salesByCategoryMap = new Map<string, number>();
      const topProductsMap = new Map<number, { sales: number, revenue: number }>();

      for (const order of completedOrders) {
        if (order.order_items) {
          for (const item of order.order_items) {
            const product = productMap.get(item.product_id);
            if (product) {
              const itemRevenue = (item.quantity || 0) * (item.price || 0);

              // Sales by Category
              const category = product.category || 'Non catégorisé';
              salesByCategoryMap.set(category, (salesByCategoryMap.get(category) || 0) + itemRevenue);

              // Top Selling Products
              const productStats = topProductsMap.get(product.id) || { sales: 0, revenue: 0 };
              productStats.sales += item.quantity || 0;
              productStats.revenue += itemRevenue;
              topProductsMap.set(product.id, productStats);
            }
          }
        }
      }

      const salesByCategory = Array.from(salesByCategoryMap.entries()).map(([name, value]) => ({ name, value }));
      const topSellingProducts = Array.from(topProductsMap.entries()).map(([id, stats]) => {
        const product = productMap.get(id);
        const farmerName = product ? farmerMap.get(product.farmer_id) : 'N/A';
        return {
          id,
          name: product ? product.name : 'Produit inconnu',
          farmer: farmerName || 'Agriculteur inconnu',
          sales: stats.sales,
          revenue: stats.revenue,
          growth: 0, // Growth calculation is complex, setting to 0 for now
        };
      }).sort((a, b) => b.sales - a.sales).slice(0, 5);

      // --- 5. Process Yearly Revenue ---
      const yearlyRevenueMap = new Map<string, number>();
      completedOrders.forEach(order => {
        const year = new Date(order.created_at).getFullYear().toString();
        const currentRevenue = yearlyRevenueMap.get(year) || 0;
        yearlyRevenueMap.set(year, currentRevenue + (order.total || 0));
      });
      const yearlyRevenue = Array.from(yearlyRevenueMap.entries()).map(([year, revenue]) => ({ year, revenue })).sort((a, b) => a.year.localeCompare(b.year));


      // --- 6. Assemble final data object ---
      const reportData: AdminReportData = {
        kpis: {
          totalUsers: totalUsers || 0,
          totalFarmers: totalFarmers || 0,
          totalSales,
          totalRevenue,
        },
        monthlySales,
        userGrowth,
        salesByCategory,
        topSellingProducts,
        yearlyRevenue,
      };

      setData(reportData);

    } catch (err: any) {
      console.error('Error fetching admin report data:', err);
      setError('Erreur lors du chargement des rapports: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  return {
    data,
    loading,
    error,
    refetch: fetchReportData,
  };
};
