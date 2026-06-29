import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 bg-kj-ivory border-b border-kj-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="flex flex-col gap-5 text-left">
            <span className="text-xs md:text-sm tracking-[0.25em] text-kj-gold font-sans font-bold uppercase">
              Our Legacy & Promise
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-kj-maroon leading-tight">
              Heirloom-grade jewellery, made for everyday life.
            </h2>
            <div className="w-12 h-[1.5px] bg-kj-gold mb-2"></div>
            <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed font-light">
              For over three decades, Krishna Jewellers has stood as a guardian of traditional Indian ornamentation. Our journey began with a simple vision: to bring the luxury of heirloom-grade craftsmanship to the rhythm of everyday life.
            </p>
            <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed font-light">
              Each bangle, necklace, and ring is designed in our studios and crafted by hand by generational master artisans. Using hypoallergenic sterling silver and thick micron gold plating, we ensure that timeless elegance is never a compromise.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-sans text-xs md:text-sm font-bold tracking-widest text-kj-maroon hover:text-kj-gold uppercase border-b border-kj-maroon pb-1 self-start mt-2 group"
            >
              Read Our Full Story{' '}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Image Column */}
          <div className="relative">
            {/* Elegant double-border frame layout */}
            <div className="absolute inset-4 border border-kj-gold pointer-events-none z-10 translate-x-2 translate-y-2"></div>
            <img
              src="/assets/brand_craft_story.png"
              alt="Artisan working on gold cuff bracelet"
              className="w-full aspect-[4/3] object-cover relative z-0 border border-kj-gold/20"
            />
            {/* Decorative gold linework motif corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-kj-gold z-20 translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-kj-gold z-20 -translate-x-1 translate-y-1"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default BrandStory;
