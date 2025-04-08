
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon, UserIcon, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Données d'exemple pour les articles de blog
const blogPosts = [
  {
    id: 1,
    title: "Conseils pour une agriculture durable en Afrique de l'Ouest",
    excerpt: "Découvrez les meilleures pratiques pour cultiver de manière durable tout en augmentant vos rendements.",
    content: `
      <p>L'agriculture durable représente aujourd'hui un enjeu majeur pour les agriculteurs d'Afrique de l'Ouest. Face aux défis climatiques et économiques, adopter des pratiques respectueuses de l'environnement tout en maintenant une productivité satisfaisante est crucial.</p>
      
      <h2>La rotation des cultures</h2>
      <p>La rotation des cultures est une pratique ancestrale qui consiste à alterner différentes espèces végétales sur une même parcelle. Cette technique permet d'améliorer la structure du sol, de réduire les maladies et les ravageurs, et d'optimiser l'utilisation des nutriments.</p>
      
      <h2>L'agroforesterie</h2>
      <p>L'agroforesterie consiste à associer des arbres aux cultures. Cette pratique permet de créer un microclimat favorable aux cultures, de prévenir l'érosion des sols et d'augmenter la biodiversité. De plus, les arbres peuvent fournir des revenus supplémentaires (fruits, bois, etc.).</p>
      
      <h2>La gestion de l'eau</h2>
      <p>Dans les régions où l'eau est rare, des systèmes d'irrigation goutte-à-goutte peuvent être mis en place. Ces systèmes permettent d'économiser jusqu'à 60% d'eau par rapport aux méthodes traditionnelles.</p>
      
      <h2>Les engrais naturels</h2>
      <p>L'utilisation du compost et du fumier permet d'enrichir le sol sans recourir aux engrais chimiques. Ces amendements organiques améliorent la structure du sol et favorisent l'activité biologique.</p>
    `,
    date: "22 Mar 2025",
    author: "Sophie Dubois",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
    category: "Agriculture Durable",
    slug: "agriculture-durable-afrique-ouest",
    tags: ["agriculture durable", "afrique de l'ouest", "techniques", "environnement"]
  },
  {
    id: 2,
    title: "Les avantages des circuits courts pour les producteurs locaux",
    excerpt: "Comment les agriculteurs peuvent bénéficier de la vente directe et des plateformes comme AgriMarket.",
    content: `
      <p>Les circuits courts de distribution représentent une opportunité significative pour les agriculteurs locaux. En éliminant les intermédiaires, ces circuits permettent aux producteurs de récupérer une plus grande part de la valeur ajoutée de leurs produits.</p>
      
      <h2>Une meilleure rémunération</h2>
      <p>En vendant directement aux consommateurs, les agriculteurs peuvent fixer leurs propres prix et ne sont pas soumis aux pressions des grossistes ou des grandes surfaces. Cela leur permet généralement d'obtenir une meilleure rémunération pour leur travail.</p>
      
      <h2>Un contact direct avec les consommateurs</h2>
      <p>Les circuits courts favorisent la création de liens entre producteurs et consommateurs. Ce contact direct permet aux agriculteurs de mieux comprendre les attentes de leurs clients et d'adapter leur offre en conséquence.</p>
      
      <h2>Une valorisation des produits locaux</h2>
      <p>Les circuits courts mettent en avant l'origine locale des produits, ce qui répond à une demande croissante des consommateurs pour des aliments produits près de chez eux, avec un impact environnemental réduit.</p>
      
      <h2>Les plateformes numériques comme catalyseurs</h2>
      <p>Des plateformes comme AgriMarket jouent un rôle essentiel en facilitant la mise en relation entre agriculteurs et consommateurs. Elles offrent une visibilité accrue aux producteurs locaux et simplifient la logistique des ventes directes.</p>
    `,
    date: "15 Mar 2025",
    author: "Jean Leclerc",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200&auto=format&fit=crop",
    category: "Économie Locale",
    slug: "avantages-circuits-courts",
    tags: ["circuits courts", "vente directe", "économie locale", "agriculteurs"]
  },
  {
    id: 3,
    title: "Adaptation au changement climatique: techniques innovantes",
    excerpt: "Des méthodes pratiques pour adapter vos cultures face aux défis du changement climatique.",
    content: `
      <p>Le changement climatique représente un défi majeur pour l'agriculture en Afrique. Des températures plus élevées, des précipitations irrégulières et des événements météorologiques extrêmes nécessitent une adaptation des pratiques agricoles.</p>
      
      <h2>Les variétés résistantes à la sécheresse</h2>
      <p>Des programmes de recherche ont permis de développer des variétés de cultures plus résistantes au manque d'eau. Ces semences améliorées peuvent maintenir des rendements satisfaisants même en conditions difficiles.</p>
      
      <h2>L'agriculture de conservation</h2>
      <p>Cette approche repose sur trois principes : le travail minimal du sol, la couverture permanente du sol et la diversification des cultures. Elle permet de préserver l'humidité du sol et de renforcer sa résilience face aux aléas climatiques.</p>
      
      <h2>Les systèmes d'alerte précoce</h2>
      <p>Des outils technologiques permettent désormais de prédire les événements climatiques et d'alerter les agriculteurs. Ces informations leur permettent d'ajuster leurs pratiques en fonction des prévisions.</p>
      
      <h2>La collecte des eaux de pluie</h2>
      <p>Des infrastructures de collecte et de stockage des eaux de pluie peuvent être mises en place pour faire face aux périodes de sécheresse. Ces réserves d'eau assurent une irrigation régulière des cultures.</p>
    `,
    date: "10 Mar 2025",
    author: "Amadou Diop",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?q=80&w=1200&auto=format&fit=crop",
    category: "Innovation",
    slug: "adaptation-changement-climatique",
    tags: ["changement climatique", "adaptation", "innovation", "résilience"]
  },
  {
    id: 4,
    title: "Comment optimiser la gestion de l'eau dans les cultures maraîchères",
    excerpt: "Techniques d'irrigation efficientes pour économiser l'eau tout en maximisant vos rendements.",
    content: `
      <p>La gestion efficace de l'eau est essentielle pour les cultures maraîchères, particulièrement dans les régions où cette ressource se fait rare. Des techniques d'irrigation adaptées permettent d'économiser l'eau tout en assurant une bonne productivité.</p>
      
      <h2>L'irrigation goutte-à-goutte</h2>
      <p>Ce système délivre l'eau directement au pied des plantes, minimisant ainsi les pertes par évaporation. Il permet une économie d'eau considérable et réduit également le développement des mauvaises herbes.</p>
      
      <h2>Le paillage</h2>
      <p>Le paillage consiste à couvrir le sol autour des plantes avec des matériaux organiques ou synthétiques. Cette pratique limite l'évaporation de l'eau, maintient l'humidité du sol et réduit les besoins en arrosage.</p>
      
      <h2>La programmation de l'irrigation</h2>
      <p>Arroser aux heures les plus fraîches de la journée (tôt le matin ou en soirée) permet de limiter les pertes d'eau par évaporation. Des systèmes automatisés peuvent être utilisés pour optimiser les horaires d'arrosage.</p>
      
      <h2>La récupération des eaux de pluie</h2>
      <p>L'installation de citernes pour collecter l'eau de pluie permet de disposer d'une source d'eau gratuite pour l'irrigation. Cette eau, non chlorée, est particulièrement adaptée aux besoins des plantes.</p>
    `,
    date: "02 Mar 2025",
    author: "Marie Koné",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=1200&auto=format&fit=crop",
    category: "Gestion des Ressources",
    slug: "optimiser-gestion-eau",
    tags: ["irrigation", "eau", "maraîchage", "efficience"]
  },
  {
    id: 5,
    title: "Les certifications biologiques: démarches et avantages",
    excerpt: "Guide complet pour obtenir une certification biologique et valoriser vos produits sur le marché.",
    content: `
      <p>La certification biologique permet aux agriculteurs de valoriser leurs pratiques respectueuses de l'environnement et d'accéder à des marchés spécifiques. Obtenir cette certification nécessite de suivre un processus rigoureux.</p>
      
      <h2>Les étapes de la certification</h2>
      <p>La certification biologique implique une période de conversion (généralement 2 à 3 ans), des inspections régulières et le respect d'un cahier des charges strict concernant les intrants, les pratiques culturales et la traçabilité.</p>
      
      <h2>Les avantages commerciaux</h2>
      <p>Les produits certifiés bio bénéficient généralement d'une valeur ajoutée sur le marché. Ils permettent aux producteurs d'accéder à des consommateurs prêts à payer plus cher pour des produits respectueux de l'environnement et de leur santé.</p>
      
      <h2>Les bénéfices environnementaux</h2>
      <p>L'agriculture biologique contribue à préserver la qualité des sols, la biodiversité et les ressources en eau. Elle limite également l'utilisation de produits chimiques synthétiques potentiellement nocifs.</p>
      
      <h2>Les organismes certificateurs en Afrique</h2>
      <p>Plusieurs organismes sont habilités à délivrer des certifications biologiques en Afrique de l'Ouest. Il est important de choisir un certificateur reconnu sur les marchés visés pour faciliter la commercialisation des produits.</p>
    `,
    date: "25 Fév 2025",
    author: "Paul Mensah",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200&auto=format&fit=crop",
    category: "Agriculture Biologique",
    slug: "certifications-biologiques",
    tags: ["bio", "certification", "agriculture biologique", "valorisation"]
  },
];

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Article non trouvé</p>
        <Button onClick={() => navigate('/resources/blog')}>
          Retour au blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Image d'en-tête */}
        <div className="w-full h-[400px] relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="max-w-4xl">
                <span className="inline-block px-4 py-1 bg-agrimarket-green text-white text-sm font-medium rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                <div className="flex items-center text-white">
                  <div className="flex items-center mr-6">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contenu principal */}
            <div className="lg:w-2/3">
              <Button 
                variant="outline" 
                className="mb-6 flex items-center gap-2" 
                onClick={() => navigate('/resources/blog')}
              >
                <ArrowLeft className="h-4 w-4" /> Retour au blog
              </Button>
              
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Partager:</span>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {blogPosts
                    .filter(p => p.id !== post.id)
                    .slice(0, 3)
                    .map(relatedPost => (
                      <div key={relatedPost.id} className="flex gap-3">
                        <div className="w-20 h-20 shrink-0 overflow-hidden rounded">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/resources/blog/${relatedPost.slug}`}
                            className="font-medium hover:text-agrimarket-green transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                          <p className="text-sm text-gray-500">{relatedPost.date}</p>
                        </div>
                      </div>
                    ))
                  }
                  <Button 
                    variant="outline" 
                    className="w-full mt-2" 
                    asChild
                  >
                    <Link to="/resources/blog">
                      Voir tous les articles
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
