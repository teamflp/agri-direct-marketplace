
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-agrimarket-lightGreen to-agrimarket-green/20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
          alt="Fond agricole" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Des produits frais <span className="text-agrimarket-orange">directement</span> des agriculteurs à votre table
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Soutenez les producteurs locaux et profitez de produits frais, de saison et de qualité, livrés près de chez vous.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-agrimarket-orange hover:bg-orange-600 text-white text-lg py-6 px-8">
              Découvrir les produits
            </Button>
            <Button variant="outline" className="border-agrimarket-green text-agrimarket-green hover:bg-agrimarket-green hover:text-white text-lg py-6 px-8">
              Rejoindre la plateforme
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
