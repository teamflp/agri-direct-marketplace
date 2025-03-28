
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Check, Info, MessageSquare, ShoppingCart, Truck, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for cart items
const cartItems = [
  {
    id: 1,
    name: "Panier de légumes bio",
    price: 24.90,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    farmer: {
      id: 101,
      name: "Ferme des Quatre Saisons",
      location: "Abidjan, Côte d'Ivoire",
      image: "https://images.unsplash.com/photo-1592982573131-03044c94cf46",
    }
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    price: 8.50,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    farmer: {
      id: 102,
      name: "Les Ruches de Marie",
      location: "Yamoussoukro, Côte d'Ivoire",
      image: "https://images.unsplash.com/photo-1473973266408-ed4e9f2a8d9b",
    }
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    price: 4.20,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    farmer: {
      id: 103,
      name: "Chèvrerie du Vallon",
      location: "Bouaké, Côte d'Ivoire",
      image: "https://images.unsplash.com/photo-1528607929406-7f48298301ef",
    }
  }
];

// Groupe les articles par agriculteur
const groupedByFarmer = cartItems.reduce((acc, item) => {
  const farmerId = item.farmer.id;
  if (!acc[farmerId]) {
    acc[farmerId] = {
      farmer: item.farmer,
      items: []
    };
  }
  acc[farmerId].items.push(item);
  return acc;
}, {} as Record<number, { farmer: typeof cartItems[0]['farmer'], items: typeof cartItems }>);

// Convertit en tableau pour faciliter l'affichage
const farmerGroups = Object.values(groupedByFarmer);

const deliveryOptions = [
  {
    id: "pickup",
    name: "Retrait sur place",
    description: "Récupérez vos produits directement chez l'agriculteur",
    price: 0
  },
  {
    id: "standard",
    name: "Livraison standard",
    description: "Livraison en 3-5 jours ouvrés",
    price: 5.90
  },
  {
    id: "express",
    name: "Livraison express",
    description: "Livraison en 24h",
    price: 9.90
  }
];

const paymentMethods = [
  {
    id: "mobile_money",
    name: "Mobile Money",
    description: "Orange Money, MTN Mobile Money, etc."
  },
  {
    id: "card",
    name: "Carte bancaire",
    description: "Visa, Mastercard, etc."
  },
  {
    id: "bank_transfer",
    name: "Virement bancaire",
    description: "Paiement par virement"
  }
];

const CheckoutProcess = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState("cart");
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryOptions[0].id);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [currentFarmer, setCurrentFarmer] = useState<typeof cartItems[0]['farmer'] | null>(null);
  
  // Calcul du sous-total
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calcul des frais de livraison
  const deliveryFee = deliveryOptions.find(option => option.id === deliveryMethod)?.price || 0;
  
  // Calcul du total
  const total = subtotal + deliveryFee;

  const handleStepChange = (step: string) => {
    setActiveStep(step);
  };

  const handleContactFarmer = (farmer: typeof cartItems[0]['farmer']) => {
    setCurrentFarmer(farmer);
    setContactDialogOpen(true);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message envoyé",
      description: `Votre message a été envoyé à ${currentFarmer?.name}`,
    });
    setContactDialogOpen(false);
  };

  const handleSubmitOrder = () => {
    toast({
      title: "Commande confirmée !",
      description: "Votre commande a été enregistrée avec succès",
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50 pb-10">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Finaliser votre commande</h1>
          <p className="text-gray-600 mb-8">Suivez les étapes pour compléter votre achat</p>
          
          {/* Stepper */}
          <div className="mb-8">
            <Tabs value={activeStep} onValueChange={handleStepChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cart" className="data-[state=active]:bg-agrimarket-orange data-[state=active]:text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Panier
                </TabsTrigger>
                <TabsTrigger value="delivery" className="data-[state=active]:bg-agrimarket-orange data-[state=active]:text-white">
                  <Truck className="w-4 h-4 mr-2" /> Livraison
                </TabsTrigger>
                <TabsTrigger value="payment" className="data-[state=active]:bg-agrimarket-orange data-[state=active]:text-white">
                  <Check className="w-4 h-4 mr-2" /> Paiement
                </TabsTrigger>
              </TabsList>
              
              {/* Cart Tab */}
              <TabsContent value="cart" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Articles dans votre panier</CardTitle>
                        <CardDescription>
                          {cartItems.length} article(s) - {cartItems.reduce((total, item) => total + item.quantity, 0)} produit(s)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {farmerGroups.map((group) => (
                            <div key={group.farmer.id} className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                    <img 
                                      src={group.farmer.image} 
                                      alt={group.farmer.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{group.farmer.name}</h3>
                                    <p className="text-xs text-gray-500">{group.farmer.location}</p>
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center gap-1 text-agrimarket-orange border-agrimarket-orange hover:bg-agrimarket-orange hover:text-white"
                                  onClick={() => handleContactFarmer(group.farmer)}
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  Contacter
                                </Button>
                              </div>
                              <div className="divide-y">
                                {group.items.map((item) => (
                                  <div key={item.id} className="p-4 flex items-center">
                                    <div className="h-16 w-16 rounded overflow-hidden">
                                      <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div className="ml-4 flex-grow">
                                      <h3 className="font-medium">{item.name}</h3>
                                      <p className="text-sm text-gray-500">{item.price.toFixed(2)} € / unité</p>
                                    </div>
                                    <div className="flex items-center">
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full"
                                      >
                                        <span className="sr-only">Diminuer</span>
                                        -
                                      </Button>
                                      <span className="mx-3">{item.quantity}</span>
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full"
                                      >
                                        <span className="sr-only">Augmenter</span>
                                        +
                                      </Button>
                                    </div>
                                    <div className="ml-6 text-right">
                                      <p className="font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-red-500 hover:text-red-700 p-0 h-auto"
                                      >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Supprimer</span>
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Résumé de la commande</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Sous-total</span>
                            <span>{subtotal.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Frais de livraison</span>
                            <span>Calculés à l'étape suivante</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total estimé</span>
                            <span>{subtotal.toFixed(2)} €</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-agrimarket-orange hover:bg-orange-600" 
                          onClick={() => handleStepChange("delivery")}
                        >
                          Continuer vers la livraison
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Delivery Tab */}
              <TabsContent value="delivery" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Informations de livraison</CardTitle>
                        <CardDescription>
                          Renseignez vos coordonnées et choisissez une méthode de livraison
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="firstName">Prénom</Label>
                              <Input id="firstName" placeholder="Prénom" defaultValue="Martin" />
                            </div>
                            <div>
                              <Label htmlFor="lastName">Nom</Label>
                              <Input id="lastName" placeholder="Nom" defaultValue="Pasquier" />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="address">Adresse</Label>
                            <Input id="address" placeholder="Adresse" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city">Ville</Label>
                              <Input id="city" placeholder="Ville" defaultValue="Abidjan" />
                            </div>
                            <div>
                              <Label htmlFor="postalCode">Code postal</Label>
                              <Input id="postalCode" placeholder="Code postal" defaultValue="00225" />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input id="phone" placeholder="Téléphone" defaultValue="+225 XX XX XX XX XX" />
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-medium mb-3">Méthode de livraison</h3>
                            <RadioGroup 
                              value={deliveryMethod} 
                              onValueChange={setDeliveryMethod}
                              className="space-y-3"
                            >
                              {deliveryOptions.map((option) => (
                                <div key={option.id} className={`border rounded-lg p-4 cursor-pointer ${
                                  deliveryMethod === option.id ? 'border-agrimarket-orange' : ''
                                }`}>
                                  <div className="flex items-start">
                                    <RadioGroupItem 
                                      id={option.id} 
                                      value={option.id} 
                                      className="mt-1"
                                    />
                                    <div className="ml-3">
                                      <Label htmlFor={option.id} className="font-medium cursor-pointer">
                                        {option.name}
                                      </Label>
                                      <p className="text-sm text-gray-500">
                                        {option.description}
                                      </p>
                                      <p className="text-sm font-medium mt-1">
                                        {option.price === 0 ? 'Gratuit' : `${option.price.toFixed(2)} €`}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Résumé de la commande</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Sous-total</span>
                            <span>{subtotal.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frais de livraison</span>
                            <span>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toFixed(2)} €`}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>{total.toFixed(2)} €</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-3">
                        <Button 
                          className="w-full bg-agrimarket-orange hover:bg-orange-600" 
                          onClick={() => handleStepChange("payment")}
                        >
                          Continuer vers le paiement
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleStepChange("cart")}
                        >
                          Retour au panier
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Payment Tab */}
              <TabsContent value="payment" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Paiement</CardTitle>
                        <CardDescription>
                          Choisissez votre méthode de paiement préférée
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <RadioGroup 
                            value={paymentMethod} 
                            onValueChange={setPaymentMethod}
                            className="space-y-3"
                          >
                            {paymentMethods.map((method) => (
                              <div key={method.id} className={`border rounded-lg p-4 cursor-pointer ${
                                paymentMethod === method.id ? 'border-agrimarket-orange' : ''
                              }`}>
                                <div className="flex items-start">
                                  <RadioGroupItem 
                                    id={method.id} 
                                    value={method.id} 
                                    className="mt-1"
                                  />
                                  <div className="ml-3">
                                    <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                      {method.name}
                                    </Label>
                                    <p className="text-sm text-gray-500">
                                      {method.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                          
                          {paymentMethod === "mobile_money" && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-3">Détails Mobile Money</h3>
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="phone_number">Numéro de téléphone</Label>
                                  <Input id="phone_number" placeholder="+225 XX XX XX XX XX" defaultValue="+225 XX XX XX XX XX" />
                                </div>
                                <div>
                                  <Label htmlFor="operator">Opérateur</Label>
                                  <select id="operator" className="w-full rounded-md border border-input bg-background px-3 py-2">
                                    <option value="orange">Orange Money</option>
                                    <option value="mtn">MTN Mobile Money</option>
                                    <option value="moov">Moov Money</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {paymentMethod === "card" && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-3">Détails de la carte</h3>
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="card_number">Numéro de carte</Label>
                                  <Input id="card_number" placeholder="1234 5678 9101 1121" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="expiry">Date d'expiration</Label>
                                    <Input id="expiry" placeholder="MM/AA" />
                                  </div>
                                  <div>
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="card_name">Nom sur la carte</Label>
                                  <Input id="card_name" placeholder="NOM PRÉNOM" />
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {paymentMethod === "bank_transfer" && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-medium mb-3">Détails du virement</h3>
                              <div className="space-y-1">
                                <p className="text-sm">Bénéficiaire: <span className="font-medium">AgriMarket CI</span></p>
                                <p className="text-sm">IBAN: <span className="font-medium">CI00 0000 0000 0000 0000 0000 000</span></p>
                                <p className="text-sm">BIC: <span className="font-medium">XXXXXXXX</span></p>
                                <p className="text-sm">Banque: <span className="font-medium">Banque Nationale de Côte d'Ivoire</span></p>
                                <p className="text-sm mt-3 flex items-center text-orange-600">
                                  <Info className="w-4 h-4 mr-1" />
                                  Utilisez votre numéro de commande comme référence
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <div className="bg-agrimarket-lightGreen p-4 rounded-lg">
                            <p className="text-sm text-agrimarket-green">
                              En validant votre commande, vous acceptez les conditions générales de vente d'AgriMarket et notre politique de confidentialité.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Résumé de la commande</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Articles ({cartItems.length})</h3>
                            <div className="space-y-2">
                              {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <span>{item.name} x{item.quantity}</span>
                                  <span>{(item.price * item.quantity).toFixed(2)} €</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between">
                            <span>Sous-total</span>
                            <span>{subtotal.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frais de livraison</span>
                            <span>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toFixed(2)} €`}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>{total.toFixed(2)} €</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-3">
                        <Button 
                          className="w-full bg-agrimarket-orange hover:bg-orange-600" 
                          onClick={handleSubmitOrder}
                        >
                          Confirmer la commande
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleStepChange("delivery")}
                        >
                          Retour à la livraison
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Dialog pour contacter l'agriculteur */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contacter {currentFarmer?.name}</DialogTitle>
            <DialogDescription>
              Envoyez un message directement à l'agriculteur pour poser vos questions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={currentFarmer?.image} 
                  alt={currentFarmer?.name} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div>
                <h4 className="font-medium">{currentFarmer?.name}</h4>
                <p className="text-sm text-gray-500">{currentFarmer?.location}</p>
              </div>
            </div>
            
            <div>
              <Label htmlFor="message">Votre message</Label>
              <Textarea 
                id="message" 
                placeholder="Écrivez votre message ici..." 
                rows={5} 
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setContactDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button type="button" className="bg-agrimarket-orange hover:bg-orange-600" onClick={handleSendMessage}>
              Envoyer le message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutProcess;
