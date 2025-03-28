
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Search } from 'lucide-react';

const MapSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trouvez des agriculteurs près de chez vous</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les producteurs locaux et leurs produits disponibles dans votre région.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Votre adresse ou code postal" 
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-agrimarket-orange focus:border-transparent"
              />
            </div>
            <div>
              <Button className="w-full md:w-auto bg-agrimarket-orange hover:bg-orange-600 text-white">
                Rechercher
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-lg overflow-hidden h-96 relative shadow-md">
          {/* Placeholder pour la carte interactive */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 text-agrimarket-orange mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Carte interactive des agriculteurs</p>
              <Button variant="outline" className="border-agrimarket-orange text-agrimarket-orange hover:bg-agrimarket-orange hover:text-white">
                Activer la géolocalisation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
