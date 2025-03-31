
import React from 'react';
import { Users, ShoppingBasket, MapPin } from 'lucide-react';

const MarketStats = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">AgriMarket en chiffres</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre communauté grandissante d'agriculteurs et de consommateurs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-agrimarket-orange/10 p-4 rounded-full">
                <Users className="h-10 w-10 text-agrimarket-orange" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">230+</h3>
            <p className="text-gray-600">Agriculteurs partenaires</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-agrimarket-green/10 p-4 rounded-full">
                <ShoppingBasket className="h-10 w-10 text-agrimarket-green" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">1.5K+</h3>
            <p className="text-gray-600">Produits bio disponibles</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-agrimarket-orange/10 p-4 rounded-full">
                <MapPin className="h-10 w-10 text-agrimarket-orange" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">14</h3>
            <p className="text-gray-600">Régions couvertes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketStats;
