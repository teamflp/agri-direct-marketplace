
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { StarRating } from './StarRating';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Review } from '@/contexts/ReviewContext';

interface ReviewsListProps {
  reviews: Review[];
  onMarkHelpful: (id: number) => void;
  onMarkNotHelpful: (id: number) => void;
}

export function ReviewsList({ reviews, onMarkHelpful, onMarkNotHelpful }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Aucun avis pour le moment.</p>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              {review.userAvatar ? (
                <img src={review.userAvatar} alt={review.userName} />
              ) : (
                <div className="bg-agrimarket-orange text-white flex items-center justify-center h-full">
                  {review.userName.charAt(0)}
                </div>
              )}
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">{review.userName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} size={14} />
                    <span className="text-sm text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="mt-3 text-gray-700">{review.text}</p>
              
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <span>Cet avis vous a-t-il été utile ?</span>
                <div className="flex items-center ml-4 space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-gray-500 hover:text-green-600"
                    onClick={() => onMarkHelpful(review.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{review.helpful}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-gray-500 hover:text-red-600"
                    onClick={() => onMarkNotHelpful(review.id)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>{review.notHelpful}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
