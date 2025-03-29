
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';

type ProductsHeaderProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductsHeader = ({ searchTerm, onSearchChange }: ProductsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold">Mes produits</h1>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Rechercher un produit..."
            className="pl-8 pr-4"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <Button className="bg-agrimarket-green hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
        </Button>
      </div>
    </div>
  );
};

export default ProductsHeader;
