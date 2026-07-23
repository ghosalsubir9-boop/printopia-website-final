import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  PackageCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { images } from '../data/imageMap';

interface HeroSliderProps {
  onQuoteClick: (productName?: string) => void;
  onViewProductClick: (productId: number) => void;
}

const HERO_SLIDES = [
  {
    id: 1, // Matches Report Pad in FEATURED_PRODUCTS
    product: 'Report Pad',
    category: 'Report Pad',
    headline: 'Premium Report Pad Printing for Hospitals & Diagnostic Centres',
    description:
      'Custom hospital and diagnostic report pads manufactured with premium paper, accurate colour reproduction and professional healthcare branding.',
    image: images.products.reportPad,
    glowColor: 'from-[#0C7D8D]/20 via-[#BED7EB]/25 to-transparent',
  },
  {
    id: 2, // Matches Lab Envelope in FEATURED_PRODUCTS
    product: 'Lab Envelope',
    category: 'Lab Envelope',
    headline: 'Custom Lab Envelope Printing for Healthcare Organisations',
    description:
      'Premium window and non-window laboratory envelopes designed for pathology labs, diagnostic centres, clinics and hospitals.',
    image: images.products.labEnvelope,
    glowColor: 'from-[#0C3855]/15 via-[#0C7D8D]/20 to-transparent',
  },
  {
    id: 3, // Matches OPD File in FEATURED_PRODUCTS
    product: 'OPD File',
    category: 'OPD File',
    headline: 'Professional OPD File Printing and Manufacturing',
    description:
      'Custom printed OPD files with pocket and clip options, durable card stock and healthcare-specific branding.',
    image: images.products.opdFile,
    glowColor: 'from-[#0C7D8D]/25 via-[#BED7EB]/30 to-transparent',
  },
  {
    id: 4, // Matches Hospital Bags in FEATURED_PRODUCTS
    product: 'Hospital Bags',
    category: 'Hospital Bags',
    headline: 'Custom Hospital Carry Bag Printing',
    description:
      'Professional paper bags, PP bags and non-woven bags manufactured for hospitals, clinics and diagnostic centres.',
    image: images.products.hospitalBags,
    glowColor: 'from-[#0C3855]/20 via-[#0C7D8D]/15 to-transparent',
  },
];

export default function HeroSlider({ onQuoteClick, onViewProductClick }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 40) {
        handleNext();
      } else if (diff < -40) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 2500);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero-section"
      className="relative w-full bg-gradient-to-b from-[#EAF5FC] via-[#F2F8FC] to-[#DCEFF8] text-neutral-900 overflow-hidden pt-28 sm:pt-32 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 min-h-[720px] lg:min-h-[760px] flex flex-col justify-center border-b border-blue-100/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Showcase"
    >
      {/* Top Thin Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-100 z-30 overflow-hidden">
        <motion.div
          key={currentSlide + (isPaused ? '-paused' : '-active')}
          initial={{ width: '0%' }}
          animate={{ width: isPaused ? '0%' : '100%' }}
          transition={{ duration: isPaused ? 0 : 6, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-[#0C3855] via-[#0C7D8D] to-[#BED7EB]"
        />
      </div>

      {/* Background Soft Subtle Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-[#BED7EB]/25 via-[#0C7D8D]/10 to-transparent rounded-full filter blur-[120px] pointer-events-none -z-10 animate-bg-pulse-delayed"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: ~42% width (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            
            {/* Small SEO Intro Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0C3855]/5 border border-[#0C3855]/15 text-[#0C3855] text-[11px] font-mono tracking-[0.16em] font-extrabold uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0C7D8D] shrink-0" aria-hidden="true" />
                <span>HOSPITAL & DIAGNOSTIC CENTRE PRINTING SPECIALISTS</span>
              </span>
            </motion.div>

            {/* SINGLE H1 FOR SEO - DYNAMIC SLIDE HEADLINE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#0C3855] tracking-tight leading-[1.12] min-h-[2.4em] flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSlide.id + '-headline'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="block"
                >
                  {activeSlide.headline}
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* Dynamic Product Description */}
            <div className="min-h-[4em] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeSlide.id + '-desc'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                  className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium"
                >
                  {activeSlide.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1 w-full sm:w-auto items-stretch sm:items-center">
              <button
                id="hero-request-quote-btn"
                onClick={() => onQuoteClick(activeSlide.product)}
                className="px-7 py-3.5 sm:py-4 bg-[#0C3855] hover:bg-[#08263a] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3855] group"
                aria-label="Request Quotation"
              >
                <span>REQUEST QUOTATION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-view-details-btn"
                onClick={() => onViewProductClick(activeSlide.id)}
                className="px-7 py-3.5 sm:py-4 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-[#0C7D8D] text-[#0C3855] text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7D8D]"
                aria-label="View Product Details"
              >
                <span>VIEW DETAILS</span>
                <ChevronRight className="w-4 h-4 text-[#0C7D8D]" />
              </button>
            </div>

            {/* Compact Trust Points */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-6 border-t border-neutral-200/80 w-full text-left">
              <div className="flex items-center space-x-2 text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#0C7D8D] shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">GST Invoice Available</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-[#0C7D8D] shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">Free Design Support</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-700">
                <PackageCheck className="w-4 h-4 text-[#0C7D8D] shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">Custom Manufacturing</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-700">
                <Truck className="w-4 h-4 text-[#0C7D8D] shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">Delivery Available</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ~58% width (7 cols on lg) - Floating Product Mockup */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center pt-2 lg:pt-0">
            
            {/* Soft Ambient Radial Glow Behind Product */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id + '-glow'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                className={`absolute w-[280px] sm:w-[380px] lg:w-[460px] h-[280px] sm:h-[380px] lg:h-[460px] bg-gradient-to-tr ${activeSlide.glowColor} rounded-full filter blur-[80px] pointer-events-none -z-10`}
              />
            </AnimatePresence>

            {/* Floating Mockup Area (No white card container wrapper) */}
            <div className="relative w-full max-w-[290px] sm:max-w-[360px] lg:max-w-[460px] aspect-[4/3] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id + '-image'}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* Continuous subtle floating animation */}
                  <motion.img
                    animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    src={activeSlide.image}
                    alt={activeSlide.product}
                    width={500}
                    height={400}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_35px_rgba(12,56,85,0.22)]"
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Category Pill Tag floating below product */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-md text-[11px] font-extrabold uppercase tracking-wider text-[#0C3855] flex items-center space-x-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#0C7D8D] animate-pulse" />
                <span>{activeSlide.category}</span>
              </div>
            </div>

            {/* Navigation Arrows & Pagination Dots */}
            <div className="flex items-center space-x-5 mt-10 z-20">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="p-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0C3855] border border-neutral-200 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3855]"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center space-x-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${s.product}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer focus-visible:outline-none ${
                      idx === currentSlide
                        ? 'w-8 h-2.5 bg-[#0C3855] shadow-xs'
                        : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="p-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0C3855] border border-neutral-200 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3855]"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
