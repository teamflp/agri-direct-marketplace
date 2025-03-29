
import { BlogPostType, EventType } from '../types/blogTypes';
import { v4 as uuidv4 } from 'uuid';

export const mockBlogPosts: BlogPostType[] = [
  {
    id: uuidv4(),
    title: "Les avantages de l'agriculture biologique",
    content: "L'agriculture biologique est un système de production qui soutient la santé des sols, des écosystèmes et des personnes. Elle s'appuie sur des processus écologiques, la biodiversité et des cycles adaptés aux conditions locales, plutôt que sur l'utilisation d'intrants ayant des effets adverses. L'agriculture biologique allie tradition, innovation et science au bénéfice de l'environnement commun et promeut des relations justes et une bonne qualité de vie pour tous ceux qui y sont impliqués.",
    excerpt: "Découvrez comment l'agriculture biologique bénéficie à la fois à l'environnement et à votre santé.",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=500&h=300&fit=crop",
    date: "2023-06-15",
    author: "Sophie Dubois",
    tags: ["Agriculture biologique", "Environnement", "Santé"],
    likes: 24,
    comments: 8,
    status: "published"
  },
  {
    id: uuidv4(),
    title: "Comment démarrer un potager écologique",
    content: "Créer un potager écologique est plus simple qu'il n'y paraît. Commencez par choisir un emplacement ensoleillé et à l'abri du vent. Préparez le sol en y ajoutant du compost maison. Choisissez des variétés adaptées à votre région et diversifiez les espèces pour favoriser la biodiversité. Évitez les produits chimiques en utilisant des méthodes naturelles comme les purins de plantes et la rotation des cultures. Économisez l'eau en installant un système de récupération d'eau de pluie et en utilisant le paillage.",
    excerpt: "Guide étape par étape pour créer et entretenir un potager respectueux de l'environnement.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500&h=300&fit=crop",
    date: "2023-05-22",
    author: "Sophie Dubois",
    tags: ["Jardinage", "Écologie", "Potager"],
    likes: 42,
    comments: 15,
    status: "published"
  },
  {
    id: uuidv4(),
    title: "Les meilleures pratiques pour la conservation des semences",
    content: "La conservation des semences est une pratique ancestrale qui permet de préserver la biodiversité et l'autonomie alimentaire. Pour conserver efficacement vos semences, assurez-vous qu'elles soient bien sèches avant de les stocker. Utilisez des contenants hermétiques comme des bocaux en verre ou des sachets en papier. Étiquetez soigneusement avec le nom de la variété et la date de récolte. Stockez dans un endroit frais, sec et à l'abri de la lumière. Vérifiez régulièrement l'absence d'humidité ou de moisissures.",
    excerpt: "Apprenez à conserver vos semences pour maintenir la diversité génétique et réduire vos coûts.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop",
    date: "2023-04-10",
    author: "Sophie Dubois",
    tags: ["Semences", "Biodiversité", "Autonomie"],
    likes: 18,
    comments: 5,
    status: "published"
  }
];

export const mockEvents: EventType[] = [
  {
    id: uuidv4(),
    title: "Marché fermier de printemps",
    description: "Venez découvrir les produits frais de saison directement auprès des producteurs locaux. Légumes de printemps, fromages, miel, pain artisanal et bien d'autres délices vous attendent. Une occasion parfaite pour rencontrer ceux qui cultivent vos aliments et soutenir l'économie locale.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=300&fit=crop",
    location: "Place du village, Saint-Martin-sur-Loire",
    startDate: "2023-08-15T08:00:00",
    endDate: "2023-08-15T13:00:00",
    organizer: "Association des Agriculteurs Locaux",
    tags: ["Marché", "Produits locaux", "Printemps"],
    attendees: 180,
    status: "upcoming"
  },
  {
    id: uuidv4(),
    title: "Atelier de compostage et permaculture",
    description: "Apprenez les techniques de base du compostage et découvrez les principes de la permaculture lors de cet atelier pratique. Nous aborderons la création d'un composteur, les matières à composter, et comment utiliser le compost dans votre jardin. La seconde partie sera consacrée à l'introduction à la permaculture avec des exemples concrets d'application.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&h=300&fit=crop",
    location: "Ferme des Quatre Saisons, Route de la Vallée 12",
    startDate: "2023-07-22T14:00:00",
    endDate: "2023-07-22T17:00:00",
    organizer: "Sophie Dubois",
    tags: ["Compostage", "Permaculture", "Formation"],
    attendees: 25,
    status: "upcoming"
  },
  {
    id: uuidv4(),
    title: "Journée portes ouvertes à la ferme",
    description: "Une journée entière pour découvrir notre ferme, nos méthodes de culture et nos animaux. Au programme : visite guidée des installations, démonstration de traite, atelier fabrication de fromage, dégustation de produits fermiers, et activités pour les enfants avec contact des animaux. Restauration sur place avec des produits de la ferme.",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=500&h=300&fit=crop",
    location: "Ferme des Quatre Saisons, Route de la Vallée 12",
    startDate: "2023-09-05T10:00:00",
    endDate: "2023-09-05T18:00:00",
    organizer: "Sophie Dubois",
    tags: ["Portes ouvertes", "Famille", "Animaux"],
    attendees: 120,
    status: "upcoming"
  }
];
