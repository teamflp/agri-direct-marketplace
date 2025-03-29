
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  User, Mail, MapPin, Phone, CreditCard, Lock, Bell, 
  Settings, Upload, Leaf, ShieldCheck, Building, Tractor
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const eligibilitySchema = z.object({
  farmerName: z.string().min(2, { message: "Le nom de l'exploitation est requis" }),
  businessAddress: z.string().min(5, { message: "L'adresse de l'exploitation est requise" }),
  registrationNumber: z.string().min(5, { message: "Le numéro d'enregistrement est requis" }),
  certifications: z.string(),
  description: z.string().min(50, { message: "Une description d'au moins 50 caractères est requise" }),
  products: z.string().min(5, { message: "Veuillez préciser les produits que vous proposez" }),
  organicFarming: z.boolean().optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions pour être éligible" }),
  }),
});

type EligibilityFormValues = z.infer<typeof eligibilitySchema>;

const FarmerProfile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [eligibilityStatus, setEligibilityStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<EligibilityFormValues>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      farmerName: "Ferme des Délices",
      businessAddress: "45 Route des Champs, 35000 Rennes",
      registrationNumber: "FR12345678",
      certifications: "Agriculture Biologique, Label Rouge",
      description: "Nous sommes une ferme familiale spécialisée dans les fruits et légumes de saison, cultivés avec des méthodes respectueuses de l'environnement.",
      products: "Fruits, légumes, produits laitiers",
      organicFarming: true,
      acceptTerms: true,
    },
  });

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

  const onSubmitEligibility = (values: EligibilityFormValues) => {
    console.log(values);
    toast({
      title: "Informations d'éligibilité mises à jour",
      description: "Votre demande d'éligibilité a été soumise et est en cours d'examen.",
    });
    // In a real application, this would submit to a backend
  };

  const dashboardMenuItems = [
    {
      title: "Tableau de bord",
      path: "/farmer-dashboard",
      icon: <Tractor className="h-5 w-5" />,
    },
    {
      title: "Mon profil",
      path: "/farmer-dashboard/profile",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Mes produits",
      path: "/farmer-dashboard/products",
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      title: "Mes commandes",
      path: "/farmer-dashboard/orders",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Ma messagerie",
      path: "/farmer-dashboard/messages",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: "Mon abonnement",
      path: "/farmer-dashboard/subscription",
      icon: <Building className="h-5 w-5" />,
    },
  ];

  return (
    <DashboardLayout
      name="Pierre Martin"
      email="pierre.martin@ferme-delices.fr"
      avatar={
        <AvatarFallback>PM</AvatarFallback>
      }
      menuItems={dashboardMenuItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Mon profil agriculteur</h1>
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

        <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Informations personnelles</TabsTrigger>
            <TabsTrigger value="eligibility">Éligibilité</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profil agriculteur</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et vos coordonnées.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-32 w-32 cursor-pointer relative group" onClick={isEditing ? handleProfilePictureClick : undefined}>
                      <AvatarImage src={profileImage || "/placeholder.svg"} alt="Pierre Martin" />
                      <AvatarFallback>PM</AvatarFallback>
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
                      <h3 className="font-medium text-lg">Pierre Martin</h3>
                      <p className="text-muted-foreground">Agriculteur depuis Mai 2022</p>
                      <Badge className="mt-2 bg-blue-600">Agriculteur {eligibilityStatus === 'approved' ? 'vérifié' : 'en attente'}</Badge>
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
                            defaultValue="Pierre" 
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
                            defaultValue="Martin" 
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
                            defaultValue="pierre.martin@ferme-delices.fr" 
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
                            defaultValue="+33 6 98 76 54 32" 
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
                          defaultValue="45 Route des Champs, 35000 Rennes" 
                          disabled={!isEditing}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="eligibility">
            <Card>
              <CardHeader>
                <CardTitle>Éligibilité de l'agriculteur</CardTitle>
                <CardDescription>
                  Informations nécessaires pour être approuvé en tant qu'agriculteur sur la plateforme.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitEligibility)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="farmerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de l'exploitation</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom de votre exploitation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="businessAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse de l'exploitation</FormLabel>
                            <FormControl>
                              <Input placeholder="Adresse complète de l'exploitation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro d'enregistrement (SIRET)</FormLabel>
                            <FormControl>
                              <Input placeholder="Numéro SIRET" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="certifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Certifications (optionnel)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Agriculture Biologique, Label Rouge, etc." {...field} />
                            </FormControl>
                            <FormDescription>
                              Listez toutes vos certifications, séparées par des virgules
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description de votre exploitation</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Décrivez votre exploitation, son histoire, vos méthodes de production..."
                                {...field}
                                className="min-h-32"
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum 50 caractères - Cette description sera visible sur votre profil public
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="products"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Produits proposés</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Fruits, légumes, produits laitiers, etc." {...field} />
                            </FormControl>
                            <FormDescription>
                              Listez les types de produits que vous proposez
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="organicFarming"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Agriculture biologique
                              </FormLabel>
                              <FormDescription>
                                Je certifie pratiquer l'agriculture biologique
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Conditions d'éligibilité
                              </FormLabel>
                              <FormDescription>
                                Je certifie que les informations fournies sont exactes et j'accepte de me soumettre à une vérification
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-agrimarket-orange hover:bg-orange-600">
                        Soumettre pour vérification
                      </Button>
                    </div>
                  </form>
                </Form>
                
                <div className="mt-8 p-4 border rounded-md bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Statut de vérification</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {eligibilityStatus === 'pending' && "Votre demande est en cours d'examen. Nous vous contacterons sous 48h."}
                    {eligibilityStatus === 'approved' && "Votre exploitation a été vérifiée et approuvée. Vous pouvez maintenant vendre vos produits."}
                    {eligibilityStatus === 'rejected' && "Votre demande a été rejetée. Veuillez vérifier les informations et soumettre à nouveau."}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        eligibilityStatus === 'pending' ? 'bg-yellow-500 w-1/3' : 
                        eligibilityStatus === 'approved' ? 'bg-green-600 w-full' :
                        'bg-red-500 w-full'
                      }`}
                    ></div>
                  </div>
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
                        <p className="font-medium">Rennes, France</p>
                        <p className="text-sm text-muted-foreground">15 octobre 2023, 10:15</p>
                      </div>
                      <Badge>Cet appareil</Badge>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Paris, France</p>
                        <p className="text-sm text-muted-foreground">14 octobre 2023, 18:45</p>
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
                        <p className="font-medium">Nouvelles commandes</p>
                        <p className="text-sm text-muted-foreground">Soyez informé lorsqu'un client passe une commande</p>
                      </div>
                      <Checkbox id="orders" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messages des clients</p>
                        <p className="text-sm text-muted-foreground">Recevez une notification pour les nouveaux messages</p>
                      </div>
                      <Checkbox id="messages" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mises à jour de la plateforme</p>
                        <p className="text-sm text-muted-foreground">Soyez informé des nouvelles fonctionnalités</p>
                      </div>
                      <Checkbox id="updates" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Notifications mobiles</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Alertes de commandes</p>
                        <p className="text-sm text-muted-foreground">Soyez alerté immédiatement des nouvelles commandes</p>
                      </div>
                      <Checkbox id="orderAlerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messages instantanés</p>
                        <p className="text-sm text-muted-foreground">Recevez des notifications pour les messages en temps réel</p>
                      </div>
                      <Checkbox id="instantMessages" defaultChecked />
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

export default FarmerProfile;
