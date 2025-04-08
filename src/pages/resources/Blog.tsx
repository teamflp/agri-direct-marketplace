
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UserIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Données d'exemple pour les articles de blog
const blogPosts = [
  {
    id: 1,
    title: "Conseils pour une agriculture durable en Afrique de l'Ouest",
    excerpt: "Découvrez les meilleures pratiques pour cultiver de manière durable tout en augmentant vos rendements.",
    date: "22 Mar 2025",
    author: "Sophie Dubois",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    category: "Agriculture Durable",
    slug: "agriculture-durable-afrique-ouest"
  },
  {
    id: 2,
    title: "Les avantages des circuits courts pour les producteurs locaux",
    excerpt: "Comment les agriculteurs peuvent bénéficier de la vente directe et des plateformes comme AgriMarket.",
    date: "15 Mar 2025",
    author: "Jean Leclerc",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=800&auto=format&fit=crop",
    category: "Économie Locale",
    slug: "avantages-circuits-courts"
  },
  {
    id: 3,
    title: "Adaptation au changement climatique: techniques innovantes",
    excerpt: "Des méthodes pratiques pour adapter vos cultures face aux défis du changement climatique.",
    date: "10 Mar 2025",
    author: "Amadou Diop",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?q=80&w=800&auto=format&fit=crop",
    category: "Innovation",
    slug: "adaptation-changement-climatique"
  },
  {
    id: 4,
    title: "Comment optimiser la gestion de l'eau dans les cultures maraîchères",
    excerpt: "Techniques d'irrigation efficientes pour économiser l'eau tout en maximisant vos rendements.",
    date: "02 Mar 2025",
    author: "Marie Koné",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop",
    category: "Gestion des Ressources",
    slug: "optimiser-gestion-eau"
  },
  {
    id: 5,
    title: "Les certifications biologiques: démarches et avantages",
    excerpt: "Guide complet pour obtenir une certification biologique et valoriser vos produits sur le marché.",
    date: "25 Fév 2025",
    author: "Paul Mensah",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=800&auto=format&fit=crop",
    category: "Agriculture Biologique",
    slug: "certifications-biologiques"
  },
];

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  
  const handleShowMore = () => {
    setVisiblePosts(prevCount => prevCount + 5);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière */}
        <div className="bg-agrimarket-green/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Blog AgriMarket</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Conseils, actualités et informations sur l'agriculture durable, les techniques de culture et les marchés locaux.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, visiblePosts).map((post) => (
              <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium bg-agrimarket-green/10 text-agrimarket-green px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <UserIcon className="h-3 w-3 mr-1" />
                    {post.author}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-agrimarket-green hover:text-agrimarket-orange hover:bg-transparent p-0"
                    asChild
                  >
                    <Link to={`/resources/blog/${post.slug}`}>
                      Lire l'article <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {visiblePosts < blogPosts.length && (
            <div className="mt-12 text-center">
              <Button 
                className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white"
                onClick={handleShowMore}
              >
                Voir plus d'articles
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
