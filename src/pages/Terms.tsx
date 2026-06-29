import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light">
      
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon uppercase tracking-wide">
          Terms of Service
        </h1>
        <p className="font-sans text-xs text-gray-500 mt-1">
          Understanding the rules, regulations, and agreements governing website usage.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <p><strong>Last Updated: June 2026</strong></p>
        <p>
          This website is operated by Krishna Jewellers. Throughout the site, the terms “we”, “us” and “our” refer to Krishna Jewellers. By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions.
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">1. Online Store Terms</h3>
        <p>
          By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">2. Products & Pricing</h3>
        <p>
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We have made every effort to display as accurately as possible the colors and images of our products.
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">3. Accuracy of Billing</h3>
        <p>
          We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">4. Governing Law</h3>
        <p>
          These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India, with jurisdiction in Jaipur, Rajasthan.
        </p>
      </div>

    </div>
  );
};
export default Terms;
