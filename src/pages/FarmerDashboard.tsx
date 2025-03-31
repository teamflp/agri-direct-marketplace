
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Users, BarChart2, MessageSquare, Package, Settings } from 'lucide-react';
import FarmerDashboardContent from '@/pages/farmer/components/FarmerDashboardContent';

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
      <FarmerDashboardContent />
    </DashboardLayout>
  );
};

export default FarmerDashboard;
