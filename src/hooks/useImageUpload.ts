
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UseImageUploadOptions {
  bucketName?: string;
  folder?: string;
  maxFileSize?: number; // en MB
  allowedTypes?: string[];
}

interface UploadResult {
  url: string;
  fileName: string;
  size: number;
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const {
    bucketName = 'product-images',
    folder = 'products',
    maxFileSize = 5, // 5MB par défaut
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  } = options;

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFile = (file: File): boolean => {
    // Vérifier le type de fichier
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Type de fichier non supporté",
        description: `Veuillez utiliser un des formats suivants: ${allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`,
        variant: "destructive"
      });
      return false;
    }

    // Vérifier la taille du fichier
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      toast({
        title: "Fichier trop volumineux",
        description: `La taille maximum autorisée est de ${maxFileSize}MB. Votre fichier fait ${fileSizeInMB.toFixed(1)}MB.`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const resizeImage = async (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculer les nouvelles dimensions en gardant le ratio
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Dessiner l'image redimensionnée
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(resizedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const uploadSingleImage = async (file: File): Promise<UploadResult> => {
    if (!validateFile(file)) {
      throw new Error('Invalid file');
    }

    // Redimensionner l'image si nécessaire
    const resizedFile = await resizeImage(file);

    const fileExt = resizedFile.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, resizedFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return {
      url: publicUrl,
      fileName: data.path,
      size: resizedFile.size
    };
  };

  const uploadMultipleImages = async (files: File[]): Promise<UploadResult[]> => {
    setUploading(true);
    setProgress(0);
    
    try {
      const results: UploadResult[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const result = await uploadSingleImage(files[i]);
        results.push(result);
        
        // Mettre à jour le progrès
        setProgress(((i + 1) / files.length) * 100);
      }
      
      return results;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const deleteImage = async (fileName: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);

      if (error) {
        console.error('Delete error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  return {
    uploading,
    progress,
    uploadSingleImage,
    uploadMultipleImages,
    deleteImage,
    validateFile
  };
};
