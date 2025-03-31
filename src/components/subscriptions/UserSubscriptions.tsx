
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Package, AlertCircle, CheckCircle, PauseCircle } from 'lucide-react';
import { Subscription, useSubscription } from '@/contexts/SubscriptionContext';
import { useToast } from '@/hooks/use-toast';

// Helper function to format dates properly
const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString();
  }
  return date.toLocaleDateString();
};

const UserSubscriptions = () => {
  const { getUserSubscriptions, pauseSubscription, resumeSubscription, unsubscribe, toggleAutoRenew } = useSubscription();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Get user subscriptions and convert any date strings to Date objects
    const userSubs = getUserSubscriptions();
    
    // Handle subscriptions with type compatibility
    setSubscriptions(userSubs.map(sub => ({
      ...sub,
      startDate: sub.startDate instanceof Date ? sub.startDate : new Date(sub.startDate)
    })));
  }, [getUserSubscriptions]);
  
  // Handle subscription actions
  const handlePauseSubscription = (id: string | number) => {
    pauseSubscription(id);
    toast({
      title: "Abonnement mis en pause",
      description: "Votre abonnement a été mis en pause avec succès."
    });
    
    // Update local state
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'paused' as const } : sub
      )
    );
  };
  
  const handleResumeSubscription = (id: string | number) => {
    resumeSubscription(id);
    toast({
      title: "Abonnement réactivé",
      description: "Votre abonnement a été réactivé avec succès."
    });
    
    // Update local state
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'active' as const } : sub
      )
    );
  };
  
  const handleCancelSubscription = (id: string | number) => {
    unsubscribe(id);
    toast({
      title: "Abonnement annulé",
      description: "Votre abonnement a été annulé avec succès."
    });
    
    // Update local state
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'cancelled' as const, endDate: new Date() } : sub
      )
    );
  };
  
  const handleToggleAutoRenew = (id: string | number) => {
    toggleAutoRenew(id);
    
    // Update local state
    const subscription = subscriptions.find(sub => sub.id === id);
    const isAutoRenew = subscription?.isAutoRenew;
    
    toast({
      title: isAutoRenew ? "Renouvellement automatique désactivé" : "Renouvellement automatique activé",
      description: isAutoRenew
        ? "Votre abonnement ne sera pas renouvelé automatiquement."
        : "Votre abonnement sera renouvelé automatiquement à la fin de la période."
    });
    
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, isAutoRenew: !sub.isAutoRenew } : sub
      )
    );
  };
  
  if (subscriptions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-gray-100 p-3 mb-4">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Aucun abonnement actif</h3>
          <p className="text-gray-500 mb-4">
            Vous n'avez pas encore d'abonnement actif. Découvrez nos formules d'abonnement pour recevoir des produits frais régulièrement.
          </p>
          <Button className="bg-agrimarket-green hover:bg-agrimarket-darkGreen">
            Découvrir les abonnements
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Actif
          </Badge>
        );
      case 'paused':
        return (
          <Badge className="bg-amber-500">
            <PauseCircle className="h-3 w-3 mr-1" />
            En pause
          </Badge>
        );
      case 'cancelled':
      case 'expired':
        return (
          <Badge className="bg-gray-500">
            <AlertCircle className="h-3 w-3 mr-1" />
            {status === 'cancelled' ? 'Annulé' : 'Expiré'}
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {subscriptions.map((subscription) => (
        <Card key={subscription.id} className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{subscription.plan || subscription.planName}</CardTitle>
                <CardDescription>
                  {subscription.farmerName}
                </CardDescription>
              </div>
              <div>
                {getStatusBadge(subscription.status)}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Date de début
                  </div>
                  <span className="font-medium">{formatDate(subscription.startDate)}</span>
                </div>
                {subscription.endDate && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Date de fin
                    </div>
                    <span className="font-medium">{formatDate(subscription.endDate)}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Fréquence
                  </div>
                  <span className="font-medium">
                    {subscription.frequency === 'weekly' && 'Hebdomadaire'}
                    {subscription.frequency === 'biweekly' && 'Bimensuelle'}
                    {subscription.frequency === 'monthly' && 'Mensuelle'}
                  </span>
                </div>
                {subscription.nextDelivery && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="h-4 w-4 mr-1" />
                      Prochaine livraison
                    </div>
                    <span className="font-medium">
                      {typeof subscription.nextDelivery === 'string' 
                        ? formatDate(subscription.nextDelivery)
                        : formatDate(subscription.nextDelivery)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Contenu du panier</h4>
              <ul className="space-y-2">
                {subscription.items && subscription.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-gray-500">x{item.quantity}</span>
                  </li>
                ))}
                {!subscription.items && (
                  <li className="text-gray-500 italic">Contenu variable selon la saison</li>
                )}
              </ul>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <div className="flex justify-between items-center font-medium">
                <span>Montant</span>
                <span className="text-lg text-agrimarket-orange">
                  {(subscription.price / 100).toFixed(2)} €
                  <span className="text-sm text-gray-500 font-normal">
                    {subscription.frequency === 'weekly' && '/semaine'}
                    {subscription.frequency === 'biweekly' && '/2 semaines'}
                    {subscription.frequency === 'monthly' && '/mois'}
                  </span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Renouvellement automatique</span>
              <Badge 
                className={subscription.isAutoRenew ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                variant="outline"
              >
                {subscription.isAutoRenew ? "Activé" : "Désactivé"}
              </Badge>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-wrap gap-2">
            {subscription.status === 'active' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => handlePauseSubscription(subscription.id)}
                  className="text-amber-600 border-amber-600 hover:bg-amber-50"
                >
                  Mettre en pause
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleToggleAutoRenew(subscription.id)}
                >
                  {subscription.isAutoRenew ? "Désactiver" : "Activer"} le renouvellement
                </Button>
              </>
            )}
            
            {subscription.status === 'paused' && (
              <Button 
                variant="outline" 
                onClick={() => handleResumeSubscription(subscription.id)}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                Reprendre l'abonnement
              </Button>
            )}
            
            {subscription.status !== 'cancelled' && subscription.status !== 'expired' && (
              <Button 
                variant="outline" 
                onClick={() => handleCancelSubscription(subscription.id)}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Annuler l'abonnement
              </Button>
            )}
            
            <Button className="ml-auto bg-agrimarket-green hover:bg-agrimarket-darkGreen">
              Modifier le panier
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default UserSubscriptions;
