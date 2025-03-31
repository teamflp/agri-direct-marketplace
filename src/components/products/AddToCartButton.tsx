
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  productUnit: string;
  farmerName: string;
  farmerId: number;
  variant?: 'default' | 'outline' | 'small';
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  productName,
  productPrice,
  productImage,
  productUnit,
  farmerName,
  farmerId,
  variant = 'default',
  className = ''
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      unit: productUnit,
      farmerName: farmerName,
      farmerId: farmerId,
      quantity: quantity
    });

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} × ${productName} a été ajouté à votre panier`,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (variant === 'small') {
    return (
      <Button 
        onClick={handleAddToCart} 
        size="sm" 
        className={`bg-agrimarket-green hover:bg-agrimarket-darkGreen ${className}`}
      >
        <ShoppingCart className="h-4 w-4 mr-1" />
        Ajouter
      </Button>
    );
  }

  if (variant === 'outline') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center border rounded-l-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={decreaseQuantity}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={increaseQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleAddToCart}
          className="rounded-l-none bg-agrimarket-green hover:bg-agrimarket-darkGreen"
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Ajouté
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ajouter au panier
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between border rounded-md p-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={decreaseQuantity}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={increaseQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={handleAddToCart}
        className={`w-full bg-agrimarket-green hover:bg-agrimarket-darkGreen`}
      >
        {isAdded ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Produit ajouté
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ajouter au panier
          </>
        )}
      </Button>
    </div>
  );
};

export default AddToCartButton;
