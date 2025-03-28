
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// Définition du schéma de validation du formulaire
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  subject: z.string().min(5, {
    message: "Le sujet doit contenir au moins 5 caractères.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  // Initialisation du formulaire avec react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Fonction de soumission du formulaire
  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success("Votre message a été envoyé avec succès!");
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière */}
        <div className="bg-agrimarket-green/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Contactez-nous</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Vous avez des questions sur AgriMarket ou besoin d'assistance? 
              Notre équipe est à votre disposition pour vous aider.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-agrimarket-orange/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-agrimarket-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Adresse</h3>
                    <address className="not-italic text-gray-600">
                      Plateau, Immeuble Palm Club<br />
                      Abidjan, Côte d'Ivoire
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-agrimarket-orange/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-agrimarket-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Téléphone</h3>
                    <p className="text-gray-600">+225 07 XX XX XX XX</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-agrimarket-orange/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-agrimarket-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">contact@agrimarket.ci</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-agrimarket-orange/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-agrimarket-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Horaires d'ouverture</h3>
                    <p className="text-gray-600">Lundi - Vendredi: 8h - 18h<br />Samedi: 9h - 13h</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Suivez-nous sur les réseaux sociaux</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-agrimarket-green/10 p-3 rounded-full hover:bg-agrimarket-green/20 transition-colors">
                    <svg className="h-5 w-5 text-agrimarket-green" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-agrimarket-green/10 p-3 rounded-full hover:bg-agrimarket-green/20 transition-colors">
                    <svg className="h-5 w-5 text-agrimarket-green" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-agrimarket-green/10 p-3 rounded-full hover:bg-agrimarket-green/20 transition-colors">
                    <svg className="h-5 w-5 text-agrimarket-green" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Entrez votre nom" {...field} />
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
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input placeholder="Sujet de votre message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Détaillez votre message ici..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-agrimarket-orange hover:bg-orange-600 text-white"
                  >
                    Envoyer le message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Carte Google Maps */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Notre localisation</h2>
            <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4479835425276!2d-3.9963353857695253!3d5.3220862371726285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb41bd94129d%3A0x6de978a066ba9036!2sPlateau%2C%20Abidjan!5e0!3m2!1sfr!2sci!4v1657031555052!5m2!1sfr!2sci" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-3">Comment créer un compte agriculteur ?</h3>
                <p className="text-gray-600">
                  Pour créer un compte agriculteur, cliquez sur "Connexion / Inscription" puis choisissez "Agriculteur" 
                  lors de l'inscription. Vous devrez ensuite souscrire à l'un de nos abonnements pour commencer à vendre vos produits.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-3">Comment passer une commande ?</h3>
                <p className="text-gray-600">
                  Parcourez nos produits, ajoutez-les à votre panier, puis cliquez sur "Commander". 
                  Vous pourrez choisir votre mode de livraison et de paiement avant de finaliser votre commande.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-3">Quels sont les modes de paiement acceptés ?</h3>
                <p className="text-gray-600">
                  Nous acceptons plusieurs méthodes de paiement : Orange Money, MTN Money, cartes bancaires via Stripe, 
                  et dans certains cas, le paiement à la livraison.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-3">Comment contacter un agriculteur ?</h3>
                <p className="text-gray-600">
                  Visitez la page profil de l'agriculteur et utilisez le formulaire de contact disponible. 
                  Vous pouvez également laisser un commentaire sur la page d'un produit spécifique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
