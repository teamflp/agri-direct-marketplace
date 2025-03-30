
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Types pour les agriculteurs
export interface MapFarmer {
  id: number;
  name: string;
  farmName: string;
  location: {
    lat: number;
    lng: number;
  };
  products: string[];
  categories: string[];
  distance: number;
  isCertified: boolean;
  image: string;
}

// Props pour le composant
interface InteractiveMapProps {
  farmers: MapFarmer[];
  googleMapsApiKey?: string;
  userLocation?: {
    lat: number;
    lng: number;
  };
  onFarmerSelect?: (farmer: MapFarmer) => void;
}

const defaultLocation = { lat: 14.6937, lng: -17.4441 }; // Dakar, Sénégal
const mapContainerStyle = { width: '100%', height: '500px' };

const InteractiveMap = ({ 
  farmers, 
  googleMapsApiKey,
  userLocation = defaultLocation,
  onFarmerSelect
}: InteractiveMapProps) => {
  const [apiKey, setApiKey] = useState<string>(googleMapsApiKey || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState<number>(50);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [filteredFarmers, setFilteredFarmers] = useState<MapFarmer[]>(farmers);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<MapFarmer | null>(null);

  // Chargement de l'API Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    // Activer les librairies supplémentaires si nécessaire
    // libraries: ["places"]
  });

  // Fonction pour filtrer les agriculteurs
  const filterFarmers = useCallback(() => {
    let filtered = [...farmers];

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(farmer => 
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        farmer.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrer par catégorie
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(farmer => 
        farmer.categories.includes(categoryFilter)
      );
    }

    // Filtrer par distance
    if (distanceFilter < 50) {
      filtered = filtered.filter(farmer => 
        farmer.distance <= distanceFilter
      );
    }

    // Filtrer par bio
    if (organicOnly) {
      filtered = filtered.filter(farmer => 
        farmer.isCertified
      );
    }

    setFilteredFarmers(filtered);
  }, [farmers, searchTerm, categoryFilter, distanceFilter, organicOnly]);

  // Appliquer les filtres à chaque changement
  useEffect(() => {
    filterFarmers();
  }, [searchTerm, categoryFilter, distanceFilter, organicOnly, filterFarmers]);

  // Définir les options de carte
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  };

  // Gérer le clic sur un marqueur
  const handleMarkerClick = (farmer: MapFarmer) => {
    setSelectedFarmer(farmer);
    if (onFarmerSelect) {
      onFarmerSelect(farmer);
    }
  };

  // Calcul des limites pour voir tous les marqueurs
  const getBounds = () => {
    if (filteredFarmers.length === 0) return null;
    
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
    
    filteredFarmers.forEach(farmer => {
      bounds.extend(new google.maps.LatLng(farmer.location.lat, farmer.location.lng));
    });
    
    return bounds;
  };

  // Ajuster la carte pour voir tous les marqueurs
  const onMapLoad = useCallback((map: google.maps.Map) => {
    const bounds = getBounds();
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [filteredFarmers, userLocation]);

  // Rendu selon l'état de chargement
  if (loadError) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 text-center text-red-500">
          Erreur lors du chargement de Google Maps
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {!apiKey && (
        <div className="bg-yellow-50 p-4 border-b border-yellow-200">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Configuration de la carte nécessaire
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Pour afficher la carte interactive, veuillez entrer votre clé d'API Google Maps:
                </p>
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Entrez votre clé d'API Google Maps"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full"
                  />
                  <p className="mt-1 text-xs text-yellow-600">
                    Vous pouvez obtenir une clé sur <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-white border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text" 
              placeholder="Rechercher par nom, ferme ou produit..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </Button>
        </div>
        
        {showFilters && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="Légumes">Légumes</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Viande">Viande</SelectItem>
                    <SelectItem value="Produits laitiers">Produits laitiers</SelectItem>
                    <SelectItem value="Céréales">Céréales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="distance">Distance maximale: {distanceFilter} km</Label>
                <Slider
                  id="distance"
                  min={0}
                  max={50}
                  step={1}
                  value={[distanceFilter]}
                  onValueChange={(value) => setDistanceFilter(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="flex items-center space-x-2 mt-8">
                <Switch
                  id="organic"
                  checked={organicOnly}
                  onCheckedChange={setOrganicOnly}
                />
                <Label htmlFor="organic">Certifiés Bio uniquement</Label>
              </div>
            </div>
            
            <div className="pt-2">
              <Separator />
              <div className="flex justify-between mt-4">
                <p className="text-sm text-gray-500">
                  {filteredFarmers.length} agriculteur{filteredFarmers.length !== 1 ? 's' : ''} trouvé{filteredFarmers.length !== 1 ? 's' : ''}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('');
                    setDistanceFilter(50);
                    setOrganicOnly(false);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="relative w-full" style={{ height: '500px' }}>
        {!isLoaded ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                {!apiKey ? "Entrez une clé d'API Google Maps valide pour afficher la carte." : "Chargement de la carte..."}
              </p>
            </div>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation}
            zoom={10}
            options={mapOptions}
            onLoad={onMapLoad}
          >
            {/* Marqueur pour la position de l'utilisateur */}
            <Marker 
              position={userLocation}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
            
            {/* Marqueurs pour les agriculteurs */}
            {filteredFarmers.map((farmer) => (
              <Marker
                key={farmer.id}
                position={{ lat: farmer.location.lat, lng: farmer.location.lng }}
                onClick={() => handleMarkerClick(farmer)}
                icon={{
                  url: farmer.isCertified 
                    ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    : 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                  scaledSize: new google.maps.Size(36, 36)
                }}
              />
            ))}
            
            {/* Fenêtre d'information pour l'agriculteur sélectionné */}
            {selectedFarmer && (
              <InfoWindow
                position={{ lat: selectedFarmer.location.lat, lng: selectedFarmer.location.lng }}
                onCloseClick={() => setSelectedFarmer(null)}
              >
                <div className="max-w-sm p-2">
                  <div className="flex items-center mb-2">
                    <img 
                      src={selectedFarmer.image} 
                      alt={selectedFarmer.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-bold text-sm">{selectedFarmer.farmName}</h3>
                      <p className="text-xs text-gray-600">{selectedFarmer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{selectedFarmer.distance} km</span>
                  </div>
                  <div className="text-xs mb-2">
                    <span className="font-medium">Produits : </span>
                    {selectedFarmer.products.join(', ')}
                  </div>
                  {selectedFarmer.isCertified && (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-block mb-2">
                      Certifié Bio
                    </div>
                  )}
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="w-full bg-agrimarket-orange hover:bg-orange-600 text-white mt-2 text-xs"
                    onClick={() => {
                      if (onFarmerSelect) onFarmerSelect(selectedFarmer);
                    }}
                  >
                    Voir le profil
                  </Button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
