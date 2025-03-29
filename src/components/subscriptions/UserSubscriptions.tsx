
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookmarkX, BookmarkMinus, BookmarkCheck, BookmarkPlus } from 'lucide-react';
import { useSubscription, Subscription } from '@/contexts/SubscriptionContext';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type UserSubscriptionsProps = {
  showTitle?: boolean;
  limit?: number;
};

const UserSubscriptions = ({ showTitle = true, limit }: UserSubscriptionsProps) => {
  const { 
    getUserSubscriptions, 
    unsubscribe, 
    pauseSubscription, 
    resumeSubscription, 
    toggleAutoRenew 
  } = useSubscription();
  
  const [cancelSubscriptionId, setCancelSubscriptionId] = React.useState<number | null>(null);
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);
  
  const subscriptions = getUserSubscriptions();
  const activeSubscriptions = subscriptions.filter(sub => sub.status !== 'cancelled');
  const displaySubscriptions = limit ? activeSubscriptions.slice(0, limit) : activeSubscriptions;
  
  const handleCancelSubscription = () => {
    if (cancelSubscriptionId) {
      unsubscribe(cancelSubscriptionId);
      setCancelSubscriptionId(null);
      setShowCancelDialog(false);
    }
  };
  
  if (displaySubscriptions.length === 0) {
    return (
      <div className="text-center py-8">
        {showTitle && <h2 className="text-2xl font-bold mb-6">Mes abonnements</h2>}
        <div className="bg-gray-50 rounded-lg p-8">
          <BookmarkX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Vous n'avez aucun abonnement actif</p>
          <Button>Découvrir les paniers disponibles</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {showTitle && <h2 className="text-2xl font-bold mb-6">Mes abonnements</h2>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displaySubscriptions.map((subscription) => (
          <SubscriptionCard 
            key={subscription.id}
            subscription={subscription}
            onCancel={() => {
              setCancelSubscriptionId(subscription.id);
              setShowCancelDialog(true);
            }}
            onPause={() => pauseSubscription(subscription.id)}
            onResume={() => resumeSubscription(subscription.id)}
            onToggleAutoRenew={() => toggleAutoRenew(subscription.id)}
          />
        ))}
      </div>
      
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler l'abonnement</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir annuler votre abonnement ? 
              Cette action est définitive et vous ne serez plus débité.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

type SubscriptionCardProps = {
  subscription: Subscription;
  onCancel: () => void;
  onPause: () => void;
  onResume: () => void;
  onToggleAutoRenew: () => void;
};

const SubscriptionCard = ({ 
  subscription, 
  onCancel, 
  onPause, 
  onResume, 
  onToggleAutoRenew 
}: SubscriptionCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{subscription.plan}</CardTitle>
            <CardDescription>
              {subscription.farmerName}
            </CardDescription>
          </div>
          <Badge 
            variant={subscription.status === 'active' ? 'default' : subscription.status === 'paused' ? 'secondary' : 'destructive'}
            className={subscription.status === 'active' ? 'bg-agrimarket-green' : ''}
          >
            {subscription.status === 'active' ? 'Actif' : subscription.status === 'paused' ? 'En pause' : 'Annulé'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Prix</span>
            <span className="font-semibold">{subscription.price.toLocaleString()} FCFA</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Fréquence</span>
            <span>
              {subscription.frequency === 'weekly' ? 'Hebdomadaire' : 
               subscription.frequency === 'biweekly' ? 'Bimensuelle' : 'Mensuelle'}
            </span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Prochaine livraison</span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-gray-400" />
              {new Date(subscription.nextDelivery).toLocaleDateString('fr-FR')}
            </span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Renouvellement automatique</span>
            <Badge variant={subscription.isAutoRenew ? 'outline' : 'secondary'}>
              {subscription.isAutoRenew ? 'Activé' : 'Désactivé'}
            </Badge>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Contenu du panier</h4>
            <ul className="space-y-2">
              {subscription.items.map((item) => (
                <li key={item.id} className="flex items-center text-sm">
                  <span className="w-6 text-center">{item.quantity}×</span>
                  <span className="ml-2">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2">
        {subscription.status === 'active' ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              onClick={onPause}
            >
              <BookmarkMinus className="w-4 h-4 mr-1" />
              Mettre en pause
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              onClick={onToggleAutoRenew}
            >
              {subscription.isAutoRenew ? (
                <>
                  <BookmarkX className="w-4 h-4 mr-1" />
                  Désactiver renouvellement
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4 mr-1" />
                  Activer renouvellement
                </>
              )}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              className="flex items-center"
              onClick={onCancel}
            >
              <BookmarkX className="w-4 h-4 mr-1" />
              Annuler
            </Button>
          </>
        ) : subscription.status === 'paused' ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              onClick={onResume}
            >
              <BookmarkPlus className="w-4 h-4 mr-1" />
              Reprendre
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              className="flex items-center"
              onClick={onCancel}
            >
              <BookmarkX className="w-4 h-4 mr-1" />
              Annuler définitivement
            </Button>
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default UserSubscriptions;
