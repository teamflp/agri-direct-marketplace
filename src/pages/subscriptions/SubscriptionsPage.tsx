
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SubscriptionBanner from './components/SubscriptionBanner';
import PlansList from './components/PlansList';
import SubscriptionAdvantages from './components/SubscriptionAdvantages';
import SubscriptionFaq from './components/SubscriptionFaq';
import SubscriptionCta from './components/SubscriptionCta';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import { useSubscription } from '@/contexts/SubscriptionContext';

const SubscriptionsPage = () => {
  const { subscription } = useSubscription();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Bannière de l'abonnement */}
        <SubscriptionBanner />
        
        {/* Section des abonnements actuels pour les utilisateurs connectés */}
        {subscription && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Vos abonnements actuels</h2>
              <div className="max-w-4xl mx-auto">
                <UserSubscriptions />
              </div>
            </div>
          </section>
        )}
        
        {/* Liste des plans d'abonnement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Nos formules d'abonnement</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Choisissez la formule qui vous convient le mieux et commencez à recevoir des produits frais directement des producteurs locaux.
            </p>
            <PlansList />
          </div>
        </section>
        
        {/* Avantages des abonnements */}
        <SubscriptionAdvantages />
        
        {/* FAQ */}
        <SubscriptionFaq />
        
        {/* Call to Action */}
        <SubscriptionCta />
      </main>
      
      <Footer />
    </div>
  );
};

export default SubscriptionsPage;
