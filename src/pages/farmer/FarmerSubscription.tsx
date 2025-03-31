
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User
} from 'lucide-react';
import { subscriptionData, invoicesData, plansData } from './data/subscriptionData';
import BillingDetails from './components/BillingDetails';
import ResourceUsage from './components/ResourceUsage';
import InvoiceHistory from './components/InvoiceHistory';
import SubscriptionPlans from './components/SubscriptionPlans';
import SubscriptionHeader from './components/SubscriptionHeader';

const FarmerSubscription = () => {
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Mes produits", path: "/farmer-dashboard/products", icon: <ShoppingBag size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: <CreditCard size={20} /> },
  ];

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@email.com"
      avatar={
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mon abonnement</h1>

        <Card>
          <CardHeader>
            <SubscriptionHeader 
              plan={subscriptionData.plan} 
              status={subscriptionData.status} 
            />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BillingDetails subscription={subscriptionData} />
              <ResourceUsage features={subscriptionData.features} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique des factures</CardTitle>
            <CardDescription>
              Consultez et téléchargez vos factures d'abonnement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceHistory invoices={invoicesData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forfaits disponibles</CardTitle>
            <CardDescription>
              Comparez les différents forfaits et choisissez celui qui vous convient
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionPlans plans={plansData} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerSubscription;
