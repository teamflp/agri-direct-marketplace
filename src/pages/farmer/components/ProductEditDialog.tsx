
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ProductType } from './ProductDeleteDialog';

type ProductEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType;
  onSave: (updatedProduct: ProductType) => void;
};

const ProductEditDialog = ({
  open,
  onOpenChange,
  product,
  onSave
}: ProductEditDialogProps) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [inventory, setInventory] = useState(product.inventory);
  const [category, setCategory] = useState(product.category);
  const [unit, setUnit] = useState(product.unit);
  const [organic, setOrganic] = useState(product.organic);
  const [published, setPublished] = useState(product.published);
  const [image, setImage] = useState(product.image);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProduct: ProductType = {
      ...product,
      name,
      price,
      inventory,
      category,
      unit,
      organic,
      published,
      image
    };
    
    onSave(updatedProduct);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier le produit</DialogTitle>
          <DialogDescription>
            Modifiez les informations du produit et cliquez sur Enregistrer lorsque vous avez terminé
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Prix (FCFA)</Label>
              <Input 
                id="price" 
                type="number"
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                required 
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unité de vente</Label>
              <Input 
                id="unit" 
                value={unit} 
                onChange={(e) => setUnit(e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inventory">Stock disponible</Label>
              <Input 
                id="inventory" 
                type="number"
                value={inventory} 
                onChange={(e) => setInventory(Number(e.target.value))} 
                required 
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="organic">Produit Bio</Label>
              <Switch 
                id="organic" 
                checked={organic} 
                onCheckedChange={setOrganic}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="published">Publié</Label>
              <Switch 
                id="published" 
                checked={published} 
                onCheckedChange={setPublished}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditDialog;
