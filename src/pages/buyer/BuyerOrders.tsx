
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ShoppingCart, FileText, Heart, MessageSquare, Users, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  {
    id: "ORD-2023-004",
    date: "18/09/2023",
    total: 32400,
    items: 3,
    status: "En préparation",
    farmer: "Potager du Village"
  },
  {
    id: "ORD-2023-005",
    date: "29/09/2023",
    total: 12700,
    items: 1,
    status: "Livré",
    farmer: "Ferme des Collines"
  }
];

const BuyerOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleOrderDetails = (orderId: string) => {
    toast({
      title: "Détails de la commande",
      description: `Affichage des détails pour la commande ${orderId}`,
    });
  };
  
  const handleReorderItems = (orderId: string) => {
    toast({
      title: "Commander à nouveau",
      description: `Les articles de la commande ${orderId} ont été ajoutés au panier`,
    });
    // Dans une application réelle, redirigez vers le panier avec les produits ajoutés
  };

  return (
    <DashboardLayout
      name="Martin Pasquier"
      email="martin.p@email.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          MP
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mes commandes</h1>
          <Button onClick={() => navigate('/products')}>
            Découvrir plus de produits
          </Button>
        </div>

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
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          variant="outline" 
                          className="text-agrimarket-orange border-agrimarket-orange hover:bg-agrimarket-orange hover:text-white"
                          onClick={() => handleOrderDetails(order.id)}
                        >
                          Détails
                        </Button>
                        {order.status === "Livré" && (
                          <Button 
                            variant="outline"
                            onClick={() => handleReorderItems(order.id)}
                          >
                            Commander à nouveau
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-gray-500">
              {orders.length} commandes au total
            </p>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyerOrders;
