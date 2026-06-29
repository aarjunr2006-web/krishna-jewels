import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductTabsProps {
  description: string;
  specs: Record<string, string>;
  details: string[];
}

const tabs = ['Description', 'Specifications', 'Care & Returns'];

export const ProductTabs: React.FC<ProductTabsProps> = ({ description, specs, details }) => {
  const [activeTab, setActiveTab] = useState('Description');

  return (
    <div className="w-full mt-12 border-t border-kj-gold/20 pt-8">
      {/* Tab Selectors */}
      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar mb-6 gap-6 justify-start">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-xs md:text-sm font-sans font-semibold tracking-wider uppercase transition-colors duration-300 cursor-pointer focus:outline-none flex-shrink-0 ${
                isActive ? 'text-kj-maroon' : 'text-gray-400 hover:text-kj-charcoal'
              }`}
            >
              {tab}
              {isActive && (
                <motion.div
                  layoutId="activeProductTabLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-kj-maroon"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[160px] text-left">
        {activeTab === 'Description' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light"
          >
            <p>{description}</p>
            {details && details.length > 0 && (
              <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-2 text-gray-500">
                {details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {activeTab === 'Specifications' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs md:text-sm text-gray-600"
          >
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(specs).map(([key, val], idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-black/2 font-light">
                    <td className="py-3 pr-4 font-semibold text-kj-maroon w-1/3 md:w-1/4 uppercase tracking-wider text-[11px]">
                      {key}
                    </td>
                    <td className="py-3 text-kj-charcoal">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'Care & Returns' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 font-sans text-xs md:text-sm text-gray-600 leading-relaxed font-light"
          >
            <div>
              <h4 className="font-serif font-bold text-kj-maroon text-sm md:text-base mb-1.5">Jewellery Care Instructions</h4>
              <p>Keep your jewellery dry and store it in an airtight container or zip lock bag. Avoid direct contact with hand sanitizers, soaps, perfumes, hairsprays, cosmetics, and household cleaning chemicals. Wipe down gently with a dry, soft cotton cloth after use.</p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-kj-maroon text-sm md:text-base mb-1.5">Returns & Replacements</h4>
              <p>We offer a hassle-free 7-day return policy. Items must be in their original packaging, unused, and accompanied by the warranty card. Reverse pickup will be arranged by our logistics partners free of charge.</p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-kj-maroon text-sm md:text-base mb-1.5">Lifetime Exchange Policy</h4>
              <p>All items qualify for our Lifetime Exchange. Exchange any worn or tarnished gold-plated or silver jewelry at any time for 50% of the prevailing product value towards a new design purchase.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default ProductTabs;
