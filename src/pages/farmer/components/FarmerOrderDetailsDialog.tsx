
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFarmerOrders } from '@/hooks/useFarmerOrders';
import { useOrders } from '@/hooks/useOrders';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface FarmerOrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string | null;
}

const FarmerOrderDetailsDialog: React.FC<FarmerOrderDetailsDialogProps> = ({
  open,
  onOpenChange,
  orderId
}) => {
  const { orders } = useFarmerOrders();
  const { getOrderStatusHistory } = useOrders();
  const [history, setHistory] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const order = orders.find(o => o.id === orderId);

  React.useEffect(() => {
    const loadHistory = async () => {
      if (!open || !orderId) return;
      setLoading(true);
      try {
        const h = await getOrderStatusHistory(orderId);
        setHistory(h);
      } catch (e) {
        console.error('Erreur chargement historique:', e);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [open, orderId]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'preparing': return 'En préparation';
      case 'ready': return 'Prête';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-indigo-100 text-indigo-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Détails de la commande #{order.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-lg">{order.total.toFixed(2)} €</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Statut</p>
              <Badge className={getStatusBadgeClass(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Livraison</p>
              <p className="font-medium capitalize">{order.delivery_method}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Paiement</p>
              <p className="font-medium capitalize">{order.payment_status}</p>
            </div>
          </div>

          {/* Items */}
          {order.order_items && order.order_items.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Produits commandés</h3>
              <div className="space-y-2">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × {(item.unit_price || 0).toFixed(2)} €
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {((item.unit_price || 0) * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Info */}
          {order.delivery_address && (
            <div>
              <h3 className="font-medium mb-2">Adresse de livraison</h3>
              <p className="text-sm bg-gray-50 p-3 rounded">{order.delivery_address}</p>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 className="font-medium mb-2">Notes</h3>
              <p className="text-sm bg-gray-50 p-3 rounded">{order.notes}</p>
            </div>
          )}

          <Separator />

          {/* Status History */}
          <div>
            <h3 className="font-medium mb-3">Historique des statuts</h3>
            {loading ? (
              <div className="text-sm text-gray-500">Chargement...</div>
            ) : history.length === 0 ? (
              <div className="text-sm text-gray-500">Aucun historique disponible.</div>
            ) : (
              <ol className="relative border-s border-gray-200 pl-4">
                {history.map((h) => (
                  <li key={h.id} className="mb-4 ms-4">
                    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary/20 ring-2 ring-white" />
                    <time className="mb-1 text-xs text-gray-500 block">
                      {formatDistanceToNow(new Date(h.created_at), { 
                        addSuffix: true, 
                        locale: fr 
                      })}
                    </time>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadgeClass(h.new_status)}>
                        {getStatusLabel(h.new_status)}
                      </Badge>
                      {h.notes && <span className="text-xs text-gray-500">— {h.notes}</span>}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FarmerOrderDetailsDialog;
