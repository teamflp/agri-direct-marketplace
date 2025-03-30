
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import { useSubscription } from '@/contexts/SubscriptionContext';
import SubscriptionBanner from './components/SubscriptionBanner';
import PlansList from './components/PlansList';
import SubscriptionAdvantages from './components/SubscriptionAdvantages';
import SubscriptionFaq from './components/SubscriptionFaq';
import SubscriptionCta from './components/SubscriptionCta';

const SubscriptionsPage = () => {
  const { getUserSubscriptions } = useSubscription();
  const userSubscriptions = getUserSubscriptions();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer le plan sélectionné depuis l'état de navigation
    if (location.state && location.state.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
      // Faire défiler jusqu'à la section des plans
      setTimeout(() => {
        const plansSection = document.getElementById('plans-section');
        if (plansSection) {
          plansSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <SubscriptionBanner />
        
        {/* Mes abonnements (si l'utilisateur en a) */}
        {userSubscriptions.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <UserSubscriptions />
          </div>
        )}
        
        <div id="plans-section">
          <PlansList initialSelectedPlan={selectedPlan} />
        </div>
        <SubscriptionAdvantages />
        <SubscriptionFaq />
        <SubscriptionCta />
      </main>
      
      <Footer />
    </div>
  );
};

export default SubscriptionsPage;
