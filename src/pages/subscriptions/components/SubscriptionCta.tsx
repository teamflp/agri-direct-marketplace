
import React from 'react';
import { Button } from "@/components/ui/button";

const SubscriptionCta = () => {
  return (
    <div className="bg-agrimarket-orange py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Prêt à recevoir vos produits frais ?
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Souscrivez à un abonnement dès aujourd'hui et commencez à savourer des produits frais et locaux chaque semaine
        </p>
        <Button size="lg" className="bg-white text-agrimarket-orange hover:bg-gray-100">
          S'abonner maintenant
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCta;
