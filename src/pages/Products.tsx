
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Grid,
  List,
  SortAsc,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductFilters, { ProductFilters as FiltersType } from '@/components/products/ProductFilters';
import ActiveFilters from '@/components/products/ActiveFilters';

// Exemple de données de produits amélioré avec plus d'attributs
const productsData = [
  {
    id: 1,
    name: "Panier de légumes bio",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    price: 24.90,
    unit: "panier",
    rating: 4.8,
    reviews: 42,
    farmerName: "Ferme des Quatre Saisons",
    farmerId: 101,
    distance: 8,
    organic: true,
    freeDelivery: true,
    farmPickup: true,
    categories: ["Fruits & Légumes", "Paniers"]
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    price: 8.50,
    unit: "pot 500g",
    rating: 4.9,
    reviews: 38,
    farmerName: "Les Ruches de Marie",
    farmerId: 102,
    distance: 12,
    organic: true,
    freeDelivery: false,
    farmPickup: true,
    categories: ["Miel & Confiture"]
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    price: 4.20,
    unit: "pièce",
    rating: 4.7,
    reviews: 29,
    farmerName: "Chèvrerie du Vallon",
    farmerId: 103,
    distance: 15,
    organic: false,
    freeDelivery: true,
    farmPickup: false,
    categories: ["Produits laitiers", "Fromages"]
  },
  {
    id: 4,
    name: "Œufs fermiers",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    price: 3.60,
    unit: "boîte de 6",
    rating: 4.6,
    reviews: 25,
    farmerName: "Ferme des Collines",
    farmerId: 104,
    distance: 6,
    organic: true,
    freeDelivery: false,
    farmPickup: true,
    categories: ["Œufs & Produits laitiers"]
  },
  {
    id: 5,
    name: "Pommes Golden",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    price: 2.80,
    unit: "kg",
    rating: 4.5,
    reviews: 35,
    farmerName: "Vergers de Bretagne",
    farmerId: 105,
    distance: 22,
    organic: true,
    freeDelivery: true,
    farmPickup: false,
    categories: ["Fruits & Légumes"]
  },
  {
    id: 6,
    name: "Jus de pomme artisanal",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    price: 3.50,
    unit: "bouteille 1L",
    rating: 4.4,
    reviews: 19,
    farmerName: "Vergers de Bretagne",
    farmerId: 105,
    distance: 22,
    organic: false,
    freeDelivery: false,
    farmPickup: true,
    categories: ["Boissons"]
  },
  {
    id: 7,
    name: "Viande de bœuf (assortiment)",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    price: 18.90,
    unit: "kg",
    rating: 4.7,
    reviews: 31,
    farmerName: "Élevage du Pré Vert",
    farmerId: 106,
    distance: 30,
    organic: true,
    freeDelivery: true,
    farmPickup: false,
    categories: ["Viandes"]
  },
  {
    id: 8,
    name: "Pain au levain",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    price: 4.50,
    unit: "pièce",
    rating: 4.9,
    reviews: 44,
    farmerName: "Boulangerie Paysanne",
    farmerId: 107,
    distance: 4,
    organic: true,
    freeDelivery: false,
    farmPickup: true,
    categories: ["Boulangerie"]
  },
];

// Catégories de produits
const categories = [
  "Tous les produits",
  "Fruits & Légumes",
  "Produits laitiers",
  "Viandes",
  "Boissons",
  "Épicerie",
  "Miel & Confiture",
  "Boulangerie",
  "Paniers",
  "Œufs & Produits laitiers",
  "Fromages"
];

// Options de tri
const sortOptions = [
  { label: "Pertinence", value: "relevance" },
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Mieux notés", value: "rating-desc" },
  { label: "Distance", value: "distance-asc" }
];

const Products = () => {
  // État des filtres
  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    priceRange: [0, 50],
    categories: [],
    organic: false,
    localOnly: false,
    freeDelivery: false,
    farmPickup: false,
    distance: 50
  });
  
  // État des produits filtrés
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState("relevance");
  const [searchInput, setSearchInput] = useState("");
  
  // Comptage des filtres actifs
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.organic) count++;
    if (filters.localOnly) count++;
    if (filters.freeDelivery) count++;
    if (filters.farmPickup) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50) count++;
    if (filters.distance !== 50) count++;
    return count;
  };

  // Mise à jour des filtres
  const updateFilters = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };
  
  // Suppression d'un filtre spécifique
  const removeFilter = (key: keyof FiltersType, value?: string) => {
    if (key === 'categories' && value) {
      setFilters({
        ...filters,
        categories: filters.categories.filter(c => c !== value)
      });
    } else if (key === 'priceRange') {
      setFilters({
        ...filters,
        priceRange: [0, 50]
      });
    } else if (key === 'distance') {
      setFilters({
        ...filters,
        distance: 50
      });
    } else if (typeof filters[key] === 'boolean') {
      setFilters({
        ...filters,
        [key]: false
      });
    } else if (key === 'search') {
      setFilters({
        ...filters,
        search: ''
      });
      setSearchInput('');
    }
  };
  
  // Réinitialisation de tous les filtres
  const resetAllFilters = () => {
    setFilters({
      search: "",
      priceRange: [0, 50],
      categories: [],
      organic: false,
      localOnly: false,
      freeDelivery: false,
      farmPickup: false,
      distance: 50
    });
    setSearchInput('');
  };
  
  // Gestion de la recherche
  const handleSearch = () => {
    setFilters({
      ...filters,
      search: searchInput
    });
  };

  // Ouverture/fermeture du panneau de filtres
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Effet de filtrage et tri des produits
  useEffect(() => {
    let result = [...productsData];
    
    // Filtrage par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.farmerName.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtrage par catégories
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        product.categories.some(cat => filters.categories.includes(cat))
      );
    }
    
    // Filtrage par prix
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // Filtrage bio
    if (filters.organic) {
      result = result.filter(product => product.organic);
    }
    
    // Filtrage producteurs locaux
    if (filters.localOnly) {
      result = result.filter(product => (product.distance || 0) <= 30);
    }
    
    // Filtrage par distance
    if (filters.distance < 50) {
      result = result.filter(product => (product.distance || 0) <= filters.distance);
    }
    
    // Filtrage livraison gratuite
    if (filters.freeDelivery) {
      result = result.filter(product => product.freeDelivery);
    }
    
    // Filtrage retrait à la ferme
    if (filters.farmPickup) {
      result = result.filter(product => product.farmPickup);
    }
    
    // Tri des résultats
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance-asc':
        result.sort((a, b) => (a.distance || 100) - (b.distance || 100));
        break;
      // Par défaut, on garde l'ordre original
    }
    
    setFilteredProducts(result);
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50"> {/* Pour compenser le header fixe */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Catalogue de produits</h1>
            <p className="text-gray-600">Découvrez des produits frais directement des agriculteurs</p>
          </div>
          
          {/* Barre de recherche et filtres */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Rechercher un produit..." 
                  className="pl-10"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4" />
                  Rechercher
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <SortAsc className="w-4 h-4" />
                      Trier
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {sortOptions.map(option => (
                      <DropdownMenuItem 
                        key={option.value}
                        className={sortBy === option.value ? "bg-agrimarket-lightGreen text-agrimarket-green font-medium" : ""}
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="hidden sm:flex border rounded-md overflow-hidden">
                  <Button 
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? "bg-agrimarket-orange" : ""}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? "bg-agrimarket-orange" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filtres latéraux sur grand écran */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-20">
                <ProductFilters 
                  filters={filters}
                  onFilterChange={updateFilters}
                  onReset={resetAllFilters}
                  categories={categories}
                  isOpen={true}
                  onToggle={() => {}}
                  activeFiltersCount={getActiveFiltersCount()}
                />
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="lg:w-3/4">
              {/* Filtres mobiles */}
              <div className="lg:hidden mb-4">
                <ProductFilters 
                  filters={filters}
                  onFilterChange={updateFilters}
                  onReset={resetAllFilters}
                  categories={categories}
                  isOpen={isFilterOpen}
                  onToggle={toggleFilter}
                  activeFiltersCount={getActiveFiltersCount()}
                />
              </div>
              
              {/* Filtres actifs */}
              <ActiveFilters 
                filters={filters} 
                onRemoveFilter={removeFilter} 
                onResetAll={resetAllFilters} 
              />
              
              {/* Résultats de recherche */}
              <div className="mb-4">
                <p className="text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {/* Liste des produits */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-lg font-medium mb-2">Aucun produit ne correspond à vos critères</h3>
                  <p className="text-gray-500 mb-4">Essayez de modifier vos filtres pour trouver ce que vous cherchez.</p>
                  <Button onClick={resetAllFilters}>Réinitialiser les filtres</Button>
                </div>
              ) : (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      {...product} 
                      className={viewMode === 'list' ? "flex flex-row h-48" : ""}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
