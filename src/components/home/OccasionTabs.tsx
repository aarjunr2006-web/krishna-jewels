import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

const occasions = [
  'Daily Wear',
  'Office Wear',
  'Festive',
  'Wedding',
  'Date Night',
  'Gifting',
];

export const OccasionTabs: React.FC = () => {
  const [activeOccasion, setActiveOccasion] = useState('Daily Wear');

  // Filter products by occasion tags
  const filteredProducts = products
    .filter((prod) => prod.occasions.includes(activeOccasion))
    .slice(0, 4); // Limit to 4 items in grid

  return (
    <section className="py-16 bg-kj-ivory border-b border-kj-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon mb-2">
            Shop by Occasion
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-500 max-w-md mx-auto">
            Find the perfect jewelry pieces tailored to elevate your specific moments and moods.
          </p>
          <div className="w-12 h-[1.5px] bg-kj-gold mx-auto mt-4"></div>
        </div>

        {/* Occasion Pill Tabs */}
        <div className="flex justify-start md:justify-center border-b border-gray-100 pb-3 mb-8 overflow-x-auto no-scrollbar gap-2 md:gap-3">
          {occasions.map((occ) => {
            const isActive = activeOccasion === occ;
            return (
              <button
                key={occ}
                onClick={() => setActiveOccasion(occ)}
                className={`px-5 py-2 font-sans text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 rounded-full cursor-pointer focus:outline-none flex-shrink-0 ${
                  isActive
                    ? 'bg-kj-maroon text-kj-ivory border border-kj-maroon'
                    : 'bg-transparent text-gray-500 border border-gray-200 hover:text-kj-charcoal hover:border-gray-400'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>

        {/* Occasion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={prod} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
export default OccasionTabs;
