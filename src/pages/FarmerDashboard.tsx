
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import {
  User,
  FileText,
  MessageSquare,
  Users,
  Check,
  ArrowUp,
  ArrowDown,
  Info,
  BarChart
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for products
const products = [
  {
    id: 1,
    name: "Tomates Bio",
    price: 3.50,
    stock: 25,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1592857281548-a552a01fa532",
    sales: 42
  },
  {
    id: 2,
    name: "Salade Verte",
    price: 1.20,
    stock: 15,
    unit: "pièce",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43b",
    sales: 30
  },
  {
    id: 3,
    name: "Carottes",
    price: 2.80,
    stock: 18,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1582515073490-39981397c445",
    sales: 22
  },
  {
    id: 4,
    name: "Fraises",
    price: 4.50,
    stock: 10,
    unit: "barquette 250g",
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9",
    sales: 35
  }
];

// Mock data for orders
const orders = [
  {
    id: "ORD-2023-101",
    customer: "Martin Pasquier",
    date: "27/07/2023",
    total: 75.90,
    items: 4,
    status: "En attente",
  },
  {
    id: "ORD-2023-102",
    customer: "Sophie Durand",
    date: "15/08/2023",
    total: 32.50,
    items: 2,
    status: "Confirmée",
  },
  {
    id: "ORD-2023-103",
    customer: "Jean Dupont",
    date: "05/09/2023",
    total: 128.75,
    items: 7,
    status: "Livrée",
  },
];

// Mock data for messages
const messages = [
  {
    id: 1,
    customer: "Martin Pasquier",
    lastMessage: "Bonjour, est-ce que je pourrais avoir des détails sur vos méthodes de culture ?",
    date: "Aujourd'hui, 14:32",
    unread: true
  },
  {
    id: 2,
    customer: "Sophie Durand",
    lastMessage: "Avez-vous des fraises cette semaine ?",
    date: "Hier, 10:15",
    unread: false
  },
  {
    id: 3,
    customer: "Jean Dupont",
    lastMessage: "Merci pour les légumes, ils étaient délicieux !",
    date: "12/09/2023, 18:22",
    unread: false
  }
];

// Mock data for subscription
const subscription = {
  plan: "Pro",
  startDate: "01/01/2023",
  endDate: "31/12/2023",
  featuresUsed: {
    productsUsed: 25,
    productsLimit: 50,
    storageUsed: 150,
    storageLimit: 500,
    salesThisMonth: 42,
    customersCount: 28
  }
};

const FarmerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Calculate percentage for progress bars
  const productsPercentage = (subscription.featuresUsed.productsUsed / subscription.featuresUsed.productsLimit) * 100;
  const storagePercentage = (subscription.featuresUsed.storageUsed / subscription.featuresUsed.storageLimit) * 100;

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
                      <div className="bg-agrimarket-green text-white text-xl font-semibold flex items-center justify-center h-full">
                        FQ
                      </div>
                    </Avatar>
                    <h2 className="text-xl font-bold">Ferme des Quatre Saisons</h2>
                    <p className="text-gray-500">ferme4saisons@email.com</p>
                    <div className="bg-agrimarket-lightGreen text-agrimarket-green px-3 py-1 rounded-full text-sm mt-2">
                      Abonnement Pro
                    </div>
                    <Button variant="outline" className="mt-4 w-full">
                      <User className="w-4 h-4 mr-2" /> Éditer mon profil
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant={selectedTab === "overview" ? "default" : "ghost"} 
                      className={`w-full justify-start ${selectedTab === "overview" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
                      onClick={() => setSelectedTab("overview")}
                    >
                      <User className="w-4 h-4 mr-2" /> Tableau de bord
                    </Button>
                    <Button 
                      variant={selectedTab === "products" ? "default" : "ghost"} 
                      className={`w-full justify-start ${selectedTab === "products" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
                      onClick={() => setSelectedTab("products")}
                    >
                      <FileText className="w-4 h-4 mr-2" /> Mes produits
                    </Button>
                    <Button 
                      variant={selectedTab === "orders" ? "default" : "ghost"} 
                      className={`w-full justify-start ${selectedTab === "orders" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
                      onClick={() => setSelectedTab("orders")}
                    >
                      <Users className="w-4 h-4 mr-2" /> Commandes
                    </Button>
                    <Button 
                      variant={selectedTab === "messages" ? "default" : "ghost"} 
                      className={`w-full justify-start ${selectedTab === "messages" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
                      onClick={() => setSelectedTab("messages")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" /> Messagerie
                    </Button>
                    {/* Fix for the Button component - Remove 'as' prop and wrap with Link */}
                    <Link to="/farmer-dashboard/analytics">
                      <Button 
                        variant={selectedTab === "analytics" ? "default" : "ghost"} 
                        className={`w-full justify-start ${selectedTab === "analytics" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
                      >
                        <BarChart className="w-4 h-4 mr-2" /> Analyses
                      </Button>
                    </Link>
                    <Button 
                      variant={selectedTab === "subscription" ? "default" : "ghost"} 
                      className={`w-full justify-start ${selectedTab === "subscription" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
                      onClick={() => setSelectedTab("subscription")}
                    >
                      <Info className="w-4 h-4 mr-2" /> Mon abonnement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <h1 className="text-3xl font-bold">Tableau de bord</h1>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                          <p className="text-gray-500 mb-1">Ventes ce mois</p>
                          <h3 className="text-3xl font-bold text-agrimarket-green">
                            {subscription.featuresUsed.salesThisMonth}
                          </h3>
                          <p className="text-green-600 flex items-center mt-2">
                            <ArrowUp className="w-4 h-4 mr-1" /> 12% vs mois dernier
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                          <p className="text-gray-500 mb-1">Clients actifs</p>
                          <h3 className="text-3xl font-bold text-agrimarket-green">
                            {subscription.featuresUsed.customersCount}
                          </h3>
                          <p className="text-green-600 flex items-center mt-2">
                            <ArrowUp className="w-4 h-4 mr-1" /> 5% vs mois dernier
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                          <p className="text-gray-500 mb-1">Produits en stock</p>
                          <h3 className="text-3xl font-bold text-agrimarket-green">
                            {products.length}
                          </h3>
                          <p className="text-red-600 flex items-center mt-2">
                            <ArrowDown className="w-4 h-4 mr-1" /> 2 en rupture
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Commandes récentes</CardTitle>
                      <CardDescription>
                        Les dernières commandes reçues
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.slice(0, 2).map((order) => (
                          <Card key={order.id} className="border hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                  <p className="font-medium">{order.id}</p>
                                  <p className="text-sm text-gray-500">{order.date}</p>
                                  <p className="text-sm">Client: {order.customer}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.total.toFixed(2)} €</p>
                                  <p className="text-sm">{order.items} articles</p>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                    order.status === "Livrée" 
                                      ? "bg-green-100 text-green-800" 
                                      : order.status === "Confirmée"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {order.status === "Livrée" && <Check className="w-3 h-3 mr-1" />}
                                    {order.status}
                                  </span>
                                </div>
                                <div>
                                  <Button 
                                    variant="outline" 
                                    className="text-agrimarket-green border-agrimarket-green hover:bg-agrimarket-green hover:text-white"
                                  >
                                    Gérer
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="outline" onClick={() => setSelectedTab("orders")}>
                        Voir toutes les commandes
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Top Products */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Produits les plus vendus</CardTitle>
                      <CardDescription>
                        Vos produits les plus populaires
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {products.sort((a, b) => b.sales - a.sales).slice(0, 3).map((product) => (
                          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-40 relative">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-agrimarket-green text-white text-xs px-2 py-1 rounded-full">
                                {product.sales} ventes
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{product.name}</h3>
                              <div className="flex justify-between items-center mt-2">
                                <p className="font-bold">{product.price.toFixed(2)} €/{product.unit}</p>
                                <p className="text-sm">Stock: {product.stock}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="outline" onClick={() => setSelectedTab("products")}>
                        Gérer tous les produits
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Products Tab */}
                <TabsContent value="products">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Mes produits</h1>
                    <Button className="bg-agrimarket-green hover:bg-agrimarket-green/90">
                      Ajouter un produit
                    </Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.map((product) => (
                          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="flex h-40">
                              <div className="w-1/3">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="w-2/3 p-4">
                                <div className="flex justify-between">
                                  <h3 className="font-semibold">{product.name}</h3>
                                  <p className="font-bold">{product.price.toFixed(2)} €/{product.unit}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                  <span className="text-sm mr-2">Stock:</span>
                                  <span className={`text-sm font-medium ${
                                    product.stock > 10 
                                      ? "text-green-600" 
                                      : product.stock > 5 
                                      ? "text-yellow-600" 
                                      : "text-red-600"
                                  }`}>
                                    {product.stock} {product.unit}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                  {product.sales} ventes totales
                                </p>
                                <div className="flex gap-2 mt-4">
                                  <Button variant="outline" size="sm">
                                    Modifier
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                                    Supprimer
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <h1 className="text-3xl font-bold mb-6">Commandes</h1>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Toutes les commandes</CardTitle>
                      <CardDescription>
                        Gérez les commandes de vos clients
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
                                  <p className="text-sm">Client: {order.customer}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{order.total.toFixed(2)} €</p>
                                  <p className="text-sm">{order.items} articles</p>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                    order.status === "Livrée" 
                                      ? "bg-green-100 text-green-800" 
                                      : order.status === "Confirmée"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {order.status === "Livrée" && <Check className="w-3 h-3 mr-1" />}
                                    {order.status}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    className="text-agrimarket-green border-agrimarket-green hover:bg-agrimarket-green hover:text-white"
                                  >
                                    Détails
                                  </Button>
                                  <Button 
                                    variant="default" 
                                    className="bg-agrimarket-green hover:bg-agrimarket-green/90"
                                    disabled={order.status === "Livrée"}
                                  >
                                    {order.status === "En attente" ? "Confirmer" : 
                                     order.status === "Confirmée" ? "Marquer livrée" : "Complétée"}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages">
                  <h1 className="text-3xl font-bold mb-6">Messagerie</h1>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversations avec les clients</CardTitle>
                      <CardDescription>
                        Répondez aux questions et demandes de vos clients
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
                                    {message.customer} 
                                    {message.unread && (
                                      <span className="ml-2 bg-agrimarket-green w-2 h-2 rounded-full"></span>
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-500">{message.date}</p>
                                  <p className="mt-2">{message.lastMessage}</p>
                                </div>
                                <Button className="bg-agrimarket-green hover:bg-agrimarket-green/90">
                                  Répondre
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Subscription Tab */}
                <TabsContent value="subscription">
                  <h1 className="text-3xl font-bold mb-6">Mon abonnement</h1>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Détails de l'abonnement</CardTitle>
                      <CardDescription>
                        Formule {subscription.plan} - Valable du {subscription.startDate} au {subscription.endDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-agrimarket-lightGreen p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-agrimarket-green font-medium">Formule Pro</h3>
                          <Button variant="outline" className="text-agrimarket-green border-agrimarket-green hover:bg-agrimarket-green hover:text-white">
                            Mettre à niveau
                          </Button>
                        </div>
                        <p className="text-sm">
                          Votre abonnement vous permet de publier jusqu'à 50 produits, de disposer de 500 Mo de stockage pour vos images, et d'accéder à toutes les fonctionnalités premium.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Produits utilisés</span>
                            <span className="text-sm font-medium">
                              {subscription.featuresUsed.productsUsed}/{subscription.featuresUsed.productsLimit}
                            </span>
                          </div>
                          <Progress value={productsPercentage} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Stockage utilisé</span>
                            <span className="text-sm font-medium">
                              {subscription.featuresUsed.storageUsed} Mo/{subscription.featuresUsed.storageLimit} Mo
                            </span>
                          </div>
                          <Progress value={storagePercentage} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-2">Historique de paiement</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>01/01/2023</span>
                                <span className="font-medium">199.00 €</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>01/01/2022</span>
                                <span className="font-medium">189.00 €</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-2">Prochain paiement</h3>
                            <div className="text-sm">
                              <p>Date: <span className="font-medium">01/01/2024</span></p>
                              <p>Montant: <span className="font-medium">199.00 €</span></p>
                              <Button variant="outline" size="sm" className="mt-2 w-full">
                                Modifier moyen de paiement
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Annuler l'abonnement
                      </Button>
                      <Button className="bg-agrimarket-green hover:bg-agrimarket-green/90">
                        Télécharger la facture
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
