import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 text-left bg-kj-ivory font-sans text-xs md:text-sm text-gray-600 leading-relaxed">
      
      {/* Page Title */}
      <div className="border-b border-kj-gold/20 pb-4 mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon uppercase tracking-wide">
          Our Brand Story
        </h1>
        <p className="font-sans text-xs text-gray-500 mt-1 uppercase tracking-widest">
          Heirloom-grade jewellery, made for everyday life.
        </p>
      </div>

      <div className="flex flex-col gap-6 font-light">
        
        {/* Heritage image mock */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-kj-maroon/5 border border-kj-gold/25 mb-4 flex items-center justify-center">
          <img src="/assets/brand_craft_story.png" alt="Generational Indian artisan at work" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-kj-ivory tracking-wider uppercase">
              The Art of Ornamentation
            </h2>
          </div>
        </div>

        <h3 className="font-serif text-lg md:text-xl font-bold text-kj-maroon mt-2 mb-1">
          Our Beginnings (Est. 1989)
        </h3>
        <p>
          Founded in the pink city of Jaipur in 1989, Krishna Jewellers began as a small, family-owned atelier specialized in restoring antique royal jewelry. We spent decades working behind the scenes with generational karigars (artisans) learning the fine art of Kundan stone setting, delicate hand-painted enamel minakari, and traditional silver-smithing.
        </p>
        <p>
          In 2024, we took our heritage directly to the digital storefront. We realized that while traditional Indian designs carry a sacred weight of beauty, they are often locked away in bank vaults due to high costs and delicate wearability. We set out to redefine this relationship.
        </p>

        <h3 className="font-serif text-lg md:text-xl font-bold text-kj-maroon mt-4 mb-1">
          The Everyday Heirloom
        </h3>
        <p>
          Why should heritage only be worn once a year? Our design philosophy bridges traditional Indian grandeur (such as heavy peacock motifs and polki studs) with sleek, modern minimalism (braided cuffs, simple wave bands, and single-strand mangalsutras).
        </p>
        <p>
          By pairing genuine 925 sterling silver, hypoallergenic brass bases, and thick micron-level gold plating (18k to 22k gold), we create jewelry that is fully tarnish-proof, safe for sensitive skin, and priced for accessibility. These are heirlooms designed to be lived in &mdash; from office calls to evening celebrations.
        </p>

        <h3 className="font-serif text-lg md:text-xl font-bold text-kj-maroon mt-4 mb-1">
          Generational Craftsmanship
        </h3>
        <p>
          Each design begins as a hand-drawn sketch in our Jaipur design labs. Generation karigars then hand-set the sparkling cubic zirconia stones, weave seed pearls, and pour warm enamel. We support our artisan communities directly, ensuring fair wages and preserving the heritage craft of handmade Indian jewelry.
        </p>
        
        {/* Quote Block */}
        <blockquote className="border-l-4 border-kj-gold pl-4 py-2 italic font-serif text-base text-kj-maroon bg-kj-maroon/5 my-4">
          "A piece of jewelry is not just gold or silver; it is a memory, a legacy, and a little spark of devotion you carry with you every single day."
        </blockquote>

        <p>
          We back all our craftsmanship with a 6-month warranty and a Lifetime Exchange policy. When you buy from Krishna Jewellers, you become part of our parivar (family), joining a legacy of grace, durability, and trust.
        </p>
      </div>

    </div>
  );
};
export default About;
