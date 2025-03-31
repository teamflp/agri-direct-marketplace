
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function MiniCart() {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart
  } = useCart();
  
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const handleIncreaseQuantity = (id: string | number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };
  
  const handleDecreaseQuantity = (id: string | number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative text-agrimarket-green border-gray-200 bg-white hover:bg-gray-50 hover:text-agrimarket-darkGreen">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && 
            <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-agrimarket-orange text-white border-white">
              {totalItems}
            </Badge>
          }
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 bg-white border-gray-200 shadow-lg" align="end">
        <div className="flex flex-col">
          <div className="flex justify-between items-center pb-2 mb-2">
            <h3 className="font-medium text-gray-800">Mon Panier ({totalItems})</h3>
            <span className="font-medium text-agrimarket-green">{totalPrice.toFixed(2)} €</span>
          </div>
          
          {items.length === 0 ? 
            <div className="py-8 text-center text-gray-500">
              Votre panier est vide
            </div> 
            : 
            <>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-3">
                  {items.map(item => (
                    <div key={item.id} className="flex flex-col p-2 border border-gray-200 rounded-md bg-white shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium line-clamp-1 text-gray-800">{item.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            Vendeur: {item.farmerName}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <div className="text-xs font-semibold text-gray-700">
                              {item.price.toFixed(2)} € / {item.unit}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100" 
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 rounded-full p-0 bg-white border-gray-200 text-agrimarket-green hover:bg-gray-50 hover:text-agrimarket-darkGreen shadow-sm" 
                            onClick={() => handleDecreaseQuantity(item.id, item.quantity)} 
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs font-medium min-w-[1.5rem] text-center text-gray-800">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 rounded-full p-0 bg-white border-gray-200 text-agrimarket-green hover:bg-gray-50 hover:text-agrimarket-darkGreen shadow-sm" 
                            onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="font-medium text-sm text-gray-800">
                          {(item.price * item.quantity).toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <Separator className="my-3 bg-gray-200" />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Sous-total</span>
                  <span className="text-sm text-gray-800">{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Livraison</span>
                  <span className="text-sm text-gray-500">Calculée à la caisse</span>
                </div>
                <div className="flex justify-between items-center font-medium py-1">
                  <span className="text-gray-800">Total (estimé)</span>
                  <span className="text-agrimarket-green">{totalPrice.toFixed(2)} €</span>
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                  <Button 
                    className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown text-white" 
                    onClick={handleCheckout}
                  >
                    Passer la commande
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/cart')} 
                      className="flex-1 border-gray-200 text-gray-600 hover:text-gray-800"
                    >
                      Voir le panier
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={clearCart} 
                      className="border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </PopoverContent>
    </Popover>
  );
}
