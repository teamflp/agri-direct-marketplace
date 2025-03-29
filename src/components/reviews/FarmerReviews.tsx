
import React from 'react';
import { useReviews } from '@/contexts/ReviewContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StarRating } from './StarRating';
import { ReviewsList } from './ReviewsList';
import { AddReviewForm } from './AddReviewForm';

interface FarmerReviewsProps {
  farmerId: number;
  farmerName: string;
}

export function FarmerReviews({ farmerId, farmerName }: FarmerReviewsProps) {
  const { 
    getFarmerReviews, 
    addFarmerReview, 
    markReviewHelpful, 
    markReviewNotHelpful,
    getAverageFarmerRating
  } = useReviews();
  
  const reviews = getFarmerReviews(farmerId);
  const averageRating = getAverageFarmerRating(farmerId);

  const handleMarkHelpful = (id: number) => {
    markReviewHelpful(id, undefined, farmerId);
  };

  const handleMarkNotHelpful = (id: number) => {
    markReviewNotHelpful(id, undefined, farmerId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Avis sur {farmerName}</span>
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
              onSubmit={(rating, text) => addFarmerReview(farmerId, rating, text)}
              title={`Ajouter un avis pour ${farmerName}`}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
