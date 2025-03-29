
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { 
  User, 
  ShoppingCart, 
  Heart, 
  MessageSquare, 
  FileText, 
  Check,
  Users
} from 'lucide-react';

// Mock data for orders
const orders = [
  {
    id: "ORD-2023-001",
    date: "27/07/2023",
    total: 49800,
    items: 4,
    status: "Livré",
    farmer: "Ferme des Quatre Saisons"
  },
  {
    id: "ORD-2023-002",
    date: "15/08/2023",
    total: 21300,
    items: 2,
    status: "En préparation",
    farmer: "Les Ruches de Marie"
  },
  {
    id: "ORD-2023-003",
    date: "05/09/2023",
    total: 84500,
    items: 7,
    status: "En livraison",
    farmer: "Chèvrerie du Vallon"
  },
];

// Mock data for favorites
const favorites = [
  {
    id: 1,
    name: "Panier de légumes bio",
    farmer: "Ferme des Quatre Saisons",
    price: 16350,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    farmer: "Les Ruches de Marie",
    price: 5600,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    farmer: "Chèvrerie du Vallon",
    price: 2750,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
  },
];

// Mock data for messages
const messages = [
  {
    id: 1,
    farmer: "Ferme des Quatre Saisons",
    lastMessage: "Bonjour, votre commande sera prête demain comme prévu!",
    date: "Aujourd'hui, 14:32",
    unread: true
  },
  {
    id: 2,
    farmer: "Les Ruches de Marie",
    lastMessage: "Merci pour votre commande, n'hésitez pas si vous avez des questions.",
    date: "Hier, 10:15",
    unread: false
  },
];

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
                        MP
                      </div>
                    </Avatar>
                    <h2 className="text-xl font-bold">Martin Pasquier</h2>
                    <p className="text-gray-500">martin.p@email.com</p>
                    <Button variant="outline" className="mt-4 w-full">
                      <User className="w-4 h-4 mr-2" /> Éditer mon profil
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <ShoppingCart className="w-4 h-4 mr-2" /> Mes commandes
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" /> Mes favoris
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" /> Messagerie
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" /> Mes agriculteurs
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" /> Factures
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
              
              <Tabs defaultValue="orders" className="mb-8">
                <TabsList>
                  <TabsTrigger value="orders">Mes commandes</TabsTrigger>
                  <TabsTrigger value="favorites">Mes favoris</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des commandes</CardTitle>
                      <CardDescription>
                        Consultez et suivez vos commandes récentes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Card key={order.id} className="border hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                  <p className="font-medium">{order.id}</p>
                                  <p className="text-sm text-gray-500">{order.date}</p>
                                  <p className="text-sm">Agriculteur: {order.farmer}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.total.toLocaleString()} FCFA</p>
                                  <p className="text-sm">{order.items} articles</p>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                    order.status === "Livré" 
                                      ? "bg-green-100 text-green-800" 
                                      : order.status === "En livraison"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {order.status === "Livré" && <Check className="w-3 h-3 mr-1" />}
                                    {order.status}
                                  </span>
                                </div>
                                <div>
                                  <Button 
                                    variant="outline" 
                                    className="text-agrimarket-orange border-agrimarket-orange hover:bg-agrimarket-orange hover:text-white"
                                  >
                                    Détails
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="outline">Voir toutes les commandes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Favorites Tab */}
                <TabsContent value="favorites">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mes produits favoris</CardTitle>
                      <CardDescription>
                        Les produits que vous avez ajoutés à vos favoris
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((product) => (
                          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-40 relative">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200"
                              >
                                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-gray-600">{product.farmer}</p>
                              <div className="flex justify-between items-center mt-2">
                                <p className="font-bold">{product.price.toLocaleString()} FCFA</p>
                                <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600">
                                  Acheter
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="outline">Voir tous les favoris</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages">
                  <Card>
                    <CardHeader>
                      <CardTitle>Messagerie</CardTitle>
                      <CardDescription>
                        Vos conversations avec les agriculteurs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <Card key={message.id} className={`border hover:shadow-md transition-shadow ${message.unread ? 'border-l-4 border-l-agrimarket-green' : ''}`}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium flex items-center">
                                    {message.farmer} 
                                    {message.unread && (
                                      <span className="ml-2 bg-agrimarket-green w-2 h-2 rounded-full"></span>
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-500">{message.date}</p>
                                  <p className="mt-2">{message.lastMessage}</p>
                                </div>
                                <Button className="bg-agrimarket-orange hover:bg-orange-600">
                                  Répondre
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="outline">Voir tous les messages</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
              
              {/* Recommended Products */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Produits recommandés pour vous</CardTitle>
                  <CardDescription>
                    Basés sur vos achats précédents et vos préférences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Produit 1 */}
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" 
                          alt="Produit" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">Fruits secs assortis</h3>
                        <p className="text-sm text-gray-600">Plantation Bio du Sud</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-bold">8 450 FCFA</p>
                          <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600">
                            Voir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Produit 2 */}
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1594489573458-2423bb0fcd1a" 
                          alt="Produit" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">Huile d'olive extra vierge</h3>
                        <p className="text-sm text-gray-600">Oliveraie Sunlight</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-bold">10 820 FCFA</p>
                          <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600">
                            Voir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Produit 3 */}
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37" 
                          alt="Produit" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">Confiture artisanale</h3>
                        <p className="text-sm text-gray-600">Ferme des Collines</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-bold">5 180 FCFA</p>
                          <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600">
                            Voir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
