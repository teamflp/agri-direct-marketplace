
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

// Importation du composant ProductFilters et du type ProductFilters pour typage
import ProductFilters, { ProductFilters as ProductFiltersType } from '@/components/products/ProductFilters';

// Importation des données des agriculteurs
import { farmersData } from '@/data/farmersData';

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

// Valeurs initiales des filtres avancés
const defaultFilters: ProductFiltersType = {
  search: "",
  priceRange: [0, 50],
  categories: [],
  organic: false,
  localOnly: false,
  freeDelivery: false,
  farmPickup: false,
  distance: 50,
};

const Farmers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");

  const [filtersSheetOpen, setFiltersSheetOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFiltersType>(defaultFilters);

  // Fonction pour la navigation vers le profil de l'agriculteur
  const handleProfileClick = (farmerId: number) => {
    navigate(`/farmers/${farmerId}`);
  };

  // Gestion des filtres avancés
  const handleOpenFilters = () => setFiltersSheetOpen(true);
  const handleCloseFilters = () => setFiltersSheetOpen(false);
  const handleFilterChange = (updatedFilters: ProductFiltersType) => {
    setFilters(updatedFilters);
    handleCloseFilters();
  };
  const handleResetFilters = () => setFilters(defaultFilters);

  // Fonction pour l'action "Plus de filtres"
  const handleMoreFilters = () => {
    handleOpenFilters();
  };

  // Gestion de la pagination
  const goToPage = (pageNumber: number) => {
    // À ajuster si pagination réelle
    alert(`Aller à la page ${pageNumber} (pagination à implémenter)`);
  };

  // Simulation d'un filtrage "search" visuel (pas relié à la vraie liste pour l'instant)
  // À adapter selon ton backend/API
  const filteredFarmers = farmersData.filter((farmer) => {
    // Recherche textuelle
    const matchesSearch = searchTerm === "" || farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Catégorie (hors "Tous les agriculteurs")
    const matchesCategory = !selectedCategory || selectedCategory === "Tous les agriculteurs" || farmer.category === selectedCategory;
    // Distance (si sélectionnée et != "all")
    const matchesDistance = !distanceFilter || distanceFilter === "all" || Number(farmer.distance) <= Number(distanceFilter);

    return matchesSearch && matchesCategory && matchesDistance;
  });

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
                
                {/* Bouton Plus de filtres ACTIF */}
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

          {/* Panneau latéral (Sheet) des Filtres avancés */}
          <Sheet open={filtersSheetOpen} onOpenChange={setFiltersSheetOpen}>
            <SheetContent side="right" className="max-w-md w-full p-0">
              <SheetHeader className="px-6 pt-6">
                <SheetTitle>Filtres avancés</SheetTitle>
              </SheetHeader>
              <div className="p-6 pb-0">
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  categories={farmerCategories.filter((c) => c !== "Tous les agriculteurs")}
                  isOpen={true}
                  onToggle={handleCloseFilters}
                  activeFiltersCount={Object.values(filters).filter((v) => {
                    if (Array.isArray(v)) return v.length > 0;
                    if (typeof v === 'boolean') return v;
                    if (typeof v === 'number') return v !== 50;
                    if (typeof v === 'string') return v.length > 0;
                    return false;
                  }).length}
                />
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Carte des agriculteurs (à implémenter avec une véritable API de carte) */}
          <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
            <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Carte des agriculteurs partenaires</p>
            </div>
          </div>
          
          {/* Liste des agriculteurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
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
