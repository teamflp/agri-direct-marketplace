
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Types for reviews
export type Review = {
  id: number;
  productId?: number;
  farmerId?: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
  notHelpful: number;
};

type ReviewState = {
  productReviews: Record<number, Review[]>;
  farmerReviews: Record<number, Review[]>;
};

type ReviewAction =
  | { type: 'ADD_PRODUCT_REVIEW'; payload: { productId: number; review: Review } }
  | { type: 'ADD_FARMER_REVIEW'; payload: { farmerId: number; review: Review } }
  | { type: 'MARK_REVIEW_HELPFUL'; payload: { id: number; productId?: number; farmerId?: number } }
  | { type: 'MARK_REVIEW_NOT_HELPFUL'; payload: { id: number; productId?: number; farmerId?: number } }
  | { type: 'LOAD_REVIEWS'; payload: ReviewState };

type ReviewContextType = {
  reviews: ReviewState;
  addProductReview: (productId: number, rating: number, text: string) => void;
  addFarmerReview: (farmerId: number, rating: number, text: string) => void;
  markReviewHelpful: (id: number, productId?: number, farmerId?: number) => void;
  markReviewNotHelpful: (id: number, productId?: number, farmerId?: number) => void;
  getProductReviews: (productId: number) => Review[];
  getFarmerReviews: (farmerId: number) => Review[];
  getAverageProductRating: (productId: number) => number;
  getAverageFarmerRating: (farmerId: number) => number;
};

// Mock data for initial state - in a real app this would come from an API
const mockProductReviews: Record<number, Review[]> = {
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

const mockFarmerReviews: Record<number, Review[]> = {
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

const initialState: ReviewState = {
  productReviews: mockProductReviews,
  farmerReviews: mockFarmerReviews
};

// Reducer function to handle review actions
const reviewReducer = (state: ReviewState, action: ReviewAction): ReviewState => {
  switch (action.type) {
    case 'ADD_PRODUCT_REVIEW': {
      const { productId, review } = action.payload;
      const existingReviews = state.productReviews[productId] || [];
      
      return {
        ...state,
        productReviews: {
          ...state.productReviews,
          [productId]: [...existingReviews, review]
        }
      };
    }
    
    case 'ADD_FARMER_REVIEW': {
      const { farmerId, review } = action.payload;
      const existingReviews = state.farmerReviews[farmerId] || [];
      
      return {
        ...state,
        farmerReviews: {
          ...state.farmerReviews,
          [farmerId]: [...existingReviews, review]
        }
      };
    }
    
    case 'MARK_REVIEW_HELPFUL': {
      const { id, productId, farmerId } = action.payload;
      
      if (productId) {
        return {
          ...state,
          productReviews: {
            ...state.productReviews,
            [productId]: (state.productReviews[productId] || []).map(review =>
              review.id === id ? { ...review, helpful: review.helpful + 1 } : review
            )
          }
        };
      } else if (farmerId) {
        return {
          ...state,
          farmerReviews: {
            ...state.farmerReviews,
            [farmerId]: (state.farmerReviews[farmerId] || []).map(review =>
              review.id === id ? { ...review, helpful: review.helpful + 1 } : review
            )
          }
        };
      }
      
      return state;
    }
    
    case 'MARK_REVIEW_NOT_HELPFUL': {
      const { id, productId, farmerId } = action.payload;
      
      if (productId) {
        return {
          ...state,
          productReviews: {
            ...state.productReviews,
            [productId]: (state.productReviews[productId] || []).map(review =>
              review.id === id ? { ...review, notHelpful: review.notHelpful + 1 } : review
            )
          }
        };
      } else if (farmerId) {
        return {
          ...state,
          farmerReviews: {
            ...state.farmerReviews,
            [farmerId]: (state.farmerReviews[farmerId] || []).map(review =>
              review.id === id ? { ...review, notHelpful: review.notHelpful + 1 } : review
            )
          }
        };
      }
      
      return state;
    }
    
    case 'LOAD_REVIEWS':
      return action.payload;
      
    default:
      return state;
  }
};

// Create context
const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

// Provider component
export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, dispatch] = useReducer(reviewReducer, initialState, () => {
    if (typeof window === 'undefined') return initialState;
    
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : initialState;
  });
  
  // Save to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);
  
  // Generate a unique ID
  const generateId = (): number => {
    return Math.floor(Math.random() * 1000000);
  };

  // Review actions
  const addProductReview = (productId: number, rating: number, text: string) => {
    if (rating < 1 || rating > 5 || !text.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez fournir une note entre 1 et 5 et un texte d'avis.",
        variant: "destructive"
      });
      return;
    }
    
    const review: Review = {
      id: generateId(),
      productId,
      userId: 1, // Assuming current user ID is 1 (Martin Pasquier)
      userName: "Martin Pasquier",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating,
      text: text.trim(),
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0
    };
    
    dispatch({
      type: 'ADD_PRODUCT_REVIEW',
      payload: { productId, review }
    });
    
    toast({
      title: "Avis ajouté",
      description: "Merci d'avoir partagé votre avis sur ce produit!",
    });
  };
  
  const addFarmerReview = (farmerId: number, rating: number, text: string) => {
    if (rating < 1 || rating > 5 || !text.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez fournir une note entre 1 et 5 et un texte d'avis.",
        variant: "destructive"
      });
      return;
    }
    
    const review: Review = {
      id: generateId(),
      farmerId,
      userId: 1, // Assuming current user ID is 1 (Martin Pasquier)
      userName: "Martin Pasquier",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating,
      text: text.trim(),
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0
    };
    
    dispatch({
      type: 'ADD_FARMER_REVIEW',
      payload: { farmerId, review }
    });
    
    toast({
      title: "Avis ajouté",
      description: "Merci d'avoir partagé votre avis sur cet agriculteur!",
    });
  };
  
  const markReviewHelpful = (id: number, productId?: number, farmerId?: number) => {
    if (!productId && !farmerId) return;
    
    dispatch({
      type: 'MARK_REVIEW_HELPFUL',
      payload: { id, productId, farmerId }
    });
  };
  
  const markReviewNotHelpful = (id: number, productId?: number, farmerId?: number) => {
    if (!productId && !farmerId) return;
    
    dispatch({
      type: 'MARK_REVIEW_NOT_HELPFUL',
      payload: { id, productId, farmerId }
    });
  };
  
  const getProductReviews = (productId: number): Review[] => {
    return reviews.productReviews[productId] || [];
  };
  
  const getFarmerReviews = (farmerId: number): Review[] => {
    return reviews.farmerReviews[farmerId] || [];
  };
  
  const getAverageProductRating = (productId: number): number => {
    const productReviews = reviews.productReviews[productId] || [];
    if (productReviews.length === 0) return 0;
    
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / productReviews.length).toFixed(1));
  };
  
  const getAverageFarmerRating = (farmerId: number): number => {
    const farmerReviews = reviews.farmerReviews[farmerId] || [];
    if (farmerReviews.length === 0) return 0;
    
    const sum = farmerReviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / farmerReviews.length).toFixed(1));
  };
  
  return (
    <ReviewContext.Provider 
      value={{ 
        reviews, 
        addProductReview, 
        addFarmerReview, 
        markReviewHelpful, 
        markReviewNotHelpful,
        getProductReviews,
        getFarmerReviews,
        getAverageProductRating,
        getAverageFarmerRating
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

// Custom hook to use the review context
export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};
