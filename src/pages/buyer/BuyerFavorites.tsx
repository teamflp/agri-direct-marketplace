
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText, Heart, MessageSquare, Users, User, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { AddToCartButton } from '@/components/products/AddToCartButton';

// Mock data for favorites
const favorites = [
  {
    id: 1,
    name: "Panier de légumes bio",
    farmer: "Ferme des Quatre Saisons",
    farmerId: 101,
    price: 16350,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    rating: 4.8,
    unit: "panier"
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    farmer: "Les Ruches de Marie",
    farmerId: 102,
    price: 5600,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    rating: 4.6,
    unit: "pot 500g"
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    farmer: "Chèvrerie du Vallon",
    farmerId: 103,
    price: 2750,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    rating: 4.9,
    unit: "pièce"
  },
  {
    id: 4,
    name: "Huile d'olive extra vierge",
    farmer: "Oliveraie Sunlight",
    farmerId: 104,
    price: 10820,
    image: "https://images.unsplash.com/photo-1594489573458-2423bb0fcd1a",
    rating: 4.7,
    unit: "bouteille 750ml"
  },
  {
    id: 5,
    name: "Confiture artisanale",
    farmer: "Ferme des Collines",
    farmerId: 105,
    price: 5180,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    rating: 4.5,
    unit: "pot 250g"
  },
  {
    id: 6,
    name: "Œufs fermiers",
    farmer: "Potager du Village",
    farmerId: 106,
    price: 3200,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
    rating: 4.4,
    unit: "boîte de 6"
  }
];

const BuyerFavorites = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [favoriteProducts, setFavoriteProducts] = useState(favorites);
  const { addToCart } = useCart();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price / 100, // Convertir en euros pour la cohérence
      image: product.image,
      unit: product.unit,
      farmerName: product.farmer,
      farmerId: product.farmerId
    });
    
    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    });
  };
  
  const handleRemoveFromFavorites = (productId) => {
    const productToRemove = favoriteProducts.find(p => p.id === productId);
    setFavoriteProducts(favoriteProducts.filter(p => p.id !== productId));
    
    toast({
      title: "Supprimé des favoris",
      description: `${productToRemove.name} a été retiré de vos favoris`,
      variant: "destructive",
    });
  };
  
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
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
              {favoriteProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div 
                    className="h-40 relative cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromFavorites(product.id);
                      }}
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 
                        className="font-semibold cursor-pointer hover:text-agrimarket-orange transition-colors"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/farmers/${product.farmerId}`} 
                      className="text-sm text-gray-600 hover:text-agrimarket-orange block mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {product.farmer}
                    </Link>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-bold">{product.price.toLocaleString()} FCFA</p>
                      <Button 
                        size="sm" 
                        className="bg-agrimarket-orange hover:bg-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
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
