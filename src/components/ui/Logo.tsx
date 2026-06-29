import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  inverse?: boolean; // if true, maroon parts become ivory (useful in dark footer/backgrounds)
}

export const Logo: React.FC<LogoProps> = ({ className = '', inverse = false }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 group focus:outline-none ${className}`}>
      {/* Gold Peacock Feather/diya Flourish SVG */}
      <svg
        className="w-7 h-7 text-kj-gold group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.5 7.5 9.5.5 0 .5-.5.5-.8V18.5c-4.5 1-5.5-2-5.5-2-.8-2-2-2.5-2-2.5-1.5-1-.1-1-.1-1 1.6.1 2.5 1.7 2.5 1.7 1.5 2.5 3.8 1.8 4.7 1.4.2-1.1.6-1.8 1.1-2.2-3.6-.4-7.4-1.8-7.4-8.1 0-1.8.6-3.2 1.7-4.4-.2-.4-.7-2.1.2-4.3 0 0 1.4-.4 4.5 1.7A15.6 15.6 0 0 1 12 5.3c1.4 0 2.8.2 4.1.5C19.2 2.6 20.6 3 20.6 3c.9 2.2.4 3.9.2 4.3 1.1 1.2 1.7 2.6 1.7 4.4 0 6.3-3.8 7.7-7.4 8.1.6.5 1.1 1.5 1.1 3v4.5c0 .3.1.8.5.8C21 20.5 24 16.5 24 12c0-5.5-4.5-10-10-10z" className="hidden" />
        {/* Custom heritage paisley feather motif */}
        <path d="M12 22c0-5.523 2-10 6-12-4 1-6 4-6 7s-1 5-4 5c3 0 4-2.5 4-5 0-2 .5-4.5 2.5-6.5C12.5 12.5 12 17 12 22z" fill="currentColor" opacity="0.15" />
        <path d="M12 22C12 12 19 6 19 6S13 9 12 14c-1-5-7-8-7-8s6 3 7 8" />
        <circle cx="15" cy="8" r="1.5" />
        <circle cx="12" cy="11" r="1" />
      </svg>
      <div className="flex flex-col">
        <span
          className={`font-serif text-lg md:text-xl font-bold tracking-wider leading-none transition-colors duration-300 ${
            inverse ? 'text-kj-ivory' : 'text-kj-maroon group-hover:text-kj-gold'
          }`}
        >
          KRISHNA JEWELLERS
        </span>
        <div className="flex items-center gap-0.5 mt-0.5">
          <div className="h-[1px] bg-kj-gold flex-grow"></div>
          <span className="text-[8px] md:text-[9px] font-sans tracking-[0.25em] text-kj-gold font-medium uppercase leading-none">
            EST. 1989
          </span>
          <div className="h-[1px] bg-kj-gold flex-grow"></div>
        </div>
      </div>
    </Link>
  );
};
export default Logo;
