
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

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

const BuyerDashboardOrdersTab = () => {
  return (
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
                      asChild
                    >
                      <Link to={`/buyer/orders`}>
                        Détails
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" asChild>
          <Link to="/buyer/orders">
            Voir toutes les commandes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BuyerDashboardOrdersTab;
