import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Heart, Send, ShieldCheck, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const popularSearches = [
    { name: 'Gold Necklace', path: '/collections/necklaces?filter=gold' },
    { name: 'Bridal Choker', path: '/collections/necklaces?filter=wedding' },
    { name: 'Sterling Silver Ring', path: '/collections/rings?filter=silver' },
    { name: 'Men’s Silver Kada', path: '/collections/mens' },
    { name: 'Modern Mangalsutra', path: '/collections/mangalsutras' },
    { name: 'Pearl Hoop Earrings', path: '/collections/earrings?filter=daily-wear' },
    { name: 'Kundan Statement Ring', path: '/collections/rings?filter=festive' },
    { name: 'Gemstone Bracelets', path: '/collections/bracelets-bangles?filter=gemstone' },
    { name: 'Gold-Plated Gifting Sets', path: '/collections/gifting' },
  ];

  return (
    <footer className="bg-kj-charcoal text-kj-ivory/80 pt-16 pb-8 border-t border-kj-gold/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-kj-gold/20 pb-12 mb-10">
          
          {/* Logo & Brand Pitch */}
          <div className="flex flex-col gap-4">
            <Logo inverse={true} />
            <p className="font-sans text-xs md:text-sm text-kj-ivory/60 leading-relaxed mt-2">
              "Heirloom-grade jewellery, made for everyday life." At Krishna Jewellers, we fuse generational Indian craftsmanship with contemporary design, delivering skin-safe, premium gold-plated and silver jewelry.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="hover:text-kj-gold transition-colors duration-200" aria-label="Facebook">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="hover:text-kj-gold transition-colors duration-200" aria-label="Instagram">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="hover:text-kj-gold transition-colors duration-200" aria-label="Youtube">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="10 15 15 12 10 9" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column 1: Help */}
          <div className="flex flex-col">
            <h4 className="font-serif text-sm font-bold text-kj-gold tracking-widest uppercase mb-5 border-b border-kj-gold/10 pb-1.5 self-start">
              Assistance & Help
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs md:text-sm">
              <li><Link to="/faqs" className="hover:text-kj-gold transition-colors duration-200">FAQs & Sizing Guide</Link></li>
              <li><Link to="/contact" className="hover:text-kj-gold transition-colors duration-200">Contact Support</Link></li>
              <li><Link to="/contact" className="hover:text-kj-gold transition-colors duration-200">Locate A Store</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-kj-gold transition-colors duration-200">Track Order Status</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-kj-gold transition-colors duration-200">Warranty Exchanges</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2: Policies */}
          <div className="flex flex-col">
            <h4 className="font-serif text-sm font-bold text-kj-gold tracking-widest uppercase mb-5 border-b border-kj-gold/10 pb-1.5 self-start">
              Store Policies
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs md:text-sm">
              <li><Link to="/shipping-returns" className="hover:text-kj-gold transition-colors duration-200">Shipping & Delivery Policies</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-kj-gold transition-colors duration-200">7-Day Return policy</Link></li>
              <li><Link to="/terms" className="hover:text-kj-gold transition-colors duration-200">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-kj-gold transition-colors duration-200">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-bold text-kj-gold tracking-widest uppercase mb-1 border-b border-kj-gold/10 pb-1.5 self-start">
              Join the Parivar
            </h4>
            <p className="font-sans text-xs text-kj-ivory/60 leading-normal">
              Subscribe to unlock early access to our seasonal edits, festive designs, and private collector sales.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center border border-kj-gold/30 bg-black/10 px-3 py-2 mt-2 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-none text-xs text-kj-ivory placeholder-gray-500 focus:outline-none focus:ring-0 mr-2"
              />
              <button
                type="submit"
                className="text-kj-gold hover:text-kj-ivory transition-colors duration-200 cursor-pointer"
                aria-label="Subscribe"
              >
                {submitted ? <Check size={16} className="text-kj-gold" /> : <Send size={16} />}
              </button>
            </form>
            {submitted && (
              <p className="text-[10px] text-kj-gold font-sans flex items-center gap-1 mt-1">
                <ShieldCheck size={12} /> Thank you! Welcome to the family.
              </p>
            )}
          </div>
        </div>

        {/* Popular Searches Block */}
        <div className="border-b border-kj-gold/20 pb-8 mb-8">
          <h5 className="font-serif text-xs font-bold tracking-widest text-kj-gold uppercase mb-3">
            Popular Searches
          </h5>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-[11px] text-kj-ivory/50">
            {popularSearches.map((search, idx) => (
              <React.Fragment key={idx}>
                <Link to={search.path} className="hover:text-kj-gold transition-colors duration-200">
                  {search.name}
                </Link>
                {idx < popularSearches.length - 1 && <span className="text-kj-gold/20">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Developer Contact Details Bar */}
        <div className="border-t border-kj-gold/10 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-kj-ivory/50">
          <div className="flex items-center gap-2">
            <span className="text-kj-gold font-serif uppercase tracking-widest text-[10px] font-bold">Web Developed by:</span>
            <span className="text-kj-ivory font-medium">ARJUN RATHORE</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a href="tel:+918005593151" className="flex items-center gap-1.5 hover:text-kj-gold transition-colors duration-200">
              <svg className="w-3.5 h-3.5 text-kj-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 8005593151</span>
            </a>
            <a href="mailto:aarjunr2006@gmail.com" className="flex items-center gap-1.5 hover:text-kj-gold transition-colors duration-200">
              <svg className="w-3.5 h-3.5 text-kj-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>aarjunr2006@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-kj-ivory/40 mt-6 border-t border-kj-gold/10 pt-6">
          <div>
            © {new Date().getFullYear()} Krishna Jewellers. All rights reserved. Made with <Heart size={10} className="inline text-kj-rose fill-kj-rose mx-0.5" /> in India.
          </div>
          {/* Payment Glyph Icons */}
          <div className="flex items-center gap-3">
            <span className="border border-kj-ivory/10 px-1 py-0.5 rounded text-[9px] font-bold tracking-wider">VISA</span>
            <span className="border border-kj-ivory/10 px-1 py-0.5 rounded text-[9px] font-bold tracking-wider">MASTERCARD</span>
            <span className="border border-kj-ivory/10 px-1 py-0.5 rounded text-[9px] font-bold tracking-wider">UPI</span>
            <span className="border border-kj-ivory/10 px-1 py-0.5 rounded text-[9px] font-bold tracking-wider">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
