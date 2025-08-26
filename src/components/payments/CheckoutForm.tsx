
import React, { useState } from 'react';
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
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const CheckoutForm = () => {
  const [searchParams] = useSearchParams();
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { createOrder, updatePaymentStatus } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle success/cancel from Stripe with improved status checking
  React.useEffect(() => {
    const status = searchParams.get('status');
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');

    const checkPaymentStatus = async () => {
      if (sessionId || orderId) {
        try {
          const { data, error } = await supabase.functions.invoke('check-payment-status', {
            body: { sessionId, orderId }
          });

          if (error) throw error;

          if (data.paymentStatus === 'paid') {
            await clearCart();
            toast.success('Paiement réussi ! Votre commande a été confirmée.');
            navigate('/buyer/orders');
          } else if (data.paymentStatus === 'unpaid' || data.paymentStatus === 'failed') {
            toast.error('Le paiement n\'a pas pu être finalisé. Veuillez réessayer.');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du paiement:', error);
          toast.error('Erreur lors de la vérification du paiement');
        }
      }
    };

    if (status === 'success') {
      checkPaymentStatus();
    } else if (status === 'canceled') {
      toast.error('Paiement annulé');
    }
  }, [searchParams, clearCart, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté pour passer commande');
      return;
    }

    setLoading(true);
    try {
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.product?.price || 0
      }));

      const orderData = {
        total: getTotalPrice(),
        delivery_method: deliveryMethod,
        delivery_date: deliveryDate,
        payment_method: paymentMethod,
        notes,
        items: orderItems
      };

      const order = await createOrder(orderData);
      
      if (paymentMethod === 'card') {
        // Create Stripe checkout session with improved data
        const stripeItems = cartItems.map(item => ({
          name: item.product?.name || 'Produit',
          description: `${item.quantity} ${item.product?.unit || 'unité(s)'} - ${item.product?.farmer?.name || 'AgriMarket'}`,
          unit_price: item.product?.price || 0,
          quantity: item.quantity,
          image_url: item.product?.image_url
        }));

        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
          body: {
            amount: getTotalPrice(),
            currency: 'eur',
            orderId: order.id,
            items: stripeItems,
            metadata: {
              delivery_method: deliveryMethod,
              delivery_date: deliveryDate
            }
          }
        });

        if (error) {
          console.error('Stripe error:', error);
          throw new Error(error.message || 'Erreur lors de la création de la session de paiement');
        }

        if (data?.url) {
          // Open Stripe checkout in the same tab
          window.location.href = data.url;
          return;
        } else {
          throw new Error('URL de paiement non reçue');
        }
      } else {
        // For cash/transfer payments, clear cart and redirect
        await clearCart();
        toast.success('Commande passée avec succès !');
        navigate('/buyer/orders');
      }
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
          <p className="text-muted-foreground mb-6">Ajoutez des produits pour continuer</p>
          <Button onClick={() => navigate('/products')}>
            Voir les produits
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations de livraison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Livraison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Mode de livraison</Label>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Livraison à domicile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Retrait à la ferme</Label>
                </div>
              </RadioGroup>
            </div>

            {deliveryMethod === 'delivery' && (
              <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                <p>
                  Votre adresse de livraison complète sera demandée lors de l'étape de paiement sécurisé.
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="date">Date de livraison souhaitée</Label>
              <Input 
                id="date"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes pour le livreur</Label>
              <Textarea 
                id="notes"
                placeholder="Instructions spéciales, code d'accès, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Paiement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Paiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Mode de paiement</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Carte bancaire (Stripe)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Espèces à la livraison</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">Virement bancaire</Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Vous serez redirigé vers Stripe pour effectuer le paiement sécurisé.
                </p>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Le paiement sera effectué en espèces lors de la livraison.
                </p>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Vous recevrez les informations bancaires par email après la commande.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Récapitulatif */}
      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif de la commande</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.product?.name}</span>
                  <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                </div>
                <span>{((item.product?.price || 0) * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total (hors taxes)</span>
              <span>{getTotalPrice().toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Taxes et frais de livraison</span>
              <span>Calculés à l'étape suivante</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={loading}
      >
        {loading ? 'Traitement...' : 
         paymentMethod === 'card' ? 'Procéder au paiement' : 'Confirmer la commande'}
      </Button>
    </form>
  );
};
