
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useOrders, OrderStatusHistory } from '@/hooks/useOrders';
import { CheckCircle, Package, Truck } from 'lucide-react';

// Helpers for display
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'En attente';
    case 'confirmed': return 'Confirmée';
    case 'preparing': return 'En préparation';
    case 'ready': return 'Prête';
    case 'shipped': return 'Expédiée';
    case 'delivered': return 'Livrée';
    case 'cancelled': return 'Annulée';
    case 'refunded': return 'Remboursée';
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
    case 'refunded': return 'bg-rose-100 text-rose-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getIcon = (status: string) => {
  switch (status) {
    case 'shipped': return <Truck className="h-4 w-4" />;
    case 'delivered': return <CheckCircle className="h-4 w-4" />;
    default: return <Package className="h-4 w-4" />;
  }
};

interface BuyerOrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string | null;
  orderNumber?: string;
  currentStatus?: string;
}

const BuyerOrderDetailsDialog: React.FC<BuyerOrderDetailsDialogProps> = ({
  open,
  onOpenChange,
  orderId,
  orderNumber,
  currentStatus
}) => {
  const { getOrderStatusHistory, getOrderById } = useOrders();
  const [history, setHistory] = React.useState<OrderStatusHistory[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [orderMeta, setOrderMeta] = React.useState<{ total?: number; delivery_method?: string } | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!open || !orderId) return;
      setLoading(true);
      try {
        const [h, o] = await Promise.all([
          getOrderStatusHistory(orderId),
          getOrderById(orderId)
        ]);
        if (!mounted) return;
        setHistory(h);
        setOrderMeta(o ? { total: (o as any).total, delivery_method: (o as any).delivery_method } : null);
      } catch (e) {
        console.error('Erreur chargement historique:', e);
        setHistory([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [open, orderId]);

  const effectiveStatus = currentStatus || (history.length ? history[history.length - 1].new_status : undefined);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>
            Détails de la commande {orderNumber ? `#${orderNumber}` : ''}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Statut actuel
            </div>
            <Badge className={getStatusBadgeClass(effectiveStatus || 'pending')}>
              <div className="flex items-center gap-1">
                {getIcon(effectiveStatus || 'pending')}
                {getStatusLabel(effectiveStatus || 'pending')}
              </div>
            </Badge>
          </div>

          {orderMeta && (
            <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-md p-3">
              <div>
                <div className="text-gray-600">Total</div>
                <div className="font-medium">
                  {typeof orderMeta.total === 'number' ? orderMeta.total.toFixed(2) : orderMeta.total} €
                </div>
              </div>
              <div>
                <div className="text-gray-600">Livraison</div>
                <div className="font-medium capitalize">{orderMeta.delivery_method}</div>
              </div>
            </div>
          )}

          <Separator />

          {/* Timeline */}
          <div className="space-y-3">
            <div className="font-medium">Historique des statuts</div>
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
                      {new Date(h.created_at).toLocaleString('fr-FR')}
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

export default BuyerOrderDetailsDialog;
