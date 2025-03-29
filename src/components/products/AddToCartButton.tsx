
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

type AddToCartButtonProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    unit: string;
    farmerName: string;
    farmerId: number;
  };
  className?: string;
};

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { cart, addToCart } = useCart();
  const isInCart = cart.items.some(item => item.id === product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInCart) {
      addToCart(product);
    }
  };
  
  return (
    <Button
      onClick={handleAddToCart}
      variant={isInCart ? "secondary" : "default"}
      size="sm"
      className={`${className} ${isInCart ? 'bg-agrimarket-lightGreen text-agrimarket-green hover:bg-agrimarket-lightGreen' : 'bg-agrimarket-orange hover:bg-orange-600'}`}
    >
      {isInCart ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Ajouté
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter
        </>
      )}
    </Button>
  );
}
