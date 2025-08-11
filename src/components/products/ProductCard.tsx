
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Truck, Store, Leaf, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

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
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: id.toString(),
      name,
      price,
      quantity,
      image,
      farmerName,
      farmerId: farmerId.toString(),
      unit
    });
    
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} × ${name} a été ajouté à votre panier`,
    });
    
    setQuantity(1);
  };

  return (
    <Card 
      className={`overflow-hidden transition-shadow duration-300 hover:shadow-md cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {organic && (
            <Badge className="bg-agrimarket-green text-white hover:bg-agrimarket-darkGreen">
              <Leaf className="h-3 w-3 mr-1" />
              Bio
            </Badge>
          )}
          {freeDelivery && (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
              <Truck className="h-3 w-3 mr-1" />
              Livraison
            </Badge>
          )}
          {farmPickup && (
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
              <Store className="h-3 w-3 mr-1" />
              À la ferme
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm text-gray-600 hover:text-agrimarket-green transition-colors flex items-center">
              {farmerName}
              {distance && (
                <span className="flex items-center ml-2 text-xs text-agrimarket-green">
                  <MapPin className="w-3 h-3 mr-0.5" />
                  {distance} km
                </span>
              )}
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
              {reviews > 0 && (
                <span className="text-xs text-gray-500 ml-1">({reviews})</span>
              )}
            </div>
          </div>
          
          <h3 className="font-medium text-lg mb-2 line-clamp-2 hover:text-agrimarket-green transition-colors">
            {name}
          </h3>
          
          <div className="text-xl font-bold text-agrimarket-orange mb-4">
            {price.toFixed(2)} €
            <span className="text-sm text-gray-500 font-normal ml-1">/ {unit}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={(e) => {
                e.stopPropagation();
                if (quantity > 1) setQuantity(prev => prev - 1);
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(prev => prev + 1);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-agrimarket-green hover:bg-agrimarket-darkGreen"
          >
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
