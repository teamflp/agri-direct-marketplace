import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/contexts/AuthContext';
import { useDelivery } from '@/contexts/DeliveryContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { DeliveryMethodSelector } from '@/components/delivery/DeliveryMethodSelector';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const CheckoutForm = () => {
  const [searchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ street: '', city: '', postalCode: '', country: '' });
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { dynamicOptions, isLoadingRates, fetchShippingRates } = useDelivery();
  const { formatPrice, currency } = useCurrency();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        try {
          const { data, error } = await supabase.functions.invoke('check-payment-status', {
            body: { sessionId },
          });
          if (error) throw error;
          if (data.status === 'paid') {
            await clearCart();
            toast.success('Paiement réussi !');
            navigate('/buyer/orders');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du paiement:', error);
        }
      }
    };
    checkPaymentStatus();
  }, [searchParams]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCalculateShipping = async () => {
    const fullAddress = `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`;
    if (!address.street || !address.city || !address.postalCode || !address.country) {
      toast.error("Veuillez remplir tous les champs de l'adresse.");
      return;
    }

    try {
      const { data: geoData, error: geoError } = await supabase.functions.invoke('geocode-address', {
        body: { address: fullAddress },
      });
      if (geoError) throw new Error("Impossible de géocoder l'adresse.");

      const farmer_id = 'default-farmer';
      const total_weight_kg = cartItems.reduce((acc, item) => acc + 0.5 * item.quantity, 0);

      await fetchShippingRates({
        destination: { lat: geoData.lat, lng: geoData.lng },
        cart: { weight_kg: total_weight_kg },
        farmer_id,
      });

      toast.success("Options de livraison mises à jour.");
    } catch (error: any) {
      console.error("Erreur:", error);
      toast.error(error.message || "Une erreur est survenue.");
    }
  };

  const selectedShippingOption = useMemo(() => {
    return dynamicOptions.find(opt => opt.id === selectedDelivery);
  }, [selectedDelivery, dynamicOptions]);

  const finalTotalPrice = useMemo(() => {
    const itemsPrice = getTotalPrice();
    const shippingPrice = selectedShippingOption?.price || 0;
    return itemsPrice + shippingPrice;
  }, [getTotalPrice, selectedShippingOption]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }
    if (!selectedDelivery) {
      toast.error("Sélectionnez une méthode de livraison.");
      return;
    }

    setLoading(true);
    try {
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.product?.price || 0,
      }));

      const orderData = {
        total: finalTotalPrice,
        delivery_method: selectedDelivery,
        payment_method: paymentMethod,
        notes,
        items: orderItems,
      };

      const order = await createOrder(orderData);

      if (paymentMethod === 'card') {
        const stripeItems = cartItems.map(item => ({
          name: item.product?.name || '',
          description: item.product?.unit || '',
          unit_price: item.product?.price || 0,
          quantity: item.quantity,
          image_url: item.product?.image_url || '',
        }));

        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
          body: {
            amount: finalTotalPrice,
            currency: currency.code.toLowerCase(),
            orderId: order.id,
            items: stripeItems,
            metadata: { delivery_method: selectedDelivery },
          },
        });

        if (error) throw new Error(error.message);
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      } else {
        await clearCart();
        toast.success('Commande passée avec succès !');
        navigate('/buyer/orders');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Votre panier est vide</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Adresse de livraison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Rue</Label>
              <Input id="street" name="street" value={address.street} onChange={handleAddressChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Code Postal</Label>
                <Input id="postalCode" name="postalCode" value={address.postalCode} onChange={handleAddressChange} />
              </div>
              <div>
                <Label htmlFor="city">Ville</Label>
                <Input id="city" name="city" value={address.city} onChange={handleAddressChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Pays</Label>
              <Input id="country" name="country" value={address.country} onChange={handleAddressChange} />
            </div>
            <Button type="button" onClick={handleCalculateShipping} disabled={isLoadingRates} className="w-full">
              {isLoadingRates ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Calculer les frais
            </Button>
            <Separator />
            {isLoadingRates && <div className="text-center p-4">Chargement...</div>}
            {!isLoadingRates && dynamicOptions.length > 0 && (
              <DeliveryMethodSelector
                options={dynamicOptions}
                onSelect={setSelectedDelivery}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Paiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Carte bancaire</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Espèces</Label>
              </div>
            </RadioGroup>
            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.product?.name}</span>
                  <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                </div>
                <span>{formatPrice((item.product?.price || 0) * item.quantity)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span>{selectedShippingOption ? formatPrice(selectedShippingOption.price) : 'À calculer'}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(finalTotalPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg" disabled={loading || !selectedDelivery}>
        {loading ? 'Traitement...' : 'Procéder au paiement'}
      </Button>
    </form>
  );
};
