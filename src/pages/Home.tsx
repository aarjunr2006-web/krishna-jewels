import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryStrip } from '../components/home/CategoryStrip';
import { BestsellerTabs } from '../components/home/BestsellerTabs';
import { PromoBannerStrip } from '../components/home/PromoBannerStrip';
import { OccasionTabs } from '../components/home/OccasionTabs';
import { BrandStory } from '../components/home/BrandStory';
import { TrustBadges } from '../components/home/TrustBadges';
import { Testimonials } from '../components/home/Testimonials';
import { StoreLocatorTeaser } from '../components/home/StoreLocatorTeaser';
import { SeoFaqBlock } from '../components/home/SeoFaqBlock';

export const Home: React.FC = () => {
  return (
    <div className="w-full bg-kj-ivory">
      {/* 1. Hero banner carousel */}
      <Hero />

      {/* 2. Shop by category strip */}
      <CategoryStrip />

      {/* 3. Tabbed Bestseller carousel */}
      <BestsellerTabs />

      {/* 4. Clickable Promo banner strip */}
      <PromoBannerStrip />

      {/* 5. Shop by occasion tabs */}
      <OccasionTabs />

      {/* 6. Brand heritage block */}
      <BrandStory />

      {/* 7. Corporate Trust badges */}
      <TrustBadges />

      {/* 8. Patron Testimonials */}
      <Testimonials />

      {/* 9. Store locator banner */}
      <StoreLocatorTeaser />

      {/* 10. SEO keyword paragraphs & accordion FAQs */}
      <SeoFaqBlock />
    </div>
  );
};
export default Home;
