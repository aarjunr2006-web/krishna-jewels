import React from 'react';
import { ShieldCheck, Sparkles, RefreshCcw, Truck } from 'lucide-react';

const badges = [
  {
    icon: <ShieldCheck size={28} className="text-kj-maroon" />,
    title: 'Certified Gold Plating',
    desc: '18k to 22k heavy micron gold plating, certified for lasting wear and authentic luster.',
  },
  {
    icon: <Sparkles size={28} className="text-kj-maroon" />,
    title: 'Hypoallergenic & Safe',
    desc: 'Nickel-free, lead-free sterling silver and brass bases suitable for sensitive skin.',
  },
  {
    icon: <RefreshCcw size={28} className="text-kj-maroon" />,
    title: 'Lifetime Exchange',
    desc: 'Exchange worn or tarnished pieces anytime for 50% of the prevailing value.',
  },
  {
    icon: <Truck size={28} className="text-kj-maroon" />,
    title: 'Free Pan-India Shipping',
    desc: 'Free standard shipping on orders above ₹1,999, reaching 15,000+ pincodes.',
  },
];

export const TrustBadges: React.FC = () => {
  return (
    <section className="py-16 bg-kj-maroon/5 border-b border-kj-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-kj-ivory border border-kj-gold/10 hover:border-kj-gold/30 hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Outer icon loop */}
              <div className="w-16 h-16 rounded-full border border-kj-gold/20 flex items-center justify-center bg-kj-maroon/5 group-hover:bg-kj-maroon/10 group-hover:border-kj-gold transition-colors duration-300 mb-4">
                {badge.icon}
              </div>
              <h3 className="font-serif text-base md:text-lg font-bold text-kj-maroon mb-2">
                {badge.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TrustBadges;
