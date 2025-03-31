
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from 'react-router-dom';
import SubscriptionPlans from './components/PlansList';
import SubscriptionBanner from './components/SubscriptionBanner';
import SubscriptionAdvantages from './components/SubscriptionAdvantages';
import SubscriptionFaq from './components/SubscriptionFaq';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import SubscriptionCta from './components/SubscriptionCta';

const SubscriptionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan || null;
  
  const [showUserSubscriptions, setShowUserSubscriptions] = React.useState(false);
  
  React.useEffect(() => {
    // Si on reçoit un plan sélectionné, afficher la section de mes abonnements
    if (selectedPlan) {
      setShowUserSubscriptions(true);
    }
  }, [selectedPlan]);
  
  const toggleUserSubscriptions = () => {
    setShowUserSubscriptions(!showUserSubscriptions);
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Abonnements</h1>
        <Button 
          variant="outline" 
          onClick={toggleUserSubscriptions}
        >
          {showUserSubscriptions ? "Voir les forfaits" : "Mes abonnements"}
        </Button>
      </div>
      
      {showUserSubscriptions ? (
        <div className="space-y-8">
          <UserSubscriptions showTitle={true} />
        </div>
      ) : (
        <>
          <SubscriptionBanner />
          
          <div className="my-12">
            <SubscriptionPlans selected={selectedPlan} />
          </div>
          
          <SubscriptionAdvantages />
          
          <div className="my-12">
            <SubscriptionCta />
          </div>
          
          <SubscriptionFaq />
        </>
      )}
    </div>
  );
};

export default SubscriptionsPage;
