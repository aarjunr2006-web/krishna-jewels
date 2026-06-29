import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductTabs } from '../components/product/ProductTabs';
import { ReviewsSection } from '../components/product/ReviewsSection';
import { CrossSellRail } from '../components/product/CrossSellRail';
import { StarRating } from '../components/ui/StarRating';
import { PriceTag } from '../components/ui/PriceTag';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { ChevronRight, Heart, ShoppingBag, Truck, Gift, ShieldAlert, Award, RotateCcw } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const currentProduct = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [slug]);

  if (!currentProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center bg-kj-ivory">
        <h2 className="font-serif text-3xl font-bold text-kj-maroon mb-4">Product Not Found</h2>
        <p className="font-sans text-sm text-gray-500 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/collections/new-arrivals" className="bg-kj-maroon text-kj-ivory px-6 py-3 text-xs uppercase tracking-widest font-bold font-sans">
          Back to Collections
        </Link>
      </div>
    );
  }

  // State Management
  const [selectedVariant, setSelectedVariant] = useState(
    currentProduct.variants && currentProduct.variants.length > 0 ? currentProduct.variants[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [addedNote, setAddedNote] = useState(false);

  const reviewsSectionRef = useRef<HTMLDivElement>(null);

  const addToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.setIsOpen);
  
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(currentProduct.id));

  const handleAddToBag = () => {
    // Add to cart with variant & optional gift wrap upcharge metadata if necessary
    addToCart(currentProduct, selectedVariant, quantity);
    setAddedNote(true);
    setTimeout(() => {
      setAddedNote(false);
      openCart(true);
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(currentProduct, selectedVariant, quantity);
    openCart(true);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      setIsCheckingPincode(true);
      setTimeout(() => {
        setIsCheckingPincode(false);
        const date = new Date();
        date.setDate(date.getDate() + 3);
        const weekday = date.toLocaleDateString('en-IN', { weekday: 'long' });
        const monthDay = date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        setDeliveryMessage(`🚚 Delivery available for pin ${pincode}! Guaranteed by ${weekday}, ${monthDay}.`);
      }, 800);
    } else {
      setDeliveryMessage('⚠️ Please enter a valid 6-digit Indian postal code.');
    }
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 text-left bg-kj-ivory">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 font-sans text-xs text-gray-500 uppercase tracking-widest mb-8">
        <Link to="/" className="hover:text-kj-maroon transition-colors duration-200">
          Home
        </Link>
        <ChevronRight size={10} />
        <Link to={`/collections/${currentProduct.categorySlug}`} className="hover:text-kj-maroon transition-colors duration-200">
          {currentProduct.categorySlug.replace('-', ' ')}
        </Link>
        <ChevronRight size={10} />
        <span className="text-kj-maroon font-semibold">{currentProduct.name}</span>
      </div>

      {/* PDP Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        
        {/* Left Column: Gallery (Span 7) */}
        <div className="lg:col-span-7">
          <ProductGallery images={currentProduct.images} productName={currentProduct.name} />
        </div>

        {/* Right Column: Configurations (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Header Info */}
          <div>
            <span className="text-xs uppercase font-sans tracking-widest text-kj-gold font-bold mb-1.5 block">
              {currentProduct.categorySlug.replace('-', ' ')}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-kj-charcoal leading-tight mb-2">
              {currentProduct.name}
            </h1>
            
            {/* Reviews Hook */}
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={currentProduct.rating} size={14} />
              <a
                href="#reviews"
                onClick={scrollToReviews}
                className="font-sans text-xs text-kj-maroon hover:text-kj-gold font-semibold underline"
              >
                {currentProduct.reviewCount} Patron Reviews
              </a>
            </div>
          </div>

          {/* Price Block */}
          <div className="border-y border-kj-gold/25 py-4">
            <PriceTag
              price={currentProduct.price}
              originalPrice={currentProduct.originalPrice}
              discount={currentProduct.discount}
              size="xl"
            />
            <p className="font-sans text-[11px] text-gray-500 tracking-wider mt-1.5 uppercase font-medium">
              Inclusive of all taxes. Free delivery on orders above ₹1,999.
            </p>
          </div>

          {/* Stock Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${currentProduct.inStock ? 'bg-kj-emerald animate-pulse' : 'bg-gray-400'}`}></div>
            <span className={`font-sans text-xs md:text-sm font-semibold uppercase tracking-wider ${currentProduct.inStock ? 'text-kj-emerald' : 'text-gray-500'}`}>
              {currentProduct.inStock ? 'In Stock — Ships in 2 Days' : 'Out of Stock / Sold Out'}
            </span>
          </div>

          {/* Variant Selector */}
          {currentProduct.variants && currentProduct.variants.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Select Option / Size
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProduct.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 border font-sans text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none ${
                      selectedVariant === v
                        ? 'border-kj-maroon bg-kj-maroon text-kj-ivory'
                        : 'border-kj-gold/30 hover:border-kj-maroon text-kj-charcoal'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          {currentProduct.inStock && (
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Quantity
              </span>
              <div className="flex items-center border border-kj-gold/35 bg-white self-start">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="py-2 px-4 hover:bg-kj-maroon hover:text-kj-ivory text-gray-500 font-bold transition-colors cursor-pointer focus:outline-none"
                >
                  -
                </button>
                <span className="font-sans text-sm font-semibold text-kj-charcoal px-4 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="py-2 px-4 hover:bg-kj-maroon hover:text-kj-ivory text-gray-500 font-bold transition-colors cursor-pointer focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Optional Gift Wrap Checkbox */}
          <label className="flex items-center gap-3 border border-kj-gold/20 p-4 bg-kj-maroon/5 cursor-pointer">
            <input
              type="checkbox"
              checked={giftWrap}
              onChange={() => setGiftWrap(!giftWrap)}
              className="accent-kj-maroon w-4.5 h-4.5 border-kj-gold/30"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif text-sm font-bold text-kj-maroon flex items-center gap-1.5">
                <Gift size={14} /> Add Premium Gifting Wrap (+ ₹49)
              </span>
              <span className="font-sans text-xs text-gray-500 font-light mt-0.5">
                Silk bow ribbon boxes and handwritten greeting notes.
              </span>
            </div>
          </label>

          {/* Purchase Actions (Add to Bag / Buy Now / Wishlist) */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={handleAddToBag}
              disabled={!currentProduct.inStock || addedNote}
              className={`flex-grow py-3.5 px-6 font-sans text-xs font-bold uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                !currentProduct.inStock
                  ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                  : addedNote
                  ? 'bg-kj-gold text-kj-charcoal border-kj-gold'
                  : 'bg-kj-maroon text-kj-ivory border-kj-maroon hover:bg-[#521323]'
              }`}
            >
              <ShoppingBag size={14} />
              {addedNote ? 'Adding to Bag...' : !currentProduct.inStock ? 'Out of Stock' : 'Add to Bag'}
            </button>

            {currentProduct.inStock && (
              <button
                onClick={handleBuyNow}
                className="py-3.5 px-6 border border-kj-maroon text-kj-maroon hover:bg-kj-maroon hover:text-kj-ivory font-sans text-xs font-bold uppercase tracking-widest text-center transition-all duration-300 cursor-pointer"
              >
                Buy It Now
              </button>
            )}

            <button
              onClick={() => toggleWishlist(currentProduct)}
              className={`p-3.5 border transition-all duration-300 cursor-pointer focus:outline-none ${
                isInWishlist
                  ? 'border-kj-maroon bg-kj-maroon text-kj-ivory'
                  : 'border-kj-gold/30 hover:border-kj-maroon text-kj-maroon hover:bg-kj-maroon/5'
              }`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Pincode Estimator Widget */}
          <div className="border border-gray-150 p-4 mt-2">
            <h4 className="font-serif text-sm font-bold text-kj-charcoal mb-2 flex items-center gap-1.5">
              <Truck size={16} className="text-kj-gold" /> Check Delivery Timelines
            </h4>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode (e.g. 400001)"
                className="flex-grow bg-white border border-kj-gold/30 px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-kj-maroon font-sans"
              />
              <button
                type="submit"
                disabled={isCheckingPincode}
                className="bg-kj-maroon hover:bg-[#521323] text-kj-ivory px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
              >
                {isCheckingPincode ? 'Checking...' : 'Check'}
              </button>
            </form>
            {deliveryMessage && (
              <p className="font-sans text-xs text-gray-600 mt-2.5 font-light">
                {deliveryMessage}
              </p>
            )}
          </div>

          {/* Trust points list */}
          <div className="grid grid-cols-3 gap-2 border-t border-kj-gold/20 pt-4 mt-2 text-center text-[10px] uppercase font-sans font-semibold tracking-wider text-gray-500">
            <div className="flex flex-col items-center gap-1">
              <Award size={18} className="text-kj-gold" />
              <span>Lifetime Exchange</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-kj-gold/15">
              <ShieldAlert size={18} className="text-kj-gold" />
              <span>Safe Materials</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw size={18} className="text-kj-gold" />
              <span>7-Day Return</span>
            </div>
          </div>

        </div>
      </div>

      {/* Product tabs under fold */}
      <ProductTabs
        description={currentProduct.description}
        specs={currentProduct.specs}
        details={currentProduct.details}
      />

      {/* Complete Look & related products cross sell */}
      <CrossSellRail currentProduct={currentProduct} allProducts={products} />

      {/* Reviews anchor section */}
      <div id="reviews" ref={reviewsSectionRef}>
        <ReviewsSection initialReviews={currentProduct.reviews} rating={currentProduct.rating} />
      </div>

    </div>
  );
};
export default ProductDetail;
