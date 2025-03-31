
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FarmerSeasonalAdvice from '@/components/farmer/FarmerSeasonalAdvice';
import { ShoppingBag, Users, BarChart2, MessageSquare, Package, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Import des composants du tableau de bord agriculteur
import DashboardOverview from '@/pages/farmer/components/DashboardOverview';
import DashboardStatsCards from '@/pages/farmer/components/DashboardStatsCards';
import RecentOrders from '@/pages/farmer/components/RecentOrders';
import TopProducts from '@/pages/farmer/components/TopProducts';
import LowStockProducts from '@/pages/farmer/components/LowStockProducts';

const FarmerDashboard = () => {
  const menuItems = [
    { title: "Produits", path: "/farmer-dashboard/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer-dashboard/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer-dashboard/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer-dashboard/profile", icon: <Settings size={20} /> },
  ];

  return (
    <DashboardLayout
      name="Jean Dupont"
      email="jean.dupont@fermelocale.fr"
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tableau de bord Agriculteur</h1>
        
        <DashboardStatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders />
          <TopProducts />
        </div>
        
        {/* Ajout de la section de conseils saisonniers */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Conseils de culture</h2>
          <FarmerSeasonalAdvice />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LowStockProducts />
          
          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
              <CardDescription>
                Marchés et événements agricoles prévus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Marché Bio du Centre</h3>
                    <span className="text-sm text-gray-500">15 Mai</span>
                  </div>
                  <p className="text-sm text-gray-600">Place du Marché, 08:00 - 14:00</p>
                </div>
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Foire Agricole Régionale</h3>
                    <span className="text-sm text-gray-500">22-24 Mai</span>
                  </div>
                  <p className="text-sm text-gray-600">Parc des Expositions, Journée</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
