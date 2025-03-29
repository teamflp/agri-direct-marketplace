
import React from 'react';
import { useDelivery, DeliveryStatus, DeliveryUpdate } from '@/contexts/DeliveryContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Truck, 
  Warehouse, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  MapPin 
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DeliveryTrackerProps {
  orderId: string;
  compact?: boolean;
}

const statusIcons: Record<DeliveryStatus, React.ReactNode> = {
  pending: <Clock className="h-5 w-5 text-gray-500" />,
  preparing: <Warehouse className="h-5 w-5 text-yellow-500" />,
  shipped: <Package className="h-5 w-5 text-blue-500" />,
  in_transit: <Truck className="h-5 w-5 text-blue-700" />,
  out_for_delivery: <Truck className="h-5 w-5 text-green-500" />,
  delivered: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  failed: <AlertTriangle className="h-5 w-5 text-red-500" />,
  cancelled: <AlertTriangle className="h-5 w-5 text-gray-500" />
};

const statusLabels: Record<DeliveryStatus, string> = {
  pending: 'En attente',
  preparing: 'En préparation',
  shipped: 'Expédié',
  in_transit: 'En transit',
  out_for_delivery: 'En cours de livraison',
  delivered: 'Livré',
  failed: 'Échec de livraison',
  cancelled: 'Annulé'
};

const statusColors: Record<DeliveryStatus, string> = {
  pending: 'bg-gray-100 text-gray-800',
  preparing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  in_transit: 'bg-blue-100 text-blue-800',
  out_for_delivery: 'bg-green-100 text-green-800',
  delivered: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

export function DeliveryTracker({ orderId, compact = false }: DeliveryTrackerProps) {
  const { getDeliveryByOrderId, getDeliveryUpdates } = useDelivery();
  
  const delivery = getDeliveryByOrderId(orderId);
  const updates = getDeliveryUpdates(orderId);
  
  if (!delivery) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            Information de livraison non disponible
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderStatusBadge = (status: DeliveryStatus) => (
    <Badge variant="outline" className={`flex items-center gap-1.5 ${statusColors[status]}`}>
      {statusIcons[status]}
      {statusLabels[status]}
    </Badge>
  );

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between">
            <span>Suivi de livraison</span>
            {renderStatusBadge(delivery.status)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Méthode:</span>
              <span className="font-medium">
                {delivery.method === 'standard' ? 'Standard' : 
                 delivery.method === 'express' ? 'Express' : 'Retrait'}
              </span>
            </div>
            
            {delivery.trackingNumber && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">N° de suivi:</span>
                <span className="font-medium">{delivery.trackingNumber}</span>
              </div>
            )}
            
            {delivery.estimatedDeliveryDate && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Livraison estimée:</span>
                <span className="font-medium">
                  {format(delivery.estimatedDeliveryDate, 'dd MMMM yyyy', { locale: fr })}
                </span>
              </div>
            )}
            
            {delivery.scheduledSlot && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Créneau:</span>
                <span className="font-medium">
                  {format(delivery.scheduledSlot.date, 'dd MMMM', { locale: fr })} {delivery.scheduledSlot.timeWindow}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Suivi de livraison</span>
          {renderStatusBadge(delivery.status)}
        </CardTitle>
        <CardDescription>
          {delivery.carrier && `Transporteur: ${delivery.carrier}`}
          {delivery.trackingNumber && ` • N° de suivi: ${delivery.trackingNumber}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {delivery.method !== 'pickup' && delivery.estimatedDeliveryDate && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date de livraison estimée</p>
                <p className="font-medium">
                  {format(delivery.estimatedDeliveryDate, 'EEEE dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
          )}
          
          {delivery.scheduledSlot && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Créneau de livraison programmé</p>
                <p className="font-medium">
                  {format(delivery.scheduledSlot.date, 'EEEE dd MMMM', { locale: fr })}, {delivery.scheduledSlot.timeWindow}
                </p>
              </div>
            </div>
          )}
          
          <div className="border-l-2 border-gray-200 pl-5 ml-2 space-y-6">
            {updates.map((update, index) => (
              <div key={update.id} className="relative">
                <div className="absolute -left-[29px] p-1 bg-white rounded-full border-2 border-gray-200">
                  {statusIcons[update.status]}
                </div>
                <div>
                  <p className="font-medium">{update.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <p>{format(update.date, 'dd MMM yyyy à HH:mm', { locale: fr })}</p>
                    {update.location && (
                      <>
                        <div className="mx-2 w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {update.location}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      {delivery.status !== 'delivered' && delivery.status !== 'cancelled' && (
        <CardFooter>
          <Button variant="outline" className="w-full">
            Plus de détails
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
