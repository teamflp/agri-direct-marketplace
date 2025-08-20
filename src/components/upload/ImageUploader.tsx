
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImagesUploaded: (images: string[]) => void;
  existingImages?: string[];
  maxImages?: number;
  bucketName: string;
  folder: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesUploaded,
  existingImages = [],
  maxImages = 5,
  bucketName,
  folder
}) => {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images autorisées`);
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of acceptedFiles) {
        // Créer une prévisualisation
        const previewUrl = URL.createObjectURL(file);
        setPreviews(prev => ({ ...prev, [file.name]: previewUrl }));

        // Redimensionner l'image
        const resizedFile = await resizeImage(file, 800, 600);
        
        // Générer un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Upload vers Supabase Storage
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, resizedFile);

        if (error) {
          console.error('Upload error:', error);
          toast.error(`Erreur upload ${file.name}: ${error.message}`);
          continue;
        }

        // Obtenir l'URL publique
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        uploadedUrls.push(urlData.publicUrl);
      }

      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesUploaded(newImages);
      
      toast.success(`${uploadedUrls.length} image(s) uploadée(s) avec succès`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
      // Nettoyer les prévisualisations
      Object.values(previews).forEach(url => URL.revokeObjectURL(url));
      setPreviews({});
    }
  }, [images, maxImages, bucketName, folder, onImagesUploaded, previews]);

  const removeImage = async (index: number) => {
    const imageUrl = images[index];
    
    try {
      // Extraire le path du fichier depuis l'URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `${folder}/${fileName}`;

      // Supprimer de Supabase Storage
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        toast.error('Erreur lors de la suppression');
        return;
      }

      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesUploaded(newImages);
      toast.success('Image supprimée');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxImages - images.length,
    disabled: uploading || images.length >= maxImages
  });

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <Card 
        {...getRootProps()} 
        className={`border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-agrimarket-green bg-green-50' 
            : 'border-gray-300 hover:border-agrimarket-green'
        } ${uploading || images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <CardContent className="flex flex-col items-center justify-center py-8">
          <input {...getInputProps()} />
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agrimarket-green mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Upload en cours...</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragActive ? 'Déposez les images ici' : 'Glissez-déposez vos images'}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                ou cliquez pour sélectionner ({images.length}/{maxImages})
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WEBP jusqu'à 50MB
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prévisualisation des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-agrimarket-green text-white px-2 py-1 rounded text-xs">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Fonction utilitaire pour redimensionner les images
const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Calculer les nouvelles dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir en blob puis en fichier
      canvas.toBlob((blob) => {
        const resizedFile = new File([blob!], file.name, {
          type: file.type,
          lastModified: Date.now()
        });
        resolve(resizedFile);
      }, file.type, 0.8);
    };

    img.src = URL.createObjectURL(file);
  });
};

export default ImageUploader;
