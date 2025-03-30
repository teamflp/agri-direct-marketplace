
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface FarmerCardProps {
  id: number;
  name: string;
  image: string;
  location: string;
  distance: number;
  rating: number;
  productsCount: number;
  specialties: string[];
  className?: string;
  onClick?: () => void;
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
  className,
  onClick,
}: FarmerCardProps) => {
  return (
    <div 
      className={cn("farmer-card bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 cursor-pointer", className)}
      onClick={onClick}
    >
      <Link to={`/farmers/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/farmers/${id}`} className="hover:text-agrimarket-orange">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
        </Link>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
          <span className="mx-2">•</span>
          <span>{distance} km</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="text-sm text-gray-600">
            {productsCount} produits
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className="bg-agrimarket-lightGreen text-agrimarket-green border-agrimarket-green/20">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button variant="outline" className="w-full border-agrimarket-orange text-agrimarket-orange hover:bg-agrimarket-orange hover:text-white">
          Voir les produits
        </Button>
      </div>
    </div>
  );
};

export default FarmerCard;
