import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Farmer {
  id: string;
  user_id: string;
  name: string;
  farm_name?: string | null;
  description?: string | null;
  location: string;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  distance?: number | null;
  is_certified: boolean | null;
  rating: number | null;
  reviews_count: number | null;
  delivery_zones?: string[] | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useFarmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('farmers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setFarmers(data as any || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const getFarmerById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors du chargement');
    }
  };

  const createFarmer = async (farmerData: Omit<Farmer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .insert([farmerData])
        .select()
        .single();
      
      if (error) throw error;
      await fetchFarmers();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création');
    }
  };

  const updateFarmer = async (id: string, farmerData: Partial<Farmer>) => {
    try {
      const { data, error } = await supabase
        .from('farmers')
        .update(farmerData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      await fetchFarmers();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return {
    farmers,
    loading,
    error,
    refetch: fetchFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer
  };
};