import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Sparkles, Phone, Mail } from 'lucide-react';

interface AboutHeroSectionProps {
  onRequestQuote?: (productName?: string) => void;
  onExploreServices?: () => void;
  onContactUs?: () => void;
}

export const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({
  onRequestQuote,
  onExploreServices,
  onContactUs,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleExploreClick = () => {
    if (onExploreServices) {
      onExploreServices();
      return;
    }
    const el = document.getElementById('products-we-manufacture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    if (onContactUs) {
      onContactUs();
      return;
    }
    const el = document.getElementById('final-cta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onRequestQuote) {
      onRequestQuote();
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#0C3855] text-white">
      {/* Main Full-Width Hero Container with Specified Responsive Height */}
      <section className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[70vh] min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] max-h-[850px] flex items-center overflow-hidden">
        
        {/* Fallback solid color background during video initialization to prevent black flash */}
        <div className="absolute inset-0 bg-[#0C3855] z-0" />

        {/* Cloudinary Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transform-gpu scale-[1.01] transition-opacity duration-1000 z-0 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source
            src="https://res.cloudinary.com/qsr7wdp3/video/upload/f_auto,q_auto:good,vc_auto/VN20260722_194942_rfuscp.mp4"
            type="video/mp4"
          />
        </video>

        {/* Corporate Dark Blue Gradient Overlay: Darker on left, slightly transparent on right for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C3855]/95 via-[#0C3855]/80 to-[#0C3855]/40 lg:from-[#0C3855]/95 lg:via-[#0C3855]/75 lg:to-[#0C3855]/30 z-10 pointer-events-none" />

        {/* Subtle Ambient Light Glow Accent */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0C7D8D]/25 rounded-full filter blur-[100px] pointer-events-none z-10" />

        {/* Centered / Left-Aligned Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-20">
          <div className="max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-7">
            
            {/* Small Label badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#BED7EB]/15 border border-[#BED7EB]/30 backdrop-blur-md text-[#BED7EB] text-[11px] font-mono tracking-[0.2em] font-extrabold uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#BED7EB] shrink-0" />
                <span>ABOUT PRINTOPIA SOLUTIONS</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.15] drop-shadow-sm"
            >
              About Printopia Solutions
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg text-[#BED7EB] leading-relaxed max-w-2xl font-medium"
            >
              Your trusted commercial printing partner delivering high-precision offset and digital printing, custom business stationery, marketing collateral, and tailored packaging solutions across multiple industries.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto items-center lg:items-start"
            >
              {/* Primary Button */}
              <button
                onClick={handleExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#0C7D8D] hover:bg-[#09606c] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C7D8D] focus-visible:ring-offset-[#0C3855] group"
                aria-label="Explore Our Services"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={handleContactClick}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 border border-[#BED7EB]/40 hover:border-white text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-[#0C3855]"
                aria-label="Contact Us"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 text-[#BED7EB]" />
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Smooth Curved SVG Divider transitioning into the next section */}
      <div className="w-full overflow-hidden leading-none text-[#EEF6FC] bg-[#0C3855] pointer-events-none relative z-20">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default AboutHeroSection;
