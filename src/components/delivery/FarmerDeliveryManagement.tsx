// @ts-nocheck
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Truck, Package, MapPin, Clock, Edit, Eye } from 'lucide-react';
import { useFarmerOrders } from '@/hooks/useFarmerOrders';
import { useDeliveryTracking } from '@/hooks/useDeliveryTracking';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const statusOptions = [
  { value: 'pending', label: 'En attente', color: 'bg-gray-100 text-gray-800' },
  { value: 'confirmed', label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
  { value: 'preparing', label: 'En préparation', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'shipped', label: 'Expédiée', color: 'bg-blue-100 text-blue-800' },
  { value: 'in_transit', label: 'En transit', color: 'bg-blue-100 text-blue-800' },
  { value: 'out_for_delivery', label: 'En cours de livraison', color: 'bg-green-100 text-green-800' },
  { value: 'delivered', label: 'Livrée', color: 'bg-green-100 text-green-800' },
  { value: 'failed', label: 'Échec', color: 'bg-red-100 text-red-800' },
  { value: 'cancelled', label: 'Annulée', color: 'bg-gray-100 text-gray-800' }
];

export function FarmerDeliveryManagement() {
  const { orders, loading } = useFarmerOrders();
  const { deliveries, updateDeliveryStatus, fetchDeliveryTracking } = useDeliveryTracking();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    tracking_number: '',
    estimated_delivery: '',
    location: '',
    delivery_person: '',
    notes: ''
  });

  const handleUpdateDelivery = async () => {
    if (!selectedOrder) return;

    try {
      await updateDeliveryStatus(selectedOrder, updateForm.status, {
        tracking_number: updateForm.tracking_number || undefined,
        estimated_delivery: updateForm.estimated_delivery || undefined,
        location: updateForm.location || undefined,
        delivery_person: updateForm.delivery_person || undefined,
        notes: updateForm.notes || undefined
      });

      toast({
        title: "Livraison mise à jour",
        description: "Les informations de livraison ont été mises à jour avec succès",
        variant: "success"
      });

      setSelectedOrder(null);
      setUpdateForm({
        status: '',
        tracking_number: '',
        estimated_delivery: '',
        location: '',
        delivery_person: '',
        notes: ''
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la livraison",
        variant: "destructive"
      });
    }
  };

  const openUpdateDialog = async (orderId: string) => {
    setSelectedOrder(orderId);
    
    // Charger les données de livraison existantes
    const delivery = await fetchDeliveryTracking(orderId);
    if (delivery) {
      setUpdateForm({
        status: delivery.status,
        tracking_number: delivery.tracking_number || '',
        estimated_delivery: delivery.estimated_delivery ? 
          format(new Date(delivery.estimated_delivery), 'yyyy-MM-dd') : '',
        location: delivery.location || '',
        delivery_person: delivery.delivery_person || '',
        notes: delivery.notes || ''
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return (
      <Badge className={statusOption?.color || 'bg-gray-100 text-gray-800'}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  const pendingOrders = orders.filter(order => 
    ['pending', 'confirmed', 'preparing'].includes(order.status)
  );
  
  const activeDeliveries = orders.filter(order => 
    ['shipped', 'in_transit', 'out_for_delivery'].includes(order.status)
  );
  
  const completedOrders = orders.filter(order => 
    ['delivered', 'failed', 'cancelled'].includes(order.status)
  );

  const renderOrderCard = (order: any) => (
    <Card key={order.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">Commande #{order.id.slice(0, 8)}</h3>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-sm text-gray-500 mb-1">
              {format(new Date(order.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
            </p>
            <p className="text-sm mb-2">
              Total: <span className="font-medium">{order.total.toLocaleString()} FCFA</span>
            </p>
            <p className="text-sm text-gray-600">
              {order.order_items?.length || 0} article(s)
            </p>
            {order.delivery_address && (
              <p className="text-xs text-gray-500 mt-1">
                <MapPin className="h-3 w-3 inline mr-1" />
                {order.delivery_address}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Détails de la commande</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Produits commandés:</h4>
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.product?.name} x{item.quantity}</span>
                        <span>{(item.unit_price * item.quantity).toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <div>
                      <h4 className="font-medium mb-1">Notes:</h4>
                      <p className="text-sm text-gray-600">{order.notes}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openUpdateDialog(order.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agrimarket-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Truck className="h-6 w-6 text-agrimarket-orange" />
        <h1 className="text-2xl font-bold">Gestion des livraisons</h1>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            En attente ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            En cours ({activeDeliveries.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Terminées ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Commandes en attente de traitement
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Aucune commande en attente
                </p>
              ) : (
                pendingOrders.map(renderOrderCard)
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Livraisons en cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeDeliveries.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Aucune livraison en cours
                </p>
              ) : (
                activeDeliveries.map(renderOrderCard)
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Livraisons terminées
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Aucune livraison terminée
                </p>
              ) : (
                completedOrders.map(renderOrderCard)
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de mise à jour */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mettre à jour la livraison</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={updateForm.status} onValueChange={(value) => 
                setUpdateForm(prev => ({ ...prev, status: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tracking_number">Numéro de suivi</Label>
              <Input
                value={updateForm.tracking_number}
                onChange={(e) => setUpdateForm(prev => ({ 
                  ...prev, tracking_number: e.target.value 
                }))}
                placeholder="Ex: TRK123456789"
              />
            </div>

            <div>
              <Label htmlFor="estimated_delivery">Date de livraison estimée</Label>
              <Input
                type="date"
                value={updateForm.estimated_delivery}
                onChange={(e) => setUpdateForm(prev => ({ 
                  ...prev, estimated_delivery: e.target.value 
                }))}
              />
            </div>

            <div>
              <Label htmlFor="location">Localisation</Label>
              <Input
                value={updateForm.location}
                onChange={(e) => setUpdateForm(prev => ({ 
                  ...prev, location: e.target.value 
                }))}
                placeholder="Ex: Centre de tri Abidjan"
              />
            </div>

            <div>
              <Label htmlFor="delivery_person">Livreur</Label>
              <Input
                value={updateForm.delivery_person}
                onChange={(e) => setUpdateForm(prev => ({ 
                  ...prev, delivery_person: e.target.value 
                }))}
                placeholder="Nom du livreur"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                value={updateForm.notes}
                onChange={(e) => setUpdateForm(prev => ({ 
                  ...prev, notes: e.target.value 
                }))}
                placeholder="Notes additionnelles..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Annuler
              </Button>
              <Button onClick={handleUpdateDelivery}>
                Mettre à jour
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
