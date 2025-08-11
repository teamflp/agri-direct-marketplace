
import React from 'react';
import { useReviews } from '@/hooks/useReviews';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StarRating } from './StarRating';
import { ReviewsList } from './ReviewsList';
import { AddReviewForm } from './AddReviewForm';

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { 
    reviews, 
    loading, 
    error, 
    createReview, 
    markHelpful,
    fetchReviews
  } = useReviews();

  // Fetch reviews for this product on component mount
  React.useEffect(() => {
    fetchReviews(productId);
  }, [productId, fetchReviews]);

  // Filter reviews for this product
  const productReviews = reviews.filter(review => review.product_id === productId);

  // Calculate average rating
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length 
    : 0;

  const handleAddReview = async (rating: number, text: string) => {
    try {
      await createReview({
        product_id: productId,
        rating,
        comment: text
      });
      // Refresh reviews after adding
      fetchReviews(productId);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      await markHelpful(reviewId, true);
      // Refresh reviews after marking helpful
      fetchReviews(productId);
    } catch (error) {
      console.error('Failed to mark review as helpful:', error);
    }
  };

  const handleMarkNotHelpful = async (reviewId: string) => {
    try {
      await markHelpful(reviewId, false);
      // Refresh reviews after marking not helpful
      fetchReviews(productId);
    } catch (error) {
      console.error('Failed to mark review as not helpful:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Chargement des avis...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Erreur lors du chargement des avis: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Avis sur {productName}</span>
          <div className="flex items-center space-x-2">
            <StarRating rating={averageRating} />
            <span>
              {averageRating.toFixed(1)} ({productReviews.length} avis)
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
              reviews={productReviews}
              onMarkHelpful={handleMarkHelpful} 
              onMarkNotHelpful={handleMarkNotHelpful}
            />
          </TabsContent>
          
          <TabsContent value="add-review" className="mt-6">
            <AddReviewForm 
              onSubmit={handleAddReview}
              title={`Ajouter un avis pour ${productName}`}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
