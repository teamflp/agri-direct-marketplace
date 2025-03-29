
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  farmerName: string;
  organic?: boolean;
  className?: string;
};

const ProductCard = ({ 
  id, 
  name, 
  image, 
  price, 
  unit, 
  rating, 
  farmerName, 
  organic = false, 
  className = "" 
}: ProductCardProps) => {
  // Mock data for farmer
  const farmerId = parseInt(id.toString() + '00');
  
  return (
    <Card className={`overflow-hidden transition-shadow duration-300 hover:shadow-md ${className}`}>
      <div className={`relative ${className.includes("flex") ? "w-1/3" : "aspect-square"}`}>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {organic && (
          <Badge 
            className="absolute top-2 right-2 bg-agrimarket-green"
          >
            Bio
          </Badge>
        )}
      </div>
      
      <CardContent className={`p-4 ${className.includes("flex") ? "w-2/3" : ""}`}>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm text-gray-500">{farmerName}</span>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-xs">{rating}</span>
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
