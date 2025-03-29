
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface OrderType {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: string;
}

interface RecentOrdersProps {
  orders: OrderType[];
  onViewAllOrders: () => void;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, onViewAllOrders }) => {
  return (
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
        <Button variant="outline" onClick={onViewAllOrders}>
          Voir toutes les commandes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentOrders;
