
import { Review } from './types';

// Mock data for initial state - in a real app this would come from an API
export const mockProductReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      productId: 1,
      userId: 2,
      userName: "Lucie Martin",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "Ces légumes sont toujours d'une fraîcheur exceptionnelle. Je les commande chaque semaine !",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 3,
      notHelpful: 0
    },
    {
      id: 2,
      productId: 1,
      userId: 3,
      userName: "Thomas Leroy",
      userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
      rating: 4,
      text: "Très bon panier, grande variété de légumes de saison. J'aurais aimé un peu plus de carottes.",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 1,
      notHelpful: 0
    }
  ],
  2: [
    {
      id: 3,
      productId: 2,
      userId: 1,
      userName: "Martin Pasquier",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Le meilleur miel que j'ai jamais goûté ! Je le recommande vivement.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 7,
      notHelpful: 1
    }
  ]
};

export const mockFarmerReviews: Record<number, Review[]> = {
  1: [
    {
      id: 4,
      farmerId: 1,
      userId: 2,
      userName: "Lucie Martin",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "Sophie est très attentionnée avec ses clients. Ses produits sont toujours de grande qualité.",
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 5,
      notHelpful: 0
    }
  ],
  2: [
    {
      id: 5,
      farmerId: 2,
      userId: 3,
      userName: "Thomas Leroy",
      userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
      rating: 4,
      text: "Jean est très professionnel et ses produits sont excellents.",
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 2,
      notHelpful: 1
    }
  ]
};

export const initialState = {
  productReviews: mockProductReviews,
  farmerReviews: mockFarmerReviews
};
