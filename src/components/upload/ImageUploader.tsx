
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImagesUploaded: (urls: string[]) => void;
  existingImages?: string[];
  maxImages?: number;
  bucketName?: string;
  folder?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesUploaded,
  existingImages = [],
  maxImages = 5,
  bucketName = 'product-images',
  folder = 'products'
}) => {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
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

    return publicUrl;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      toast({
        title: "Limite d'images atteinte",
        description: `Vous pouvez télécharger maximum ${maxImages} images.`,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = acceptedFiles.map(uploadImage);
      const uploadedUrls = await Promise.all(uploadPromises);
      
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesUploaded(newImages);
      
      toast({
        title: "Images téléchargées",
        description: `${uploadedUrls.length} image(s) téléchargée(s) avec succès.`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur s'est produite lors du téléchargement des images.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  }, [images, maxImages, onImagesUploaded]);

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesUploaded(newImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    disabled: uploading || images.length >= maxImages,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  });

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <Card className={`border-2 border-dashed transition-colors ${
        isDragActive ? 'border-agrimarket-green bg-green-50' : 'border-gray-300'
      } ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-agrimarket-green'}`}>
        <CardContent className="p-6">
          <div {...getRootProps()} className="text-center">
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-agrimarket-green" />
                <p className="text-sm text-gray-600">Téléchargement en cours...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {images.length >= maxImages 
                    ? `Limite de ${maxImages} images atteinte`
                    : 'Glissez-déposez vos images ici ou cliquez pour sélectionner'
                  }
                </p>
                <p className="text-xs text-gray-400">
                  Formats acceptés: JPEG, PNG, WebP (max 5MB par image)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Aperçu des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-agrimarket-green text-white px-2 py-1 text-xs rounded">
                      Principal
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Informations supplémentaires */}
      <div className="text-xs text-gray-500">
        {images.length > 0 && (
          <p>{images.length}/{maxImages} image(s) téléchargée(s)</p>
        )}
        <p>La première image sera utilisée comme image principale du produit.</p>
      </div>
    </div>
  );
};

export default ImageUploader;
