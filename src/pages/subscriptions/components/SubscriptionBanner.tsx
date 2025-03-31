
import React from 'react';
import { Button } from "@/components/ui/button";
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';
import { BookmarkCheck } from 'lucide-react';

const SubscriptionBanner = () => {
  return (
    <div className="relative overflow-hidden shadow-lg mt-16 w-full">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?q=80&w=1920&auto=format&fit=crop"
          alt="Légumes frais" 
          className="w-full h-full object-cover"
        />
        {/* Overlay amélioré */}
        <div className="absolute inset-0 bg-gradient-to-r from-agrimarket-green/90 to-agrimarket-orange/80"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center text-center md:max-w-3xl">
        <div className="mb-6">
          <AgrimarketLogo variant="white" size="lg" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Des paniers frais et locaux à votre porte
        </h1>
        <p className="text-xl text-white mb-8 leading-relaxed">
          Recevez régulièrement des produits de saison directement de nos agriculteurs partenaires. 
          Soutenez l'agriculture locale et mangez sainement avec nos formules d'abonnement flexibles.
        </p>
        <Button size="lg" className="bg-white text-agrimarket-green hover:bg-gray-100 shadow-lg transition-all transform hover:scale-105 flex gap-2 items-center">
          <BookmarkCheck className="h-5 w-5" />
          <span>Découvrir nos paniers</span>
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
