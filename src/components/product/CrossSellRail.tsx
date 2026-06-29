import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../lib/types';
import { ProductCard } from './ProductCard';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/formatPrice';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface CrossSellRailProps {
  currentProduct: Product;
  allProducts: Product[];
}

export const CrossSellRail: React.FC<CrossSellRailProps> = ({ currentProduct, allProducts }) => {
  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.setIsOpen);

  // 1. Complete the Look: find 2 products from different categories
  const completeLookProducts = allProducts
    .filter((prod) => prod.id !== currentProduct.id && prod.categorySlug !== currentProduct.categorySlug)
    .slice(0, 2);

  // 2. You May Also Like: related products in the same category
  const relatedProducts = allProducts
    .filter((prod) => prod.id !== currentProduct.id && prod.categorySlug === currentProduct.categorySlug)
    .slice(0, 4);

  const handleQuickAdd = (prod: Product) => {
    const variant = prod.variants && prod.variants.length > 0 ? prod.variants[0] : 'Standard';
    addToCart(prod, variant, 1);
    openCart(true);
  };

  return (
    <div className="mt-16 border-t border-kj-gold/20 pt-12 flex flex-col gap-16 text-left">
      
      {/* 1. Complete the Look Section */}
      {completeLookProducts.length > 0 && (
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-kj-maroon mb-6">
            Complete the Look
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-kj-maroon/5 p-6 border border-kj-gold/15">
            {completeLookProducts.map((prod) => (
              <div key={prod.id} className="flex gap-4 items-center bg-kj-ivory p-4 border border-kj-gold/10">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-16 h-20 object-cover border border-kj-gold/10 flex-shrink-0"
                />
                <div className="flex-grow flex flex-col justify-between h-full min-w-0">
                  <div>
                    <Link
                      to={`/products/${prod.slug}`}
                      className="font-serif text-sm font-bold text-kj-charcoal hover:text-kj-maroon transition-colors line-clamp-1"
                    >
                      {prod.name}
                    </Link>
                    <span className="font-sans text-[10px] text-gray-500 uppercase tracking-wider block mt-0.5">
                      {prod.categorySlug.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <span className="font-serif text-sm font-semibold text-kj-maroon">
                      {formatPrice(prod.price)}
                    </span>
                    <button
                      onClick={() => handleQuickAdd(prod)}
                      className="flex items-center gap-1 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-[10px] font-sans font-bold uppercase tracking-wider py-1.5 px-3 cursor-pointer transition-colors duration-200"
                    >
                      <ShoppingBag size={10} /> Add Pair
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-kj-maroon">
              You May Also Like
            </h3>
            <Link
              to={`/collections/${currentProduct.categorySlug}`}
              className="inline-flex items-center gap-1 font-sans text-xs font-bold tracking-widest text-kj-maroon hover:text-kj-gold uppercase border-b border-kj-maroon pb-0.5"
            >
              See All <ArrowRight size={12} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
export default CrossSellRail;
