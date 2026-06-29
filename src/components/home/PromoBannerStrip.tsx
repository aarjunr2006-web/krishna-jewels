import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const PromoBannerStrip: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-kj-charcoal overflow-hidden group select-none">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-kj-maroon/95 via-kj-maroon/60 to-transparent"></div>
      <img
        src="/assets/banner_campaign.png"
        alt="Festive jewellery collection campaign banner"
        className="w-full h-[220px] md:h-[280px] object-cover mix-blend-overlay group-hover:scale-101 transition-transform duration-700"
      />

      {/* Floating Info */}
      <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-kj-ivory">
        <div className="max-w-md md:max-w-xl flex flex-col gap-2 md:gap-4 text-left">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-kj-gold font-sans font-bold uppercase">
            Limited Festive Release
          </span>
          <h2 className="font-serif text-xl sm:text-2xl md:text-4xl font-bold leading-tight text-kj-ivory">
            Festive Elegance, Reimagined
          </h2>
          <p className="font-sans text-[10px] sm:text-xs md:text-sm text-kj-ivory/80 max-w-xs md:max-w-md font-light leading-relaxed">
            Dazzle in gold-plated cuffs and necklaces made with hypoallergenic brass and VVS zircon accents.
          </p>
          <div className="mt-1 md:mt-2">
            <Button
              variant="outline"
              onClick={() => navigate('/collections/bracelets-bangles?filter=festive')}
              className="text-[10px] md:text-xs tracking-widest font-semibold px-5 py-2.5 bg-transparent border-kj-gold text-kj-gold hover:bg-kj-gold hover:text-kj-charcoal"
            >
              Shop Festive Edit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PromoBannerStrip;
