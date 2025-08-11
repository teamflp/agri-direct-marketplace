
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { adminMenuItems } from '@/components/layout/dashboardNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Users, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Utilisateurs actifs",
      value: "1,234",
      description: "150 nouveaux ce mois",
      icon: Users,
      trend: { value: 12, isPositive: true, label: "vs mois dernier" }
    },
    {
      title: "Commandes totales",
      value: "856",
      description: "En cours de traitement",
      icon: ShoppingCart,
      variant: 'success' as const
    },
    {
      title: "Litiges ouverts",
      value: "7",
      description: "3 nécessitent une action",
      icon: AlertTriangle,
      variant: 'warning' as const
    },
    {
      title: "Chiffre d'affaires",
      value: "45,230€",
      description: "Commission mensuelle",
      icon: TrendingUp,
      trend: { value: 8, isPositive: true, label: "ce mois" }
    }
  ];

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
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  Actions d'administration disponibles via le menu latéral
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  Historique des activités
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
