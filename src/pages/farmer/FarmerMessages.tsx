
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MessagesList from './components/MessagesList';

const FarmerMessages = () => {
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

  // Mock data for messages
  const messages = [
    {
      id: 1,
      customer: "Marie Dupont",
      lastMessage: "Bonjour, je voudrais savoir si vos tomates bio sont disponibles cette semaine?",
      date: "Aujourd'hui, 10:23",
      unread: true
    },
    {
      id: 2,
      customer: "Thomas Martin",
      lastMessage: "Merci pour votre réponse. Je passerai demain pour récupérer ma commande.",
      date: "Hier, 16:45",
      unread: false
    },
    {
      id: 3,
      customer: "Sophie Leblanc",
      lastMessage: "Est-ce que vous livrez dans ma région ? Je suis à Bordeaux.",
      date: "23 mai, 09:12",
      unread: true
    },
    {
      id: 4,
      customer: "Pierre Dubois",
      lastMessage: "Les fraises étaient délicieuses, merci !",
      date: "20 mai, 14:30",
      unread: false
    }
  ];

  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Jean Dupont';
    
  const email = user?.email || 'jean.dupont@fermelocale.fr';

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Messagerie</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Vos conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <MessagesList messages={messages} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerMessages;
