
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductType } from './ProductDeleteDialog';
import { CheckCircle2, XCircle } from 'lucide-react';

type ProductViewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType;
};

const ProductViewDialog = ({
  open,
  onOpenChange,
  product
}: ProductViewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Détails du produit</DialogTitle>
          <DialogDescription>
            Informations détaillées sur {product.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500">Prix:</span>
                <p className="font-medium">{product.price.toLocaleString()} FCFA/{product.unit}</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-500">Stock:</span>
                <p className={`font-medium ${product.inventory === 0 ? 'text-red-500' : ''}`}>
                  {product.inventory} {product.unit}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-gray-500">Bio:</span>
                <p>
                  {product.organic ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Oui
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <XCircle className="w-4 h-4 mr-1" /> Non
                    </span>
                  )}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-gray-500">Statut:</span>
                <p>
                  {product.published ? (
                    <span className="text-green-600">Publié</span>
                  ) : (
                    <span className="text-gray-500">Non publié</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;
