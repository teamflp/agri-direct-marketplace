// @ts-nocheck
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { Product } from '@/hooks/useProducts';

type ProductsTableProps = {
  products: Product[];
  onTogglePublish: (productId: string, currentStatus: boolean) => void;
  onDeleteClick: (product: Product) => void;
  onViewClick: (product: Product) => void;
  onEditClick: (product: Product) => void;
};

// Helper to render stock information
const StockCell = ({ product }: { product: Product }) => {
  if (!product.product_variants || product.product_variants.length === 0) {
    return <Badge variant="destructive">Aucun stock</Badge>;
  }

  if (product.product_variants.length === 1) {
    const stock = product.product_variants[0].stock_level;
    return (
      <span className={stock === 0 ? 'text-red-500 font-medium' : ''}>
        {stock}
      </span>
    );
  }

  const totalStock = product.product_variants.reduce((acc, v) => acc + (v.stock_level || 0), 0);
  return (
    <div className="flex flex-col">
      <span className={totalStock === 0 ? 'text-red-500 font-medium' : ''}>
        Total: {totalStock}
      </span>
      <span className="text-xs text-gray-500">
        ({product.product_variants.length} variantes)
      </span>
    </div>
  );
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
          <TableHead>Produit</TableHead>
          <TableHead>Prix de base</TableHead>
          <TableHead>Stock / Variantes</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Bio</TableHead>
          {/* <TableHead>Statut</TableHead> */}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              Aucun produit trouvé. Cliquez sur "Ajouter un produit" pour commencer.
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img 
                  src={product.primary_image_url || 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&h=500&fit=crop'}
                  alt={product.name} 
                  className="w-12 h-12 rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.price.toLocaleString()} FCFA/{product.unit}</TableCell>
              <TableCell>
                <StockCell product={product} />
              </TableCell>
              <TableCell>{product.category_id || 'N/A'}</TableCell>
              <TableCell>
                {product.is_organic ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
              </TableCell>
              {/* <TableCell>
                <Switch
                  // checked={product.published}
                  // onCheckedChange={() => onTogglePublish(product.id, product.published)}
                />
              </TableCell> */}
              <TableCell className="text-right space-x-1">
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewClick(product)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditClick(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onDeleteClick(product)}
                >
                  <Trash2 className="h-4 w-4" />
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
