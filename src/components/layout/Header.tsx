import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingBag, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { products } from '../../data/products';
import { Logo } from '../ui/Logo';
import { MegaMenu } from './MegaMenu';
import { formatPrice } from '../../lib/formatPrice';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const cartCount = useCartStore((state) => state.getCartCount());
  const openCart = useCartStore((state) => state.setIsOpen);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMegaMenuOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Handle sticky scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Live filter suggestions from mock data
  const suggestions = searchQuery.trim()
    ? products
        .filter((prod) =>
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.categorySlug.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Necklaces', path: '/collections/necklaces' },
    { name: 'Earrings', path: '/collections/earrings' },
    { name: 'Rings', path: '/collections/rings' },
    { name: 'Bracelets & Bangles', path: '/collections/bracelets-bangles' },
    { name: 'Mangalsutras', path: '/collections/mangalsutras' },
    { name: 'Men’s', path: '/collections/mens' },
    { name: 'Gifting', path: '/collections/gifting' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-kj-ivory/95 backdrop-blur-md shadow-md py-3'
            : 'bg-kj-ivory py-5'
        } border-b border-kj-gold/20`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between relative">
          {/* Mobile Menu Icon (Left) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-kj-charcoal hover:text-kj-maroon p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo (Left/Center) */}
          <Logo className="flex-shrink-0" />

          {/* Desktop Nav Links (Center) */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="font-sans text-xs lg:text-sm font-semibold tracking-widest text-kj-charcoal hover:text-kj-maroon transition-colors duration-200 uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons Toolbar (Right) */}
          <div className="flex items-center gap-3 md:gap-5 text-kj-charcoal">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-kj-maroon p-1 transition-colors duration-200 focus:outline-none"
              aria-label="Search products"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="hover:text-kj-maroon p-1 transition-colors duration-200 relative focus:outline-none"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-kj-maroon text-kj-ivory text-[9px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-kj-ivory animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => openCart(true)}
              className="hover:text-kj-maroon p-1 transition-colors duration-200 relative focus:outline-none cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-kj-maroon text-kj-ivory text-[9px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-kj-ivory">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Link */}
            <Link
              to="/account/login"
              className="hover:text-kj-maroon p-1 transition-colors duration-200 focus:outline-none"
              aria-label="Account login"
            >
              <User size={20} />
            </Link>
          </div>

          {/* Desktop MegaMenu Flyout */}
          <AnimatePresence>
            {isMegaMenuOpen && (
              <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Slide-out Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            ></motion.div>
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-kj-ivory z-50 shadow-2xl p-6 overflow-y-auto flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-kj-charcoal hover:text-kj-maroon p-1 focus:outline-none"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation accordion-style */}
              <div className="flex flex-col gap-4 mb-8">
                <span className="text-[10px] tracking-widest text-kj-gold font-bold uppercase mb-1">
                  Shop Categories
                </span>
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-lg font-bold text-kj-charcoal hover:text-kj-maroon transition-colors duration-200 border-b border-kj-gold/10 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Additional Links */}
                <span className="text-[10px] tracking-widest text-kj-gold font-bold uppercase mt-4 mb-1">
                  Information
                </span>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm text-gray-600 hover:text-kj-maroon transition-colors duration-200"
                >
                  Our Brand Story
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm text-gray-600 hover:text-kj-maroon transition-colors duration-200"
                >
                  Store Locator
                </Link>
                <Link
                  to="/faqs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm text-gray-600 hover:text-kj-maroon transition-colors duration-200"
                >
                  Care & Warranty FAQs
                </Link>
              </div>

              {/* Promo Tile in Mobile Drawer */}
              <div className="mt-auto bg-kj-maroon text-kj-ivory p-5 border border-kj-gold/20 flex flex-col gap-2">
                <span className="text-[9px] tracking-widest text-kj-gold uppercase font-bold">
                  Bridal Season
                </span>
                <h4 className="font-serif text-sm font-bold leading-tight">
                  Flat 50% Off On Certified Gold Plating
                </h4>
                <Link
                  to="/collections/necklaces?filter=wedding"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-semibold text-kj-gold-light mt-2 flex items-center gap-1 hover:text-kj-ivory transition-colors duration-200"
                >
                  Shop Bridal Edit <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex flex-col items-center justify-start pt-16 md:pt-24 px-4"
          >
            {/* Exit click zone */}
            <div className="absolute inset-0 -z-10 cursor-pointer" onClick={() => setIsSearchOpen(false)}></div>

            <motion.div
              initial={{ y: -50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-kj-ivory w-full max-w-2xl shadow-2xl p-6 border border-kj-gold/30 rounded-none relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-kj-maroon transition-colors duration-200 p-1 focus:outline-none"
              >
                <X size={20} />
              </button>

              <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-kj-gold/40 pb-2 mb-6">
                <Search size={22} className="text-kj-gold mr-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for necklaces, rings, silver bangles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-kj-charcoal font-sans text-base placeholder-gray-400"
                />
              </form>

              {/* Suggestions dropdown list */}
              {searchQuery.trim() ? (
                <div>
                  <h4 className="text-[11px] font-sans font-bold tracking-widest text-kj-gold uppercase mb-3">
                    Matching Products ({suggestions.length})
                  </h4>
                  {suggestions.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {suggestions.map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/products/${prod.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-4 p-2 hover:bg-black/5 transition-colors duration-200 border-b border-gray-100 last:border-0"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-12 object-cover border border-kj-gold/10"
                          />
                          <div className="flex-grow">
                            <span className="font-serif text-sm font-semibold text-kj-charcoal hover:text-kj-maroon block">
                              {prod.name}
                            </span>
                            <span className="text-[10px] uppercase font-sans tracking-wide text-gray-500">
                              in {prod.categorySlug.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-serif text-xs font-semibold text-kj-maroon block">
                              {formatPrice(prod.price)}
                            </span>
                            {prod.originalPrice > prod.price && (
                              <span className="text-[10px] line-through text-gray-400 block font-sans">
                                {formatPrice(prod.originalPrice)}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                      
                      <button
                        type="submit"
                        onClick={handleSearchSubmit}
                        className="w-full text-center py-2.5 mt-2 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans tracking-wider uppercase font-semibold transition-colors duration-200 cursor-pointer"
                      >
                        View All Search Results
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-500 font-sans">No products found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h4 className="text-[11px] font-sans font-bold tracking-widest text-kj-gold uppercase mb-3">
                    Popular Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {navLinks.slice(0, 5).map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.path}
                        onClick={() => setIsSearchOpen(false)}
                        className="text-xs font-sans bg-kj-maroon/5 border border-kj-gold/20 text-kj-charcoal hover:bg-kj-maroon hover:text-kj-ivory py-1.5 px-3 transition-all duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;
