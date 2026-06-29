import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const menuSections = [
    {
      title: 'NECKLACES',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=60',
      links: [
        { name: 'All Necklaces', path: '/collections/necklaces' },
        { name: 'Bridal Chokers', path: '/collections/necklaces?filter=wedding' },
        { name: 'Daily wear Chains', path: '/collections/necklaces?filter=daily-wear' },
        { name: 'Gemstone Pendants', path: '/collections/necklaces?filter=gemstone' },
      ],
    },
    {
      title: 'EARRINGS',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=60',
      links: [
        { name: 'All Earrings', path: '/collections/earrings' },
        { name: 'Traditional Jhumkas', path: '/collections/earrings?filter=festive' },
        { name: 'Gold-Plated Studs', path: '/collections/earrings?filter=office-wear' },
        { name: 'Pearl Hoop Earrings', path: '/collections/earrings?filter=daily-wear' },
      ],
    },
    {
      title: 'RINGS & WRISTWEAR',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=60',
      links: [
        { name: 'Statement Rings', path: '/collections/rings?filter=wedding' },
        { name: 'Men’s Bands', path: '/collections/mens' },
        { name: 'Handcrafted Kadas', path: '/collections/bracelets-bangles?filter=wedding' },
        { name: 'Engraved Cuffs', path: '/collections/bracelets-bangles?filter=office-wear' },
      ],
    },
    {
      title: 'COLLECTIONS',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&auto=format&fit=crop&q=60',
      links: [
        { name: 'Mangalsutras', path: '/collections/mangalsutras' },
        { name: 'New Arrivals', path: '/collections/new-arrivals' },
        { name: 'Best Sellers', path: '/collections/best-sellers' },
        { name: 'Gifting Specials', path: '/collections/gifting' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute top-full left-0 w-full bg-kj-ivory border-b border-kj-gold/30 shadow-xl z-50 py-10 px-8"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8">
        {menuSections.map((section, idx) => (
          <div key={idx} className="flex flex-col">
            <h4 className="font-serif text-sm font-bold tracking-wider text-kj-maroon border-b border-kj-gold/20 pb-2 mb-3">
              {section.title}
            </h4>
            
            {/* Category image thumbnail inside mega menu */}
            <div className="w-full h-24 mb-4 overflow-hidden border border-kj-gold/10 relative group/img bg-gray-100">
              <div className="absolute inset-0 bg-kj-maroon/5 z-10 group-hover/img:bg-transparent transition-colors duration-200"></div>
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
            </div>

            <ul className="flex flex-col gap-2.5">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="font-sans text-xs md:text-sm text-kj-charcoal hover:text-kj-gold tracking-wide transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Promo Card in MegaMenu with background image matching the styling theme */}
        <div className="col-span-1 relative text-kj-ivory p-6 flex flex-col justify-between border border-kj-gold/30 overflow-hidden group bg-kj-maroon">
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-kj-maroon/85 z-10 group-hover:bg-kj-maroon/90 transition-colors duration-300"></div>
          <img
            src="/assets/hero_bridal_banner.png"
            alt="Seasonal Bridal Promo"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Subtle gold design overlay */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-kj-gold/20 translate-x-4 -translate-y-4 z-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-kj-gold/20 -translate-x-4 translate-y-4 z-20"></div>
          
          <div className="z-20">
            <span className="text-[10px] tracking-widest text-kj-gold uppercase font-semibold block mb-1">
              Seasonal Edit
            </span>
            <h3 className="font-serif text-lg md:text-xl font-bold leading-tight mb-2">
              The Bridal Heritage Collection
            </h3>
            <p className="text-[11px] text-gray-300 leading-normal mb-4 font-sans font-light">
              Exquisite 22k gold plated designs meticulously crafted for your auspicious moments.
            </p>
          </div>
          <Link
            to="/collections/necklaces?filter=wedding"
            onClick={onClose}
            className="z-20 font-sans text-xs tracking-wider uppercase text-kj-gold font-semibold hover:text-kj-ivory transition-colors duration-200 border-b border-kj-gold pb-0.5 self-start group-hover:border-kj-ivory font-medium"
          >
            Explore Edit
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default MegaMenu;
