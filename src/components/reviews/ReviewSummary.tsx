
import React from 'react';
import { StarRating } from './StarRating';
import { UnifiedReview } from '@/hooks/useUnifiedReviews';

interface ReviewSummaryProps {
  reviews: UnifiedReview[];
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ReviewSummary({ 
  reviews, 
  showCount = true, 
  size = 'sm',
  className = '' 
}: ReviewSummaryProps) {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const starSize = size === 'sm' ? 12 : size === 'md' ? 16 : 20;
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <StarRating rating={averageRating} size={starSize} />
      <span className={`text-gray-600 ${textSize}`}>
        {averageRating.toFixed(1)}
        {showCount && ` (${reviews.length})`}
      </span>
    </div>
  );
}
