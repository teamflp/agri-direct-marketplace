
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getOptimizedImageUrl, extractImageArrayFromString } from '@/utils/imageUtils';

interface ProductImageGalleryProps {
  images: string | string[];
  productName: string;
  className?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  className = ''
}) => {
  const imageArray = typeof images === 'string' 
    ? extractImageArrayFromString(images)
    : images;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!imageArray || imageArray.length === 0) {
    return (
      <div className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">📷</span>
          </div>
          <p className="text-sm text-gray-500">Pas d'image disponible</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const mainImage = imageArray[selectedImageIndex];

  return (
    <div className={className}>
      {/* Image principale */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100 relative group">
            <img
              src={getOptimizedImageUrl(mainImage, 600, 600)}
              alt={`${productName} - Image ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            {imageArray.length > 1 && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-between px-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
          <div className="relative">
            <img
              src={getOptimizedImageUrl(mainImage, 1200, 800)}
              alt={`${productName} - Image ${selectedImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            
            {imageArray.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {imageArray.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                {selectedImageIndex + 1} / {imageArray.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Miniatures */}
      {imageArray.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {imageArray.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImageIndex
                  ? 'border-agrimarket-green shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={getOptimizedImageUrl(image, 100, 100)}
                alt={`${productName} - Miniature ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
