import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  count,
  size = 16,
  interactive = false,
  onChange,
  className = '',
}) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4 && rating % 1 <= 0.8;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 font-sans ${className}`}>
      <div className="flex items-center text-kj-gold">
        {/* Full Stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            fill="currentColor"
            strokeWidth={1.5}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => interactive && onChange?.(i + 1)}
          />
        ))}

        {/* Half Star */}
        {hasHalf && (
          <StarHalf
            size={size}
            fill="currentColor"
            strokeWidth={1.5}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => interactive && onChange?.(fullStars + 1)}
          />
        )}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }).map((_, i) => {
          const index = fullStars + (hasHalf ? 1 : 0) + i;
          return (
            <Star
              key={`empty-${i}`}
              size={size}
              strokeWidth={1.5}
              className={interactive ? 'cursor-pointer hover:text-kj-gold' : ''}
              onClick={() => interactive && onChange?.(index + 1)}
            />
          );
        })}
      </div>

      {count !== undefined && (
        <span className="text-xs text-gray-500 ml-1">
          ({count} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};
export default StarRating;
