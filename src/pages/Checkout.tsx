import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../lib/formatPrice';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';

export const Checkout: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getCartSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);

  // Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Success state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mockOrderNumber, setMockOrderNumber] = useState('');

  const FREE_SHIPPING_LIMIT = 1999;
  const shippingFee = subtotal >= FREE_SHIPPING_LIMIT ? 0 : 99;
  const finalTotal = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    // Generate mock order number
    const randNum = Math.floor(100000 + Math.random() * 900000);
    setMockOrderNumber(`KJ-${randNum}`);
    setOrderPlaced(true);
    // Clear global cart state
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center bg-kj-ivory flex flex-col items-center gap-5">
        <CheckCircle2 size={64} className="text-kj-emerald animate-bounce" />
        
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs tracking-[0.2em] text-kj-gold font-bold uppercase">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-kj-maroon">
            Thank You for Shopping!
          </h1>
          <p className="font-sans text-xs md:text-sm text-gray-500 font-light max-w-sm mx-auto leading-relaxed mt-2">
            Your order has been received and is being processed by our Jaipur artisans. A confirmation message has been sent to <span className="font-semibold text-kj-charcoal">{email}</span>.
          </p>
        </div>

        <div className="bg-kj-maroon/5 border border-kj-gold/25 p-6 w-full text-left font-sans text-xs md:text-sm text-gray-600 flex flex-col gap-2.5">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="font-semibold">Order Number:</span>
            <span className="font-bold text-kj-maroon">{mockOrderNumber}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="font-semibold">Shipping Address:</span>
            <span>{firstName} {lastName}, {address}, {city} - {pincode}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Method:</span>
            <span className="uppercase">{paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Prepaid Online'}</span>
          </div>
        </div>

        <Link
          to="/"
          className="mt-6 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans tracking-widest uppercase font-bold py-3.5 px-8 transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory">
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon flex items-center gap-2">
          <ShieldCheck size={24} /> SECURE CHECKOUT
        </h1>
        <p className="font-sans text-xs md:text-sm text-gray-500 mt-1">
          Complete your purchase details below.
        </p>
      </div>

      {items.length > 0 ? (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Checkout Forms (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Contact details */}
            <div className="border border-kj-gold/15 bg-white p-5 md:p-6 flex flex-col gap-4">
              <h3 className="font-serif text-base font-bold text-kj-maroon border-b border-gray-100 pb-2.5 uppercase tracking-wide">
                Contact Information
              </h3>
              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                />
              </div>
            </div>

            {/* Delivery address */}
            <div className="border border-kj-gold/15 bg-white p-5 md:p-6 flex flex-col gap-4">
              <h3 className="font-serif text-base font-bold text-kj-maroon border-b border-gray-100 pb-2.5 uppercase tracking-wide">
                Delivery Address
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Address Line</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, suite, unit, street address"
                  className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">State</label>
                  <input
                    type="text"
                    required
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="State"
                    className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Pincode</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number (e.g. 9876543210)"
                  className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                />
              </div>
            </div>

            {/* Payment selections */}
            <div className="border border-kj-gold/15 bg-white p-5 md:p-6 flex flex-col gap-4">
              <h3 className="font-serif text-base font-bold text-kj-maroon border-b border-gray-100 pb-2.5 uppercase tracking-wide">
                Payment Method
              </h3>
              
              <div className="flex flex-col gap-3 font-sans text-xs md:text-sm text-gray-600">
                <label className="flex items-center gap-3 p-3 border border-kj-gold/20 bg-kj-ivory/30 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-kj-maroon w-4.5 h-4.5"
                  />
                  <div>
                    <span className="font-bold text-kj-charcoal block">Cash On Delivery (COD)</span>
                    <span className="text-xs text-gray-500 mt-0.5 block">Pay cash or scan QR at your doorstep. Flat ₹49 COD fee applies.</span>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-kj-gold/20 bg-kj-ivory/30 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="accent-kj-maroon w-4.5 h-4.5"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} className="text-kj-maroon" />
                    <div>
                      <span className="font-bold text-kj-charcoal block">Prepaid Card / UPI / NetBanking</span>
                      <span className="text-xs text-gray-500 mt-0.5 block">Secure mock payment gate checkout.</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submission CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-kj-maroon hover:bg-[#521323] text-kj-ivory font-sans text-xs uppercase tracking-widest font-bold text-center cursor-pointer transition-colors duration-300"
            >
              Place Order &amp; Pay {formatPrice(finalTotal + (paymentMethod === 'cod' ? 49 : 0))}
            </button>
          </div>

          {/* Right Column: Order Summary (Span 5) */}
          <div className="lg:col-span-5 border border-kj-gold/15 bg-white p-5 md:p-6 flex flex-col gap-4">
            <h3 className="font-serif text-base md:text-lg font-bold text-kj-charcoal border-b border-gray-100 pb-3 uppercase tracking-wide">
              Summary Details
            </h3>

            {/* Cart Items list */}
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-16 object-cover border border-kj-gold/10 flex-shrink-0" />
                  <div className="flex-grow min-w-0 text-xs text-left">
                    <span className="font-serif font-bold text-kj-charcoal line-clamp-1 block">{item.product.name}</span>
                    <span className="text-gray-500 block font-sans">Qty: {item.quantity} | {item.variant}</span>
                  </div>
                  <span className="font-serif text-xs font-semibold text-kj-maroon">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing tallies */}
            <div className="border-t border-gray-150 pt-4 mt-2 flex flex-col gap-2 font-sans text-xs md:text-sm text-gray-500 text-left">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-kj-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-kj-charcoal">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>
              {paymentMethod === 'cod' && (
                <div className="flex justify-between">
                  <span>COD Processing Fee</span>
                  <span className="font-semibold text-kj-charcoal">{formatPrice(49)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-3 text-kj-charcoal font-bold text-sm md:text-base">
                <span>Total Amount Due</span>
                <span className="font-serif text-kj-maroon font-extrabold text-lg">
                  {formatPrice(finalTotal + (paymentMethod === 'cod' ? 49 : 0))}
                </span>
              </div>
            </div>

            <Link
              to="/cart"
              className="font-sans text-[11px] font-bold text-kj-maroon hover:text-kj-gold uppercase tracking-wider flex items-center gap-1 mt-4"
            >
              <ArrowLeft size={12} /> Edit Shopping Bag
            </Link>
          </div>

        </form>
      ) : (
        <div className="text-center py-20 bg-kj-maroon/5 border border-dashed border-kj-gold/30">
          <ShoppingBag size={48} className="text-kj-gold mx-auto mb-4" />
          <h3 className="font-serif text-lg font-bold text-kj-charcoal">Your bag is empty</h3>
          <p className="font-sans text-xs text-gray-500 mt-1 max-w-xs mx-auto">Please add items to your cart before checking out.</p>
          <Link
            to="/collections/new-arrivals"
            className="mt-6 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans tracking-widest uppercase font-bold py-3 px-6 transition-colors duration-300 inline-block"
          >
            Shop Collections
          </Link>
        </div>
      )}
    </div>
  );
};
export default Checkout;
