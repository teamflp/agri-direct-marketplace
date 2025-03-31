
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
import { Switch } from "@/components/ui/switch";
import { 
  CheckCircle2, 
  XCircle,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
} from 'lucide-react';
import { ProductType } from './ProductDeleteDialog';

type ProductsTableProps = {
  products: ProductType[];
  onTogglePublish: (productId: number, currentStatus: boolean) => void;
  onDeleteClick: (product: ProductType) => void;
  onViewClick: (product: ProductType) => void;
  onEditClick: (product: ProductType) => void;
};

const ProductsTable = ({ 
  products, 
  onTogglePublish, 
  onDeleteClick,
  onViewClick,
  onEditClick
}: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Produit <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Bio</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center">
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
              <TableCell>{product.price.toLocaleString()} FCFA/{product.unit}</TableCell>
              <TableCell>
                <span className={`${product.inventory === 0 ? 'text-red-500 font-medium' : ''}`}>
                  {product.inventory}
                </span>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {product.organic ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={product.published}
                  onCheckedChange={() => onTogglePublish(product.id, product.published)}
                />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="inline-flex items-center gap-1"
                  onClick={() => onViewClick(product)}
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline">Voir</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="inline-flex items-center gap-1 ml-2"
                  onClick={() => onEditClick(product)}
                >
                  <Edit size={16} />
                  <span className="hidden sm:inline">Éditer</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 ml-2"
                  onClick={() => onDeleteClick(product)}
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Supprimer</span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
