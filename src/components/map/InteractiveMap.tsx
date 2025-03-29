
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Search } from 'lucide-react';
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
  mapToken?: string;
  userLocation?: {
    lat: number;
    lng: number;
  };
  onFarmerSelect?: (farmer: MapFarmer) => void;
}

const defaultLocation = { lat: 14.6937, lng: -17.4441 }; // Dakar, Sénégal

const InteractiveMap = ({ 
  farmers, 
  mapToken,
  userLocation = defaultLocation,
  onFarmerSelect
}: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  const [mapboxToken, setMapboxToken] = useState<string>(mapToken || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState<number>(50);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [filteredFarmers, setFilteredFarmers] = useState<MapFarmer[]>(farmers);
  const [showFilters, setShowFilters] = useState(false);
  
  // Fonction pour filtrer les agriculteurs
  const filterFarmers = () => {
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
  };

  // Appliquer les filtres à chaque changement
  useEffect(() => {
    filterFarmers();
  }, [searchTerm, categoryFilter, distanceFilter, organicOnly]);

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [userLocation.lng, userLocation.lat],
      zoom: 9
    });
    
    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Ajouter un marqueur pour la position de l'utilisateur
    new mapboxgl.Marker({ color: '#FF0000' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);
    
    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapboxToken]);
  
  // Mettre à jour les marqueurs quand les filtres changent
  useEffect(() => {
    if (!map.current) return;
    
    // Supprimer les marqueurs existants
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Ajouter de nouveaux marqueurs pour les agriculteurs filtrés
    filteredFarmers.forEach(farmer => {
      // Créer un élément personnalisé pour le marqueur
      const el = document.createElement('div');
      el.className = 'farmer-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.background = farmer.isCertified ? '#10b981' : '#f97316';
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
      
      // Créer un popup avec les informations de l'agriculteur
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 5px;">
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <img src="${farmer.image}" alt="${farmer.farmName}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin-right: 10px;" />
            <div>
              <h3 style="font-weight: bold; margin: 0;">${farmer.farmName}</h3>
              <p style="margin: 0; color: #666;">${farmer.name}</p>
            </div>
          </div>
          <p style="margin: 5px 0;"><strong>Distance:</strong> ${farmer.distance} km</p>
          <p style="margin: 5px 0;"><strong>Produits:</strong> ${farmer.products.join(', ')}</p>
          ${farmer.isCertified ? '<p style="color: #10b981; font-weight: bold; margin: 5px 0;">Certifié Bio</p>' : ''}
          <button style="background: #f97316; color: white; border: none; padding: 5px 10px; border-radius: 4px; width: 100%; cursor: pointer; margin-top: 5px;">Voir le profil</button>
        </div>
      `);
      
      // Créer et ajouter le marqueur
      const marker = new mapboxgl.Marker(el)
        .setLngLat([farmer.location.lng, farmer.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Ajouter un gestionnaire d'événements pour la sélection
      el.addEventListener('click', () => {
        if (onFarmerSelect) {
          onFarmerSelect(farmer);
        }
      });
      
      markers.current.push(marker);
    });
    
    // Ajuster la vue pour montrer tous les marqueurs si nécessaire
    if (filteredFarmers.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Ajouter la position de l'utilisateur aux limites
      bounds.extend([userLocation.lng, userLocation.lat]);
      
      // Ajouter les positions des agriculteurs aux limites
      filteredFarmers.forEach(farmer => {
        bounds.extend([farmer.location.lng, farmer.location.lat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    }
  }, [filteredFarmers, map.current]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {!mapToken && (
        <div className="bg-yellow-50 p-4 border-b border-yellow-200">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Configuration de la carte nécessaire
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Pour afficher la carte interactive, veuillez entrer votre clé d'API Mapbox:
                </p>
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Entrez votre clé d'API Mapbox"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="w-full"
                  />
                  <p className="mt-1 text-xs text-yellow-600">
                    Vous pouvez obtenir une clé sur <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
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
        {!mapboxToken || mapboxToken.length < 10 ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                Entrez une clé d'API Mapbox valide pour afficher la carte.
              </p>
            </div>
          </div>
        ) : (
          <div ref={mapContainer} className="absolute inset-0" />
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
