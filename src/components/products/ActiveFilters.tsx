
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductFilters } from './ProductFilters';

type ActiveFiltersProps = {
  filters: ProductFilters;
  onRemoveFilter: (key: keyof ProductFilters, value?: string) => void;
  onResetAll: () => void;
};

const ActiveFilters = ({ filters, onRemoveFilter, onResetAll }: ActiveFiltersProps) => {
  const hasActiveFilters = () => {
    return (
      filters.search !== '' ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 50 ||
      filters.categories.length > 0 ||
      filters.organic ||
      filters.localOnly ||
      filters.freeDelivery ||
      filters.farmPickup ||
      filters.distance !== 50
    );
  };
  
  if (!hasActiveFilters()) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center">
      {filters.search && (
        <Badge className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          Recherche: {filters.search}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('search')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {(filters.priceRange[0] > 0 || filters.priceRange[1] < 50) && (
        <Badge className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          Prix: {filters.priceRange[0]}€ - {filters.priceRange[1]}€
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('priceRange')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {filters.categories.map((category) => (
        <Badge key={category} className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          {category}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('categories', category)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {filters.organic && (
        <Badge className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          Bio
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('organic')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {filters.localOnly && (
        <Badge className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          Producteurs locaux
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('localOnly')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {filters.freeDelivery && (
        <Badge className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          Livraison gratuite
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('freeDelivery')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {filters.farmPickup && (
        <Badge className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          Retrait à la ferme
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('farmPickup')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {filters.distance !== 50 && (
        <Badge className="bg-agrimarket-lightGreen text-agrimarket-green text-sm py-1 px-3 rounded-full flex items-center">
          Distance: {filters.distance} km
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0"
            onClick={() => onRemoveFilter('distance')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-auto text-xs"
        onClick={onResetAll}
      >
        Effacer tous les filtres
      </Button>
    </div>
  );
};

export default ActiveFilters;
