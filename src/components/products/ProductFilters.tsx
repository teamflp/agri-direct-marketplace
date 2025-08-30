
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  SlidersHorizontal, 
  X,
  MapPin,
  Truck,
  Store,
  Leaf
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Types pour les filtres
export type ProductFilters = {
  search: string;
  priceRange: [number, number];
  categories: string[];
  organic: boolean;
  localOnly: boolean;
  freeDelivery: boolean;
  farmPickup: boolean;
  distance: number;
};

// Types pour les props
type ProductFiltersProps = {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  onReset: () => void;
  categories: string[];
  isOpen: boolean;
  onToggle: () => void;
  activeFiltersCount: number;
};

const ProductFilters = ({
  filters,
  onFilterChange,
  onReset,
  categories,
  isOpen,
  onToggle,
  activeFiltersCount
}: ProductFiltersProps) => {
  // État local temporaire pour les filtres
  const [tempFilters, setTempFilters] = useState<ProductFilters>(filters);

  // Mise à jour d'un filtre spécifique
  const updateFilter = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  // Gestion des catégories
  const toggleCategory = (category: string) => {
    const categories = [...tempFilters.categories];
    const index = categories.indexOf(category);
    
    if (index === -1) {
      categories.push(category);
    } else {
      categories.splice(index, 1);
    }
    
    updateFilter('categories', categories);
  };

  // Application des filtres
  const applyFilters = () => {
    onFilterChange(tempFilters);
    onToggle();
  };

  // Réinitialisation des filtres
  const handleReset = () => {
    onReset();
    onToggle();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Bouton pour afficher/masquer les filtres sur mobile */}
      <div className="lg:hidden flex justify-between items-center p-4 border-b">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={onToggle}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtres</span>
          {activeFiltersCount > 0 && (
            <Badge className="bg-agrimarket-green ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Contenu des filtres */}
      <div className={`p-4 ${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Filtres avancés</h3>
          <Button 
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-500 lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
          
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={["categories", "price", "options"]}>
              {/* Catégories */}
              <AccordionItem value="categories">
                <AccordionTrigger className="font-medium">Catégories</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={tempFilters.categories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label 
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Prix */}
              <AccordionItem value="price">
                <AccordionTrigger className="font-medium">Prix</AccordionTrigger>
                <AccordionContent>
                  <div className="px-2">
                    <Slider 
                      max={50} 
                      step={1} 
                      value={tempFilters.priceRange}
                      onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{tempFilters.priceRange[0]}€</span>
                    <span>{tempFilters.priceRange[1]}€</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Options */}
              <AccordionItem value="options">
                <AccordionTrigger className="font-medium">Options</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-bio" 
                        checked={tempFilters.organic}
                        onCheckedChange={(checked) => 
                          updateFilter('organic', checked === true)
                        }
                      />
                      <Label htmlFor="filter-bio" className="flex items-center cursor-pointer">
                        <Leaf className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm">Produits bio</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-local" 
                        checked={tempFilters.localOnly}
                        onCheckedChange={(checked) => 
                          updateFilter('localOnly', checked === true)
                        }
                      />
                      <Label htmlFor="filter-local" className="flex items-center cursor-pointer">
                        <MapPin className="h-4 w-4 mr-2 text-agrimarket-orange" />
                        <span className="text-sm">Producteurs locaux (&lt;30km)</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-delivery" 
                        checked={tempFilters.freeDelivery}
                        onCheckedChange={(checked) => 
                          updateFilter('freeDelivery', checked === true)
                        }
                      />
                      <Label htmlFor="filter-delivery" className="flex items-center cursor-pointer">
                        <Truck className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">Livraison gratuite</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-pickup" 
                        checked={tempFilters.farmPickup}
                        onCheckedChange={(checked) => 
                          updateFilter('farmPickup', checked === true)
                        }
                      />
                      <Label htmlFor="filter-pickup" className="flex items-center cursor-pointer">
                        <Store className="h-4 w-4 mr-2 text-purple-500" />
                        <span className="text-sm">Retrait à la ferme</span>
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Distance */}
              <AccordionItem value="location">
                <AccordionTrigger className="font-medium">Localisation</AccordionTrigger>
                <AccordionContent>
                  <Label htmlFor="distance" className="mb-2 block text-sm">
                    Distance maximale: {tempFilters.distance} km
                  </Label>
                  <Slider 
                    id="distance"
                    max={100} 
                    step={5} 
                    value={[tempFilters.distance]}
                    onValueChange={(value) => updateFilter('distance', value[0])}
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>5 km</span>
                    <span>50 km</span>
                    <span>100 km</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleReset}
            >
              Réinitialiser
            </Button>
            <Button 
              onClick={applyFilters}
              className="bg-agrimarket-green hover:bg-agrimarket-green/90"
            >
              Appliquer
            </Button>
          </div>
        </div>
    </div>
  );
};

export default ProductFilters;
