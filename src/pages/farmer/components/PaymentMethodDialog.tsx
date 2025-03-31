
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const PaymentMethodDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiry') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Limit CVV to 3 or 4 digits
    if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un numéro de carte valide",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.expiry.length < 5) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une date d'expiration valide",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.cvv.length < 3) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un code CVV valide",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.name.trim() === '') {
      toast({
        title: "Erreur",
        description: "Veuillez entrer le nom figurant sur la carte",
        variant: "destructive",
      });
      return;
    }
    
    // Success handling
    toast({
      title: "Moyen de paiement mis à jour",
      description: "Votre carte a été mise à jour avec succès",
    });
    
    setOpen(false);
    // Reset form
    setFormData({
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Mettre à jour le moyen de paiement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mettre à jour votre moyen de paiement</DialogTitle>
          <DialogDescription>
            Entrez les informations de votre nouvelle carte de paiement
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Numéro de carte
            </Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className="font-mono"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date d'expiration
              </Label>
              <Input
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                className="font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv" className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                CVV
              </Label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="•••"
                value={formData.cvv}
                onChange={handleChange}
                className="font-mono"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nom sur la carte</Label>
            <Input
              id="name"
              name="name"
              placeholder="JEAN DUPONT"
              value={formData.name}
              onChange={handleChange}
              className="uppercase"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
