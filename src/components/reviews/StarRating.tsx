
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  size = 16,
  className = '',
  interactive = false,
  onRatingChange
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  // Create array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    const isFilled = interactive 
      ? hoverRating > 0 
        ? starNumber <= hoverRating 
        : starNumber <= rating
      : starNumber <= rating;
    
    // Determine if we need to show a half-filled star
    const isHalfFilled = !interactive && !isFilled && starNumber === Math.ceil(rating) && rating % 1 !== 0;
    
    return (
      <Star
        key={starNumber}
        size={size}
        className={`${
          isFilled
            ? 'fill-yellow-400 text-yellow-400'
            : isHalfFilled
            ? 'fill-gradient text-yellow-400'
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer' : ''} transition-colors`}
        onClick={() => {
          if (interactive && onRatingChange) {
            onRatingChange(starNumber);
          }
        }}
        onMouseEnter={() => {
          if (interactive) {
            setHoverRating(starNumber);
          }
        }}
        onMouseLeave={() => {
          if (interactive) {
            setHoverRating(0);
          }
        }}
        style={
          isHalfFilled
            ? {
                background: `linear-gradient(90deg, #FACC15 50%, transparent 50%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }
            : undefined
        }
      />
    );
  });

  return (
    <div className={`flex items-center ${className}`}>
      {stars}
      {interactive && (
        <span className="ml-2 text-sm text-gray-500">
          {hoverRating > 0 ? hoverRating : rating}/5
        </span>
      )}
    </div>
  );
}
