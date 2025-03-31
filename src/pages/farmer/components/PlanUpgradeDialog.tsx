
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface PlanUpgradeDialogProps {
  planName: string;
  planPrice: number;
  planFeatures: string[];
  currentPlan: boolean;
  popular: boolean;
}

const PlanUpgradeDialog = ({ 
  planName, 
  planPrice, 
  planFeatures, 
  currentPlan,
  popular
}: PlanUpgradeDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleUpgrade = () => {
    toast({
      title: "Changement de forfait",
      description: `Vous allez être redirigé vers la page de paiement pour le forfait ${planName}`,
    });
    
    // Fermer le dialogue
    setOpen(false);
    
    // Dans une application réelle, redirection vers le processus de paiement
    // window.location.href = '/checkout?plan=' + planName;
  };

  if (currentPlan) {
    return (
      <Button disabled>Forfait actuel</Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={popular ? "default" : "outline"}
          className={popular ? "bg-agrimarket-orange hover:bg-orange-600" : ""}
        >
          Choisir ce forfait
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Changer pour le forfait {planName}</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir changer pour le forfait {planName} ? 
            {popular && (
              <Badge className="ml-2 bg-agrimarket-orange">Populaire</Badge>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <span className="text-2xl font-bold">{planPrice.toLocaleString()} FCFA</span>
            <span className="text-gray-500">/mois</span>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Ce forfait inclut :</h4>
            <ul className="space-y-2">
              {planFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-agrimarket-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Le changement prendra effet à partir du prochain cycle de facturation.</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleUpgrade} className={popular ? "bg-agrimarket-orange hover:bg-orange-600" : ""}>
            Confirmer le changement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanUpgradeDialog;
