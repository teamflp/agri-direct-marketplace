// @ts-nocheck
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Package, Truck, Eye, Calendar } from 'lucide-react';
import { useFarmerOrders } from '@/hooks/useFarmerOrders';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import FarmerOrderDetailsDialog from './FarmerOrderDetailsDialog';

const FarmerOrdersList = () => {
  const { orders, loading, updateOrderStatus } = useFarmerOrders();
  const { toast } = useToast();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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

  const getNextStatusAction = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending':
        return { status: 'confirmed', label: 'Confirmer', icon: Check };
      case 'confirmed':
        return { status: 'preparing', label: 'Préparer', icon: Package };
      case 'preparing':
        return { status: 'ready', label: 'Marquer prête', icon: Check };
      case 'ready':
        return { status: 'shipped', label: 'Expédier', icon: Truck };
      case 'shipped':
        return { status: 'delivered', label: 'Marquer livrée', icon: Check };
      default:
        return null;
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast({
        title: "Statut mis à jour",
        description: `La commande est maintenant "${getStatusLabel(newStatus)}"`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Aucune commande</h3>
        <p className="text-gray-600">Vous n'avez pas encore reçu de commande</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Commande #{order.id.slice(0, 8)}
                </h3>
                <p className="text-sm text-gray-600">
                  Passée {formatDistanceToNow(new Date(order.created_at), { 
                    addSuffix: true, 
                    locale: fr 
                  })}
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-600">Total</p>
                <p className="font-semibold">{order.total.toFixed(2)} €</p>
              </div>
              <div>
                <p className="text-gray-600">Articles</p>
                <p className="font-semibold">{order.order_items?.length || 0}</p>
              </div>
              <div>
                <p className="text-gray-600">Livraison</p>
                <p className="font-semibold capitalize">{order.delivery_method}</p>
              </div>
              <div>
                <p className="text-gray-600">Paiement</p>
                <p className="font-semibold capitalize">{order.payment_status}</p>
              </div>
            </div>

            {order.delivery_date && (
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  Livraison souhaitée le {new Date(order.delivery_date).toLocaleDateString('fr-FR')}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {(() => {
                  const nextAction = getNextStatusAction(order.status);
                  if (nextAction && order.status !== 'delivered' && order.status !== 'cancelled') {
                    const Icon = nextAction.icon;
                    return (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, nextAction.status)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {nextAction.label}
                      </Button>
                    );
                  }
                  return null;
                })()}
                
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                  >
                    Annuler
                  </Button>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedOrderId(order.id);
                  setDetailsOpen(true);
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                Détails
              </Button>
            </div>
          </div>
        ))}
      </div>

      <FarmerOrderDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        orderId={selectedOrderId}
      />
    </>
  );
};

export default FarmerOrdersList;
