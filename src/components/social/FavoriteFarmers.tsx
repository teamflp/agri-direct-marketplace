
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Star } from 'lucide-react';
import { useSocial, FavoriteFarmer } from '@/contexts/SocialContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

type FavoriteFarmersProps = {
  showTitle?: boolean;
  limit?: number;
};

const FavoriteFarmers = ({ showTitle = true, limit }: FavoriteFarmersProps) => {
  const { getFavoriteFarmers, removeFavoriteFarmer } = useSocial();
  
  const favoriteFarmers = getFavoriteFarmers();
  const displayFarmers = limit ? favoriteFarmers.slice(0, limit) : favoriteFarmers;
  
  if (displayFarmers.length === 0) {
    return (
      <div className="text-center py-8">
        {showTitle && <h2 className="text-2xl font-bold mb-6">Mes agriculteurs favoris</h2>}
        <div className="bg-gray-50 rounded-lg p-8">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Vous ne suivez aucun agriculteur actuellement</p>
          <Button asChild>
            <Link to="/farmers">Découvrir des agriculteurs</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {showTitle && <h2 className="text-2xl font-bold mb-6">Mes agriculteurs favoris</h2>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayFarmers.map((farmer) => (
          <FarmerCard 
            key={farmer.id}
            farmer={farmer}
            onRemove={() => removeFavoriteFarmer(farmer.id)}
          />
        ))}
      </div>
    </div>
  );
};

type FarmerCardProps = {
  farmer: FavoriteFarmer;
  onRemove: () => void;
};

const FarmerCard = ({ farmer, onRemove }: FarmerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={farmer.farmerAvatar} alt={farmer.farmerName} />
              <AvatarFallback>{farmer.farmerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{farmer.farmName}</CardTitle>
              <CardDescription>{farmer.farmerName}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-medium">{farmer.rating.toFixed(1)}</span>
          </div>
          <div className="text-sm text-gray-500">
            {farmer.products} produits
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to={`/farmers/${farmer.farmerId}`}>Voir les produits</Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={onRemove} className="text-red-500">
          <Heart className="h-5 w-5 fill-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FavoriteFarmers;
