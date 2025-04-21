import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  ChevronLeft,
  ShoppingBag,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { farmersData } from '@/data/farmersData';

const FarmerDetail = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    try {
      const foundFarmer = farmersData.find(f => f.id === Number(id));
      if (foundFarmer) {
        setFarmer(foundFarmer);
        setError(null);
      } else {
        setError("Agriculteur non trouvé");
      }
    } catch (err) {
      setError("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse flex flex-col gap-4">
              <div className="h-96 bg-gray-300 rounded-lg w-full"></div>
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-32 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !farmer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {error || "Agriculteur non trouvé"}
              </h2>
              <Button asChild variant="outline">
                <Link to="/farmers">Retour à la liste des agriculteurs</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Retour à la liste */}
          <div className="mb-6">
            <Button variant="ghost" className="flex items-center text-gray-600" asChild>
              <Link to="/farmers">
                <ChevronLeft className="mr-1" />
                Retour aux agriculteurs
              </Link>
            </Button>
          </div>
          
          {/* En-tête du profil */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Image de couverture */}
            <div className="aspect-video md:aspect-[3/1] relative overflow-hidden">
              <img 
                src={farmer.image} 
                alt={farmer.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{farmer.name}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{farmer.location} · {farmer.distance} km</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{farmer.rating} ({farmer.reviews} avis)</span>
                    </div>
                    {farmer.isCertified && (
                      <Badge variant="outline" className="bg-agrimarket-green text-white border-0 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Certifié Bio
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="p-6 flex flex-wrap gap-4 border-b">
              <Button className="bg-agrimarket-orange hover:bg-agrimarket-brown" asChild>
                <Link to={`/farmers/${farmer.id}/products`}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Voir les produits
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/farmers/${farmer.id}/visit`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Planifier une visite
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/farmers/${farmer.id}/contact`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contacter
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Contenu principal en onglets */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="w-full sm:w-auto border-b justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="about" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-agrimarket-orange data-[state=active]:text-agrimarket-orange rounded-none bg-transparent px-4 py-2"
              >
                À propos
              </TabsTrigger>
              <TabsTrigger 
                value="products" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-agrimarket-orange data-[state=active]:text-agrimarket-orange rounded-none bg-transparent px-4 py-2"
              >
                Produits
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-agrimarket-orange data-[state=active]:text-agrimarket-orange rounded-none bg-transparent px-4 py-2"
              >
                Avis ({farmer.reviews})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">À propos de {farmer.name}</h2>
                      <p className="text-gray-700 mb-6">
                        {farmer.description}
                      </p>
                      
                      <h3 className="text-lg font-semibold mb-3">Nos spécialités</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {farmer.products.map((product: string, index: number) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="bg-agrimarket-lightGreen text-agrimarket-green border-0"
                          >
                            {product}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3">Nos pratiques agricoles</h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Agriculture biologique sans pesticides</li>
                        <li>Respect des cycles naturels</li>
                        <li>Production locale et de saison</li>
                        <li>Méthodes traditionnelles de culture</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-agrimarket-orange mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">Adresse</p>
                            <p className="text-gray-600">{farmer.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 text-agrimarket-orange mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">Téléphone</p>
                            <p className="text-gray-600">+225 07 01 02 03 04</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="w-5 h-5 text-agrimarket-orange mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600">contact@{farmer.name.toLowerCase().replace(/\s+/g, '-')}.ci</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Horaires d'ouverture</h3>
                        <div className="space-y-2 text-gray-700">
                          <div className="flex justify-between">
                            <span>Lundi - Vendredi</span>
                            <span>08:00 - 17:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Samedi</span>
                            <span>09:00 - 16:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dimanche</span>
                            <span>Fermé</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Produits disponibles</h2>
                  <p className="text-gray-600 mb-6">
                    Découvrez notre sélection de produits frais et de saison. Tous nos produits sont cultivés avec soin et dans le respect de l'environnement.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {farmer.products.map((product: string, index: number) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">Image produit</span>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{product}</h3>
                          <p className="text-sm text-gray-500 mb-2">Disponible</p>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-agrimarket-green">Prix sur demande</span>
                            <Button size="sm" variant="outline" className="text-xs">
                              Détails
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Avis clients ({farmer.reviews})</h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium text-lg">{farmer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Client {index + 1}</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < 4 + (index % 2) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {index === 0 
                            ? `Excellente qualité de produits ! J'achète régulièrement chez ${farmer.name} et je n'ai jamais été déçu. Les produits sont toujours frais et savoureux.` 
                            : index === 1 
                              ? `Service impeccable et produits bio de qualité. Je recommande vivement cette ferme pour la fraîcheur de ses produits.`
                              : `J'apprécie particulièrement l'engagement écologique de ${farmer.name}. Leurs méthodes de culture respectent l'environnement.`
                          }
                        </p>
                        <div className="text-xs text-gray-400 mt-1">
                          {index === 0 ? 'Il y a 2 jours' : index === 1 ? 'Il y a 1 semaine' : 'Il y a 3 semaines'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      Voir tous les avis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmerDetail;
