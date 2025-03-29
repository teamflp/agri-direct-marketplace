
import React, { useState } from 'react';
import { useReviews } from '@/contexts/ReviewContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StarRating } from './StarRating';
import { ReviewsList } from './ReviewsList';
import { AddReviewForm } from './AddReviewForm';

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { 
    getProductReviews, 
    addProductReview, 
    markReviewHelpful, 
    markReviewNotHelpful,
    getAverageProductRating
  } = useReviews();
  
  const reviews = getProductReviews(productId);
  const averageRating = getAverageProductRating(productId);

  const handleMarkHelpful = (id: number) => {
    markReviewHelpful(id, productId);
  };

  const handleMarkNotHelpful = (id: number) => {
    markReviewNotHelpful(id, productId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Avis sur {productName}</span>
          <div className="flex items-center space-x-2">
            <StarRating rating={averageRating} />
            <span>
              {averageRating.toFixed(1)} ({reviews.length} avis)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all-reviews">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-reviews">Tous les avis</TabsTrigger>
            <TabsTrigger value="add-review">Ajouter un avis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-reviews" className="mt-6">
            <ReviewsList 
              reviews={reviews} 
              onMarkHelpful={handleMarkHelpful} 
              onMarkNotHelpful={handleMarkNotHelpful}
            />
          </TabsContent>
          
          <TabsContent value="add-review" className="mt-6">
            <AddReviewForm 
              onSubmit={(rating, text) => addProductReview(productId, rating, text)}
              title={`Ajouter un avis pour ${productName}`}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
