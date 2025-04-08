
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { ArrowRight, HeadphonesIcon, MessageCircleIcon, SendIcon, FileTextIcon, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const supportFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  subject: z.string().min(5, {
    message: "Le sujet doit contenir au moins 5 caractères.",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
  priority: z.string().optional(),
});

const Support = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
      priority: "normale",
    },
  });
  
  const onSubmit = (data: z.infer<typeof supportFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulation d'envoi de formulaire
    console.log("Form data:", data);
    
    setTimeout(() => {
      toast.success("Votre demande a été envoyée avec succès. Un membre de notre équipe vous contactera sous peu.");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };
  
  const supportCategories = [
    { value: "compte", label: "Gestion du compte" },
    { value: "commandes", label: "Problèmes de commande" },
    { value: "paiement", label: "Paiements" },
    { value: "livraison", label: "Livraison" },
    { value: "produits", label: "Questions sur les produits" },
    { value: "technique", label: "Problème technique" },
    { value: "autre", label: "Autre" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière */}
        <div className="bg-agrimarket-green/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Centre de support</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Besoin d'aide ? Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {/* Options de support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full inline-flex">
                    <MessageCircleIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle>Chat en direct</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Discutez directement avec un membre de notre équipe de support pour une assistance immédiate.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Démarrer un chat
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full inline-flex">
                    <HeadphonesIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <CardTitle>Support téléphonique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Appelez notre service client au +225 07 XX XX XX XX du lundi au vendredi, de 8h à 18h.
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Voir nos horaires
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full inline-flex">
                    <FileTextIcon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <CardTitle>Base de connaissances</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Consultez notre documentation détaillée et les guides pour trouver rapidement des réponses.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Parcourir les guides
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Résumez votre problème" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une catégorie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {supportCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priorité</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une priorité" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="faible">Faible</SelectItem>
                                <SelectItem value="normale">Normale</SelectItem>
                                <SelectItem value="haute">Haute</SelectItem>
                                <SelectItem value="urgente">Urgente</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre problème en détail..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Veuillez inclure autant de détails que possible pour nous aider à résoudre votre problème rapidement.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Envoi en cours...</>
                      ) : (
                        <>
                          Envoyer le message
                          <SendIcon className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Informations complémentaires */}
            <div>
              {/* Notre engagement */}
              <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                <h3 className="text-lg font-bold mb-4">Notre engagement</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 bg-green-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Réponse rapide</h4>
                      <p className="text-sm text-gray-600">Nous répondons à toutes les demandes sous 24h ouvrées.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-blue-100 p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Support de qualité</h4>
                      <p className="text-sm text-gray-600">Une équipe d'experts dédiée à la résolution de vos problèmes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-purple-100 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Suivi personnalisé</h4>
                      <p className="text-sm text-gray-600">Chaque demande est suivie jusqu'à sa résolution complète.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ populaires */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-bold mb-4">Questions fréquentes</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/resources/faq#payment" className="flex items-center justify-between text-blue-600 hover:text-blue-800 transition-colors">
                      <span>Comment modifier ma commande ?</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources/faq#delivery" className="flex items-center justify-between text-blue-600 hover:text-blue-800 transition-colors">
                      <span>Délais de livraison estimés</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources/faq#account" className="flex items-center justify-between text-blue-600 hover:text-blue-800 transition-colors">
                      <span>Réinitialiser mon mot de passe</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources/faq#returns" className="flex items-center justify-between text-blue-600 hover:text-blue-800 transition-colors">
                      <span>Politique de retour</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources/faq" className="flex items-center justify-between font-medium mt-4">
                      <span>Voir toutes les FAQ</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
