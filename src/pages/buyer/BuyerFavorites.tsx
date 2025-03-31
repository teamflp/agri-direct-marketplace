
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText, Heart, MessageSquare, Users, User, Star, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useSocial } from '@/contexts/SocialContext';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const BuyerFavorites = () => {
  const { favoriteFarmers, removeFavoriteFarmer } = useSocial();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleRemoveFavorite = (farmerId: number) => {
    removeFavoriteFarmer(farmerId);
    toast({
      title: "Favori supprimé",
      description: "L'agriculteur a été retiré de vos favoris",
      variant: "default",
    });
  };
  
  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit,
      farmerName: product.farmerName,
      farmerId: product.farmerId,
      quantity: 1
    });
    
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier`,
      variant: "default",
    });
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
        <h1 className="text-3xl font-bold">Mes Favoris</h1>
        
        {favoriteFarmers.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">Vous n'avez pas encore d'agriculteurs favoris</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">Explorez notre marketplace et ajoutez des agriculteurs à vos favoris pour les retrouver facilement ici.</p>
            <Button className="mt-6 bg-agrimarket-orange hover:bg-agrimarket-brown">
              Explorer le marketplace
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {favoriteFarmers.map((farmer) => (
              <Card key={farmer.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                          <img 
                            src={farmer.avatar} 
                            alt={farmer.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{farmer.name}</h3>
                          <p className="text-gray-500">{farmer.location}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm">{farmer.rating} ({farmer.reviewCount} avis)</span>
                          </div>
                          <p className="mt-2 text-sm">{farmer.description}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleRemoveFavorite(farmer.id)}
                        className="h-8 w-8 border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-4">
                    <h4 className="font-medium mb-3">Produits populaires</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {farmer.popularProducts.map((product) => (
                        <div key={product.id} className="border rounded-md p-3 flex flex-col h-full">
                          <div className="h-28 rounded-md overflow-hidden mb-2">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h5 className="font-medium text-sm line-clamp-2">{product.name}</h5>
                          <div className="mt-1 text-sm flex justify-between items-center">
                            <span className="font-medium">{product.price.toFixed(2)} €</span>
                            <span className="text-xs text-gray-500">{product.unit}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2 text-agrimarket-green border-agrimarket-green hover:bg-agrimarket-green/10"
                            onClick={() => handleAddToCart({
                              ...product,
                              farmerName: farmer.name,
                              farmerId: farmer.id
                            })}
                          >
                            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                            Ajouter
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BuyerFavorites;
