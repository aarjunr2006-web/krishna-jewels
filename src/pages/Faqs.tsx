import React from 'react';
import { faqs } from '../data/faqs';
import { Accordion } from '../components/ui/Accordion';
import { HelpCircle } from 'lucide-react';

export const Faqs: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory">
      
      {/* Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon flex items-center gap-2">
          <HelpCircle size={24} /> HELP & FAQS
        </h1>
        <p className="font-sans text-xs md:text-sm text-gray-500 mt-1">
          Everything you need to know about material composition, care, warranty, and policies.
        </p>
      </div>

      <div className="flex flex-col border border-kj-gold/15 bg-white p-6 md:p-8">
        <h3 className="font-serif text-lg font-bold text-kj-maroon mb-4 uppercase tracking-wider">
          Patron Questions
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
  );
};
export default Faqs;
