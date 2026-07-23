import React, { useEffect } from 'react';
import { AmbientBackground } from './AmbientBackground';
import HeroSlider from './HeroSlider';
import { ClientTrust } from './ClientTrust';
import ExperienceStatsBar from './ExperienceStatsBar';
import { WhyChooseUs } from './WhyChooseUs';
import FeaturedProducts from './FeaturedProducts';
import { TeamAndInfrastructure } from './TeamAndInfrastructure';
import { ManufacturingProcess } from './ManufacturingProcess';
import { Testimonials } from './Testimonials';
import { DownloadCatalogue } from './DownloadCatalogue';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import { FEATURED_PRODUCTS, ProductItem } from '../data';

interface HealthcarePageProps {
  onRequestQuote: (productName?: string) => void;
  onViewDetails: (product: ProductItem) => void;
}

export default function HealthcarePage({ onRequestQuote, onViewDetails }: HealthcarePageProps) {
  useEffect(() => {
    document.title = "Hospital & Diagnostic Centre Printing Services | Printopia Solutions";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Custom printing solutions for hospitals, clinics, pathology labs and diagnostic centres, including report pads, OPD files, lab envelopes, prescription pads and more."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <AmbientBackground />
      <main className="relative z-10 w-full">
        {/* Hero Slider */}
        <HeroSlider
          onQuoteClick={() => onRequestQuote()}
          onViewProductClick={(productId) => {
            const product = FEATURED_PRODUCTS.find(p => p.id === productId);
            if (product) onViewDetails(product);
          }}
        />
        
        {/* 1. Client Trust Section */}
        <ClientTrust />

        {/* Experience Statistics Bar */}
        <ExperienceStatsBar />
        
        {/* 2. Why Choose Printopia */}
        <WhyChooseUs />

        {/* 5. Featured Products upgraded cards */}
        <FeaturedProducts
          onQuoteClick={onRequestQuote}
          onViewDetailsClick={onViewDetails}
        />
        
        {/* 3. Our Team & Infrastructure */}
        <TeamAndInfrastructure />

        {/* 4. Manufacturing Process Timeline Section */}
        <ManufacturingProcess />

        {/* 6. Testimonials Section */}
        <Testimonials />

        {/* 8. Download Catalogue Section */}
        <DownloadCatalogue />

        {/* 7. Frequently Asked Questions Accordion Section */}
        <FAQ />

        {/* 9. Contact CTA Section */}
        <FinalCTA />
      </main>
    </div>
  );
}
