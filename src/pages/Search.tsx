import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const matchedProducts = useMemo(() => {
    if (!query.trim()) return [];
    
    return products.filter(
      (prod) =>
        prod.name.toLowerCase().includes(query.toLowerCase()) ||
        prod.categorySlug.toLowerCase().includes(query.toLowerCase()) ||
        prod.description.toLowerCase().includes(query.toLowerCase()) ||
        prod.shortDescription.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const recommendedKeywords = ['Necklace', 'Kada', 'Silver', 'Pearl', 'Ring', 'Mangalsutra'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory">
      
      {/* Title block */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon flex items-center gap-2">
          <SearchIcon size={24} /> SEARCH RESULTS
        </h1>
        <p className="font-sans text-xs md:text-sm text-gray-500 mt-1">
          {query.trim() ? (
            <>
              Showing results for "<span className="font-bold text-kj-maroon">{query}</span>" &mdash;{' '}
              {matchedProducts.length} items found
            </>
          ) : (
            'Enter keywords to search our collections.'
          )}
        </p>
      </div>

      {/* Grid Content */}
      {matchedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {matchedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-kj-gold/30 bg-kj-maroon/5 flex flex-col items-center justify-center gap-6">
          <SearchIcon size={48} strokeWidth={1} className="text-kj-gold" />
          
          <div>
            <h3 className="font-serif text-lg font-bold text-kj-charcoal">
              {query.trim() ? `No matches found for "${query}"` : 'Search Krishna Jewellers'}
            </h3>
            <p className="font-sans text-xs text-gray-500 mt-1 leading-normal max-w-xs mx-auto">
              Please double check spelling or try using broader keywords.
            </p>
          </div>

          {/* Quick Keywords */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Popular Searches
            </span>
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {recommendedKeywords.map((word) => (
                <Link
                  key={word}
                  to={`/search?q=${encodeURIComponent(word)}`}
                  className="font-sans text-xs bg-white border border-kj-gold/20 hover:border-kj-maroon text-kj-charcoal py-1.5 px-3 transition-colors duration-200"
                >
                  {word}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/collections/new-arrivals"
            className="mt-4 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans tracking-wider uppercase font-semibold py-3 px-6 transition-colors duration-300 inline-flex items-center gap-1"
          >
            Browse New Arrivals <ArrowRight size={14} />
          </Link>
        </div>
      )}

    </div>
  );
};
export default Search;
