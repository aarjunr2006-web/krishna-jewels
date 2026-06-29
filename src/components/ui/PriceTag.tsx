import React from 'react';
import { formatPrice } from '../../lib/formatPrice';
import { Badge } from './Badge';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  discount,
  size = 'base',
  className = '',
}) => {
  const hasDiscount = originalPrice && originalPrice > price;

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg md:text-xl',
    xl: 'text-2xl md:text-3xl',
  };

  const originalSizeClasses = {
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-sm md:text-base',
    xl: 'text-lg md:text-xl',
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`font-serif font-semibold text-kj-maroon ${sizeClasses[size]}`}>
        {formatPrice(price)}
      </span>
      {hasDiscount && originalPrice && (
        <>
          <span className={`text-gray-400 line-through font-sans ${originalSizeClasses[size]}`}>
            {formatPrice(originalPrice)}
          </span>
          {discount && discount > 0 && (
            <Badge variant="sale" className="ml-1 text-[10px] md:text-[11px]">
              {discount}% OFF
            </Badge>
          )}
        </>
      )}
    </div>
  );
};
export default PriceTag;
