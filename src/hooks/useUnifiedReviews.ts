// @ts-nocheck

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UnifiedReview {
  id: string;
  user_id: string;
  product_id?: string;
  farmer_id?: string;
  rating: number;
  comment?: string;
  helpful_count: number;
  not_helpful_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    email: string;
  };
}

export const useUnifiedReviews = () => {
  const [reviews, setReviews] = useState<UnifiedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviews = async (productId?: string, farmerId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (productId) {
        query = query.eq('product_id', productId);
      }
      if (farmerId) {
        query = query.eq('farmer_id', farmerId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData: UnifiedReview[] = (data || []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        product_id: item.product_id,
        farmer_id: item.farmer_id,
        rating: item.rating,
        comment: item.comment,
        helpful_count: item.helpful_count || 0,
        not_helpful_count: item.not_helpful_count || 0,
        created_at: item.created_at,
        updated_at: item.updated_at,
        user: {
          id: item.user_id,
          email: 'user@example.com' // Placeholder since we don't have user profiles yet
        }
      }));
      
      setReviews(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: {
    product_id?: string;
    farmer_id?: string;
    rating: number;
    comment?: string;
  }) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour laisser un avis",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          ...reviewData,
          user_id: user.id
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Transform and add to local state
      const transformedReview: UnifiedReview = {
        id: data.id,
        user_id: data.user_id,
        product_id: data.product_id,
        farmer_id: data.farmer_id,
        rating: data.rating,
        comment: data.comment,
        helpful_count: data.helpful_count || 0,
        not_helpful_count: data.not_helpful_count || 0,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user: {
          id: data.user_id,
          email: user.email || 'user@example.com'
        }
      };
      
      setReviews(prev => [transformedReview, ...prev]);
      
      toast({
        title: "Avis ajouté",
        description: "Merci d'avoir partagé votre avis!",
      });
      
      return transformedReview;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const markHelpful = async (reviewId: string, isHelpful: boolean) => {
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review) return;

      const updateData = isHelpful 
        ? { helpful_count: review.helpful_count + 1 }
        : { not_helpful_count: review.not_helpful_count + 1 };

      const { error } = await supabase
        .from('reviews')
        .update(updateData)
        .eq('id', reviewId);
      
      if (error) throw error;

      // Update local state
      setReviews(prev => prev.map(r => 
        r.id === reviewId 
          ? { ...r, ...updateData }
          : r
      ));

    } catch (err) {
      console.error('Error marking review helpful:', err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'avis",
        variant: "destructive"
      });
    }
  };

  const calculateAverageRating = (reviewsList: UnifiedReview[] = reviews): number => {
    if (reviewsList.length === 0) return 0;
    const sum = reviewsList.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviewsList.length).toFixed(1));
  };

  const getProductReviews = (productId: string): UnifiedReview[] => {
    return reviews.filter(review => review.product_id === productId);
  };

  const getFarmerReviews = (farmerId: string): UnifiedReview[] => {
    return reviews.filter(review => review.farmer_id === farmerId);
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
    markHelpful,
    calculateAverageRating,
    getProductReviews,
    getFarmerReviews
  };
};
