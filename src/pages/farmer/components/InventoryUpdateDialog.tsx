
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InventoryProductType } from '../FarmerInventory';
import { Plus, Minus } from 'lucide-react';

type InventoryUpdateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: InventoryProductType;
  onUpdateInventory: (productId: number, quantity: number, type: 'add' | 'remove', reason: string) => void;
};

const InventoryUpdateDialog = ({
  open,
  onOpenChange,
  product,
  onUpdateInventory
}: InventoryUpdateDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [updateType, setUpdateType] = useState<'add' | 'remove'>('add');
  const [reason, setReason] = useState('');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    onUpdateInventory(product.id, quantity, updateType, reason);
    // Réinitialiser les champs
    setQuantity(1);
    setReason('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mettre à jour l'inventaire</DialogTitle>
          <DialogDescription>
            Ajoutez ou retirez des unités de {product.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              className={`flex items-center justify-center gap-2 ${
                updateType === 'add' 
                  ? 'bg-agrimarket-green hover:bg-agrimarket-green/90' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUpdateType('add')}
            >
              <Plus className="h-4 w-4" /> Ajouter
            </Button>
            <Button
              type="button"
              className={`flex items-center justify-center gap-2 ${
                updateType === 'remove' 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setUpdateType('remove')}
            >
              <Minus className="h-4 w-4" /> Retirer
            </Button>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantité ({product.unit})</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="reason">Motif de la mise à jour</Label>
            <Input
              id="reason"
              placeholder={updateType === 'add' ? "Ex: Nouvelle récolte" : "Ex: Commande #123"}
              value={reason}
              onChange={handleReasonChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <span className="text-sm font-medium">Stock actuel</span>
              <p className="text-xl font-bold">{product.inventory} {product.unit}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Nouveau stock</span>
              <p className="text-xl font-bold">
                {updateType === 'add' 
                  ? product.inventory + quantity 
                  : Math.max(0, product.inventory - quantity)
                } {product.unit}
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            className={updateType === 'add' ? 'bg-agrimarket-green hover:bg-agrimarket-green/90' : ''}
            onClick={handleSubmit}
            disabled={reason.trim() === ''}
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryUpdateDialog;
