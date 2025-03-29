
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { 
  User, 
  Users,
  MessageSquare,
  FileText,
  Settings,
  ShieldAlert,
  Landmark,
  CreditCard,
  BarChart4
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for users
const users = [
  {
    id: 1,
    name: "Martin Pasquier",
    email: "martin.p@email.com",
    type: "Consommateur",
    status: "Actif",
    joinDate: "27/07/2023"
  },
  {
    id: 2,
    name: "Sophie Dubois",
    email: "sophie.d@email.com",
    type: "Agriculteur",
    status: "Actif",
    joinDate: "15/03/2023"
  },
  {
    id: 3,
    name: "Jean Leclerc",
    email: "jean.l@email.com",
    type: "Agriculteur",
    status: "Suspendu",
    joinDate: "05/09/2022"
  },
  {
    id: 4,
    name: "Lucie Martin",
    email: "lucie.m@email.com",
    type: "Consommateur",
    status: "Actif",
    joinDate: "12/11/2023"
  },
];

// Mock data for farmers
const farmers = [
  {
    id: 1,
    name: "Sophie Dubois",
    farm: "Ferme des Quatre Saisons",
    subscription: "Premium",
    revenue: 1250000,
    products: 28,
    status: "Vérifié"
  },
  {
    id: 2,
    name: "Jean Leclerc",
    farm: "Les Ruches de Marie",
    subscription: "Pro",
    revenue: 680000,
    products: 12,
    status: "En attente"
  },
  {
    id: 3,
    name: "Michel Blanc",
    farm: "Potager du Village",
    subscription: "Basic",
    revenue: 320000,
    products: 7,
    status: "Vérifié"
  },
];

// Mock data for messages
const messages = [
  {
    id: 1,
    from: "Martin Pasquier",
    to: "Sophie Dubois",
    subject: "Question sur les produits bio",
    date: "Aujourd'hui, 14:32",
    status: "Non résolu"
  },
  {
    id: 2,
    from: "Lucie Martin",
    to: "Jean Leclerc",
    subject: "Problème avec ma commande",
    date: "Hier, 10:15",
    status: "En traitement"
  },
  {
    id: 3,
    from: "Sophie Dubois",
    to: "Support AgriMarket",
    subject: "Problème de paiement",
    date: "21/09/2023",
    status: "Résolu"
  },
];

// Mock data for disputes
const disputes = [
  {
    id: 1,
    customer: "Martin Pasquier",
    farmer: "Sophie Dubois",
    order: "ORD-2023-001",
    issue: "Produit endommagé",
    date: "27/09/2023",
    status: "En attente"
  },
  {
    id: 2,
    customer: "Lucie Martin",
    farmer: "Jean Leclerc",
    order: "ORD-2023-015",
    issue: "Livraison non reçue",
    date: "15/09/2023",
    status: "Résolu"
  },
];

// Mock data for subscriptions
const subscriptions = [
  {
    id: 1,
    farmer: "Sophie Dubois",
    plan: "Premium",
    startDate: "15/03/2023",
    nextBilling: "15/10/2023",
    amount: 32700,
    status: "Actif"
  },
  {
    id: 2,
    farmer: "Jean Leclerc",
    plan: "Pro",
    startDate: "05/09/2022",
    nextBilling: "05/10/2023",
    amount: 13050,
    status: "Actif"
  },
  {
    id: 3,
    farmer: "Michel Blanc",
    plan: "Basic",
    startDate: "12/11/2023",
    nextBilling: "-",
    amount: 0,
    status: "Actif"
  },
];

// Mock data for statistics
const statistics = {
  totalUsers: 124,
  activeFarmers: 42,
  monthlyRevenue: 2450000,
  totalOrders: 523,
  pendingDisputes: 3
};

const AdminDashboard = () => {
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
                        AM
                      </div>
                    </Avatar>
                    <h2 className="text-xl font-bold">Admin AgriMarket</h2>
                    <p className="text-gray-500">admin@agrimarket.com</p>
                    <Button variant="outline" className="mt-4 w-full">
                      <Settings className="w-4 h-4 mr-2" /> Paramètres
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart4 className="w-4 h-4 mr-2" /> Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" /> Utilisateurs
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" /> Agriculteurs
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" /> Messages
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <ShieldAlert className="w-4 h-4 mr-2" /> Litiges
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCard className="w-4 h-4 mr-2" /> Abonnements
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Landmark className="w-4 h-4 mr-2" /> Finances
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" /> Rapports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl font-bold mb-6">Tableau de bord admin</h1>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Utilisateurs totaux</p>
                        <h3 className="text-2xl font-bold">{statistics.totalUsers}</h3>
                      </div>
                      <Users className="h-8 w-8 text-agrimarket-orange" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Agriculteurs actifs</p>
                        <h3 className="text-2xl font-bold">{statistics.activeFarmers}</h3>
                      </div>
                      <User className="h-8 w-8 text-agrimarket-green" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Revenus mensuels</p>
                        <h3 className="text-2xl font-bold">{statistics.monthlyRevenue.toLocaleString()} FCFA</h3>
                      </div>
                      <CreditCard className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Commandes totales</p>
                        <h3 className="text-2xl font-bold">{statistics.totalOrders}</h3>
                      </div>
                      <FileText className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Litiges en attente</p>
                        <h3 className="text-2xl font-bold">{statistics.pendingDisputes}</h3>
                      </div>
                      <ShieldAlert className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="users" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                  <TabsTrigger value="farmers">Agriculteurs</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="disputes">Litiges</TabsTrigger>
                  <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
                </TabsList>
                
                {/* Users Tab */}
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestion des utilisateurs</CardTitle>
                      <CardDescription>
                        Liste des utilisateurs inscrits sur la plateforme
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Date d'inscription</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.type === "Agriculteur" 
                                    ? "bg-agrimarket-lightGreen text-agrimarket-green" 
                                    : "bg-blue-100 text-blue-800"
                                }`}>
                                  {user.type}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === "Actif" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {user.status}
                                </span>
                              </TableCell>
                              <TableCell>{user.joinDate}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Éditer
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                                  Suspendre
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Farmers Tab */}
                <TabsContent value="farmers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestion des agriculteurs</CardTitle>
                      <CardDescription>
                        Liste des agriculteurs inscrits sur la plateforme
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Exploitation</TableHead>
                            <TableHead>Abonnement</TableHead>
                            <TableHead>Chiffre d'affaires</TableHead>
                            <TableHead>Produits</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {farmers.map((farmer) => (
                            <TableRow key={farmer.id}>
                              <TableCell>{farmer.id}</TableCell>
                              <TableCell>{farmer.name}</TableCell>
                              <TableCell>{farmer.farm}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  farmer.subscription === "Premium" 
                                    ? "bg-purple-100 text-purple-800" 
                                    : farmer.subscription === "Pro"
                                    ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                  {farmer.subscription}
                                </span>
                              </TableCell>
                              <TableCell>{farmer.revenue.toLocaleString()} FCFA</TableCell>
                              <TableCell>{farmer.products}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  farmer.status === "Vérifié" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {farmer.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Voir
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                                  Suspendre
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestion des messages</CardTitle>
                      <CardDescription>
                        Suivi des communications entre utilisateurs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Expéditeur</TableHead>
                            <TableHead>Destinataire</TableHead>
                            <TableHead>Sujet</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {messages.map((message) => (
                            <TableRow key={message.id}>
                              <TableCell>{message.id}</TableCell>
                              <TableCell>{message.from}</TableCell>
                              <TableCell>{message.to}</TableCell>
                              <TableCell>{message.subject}</TableCell>
                              <TableCell>{message.date}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  message.status === "Résolu" 
                                    ? "bg-green-100 text-green-800" 
                                    : message.status === "En traitement"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {message.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Voir
                                </Button>
                                <Button variant="outline" size="sm" className="bg-agrimarket-green text-white hover:bg-agrimarket-green/80">
                                  Résoudre
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Disputes Tab */}
                <TabsContent value="disputes">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestion des litiges</CardTitle>
                      <CardDescription>
                        Traitement des problèmes signalés par les utilisateurs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Agriculteur</TableHead>
                            <TableHead>Commande</TableHead>
                            <TableHead>Problème</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {disputes.map((dispute) => (
                            <TableRow key={dispute.id}>
                              <TableCell>{dispute.id}</TableCell>
                              <TableCell>{dispute.customer}</TableCell>
                              <TableCell>{dispute.farmer}</TableCell>
                              <TableCell>{dispute.order}</TableCell>
                              <TableCell>{dispute.issue}</TableCell>
                              <TableCell>{dispute.date}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  dispute.status === "Résolu" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {dispute.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Détails
                                </Button>
                                <Button variant="outline" size="sm" className="bg-agrimarket-green text-white hover:bg-agrimarket-green/80">
                                  Traiter
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Subscriptions Tab */}
                <TabsContent value="subscriptions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestion des abonnements</CardTitle>
                      <CardDescription>
                        Suivi des abonnements des agriculteurs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Agriculteur</TableHead>
                            <TableHead>Formule</TableHead>
                            <TableHead>Date de début</TableHead>
                            <TableHead>Prochain paiement</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscriptions.map((subscription) => (
                            <TableRow key={subscription.id}>
                              <TableCell>{subscription.id}</TableCell>
                              <TableCell>{subscription.farmer}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  subscription.plan === "Premium" 
                                    ? "bg-purple-100 text-purple-800" 
                                    : subscription.plan === "Pro"
                                    ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                  {subscription.plan}
                                </span>
                              </TableCell>
                              <TableCell>{subscription.startDate}</TableCell>
                              <TableCell>{subscription.nextBilling}</TableCell>
                              <TableCell>{subscription.amount.toLocaleString()} FCFA</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  subscription.status === "Actif" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {subscription.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Modifier
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                                  Annuler
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
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

export default AdminDashboard;
