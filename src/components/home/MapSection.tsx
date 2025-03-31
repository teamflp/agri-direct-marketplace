
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Search, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveMap, { MapFarmer } from '@/components/map/InteractiveMap';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";

// Exemple de données simplifiées pour la carte de la page d'accueil
const homepageFarmers: MapFarmer[] = [
  {
    id: 1,
    name: "Sophie Dubois",
    farmName: "Ferme des Quatre Saisons",
    location: { lat: 14.7167, lng: -17.4677 },
    products: ["Tomates", "Aubergines", "Poivrons"],
    categories: ["Légumes", "Fruits"],
    distance: 3.2,
    isCertified: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Jean Leclerc",
    farmName: "Les Ruches de Marie",
    location: { lat: 14.7587, lng: -17.3887 },
    products: ["Miel d'acacia", "Miel de fleurs"],
    categories: ["Miel"],
    distance: 8.5,
    isCertified: true,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Michel Blanc",
    farmName: "Potager du Village",
    location: { lat: 14.6527, lng: -17.4077 },
    products: ["Carottes", "Pommes de terre"],
    categories: ["Légumes"],
    distance: 5.7,
    isCertified: false,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  }
];

// Vous pouvez remplacer cette valeur par une clé Google Maps si vous en avez une
const GOOGLE_MAPS_API_KEY = '';

const MapSection = () => {
  const [address, setAddress] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans une application réelle, cette fonction enverrait l'adresse à un service de géocodage
    // pour obtenir les coordonnées et centrer la carte sur cet emplacement
    toast({
      title: "Recherche en cours",
      description: `Recherche d'agriculteurs près de : ${address}`,
    });
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Trouvez des agriculteurs près de chez vous</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les producteurs locaux et leurs produits disponibles dans votre région.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Votre adresse ou code postal" 
                className="pl-10 pr-4 py-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Button 
                type="submit"
                className="w-full md:w-auto bg-agrimarket-orange hover:bg-agrimarket-brown text-white"
              >
                Rechercher
              </Button>
            </div>
          </form>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 mb-8" style={{ height: '500px' }}>
          <InteractiveMap 
            farmers={homepageFarmers} 
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          />
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white">
            <Link to="/farmers-map" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Explorer la carte complète
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
