// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Truck, CreditCard } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { getImageUrl } from '@/utils/imageUtils';

const BuyerDashboardOrdersTab = () => {
  const { orders, loading } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <Check className="w-3 h-3" />;
      case 'shipped':
      case 'in_transit':
        return <Truck className="w-3 h-3" />;
      case 'processing':
        return <Clock className="w-3 h-3" />;
      case 'pending':
        return <CreditCard className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En préparation';
      case 'shipped':
      case 'in_transit':
        return 'En livraison';
      case 'delivered':
        return 'Livré';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agrimarket-green"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune commande trouvée</p>
              <Button asChild className="mt-4">
                <Link to="/products">Commencer mes achats</Link>
              </Button>
            </div>
          ) : (
            orders.slice(0, 5).map((order) => (
              <Card key={order.id} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium">Commande #{order.id.slice(0, 8)}</p>
                        <Badge className={`inline-flex items-center gap-1 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </p>
                      {order.farmer && (
                        <p className="text-sm text-gray-600">
                          Agriculteur: {order.farmer.name}
                        </p>
                      )}
                      
                      {/* Aperçu des produits */}
                      {order.order_items && order.order_items.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {order.order_items.slice(0, 3).map((item) => (
                            <div key={item.id} className="w-8 h-8 rounded bg-gray-100 overflow-hidden">
                              <img
                                src={getImageUrl(item.product?.primary_image_url || item.product?.image_url)}
                                alt={item.product?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {order.order_items.length > 3 && (
                            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                              +{order.order_items.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">{order.total.toLocaleString()} FCFA</p>
                      <p className="text-sm text-gray-500">
                        {order.order_items?.length || 0} article(s)
                      </p>
                      {order.payment_status && (
                        <Badge 
                          variant="outline" 
                          className={`mt-1 ${
                            order.payment_status === 'paid' 
                              ? 'border-green-500 text-green-700' 
                              : 'border-orange-500 text-orange-700'
                          }`}
                        >
                          {order.payment_status === 'paid' ? 'Payé' : 'En attente'}
                        </Badge>
                      )}
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        className="text-agrimarket-orange border-agrimarket-orange hover:bg-agrimarket-orange hover:text-white"
                        asChild
                      >
                        <Link to={`/buyer/orders/${order.id}`}>
                          Détails
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
      {orders.length > 5 && (
        <CardFooter className="justify-center">
          <Button variant="outline" asChild>
            <Link to="/buyer/orders">
              Voir toutes les commandes
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BuyerDashboardOrdersTab;
