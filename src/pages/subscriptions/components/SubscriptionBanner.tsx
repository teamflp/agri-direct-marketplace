
import React from 'react';
import { Button } from "@/components/ui/button";

const SubscriptionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-agrimarket-green to-agrimarket-lightGreen py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Abonnez-vous à des paniers frais et locaux
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Recevez régulièrement des produits de saison directement de nos agriculteurs partenaires
        </p>
        <Button size="lg" className="bg-white text-agrimarket-green hover:bg-gray-100">
          Découvrir nos paniers
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
