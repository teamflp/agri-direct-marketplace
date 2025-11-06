// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  MapPin,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useDeliveryTracking } from '@/hooks/useDeliveryTracking';

interface RealDeliveryTrackerProps {
  orderId: string;
  compact?: boolean;
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-5 w-5 text-gray-500" />,
  confirmed: <CheckCircle2 className="h-5 w-5 text-blue-500" />,
  preparing: <Warehouse className="h-5 w-5 text-yellow-500" />,
  shipped: <Package className="h-5 w-5 text-blue-500" />,
  in_transit: <Truck className="h-5 w-5 text-blue-700" />,
  out_for_delivery: <Truck className="h-5 w-5 text-green-500" />,
  delivered: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  failed: <AlertTriangle className="h-5 w-5 text-red-500" />,
  cancelled: <AlertTriangle className="h-5 w-5 text-gray-500" />
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped: 'Expédié',
  in_transit: 'En transit',
  out_for_delivery: 'En cours de livraison',
  delivered: 'Livré',
  failed: 'Échec de livraison',
  cancelled: 'Annulé'
};

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  in_transit: 'bg-blue-100 text-blue-800',
  out_for_delivery: 'bg-green-100 text-green-800',
  delivered: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

export function RealDeliveryTracker({ orderId, compact = false }: RealDeliveryTrackerProps) {
  const { deliveries, fetchDeliveryTracking, subscribeToDeliveryUpdates } = useDeliveryTracking();
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const delivery = deliveries[orderId];

  useEffect(() => {
    fetchDeliveryTracking(orderId);
    
    if (!isSubscribed) {
      const unsubscribe = subscribeToDeliveryUpdates(orderId);
      setIsSubscribed(true);
      
      return () => {
        unsubscribe();
        setIsSubscribed(false);
      };
    }
  }, [orderId, fetchDeliveryTracking, subscribeToDeliveryUpdates, isSubscribed]);

  if (!delivery) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Information de livraison non disponible</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderStatusBadge = (status: string) => (
    <Badge variant="outline" className={`flex items-center gap-1.5 ${statusColors[status]}`}>
      {statusIcons[status]}
      {statusLabels[status] || status}
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
            {delivery.tracking_number && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">N° de suivi:</span>
                <span className="font-medium">{delivery.tracking_number}</span>
              </div>
            )}
            
            {delivery.estimated_delivery && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Livraison estimée:</span>
                <span className="font-medium">
                  {format(new Date(delivery.estimated_delivery), 'dd MMMM yyyy', { locale: fr })}
                </span>
              </div>
            )}
            
            {delivery.location && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Localisation:</span>
                <span className="font-medium">{delivery.location}</span>
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
        {delivery.tracking_number && (
          <p className="text-sm text-gray-500">
            N° de suivi: {delivery.tracking_number}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {delivery.estimated_delivery && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date de livraison estimée</p>
                <p className="font-medium">
                  {format(new Date(delivery.estimated_delivery), 'EEEE dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
          )}
          
          {delivery.location && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Localisation actuelle</p>
                <p className="font-medium">{delivery.location}</p>
              </div>
            </div>
          )}

          {delivery.delivery_person && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Livreur</p>
                <p className="font-medium">{delivery.delivery_person}</p>
              </div>
            </div>
          )}
          
          {delivery.notes && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">{delivery.notes}</p>
            </div>
          )}

          <div className="text-xs text-gray-400">
            Dernière mise à jour: {format(new Date(delivery.updated_at), 'dd/MM/yyyy à HH:mm')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
