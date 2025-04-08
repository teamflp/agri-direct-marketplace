
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';
import { adminSubscriptions } from './data/adminData';

const AdminSubscriptionsTab = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<null | typeof adminSubscriptions[0]>(null);
  const [showModifyDialog, setShowModifyDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();
  
  const handleModify = (subscription: typeof adminSubscriptions[0]) => {
    setSelectedSubscription(subscription);
    setShowModifyDialog(true);
  };
  
  const handleCancel = (subscription: typeof adminSubscriptions[0]) => {
    setSelectedSubscription(subscription);
    setShowCancelDialog(true);
  };
  
  const confirmModify = () => {
    toast({
      title: "Abonnement modifié",
      description: `L'abonnement de ${selectedSubscription?.farmer} a été modifié avec succès.`,
      variant: "default",
    });
    setShowModifyDialog(false);
  };
  
  const confirmCancel = () => {
    toast({
      title: "Abonnement annulé",
      description: `L'abonnement de ${selectedSubscription?.farmer} a été annulé avec succès.`,
      variant: "destructive",
    });
    setShowCancelDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des abonnements</CardTitle>
        <CardDescription>
          Suivi des abonnements des agriculteurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Agriculteur</TableHead>
              <TableHead>Formule</TableHead>
              <TableHead>Date de début</TableHead>
              <TableHead>Prochain paiement</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.id}</TableCell>
                <TableCell>{subscription.farmer}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    subscription.plan === "Premium" 
                      ? "bg-purple-100 text-purple-800" 
                      : subscription.plan === "Pro"
                      ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {subscription.plan}
                  </span>
                </TableCell>
                <TableCell>{subscription.startDate}</TableCell>
                <TableCell>{subscription.nextBilling}</TableCell>
                <TableCell>{subscription.amount.toLocaleString()} FCFA</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    subscription.status === "Actif" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {subscription.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => handleModify(subscription)}
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => handleCancel(subscription)}
                    disabled={subscription.status !== "Actif"}
                  >
                    Annuler
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog pour modifier un abonnement */}
      <Dialog open={showModifyDialog} onOpenChange={setShowModifyDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifier l'abonnement</DialogTitle>
            <DialogDescription>
              Modifier les détails de l'abonnement de {selectedSubscription?.farmer}
            </DialogDescription>
          </DialogHeader>
          {selectedSubscription && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="plan">Formule d'abonnement</label>
                  <select 
                    id="plan" 
                    className="w-full p-2 border rounded-md" 
                    defaultValue={selectedSubscription.plan}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Pro">Pro</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="billing">Cycle de facturation</label>
                  <select 
                    id="billing" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="monthly"
                  >
                    <option value="monthly">Mensuel</option>
                    <option value="quarterly">Trimestriel</option>
                    <option value="yearly">Annuel</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="nextDate">Prochaine date de facturation</label>
                  <input 
                    type="date" 
                    id="nextDate" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="2025-05-15"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowModifyDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={confirmModify}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour annuler un abonnement */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler l'abonnement</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir annuler l'abonnement de {selectedSubscription?.farmer} ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCancelDialog(false)}
            >
              Retour
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmCancel}
            >
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminSubscriptionsTab;
