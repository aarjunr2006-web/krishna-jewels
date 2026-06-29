import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { MapPin } from 'lucide-react';

export const StoreLocatorTeaser: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-kj-maroon text-kj-ivory relative overflow-hidden border-b border-kj-gold/20 select-none">
      {/* Background SVG Motif elements */}
      <div className="absolute top-0 right-0 w-64 h-64 border border-kj-gold/10 rounded-full translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-kj-gold/10 rounded-full -translate-x-32 translate-y-32"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-kj-gold-light/20 flex items-center justify-center text-kj-gold border border-kj-gold/30 mb-2">
          <MapPin size={24} />
        </div>

        <span className="text-xs md:text-sm tracking-[0.25em] text-kj-gold font-sans font-bold uppercase">
          Experience In Person
        </span>

        <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight max-w-lg">
          Visit a Krishna Jewellers Store Near You
        </h2>

        <p className="font-sans text-xs md:text-sm text-gray-300 max-w-md leading-relaxed font-light">
          Step into our warm, heritage-inspired boutiques to feel the heavy weight of our sterling silver cuffs and witness the authentic glow of our gold plating in person.
        </p>

        <div className="mt-2">
          <Button
            variant="outline"
            onClick={() => navigate('/contact')}
            className="text-xs tracking-widest font-semibold px-8 py-3.5 bg-transparent border-kj-gold text-kj-gold hover:bg-kj-gold hover:text-kj-charcoal"
          >
            Find Our Boutiques
          </Button>
        </div>
      </div>
    </section>
  );
};
export default StoreLocatorTeaser;
