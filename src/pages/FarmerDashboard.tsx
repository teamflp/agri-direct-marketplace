
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, FileText, ChevronRight, BarChart3, Newspaper, Package, MessageSquare, User, Settings } from 'lucide-react';
import DashboardOverview from './farmer/components/DashboardOverview';
import SummaryCards from './farmer/components/SummaryCards';
import RecentOrders from './farmer/components/RecentOrders';
import LowStockProducts from './farmer/components/LowStockProducts';
import PopularProducts from './farmer/components/PopularProducts';
import OptimizationTips from './farmer/components/OptimizationTips';
import FarmingTipsCard from '@/components/ai/FarmingTipsCard';

const FarmerDashboard = () => {
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

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@quatre-saisons.com"
      avatar={<img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />}
      menuItems={menuItems}
    >
      <DashboardOverview />
      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <RecentOrders />
        <FarmingTipsCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LowStockProducts />
        <PopularProducts />
        <OptimizationTips />
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
