
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { InventoryProductType } from '../FarmerInventory';

type ProductHistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: InventoryProductType | null;
};

const ProductHistoryDialog = ({ open, onOpenChange, product }: ProductHistoryDialogProps) => {
  if (!product) return null;

  // Function to format dates to French locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Historique des mouvements de stock</DialogTitle>
          <DialogDescription>
            {product.name} - Stock actuel: {product.inventory} {product.unit}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Motif</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.stockHistory.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(entry.date)}</TableCell>
                  <TableCell>
                    <Badge variant={entry.type === 'add' ? 'default' : 'destructive'}>
                      {entry.type === 'add' ? 'Ajout' : 'Retrait'}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.quantity} {product.unit}</TableCell>
                  <TableCell>{entry.reason}</TableCell>
                </TableRow>
              ))}
              {product.stockHistory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    Aucun historique disponible pour ce produit
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductHistoryDialog;
