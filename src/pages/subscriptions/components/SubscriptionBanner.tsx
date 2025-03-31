
import React from 'react';
import { Button } from "@/components/ui/button";

const SubscriptionBanner = () => {
  return (
    <div className="relative">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?q=80&w=1920&auto=format&fit=crop"
          alt="Légumes frais" 
          className="w-full h-full object-cover"
        />
        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-r from-agrimarket-green/80 to-agrimarket-darkGreen/80"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
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
