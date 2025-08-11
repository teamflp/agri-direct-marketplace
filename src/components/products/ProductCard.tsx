
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Truck, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AddToCartButton } from './AddToCartButton';
import { ProductSocialActions } from './ProductSocialActions';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { useUnifiedReviews } from '@/hooks/useUnifiedReviews';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating?: number;
  reviews?: number;
  farmerName: string;
  farmerId: string;
  distance?: number;
  organic?: boolean;
  freeDelivery?: boolean;
  farmPickup?: boolean;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  unit,
  farmerName,
  farmerId,
  distance,
  organic,
  freeDelivery,
  farmPickup
}: ProductCardProps) => {
  const { getProductReviews } = useUnifiedReviews();
  const productReviews = getProductReviews(id);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <ProductSocialActions 
            productId={id} 
            farmerId={farmerId}
            className="absolute top-2 right-2"
          />
          {organic && (
            <Badge className="absolute top-2 left-2 bg-green-500">
              Bio
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-lg hover:text-agrimarket-orange transition-colors">
              {name}
            </h3>
          </Link>
          
          <ReviewSummary reviews={productReviews} size="sm" />
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-agrimarket-orange">
              {price.toFixed(2)}€
            </span>
            <span className="text-gray-500">
              /{unit}
            </span>
          </div>

          <Link 
            to={`/farmer/${farmerId}`}
            className="text-sm text-gray-600 hover:text-agrimarket-orange transition-colors"
          >
            par {farmerName}
          </Link>

          {distance && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{distance} km</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {freeDelivery && (
              <Badge variant="secondary" className="text-xs">
                <Truck className="h-3 w-3 mr-1" />
                Livraison gratuite
              </Badge>
            )}
            {farmPickup && (
              <Badge variant="secondary" className="text-xs">
                <Store className="h-3 w-3 mr-1" />
                Retrait ferme
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton 
          productId={id}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
