import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'all', name: 'All' },
  { id: 'necklaces', name: 'Necklaces' },
  { id: 'earrings', name: 'Earrings' },
  { id: 'rings', name: 'Rings' },
  { id: 'bracelets-bangles', name: 'Bracelets & Bangles' },
  { id: 'mangalsutras', name: 'Mangalsutras' },
];

export const BestsellerTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const bestsellerProducts = products.filter((p) => p.isBestseller);

  const filteredProducts = activeTab === 'all'
    ? bestsellerProducts
    : bestsellerProducts.filter((p) => p.categorySlug === activeTab);

  return (
    <section className="py-16 bg-kj-ivory border-b border-kj-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon mb-2">
            Our Bestsellers
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-500 max-w-md mx-auto">
            Discover the heirloom pieces loved most by our patrons, handcrafted for lifelong grace.
          </p>
          <div className="w-12 h-[1.5px] bg-kj-gold mx-auto mt-4"></div>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center border-b border-kj-gold/20 mb-8 overflow-x-auto pb-2 no-scrollbar gap-1 md:gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-xs md:text-sm font-sans font-semibold tracking-wider uppercase transition-colors duration-300 cursor-pointer focus:outline-none flex-shrink-0 ${
                  isActive ? 'text-kj-maroon' : 'text-gray-400 hover:text-kj-charcoal'
                }`}
              >
                {tab.name}
                {isActive && (
                  <motion.div
                    layoutId="activeBestsellerTabLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-kj-maroon"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Bestseller Rail */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x justify-start">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <motion.div
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-[240px] sm:w-[260px] md:w-[280px] flex-shrink-0 snap-start"
                >
                  <ProductCard product={prod} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* End of Rail CTA Card */}
            <div className="w-[200px] sm:w-[240px] flex-shrink-0 snap-start border border-dashed border-kj-gold/40 flex flex-col justify-center items-center p-6 text-center bg-kj-maroon/5 hover:bg-kj-maroon/10 transition-colors duration-300">
              <h4 className="font-serif text-lg font-bold text-kj-maroon mb-2">
                Explore More
              </h4>
              <p className="font-sans text-xs text-gray-500 mb-4 leading-normal">
                Browse our entire range of traditional and modern jewelry designs.
              </p>
              <Link
                to={activeTab === 'all' ? '/collections/new-arrivals' : `/collections/${activeTab}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest text-kj-maroon hover:text-kj-gold uppercase border-b border-kj-maroon pb-0.5"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BestsellerTabs;
