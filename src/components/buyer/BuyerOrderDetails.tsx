// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, MapPin, CreditCard, Calendar } from 'lucide-react';
import { useOrders, Order } from '@/hooks/useOrders';
import { RealDeliveryTracker } from '@/components/delivery/RealDeliveryTracker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getImageUrl } from '@/utils/imageUtils';

export function BuyerOrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, getOrderById]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'preparing':
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
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agrimarket-orange"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold mb-2">Commande introuvable</h2>
        <p className="text-gray-500">Cette commande n'existe pas ou vous n'y avez pas accès.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Commande #{order.id.slice(0, 8)}</h1>
          <p className="text-gray-500">
            Passée le {format(new Date(order.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Détails de la commande */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Détails de la commande
                </span>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={getImageUrl(item.product?.primary_image_url || item.product?.image_url)}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.product?.unit} × {item.unit_price.toLocaleString()} FCFA
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {(item.quantity * item.unit_price).toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span>{order.total.toLocaleString()} FCFA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations de livraison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Informations de livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Méthode de livraison</p>
                  <p className="font-medium capitalize">{order.delivery_method}</p>
                </div>
                
                {order.delivery_address && (
                  <div>
                    <p className="text-sm text-gray-500">Adresse de livraison</p>
                    <p className="font-medium">{order.delivery_address}</p>
                  </div>
                )}
                
                {order.delivery_date && (
                  <div>
                    <p className="text-sm text-gray-500">Date souhaitée</p>
                    <p className="font-medium">
                      {format(new Date(order.delivery_date), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informations de paiement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Paiement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Statut</span>
                  <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>
                    {order.payment_status === 'paid' ? 'Payé' : 'En attente'}
                  </Badge>
                </div>
                
                {order.payment_method && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Méthode</span>
                    <span className="font-medium capitalize">{order.payment_method}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suivi de livraison */}
        <div className="space-y-6">
          <RealDeliveryTracker orderId={order.id} />
          
          {order.farmer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agriculteur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{order.farmer.name}</p>
                  <p className="text-sm text-gray-500">{order.farmer.location}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
