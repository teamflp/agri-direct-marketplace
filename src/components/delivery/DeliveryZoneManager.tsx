import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Set the Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const DeliveryZoneManager: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const { user } = useAuth();

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<{ id: string; fee: number; name: string } | null>(null);

  // Initialize map and draw controls
  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-4.0237, 5.3600], // Abidjan coordinates
      zoom: 9,
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: 'draw_polygon',
    });

    map.current.addControl(draw.current);

    // Event listeners for draw actions
    map.current.on('draw.create', updateZones);
    map.current.on('draw.delete', updateZones);
    map.current.on('draw.update', updateZones);
    map.current.on('draw.selectionchange', handleSelectionChange);

    // Fetch initial zones
    fetchZones();

    return () => {
      map.current?.remove();
    };
  }, []);

  const fetchZones = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('delivery_zones')
      .select('id, name, base_fee, zone_polygon')
      .eq('profile_id', user.id);

    if (error) {
      toast.error("Erreur lors du chargement des zones.");
      console.error(error);
      return;
    }

    if (data && draw.current) {
        const features = data.map(zone => ({
            id: zone.id,
            type: 'Feature',
            properties: {
                name: zone.name,
                base_fee: zone.base_fee,
            },
            geometry: zone.zone_polygon,
        }));
      draw.current.set({ type: 'FeatureCollection', features });
    }
  };

  const updateZones = (e: any) => {
    // This function will handle saving the drawn features to the database
    console.log('Zone action:', e.type, e.features);
    // Logic to save to DB will be added here
  };

  const handleSelectionChange = (e: any) => {
      if (e.features.length > 0) {
          const feature = e.features[0];
          setSelectedZone({
              id: feature.id,
              name: feature.properties.name || '',
              fee: feature.properties.base_fee || 0,
          });
      } else {
          setSelectedZone(null);
      }
  };

  const handleSaveSelectedZone = async () => {
    if (!selectedZone || !draw.current || !user) return;

    const feature = draw.current.get(selectedZone.id);
    if (!feature) return;

    const { error } = await supabase.from('delivery_zones').upsert({
      id: selectedZone.id, // specify id for upsert
      profile_id: user.id,
      name: selectedZone.name,
      base_fee: selectedZone.fee,
      zone_polygon: feature.geometry,
    });

    if (error) {
      toast.error("Erreur lors de la sauvegarde de la zone.");
      console.error(error);
    } else {
      toast.success("Zone de livraison sauvegardée !");
      fetchZones(); // Refresh zones from DB
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Zones de Livraison</CardTitle>
        <CardDescription>
          Dessinez vos zones de livraison sur la carte. Sélectionnez une zone pour modifier son nom et son tarif.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div ref={mapContainer} className="md:col-span-2" style={{ height: '500px' }} />
        <div>
          <h3 className="font-semibold mb-4">Détails de la Zone</h3>
          {selectedZone ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="zoneName">Nom de la zone</Label>
                <Input
                  id="zoneName"
                  value={selectedZone.name}
                  onChange={(e) => setSelectedZone({ ...selectedZone, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="zoneFee">Frais de livraison (€)</Label>
                <Input
                  id="zoneFee"
                  type="number"
                  value={selectedZone.fee}
                  onChange={(e) => setSelectedZone({ ...selectedZone, fee: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <Button onClick={handleSaveSelectedZone} className="w-full">
                Sauvegarder la zone sélectionnée
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Dessinez une zone ou sélectionnez-en une sur la carte pour la modifier.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryZoneManager;
