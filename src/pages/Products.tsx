
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search,
  SlidersHorizontal, 
  MapPin, 
  X,
  List,
  Grid,
  SortAsc,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Exemple de données de produits
const productsData = [
  {
    id: 1,
    name: "Panier de légumes bio",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    price: 24.90,
    unit: "panier",
    rating: 4.8,
    farmerName: "Ferme des Quatre Saisons",
    organic: true,
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    price: 8.50,
    unit: "pot 500g",
    rating: 4.9,
    farmerName: "Les Ruches de Marie",
    organic: true,
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    price: 4.20,
    unit: "pièce",
    rating: 4.7,
    farmerName: "Chèvrerie du Vallon",
    organic: false,
  },
  {
    id: 4,
    name: "Œufs fermiers",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    price: 3.60,
    unit: "boîte de 6",
    rating: 4.6,
    farmerName: "Ferme des Collines",
    organic: true,
  },
  {
    id: 5,
    name: "Pommes Golden",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    price: 2.80,
    unit: "kg",
    rating: 4.5,
    farmerName: "Vergers de Bretagne",
    organic: true,
  },
  {
    id: 6,
    name: "Jus de pomme artisanal",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    price: 3.50,
    unit: "bouteille 1L",
    rating: 4.4,
    farmerName: "Vergers de Bretagne",
    organic: false,
  },
  {
    id: 7,
    name: "Viande de bœuf (assortiment)",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    price: 18.90,
    unit: "kg",
    rating: 4.7,
    farmerName: "Élevage du Pré Vert",
    organic: true,
  },
  {
    id: 8,
    name: "Pain au levain",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    price: 4.50,
    unit: "pièce",
    rating: 4.9,
    farmerName: "Boulangerie Paysanne",
    organic: true,
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
  "Boulangerie"
];

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategory, setSelectedCategory] = useState("Tous les produits");

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={toggleFilter}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtres
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Distance
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <SortAsc className="w-4 h-4" />
                      Trier
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Prix croissant</DropdownMenuItem>
                    <DropdownMenuItem>Prix décroissant</DropdownMenuItem>
                    <DropdownMenuItem>Mieux notés</DropdownMenuItem>
                    <DropdownMenuItem>Distance</DropdownMenuItem>
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
            
            {/* Filtres avancés */}
            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filtres avancés</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFilter}
                    className="text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Catégories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategory === category}
                            onCheckedChange={() => setSelectedCategory(category)}
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Prix</h4>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 50]} 
                        max={50} 
                        step={1} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Options</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="filter-bio" />
                        <label htmlFor="filter-bio" className="ml-2 text-sm cursor-pointer">
                          Produits bio
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="filter-local" />
                        <label htmlFor="filter-local" className="ml-2 text-sm cursor-pointer">
                          Producteurs locaux (&lt;30km)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="filter-delivery" />
                        <label htmlFor="filter-delivery" className="ml-2 text-sm cursor-pointer">
                          Livraison disponible
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="filter-pickup" />
                        <label htmlFor="filter-pickup" className="ml-2 text-sm cursor-pointer">
                          Retrait à la ferme
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="mr-2">
                    Réinitialiser
                  </Button>
                  <Button className="bg-agrimarket-orange text-white hover:bg-orange-600">
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Filtres actifs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
              Bio
              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
              Prix: 5€ - 25€
              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
              Fruits & Légumes
              <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Liste des produits */}
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {productsData.map(product => (
              <ProductCard 
                key={product.id} 
                {...product} 
                className={viewMode === 'list' ? "flex flex-row h-48" : ""}
              />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Précédent
              </Button>
              <Button variant="outline" className="bg-agrimarket-orange text-white border-agrimarket-orange">
                1
              </Button>
              <Button variant="outline">
                2
              </Button>
              <Button variant="outline">
                3
              </Button>
              <Button variant="outline">
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

export default Products;
