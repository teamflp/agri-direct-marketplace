
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Truck, Store, Leaf } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  reviews?: number;
  farmerName: string;
  farmerId: number;
  distance?: number;
  organic?: boolean;
  freeDelivery?: boolean;
  farmPickup?: boolean;
  className?: string;
};

const ProductCard = ({ 
  id, 
  name, 
  image, 
  price, 
  unit, 
  rating, 
  reviews = 0,
  farmerName, 
  farmerId,
  distance,
  organic = false,
  freeDelivery = false,
  farmPickup = false,
  className = "" 
}: ProductCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    // Naviguer vers la page détaillée du produit
    navigate(`/products/${id}`);
  };
  
  return (
    <Card 
      className={`overflow-hidden transition-shadow duration-300 hover:shadow-md cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className={`relative ${className.includes("flex") ? "w-1/3" : "aspect-square"}`}>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {organic && (
            <Badge 
              className="bg-green-600 hover:bg-green-700"
            >
              <Leaf className="h-3 w-3 mr-1" />
              Bio
            </Badge>
          )}
          
          {freeDelivery && (
            <Badge 
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Truck className="h-3 w-3 mr-1" />
              Livraison
            </Badge>
          )}
          
          {farmPickup && (
            <Badge 
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Store className="h-3 w-3 mr-1" />
              À la ferme
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className={`p-4 ${className.includes("flex") ? "w-2/3" : ""}`}>
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <span>{farmerName}</span>
            {distance && (
              <div className="flex items-center ml-2 text-xs text-agrimarket-green">
                <MapPin className="w-3 h-3 mr-0.5" />
                {distance} km
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-xs">{rating}</span>
            {reviews > 0 && (
              <span className="text-xs text-gray-500 ml-1">({reviews})</span>
            )}
          </div>
        </div>
        
        <h3 className="font-medium text-lg mb-1 line-clamp-2">{name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-lg text-agrimarket-orange">
            {price.toFixed(2)} €
            <span className="text-xs text-gray-500 font-normal ml-1">/ {unit}</span>
          </div>
        </div>
        
        <AddToCartButton 
          product={{
            id,
            name,
            price,
            image,
            unit,
            farmerName,
            farmerId
          }}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
