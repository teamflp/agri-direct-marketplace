
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings, User, CreditCard, MapPin, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const FarmerProfile = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    email: user?.email || '',
    phone: profile?.phone_number || '',
    farmName: 'Ferme des Quatre Saisons',
    address: '123 Chemin des Agriculteurs',
    city: 'Saint-Martin',
    postalCode: '75000',
    country: 'France'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleUpdateInfo = async () => {
    setIsUpdatingInfo(true);
    try {
      const { error } = await updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phone
      });
      
      if (error) {
        toast({
          title: "Erreur",
          description: "La mise à jour des informations a échoué.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Succès",
          description: "Vos informations ont été mises à jour avec succès.",
          variant: "success"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingInfo(false);
    }
  };
  
  const handleUpdateAddress = () => {
    setIsUpdatingAddress(true);
    // Simulation d'une mise à jour d'adresse
    setTimeout(() => {
      toast({
        title: "Succès",
        description: "L'adresse a été mise à jour avec succès.",
        variant: "success"
      });
      setIsUpdatingAddress(false);
    }, 1000);
  };
  
  const handleAddPaymentMethod = () => {
    toast({
      title: "Information",
      description: "Cette fonctionnalité sera disponible prochainement.",
      variant: "default"
    });
  };
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer", icon: <BarChart2 size={20} /> },
    { title: "Produits", path: "/farmer/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer/profile", icon: <Settings size={20} /> },
  ];

  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Agriculteur';
    
  const email = user?.email || 'agriculteur@agrimarket.fr';

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profil et paramètres</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> 
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <Button 
              onClick={handleUpdateInfo} 
              disabled={isUpdatingInfo}
              className="bg-agrimarket-green hover:bg-agrimarket-green/90"
            >
              {isUpdatingInfo ? "Mise à jour..." : "Mettre à jour mes informations"}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Adresse de l'exploitation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="farmName">Nom de la ferme</Label>
                <Input 
                  id="farmName" 
                  value={formData.farmName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input 
                  id="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input 
                  id="city" 
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input 
                  id="postalCode" 
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input 
                  id="country" 
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleUpdateAddress}
              disabled={isUpdatingAddress}
              className="bg-agrimarket-green hover:bg-agrimarket-green/90"
            >
              {isUpdatingAddress ? "Mise à jour..." : "Mettre à jour l'adresse"}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Informations de paiement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator className="my-4" />
            <p className="text-sm text-gray-500">Vous n'avez pas encore ajouté de méthode de paiement.</p>
            <Button onClick={handleAddPaymentMethod} className="bg-agrimarket-orange hover:bg-agrimarket-brown">
              Ajouter une méthode de paiement
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerProfile;
