import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

// Map slugs to category image matches for high-end look
const categoryImages: Record<string, string> = {
  'necklaces': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=60',
  'earrings': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=60',
  'rings': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=60',
  'bracelets-bangles': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&auto=format&fit=crop&q=60',
  'mangalsutras': 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&auto=format&fit=crop&q=60',
  'mens': 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&auto=format&fit=crop&q=60',
  'gifting': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=60',
};

export const CategoryStrip: React.FC = () => {
  return (
    <section className="py-12 bg-kj-ivory border-b border-kj-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-center font-serif text-2xl md:text-3xl font-bold text-kj-maroon mb-2">
          Shop by Category
        </h2>
        <div className="w-12 h-[1.5px] bg-kj-gold mx-auto mb-8"></div>

        {/* Horizontal scroll container */}
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto pb-4 no-scrollbar scroll-smooth justify-start md:justify-center">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/collections/${cat.slug}`}
              className="flex flex-col items-center text-center group flex-shrink-0 focus:outline-none"
            >
              {/* Circular Container with double hairline gold borders and background image */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-kj-gold/20 flex items-center justify-center text-kj-maroon group-hover:border-kj-gold transition-all duration-300 shadow-xs mb-3 bg-gray-100">
                {/* Thin gold hairline rule circle ring inside */}
                <div className="absolute inset-1 rounded-full border border-dashed border-kj-gold/30 z-20 group-hover:border-kj-gold-light/40 transition-colors duration-300"></div>
                <img
                  src={categoryImages[cat.slug] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0"
                />
              </div>
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-kj-charcoal group-hover:text-kj-maroon transition-colors duration-200">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoryStrip;
