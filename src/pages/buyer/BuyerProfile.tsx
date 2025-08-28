import React, { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, MapPin, Phone, CreditCard, Lock, Bell, Settings, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Papa from "papaparse";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getBuyerDashboardMenuItems } from '@/components/buyer/dashboard/BuyerDashboardMenu';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const BuyerProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.defaultTab || "profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, profile, signOut } = useAuth();

  const dashboardMenuItems = getBuyerDashboardMenuItems();
  
  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Jean Dupont';
    
  const email = user?.email || 'jean.dupont@example.com';

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été modifié avec succès.",
    });
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Photo téléchargée",
        description: "Votre photo de profil a été téléchargée. N'oubliez pas d'enregistrer vos modifications.",
      });
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const { data, error } = await supabase.functions.invoke("export-user-data");
      if (error) throw error;

      const allData: any[] = [];
      for (const key in data) {
        if (Array.isArray(data[key])) {
          allData.push(...data[key]);
        } else if (data[key]) {
          allData.push(data[key]);
        }
      }

      const csv = Papa.unparse(allData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "agrimarket_user_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Exportation réussie",
        description: "Vos données ont été exportées avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur d'exportation",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase.functions.invoke("delete-user-account");
      if (error) throw error;

      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès. Vous allez être déconnecté.",
      });

      await signOut();
      navigate('/');

    } catch (error: any) {
      toast({
        title: "Erreur de suppression",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          {profile?.first_name?.charAt(0) || 'J'}{profile?.last_name?.charAt(0) || 'D'}
        </div>
      }
      menuItems={dashboardMenuItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Mon profil</h1>
          {activeTab === "profile" && !isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="default" className="bg-agrimarket-orange hover:bg-orange-600">
              Modifier le profil
            </Button>
          )}
          {activeTab === "profile" && isEditing && (
            <div className="space-x-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Annuler
              </Button>
              <Button onClick={handleSaveProfile} variant="default" className="bg-agrimarket-orange hover:bg-orange-600">
                Enregistrer
              </Button>
            </div>
          )}
        </div>

        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Informations personnelles</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profil utilisateur</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et vos coordonnées.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-32 w-32 cursor-pointer relative group" onClick={isEditing ? handleProfilePictureClick : undefined}>
                      <AvatarImage src={profileImage || "/placeholder.svg"} alt="Jean Dupont" />
                      <AvatarFallback>JD</AvatarFallback>
                      {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                          <Upload className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </Avatar>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {isEditing && (
                      <Button variant="outline" size="sm" onClick={handleProfilePictureClick}>
                        Changer la photo
                      </Button>
                    )}
                    <div className="text-center">
                      <h3 className="font-medium text-lg">Jean Dupont</h3>
                      <p className="text-muted-foreground">Client depuis Juin 2023</p>
                      <Badge className="mt-2 bg-agrimarket-green">Client vérifié</Badge>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <Input 
                            id="firstName" 
                            defaultValue="Jean" 
                            disabled={!isEditing}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <Input 
                            id="lastName" 
                            defaultValue="Dupont" 
                            disabled={!isEditing}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <Input 
                            id="email" 
                            defaultValue="jean.dupont@example.com" 
                            disabled={!isEditing}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <Input 
                            id="phone" 
                            defaultValue="+33 6 12 34 56 78" 
                            disabled={!isEditing}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="address" 
                          defaultValue="123 Rue des Champs, 75001 Paris" 
                          disabled={!isEditing}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-lg">Gestion du compte</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={handleExportData} disabled={isExporting}>
                      {isExporting ? (
                        <>
                          <Download className="mr-2 h-4 w-4 animate-spin" />
                          Exportation...
                        </>
                      ) : (
                        "Exporter mes données"
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={isDeleting}>
                          {isDeleting ? "Suppression..." : "Supprimer mon compte"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irréversible. Toutes vos données, y compris votre profil, vos commandes et vos avis, seront définitivement supprimées.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Confirmer la suppression
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    La suppression de votre compte est une action irréversible. Toutes vos données seront définitivement effacées.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gérez votre mot de passe et les paramètres de sécurité.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <Input id="currentPassword" type="password" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <Input id="newPassword" type="password" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <Input id="confirmPassword" type="password" className="flex-1" />
                    </div>
                  </div>
                  <Button type="submit" className="bg-agrimarket-orange hover:bg-orange-600">
                    Modifier le mot de passe
                  </Button>
                </form>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-lg">Connexions récentes</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Paris, France</p>
                        <p className="text-sm text-muted-foreground">12 octobre 2023, 14:32</p>
                      </div>
                      <Badge>Cet appareil</Badge>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Lyon, France</p>
                        <p className="text-sm text-muted-foreground">10 octobre 2023, 09:15</p>
                      </div>
                      <Badge variant="outline">Appareil reconnu</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notifications</CardTitle>
                <CardDescription>
                  Personnalisez vos préférences de notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notifications par email</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotions et offres</p>
                        <p className="text-sm text-muted-foreground">Recevez des offres exclusives de nos agriculteurs partenaires</p>
                      </div>
                      <Checkbox id="marketing" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mise à jour des commandes</p>
                        <p className="text-sm text-muted-foreground">Soyez informé du statut de vos commandes</p>
                      </div>
                      <Checkbox id="orders" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nouveaux produits</p>
                        <p className="text-sm text-muted-foreground">Découvrez les nouveaux produits de saison</p>
                      </div>
                      <Checkbox id="products" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Notifications mobiles</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rappels de commande</p>
                        <p className="text-sm text-muted-foreground">Recevez des rappels pour les commandes programmées</p>
                      </div>
                      <Checkbox id="reminders" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messages des agriculteurs</p>
                        <p className="text-sm text-muted-foreground">Soyez notifié des nouveaux messages</p>
                      </div>
                      <Checkbox id="messages" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Button className="mt-4 bg-agrimarket-orange hover:bg-orange-600">
                  Enregistrer les préférences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BuyerProfile;
