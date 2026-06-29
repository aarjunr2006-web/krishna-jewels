import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Collection: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || '';

  // Filter and Sorting state
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(12000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category or material filters if query parameters are set
  useEffect(() => {
    if (filterParam) {
      if (filterParam === 'gold') setSelectedMaterials(['Gold Plated']);
      else if (filterParam === 'silver') setSelectedMaterials(['Silver']);
      else if (filterParam === 'gemstone') setSelectedMaterials(['Gemstone']);
    } else {
      setSelectedMaterials([]);
    }
  }, [filterParam, slug]);

  // Determine current category metadata
  const currentCategory = useMemo(() => {
    if (slug === 'new-arrivals') {
      return { name: 'New Arrivals', description: 'Fresh, contemporary additions to our catalog, designed for your modern style.' };
    }
    if (slug === 'best-sellers') {
      return { name: 'Best Sellers', description: 'Patron favorites and heirloom statement jewelry loved across generations.' };
    }
    if (slug === 'sale') {
      return { name: 'Sale & Offers', description: 'Exclusive pricing and special edits on select fine jewelry designs.' };
    }
    return categories.find((cat) => cat.slug === slug) || { name: 'Jewellery', description: 'Explore our catalog of premium handcrafted jewelry.' };
  }, [slug]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let items = products;

    // Category / Virtual Category filter
    if (slug === 'new-arrivals') {
      items = items.filter((p) => p.isNewArrival);
    } else if (slug === 'best-sellers') {
      items = items.filter((p) => p.isBestseller);
    } else if (slug === 'sale') {
      items = items.filter((p) => p.isSale);
    } else if (slug) {
      items = items.filter((p) => p.categorySlug === slug);
    }

    // Material Filter
    if (selectedMaterials.length > 0) {
      items = items.filter((p) => {
        const metalText = p.specs['Base Metal'] || p.specs['Metal'] || '';
        const platingText = p.specs['Plating'] || '';
        const gemstoneText = p.specs['Gemstones'] || p.specs['Gemstone'] || '';
        
        return selectedMaterials.some((mat) => {
          if (mat === 'Gold Plated') return platingText.toLowerCase().includes('gold') || metalText.toLowerCase().includes('gold');
          if (mat === 'Silver') return metalText.toLowerCase().includes('silver') || metalText.toLowerCase().includes('rhodium');
          if (mat === 'Gemstone') return gemstoneText && gemstoneText.toLowerCase() !== 'none' && !gemstoneText.toLowerCase().includes('uncut polki');
          return false;
        });
      });
    }

    // Price range filter
    items = items.filter((p) => p.price <= priceRange);

    // Sorting
    if (sortBy === 'price-low') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      items = [...items].sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'bestselling') {
      items = [...items].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return items;
  }, [slug, selectedMaterials, priceRange, sortBy]);

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const handleClearFilters = () => {
    setSelectedMaterials([]);
    setPriceRange(12000);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 text-left bg-kj-ivory">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 font-sans text-xs text-gray-500 uppercase tracking-widest mb-6">
        <Link to="/" className="hover:text-kj-maroon transition-colors duration-200">
          Home
        </Link>
        <ChevronRight size={10} />
        <span className="text-kj-maroon font-semibold">{currentCategory.name}</span>
      </div>

      {/* Category Banner Strip */}
      <div className="bg-kj-maroon text-kj-ivory p-8 md:p-12 border border-kj-gold/30 relative overflow-hidden mb-10 flex flex-col justify-center select-none">
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-kj-gold/15 translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-kj-gold/15 -translate-x-12 translate-y-12"></div>
        
        <div className="relative z-10 max-w-xl">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3 tracking-wide text-kj-ivory uppercase">
            {currentCategory.name}
          </h1>
          <p className="font-sans text-xs md:text-sm text-gray-300 font-light leading-relaxed">
            {currentCategory.description}
          </p>
        </div>
      </div>

      {/* Grid Layout (Sidebar Filters + Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar (Desktop Filters) */}
        <aside className="hidden lg:flex flex-col gap-6 border-r border-kj-gold/20 pr-6">
          <div className="flex justify-between items-center border-b border-kj-gold/20 pb-3">
            <h3 className="font-serif text-lg font-bold text-kj-maroon">Filters</h3>
            <button
              onClick={handleClearFilters}
              className="font-sans text-xs font-semibold text-gray-400 hover:text-kj-maroon transition-colors focus:outline-none cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Filter 1: Material */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-kj-charcoal">
              Material / Type
            </h4>
            <div className="flex flex-col gap-2 font-sans text-xs md:text-sm text-gray-600">
              {['Gold Plated', 'Silver', 'Gemstone'].map((mat) => (
                <label key={mat} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                    className="accent-kj-maroon w-4 h-4 border-kj-gold/30"
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Price Limit */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-kj-charcoal">
                Max Price
              </h4>
              <span className="font-sans text-xs font-semibold text-kj-maroon">
                ₹{priceRange.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="800"
              max="12000"
              step="200"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-kj-maroon bg-gray-200 h-1.5 rounded-full cursor-pointer"
            />
            <div className="flex justify-between font-sans text-[10px] text-gray-400">
              <span>₹800</span>
              <span>₹12,000</span>
            </div>
          </div>

          {/* Sorting */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-kj-charcoal">
              Sort By
            </h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-kj-gold/30 px-3 py-2 text-xs md:text-sm font-sans focus:outline-none focus:border-kj-maroon"
            >
              <option value="featured">Featured</option>
              <option value="bestselling">Best Selling</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Right side catalog results */}
        <main className="lg:col-span-3">
          
          {/* Mobile Filters Header */}
          <div className="flex lg:hidden justify-between items-center border border-kj-gold/25 p-3 mb-6 bg-kj-maroon/5">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 font-sans text-xs font-bold uppercase text-kj-maroon focus:outline-none cursor-pointer"
            >
              <SlidersHorizontal size={16} /> Filters & Sorting
            </button>
            <span className="font-sans text-xs text-gray-500">
              {filteredProducts.length} items found
            </span>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-kj-gold/30 bg-kj-maroon/5 flex flex-col items-center justify-center gap-4">
              <span className="font-serif text-lg font-bold text-kj-charcoal">No items match your criteria</span>
              <p className="font-sans text-xs text-gray-500 max-w-xs mx-auto leading-normal">
                Try clearing your filters or adjusting your maximum price threshold.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans font-semibold uppercase tracking-wider py-2.5 px-6 transition-colors duration-200 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-over Overlay */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            ></motion.div>

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-kj-ivory z-50 shadow-2xl p-6 overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-kj-gold/20 pb-4 mb-6">
                <h3 className="font-serif text-lg font-bold text-kj-maroon">Filters & Sorting</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-kj-charcoal hover:text-kj-maroon p-1 focus:outline-none cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile sorting dropdown */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="font-serif text-sm font-bold uppercase tracking-wider text-kj-charcoal">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-kj-gold/30 px-3 py-2 text-xs md:text-sm font-sans focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Mobile Material filter checkboxes */}
              <div className="flex flex-col gap-3 mb-6">
                <label className="font-serif text-sm font-bold uppercase tracking-wider text-kj-charcoal">Material / Type</label>
                <div className="flex flex-col gap-2 font-sans text-xs md:text-sm text-gray-600">
                  {['Gold Plated', 'Silver', 'Gemstone'].map((mat) => (
                    <label key={mat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="accent-kj-maroon w-4 h-4 border-kj-gold/30"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Price Slider */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center">
                  <label className="font-serif text-sm font-bold uppercase tracking-wider text-kj-charcoal">Max Price</label>
                  <span className="font-sans text-xs font-semibold text-kj-maroon">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="12000"
                  step="200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-kj-maroon bg-gray-200 h-1.5 rounded-full"
                />
              </div>

              {/* Mobile Buttons */}
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-kj-gold/15">
                <button
                  onClick={handleClearFilters}
                  className="w-full text-center py-2.5 font-sans text-xs font-bold uppercase tracking-wider border border-kj-maroon/20 text-kj-maroon hover:bg-kj-maroon hover:text-kj-ivory transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-kj-maroon text-kj-ivory font-sans text-xs font-bold uppercase tracking-wider text-center"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Collection;
