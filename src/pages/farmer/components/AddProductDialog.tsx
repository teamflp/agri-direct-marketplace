
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';

// Define the shape of a variant for the form
export type VariantFormType = {
  id: string; // Temporary client-side ID
  options: { [key: string]: string };
  sku: string;
  price_modifier: number;
  stock_level: number;
  low_stock_threshold: number;
};

// The props the dialog receives
type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (
    product: any,
    variants: any[]
  ) => void;
};

const AddProductDialog = ({
  open,
  onOpenChange,
  onAddProduct
}: AddProductDialogProps) => {
  // Base product state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("kg");
  const [is_organic, setIsOrganic] = useState(false);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  // Variants state
  const [variants, setVariants] = useState<VariantFormType[]>([
    { id: uuidv4(), options: { name: 'Défaut' }, sku: '', price_modifier: 0, stock_level: 0, low_stock_threshold: 0 },
  ]);

  const handleAddVariant = () => {
    setVariants([...variants, { id: uuidv4(), options: { name: '' }, sku: '', price_modifier: 0, stock_level: 0, low_stock_threshold: 0 }]);
  };

  const handleRemoveVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  const handleVariantChange = (id: string, field: keyof Omit<VariantFormType, 'id' | 'options'>, value: string | number) => {
    setVariants(variants.map(v => v.id === id ? { ...v, [field]: value } : v));
  };
  
  const handleVariantOptionChange = (id: string, optionName: string, optionValue: string) => {
    setVariants(variants.map(v => {
      if (v.id === id) {
        return {
          ...v,
          options: { ...v.options, [optionName]: optionValue }
        };
      }
      return v;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name,
      price,
      category_id: category,
      unit,
      is_organic,
      description,
      quantity, // Ajout de la propriété quantity manquante
    };

    const newVariants = variants.map(({ id, ...rest }) => ({
      ...rest,
    }));

    onAddProduct(newProduct, newVariants);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau produit</DialogTitle>
          <DialogDescription>
            Renseignez les informations du produit et de ses variantes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4 max-h-[80vh] overflow-y-auto pr-4">
          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Détails du Produit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ex: Tomates cerises" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="Ex: Légumes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prix de base (FCFA)</Label>
                <Input id="price" type="number" value={price || ""} onChange={(e) => setPrice(Number(e.target.value))} required min="0" placeholder="Ex: 1500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unité de vente</Label>
                <Input id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required placeholder="Ex: kg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantité en stock</Label>
                <Input id="quantity" type="number" value={quantity || ""} onChange={(e) => setQuantity(Number(e.target.value))} required min="0" placeholder="Ex: 100" />
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description courte du produit" />
              </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="organic">Produit Bio</Label>
              <Switch id="organic" checked={is_organic} onCheckedChange={setIsOrganic} />
            </div>
          </div>

          <Separator />

          {/* Variants Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Variantes du Produit</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddVariant}>
                Ajouter une variante
              </Button>
            </div>
            
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={variant.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Variante {index + 1}</h4>
                    {variants.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveVariant(variant.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Nom Variante</Label>
                      <Input
                        value={variant.options.name || ''}
                        onChange={(e) => handleVariantOptionChange(variant.id, 'name', e.target.value)}
                        placeholder="Ex: 500g, Rouge"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>SKU</Label>
                      <Input
                        value={variant.sku}
                        onChange={(e) => handleVariantChange(variant.id, 'sku', e.target.value)}
                        placeholder="Code unique"
                      />
                    </div>
                     <div className="space-y-2">
                      <Label>Modif. Prix (FCFA)</Label>
                      <Input
                        type="number"
                        value={variant.price_modifier || ""}
                        onChange={(e) => handleVariantChange(variant.id, 'price_modifier', Number(e.target.value))}
                        placeholder="+200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={variant.stock_level || ""}
                        onChange={(e) => handleVariantChange(variant.id, 'stock_level', Number(e.target.value))}
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Seuil d'alerte</Label>
                      <Input
                        type="number"
                        value={variant.low_stock_threshold || ""}
                        onChange={(e) => handleVariantChange(variant.id, 'low_stock_threshold', Number(e.target.value))}
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
