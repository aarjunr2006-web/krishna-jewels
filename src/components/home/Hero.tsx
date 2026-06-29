import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

const slides = [
  {
    image: '/assets/hero_bridal_banner.png',
    title: 'The Heritage Bridal Edit',
    subtitle: 'Celebrate your auspicious moments with gold-plated Kundan and Jadau masterpieces.',
    cta: 'Explore Collection',
    link: '/collections/necklaces?filter=wedding',
  },
  {
    image: '/assets/hero_silver_banner.png',
    title: 'Modern Minimalism',
    subtitle: 'Sleek, lightweight 925 sterling silver jewelry crafted for daily wear and office elegance.',
    cta: 'Shop Silver',
    link: '/collections/rings?filter=silver',
  },
  {
    image: '/assets/hero_gifting_banner.png',
    title: 'Gifts of Love',
    subtitle: 'Exquisite jewelry combinations packaged in premium velvet boxes for your favorite people.',
    cta: 'Shop Gift Sets',
    link: '/collections/gifting',
  },
];

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] bg-kj-charcoal overflow-hidden group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Subtle gradient overlay to make text highly legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-kj-charcoal/90 via-kj-charcoal/40 to-transparent z-10"></div>
          
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating Carousel Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-kj-ivory/10 hover:bg-kj-maroon hover:text-kj-ivory text-kj-ivory p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer focus:outline-none focus:bg-kj-maroon"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-kj-ivory/10 hover:bg-kj-maroon hover:text-kj-ivory text-kj-ivory p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer focus:outline-none focus:bg-kj-maroon"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slider Content */}
      <div className="absolute inset-0 z-15 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-kj-ivory w-full">
        <div className="max-w-md md:max-w-xl flex flex-col gap-3 md:gap-5">
          <motion.span
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs md:text-sm tracking-[0.25em] text-kj-gold font-sans font-bold uppercase"
          >
            Exclusive Collection
          </motion.span>
          
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight select-text text-left text-kj-ivory"
          >
            {slides[current].title}
          </motion.h1>

          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-sans text-xs sm:text-sm md:text-base text-kj-ivory/80 leading-relaxed font-light text-left"
          >
            {slides[current].subtitle}
          </motion.p>

          <motion.div
            key={`btn-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2"
          >
            <Button
              variant="primary"
              onClick={() => navigate(slides[current].link)}
              className="text-xs md:text-sm font-semibold tracking-widest px-8 py-3.5 bg-kj-maroon border border-kj-maroon hover:bg-transparent hover:text-kj-ivory hover:border-kj-ivory"
            >
              {slides[current].cta}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              current === idx ? 'bg-kj-gold w-6' : 'bg-kj-ivory/40 hover:bg-kj-ivory/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};
export default Hero;
