import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../lib/formatPrice';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

export const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getCartSubtotal());
  const count = useCartStore((state) => state.getCartCount());

  const navigate = useNavigate();

  // Coupon state
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCoupon = coupon.trim().toUpperCase();
    if (cleanCoupon === 'FESTIVE10' || cleanCoupon === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponSuccess('🎟️ Coupon applied! 10% discount subtracted from subtotal.');
      setCouponError('');
    } else if (cleanCoupon === 'KESHAV5') {
      setDiscountPercent(5);
      setCouponSuccess('🎟️ Coupon applied! 5% discount subtracted from subtotal.');
      setCouponError('');
    } else {
      setDiscountPercent(0);
      setCouponError('⚠️ Invalid coupon code. Try WELCOME10 or FESTIVE10.');
      setCouponSuccess('');
    }
  };

  // Pricing calculations
  const FREE_SHIPPING_LIMIT = 1999;
  const shippingFee = subtotal >= FREE_SHIPPING_LIMIT || subtotal === 0 ? 0 : 99;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount + shippingFee;

  const progressPercent = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_LIMIT - subtotal;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory">
      
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon flex items-center gap-2">
          <ShoppingBag size={24} /> SHOPPING BAG
        </h1>
        <p className="font-sans text-xs md:text-sm text-gray-500 mt-1">
          Review your items, apply savings coupons, and checkout securely.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Items details (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Free Shipping Alert banner */}
            <div className="bg-kj-gold-light/20 border border-kj-gold/30 p-4">
              {subtotal >= FREE_SHIPPING_LIMIT ? (
                <p className="font-sans text-xs md:text-sm text-kj-emerald font-semibold uppercase tracking-wider text-center">
                  🎉 Congratulations! Your order qualifies for Free Standard Delivery.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="font-sans text-xs md:text-sm text-kj-charcoal text-center">
                    Add <span className="font-bold text-kj-maroon">{formatPrice(remainingForFreeShipping)}</span> more to unlock <span className="font-bold">FREE Delivery</span>
                  </p>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden max-w-md mx-auto">
                    <div
                      className="bg-kj-maroon h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* List items block */}
            <div className="flex flex-col border border-kj-gold/15 bg-white p-4 md:p-6 gap-6">
              
              {/* Header tags (Hidden on mobile) */}
              <div className="hidden md:grid grid-cols-12 border-b border-gray-100 pb-3 font-sans text-xs font-bold uppercase tracking-wider text-gray-400">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items loops */}
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant}`}
                  className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                >
                  
                  {/* Detail card */}
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 md:w-20 md:h-24 object-cover border border-kj-gold/10 flex-shrink-0"
                    />
                    <div className="flex flex-col justify-start text-left min-w-0">
                      <Link
                        to={`/products/${item.product.slug}`}
                        className="font-serif text-sm md:text-base font-bold text-kj-charcoal hover:text-kj-maroon transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <span className="font-sans text-[11px] text-gray-500 uppercase tracking-wider mt-1 block">
                        Option: {item.variant}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id, item.variant)}
                        className="inline-flex items-center gap-1 font-sans text-[11px] text-kj-rose hover:text-red-700 font-semibold mt-3 text-left self-start focus:outline-none cursor-pointer"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center border border-kj-gold/30 bg-white">
                      <button
                        onClick={() => updateQty(item.product.id, item.variant, item.quantity - 1)}
                        className="p-1 px-2.5 text-gray-500 hover:bg-kj-maroon hover:text-kj-ivory transition-colors cursor-pointer focus:outline-none"
                      >
                        -
                      </button>
                      <span className="font-sans text-xs px-2.5 font-semibold text-kj-charcoal select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.variant, item.quantity + 1)}
                        className="p-1 px-2.5 text-gray-500 hover:bg-kj-maroon hover:text-kj-ivory transition-colors cursor-pointer focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Single item price info */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-right flex md:block justify-between items-center text-sm">
                    <span className="md:hidden font-sans text-xs text-gray-400 font-semibold uppercase">Unit Price</span>
                    <span className="font-sans text-kj-charcoal font-medium">
                      {formatPrice(item.product.price)}
                    </span>
                  </div>

                  {/* Subtotal total price info */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-right flex md:block justify-between items-center text-sm font-semibold">
                    <span className="md:hidden font-sans text-xs text-gray-400 font-semibold uppercase">Total Price</span>
                    <span className="font-serif text-kj-maroon font-bold text-base">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Right Column: Order Summary Sidebar (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Promo Code check box */}
            <div className="border border-kj-gold/15 bg-white p-5 text-left">
              <h3 className="font-serif text-sm font-bold text-kj-maroon mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <Ticket size={16} className="text-kj-gold" /> Promo / Gift Coupon
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WELCOME10"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-grow bg-white border border-kj-gold/30 px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-kj-maroon font-sans uppercase"
                />
                <button
                  type="submit"
                  className="bg-kj-maroon hover:bg-[#521323] text-kj-ivory px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {couponSuccess && (
                <p className="font-sans text-[11px] text-kj-emerald mt-2 font-medium">
                  {couponSuccess}
                </p>
              )}
              {couponError && (
                <p className="font-sans text-[11px] text-kj-rose mt-2 font-medium">
                  {couponError}
                </p>
              )}
            </div>

            {/* Price Calculations breakdown sidebar */}
            <div className="border border-kj-gold/15 bg-white p-5 md:p-6 text-left flex flex-col gap-4">
              <h3 className="font-serif text-base md:text-lg font-bold text-kj-charcoal border-b border-gray-100 pb-3 uppercase tracking-wide">
                Order Summary
              </h3>

              <div className="flex flex-col gap-2.5 font-sans text-xs md:text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal ({count} items)</span>
                  <span className="font-medium text-kj-charcoal">{formatPrice(subtotal)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-kj-rose font-medium">
                    <span>Coupon Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-kj-charcoal">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center text-kj-charcoal">
                <span className="font-sans text-sm font-bold uppercase tracking-wider">
                  Grand Total
                </span>
                <span className="font-serif text-xl md:text-2xl font-bold text-kj-maroon">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-kj-maroon hover:bg-[#521323] text-kj-ivory font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer mt-4 transition-colors duration-300"
              >
                Proceed to Secure Checkout
              </button>

              {/* Secure note */}
              <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2 font-sans justify-center">
                <ShieldCheck size={14} className="text-kj-emerald" />
                <span>100% Secure Checkout | Safe & Authentic Guarantee</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-kj-gold/30 bg-kj-maroon/5 flex flex-col items-center justify-center gap-4">
          <ShoppingBag size={48} strokeWidth={1} className="text-kj-gold animate-bounce" />
          <div>
            <h3 className="font-serif text-lg font-bold text-kj-charcoal">Your shopping bag is empty</h3>
            <p className="font-sans text-xs text-gray-500 mt-1 leading-normal max-w-[240px] mx-auto">
              You haven't added any products to your cart yet. Explore our ranges of fine accessories.
            </p>
          </div>
          <Link
            to="/collections/new-arrivals"
            className="mt-2 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans tracking-wider uppercase font-semibold py-3 px-6 transition-colors duration-300 inline-flex items-center gap-1"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>
      )}

    </div>
  );
};
export default Cart;
