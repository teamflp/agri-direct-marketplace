
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Calendar, BookmarkCheck } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: {
    weekly: number;
    biweekly: number;
    monthly: number;
  };
  features: string[];
  popular: boolean;
  image?: string;
  products: {
    id: number;
    name: string;
    quantity: number;
    image?: string;
  }[];
  farmerId: number;
  farmerName: string;
  farmerAvatar?: string;
  type?: string;
};

type SubscriptionPlansProps = {
  plans: Plan[];
  defaultFarmerId?: number;
  defaultFarmerName?: string;
  defaultFarmerAvatar?: string;
  defaultFrequency?: 'weekly' | 'biweekly' | 'monthly';
  isFarmerPlan?: boolean;
};

const SubscriptionPlans = ({ 
  plans,
  defaultFarmerId,
  defaultFarmerName,
  defaultFarmerAvatar,
  defaultFrequency = 'weekly',
  isFarmerPlan = false
}: SubscriptionPlansProps) => {
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>(defaultFrequency);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  const { subscribe } = useSubscription();
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    
    // Pour les plans Agriculteur avec prix 0, afficher message et fermer le dialogue
    if (isFarmerPlan && selectedPlan.price[frequency] === 0) {
      setShowDialog(false);
      toast({
        title: "Plan gratuit",
        description: "Vous pouvez vous inscrire gratuitement comme agriculteur sans paiement. Vous serez limité à 5 produits.",
      });
      return;
    }
    
    // Get today's date and calculate next delivery date
    const today = new Date();
    let nextDelivery = new Date(today);
    
    if (frequency === 'weekly') {
      nextDelivery.setDate(today.getDate() + 7);
    } else if (frequency === 'biweekly') {
      nextDelivery.setDate(today.getDate() + 14);
    } else {
      nextDelivery.setMonth(today.getMonth() + 1);
    }
    
    // Format dates as strings
    const startDateStr = today.toISOString().split('T')[0];
    const nextDeliveryStr = nextDelivery.toISOString().split('T')[0];
    
    // Create subscription object
    const subscription = {
      farmerId: selectedPlan.farmerId,
      farmerName: selectedPlan.farmerName,
      farmerAvatar: selectedPlan.farmerAvatar,
      userId: 1, // This would be the current user's ID in a real app
      plan: selectedPlan.name,
      frequency: frequency,
      price: selectedPlan.price[frequency],
      startDate: startDateStr,
      nextDelivery: nextDeliveryStr,
      items: selectedPlan.products,
      status: 'active' as const,
      isAutoRenew: true
    };
    
    // Call the subscribe function
    subscribe(subscription);
    setShowDialog(false);
    
    toast({
      title: "Abonnement souscrit",
      description: isFarmerPlan 
        ? `Votre abonnement ${selectedPlan.name} est maintenant actif.` 
        : `Votre panier ${selectedPlan.name} sera livré le ${nextDeliveryStr.split('-').reverse().join('/')}`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={defaultFrequency} onValueChange={(value) => setFrequency(value as any)}>
        <div className="flex justify-center mb-8">
          <TabsList>
            {!isFarmerPlan && (
              <>
                <TabsTrigger value="weekly">Hebdomadaire</TabsTrigger>
                <TabsTrigger value="biweekly">Bimensuel</TabsTrigger>
              </>
            )}
            <TabsTrigger value="monthly">Mensuel</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="weekly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                frequency="weekly" 
                onSubscribe={() => {
                  setSelectedPlan(plan);
                  setShowDialog(true);
                }}
                isFarmerPlan={isFarmerPlan}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="biweekly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                frequency="biweekly" 
                onSubscribe={() => {
                  setSelectedPlan(plan);
                  setShowDialog(true);
                }}
                isFarmerPlan={isFarmerPlan}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                frequency="monthly" 
                onSubscribe={() => {
                  setSelectedPlan(plan);
                  setShowDialog(true);
                }}
                isFarmerPlan={isFarmerPlan}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer votre abonnement</DialogTitle>
            <DialogDescription>
              {isFarmerPlan 
                ? `Vous êtes sur le point de souscrire à la formule ${selectedPlan?.name} pour agriculteurs.`
                : `Vous êtes sur le point de vous abonner au panier ${selectedPlan?.name} avec une livraison ${frequency === 'weekly' ? 'hebdomadaire' : frequency === 'biweekly' ? 'bimensuelle' : 'mensuelle'}.`
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlan && (
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Formule</span>
                <span>{selectedPlan.name}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Fréquence</span>
                <span>{frequency === 'weekly' ? 'Hebdomadaire' : frequency === 'biweekly' ? 'Bimensuelle' : 'Mensuelle'}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Prix</span>
                <span className="font-semibold">{selectedPlan.price[frequency].toLocaleString()} FCFA</span>
              </div>
              
              {!isFarmerPlan && selectedPlan.products.length > 0 && (
                <div className="py-2">
                  <Label htmlFor="products">Contenu du panier</Label>
                  <ul className="mt-2 space-y-1 text-sm">
                    {selectedPlan.products.map((product) => (
                      <li key={product.id} className="flex items-center">
                        <Check className="w-4 h-4 text-agrimarket-green mr-2" />
                        {product.quantity} × {product.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex space-x-2 sm:justify-center">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Annuler
            </Button>
            <Button className="bg-agrimarket-green hover:bg-green-700" onClick={handleSubscribe}>
              Confirmer l'abonnement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

type PlanCardProps = {
  plan: Plan;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  onSubscribe: () => void;
  isFarmerPlan?: boolean;
};

const PlanCard = ({ plan, frequency, onSubscribe, isFarmerPlan = false }: PlanCardProps) => {
  const frequencyText = isFarmerPlan ? 'mois' : (frequency === 'weekly' ? 'semaine' : frequency === 'biweekly' ? '2 semaines' : 'mois');

  return (
    <Card 
      className={`relative overflow-hidden ${
        plan.popular ? 'border-agrimarket-orange shadow-lg' : 'border-gray-200'
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-agrimarket-orange text-white text-center py-2 font-medium text-sm">
          Recommandé
        </div>
      )}
      
      <CardHeader className={plan.popular ? 'pt-12' : ''}>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4 flex items-center">
          <span className="text-3xl font-bold">{plan.price[frequency].toLocaleString()}</span>
          <span className="text-gray-500 ml-1">FCFA/{frequencyText}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          {plan.image && (
            <img 
              src={plan.image} 
              alt={plan.name} 
              className="w-full h-36 object-cover rounded-md mb-4" 
            />
          )}
        </div>
        {!isFarmerPlan && (
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-agrimarket-green mr-2" />
            <span>Livraison {frequency === 'weekly' ? 'hebdomadaire' : frequency === 'biweekly' ? 'bimensuelle' : 'mensuelle'}</span>
          </div>
        )}
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="w-5 h-5 text-agrimarket-green mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${
            plan.popular 
              ? 'bg-agrimarket-orange hover:bg-orange-600 text-white' 
              : ''
          }`}
          variant={plan.popular ? 'default' : 'outline'}
          onClick={onSubscribe}
        >
          <BookmarkCheck className="w-5 h-5 mr-2" />
          {plan.price[frequency] === 0 ? "Commencer gratuitement" : "S'abonner"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlans;
