import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Review {
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

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchReviews = async (productId?: string, farmerId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('reviews')
        .select(`*`)
        .order('created_at', { ascending: false });

      if (productId) {
        query = query.eq('product_id', productId);
      }
      if (farmerId) {
        query = query.eq('farmer_id', farmerId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
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
    if (!user) throw new Error('Utilisateur non connecté');

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
      await fetchReviews(reviewData.product_id, reviewData.farmer_id);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création');
    }
  };

  const updateReview = async (id: string, reviewData: Partial<Review>) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .update(reviewData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      await fetchReviews();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchReviews();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la suppression');
    }
  };

  const markHelpful = async (id: string, isHelpful: boolean) => {
    try {
      const review = reviews.find(r => r.id === id);
      if (!review) return;

      const updateData = isHelpful 
        ? { helpful_count: review.helpful_count + 1 }
        : { not_helpful_count: review.not_helpful_count + 1 };

      await updateReview(id, updateData);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
    markHelpful
  };
};