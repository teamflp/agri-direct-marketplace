
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Group items by farmer
  const groupedByFarmer = items.reduce((acc, item) => {
    const farmerId = item.farmerId || 0;
    if (!acc[farmerId]) {
      acc[farmerId] = {
        farmerName: item.farmerName || 'Unknown Farmer',
        farmerId: farmerId,
        items: []
      };
    }
    acc[farmerId].items.push(item);
    return acc;
  }, {} as Record<number, { farmerName: string; farmerId: number; items: typeof items }>);
  
  // Convert to array for rendering
  const farmerGroups = Object.values(groupedByFarmer);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 bg-gray-50 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-2 text-gray-600 hover:text-agrimarket-green" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Mon Panier</h1>
          </div>
          
          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mb-4 flex justify-center">
                <ShoppingCart className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-medium mb-2 text-gray-700">Votre panier est vide</h2>
              <p className="text-gray-500 mb-6">Découvrez nos produits frais et locaux pour remplir votre panier</p>
              <Button 
                className="bg-agrimarket-green hover:bg-agrimarket-darkGreen text-white"
                onClick={() => navigate('/products')}
              >
                Découvrir les produits
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium text-gray-800">Articles ({totalItems})</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                      onClick={clearCart}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Vider le panier
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {farmerGroups.map((group) => (
                      <div key={group.farmerId} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-gray-50 p-4">
                          <h3 className="font-medium text-gray-700">{group.farmerName}</h3>
                        </div>
                        
                        <div className="divide-y">
                          {group.items.map((item) => (
                            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center">
                              <div className="flex items-center flex-grow">
                                <div className="h-20 w-20 rounded-md overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                                  <p className="text-sm text-gray-500">{item.price.toFixed(2)} € / {item.unit}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between sm:justify-end mt-4 sm:mt-0">
                                <div className="flex items-center">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8 rounded-full bg-white border-gray-200 text-agrimarket-green hover:bg-gray-50 hover:text-agrimarket-darkGreen"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="mx-3 w-8 text-center text-gray-800">{item.quantity}</span>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8 rounded-full bg-white border-gray-200 text-agrimarket-green hover:bg-gray-50 hover:text-agrimarket-darkGreen"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <div className="ml-6 text-right">
                                  <p className="font-bold text-gray-800">{(item.price * item.quantity).toFixed(2)} €</p>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-500 hover:text-red-700 p-0 h-auto"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Supprimer</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-medium mb-4 text-gray-800">Récapitulatif</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="text-gray-800">{totalPrice.toFixed(2)} €</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Frais de livraison</span>
                      <span>Calculés à la commande</span>
                    </div>
                    
                    <div className="pt-4">
                      <div className="relative">
                        <Input 
                          placeholder="Code promotionnel" 
                          className="pr-24 border-gray-200"
                        />
                        <Button 
                          className="absolute right-1 top-1 h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700"
                          variant="secondary"
                        >
                          Appliquer
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-200" />
                    
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-800">Total (TTC)</span>
                      <span className="text-agrimarket-green">{totalPrice.toFixed(2)} €</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown text-white mt-4" 
                      onClick={() => navigate('/checkout')}
                    >
                      Procéder au paiement
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-200 text-gray-700 hover:text-agrimarket-green" 
                      onClick={() => navigate('/products')}
                    >
                      Continuer les achats
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
