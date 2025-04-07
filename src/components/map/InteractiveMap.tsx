
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

export interface MapLocation {
  lat: number;
  lng: number;
}

export interface MapFarmer {
  id: number;
  name: string;
  farmName: string;
  location: MapLocation;
  products: string[];
  categories: string[];
  distance: number;
  isCertified: boolean;
  image: string;
}

interface InteractiveMapProps {
  farmers: MapFarmer[];
  onFarmerSelect: (farmer: MapFarmer) => void;
  googleMapsApiKey: string;
  height?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  farmers,
  onFarmerSelect,
  googleMapsApiKey,
  height = '500px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
  // Charger l'API Google Maps
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      // Si la clé API n'est pas fournie ou si l'API est déjà chargée
      if (!googleMapsApiKey || window.google?.maps) {
        setMapLoaded(true);
        return;
      }
      
      // Créer un script pour charger l'API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    };
    
    loadGoogleMapsApi();
  }, [googleMapsApiKey]);
  
  // Initialiser la carte une fois l'API chargée
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || map) return;
    
    // Déterminer le centre de la carte (moyenne des positions des agriculteurs)
    let centerLat = 14.7167; // Par défaut: Dakar
    let centerLng = -17.4677;
    
    if (farmers.length > 0) {
      const totalLat = farmers.reduce((sum, farmer) => sum + farmer.location.lat, 0);
      const totalLng = farmers.reduce((sum, farmer) => sum + farmer.location.lng, 0);
      centerLat = totalLat / farmers.length;
      centerLng = totalLng / farmers.length;
    }
    
    // Créer la carte
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: centerLat, lng: centerLng },
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
    
    setMap(mapInstance);
  }, [mapLoaded, mapRef, farmers, map]);
  
  // Ajouter les marqueurs des agriculteurs
  useEffect(() => {
    if (!map || !farmers.length) return;
    
    // Supprimer les marqueurs existants
    markers.forEach(marker => marker.setMap(null));
    
    // Créer de nouveaux marqueurs
    const newMarkers = farmers.map(farmer => {
      const marker = new google.maps.Marker({
        position: farmer.location,
        map: map,
        title: farmer.farmName,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: farmer.isCertified ? '#4ade80' : '#f97316',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
          scale: 8
        }
      });
      
      // Ajouter un événement de clic
      marker.addListener('click', () => {
        onFarmerSelect(farmer);
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, farmers, onFarmerSelect]);
  
  if (!googleMapsApiKey) {
    return (
      <div 
        className="bg-gray-100 border rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center p-4">
          <p className="text-gray-500 mb-2">Clé API Google Maps manquante</p>
          <p className="text-sm text-gray-400">
            Configurez une clé API Google Maps pour afficher la carte
          </p>
        </div>
      </div>
    );
  }
  
  if (!mapLoaded) {
    return (
      <div 
        className="bg-gray-100 border rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-agrimarket-orange mb-2 mx-auto" />
          <p className="text-gray-500">Chargement de la carte...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={mapRef} 
      className="rounded-lg shadow-md overflow-hidden border"
      style={{ height }}
    />
  );
};

export default InteractiveMap;
