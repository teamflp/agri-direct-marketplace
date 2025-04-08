
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Book, FileText, Video, ArrowRight, Download } from "lucide-react";
import { Link } from 'react-router-dom';

const guideCategories = [
  {
    id: 1,
    title: "Guide d'utilisation",
    description: "Comprendre et naviguer dans la plateforme AgriMarket",
    icon: <Book className="h-6 w-6" />,
    articles: [
      { title: "Créer un compte agriculteur", type: "doc", size: "1.2 MB" },
      { title: "Ajouter des produits à votre catalogue", type: "doc", size: "1.5 MB" },
      { title: "Gérer votre inventaire efficacement", type: "doc", size: "984 KB" },
      { title: "Configurer vos options de livraison", type: "doc", size: "1.1 MB" },
    ]
  },
  {
    id: 2,
    title: "Ressources agricoles",
    description: "Conseils techniques et bonnes pratiques pour les agriculteurs",
    icon: <FileText className="h-6 w-6" />,
    articles: [
      { title: "Calendrier des cultures saisonnières", type: "pdf", size: "2.4 MB" },
      { title: "Guide des semences adaptées par région", type: "pdf", size: "3.7 MB" },
      { title: "Techniques d'irrigation économiques", type: "pdf", size: "1.8 MB" },
      { title: "Protection des cultures contre les parasites", type: "pdf", size: "2.2 MB" },
    ]
  },
  {
    id: 3,
    title: "Tutoriels vidéo",
    description: "Apprenez par la pratique avec nos guides visuels",
    icon: <Video className="h-6 w-6" />,
    articles: [
      { title: "Configuration de votre profil agriculteur", type: "video", size: "24 MB" },
      { title: "Optimiser vos photos de produits", type: "video", size: "36 MB" },
      { title: "Traiter les commandes efficacement", type: "video", size: "42 MB" },
      { title: "Analyser vos statistiques de vente", type: "video", size: "28 MB" },
    ]
  },
];

const KnowledgeBase = () => {
  const typeIcons = {
    pdf: <FileText className="h-4 w-4 text-red-600" />,
    doc: <FileText className="h-4 w-4 text-blue-600" />,
    video: <Video className="h-4 w-4 text-purple-600" />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière */}
        <div className="bg-agrimarket-green/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Base de connaissances</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Documentation, guides techniques et ressources pour vous aider à tirer le meilleur parti de la plateforme AgriMarket.
            </p>
            
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher dans la documentation..."
                  className="pl-10 pr-4 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guideCategories.map(category => (
              <Card key={category.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-full bg-primary/10 text-primary`}>
                      {category.icon}
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {category.articles.map((article, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {typeIcons[article.type as keyof typeof typeIcons]}
                          <span>{article.title}</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-1"
                    asChild
                  >
                    <Link to={`/resources/knowledge-base/${category.id}`}>
                      Voir tout <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 bg-agrimarket-green/10 p-8 rounded-lg text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
            <p className="text-gray-600 mb-6">
              Notre équipe de support est disponible pour vous aider avec toutes vos questions spécifiques.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white">
                <Link to="/resources/support">Contacter le support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resources/faq">Consulter la FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default KnowledgeBase;
