import React from 'react';
import { Truck, RotateCcw, Award } from 'lucide-react';

export const ShippingReturns: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light">
      
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon uppercase tracking-wide">
          Shipping & Returns Policy
        </h1>
        <p className="font-sans text-xs text-gray-500 mt-1 uppercase tracking-widest">
          Transparent policies designed to safeguard your experience.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Shipping section */}
        <div className="border border-kj-gold/15 bg-white p-6 flex flex-col gap-3">
          <h2 className="font-serif text-base md:text-lg font-bold text-kj-maroon flex items-center gap-2 border-b border-gray-50 pb-2">
            <Truck size={18} className="text-kj-gold" /> Shipping & Delivery
          </h2>
          <p>
            We offer secure, insured shipping to over 15,000+ pincodes across India. All packages are dispatch-tracked and require a signature upon delivery to ensure safety.
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1 text-gray-500 font-light">
            <li><strong>Shipping Charge:</strong> Free standard shipping across India on orders above ₹1,999. A flat shipping fee of ₹99 applies to orders below ₹1,999.</li>
            <li><strong>COD Fee:</strong> Cash on Delivery (COD) is available for orders up to ₹15,000, with a processing surcharge of ₹49.</li>
            <li><strong>Dispatch Timelines:</strong> In-stock pieces are dispatched within 24 to 48 hours. Made-to-order custom items ship in 5 to 7 business days.</li>
            <li><strong>Transit Timelines:</strong> Metro cities receive packages within 2 to 4 business days. Tier-2 and Tier-3 towns deliver in 4 to 6 business days.</li>
          </ul>
        </div>

        {/* Returns section */}
        <div className="border border-kj-gold/15 bg-white p-6 flex flex-col gap-3">
          <h2 className="font-serif text-base md:text-lg font-bold text-kj-maroon flex items-center gap-2 border-b border-gray-50 pb-2">
            <RotateCcw size={18} className="text-kj-gold" /> 7-Day Easy Returns & Exchanges
          </h2>
          <p>
            If you are not fully satisfied with your purchase, you can return or exchange the item within <strong>7 days</strong> from the date of delivery.
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1 text-gray-500 font-light">
            <li><strong>Condition:</strong> Jewelry must be completely unused, showing no signs of wear, in its original sliding box/velvet pouch, and containing the Certificate of Authenticity.</li>
            <li><strong>Process:</strong> Write to us at <em>returns@krishnajewellers.com</em> with your order number. Our logistics partner will arrange a free reverse pickup from your address.</li>
            <li><strong>Refunds:</strong> Once the quality control team approves the return, refunds are initiated. Prepaid orders receive refunds directly to original source cards within 5 to 7 days. COD orders are refunded via Bank Transfer or Store Credit.</li>
          </ul>
        </div>

        {/* Exchange section */}
        <div className="border border-kj-gold/15 bg-white p-6 flex flex-col gap-3">
          <h2 className="font-serif text-base md:text-lg font-bold text-kj-maroon flex items-center gap-2 border-b border-gray-50 pb-2">
            <Award size={18} className="text-kj-gold" /> Lifetime Exchange Program
          </h2>
          <p>
            At Krishna Jewellers, we take pride in the longevity of our creations. If your gold-plated range ever experiences color fading, or if you simply wish to upgrade your sterling silver designs, you can avail of our Lifetime Exchange.
          </p>
          <p>
            Return your worn or tarnished item at any time to receive a **50% buy-back value credit** (based on the prevailing value of the product on our storefront) towards the purchase of any new jewelry design.
          </p>
        </div>

      </div>

    </div>
  );
};
export default ShippingReturns;
