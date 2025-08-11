
import React from 'react';
import { Review as LocalReview } from '@/contexts/reviews/types';
import { Review as DbReview } from '@/hooks/useReviews';

// Adapter function to convert Supabase reviews to local review format
export const adaptDbReviewToLocal = (dbReview: DbReview): LocalReview => {
  return {
    id: parseInt(dbReview.id) || Math.random() * 1000000,
    productId: dbReview.product_id ? parseInt(dbReview.product_id) : undefined,
    farmerId: dbReview.farmer_id ? parseInt(dbReview.farmer_id) : undefined,
    userId: parseInt(dbReview.user_id) || 1,
    userName: dbReview.user?.email?.split('@')[0] || 'Utilisateur anonyme',
    userAvatar: undefined,
    rating: dbReview.rating,
    text: dbReview.comment || '',
    date: dbReview.created_at,
    helpful: dbReview.helpful_count,
    notHelpful: dbReview.not_helpful_count
  };
};

// Adapter function to convert local reviews to Supabase review format
export const adaptLocalReviewToDb = (localReview: LocalReview): Partial<DbReview> => {
  return {
    product_id: localReview.productId?.toString(),
    farmer_id: localReview.farmerId?.toString(),
    rating: localReview.rating,
    comment: localReview.text,
    helpful_count: localReview.helpful,
    not_helpful_count: localReview.notHelpful
  };
};
