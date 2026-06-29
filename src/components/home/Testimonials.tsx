import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { StarRating } from '../ui/StarRating';

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-kj-ivory border-b border-kj-gold/10 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <Quote size={40} className="mx-auto text-kj-gold/30 mb-6 rotate-180" />
        
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon mb-2">
          Patron Testimonials
        </h2>
        <div className="w-12 h-[1.5px] bg-kj-gold mx-auto mb-8"></div>

        {/* Carousel Window */}
        <div className="relative min-h-[160px] md:min-h-[140px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full max-w-2xl px-6 md:px-12 flex flex-col items-center gap-4"
            >
              <p className="font-serif italic text-base md:text-lg text-kj-charcoal leading-relaxed">
                "{testimonials[current].comment}"
              </p>
              
              <div className="flex flex-col items-center gap-1 mt-2">
                <StarRating rating={testimonials[current].rating} size={14} />
                <span className="font-sans text-xs md:text-sm font-bold text-kj-maroon tracking-wider uppercase mt-1">
                  {testimonials[current].name}
                </span>
                <span className="font-sans text-[10px] text-gray-500 uppercase tracking-widest">
                  {testimonials[current].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-kj-maroon/5 hover:bg-kj-maroon hover:text-kj-ivory text-kj-maroon p-1.5 md:p-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none"
            aria-label="Previous quote"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-kj-maroon/5 hover:bg-kj-maroon hover:text-kj-ivory text-kj-maroon p-1.5 md:p-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none"
            aria-label="Next quote"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${
                current === idx ? 'bg-kj-maroon scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
