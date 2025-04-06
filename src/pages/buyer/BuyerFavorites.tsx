
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Heart, User, ShoppingCart, MessageSquare, Users, FileText, CreditCard } from 'lucide-react';
import FavoriteFarmers from '@/components/social/FavoriteFarmers';
import { useAuth } from '@/contexts/AuthContext';

const BuyerFavorites = () => {
  const { profile } = useAuth();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
    { title: "Abonnements", path: "/buyer-dashboard/subscriptions", icon: <CreditCard size={20} /> },
  ];
  
  return (
    <DashboardLayout
      name={`${profile?.first_name || ''} ${profile?.last_name || ''}`}
      email={profile?.phone_number || ''}
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          {profile?.first_name?.charAt(0) || ''}{profile?.last_name?.charAt(0) || ''}
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mes Agriculteurs Favoris</h1>
        <FavoriteFarmers showTitle={false} />
      </div>
    </DashboardLayout>
  );
};

export default BuyerFavorites;
