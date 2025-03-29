
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText, Heart, MessageSquare, Users, User, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for favorites
const favorites = [
  {
    id: 1,
    name: "Panier de légumes bio",
    farmer: "Ferme des Quatre Saisons",
    price: 16350,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    rating: 4.8
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    farmer: "Les Ruches de Marie",
    price: 5600,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    rating: 4.6
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    farmer: "Chèvrerie du Vallon",
    price: 2750,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    rating: 4.9
  },
  {
    id: 4,
    name: "Huile d'olive extra vierge",
    farmer: "Oliveraie Sunlight",
    price: 10820,
    image: "https://images.unsplash.com/photo-1594489573458-2423bb0fcd1a",
    rating: 4.7
  },
  {
    id: 5,
    name: "Confiture artisanale",
    farmer: "Ferme des Collines",
    price: 5180,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    rating: 4.5
  },
  {
    id: 6,
    name: "Œufs fermiers",
    farmer: "Potager du Village",
    price: 3200,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
    rating: 4.4
  }
];

const BuyerFavorites = () => {
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleAddToCart = (productId: number, productName: string) => {
    toast({
      title: "Produit ajouté au panier",
      description: `${productName} a été ajouté à votre panier`,
    });
  };
  
  const handleRemoveFromFavorites = (productId: number, productName: string) => {
    toast({
      title: "Supprimé des favoris",
      description: `${productName} a été retiré de vos favoris`,
      variant: "destructive",
    });
    // Dans une application réelle, on filtrerait les favoris ici
  };

  return (
    <DashboardLayout
      name="Martin Pasquier"
      email="martin.p@email.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          MP
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mes produits favoris</h1>
          <Button asChild>
            <Link to="/products">Découvrir plus de produits</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produits favoris</CardTitle>
            <CardDescription>
              Les produits que vous avez ajoutés à vos favoris
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      onClick={() => handleRemoveFromFavorites(product.id, product.name)}
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <Link to={`/farmers/1`} className="text-sm text-gray-600 hover:text-agrimarket-orange block mt-1">
                      {product.farmer}
                    </Link>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-bold">{product.price.toLocaleString()} FCFA</p>
                      <Button 
                        size="sm" 
                        className="bg-agrimarket-orange hover:bg-orange-600"
                        onClick={() => handleAddToCart(product.id, product.name)}
                      >
                        Acheter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyerFavorites;
