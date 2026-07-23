import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, Heart, Eye, Target, Sparkles, Check, 
  ChevronDown, ChevronRight, Phone, MessageSquare, Building2, 
  Activity, BadgePercent, GraduationCap, ClipboardList, PackageCheck,
  Stethoscope, Microscope, HeartPulse, HardHat, Printer, UserCheck,
  TrendingUp, Award, Calendar, Layers, Sliders, Truck, Headphones, CheckCircle2
} from 'lucide-react';
import { ALL_PRODUCTS } from './AllProductsPage';
import { ManufacturingProcess } from './ManufacturingProcess';
import AboutHeroSection from './AboutHeroSection';
import { images } from '../data/imageMap';

interface AboutPageProps {
  onRequestQuote: (productName?: string) => void;
}

export default function AboutPage({ onRequestQuote }: AboutPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // Page SEO Meta Updates
    document.title = "About Printopia Solutions | Your Trusted Healthcare Printing Partner";
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = "Learn about Printopia Solutions, a specialized healthcare printing company serving hospitals, diagnostic centres, clinics and pathology laboratories with customized offset printing solutions.";
    
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = descriptionContent;
      document.head.appendChild(meta);
    }

    // Scroll to top
    window.scrollTo({ top: 0 });
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const faqs = [
    {
      question: "What is the minimum order quantity (MOQ) for custom healthcare stationery?",
      answer: "Our minimum order quantity varies by product type (e.g., 500 units for custom report pads, 1,000 units for OPD folders, or 5,000 units for bespoke patient ID bands). Please share your required volume and specifications for a precise bulk quotation."
    },
    {
      question: "Do you offer pre-press design support and formatting alignment?",
      answer: "Yes, we provide free basic artwork layout setup and template alignment for all confirmed production runs. Our professional pre-press department will ensure your hospital logos, doctor details, and accreditation badges are crisp and correctly aligned."
    },
    {
      question: "What printing technology and paper stocks do you use?",
      answer: "We utilize high-speed multi-color Heidelberg offset and advanced digital presses. Our inventory includes FSC-certified wood-free maplitho, high-strength medical cartridge paper, and imported boards ranging from 70 GSM to over 400 GSM, tailored to your exact clinic workflow."
    },
    {
      question: "What is the standard production and shipping lead time?",
      answer: "Standard bulk production is typically completed within 5 to 7 business days following final digital proof approval. Completed orders are packed in secure moisture-proof master cartons and dispatched via trusted logistics carriers."
    },
    {
      question: "Can we request physical paper stock or product samples first?",
      answer: "Absolutely. We can arrange to send paper material booklets or sample product kits to hospital procurement teams. Contact our help desk or submit a quotation enquiry to request sample sets."
    }
  ];

  const whyChooseItems = [
    {
      icon: <Stethoscope className="w-6 h-6 text-[#0C3855]" />,
      title: "Healthcare Printing Specialists",
      desc: "Fully dedicated focus on hospitals, clinics, diagnostic centers, and laboratory printing standards with clinical precision."
    },
    {
      icon: <Printer className="w-6 h-6 text-[#0C3855]" />,
      title: "Premium Offset Printing",
      desc: "State-of-the-art multi-color Heidelberg presses delivering high-definition text, sharp lines, and vibrant color density."
    },
    {
      icon: <Layers className="w-6 h-6 text-[#0C3855]" />,
      title: "Customized Solutions",
      desc: "Completely bespoke options for dimensions, paper grades, GSM thickness, layouts, numbering, and binding finishes."
    },
    {
      icon: <Truck className="w-6 h-6 text-[#0C3855]" />,
      title: "Reliable Delivery",
      desc: "Moisture-proof master carton boxing and rapid logistics dispatch directly to your healthcare facility on schedule."
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#0C3855]" />,
      title: "Dedicated Support",
      desc: "Responsive procurement and artwork help desks providing personal guidance from artwork prep to final delivery."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0C3855]" />,
      title: "Quality Assurance",
      desc: "Strict multi-point inspection process covering paper GSM, color accuracy, barcode scan checks, and dimensional precision."
    }
  ];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="about-us-page" className="relative w-full bg-gradient-to-b from-[#F5FAFF] via-white to-[#F5FAFF] pt-24 sm:pt-28 font-sans overflow-hidden min-h-screen">
      
      {/* Subtle Blueprint Background Pattern (2-3% Opacity Overlay) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-blueprint-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0C3855" strokeWidth="0.8" />
              <rect x="8" y="8" width="32" height="32" fill="none" stroke="#0C7D8D" strokeWidth="0.6" strokeDasharray="3 3" />
              <circle cx="60" cy="20" r="8" fill="none" stroke="#0C3855" strokeWidth="0.6" />
              <line x1="60" y1="8" x2="60" y2="32" stroke="#0C3855" strokeWidth="0.5" />
              <line x1="48" y1="20" x2="72" y2="20" stroke="#0C3855" strokeWidth="0.5" />
              <circle cx="20" cy="60" r="2" fill="#0C7D8D" />
              <circle cx="60" cy="60" r="2" fill="#0C3855" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-blueprint-grid)" />
        </svg>
      </div>

      {/* Decorative Ambient Color Glows & Geometric Shapes in Corners */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0C7D8D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#0C3855]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#0C7D8D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Structured Schemas */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": typeof window !== 'undefined' ? window.location.origin : 'https://printopia.in'
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About Us",
              "item": typeof window !== 'undefined' ? `${window.location.origin}/about` : 'https://printopia.in/about'
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Printopia Solutions",
          "url": typeof window !== 'undefined' ? window.location.origin : 'https://printopia.in',
          "logo": typeof window !== 'undefined' ? `${window.location.origin}${images.logo}` : 'https://printopia.in/Images/LOGO.webp',
          "description": "Specialized healthcare printing experts serving hospitals, diagnostic centres, clinics and pathology laboratories with customized stationery.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9432436942",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": "en"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      {/* Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 border-b border-neutral-100/80 relative z-10"
      >
        <ol className="flex items-center space-x-2 text-xs font-semibold text-neutral-400">
          <li>
            <Link to="/" className="hover:text-[#0C3855] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0C3855] rounded px-1 py-0.5">
              Home
            </Link>
          </li>
          <li className="select-none text-neutral-300">/</li>
          <li className="text-[#0C3855] font-bold" aria-current="page">
            About Us
          </li>
        </ol>
      </nav>


      {/* SECTION 1: HERO BANNER WITH CLOUDINARY VIDEO */}
      <AboutHeroSection 
        onRequestQuote={onRequestQuote}
        onExploreServices={() => handleScrollToSection('products-we-manufacture')}
        onContactUs={() => handleScrollToSection('final-cta')}
      />


      {/* SECTION 2: COMPANY INTRODUCTION */}
      <section className="bg-[#EEF6FC]/60 py-16 md:py-24 border-b border-blue-100/70 text-left relative" aria-labelledby="company-introduction-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1: Company Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl group bg-white p-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <img 
                    src={images.about.printingMachine} 
                    alt="Printopia Solutions Printing Infrastructure" 
                    width={500}
                    height={375}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375" viewBox="0 0 500 375"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23a1a1aa">Printopia Infrastructure</text></svg>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating Glassmorphism Badge */}
                <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-4 shadow-xl flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0C3855] to-[#0C7D8D] text-white flex items-center justify-center font-black shadow-md">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-black text-[#0C3855] leading-none">200+</p>
                    <p className="text-[11px] font-bold text-neutral-600 uppercase tracking-tight">Hospitals & Clinics Served</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#0C3855] font-extrabold uppercase block">
                  WHO WE ARE
                </span>
                <h2 
                  id="company-introduction-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-neutral-950 tracking-tight uppercase"
                >
                  Company Introduction
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#0C3855] to-[#0C7D8D] rounded-full" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                <p className="font-semibold text-neutral-800 text-base sm:text-lg">
                  Printopia Solutions is a premier B2B manufacturer dedicated exclusively to customized healthcare printing products for medical institutions, pathology chains, diagnostic units, and clinics.
                </p>
                <p>
                  We recognize that medical paperwork requires absolute precision — from clean grid alignment on ECG and radiology envelopes to smear-free chemical resistance on laboratory sample tags. Every document manufactured in our plant is calibrated for exact dimensional accuracy, legibility, and smooth operational handling.
                </p>
                <p>
                  Equipped with high-speed multi-color Heidelberg offset presses, automated CTP plate output, and specialized paper converting machinery, we manage full end-to-end production runs under strict quality control.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "100% Bespoke Printing",
                  "FSC Certified Papers",
                  "Precision CTP Plates",
                  "Multi-Color Heidelberg",
                  "Moisture-Proof Boxing",
                  "Rapid Pan-India Shipping"
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-white/80 border border-blue-100 px-3 py-2 rounded-xl text-xs font-bold text-[#0C3855]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0C7D8D] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Smooth SVG Divider 2 */}
      <div className="w-full overflow-hidden leading-none text-[#EEF6FC] bg-white pointer-events-none">
        <svg className="relative block w-full h-6 sm:h-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 0L0 120V0h1200z" fill="#F5FAFF" />
        </svg>
      </div>


      {/* SECTION 3: WHY CHOOSE PRINTOPIA SOLUTIONS */}
      <section className="py-16 md:py-24 text-left border-b border-neutral-100/80 relative" aria-labelledby="why-choose-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#0C3855] font-extrabold uppercase block">
              OUR COMPETITIVE ADVANTAGE
            </span>
            <h2 
              id="why-choose-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-neutral-950 tracking-tight uppercase"
            >
              Why Choose Printopia Solutions
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#0C3855] to-[#0C7D8D] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pt-1">
              Engineered specifically for healthcare procurement managers, our end-to-end manufacturing workflow guarantees consistency, compliance, and zero downtime.
            </p>
          </div>

          {/* Six Premium Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseItems.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group bg-white/90 backdrop-blur-xs p-7 rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-[#0C7D8D]/40 transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                
                <div className="space-y-3.5 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0C3855]/10 to-[#0C7D8D]/15 text-[#0C3855] flex items-center justify-center border border-[#0C3855]/10 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-black text-neutral-950 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 4: MANUFACTURING PROCESS */}
      <ManufacturingProcess />


      {/* Smooth SVG Divider 3 */}
      <div className="w-full overflow-hidden leading-none text-white/80 bg-[#EEF6FC] pointer-events-none">
        <svg className="relative block w-full h-6 sm:h-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,90 600,-40 1200,60 L1200,120 L0,120 Z" fill="#F5FAFF" />
        </svg>
      </div>


      {/* SECTION 5: MISSION & VISION */}
      <section className="bg-gradient-to-b from-[#F5FAFF] to-[#EEF6FC]/60 py-16 md:py-24 border-b border-neutral-100 text-left relative" aria-label="Mission and Vision">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#0C3855] font-extrabold uppercase block">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-neutral-950 tracking-tight uppercase">
              Mission & Vision
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#0C3855] to-[#0C7D8D] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-md flex flex-col justify-between space-y-6 group hover:border-[#0C3855]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0C3855]/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0C3855] text-white flex items-center justify-center shadow-md">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0C3855] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    OUR PURPOSE
                  </span>
                </div>
                <h3 className="text-2xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  To provide reliable, high-quality, and completely customized healthcare printing solutions that empower hospitals, diagnostic networks, and laboratories to maintain flawless documentation and professional brand integrity.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center text-xs font-bold text-[#0C3855] space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#0C7D8D]" />
                <span>Uncompromising Precision & Medical Alignment</span>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-md flex flex-col justify-between space-y-6 group hover:border-[#0C7D8D]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0C7D8D]/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0C7D8D] text-white flex items-center justify-center shadow-md">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0C7D8D] uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    OUR ASPIRATION
                  </span>
                </div>
                <h3 className="text-2xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  To become India's most trusted healthcare stationery manufacturer by constantly pioneering advance printing technologies, eco-friendly FSC papers, and customer-first institutional service.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center text-xs font-bold text-[#0C7D8D] space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#0C3855]" />
                <span>Pan-India B2B Healthcare Leadership</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>


      {/* SECTION 6: PRODUCTS WE MANUFACTURE */}
      <section id="products-we-manufacture" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 text-left border-b border-neutral-100 relative" aria-labelledby="products-manufacture-heading">
        <div className="space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#0C3855] font-extrabold uppercase block">
              FULL MANUFACTURING CATALOGUE
            </span>
            <h2 
              id="products-manufacture-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-neutral-950 tracking-tight uppercase"
            >
              Products We Manufacture
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#0C3855] to-[#0C7D8D] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pt-1">
              Explore our complete range of specialized healthcare stationery engineered for clinical workflows.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {ALL_PRODUCTS.map((product) => (
              <div
                key={product.slug}
                className="group flex flex-col h-full justify-between bg-white border border-neutral-200/80 hover:border-[#0C7D8D]/50 rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl text-left relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Product Image Box */}
                  <div className="relative w-full aspect-[4/3] bg-neutral-50 rounded-2xl flex items-center justify-center overflow-hidden border border-neutral-100 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full max-w-[110px] sm:max-w-[130px] h-24 sm:h-32 object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23a1a1aa">Printopia Product</text></svg>';
                      }}
                    />
                  </div>

                  {/* Product Metadata */}
                  <div className="space-y-1">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#0C3855] font-extrabold uppercase">
                      {product.category}
                    </span>
                    <h3 className="text-xs sm:text-sm md:text-base font-display font-bold text-neutral-950 tracking-tight leading-snug min-h-[38px] flex items-center">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => onRequestQuote(product.name)}
                    className="text-[11px] font-bold text-[#0C3855] hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    Quick Quote
                  </button>

                  <Link
                    to={`/products/${product.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#0C7D8D] hover:text-cyan-700 transition-colors focus-visible:outline-none"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 7: FINAL CALL TO ACTION */}
      <section className="bg-gradient-to-r from-[#0C3855] via-[#082940] to-[#0C7D8D] text-white py-16 md:py-24 text-center md:text-left overflow-hidden relative" aria-labelledby="final-cta-heading">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-400/15 filter blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-400/15 filter blur-[90px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-white/10 rounded-full border border-white/15 text-[10px] font-mono tracking-widest uppercase font-bold text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>INSTITUTIONAL HEALTHCARE SUPPLIER</span>
            </span>
            
            {/* Exact Heading */}
            <h2 
              id="final-cta-heading" 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-tight"
            >
              Ready to Work With Us?
            </h2>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              Get in touch with our institutional sales team today for bespoke paper samples, custom artwork proofs, and volume quotation discounts.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center md:justify-start">
            {/* Exact Button Text */}
            <button
              onClick={() => onRequestQuote()}
              className="px-7 py-4 bg-white text-[#0C3855] hover:bg-neutral-100 text-xs font-extrabold uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              <span>Request a Free Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href={`https://wa.me/919432436942?text=${encodeURIComponent("Hello Printopia Solutions, I am interested in placing a bulk healthcare printing order. Please share your catalogue and quotation details.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-2 focus-visible:outline-none"
            >
              <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+919432436942"
              className="px-7 py-3.5 border border-white/30 hover:border-white text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all hover:scale-105 flex items-center justify-center space-x-2 focus-visible:outline-none"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 94324 36942</span>
            </a>
          </div>

        </div>
      </section>


      {/* FAQ Accordions Section */}
      <section className="bg-neutral-50/50 py-16 md:py-24 text-left border-t border-neutral-100 relative" aria-labelledby="faq-title">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
              PROCUREMENT HELP & FAQS
            </span>
            <h2 
              id="faq-title"
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase"
            >
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer focus-visible:outline-none focus-visible:bg-neutral-50/50"
                    aria-expanded={isOpen}
                    id={`faq-btn-${idx}`}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        aria-labelledby={`faq-btn-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-500 leading-relaxed border-t border-neutral-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}


