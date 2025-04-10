
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrdersList from './components/OrdersList';

const FarmerOrders = () => {
  const { user, profile } = useAuth();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer", icon: <BarChart2 size={20} /> },
    { title: "Produits", path: "/farmer/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer/profile", icon: <Settings size={20} /> },
  ];

  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Jean Dupont';
    
  const email = user?.email || 'jean.dupont@fermelocale.fr';

  // Données d'exemple pour les commandes
  const orders = [
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
    },
    {
      id: "CMD-003",
      customer: "Sophie Lefebvre",
      date: "8 Mai 2023",
      total: 27.80,
      items: 2,
      status: "En préparation"
    },
    {
      id: "CMD-004",
      customer: "Lucas Bernard",
      date: "5 Mai 2023",
      total: 58.90,
      items: 5,
      status: "Livrée"
    }
  ];

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Commandes</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Historique des commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersList orders={orders} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerOrders;
