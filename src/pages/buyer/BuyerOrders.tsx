
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/hooks/useOrders';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Eye, Package, Truck, CheckCircle, X } from 'lucide-react';
import BuyerOrderDetailsDialog from '@/components/orders/BuyerOrderDetailsDialog';
import { useToast } from '@/hooks/use-toast';

const BuyerOrders = () => {
  const { orders, loading, updateOrderStatus } = useOrders();
  const { toast } = useToast();

  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null);

  // Real-time subscription for orders
  React.useEffect(() => {
    const channel = supabase
      .channel('buyer-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          // Orders will be automatically refetched by useOrders hook
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="h-4 w-4" />;
      case 'confirmed':
      case 'preparing':
      case 'ready':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
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
      case 'ready':
        return 'Prête';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'cancelled', 'Annulée par le client');
      toast({
        title: "Commande annulée",
        description: "Votre commande a été annulée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la commande",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mes Commandes</h1>
        <p className="text-gray-600 mt-2">Suivez l'état de vos commandes et consultez l'historique</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune commande</h3>
            <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande</p>
            <Button onClick={() => window.location.href = '/products'}>
              Découvrir les produits
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Commande #{order.id.slice(0, 8)}
                    </CardTitle>
                    <CardDescription>
                      Passée {formatDistanceToNow(new Date(order.created_at), { 
                        addSuffix: true, 
                        locale: fr 
                      })}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold">{order.total.toFixed ? order.total.toFixed(2) : order.total} €</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Articles</p>
                    <p className="font-semibold">{order.order_items?.length || 0} produit(s)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Livraison</p>
                    <p className="font-semibold capitalize">{order.delivery_method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Paiement</p>
                    <p className="font-semibold capitalize">{order.payment_status}</p>
                  </div>
                </div>

                {order.farmer && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Agriculteur</p>
                    <p className="font-medium">{order.farmer.name}</p>
                    <p className="text-sm text-gray-500">{order.farmer.location}</p>
                  </div>
                )}

                {order.order_items && order.order_items.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Produits commandés</p>
                    <div className="space-y-2">
                      {order.order_items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span>{item.product?.name} x{item.quantity}</span>
                          <span className="font-medium">
                            {((item.unit_price || 0) * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                      ))}
                      {order.order_items.length > 3 && (
                        <p className="text-sm text-gray-500">
                          +{order.order_items.length - 3} autre(s) produit(s)
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    {order.delivery_date && (
                      <p className="text-sm text-gray-600">
                        Livraison prévue le {new Date(order.delivery_date).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Annuler
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setDetailsOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BuyerOrderDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        orderId={selectedOrderId}
        orderNumber={selectedOrderId ? selectedOrderId.slice(0, 8) : undefined}
        currentStatus={orders.find(o => o.id === selectedOrderId)?.status}
      />
    </div>
  );
};

export default BuyerOrders;
