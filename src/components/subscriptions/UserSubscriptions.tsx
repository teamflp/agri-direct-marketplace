
import React, { useState, useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Pause, Play, RotateCcw, Clock, Package, Calendar, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Définition des types pour l'état local
interface Subscription {
  id: number;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  price: number;
  planName: string;
  farmerName: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  nextDelivery: string;
  isAutoRenew: boolean;
  items: { name: string; quantity: number }[];
}

const UserSubscriptions = () => {
  // État pour les données des abonnements
  const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[]>([]);
  const [pastSubscriptions, setPastSubscriptions] = useState<Subscription[]>([]);
  const [selectedTab, setSelectedTab] = useState('active');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<number>(0);
  
  const { 
    getUserSubscriptions,
    unsubscribe, 
    pauseSubscription, 
    resumeSubscription, 
    toggleAutoRenew 
  } = useSubscription();
  
  const { toast } = useToast();

  // Charger les abonnements au montage du composant
  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        // Appel à l'API pour récupérer les abonnements
        const subscriptions = await getUserSubscriptions();
        
        // Filtrer les abonnements actifs et passés
        const active = subscriptions.filter(sub => ['active', 'paused'].includes(sub.status));
        const past = subscriptions.filter(sub => ['cancelled', 'expired'].includes(sub.status));
        
        setActiveSubscriptions(active);
        setPastSubscriptions(past);
      } catch (error) {
        console.error('Erreur lors du chargement des abonnements:', error);
      }
    };
    
    loadSubscriptions();
  }, [getUserSubscriptions]);

  // Gestionnaires d'événements
  const handleCancelSubscription = async () => {
    try {
      await unsubscribe(selectedSubscriptionId);
      
      // Mettre à jour l'état local
      setActiveSubscriptions(prev => prev.filter(sub => sub.id !== selectedSubscriptionId));
      
      // Ajouter l'abonnement annulé aux abonnements passés
      const cancelledSub = activeSubscriptions.find(sub => sub.id === selectedSubscriptionId);
      if (cancelledSub) {
        const updatedSub = { ...cancelledSub, status: 'cancelled' as const };
        setPastSubscriptions(prev => [...prev, updatedSub]);
      }
      
      setCancelDialogOpen(false);
      
      toast({
        title: "Abonnement annulé",
        description: "Votre abonnement a été annulé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'annulation de l\'abonnement:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'annuler l'abonnement. Veuillez réessayer.",
      });
    }
  };

  const handlePauseSubscription = async (id: number) => {
    try {
      await pauseSubscription(id);
      
      // Mettre à jour l'état local
      setActiveSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status: 'paused' as const } : sub)
      );
      
      toast({
        title: "Abonnement mis en pause",
        description: "Votre abonnement a été mis en pause. Vous pouvez le reprendre à tout moment.",
      });
    } catch (error) {
      console.error('Erreur lors de la mise en pause de l\'abonnement:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre en pause l'abonnement. Veuillez réessayer.",
      });
    }
  };

  const handleResumeSubscription = async (id: number) => {
    try {
      await resumeSubscription(id);
      
      // Mettre à jour l'état local
      setActiveSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status: 'active' as const } : sub)
      );
      
      toast({
        title: "Abonnement repris",
        description: "Votre abonnement a été réactivé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la reprise de l\'abonnement:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de reprendre l'abonnement. Veuillez réessayer.",
      });
    }
  };

  const handleToggleAutoRenew = async (id: number) => {
    try {
      await toggleAutoRenew(id);
      
      // Mettre à jour l'état local
      setActiveSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, isAutoRenew: !sub.isAutoRenew } : sub)
      );
      
      toast({
        title: "Renouvellement automatique modifié",
        description: "Vos préférences de renouvellement ont été mises à jour.",
      });
    } catch (error) {
      console.error('Erreur lors de la modification du renouvellement automatique:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le renouvellement automatique. Veuillez réessayer.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy', { locale: fr });
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return 'Hebdomadaire';
      case 'biweekly':
        return 'Bimensuelle';
      case 'monthly':
        return 'Mensuelle';
      default:
        return frequency;
    }
  };

  // Rendu du composant
  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Abonnements actifs</TabsTrigger>
          <TabsTrigger value="past">Abonnements passés</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          {activeSubscriptions.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-700">Vous n'avez pas d'abonnements actifs</h3>
              <p className="text-gray-500 mt-2">Explorez nos différentes options d'abonnement</p>
              <Button className="mt-4 bg-agrimarket-green hover:bg-agrimarket-darkGreen">
                Découvrir les abonnements
              </Button>
            </div>
          ) : (
            activeSubscriptions.map((subscription) => (
              <Card key={subscription.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{subscription.planName}</CardTitle>
                      <CardDescription>Agriculteur: {subscription.farmerName}</CardDescription>
                    </div>
                    
                    <div>
                      {subscription.status === 'active' ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Actif</Badge>
                      ) : subscription.status === 'paused' ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">En pause</Badge>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Fréquence: </span>
                        <span>{getFrequencyLabel(subscription.frequency)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Prochaine livraison: </span>
                        <span>{formatDate(subscription.nextDelivery)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Renouvellement automatique: </span>
                        <span>{subscription.isAutoRenew ? 'Activé' : 'Désactivé'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Contenu: </span>
                        <span>{subscription.items.map(item => `${item.quantity} ${item.name}`).join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm flex justify-between border-b pb-2">
                        <span>Prix par livraison:</span>
                        <span className="font-semibold">{subscription.price.toFixed(2)} €</span>
                      </div>
                      
                      <div className="text-sm flex justify-between">
                        <span>Date de début:</span>
                        <span>{formatDate(subscription.startDate)}</span>
                      </div>
                      
                      <div className="text-sm flex justify-between">
                        <span>Date de fin:</span>
                        <span>{subscription.endDate ? formatDate(subscription.endDate) : 'Indéterminée'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-3 flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    {subscription.status === 'active' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePauseSubscription(subscription.id)}
                        className="flex items-center gap-1"
                      >
                        <Pause className="h-4 w-4" />
                        Mettre en pause
                      </Button>
                    ) : subscription.status === 'paused' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResumeSubscription(subscription.id)}
                        className="flex items-center gap-1"
                      >
                        <Play className="h-4 w-4" />
                        Reprendre
                      </Button>
                    ) : null}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleAutoRenew(subscription.id)}
                      className={`flex items-center gap-1 ${subscription.isAutoRenew ? 'text-amber-600 border-amber-600' : 'text-green-600 border-green-600'}`}
                    >
                      <RotateCcw className="h-4 w-4" />
                      {subscription.isAutoRenew ? 'Désactiver' : 'Activer'} le renouvellement
                    </Button>
                  </div>
                  
                  <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setSelectedSubscriptionId(subscription.id)}
                        className="flex items-center gap-1"
                      >
                        <XCircle className="h-4 w-4" />
                        Annuler
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Êtes-vous sûr de vouloir annuler cet abonnement ?</DialogTitle>
                        <DialogDescription>
                          Cette action est irréversible. Vous ne recevrez plus de livraisons pour cet abonnement.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleCancelSubscription}>
                          Confirmer l'annulation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4 mt-4">
          {pastSubscriptions.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-700">Aucun historique d'abonnement</h3>
              <p className="text-gray-500 mt-2">Vos abonnements passés apparaîtront ici</p>
            </div>
          ) : (
            pastSubscriptions.map((subscription) => (
              <Card key={subscription.id} className="overflow-hidden opacity-80">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{subscription.planName}</CardTitle>
                      <CardDescription>Agriculteur: {subscription.farmerName}</CardDescription>
                    </div>
                    
                    <div>
                      {subscription.status === 'cancelled' ? (
                        <Badge variant="outline" className="text-red-500 border-red-500">Annulé</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500 border-gray-500">Expiré</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm flex justify-between">
                        <span>Fréquence:</span>
                        <span>{getFrequencyLabel(subscription.frequency)}</span>
                      </div>
                      
                      <div className="text-sm flex justify-between">
                        <span>Date de début:</span>
                        <span>{formatDate(subscription.startDate)}</span>
                      </div>
                      
                      <div className="text-sm flex justify-between">
                        <span>Date de fin:</span>
                        <span>{formatDate(subscription.endDate)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSubscriptions;
