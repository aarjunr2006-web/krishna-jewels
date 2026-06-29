import React, { useState } from 'react';
import { faqs } from '../../data/faqs';
import { Accordion } from '../ui/Accordion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SeoFaqBlock: React.FC = () => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <section className="py-16 bg-kj-ivory border-b border-kj-gold/10">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Container for SEO descriptions + FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left SEO Column (5 columns span) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon">
              Fine Indian Craftsmanship
            </h2>
            <div className="w-12 h-[1.5px] bg-kj-gold"></div>

            {/* Content box, height controlled on mobile */}
            <div
              className={`flex flex-col gap-4 font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light transition-all duration-300 ${
                !mobileExpanded ? 'max-h-[160px] overflow-hidden lg:max-h-none' : 'max-h-none'
              }`}
            >
              <p>
                <strong>Handcrafted Necklaces & Chains:</strong> Explore our selection of traditional chokers and minimalist gold-plated necklace designs. Perfect for bridging bridal heritage with daily styling, each piece is stamped and finished with tarnish-resistant rhodium and micron-layered gold.
              </p>
              <p>
                <strong>Elegant Earrings & Studs:</strong> Find the ideal pair of Jhumkas or sleek gemstone hoops. Our pieces are 100% hypoallergenic, nickel-free, and lead-free, ensuring comfortable, all-day wear for sensitive ears.
              </p>
              <p>
                <strong>Mangalsutras & Men's Rings:</strong> Celebrate your bonds with modern mangalsutra designs featuring fine black onyx beading and pearl drops, or explore rugged, hand-braided oxidized sterling silver cuffs and bands customized for men.
              </p>
            </div>

            {/* Mobile Expand Trigger */}
            <button
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="lg:hidden text-xs font-semibold text-kj-maroon hover:text-kj-gold flex items-center gap-1 mt-1 cursor-pointer focus:outline-none"
            >
              {mobileExpanded ? (
                <>
                  Show Less <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>

          {/* Right FAQ Column (7 columns span) */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="font-serif text-2xl font-bold text-kj-maroon mb-4">
              Frequently Asked Questions
            </h3>
            <div className="w-12 h-[1.5px] bg-kj-gold mb-6"></div>

            <div className="flex flex-col border-t border-kj-gold/30">
              {faqs.map((faq, idx) => (
                <Accordion key={idx} title={faq.question}>
                  {faq.answer}
                </Accordion>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default SeoFaqBlock;
