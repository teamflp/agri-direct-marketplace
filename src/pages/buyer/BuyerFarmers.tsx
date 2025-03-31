
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText, Heart, MessageSquare, Users, User, MessageCircle, Star } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useSocial } from '@/contexts/SocialContext';
import { useMessages } from '@/contexts/MessageContext';
import { FavoriteFarmerButton } from '@/components/social/FavoriteFarmerButton';

// Mock data for favorite farmers
const farmers = [
  {
    id: 1,
    name: "Sophie Dubois",
    farm: "Ferme des Quatre Saisons",
    description: "Productrice de fruits et légumes biologiques variés en fonction des saisons.",
    location: "Région de Thiès",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    cover: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&h=250&fit=crop",
    rating: 4.8,
    products: 28,
    followed: true,
    categories: ["Légumes", "Fruits", "Bio"]
  },
  {
    id: 2,
    name: "Jean Leclerc",
    farm: "Les Ruches de Marie",
    description: "Apiculteur passionné produisant différentes variétés de miel artisanal et produits de la ruche.",
    location: "Région de Saint-Louis",
    avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop",
    cover: "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=800&h=250&fit=crop",
    rating: 4.6,
    products: 12,
    followed: true,
    categories: ["Miel", "Bio", "Artisanal"]
  },
  {
    id: 3,
    name: "Michel Blanc",
    farm: "Potager du Village",
    description: "Maraîcher traditionnel proposant des légumes de saison cultivés selon des méthodes durables.",
    location: "Région de Dakar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    cover: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=250&fit=crop",
    rating: 4.5,
    products: 18,
    followed: true,
    categories: ["Légumes", "Fruits", "Local"]
  }
];

// Mock data for recommended farmers
const recommendedFarmers = [
  {
    id: 4,
    name: "Lucie Martin",
    farm: "Ferme des Collines",
    description: "Productrice de fromages et produits laitiers artisanaux à base de lait de chèvre et de vache.",
    location: "Région de Fatick",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    cover: "https://images.unsplash.com/photo-1500595046743-cd271d694e30?w=800&h=250&fit=crop",
    rating: 4.7,
    products: 15,
    followed: false,
    categories: ["Fromage", "Laitier", "Artisanal"]
  },
  {
    id: 5,
    name: "Thomas Petit",
    farm: "Oliveraie Sunlight",
    description: "Producteur d'huiles d'olive de première qualité et d'olives préparées selon des recettes traditionnelles.",
    location: "Région de Kaolack",
    avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=150&h=150&fit=crop",
    cover: "https://images.unsplash.com/photo-1495107334309-fcf20f6a8343?w=800&h=250&fit=crop",
    rating: 4.9,
    products: 10,
    followed: false,
    categories: ["Huile", "Olives", "Premium"]
  }
];

const BuyerFarmers = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isFarmerFavorite, addFavoriteFarmer, removeFavoriteFarmer, favoriteFarmers } = useSocial();
  const { messageState, setActiveConversation } = useMessages();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleFollowFarmer = (farmer) => {
    const isFavorite = isFarmerFavorite(farmer.id);
    
    if (isFavorite) {
      // Trouver l'ID du favori pour le supprimer
      const favorite = favoriteFarmers.find(f => f.farmerId === farmer.id);
      if (favorite) {
        removeFavoriteFarmer(favorite.id);
      }
    } else {
      // Ajouter l'agriculteur aux favoris
      addFavoriteFarmer({
        farmerId: farmer.id,
        farmerName: farmer.name,
        farmName: farmer.farm,
        farmerAvatar: farmer.avatar,
        products: farmer.products,
        rating: farmer.rating
      });
    }
  };
  
  const handleContactFarmer = (farmerId, farmerName) => {
    // Chercher si une conversation existe déjà
    const conversation = messageState.conversations.find(
      conv => conv.farmerId === farmerId
    );
    
    if (conversation) {
      // Ouvrir la conversation existante
      setActiveConversation(conversation.id);
      navigate('/buyer-dashboard/messages');
    } else {
      // Informer l'utilisateur qu'une nouvelle conversation serait créée dans une vraie application
      toast({
        title: "Nouvelle conversation",
        description: `Une nouvelle conversation avec ${farmerName} serait créée.`,
        variant: "info"
      });
      
      // Dans une vraie application, créer une nouvelle conversation puis naviguer
      // Pour cette démo, on navigue simplement vers la messagerie
      navigate('/buyer-dashboard/messages');
    }
  };
  
  const navigateToFarmerProfile = (farmerId) => {
    navigate(`/farmers/${farmerId}`);
  };

  // Fonction pour afficher un agriculteur dans une carte
  const renderFarmerCard = (farmer) => (
    <Card key={farmer.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 relative">
        <img 
          src={farmer.cover} 
          alt={farmer.farm} 
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => navigateToFarmerProfile(farmer.id)}
        />
        <div className="absolute -bottom-10 left-4">
          <Avatar className="h-20 w-20 border-4 border-white cursor-pointer">
            <img 
              src={farmer.avatar} 
              alt={farmer.name}
              onClick={() => navigateToFarmerProfile(farmer.id)}
            />
          </Avatar>
        </div>
      </div>
      <CardContent className="pt-12 pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <Link to={`/farmers/${farmer.id}`} className="hover:underline">
              <h3 className="font-bold text-lg">{farmer.farm}</h3>
            </Link>
            <p className="text-sm text-gray-600">{farmer.name}</p>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{farmer.rating} · {farmer.products} produits</span>
            </div>
            <p className="text-sm mt-2">{farmer.location}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {farmer.categories.map((category, idx) => (
                <Badge key={idx} variant="outline" className="bg-gray-100">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="flex gap-2"
              onClick={() => handleContactFarmer(farmer.id, farmer.name)}
            >
              <MessageCircle size={16} />
              Contacter
            </Button>
            <FavoriteFarmerButton
              farmerId={farmer.id}
              farmerName={farmer.name}
              farmName={farmer.farm}
              farmerAvatar={farmer.avatar}
              products={farmer.products}
              rating={farmer.rating}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
          <h1 className="text-3xl font-bold">Mes agriculteurs</h1>
          <Button asChild>
            <Link to="/farmers">Découvrir plus d'agriculteurs</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Agriculteurs suivis</CardTitle>
            <CardDescription>
              Les agriculteurs dont vous suivez les produits et les actualités
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {farmers.map(renderFarmerCard)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agriculteurs recommandés</CardTitle>
            <CardDescription>
              D'autres agriculteurs qui pourraient vous intéresser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendedFarmers.map(renderFarmerCard)}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyerFarmers;
