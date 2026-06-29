import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  { text: '✨ Free Shipping Across India Above ₹1,999 ✨', link: '/collections/new-arrivals' },
  { text: '👑 Lifetime Exchange Policy on Gold-Plated Range 👑', link: '/about' },
  { text: '🎁 Special Gift Hampers Available for Your Loved Ones 🎁', link: '/collections/gifting' },
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-kj-maroon text-kj-ivory py-2 text-center text-[11px] md:text-xs tracking-widest font-sans font-medium uppercase border-b border-kj-gold/20 select-none overflow-hidden relative min-h-[36px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full px-4"
        >
          <Link
            to={announcements[index].link}
            className="hover:text-kj-gold-light transition-colors duration-200 inline-block focus:outline-none focus:text-kj-gold"
          >
            {announcements[index].text}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default AnnouncementBar;
