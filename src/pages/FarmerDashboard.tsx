
import React from 'react';
import { useDashboardData } from './farmer/hooks/useDashboardData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart3, FileText, MessageSquare, Newspaper, Package, Settings, ShoppingCart, User } from 'lucide-react';
import DashboardOverview from './farmer/components/DashboardOverview';
import SummaryCards from './farmer/components/SummaryCards';
import RecentOrders from './farmer/components/RecentOrders';
import LowStockProducts from './farmer/components/LowStockProducts';
import PopularProducts from './farmer/components/PopularProducts';
import OptimizationTips from './farmer/components/OptimizationTips';
import FarmingTipsCard from '@/components/ai/FarmingTipsCard';

const FarmerDashboard = () => {
  // Récupération des données du dashboard
  const { products, orders, subscription } = useDashboardData();
  
  // Menu items pour la sidebar
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <BarChart3 size={20} /> },
    { title: "Commandes", path: "/farmer/orders", icon: <ShoppingCart size={20} /> },
    { title: "Produits", path: "/farmer/products", icon: <Package size={20} /> },
    { title: "Inventaire", path: "/farmer/inventory", icon: <FileText size={20} /> },
    { title: "Blog & Actualités", path: "/farmer/blog", icon: <Newspaper size={20} /> },
    { title: "Messagerie", path: "/farmer/messages", icon: <MessageSquare size={20} /> },
    { title: "Analytiques", path: "/farmer/analytics", icon: <BarChart3 size={20} /> },
    { title: "Mon Profil", path: "/farmer/profile", icon: <User size={20} /> },
    { title: "Abonnement", path: "/farmer/subscription", icon: <Settings size={20} /> }
  ];

  // Handlers pour les actions des composants
  const handleViewAllOrders = () => {
    // Navigation vers la page des commandes (à implémenter)
    console.log("Navigation vers la liste complète des commandes");
  };

  const handleManageProducts = () => {
    // Navigation vers la page des produits (à implémenter)
    console.log("Navigation vers la gestion des produits");
  };

  const handleUpdateStock = (productId: number) => {
    // Mise à jour du stock (à implémenter)
    console.log("Mise à jour du stock pour le produit", productId);
  };

  // Filtrer les produits avec un stock bas (moins de 15 unités)
  const lowStockProducts = products.filter(p => p.stock < 15);

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@quatre-saisons.com"
      avatar={<img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />}
      menuItems={menuItems}
    >
      <DashboardOverview 
        products={products}
        orders={orders}
        subscription={subscription}
        onViewAllOrders={handleViewAllOrders}
        onManageProducts={handleManageProducts}
      />
      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <RecentOrders 
          orders={orders}
          onViewAllOrders={handleViewAllOrders}
        />
        <FarmingTipsCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LowStockProducts 
          lowStockProducts={lowStockProducts}
          onUpdateClick={handleUpdateStock}
        />
        <PopularProducts />
        <OptimizationTips />
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
