
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  ShoppingCart, 
  Heart, 
  MessageSquare, 
  FileText, 
  Users,
  Camera,
  Mail,
  Phone,
  MapPin,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";

const BuyerProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été mises à jour avec succès.",
    });
  };
  
  const handleUploadImage = () => {
    toast({
      title: "Téléchargement d'image",
      description: "Fonctionnalité en cours de développement.",
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Changement de mot de passe",
      description: "Un email a été envoyé pour réinitialiser votre mot de passe.",
    });
  };

  return (
    <DashboardLayout
      name="Martin Pasquier"
      email="martin.p@email.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          MP
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mon profil</h1>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informations personnelles</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="preferences">Préférences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Mes informations</CardTitle>
                    <CardDescription>Gérez vos informations personnelles</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                  >
                    {isEditing ? "Annuler" : "Modifier"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <div className="bg-agrimarket-orange text-white text-2xl font-semibold flex items-center justify-center h-full">
                          MP
                        </div>
                      </Avatar>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="absolute bottom-0 right-0 rounded-full bg-white"
                          onClick={handleUploadImage}
                        >
                          <Camera size={16} />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input 
                            id="firstName" 
                            defaultValue="Martin" 
                            disabled={!isEditing} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input 
                            id="lastName" 
                            defaultValue="Pasquier" 
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="email" 
                            defaultValue="martin.p@email.com" 
                            disabled={!isEditing}
                            className="flex-1"
                            icon={<Mail className="h-4 w-4 text-gray-500" />}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="phone" 
                            defaultValue="+221 77 123 45 67" 
                            disabled={!isEditing}
                            className="flex-1"
                            icon={<Phone className="h-4 w-4 text-gray-500" />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea 
                      id="address" 
                      defaultValue="123 Rue Principale, 12345 Ville" 
                      disabled={!isEditing}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        Enregistrer les modifications
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>Gérez votre mot de passe et les paramètres de sécurité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Mot de passe</h3>
                      <p className="text-sm text-gray-500">Dernière modification il y a 2 mois</p>
                    </div>
                    <Button variant="outline" onClick={handleChangePassword}>
                      Changer
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                      <p className="text-sm text-gray-500">Protégez votre compte avec une couche de sécurité supplémentaire</p>
                    </div>
                    <Button variant="outline">
                      Configurer
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Sessions actives</h3>
                      <p className="text-sm text-gray-500">Gérez les appareils connectés à votre compte</p>
                    </div>
                    <Button variant="outline">
                      Gérer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
                <CardDescription>Personnalisez votre expérience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notifications par email</h4>
                            <p className="text-sm text-gray-500">Recevoir des mises à jour par email</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Configurer</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notifications sur le site</h4>
                            <p className="text-sm text-gray-500">Recevoir des alertes sur le site</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Configurer</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Préférences d'achat</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Catégories préférées</h4>
                            <p className="text-sm text-gray-500">Personnaliser vos recommandations</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Choisir</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Mode de paiement préféré</h4>
                            <p className="text-sm text-gray-500">Définir votre méthode par défaut</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Définir</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BuyerProfile;
