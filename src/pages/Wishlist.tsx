import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../lib/formatPrice';

export const Wishlist: React.FC = () => {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.setIsOpen);

  const handleMoveToBag = (product: any) => {
    const variant = product.variants && product.variants.length > 0 ? product.variants[0] : 'Standard';
    addToCart(product, variant, 1);
    removeItem(product.id);
    openCart(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory">
      
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon flex items-center gap-2">
          <Heart className="fill-kj-maroon text-kj-maroon" size={24} /> YOUR WISHLIST
        </h1>
        <p className="font-sans text-xs md:text-sm text-gray-500 mt-1">
          Review your saved heirloom treasures. Move them to your bag whenever you are ready.
        </p>
      </div>

      {/* Grid items */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((prod) => (
            <div
              key={prod.id}
              className="group bg-kj-ivory border border-kj-gold/10 hover:border-kj-gold/30 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <Link to={`/products/${prod.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-150">
                <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                
                {/* Remove button inside */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(prod.id);
                  }}
                  className="absolute top-3 right-3 bg-kj-ivory p-2 rounded-full border border-kj-gold/10 hover:bg-kj-rose hover:text-kj-ivory text-kj-maroon transition-all duration-300 focus:outline-none cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </Link>

              {/* Info & Actions */}
              <div className="p-4 flex flex-col flex-grow text-left">
                <span className="text-[10px] uppercase font-sans tracking-widest text-kj-gold font-bold mb-1">
                  {prod.categorySlug.replace('-', ' ')}
                </span>
                <Link
                  to={`/products/${prod.slug}`}
                  className="font-serif text-sm md:text-base font-bold text-kj-charcoal hover:text-kj-maroon transition-colors line-clamp-1 mb-1 pr-1"
                >
                  {prod.name}
                </Link>
                <span className="font-serif text-sm font-semibold text-kj-maroon mt-auto">
                  {formatPrice(prod.price)}
                </span>

                {/* Move to Bag button */}
                <button
                  onClick={() => handleMoveToBag(prod)}
                  className="w-full py-2.5 mt-4 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag size={12} /> Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-kj-gold/30 bg-kj-maroon/5 flex flex-col items-center justify-center gap-4">
          <Heart size={48} strokeWidth={1} className="text-kj-gold" />
          <div>
            <h3 className="font-serif text-lg font-bold text-kj-charcoal">Your wishlist is empty</h3>
            <p className="font-sans text-xs text-gray-500 mt-1 leading-normal max-w-[240px] mx-auto">
              Save pieces you love here to easily find and purchase them later.
            </p>
          </div>
          <Link
            to="/collections/new-arrivals"
            className="mt-2 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans tracking-wider uppercase font-semibold py-3 px-6 transition-colors duration-300 inline-flex items-center gap-1"
          >
            Explore Collections <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default Wishlist;
