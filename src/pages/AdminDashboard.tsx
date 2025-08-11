
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { adminMenuItems } from '@/components/layout/dashboardNavigation';
import StatCard from '@/components/dashboard/StatCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AdminQuickActions from '@/components/admin/AdminQuickActions';
import AdminRecentActivity from '@/components/admin/AdminRecentActivity';
import { useAdminAnalytics } from '@/hooks/admin/useAdminAnalytics';
import { Users, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const { analytics, recentOrders, recentFarmers, loading, error } = useAdminAnalytics();

  const stats = [
    {
      title: "Utilisateurs totaux",
      value: loading ? "..." : analytics.totalUsers.toString(),
      description: `${analytics.newUsersThisMonth} nouveaux ce mois`,
      icon: Users,
      trend: analytics.newUsersThisMonth > 0 ? { 
        value: analytics.newUsersThisMonth, 
        isPositive: true, 
        label: "ce mois" 
      } : undefined
    },
    {
      title: "Agriculteurs actifs",
      value: loading ? "..." : analytics.activeFarmers.toString(),
      description: `${analytics.newFarmersThisWeek} nouveaux cette semaine`,
      icon: Users,
      variant: 'success' as const
    },
    {
      title: "Commandes totales",
      value: loading ? "..." : analytics.totalOrders.toString(),
      description: `${analytics.ordersThisWeek} cette semaine`,
      icon: ShoppingCart,
      variant: 'default' as const
    },
    {
      title: "Chiffre d'affaires mensuel",
      value: loading ? "..." : `${analytics.monthlyRevenue.toLocaleString()}€`,
      description: "Ce mois-ci",
      icon: TrendingUp,
      trend: analytics.monthlyRevenue > 0 ? { 
        value: Math.round((analytics.monthlyRevenue / 1000)), 
        isPositive: true, 
        label: "k€ ce mois" 
      } : undefined
    }
  ];

  if (error) {
    return (
      <DashboardLayout
        name="Admin AgriMarket"
        email="admin@agrimarket.com"
        avatar={
          <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
            AM
          </div>
        }
        menuItems={adminMenuItems}
      >
        <div className="space-y-8">
          <DashboardHeader
            title="Administration"
            subtitle="Gérez la plateforme AgriMarket"
            userName="Admin"
          />
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      name="Admin AgriMarket"
      email="admin@agrimarket.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          AM
        </div>
      }
      menuItems={adminMenuItems}
    >
      <div className="space-y-8">
        <DashboardHeader
          title="Administration"
          subtitle="Gérez la plateforme AgriMarket"
          userName="Admin"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(4)].map((_, index) => (
              <div key={index} className="p-6 border rounded-lg">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))
          ) : (
            stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))
          )}
        </div>

        {/* Quick Actions */}
        <AdminQuickActions />

        {/* Recent Activity */}
        <AdminRecentActivity 
          recentOrders={recentOrders}
          recentFarmers={recentFarmers}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
