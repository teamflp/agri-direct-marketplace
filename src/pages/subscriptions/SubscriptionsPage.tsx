
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from 'react-router-dom';
import SubscriptionPlans from './components/PlansList';
import SubscriptionBanner from './components/SubscriptionBanner';
import SubscriptionAdvantages from './components/SubscriptionAdvantages';
import SubscriptionFaq from './components/SubscriptionFaq';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import SubscriptionCta from './components/SubscriptionCta';
import { BookmarkCheck, BookmarkPlus } from 'lucide-react';
import Header from '@/components/layout/Header';

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-6 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {showUserSubscriptions ? "Mes abonnements" : "Nos formules d'abonnement"}
          </h1>
          <Button 
            variant="outline" 
            onClick={toggleUserSubscriptions}
            className="flex items-center gap-2 border-agrimarket-green text-agrimarket-green hover:bg-agrimarket-green hover:text-white"
          >
            {showUserSubscriptions ? (
              <>
                <BookmarkPlus className="h-5 w-5" />
                <span>Voir les formules</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="h-5 w-5" />
                <span>Mes abonnements</span>
              </>
            )}
          </Button>
        </div>
        
        {showUserSubscriptions ? (
          <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
            <UserSubscriptions showTitle={true} />
          </div>
        ) : (
          <>
            <SubscriptionBanner />
            
            <div className="my-16 bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Choisissez la formule qui vous convient</h2>
              <SubscriptionPlans initialSelectedPlan={selectedPlan} />
            </div>
            
            <SubscriptionAdvantages />
            
            <div className="my-16">
              <SubscriptionCta />
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <SubscriptionFaq />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
