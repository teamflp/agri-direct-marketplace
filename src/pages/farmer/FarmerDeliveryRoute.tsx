import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { farmerMenuItems } from '@/components/layout/dashboardNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders, Order } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Map, List } from 'lucide-react';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const FarmerDeliveryRoute = () => {
  const { user } = useAuth();
  const { orders, loading, fetchFarmerOrders } = useOrders();
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [geocodedAddresses, setGeocodedAddresses] = useState<Record<string, { lat: number; lng: number }>>({});
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    fetchFarmerOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.delivery_date === selectedDate &&
      (order.status === 'preparing' || order.status === 'shipped' || order.status === 'confirmed')
    );
  }, [orders, selectedDate]);

  const groupedOrders = useMemo(() => {
    return filteredOrders.reduce((acc, order) => {
      const address = order.delivery_address || 'Adresse non spécifiée';
      if (!acc[address]) {
        acc[address] = [];
      }
      acc[address].push(order);
      return acc;
    }, {} as Record<string, Order[]>);
  }, [filteredOrders]);

  // Geocode addresses when filtered orders change
  useEffect(() => {
    const geocodeAll = async () => {
      for (const address of Object.keys(groupedOrders)) {
        if (!geocodedAddresses[address] && address !== 'Adresse non spécifiée') {
          try {
            const { data } = await supabase.functions.invoke('geocode-address', { body: { address } });
            if (data.lat && data.lng) {
              setGeocodedAddresses(prev => ({ ...prev, [address]: { lat: data.lat, lng: data.lng } }));
            }
          } catch (error) {
            console.error(`Could not geocode address: ${address}`, error);
          }
        }
      }
    };
    geocodeAll();
  }, [groupedOrders]);

  // Initialize map
  useEffect(() => {
    if (view !== 'map' || !mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-4.0237, 5.3600],
      zoom: 9,
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [view]);

  // Add markers to map
  useEffect(() => {
    if (view !== 'map' || !map.current) return;

    Object.entries(geocodedAddresses).forEach(([address, coords]) => {
        if (groupedOrders[address]) {
            new mapboxgl.Marker()
                .setLngLat([coords.lng, coords.lat])
                .setPopup(new mapboxgl.Popup().setText(`${address} - ${groupedOrders[address].length} commande(s)`))
                .addTo(map.current!);
        }
    });
  }, [view, geocodedAddresses, groupedOrders]);


  return (
    <DashboardLayout menuItems={farmerMenuItems}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tournée de Livraison</h1>
        <div className="flex items-center gap-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
          <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}><List className="mr-2 h-4 w-4"/>Vue Liste</Button>
          <Button variant={view === 'map' ? 'default' : 'outline'} onClick={() => setView('map')}><Map className="mr-2 h-4 w-4"/>Vue Carte</Button>
        </div>
      </div>

      {loading && <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}

      {!loading && view === 'list' && (
        <div className="space-y-6">
          {Object.keys(groupedOrders).length === 0 ? (
            <p>Aucune livraison prévue pour cette date.</p>
          ) : (
            Object.entries(groupedOrders).map(([address, ordersInGroup]) => (
              <Card key={address}>
                <CardHeader>
                  <CardTitle>{address}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {ordersInGroup.map(order => (
                      <li key={order.id} className="border-b py-2">
                        Commande #{order.id.slice(0, 8)} - {order.order_items?.reduce((acc, item) => acc + item.quantity, 0)} article(s)
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {!loading && view === 'map' && (
          <div ref={mapContainer} style={{ height: '600px', width: '100%' }} />
      )}

    </DashboardLayout>
  );
};

export default FarmerDeliveryRoute;
