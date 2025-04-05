
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Heart, User, ShoppingCart, MessageSquare, Users, FileText, CreditCard } from 'lucide-react';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import { useAuth } from '@/contexts/AuthContext';

const BuyerSubscriptions = () => {
  const { profile } = useAuth();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer/invoices", icon: <FileText size={20} /> },
    { title: "Abonnements", path: "/buyer/subscriptions", icon: <CreditCard size={20} /> },
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
        <h1 className="text-3xl font-bold">Mes Abonnements</h1>
        <UserSubscriptions showTitle={false} />
      </div>
    </DashboardLayout>
  );
};

export default BuyerSubscriptions;
