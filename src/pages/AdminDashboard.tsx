
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { adminMenuItems } from '@/components/layout/dashboardNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Users, ShieldAlert, DollarSign, TrendingUp, UserPlus, FileText } from 'lucide-react';
import AdminStatisticsCards from '@/components/admin/AdminStatisticsCards';
import { adminStatistics } from '@/components/admin/data/adminData';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Nouvelles inscriptions",
      value: "47",
      description: "Cette semaine",
      icon: UserPlus,
      trend: { value: 12, isPositive: true, label: "vs semaine dernière" }
    },
    {
      title: "Litiges en attente",
      value: "3",
      description: "Nécessitent une attention",
      icon: ShieldAlert,
      variant: 'warning' as const
    },
    {
      title: "Revenus mensuels",
      value: "€15,420",
      description: "Commissions et abonnements",
      icon: DollarSign,
      trend: { value: 8, isPositive: true, label: "vs mois dernier" }
    },
    {
      title: "Taux de croissance",
      value: "23%",
      description: "Nouveaux utilisateurs actifs",
      icon: TrendingUp,
      variant: 'success' as const
    }
  ];

  const handleExportData = () => {
    console.log('Export des données...');
  };

  const handleGenerateReport = () => {
    console.log('Génération du rapport...');
  };

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
          title="Tableau de bord administrateur"
          subtitle="Vue d'ensemble de la plateforme AgriMarket"
          userName="Admin"
          actions={[
            {
              label: "Exporter les données",
              onClick: handleExportData,
              icon: <FileText className="h-4 w-4" />,
              variant: 'outline'
            },
            {
              label: "Générer un rapport",
              onClick: handleGenerateReport,
              icon: <TrendingUp className="h-4 w-4" />,
              variant: 'default'
            }
          ]}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Original Statistics Cards */}
        <AdminStatisticsCards statistics={adminStatistics} />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
              <CardDescription>Dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Nouvel agriculteur inscrit</p>
                    <p className="text-sm text-gray-600">Ferme du Soleil - il y a 2h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Nouveau litige signalé</p>
                    <p className="text-sm text-gray-600">Commande #CMD-2024-001 - il y a 4h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Paiement reçu</p>
                    <p className="text-sm text-gray-600">Abonnement Premium - il y a 6h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Tâches administratives courantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="font-medium text-blue-900">Modérer les nouveaux produits</div>
                  <div className="text-sm text-blue-700">12 produits en attente</div>
                </button>
                <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                  <div className="font-medium text-yellow-900">Traiter les litiges</div>
                  <div className="text-sm text-yellow-700">3 litiges à résoudre</div>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="font-medium text-green-900">Approuver les agriculteurs</div>
                  <div className="text-sm text-green-700">5 demandes en cours</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
