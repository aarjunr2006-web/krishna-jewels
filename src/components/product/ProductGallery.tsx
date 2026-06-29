import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail list - vertical on desktop, horizontal on mobile */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar justify-start md:max-h-[500px]">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-16 h-20 md:w-20 md:h-24 flex-shrink-0 border-2 transition-all duration-300 focus:outline-none cursor-pointer ${
              activeIndex === idx ? 'border-kj-maroon' : 'border-gray-200 hover:border-kj-gold'
            }`}
          >
            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-grow aspect-[4/5] bg-gray-100 border border-kj-gold/10 overflow-hidden group">
        <img
          src={images[activeIndex]}
          alt={productName}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setIsZoomOpen(true)}
        />
        
        {/* Hover/click Zoom overlay trigger */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-3 right-3 bg-kj-ivory/80 backdrop-blur-xs p-2.5 rounded-full border border-kj-gold/10 hover:bg-kj-maroon hover:text-kj-ivory text-kj-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer focus:outline-none focus:opacity-100"
          aria-label="Zoom image"
        >
          <Maximize2 size={16} />
        </button>

        {/* Decorative thin borders inside */}
        <div className="absolute inset-4 border border-kj-gold/5 pointer-events-none"></div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setIsZoomOpen(false)}></div>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-6 right-6 text-kj-ivory hover:text-kj-gold p-2 cursor-pointer focus:outline-none z-55 bg-black/40 rounded-full"
              aria-label="Close zoom"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={images[activeIndex]}
              alt={`${productName} zoomed view`}
              className="max-w-full max-h-full object-contain relative z-10 border border-kj-gold/15"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProductGallery;
