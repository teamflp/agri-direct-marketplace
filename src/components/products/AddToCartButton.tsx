import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';
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
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.items.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInCart) {
      addToCart({...product});
      setQuantity(1);
    }
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    } else if (!isInCart && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {isInCart ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleDecreaseQuantity}
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border-agrimarket-green text-agrimarket-green hover:bg-agrimarket-lightGreen hover:text-agrimarket-green"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[2rem] text-center">
              {cartItem.quantity}
            </span>
            <Button 
              onClick={handleIncreaseQuantity}
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border-agrimarket-green text-agrimarket-green hover:bg-agrimarket-lightGreen hover:text-agrimarket-green"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-agrimarket-lightGreen text-agrimarket-green hover:bg-agrimarket-lightGreen"
          >
            <Check className="h-4 w-4 mr-2" />
            Dans le panier
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Button 
              onClick={handleDecreaseQuantity}
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[2rem] text-center">
              {quantity}
            </span>
            <Button 
              onClick={handleIncreaseQuantity}
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            variant="default"
            size="sm"
            className="bg-agrimarket-orange hover:bg-orange-600"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </>
      )}
    </div>
  );
}
