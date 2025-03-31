
import React from 'react';
import { Button } from "@/components/ui/button";

const SubscriptionCta = () => {
  return (
    <div className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Prêt à recevoir vos produits frais ?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Souscrivez à un abonnement dès aujourd'hui et commencez à savourer des produits frais et locaux chaque semaine
        </p>
        <Button size="lg" className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white">
          S'abonner maintenant
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCta;
