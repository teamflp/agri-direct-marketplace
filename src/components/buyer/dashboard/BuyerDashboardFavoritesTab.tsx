
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

// Mock data for favorites
const favorites = [
  {
    id: 1,
    name: "Panier de légumes bio",
    farmer: "Ferme des Quatre Saisons",
    price: 16350,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    farmer: "Les Ruches de Marie",
    price: 5600,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    farmer: "Chèvrerie du Vallon",
    price: 2750,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
  },
];

const BuyerDashboardFavoritesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes produits favoris</CardTitle>
        <CardDescription>
          Les produits que vous avez ajoutés à vos favoris
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200"
                >
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.farmer}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">{product.price.toLocaleString()} FCFA</p>
                  <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600">
                    Acheter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" asChild>
          <Link to="/buyer/favorites">
            Voir tous les favoris
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BuyerDashboardFavoritesTab;
