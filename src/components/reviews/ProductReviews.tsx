
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StarRating } from './StarRating';
import { ReviewsList } from './ReviewsList';
import { AddReviewForm } from './AddReviewForm';
import { useUnifiedReviews } from '@/hooks/useUnifiedReviews';

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
    fetchReviews,
    getProductReviews,
    calculateAverageRating
  } = useUnifiedReviews();

  // Fetch reviews for this product on component mount
  React.useEffect(() => {
    fetchReviews(productId);
  }, [productId]);

  // Filter reviews for this product
  const productReviews = getProductReviews(productId);
  const averageRating = calculateAverageRating(productReviews);

  const handleAddReview = async (rating: number, text: string) => {
    try {
      await createReview({
        product_id: productId,
        rating,
        comment: text
      });
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    await markHelpful(reviewId, true);
  };

  const handleMarkNotHelpful = async (reviewId: string) => {
    await markHelpful(reviewId, false);
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
