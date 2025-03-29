
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Review, ReviewContextType, ReviewState } from './types';
import { initialState } from './mockData';
import { reviewReducer } from './reviewReducer';
import { generateId, calculateAverageProductRating, calculateAverageFarmerRating } from './reviewUtils';

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
    return calculateAverageProductRating(productReviews);
  };
  
  const getAverageFarmerRating = (farmerId: number): number => {
    const farmerReviews = reviews.farmerReviews[farmerId] || [];
    return calculateAverageFarmerRating(farmerReviews);
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
