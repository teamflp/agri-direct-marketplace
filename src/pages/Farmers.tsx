
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  MapPin, 
  Filter,
  Star,
  ChevronDown
} from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Exemple de données des agriculteurs
const farmersData = [
  {
    id: 1,
    name: "Ferme des Quatre Saisons",
    location: "Abidjan, Côte d'Ivoire",
    distance: 5.2,
    image: "https://images.unsplash.com/photo-1592982573131-03044c94cf46",
    description: "Nous cultivons des fruits et légumes bio depuis plus de 10 ans. Notre spécialité est la culture maraîchère sans pesticides.",
    rating: 4.8,
    reviews: 27,
    products: ["Tomates", "Aubergines", "Poivrons", "Salades"],
    isCertified: true,
  },
  {
    id: 2,
    name: "Les Ruches de Marie",
    location: "Yamoussoukro, Côte d'Ivoire",
    distance: 12.5,
    image: "https://images.unsplash.com/photo-1473973266408-ed4e9f2a8d9b",
    description: "Apicultrice passionnée produisant différentes variétés de miels et produits dérivés des ruches dans le respect des abeilles.",
    rating: 4.9,
    reviews: 43,
    products: ["Miel d'acacia", "Miel de fleurs", "Propolis", "Cire d'abeille"],
    isCertified: true,
  },
  {
    id: 3,
    name: "Chèvrerie du Vallon",
    location: "Bouaké, Côte d'Ivoire",
    distance: 8.7,
    image: "https://images.unsplash.com/photo-1528607929406-7f48298301ef",
    description: "Élevage de chèvres en pâturage libre et fabrication artisanale de fromages frais, affinés et yaourts.",
    rating: 4.7,
    reviews: 19,
    products: ["Fromage frais", "Fromage affiné", "Yaourt", "Lait"],
    isCertified: false,
  },
  {
    id: 4,
    name: "Vergers de l'Ouest",
    location: "Man, Côte d'Ivoire",
    distance: 15.3,
    image: "https://images.unsplash.com/photo-1584300492104-1ede11fdb732",
    description: "Production de fruits tropicaux variés avec des techniques d'agriculture durable et équitable.",
    rating: 4.5,
    reviews: 32,
    products: ["Mangues", "Ananas", "Papayes", "Bananes"],
    isCertified: true,
  },
  {
    id: 5,
    name: "Plantation Café Cacao",
    location: "Daloa, Côte d'Ivoire",
    distance: 25.1,
    image: "https://images.unsplash.com/photo-1599930113854-d6d7fd517ba8",
    description: "Plantation familiale spécialisée dans la culture de café et cacao de qualité supérieure avec des méthodes traditionnelles.",
    rating: 4.6,
    reviews: 51,
    products: ["Fèves de cacao", "Café vert", "Café torréfié", "Chocolat artisanal"],
    isCertified: true,
  },
  {
    id: 6,
    name: "Rizières Durables",
    location: "Korhogo, Côte d'Ivoire",
    distance: 18.9,
    image: "https://images.unsplash.com/photo-1455577380025-4321f1e1dca7",
    description: "Culture de riz selon des méthodes traditionnelles et durables, avec l'utilisation de techniques d'irrigation efficaces.",
    rating: 4.4,
    reviews: 15,
    products: ["Riz blanc", "Riz rouge", "Riz parfumé", "Riz complet"],
    isCertified: false,
  },
];

// Catégories de producteurs
const farmerCategories = [
  "Tous les agriculteurs",
  "Maraîchers",
  "Éleveurs",
  "Arboriculteurs",
  "Apiculteurs",
  "Producteurs laitiers",
  "Viticulteurs"
];

const Farmers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");

  // Fonction simulée pour l'action "Voir le profil"
  const handleProfileClick = (farmerId: number) => {
    // À relier à la navigation réelle selon votre routing
    window.location.href = `/farmers/${farmerId}`;
  };

  // Fonction simulée pour l'action "Plus de filtres"
  const handleMoreFilters = () => {
    alert("Le panneau de filtres avancés s'ouvrira ici (fonctionnalité à implémenter).");
  };

  // Gestion de la pagination fictive
  const goToPage = (pageNumber: number) => {
    // À ajuster si pagination réelle
    alert(`Aller à la page ${pageNumber} (pagination à implémenter)`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Nos Agriculteurs Partenaires</h1>
            <p className="text-gray-600">Découvrez les producteurs locaux qui font vivre notre plateforme</p>
          </div>
          
          {/* Barre de recherche et filtres */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Rechercher un agriculteur..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {farmerCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Moins de 5 km</SelectItem>
                    <SelectItem value="10">Moins de 10 km</SelectItem>
                    <SelectItem value="20">Moins de 20 km</SelectItem>
                    <SelectItem value="50">Moins de 50 km</SelectItem>
                    <SelectItem value="all">Toutes distances</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Bouton Plus de filtres actif */}
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 cursor-pointer hover:bg-agrimarket-lightGreen"
                  type="button"
                  onClick={handleMoreFilters}
                >
                  <Filter className="w-4 h-4" />
                  Plus de filtres
                </Button>
              </div>
            </div>
          </div>
          
          {/* Carte des agriculteurs (à implémenter avec une véritable API de carte) */}
          <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
            <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Carte des agriculteurs partenaires</p>
            </div>
          </div>
          
          {/* Liste des agriculteurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmersData.map((farmer) => (
              <Card key={farmer.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={farmer.image} 
                    alt={farmer.name} 
                    className="w-full h-full object-cover"
                  />
                  {farmer.isCertified && (
                    <div className="absolute top-3 right-3 bg-agrimarket-green text-white text-xs px-2 py-1 rounded-full">
                      Certifié Bio
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{farmer.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{farmer.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({farmer.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{farmer.location} · {farmer.distance} km</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {farmer.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Produits phares :</h4>
                    <div className="flex flex-wrap gap-1">
                      {farmer.products.map((product, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-agrimarket-lightGreen text-agrimarket-green rounded-full px-2 py-1"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bouton Voir le profil ACTIF */}
                  <Button 
                    className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown text-white font-semibold cursor-pointer"
                    onClick={() => handleProfileClick(farmer.id)}
                  >
                    Voir le profil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination active */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Précédent
              </Button>
              <Button 
                variant="outline" 
                className="bg-agrimarket-orange text-white border-agrimarket-orange"
                onClick={() => goToPage(1)}
              >
                1
              </Button>
              <Button 
                variant="outline"
                onClick={() => goToPage(2)}
              >
                2
              </Button>
              <Button 
                variant="outline"
                onClick={() => goToPage(2)}
              >
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Farmers;

