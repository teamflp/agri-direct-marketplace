
import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductImageUploaderProps {
  onImagesChange: (images: string[]) => void;
  initialImages?: string[];
  productName?: string;
}

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  onImagesChange,
  initialImages = [],
  productName = 'produit'
}) => {
  const [images, setImages] = useState<string[]>(initialImages);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const handleImagesUploaded = (uploadedImages: string[]) => {
    setImages(uploadedImages);
    onImagesChange(uploadedImages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos du produit</CardTitle>
        <CardDescription>
          Ajoutez des photos attrayantes de votre {productName}. 
          La première image sera utilisée comme image principale.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageUploader
          onImagesUploaded={handleImagesUploaded}
          existingImages={images}
          maxImages={5}
          bucketName="product-images"
          folder="products"
        />
      </CardContent>
    </Card>
  );
};

export default ProductImageUploader;
