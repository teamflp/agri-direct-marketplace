import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InteractiveMap, { MapFarmer } from '@/components/map/InteractiveMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FarmerCard from '@/components/farmers/FarmerCard';

// Exemple de données des agriculteurs pour la carte
const mockFarmers: MapFarmer[] = [
  {
    id: 1,
    name: "Sophie Dubois",
    farmName: "Ferme des Quatre Saisons",
    location: { lat: 14.7167, lng: -17.4677 }, // Près de Dakar
    products: ["Tomates", "Aubergines", "Poivrons", "Salades"],
    categories: ["Légumes", "Fruits"],
    distance: 3.2,
    isCertified: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Jean Leclerc",
    farmName: "Les Ruches de Marie",
    location: { lat: 14.7587, lng: -17.3887 }, // Près de Dakar
    products: ["Miel d'acacia", "Miel de fleurs", "Propolis"],
    categories: ["Miel", "Produits apicoles"],
    distance: 8.5,
    isCertified: true,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Michel Blanc",
    farmName: "Potager du Village",
    location: { lat: 14.6527, lng: -17.4077 }, // Près de Dakar
    products: ["Carottes", "Pommes de terre", "Oignons"],
    categories: ["Légumes"],
    distance: 5.7,
    isCertified: false,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  },
  {
    id: 4,
    name: "Lucie Martin",
    farmName: "Ferme des Collines",
    location: { lat: 14.7897, lng: -17.3097 }, // Près de Dakar
    products: ["Fromage de chèvre", "Yaourt", "Lait cru"],
    categories: ["Produits laitiers"],
    distance: 12.3,
    isCertified: false,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
  },
  {
    id: 5,
    name: "Thomas Petit",
    farmName: "Oliveraie Sunlight",
    location: { lat: 14.7219, lng: -17.5197 }, // Près de Dakar
    products: ["Huile d'olive", "Olives", "Tapenades"],
    categories: ["Huiles", "Olives"],
    distance: 9.8,
    isCertified: true,
    image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=150&h=150&fit=crop"
  }
];

// Clé API pour Google Maps - Remplacez cette valeur par votre propre clé
const GOOGLE_MAPS_API_KEY = '';

const FarmersMap = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<MapFarmer | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const { toast } = useToast();
  
  const handleFarmerSelect = (farmer: MapFarmer) => {
    setSelectedFarmer(farmer);
    
    // Faire défiler jusqu'au détail de l'agriculteur si nécessaire
    document.getElementById('farmer-detail')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleGetDirections = (farmer: MapFarmer) => {
    // Ouvrir Google Maps avec les directions
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${farmer.location.lat},${farmer.location.lng}`, '_blank');
    
    toast({
      title: "Directions en cours d'ouverture",
      description: `Obtention de l'itinéraire vers ${farmer.farmName}`,
    });
  };
  
  const handleContact = (farmer: MapFarmer) => {
    toast({
      title: "Contact en cours",
      description: `Contacter ${farmer.name} de ${farmer.farmName}`,
    });
    // Dans une vraie application, cela ouvrirait un formulaire de contact ou la messagerie
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Carte des Agriculteurs</h1>
            <p className="text-gray-600">Trouvez les agriculteurs près de chez vous et explorez leurs produits</p>
          </div>
          
          <div className="mb-6 flex justify-end">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                className={`rounded-l-md ${viewMode === 'map' ? 'bg-agrimarket-orange' : ''}`}
                onClick={() => setViewMode('map')}
              >
                Carte
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                className={`rounded-r-md ${viewMode === 'list' ? 'bg-agrimarket-orange' : ''}`}
                onClick={() => setViewMode('list')}
              >
                Liste
              </Button>
            </div>
          </div>
          
          {viewMode === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <InteractiveMap 
                  farmers={mockFarmers} 
                  onFarmerSelect={handleFarmerSelect}
                  googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                />
              </div>
              
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="font-bold text-lg mb-3">Comment ça marche</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-agrimarket-orange/10 rounded-full p-1 mr-2 mt-0.5">
                        <MapPin className="w-4 h-4 text-agrimarket-orange" />
                      </div>
                      <span className="text-sm">Cliquez sur les marqueurs pour voir les détails des agriculteurs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-agrimarket-orange/10 rounded-full p-1 mr-2 mt-0.5">
                        <MapPin className="w-4 h-4 text-agrimarket-orange" />
                      </div>
                      <span className="text-sm">Utilisez les filtres pour affiner votre recherche</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-agrimarket-orange/10 rounded-full p-1 mr-2 mt-0.5">
                        <MapPin className="w-4 h-4 text-agrimarket-orange" />
                      </div>
                      <span className="text-sm">Les marqueurs verts indiquent les agriculteurs certifiés bio</span>
                    </li>
                  </ul>
                </div>
                
                {selectedFarmer && (
                  <Card id="farmer-detail" className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 relative">
                      {/* Image de couverture simulée */}
                      <div className="w-full h-full bg-gradient-to-r from-agrimarket-green/50 to-agrimarket-orange/50"></div>
                      <div className="absolute -bottom-10 left-4">
                        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white">
                          <img 
                            src={selectedFarmer.image} 
                            alt={selectedFarmer.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="pt-12 pb-4">
                      <div>
                        <h3 className="font-bold text-lg">{selectedFarmer.farmName}</h3>
                        <p className="text-sm text-gray-600">{selectedFarmer.name}</p>
                        
                        <div className="flex items-center mt-2">
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm">{selectedFarmer.distance} km</span>
                        </div>
                        
                        {selectedFarmer.isCertified && (
                          <div className="mt-2 inline-block bg-agrimarket-green/10 text-agrimarket-green text-xs px-2 py-1 rounded-full">
                            Certifié Bio
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Produits:</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedFarmer.products.map((product, index) => (
                              <span 
                                key={index} 
                                className="text-xs bg-agrimarket-lightGreen text-agrimarket-green rounded-full px-2 py-1"
                              >
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-4">
                          <Button 
                            onClick={() => handleGetDirections(selectedFarmer)}
                            className="flex items-center gap-2"
                            variant="outline"
                          >
                            <Navigation className="w-4 h-4" />
                            Obtenir l'itinéraire
                          </Button>
                          
                          <Button 
                            onClick={() => handleContact(selectedFarmer)}
                            className="bg-agrimarket-orange hover:bg-orange-600 text-white"
                          >
                            Contacter l'agriculteur
                          </Button>
                          
                          <Button variant="link" asChild>
                            <a href={`/farmers/${selectedFarmer.id}`}>Voir le profil complet</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
          
          {viewMode === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFarmers.map((farmer) => (
                <FarmerCard
                  key={farmer.id}
                  id={farmer.id.toString()}
                  name={farmer.name}
                  farmName={farmer.farmName}
                  location={farmer.location.lat.toFixed(4) + ', ' + farmer.location.lng.toFixed(4)}
                  distance={farmer.distance}
                  rating={4.5}
                  reviewsCount={0}
                  isCertified={farmer.isCertified}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmersMap;
