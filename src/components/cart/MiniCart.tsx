
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export function MiniCart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-agrimarket-orange text-white"
            >
              {cart.totalItems}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-medium">Mon Panier ({cart.totalItems})</h3>
            <span className="text-agrimarket-green font-medium">{cart.totalPrice.toFixed(2)} €</span>
          </div>
          
          {cart.items.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Votre panier est vide
            </div>
          ) : (
            <>
              <ScrollArea className="h-52">
                <div className="space-y-2">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center p-2 border-b border-gray-100">
                      <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-xs text-gray-500">
                            {item.quantity} × {item.price.toFixed(2)} €
                          </div>
                          <div className="font-medium text-sm">
                            {(item.price * item.quantity).toFixed(2)} €
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 ml-2 text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span>{cart.totalPrice.toFixed(2)} €</span>
                </div>
                
                <Button 
                  className="w-full bg-agrimarket-orange hover:bg-orange-600"
                  onClick={handleCheckout}
                >
                  Passer la commande
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/products')}
                >
                  Continuer les achats
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
