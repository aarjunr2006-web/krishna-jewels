import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../lib/formatPrice';

export const CartDrawer: React.FC = () => {
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getCartSubtotal());
  const count = useCartStore((state) => state.getCartCount());

  const navigate = useNavigate();
  const FREE_SHIPPING_LIMIT = 1999;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_LIMIT - subtotal;

  const handleCheckoutClick = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          ></motion.div>

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-kj-ivory z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-kj-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-kj-maroon" />
                <h2 className="font-serif text-lg md:text-xl font-bold tracking-wide text-kj-charcoal">
                  YOUR BAG ({count})
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-kj-charcoal hover:text-kj-maroon p-1 focus:outline-none cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Free Shipping Meter */}
            {items.length > 0 && (
              <div className="bg-kj-gold-light/40 px-6 py-4 border-b border-kj-gold/20">
                {subtotal >= FREE_SHIPPING_LIMIT ? (
                  <p className="font-sans text-xs text-kj-emerald font-semibold uppercase tracking-wider text-center">
                    🎉 You qualify for FREE Delivery!
                  </p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <p className="font-sans text-xs text-kj-charcoal">
                      Add <span className="font-bold text-kj-maroon">{formatPrice(remainingForFreeShipping)}</span> more for <span className="font-bold">FREE Delivery</span>
                    </p>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-kj-maroon h-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Line Items List */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-5">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant}`}
                    className="flex gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover border border-kj-gold/10"
                    />
                    
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/products/${item.product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="font-serif text-sm font-semibold text-kj-charcoal hover:text-kj-maroon transition-colors duration-200 leading-tight pr-2"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id, item.variant)}
                          className="text-gray-400 hover:text-kj-rose p-0.5 focus:outline-none cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Variant Indicator */}
                      <span className="font-sans text-[11px] text-gray-500 mt-1 uppercase tracking-wider">
                        Variant: {item.variant}
                      </span>

                      {/* Quantity Stepper & Price */}
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center border border-kj-gold/30 bg-white">
                          <button
                            onClick={() => updateQty(item.product.id, item.variant, item.quantity - 1)}
                            className="p-1 px-2.5 text-gray-500 hover:bg-kj-maroon hover:text-kj-ivory transition-colors duration-200 cursor-pointer focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-sans text-xs px-2.5 font-semibold text-kj-charcoal select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.variant, item.quantity + 1)}
                            className="p-1 px-2.5 text-gray-500 hover:bg-kj-maroon hover:text-kj-ivory transition-colors duration-200 cursor-pointer focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-serif text-sm font-bold text-kj-maroon block">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-gray-400 font-sans block">
                              ({formatPrice(item.product.price)} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <ShoppingBag size={48} strokeWidth={1} className="text-kj-gold" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-kj-charcoal">Your bag is empty</h3>
                    <p className="font-sans text-xs text-gray-500 mt-1 leading-normal max-w-[240px] mx-auto">
                      Explore our handcrafted heritage jewelry and find something special.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-2 bg-kj-maroon hover:bg-[#521323] text-kj-ivory text-xs font-sans tracking-wider uppercase font-semibold py-3 px-6 transition-colors duration-300 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-kj-gold/20 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Subtotal
                  </span>
                  <span className="font-serif text-lg font-bold text-kj-maroon">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="font-sans text-[11px] text-gray-400 mb-4">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-3.5 bg-kj-maroon hover:bg-[#521323] text-kj-ivory font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                  >
                    Proceed to Checkout
                  </button>
                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 text-kj-maroon hover:text-[#521323] font-sans text-xs uppercase tracking-widest font-bold border border-kj-maroon/20 hover:border-kj-maroon/50 transition-colors duration-200"
                  >
                    View Detailed Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
