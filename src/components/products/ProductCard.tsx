
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  farmerName: string;
  organic: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  unit,
  rating,
  farmerName,
  organic,
  className,
}: ProductCardProps) => {
  return (
    <div className={cn("product-card bg-white rounded-lg overflow-hidden shadow-md border border-gray-100", className)}>
      <Link to={`/products/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {organic && (
            <div className="absolute top-3 left-3 bg-agrimarket-green text-white text-xs font-bold px-2 py-1 rounded-full">
              BIO
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/products/${id}`} className="hover:text-agrimarket-orange">
            <h3 className="font-bold text-lg">{name}</h3>
          </Link>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Link to={`/farmers/1`} className="text-sm text-gray-600 hover:text-agrimarket-orange mb-3 block">
          {farmerName}
        </Link>
        
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">
            {price.toFixed(2)}€<span className="text-gray-500 text-sm font-normal">/{unit}</span>
          </div>
          <Button variant="default" size="sm" className="bg-agrimarket-orange hover:bg-orange-600 text-white">
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
