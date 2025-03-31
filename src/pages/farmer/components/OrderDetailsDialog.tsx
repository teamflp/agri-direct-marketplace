
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Truck, PackageOpen, Calendar, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InvoiceDownloader from './InvoiceDownloader';

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: string;
    customer: string;
    date: string;
    total: number;
    items: number;
    status: string;
  } | null;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({ open, onOpenChange, order }) => {
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);

  // Initialise l'état du statut lorsque l'ordre change
  React.useEffect(() => {
    if (order) {
      setCurrentStatus(order.status);
    }
  }, [order]);

  if (!order) return null;

  const handleUpdateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus);
    toast({
      title: "Statut mis à jour",
      description: `La commande ${order.id} est maintenant "${newStatus}"`,
      variant: "success"
    });
  };

  // Générer un invoice number basé sur l'ID de commande
  const invoiceNumber = `INV-${order.id.replace('CMD-', '')}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails de la commande {order.id}</DialogTitle>
          <DialogDescription>
            Commande passée le {order.date} par {order.customer}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Statut actuel:</span>
            <Badge variant="outline" className={`px-3 py-1 ${
              currentStatus === "Livrée" 
                ? "bg-green-100 text-green-800" 
                : currentStatus === "Confirmée"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {currentStatus === "Livrée" && <Check className="w-3 h-3 mr-1" />}
              {currentStatus}
            </Badge>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Résumé de la commande</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>Nombre d'articles:</div>
              <div className="font-medium text-right">{order.items}</div>
              <div>Montant total:</div>
              <div className="font-medium text-right">{order.total.toFixed(2)} €</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Détails du client</h3>
            <p>{order.customer}</p>
            <p className="text-sm text-gray-500">ID Client: CL-{Math.floor(Math.random() * 1000)}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Actions disponibles</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentStatus !== "Livrée" && currentStatus !== "Annulée" && (
                <>
                  {currentStatus === "En attente" && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => handleUpdateStatus("Confirmée")}
                    >
                      <Check className="h-4 w-4" />
                      Confirmer la commande
                    </Button>
                  )}
                  
                  {currentStatus === "Confirmée" && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => handleUpdateStatus("En préparation")}
                    >
                      <PackageOpen className="h-4 w-4" />
                      Commencer la préparation
                    </Button>
                  )}
                  
                  {currentStatus === "En préparation" && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                      onClick={() => handleUpdateStatus("En livraison")}
                    >
                      <Truck className="h-4 w-4" />
                      Marquer comme en livraison
                    </Button>
                  )}
                  
                  {currentStatus === "En livraison" && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1 bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      onClick={() => handleUpdateStatus("Livrée")}
                    >
                      <Check className="h-4 w-4" />
                      Marquer comme livrée
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1 bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    onClick={() => handleUpdateStatus("Annulée")}
                  >
                    <X className="h-4 w-4" />
                    Annuler la commande
                  </Button>
                </>
              )}

              <InvoiceDownloader invoiceId={order.id} invoiceNumber={invoiceNumber} />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
