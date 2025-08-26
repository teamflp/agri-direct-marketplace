import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, FileText, Upload, Download, MoreVertical } from 'lucide-react';

type InventoryHeaderProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReportClick: () => void;
  onExportClick: () => void;
  onImportClick: () => void;
};

const InventoryHeader = ({ 
  searchTerm, 
  onSearchChange,
  onReportClick,
  onExportClick,
  onImportClick
}: InventoryHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Inventaire</h1>
        <p className="text-gray-500 mt-1">Gérez votre stock de produits en temps réel</p>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un mouvement..."
            className="pl-8"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onImportClick} disabled>
              <Upload className="mr-2 h-4 w-4" />
              <span>Importer un inventaire</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportClick}>
              <Download className="mr-2 h-4 w-4" />
              <span>Exporter l'inventaire</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onReportClick}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Rapport d'inventaire</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default InventoryHeader;
