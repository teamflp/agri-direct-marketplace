
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

type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: Omit<ProductType, "id">) => void;
};

const AddProductDialog = ({
  open,
  onOpenChange,
  onAddProduct
}: AddProductDialogProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("kg");
  const [organic, setOrganic] = useState(false);
  const [published, setPublished] = useState(true);
  const [image, setImage] = useState("https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&h=500&fit=crop");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Omit<ProductType, "id"> = {
      name,
      price,
      inventory,
      category,
      unit,
      organic,
      published,
      image
    };
    
    onAddProduct(newProduct);
    
    // Reset form
    setName("");
    setPrice(0);
    setInventory(0);
    setCategory("");
    setUnit("kg");
    setOrganic(false);
    setPublished(true);
    setImage("https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&h=500&fit=crop");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau produit</DialogTitle>
          <DialogDescription>
            Entrez les informations du nouveau produit à ajouter au catalogue
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
                placeholder="Ex: Tomates cerises"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required 
                placeholder="Ex: Légumes"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Prix (FCFA)</Label>
              <Input 
                id="price" 
                type="number"
                value={price || ""} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                required 
                min="0"
                placeholder="Ex: 1500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unité de vente</Label>
              <Input 
                id="unit" 
                value={unit} 
                onChange={(e) => setUnit(e.target.value)} 
                required 
                placeholder="Ex: kg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inventory">Stock disponible</Label>
              <Input 
                id="inventory" 
                type="number"
                value={inventory || ""} 
                onChange={(e) => setInventory(Number(e.target.value))} 
                required 
                min="0"
                placeholder="Ex: 20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                required 
                placeholder="URL de l'image"
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
              <Label htmlFor="published">Publier immédiatement</Label>
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
            <Button type="submit" className="bg-agrimarket-green hover:bg-agrimarket-green/90">
              Ajouter le produit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
