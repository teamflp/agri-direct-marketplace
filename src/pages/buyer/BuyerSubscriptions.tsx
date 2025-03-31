
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MessageSquare, ShoppingBag, User, CreditCard, BookmarkCheck } from 'lucide-react';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';

const BuyerSubscriptions = () => {
  const { getUserSubscriptions } = useSubscription();
  const subscriptions = getUserSubscriptions();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <User size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <User size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes factures", path: "/buyer-dashboard/invoices", icon: <CreditCard size={20} /> },
    { title: "Mes abonnements", path: "/buyer-dashboard/subscriptions", icon: <BookmarkCheck size={20} /> },
  ];

  return (
    <DashboardLayout
      name="Thomas Dubois"
      email="thomas.d@email.com"
      avatar={
        <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop" alt="Thomas Dubois" />
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mes abonnements</h1>
          <Button asChild className="bg-agrimarket-green hover:bg-green-700">
            <Link to="/subscriptions">
              <BookmarkCheck className="mr-2 h-4 w-4" />
              Découvrir plus de paniers
            </Link>
          </Button>
        </div>
        
        <UserSubscriptions />
        
        {subscriptions.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-4">Informations importantes</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Les abonnements sont facturés à chaque livraison selon la fréquence choisie.</li>
              <li>Vous pouvez mettre en pause ou annuler votre abonnement à tout moment.</li>
              <li>Le renouvellement automatique peut être désactivé dans les paramètres de l'abonnement.</li>
              <li>Pour toute question concernant votre abonnement, contactez directement l'agriculteur ou notre service client.</li>
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BuyerSubscriptions;
