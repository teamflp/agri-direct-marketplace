
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Agriculteurs dans un champ" className="w-full h-full object-cover" />
        {/* Overlay orangé pour correspondre au design de référence */}
        <div className="absolute inset-0 bg-gradient-to-r from-agrimarket-orange/70 to-agrimarket-orange/40"></div>
      </div>
      
      {/* Contenu */}
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Des produits frais, de la ferme à votre table
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Découvrez des produits locaux cultivés avec passion par nos agriculteurs partenaires, livrés directement chez vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-agrimarket-orange hover:bg-gray-100" onClick={() => navigate('/products')}>
              Découvrir nos produits
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/farmers')} className="border-white text-white bg-orange-500 hover:bg-orange-400">
              Rencontrer nos agriculteurs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
