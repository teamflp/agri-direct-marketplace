
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';

type ProductsHeaderProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClick: () => void;
};

const ProductsHeader = ({ 
  searchTerm, 
  onSearchChange, 
  onAddClick 
}: ProductsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Mes produits</h1>
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Rechercher un produit..."
            className="pl-8 pr-4 border-gray-200"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <Button 
          className="bg-agrimarket-green hover:bg-agrimarket-darkGreen text-white flex items-center gap-2"
          onClick={onAddClick}
        >
          <Plus className="h-4 w-4" /> Ajouter un produit
        </Button>
      </div>
    </div>
  );
};

export default ProductsHeader;
