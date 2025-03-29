
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ProductType = {
  id: number;
  name: string;
  price: number;
  inventory: number;
  unit: string;
  category: string;
  organic: boolean;
  published: boolean;
  image: string;
};

type ProductDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType | null;
  onConfirmDelete: () => void;
};

const ProductDeleteDialog = ({
  open,
  onOpenChange,
  product,
  onConfirmDelete
}: ProductDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le produit "{product?.name}" ? Cette action ne peut pas être annulée.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirmDelete}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteDialog;
