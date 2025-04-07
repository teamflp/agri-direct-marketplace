
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';

interface FarmerCardProps {
  id: number;
  name: string;
  image: string;
  location: string;
  distance: number;
  rating: number;
  productsCount: number;
  specialties: string[];
  onClick: () => void;
}

const FarmerCard = ({
  id,
  name,
  image,
  location,
  distance,
  rating,
  productsCount,
  specialties,
  onClick
}: FarmerCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="font-bold text-lg text-white">{name}</h3>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{distance} km</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">
          {productsCount} produits disponibles
        </p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="text-xs bg-agrimarket-lightGreen text-agrimarket-green rounded-full px-2 py-1"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full bg-agrimarket-orange hover:bg-orange-600 text-white"
        >
          Voir le profil
        </Button>
      </CardContent>
    </Card>
  );
};

export default FarmerCard;
