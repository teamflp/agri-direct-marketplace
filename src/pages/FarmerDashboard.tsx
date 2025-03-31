
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
import { InventoryProductType } from '@/pages/farmer/FarmerInventory';

const FarmerDashboard = () => {
  const menuItems = [
    { title: "Produits", path: "/farmer-dashboard/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer-dashboard/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer-dashboard/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer-dashboard/profile", icon: <Settings size={20} /> },
  ];

  // Mock data for DashboardStatsCards
  const dashboardStats = {
    salesThisMonth: 37,
    customersCount: 24,
    productsCount: 18
  };

  // Mock data for RecentOrders
  const recentOrders = [
    {
      id: "CMD-001",
      customer: "Marie Dubois",
      date: "12 Mai 2023",
      total: 45.50,
      items: 4,
      status: "Confirmée"
    },
    {
      id: "CMD-002",
      customer: "Pierre Martin",
      date: "10 Mai 2023",
      total: 32.20,
      items: 3,
      status: "Livrée"
    }
  ];

  // Mock data for TopProducts
  const topProducts = [
    {
      id: 1,
      name: "Tomates Bio",
      price: 3.50,
      stock: 25,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1546520057-a59c8fb22400?w=500&h=500&fit=crop",
      sales: 42
    },
    {
      id: 2,
      name: "Carottes",
      price: 2.20,
      stock: 18,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop",
      sales: 36
    },
    {
      id: 3,
      name: "Pommes de terre",
      price: 1.80,
      stock: 40,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop",
      sales: 28
    }
  ];

  // Mock data for LowStockProducts
  const lowStockProducts: InventoryProductType[] = [
    {
      id: 4,
      name: "Laitue",
      price: 1.50,
      inventory: 3,
      minimumStock: 5,
      unit: "pièce",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500&h=500&fit=crop",
      category: "Légumes",
      organic: true,
      published: true,
      stockHistory: [
        {
          date: "2023-05-01",
          quantity: 10,
          type: "add",
          reason: "Livraison initiale"
        },
        {
          date: "2023-05-10",
          quantity: 7,
          type: "remove",
          reason: "Ventes"
        }
      ],
      lastUpdated: "2023-05-10"
    },
    {
      id: 5,
      name: "Aubergines",
      price: 2.80,
      inventory: 4,
      minimumStock: 10,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1613878501069-18e97ac2dacf?w=500&h=500&fit=crop",
      category: "Légumes",
      organic: false,
      published: true,
      stockHistory: [
        {
          date: "2023-05-05",
          quantity: 15,
          type: "add",
          reason: "Livraison initiale"
        },
        {
          date: "2023-05-15",
          quantity: 11,
          type: "remove",
          reason: "Ventes"
        }
      ],
      lastUpdated: "2023-05-15"
    }
  ];

  // Event handlers
  const handleViewAllOrders = () => {
    window.location.href = "/farmer-dashboard/orders";
  };

  const handleManageProducts = () => {
    window.location.href = "/farmer-dashboard/products";
  };

  const handleUpdateInventory = (product: InventoryProductType) => {
    console.log("Update inventory for product:", product);
    // Actual implementation would open a dialog to update the inventory
  };

  return (
    <DashboardLayout
      name="Jean Dupont"
      email="jean.dupont@fermelocale.fr"
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tableau de bord Agriculteur</h1>
        
        <DashboardStatsCards 
          salesThisMonth={dashboardStats.salesThisMonth}
          customersCount={dashboardStats.customersCount}
          productsCount={dashboardStats.productsCount}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders 
            orders={recentOrders} 
            onViewAllOrders={handleViewAllOrders} 
          />
          <TopProducts 
            products={topProducts} 
            onManageProducts={handleManageProducts} 
          />
        </div>
        
        {/* Ajout de la section de conseils saisonniers */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Conseils de culture</h2>
          <FarmerSeasonalAdvice />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LowStockProducts 
            lowStockProducts={lowStockProducts} 
            onUpdateClick={handleUpdateInventory} 
          />
          
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
