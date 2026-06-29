import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light">
      
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon uppercase tracking-wide">
          Privacy Policy
        </h1>
        <p className="font-sans text-xs text-gray-500 mt-1">
          How we handle, secure, and respect your personal information.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <p><strong>Last Updated: June 2026</strong></p>
        <p>
          At Krishna Jewellers, we value the trust you place in us. This Privacy Policy describes how we collect, use, and protect your personal information when you visit or make a purchase from our website.
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">1. Personal Information We Collect</h3>
        <p>
          When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">2. How We Use Your Information</h3>
        <p>
          We use the order information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this information to communicate with you and screen our orders for potential risk or fraud.
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">3. Data Security</h3>
        <p>
          We employ industry-standard encryption protocols (SSL/TLS) to safeguard your checkout details and personal information. We do not store credit card numbers on our servers; all payments are processed through secure, PCI-compliant third-party gateways.
        </p>

        <h3 className="font-serif font-bold text-kj-maroon text-sm md:text-base mt-2">4. Contact Us</h3>
        <p>
          For more information about our privacy practices, or if you have questions, please contact us by e-mail at <em>privacy@krishnajewellers.com</em>.
        </p>
      </div>

    </div>
  );
};
export default Privacy;
