
import React from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Eye,
  ArrowUpDown,
  Plus,
  Minus,
  Calendar
} from 'lucide-react';
import { InventoryProductType } from '../FarmerInventory';

type InventoryTableProps = {
  products: InventoryProductType[];
  onUpdateClick: (product: InventoryProductType) => void;
};

const InventoryTable = ({ 
  products, 
  onUpdateClick 
}: InventoryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Produit <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Stock actuel</TableHead>
          <TableHead>Stock minimum</TableHead>
          <TableHead>Dernière mise à jour</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              Aucun produit trouvé
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-10 h-10 rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <span className={`${
                  product.inventory === 0 
                    ? 'text-red-500 font-medium' 
                    : product.inventory <= product.minimumStock
                    ? 'text-amber-500 font-medium'
                    : ''
                }`}>
                  {product.inventory} {product.unit}
                </span>
              </TableCell>
              <TableCell>{product.minimumStock} {product.unit}</TableCell>
              <TableCell className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-3 w-3" /> {product.lastUpdated}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="inline-flex items-center gap-1 bg-agrimarket-green text-white hover:bg-agrimarket-green/80"
                  onClick={() => onUpdateClick(product)}
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Ajouter</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="inline-flex items-center gap-1"
                  onClick={() => onUpdateClick(product)}
                >
                  <Minus size={16} />
                  <span className="hidden sm:inline">Retirer</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="inline-flex items-center gap-1 ml-2"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline">Historique</span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
