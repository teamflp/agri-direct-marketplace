
import { supabase } from '@/integrations/supabase/client';

/**
 * Configuration et fonctions utilitaires pour Supabase Storage
 */

export const STORAGE_BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  FARMER_AVATARS: 'farmer-avatars',
  USER_AVATARS: 'user-avatars'
} as const;

export const createStorageBuckets = async () => {
  try {
    // Créer le bucket pour les images de produits
    const { data: productBucket, error: productError } = await supabase.storage
      .createBucket(STORAGE_BUCKETS.PRODUCT_IMAGES, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });

    if (productError && !productError.message.includes('already exists')) {
      console.error('Erreur création bucket produits:', productError);
    }

    // Créer le bucket pour les avatars d'agriculteurs
    const { data: farmerBucket, error: farmerError } = await supabase.storage
      .createBucket(STORAGE_BUCKETS.FARMER_AVATARS, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        fileSizeLimit: 2097152 // 2MB
      });

    if (farmerError && !farmerError.message.includes('already exists')) {
      console.error('Erreur création bucket agriculteurs:', farmerError);
    }

    // Créer le bucket pour les avatars d'utilisateurs
    const { data: userBucket, error: userError } = await supabase.storage
      .createBucket(STORAGE_BUCKETS.USER_AVATARS, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        fileSizeLimit: 2097152 // 2MB
      });

    if (userError && !userError.message.includes('already exists')) {
      console.error('Erreur création bucket utilisateurs:', userError);
    }

    return {
      productBucket: productBucket || { name: STORAGE_BUCKETS.PRODUCT_IMAGES },
      farmerBucket: farmerBucket || { name: STORAGE_BUCKETS.FARMER_AVATARS },
      userBucket: userBucket || { name: STORAGE_BUCKETS.USER_AVATARS }
    };
  } catch (error) {
    console.error('Erreur lors de la création des buckets:', error);
    return null;
  }
};

export const getPublicUrl = (bucketName: string, fileName: string): string => {
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const uploadFile = async (
  bucketName: string,
  fileName: string,
  file: File,
  options?: {
    cacheControl?: string;
    upsert?: boolean;
  }
) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: options?.cacheControl || '3600',
      upsert: options?.upsert || false
    });

  if (error) {
    throw error;
  }

  return {
    data,
    publicUrl: getPublicUrl(bucketName, fileName)
  };
};

export const deleteFile = async (bucketName: string, fileName: string) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([fileName]);

  if (error) {
    throw error;
  }

  return data;
};

export const listFiles = async (bucketName: string, folder?: string) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folder, {
      limit: 100,
      offset: 0
    });

  if (error) {
    throw error;
  }

  return data;
};
