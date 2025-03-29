
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Share } from 'lucide-react';
import { useSocial } from '@/contexts/SocialContext';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProductShareProps = {
  productId: number;
  productName: string;
  productImage?: string;
  variant?: 'icon' | 'button' | 'link';
  className?: string;
};

const ProductShare = ({ 
  productId, 
  productName, 
  productImage, 
  variant = 'button',
  className = '',
}: ProductShareProps) => {
  const [open, setOpen] = useState(false);
  const [shareMethod, setShareMethod] = useState<'email' | 'whatsapp' | 'facebook' | 'twitter'>('email');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  
  const { shareProduct } = useSocial();
  
  const handleShare = () => {
    // Validate fields
    if (!recipient) {
      return;
    }
    
    shareProduct({
      productId,
      productName,
      productImage,
      sharedBy: 1, // This would be the current user's ID in a real app
      sharedTo: recipient,
      shareMethod,
      message
    });
    
    // Close dialog
    setOpen(false);
    
    // Reset form
    setRecipient('');
    setMessage('');
    
    // In a real app, we would actually send the email or share on social media here
    // For now, we just simulate it with a toast
  };
  
  let shareButton;
  
  switch (variant) {
    case 'icon':
      shareButton = (
        <Button variant="ghost" size="icon" className={className}>
          <Share className="h-4 w-4" />
        </Button>
      );
      break;
    case 'link':
      shareButton = (
        <Button variant="link" className={className}>
          <Share className="h-4 w-4 mr-2" />
          Partager
        </Button>
      );
      break;
    case 'button':
    default:
      shareButton = (
        <Button variant="outline" className={className}>
          <Share className="h-4 w-4 mr-2" />
          Partager
        </Button>
      );
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {shareButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager ce produit</DialogTitle>
          <DialogDescription>
            Partagez {productName} avec vos amis ou votre famille.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="share-method">Méthode de partage</Label>
            <Select 
              value={shareMethod} 
              onValueChange={(value) => setShareMethod(value as any)}
            >
              <SelectTrigger id="share-method">
                <SelectValue placeholder="Choisir une méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="share-recipient">
              {shareMethod === 'email' ? 'Adresse email' : 'Numéro de téléphone ou pseudo'}
            </Label>
            <Input
              id="share-recipient"
              placeholder={shareMethod === 'email' ? 'nom@example.com' : '+2xx xxxxxxxx'}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="share-message">Message (optionnel)</Label>
            <Textarea
              id="share-message"
              placeholder="J'ai trouvé ce produit qui pourrait t'intéresser..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleShare}>
            Partager
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductShare;
