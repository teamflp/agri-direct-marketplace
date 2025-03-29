
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Box, Package } from 'lucide-react';

type InventoryHeaderProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InventoryHeader = ({ searchTerm, onSearchChange }: InventoryHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Inventaire</h1>
        <p className="text-gray-500 mt-1">Gérez votre stock de produits en temps réel</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un produit..."
            className="pl-8"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        
        <Button className="bg-agrimarket-green hover:bg-agrimarket-green/90">
          <FileText className="mr-2 h-4 w-4" />
          Rapport d'inventaire
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
