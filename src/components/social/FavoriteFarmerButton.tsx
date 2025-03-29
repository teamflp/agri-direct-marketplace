
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';
import { useToast } from '@/hooks/use-toast';

type FavoriteFarmerButtonProps = {
  farmerId: number;
  farmerName: string;
  farmName: string;
  farmerAvatar?: string;
  products: number;
  rating: number;
  variant?: 'icon' | 'button' | 'link';
  className?: string;
};

const FavoriteFarmerButton = ({ 
  farmerId, 
  farmerName, 
  farmName,
  farmerAvatar, 
  products,
  rating,
  variant = 'button',
  className = '',
}: FavoriteFarmerButtonProps) => {
  const { isFarmerFavorite, addFavoriteFarmer, removeFavoriteFarmer, favoriteFarmers } = useSocial();
  const { toast } = useToast();
  
  const isFavorite = isFarmerFavorite(farmerId);
  
  const toggleFavorite = () => {
    if (isFavorite) {
      // Find the favorite ID
      const favorite = favoriteFarmers.find(f => f.farmerId === farmerId);
      if (favorite) {
        removeFavoriteFarmer(favorite.id);
      }
    } else {
      addFavoriteFarmer({
        farmerId,
        farmerName,
        farmName,
        farmerAvatar,
        products,
        rating
      });
    }
  };
  
  let favoriteButton;
  
  switch (variant) {
    case 'icon':
      favoriteButton = (
        <Button 
          variant="ghost" 
          size="icon" 
          className={className}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isFavorite ? (
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          ) : (
            <Heart className="h-4 w-4" />
          )}
        </Button>
      );
      break;
    case 'link':
      favoriteButton = (
        <Button 
          variant="link" 
          className={className}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <>
              <Heart className="h-4 w-4 fill-red-500 text-red-500 mr-2" />
              Retirer des favoris
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              Suivre cet agriculteur
            </>
          )}
        </Button>
      );
      break;
    case 'button':
    default:
      favoriteButton = (
        <Button 
          variant={isFavorite ? "default" : "outline"} 
          className={`${className} ${isFavorite ? 'bg-red-500 hover:bg-red-600' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <>
              <HeartOff className="h-4 w-4 mr-2" />
              Ne plus suivre
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              Suivre cet agriculteur
            </>
          )}
        </Button>
      );
  }
  
  return favoriteButton;
};

export default FavoriteFarmerButton;
