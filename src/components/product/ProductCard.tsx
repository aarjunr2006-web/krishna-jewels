import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../lib/types';
import { PriceTag } from '../ui/PriceTag';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  
  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.setIsOpen);

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    // Add default variant (usually the first one if available)
    const variant = product.variants && product.variants.length > 0 ? product.variants[0] : 'Standard';
    addToCart(product, variant, 1);
    
    setTimeout(() => {
      setAdding(false);
      openCart(true);
    }, 600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  // Determine images
  const primaryImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative bg-kj-ivory border border-kj-gold/10 hover:border-kj-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full shining-ui"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Section */}
      <Link to={`/products/${product.slug}`} className="block relative overflow-hidden aspect-[4/5] bg-gray-100">
        
        {/* Wishlist Heart Indicator */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 bg-kj-ivory/80 backdrop-blur-xs p-2 rounded-full border border-kj-gold/10 hover:bg-kj-maroon hover:text-kj-ivory text-kj-maroon transition-all duration-300 cursor-pointer focus:outline-none"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} className={isInWishlist ? 'scale-110' : ''} />
        </button>

        {/* Stock Status Badge */}
        {!product.inStock && (
          <span className="absolute top-3 left-3 z-10 bg-kj-charcoal/80 text-kj-ivory text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1">
            Sold Out
          </span>
        )}

        {/* Discount Badge */}
        {product.discount > 0 && product.inStock && (
          <span className="absolute top-3 left-3 z-10 bg-kj-rose text-kj-ivory text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1">
            {product.discount}% OFF
          </span>
        )}

        {/* Hover Swapping Images */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
        <img
          src={hoverImage}
          alt={`${product.name} alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Decorative corner highlights on hover */}
        <div className="absolute inset-0 border border-kj-gold/0 group-hover:border-kj-gold/20 pointer-events-none transition-all duration-300 m-1.5">
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-kj-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-kj-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-kj-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-kj-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-grow bg-kj-ivory relative z-10">
        <span className="text-[10px] uppercase font-sans tracking-widest text-kj-gold font-bold mb-1">
          {product.categorySlug.replace('-', ' ')}
        </span>
        <Link
          to={`/products/${product.slug}`}
          className="font-serif text-sm md:text-base font-bold text-kj-charcoal hover:text-kj-maroon transition-colors duration-200 line-clamp-1 mb-1 focus:outline-none"
        >
          {product.name}
        </Link>
        
        {/* Pricing Block */}
        <PriceTag
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          size="sm"
          className="mt-auto pt-2"
        />

        {/* Add to Bag Button (Hover desktop, Always visible on mobile) */}
        <div className="mt-4 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToBag}
            disabled={!product.inStock || adding}
            className={`w-full py-2.5 px-4 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
              !product.inStock
                ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                : adding
                ? 'bg-kj-gold text-kj-charcoal border-kj-gold'
                : 'bg-kj-maroon text-kj-ivory border-kj-maroon hover:bg-kj-ivory hover:text-kj-maroon'
            }`}
          >
            <ShoppingBag size={14} />
            {adding ? 'Adding...' : !product.inStock ? 'Out of Stock' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
