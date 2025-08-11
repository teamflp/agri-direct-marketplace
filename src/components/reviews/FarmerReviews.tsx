
import React from 'react';
import { useReviews } from '@/contexts/ReviewContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StarRating } from './StarRating';
import { ReviewsList } from './ReviewsList';
import { AddReviewForm } from './AddReviewForm';
import { adaptLocalReviewToDb } from './ReviewsAdapter';

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
  
  const localReviews = getFarmerReviews(farmerId);
  const averageRating = getAverageFarmerRating(farmerId);

  // Convert local reviews to the format expected by ReviewsList
  const adaptedReviews = localReviews.map(review => ({
    id: review.id.toString(),
    user_id: review.userId.toString(),
    farmer_id: review.farmerId?.toString(),
    rating: review.rating,
    comment: review.text,
    helpful_count: review.helpful,
    not_helpful_count: review.notHelpful,
    created_at: review.date,
    updated_at: review.date,
    user: {
      id: review.userId.toString(),
      email: `${review.userName}@example.com`
    }
  }));

  const handleMarkHelpful = (id: string) => {
    const numericId = parseInt(id);
    markReviewHelpful(numericId, undefined, farmerId);
  };

  const handleMarkNotHelpful = (id: string) => {
    const numericId = parseInt(id);
    markReviewNotHelpful(numericId, undefined, farmerId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Avis sur {farmerName}</span>
          <div className="flex items-center space-x-2">
            <StarRating rating={averageRating} />
            <span>
              {averageRating.toFixed(1)} ({localReviews.length} avis)
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
              reviews={adaptedReviews} 
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
