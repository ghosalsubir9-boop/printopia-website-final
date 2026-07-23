import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../data/imageMap';

export interface Product {
  name: string;
  category: string;
  slug: string;
  image: string;
  description: string;
}

export const CATEGORIES = [
  "All Products",
  "Patient & Hospital Essentials",
  "Medical Printing & Stationery",
  "Branding & Promotion"
];

export const ALL_PRODUCTS: Product[] = [
  {
    name: "Patient Identification Bands & Tags",
    category: "Patient & Hospital Essentials",
    slug: "patient-identification-bands-tags",
    image: images.products.patientBands,
    description: "Ultra-soft medical wristbands with secure tamper-proof locking snap for precise inpatient tracking."
  },
  {
    name: "Report Pad",
    category: "Medical Printing & Stationery",
    slug: "report-pad",
    image: images.products.reportPad,
    description: "Customized prescription and patient consultation report sheets printed on premium uncoated paper."
  },
  {
    name: "Lab Envelope",
    category: "Medical Printing & Stationery",
    slug: "lab-envelope",
    image: images.products.labEnvelope,
    description: "Secure confidential lab results envelope featuring crystal clear polycarbonate window options."
  },
  {
    name: "OPD File",
    category: "Patient & Hospital Essentials",
    slug: "opd-file",
    image: images.products.opdFile,
    description: "Creased-spine medical case history files with rigid cardboard base and heavy-duty steel clips."
  },
  {
    name: "Bill Book",
    category: "Medical Printing & Stationery",
    slug: "bill-book",
    image: images.products.billBook,
    description: "Sequential serial-numbered hospital billing pads in duplicate or triplicate carbonless paper."
  },
  {
    name: "X-Ray Envelope",
    category: "Patient & Hospital Essentials",
    slug: "x-ray-envelope",
    image: images.products.xrayEnvelope,
    description: "Heavy-duty large-format protective envelopes for high-density diagnostic film scans."
  },
  {
    name: "Test Report File",
    category: "Patient & Hospital Essentials",
    slug: "test-report-file",
    image: images.products.testReportFile,
    description: "High-grade patient folder sleeves designed for medical file compilation and diagnostic storage."
  },
  {
    name: "Visiting Card",
    category: "Branding & Promotion",
    slug: "visiting-card",
    image: images.products.visitingCard,
    description: "Professional cards with premium card stock and spot UV finishes for doctors and administrators."
  },
  {
    name: "Sticker Label",
    category: "Branding & Promotion",
    slug: "sticker-label",
    image: images.products.stickerLabel,
    description: "Waterproof self-adhesive thermal-printing labels for clinical pathology test-tubes and vials."
  },
  {
    name: "Brochure",
    category: "Branding & Promotion",
    slug: "brochure",
    image: images.products.brochure,
    description: "Multi-fold clinical pamphlets with soft-touch coating to highlight healthcare specialties and facilities."
  },
  {
    name: "Hospital Bags",
    category: "Patient & Hospital Essentials",
    slug: "hospital-bags",
    image: images.products.hospitalBags,
    description: "Reinforced block-bottom healthcare bags with soft handles, made from durable bio-safe paper."
  },
  {
    name: "ID Card",
    category: "Patient & Hospital Essentials",
    slug: "id-card",
    image: images.products.idCard,
    description: "Scratch-resistant plastic clinical identification badges for medical staff and technicians."
  },
  {
    name: "Flyers",
    category: "Branding & Promotion",
    slug: "flyers",
    image: images.products.flyers,
    description: "Vibrant promotional sheets printed on lightweight glossy stock for health awareness campaigns."
  }
];

interface AllProductsPageProps {
  onRequestQuote: (productName?: string) => void;
}

export default function AllProductsPage({ onRequestQuote }: AllProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All Products");

  useEffect(() => {
    // Dynamic SEO Metadata updates
    document.title = "Healthcare Printing Products | Printopia Solutions";
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = "Explore customized report pads, lab envelopes, OPD files, patient identification bands, hospital bags, brochures and other healthcare printing products from Printopia Solutions.";
    
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

  const filteredProducts = activeCategory === "All Products"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div id="all-products-page" className="relative w-full bg-gradient-to-b from-[#F5FAFF] via-white to-[#F5FAFF] pt-24 sm:pt-28 pb-16 overflow-hidden min-h-screen">
      {/* Subtle Printing Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="all-products-cmyk-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0C3855" strokeWidth="0.8" />
              <rect x="6" y="6" width="24" height="24" fill="none" stroke="#0C7D8D" strokeWidth="0.6" strokeDasharray="3 3" />
              <circle cx="45" cy="15" r="5" fill="none" stroke="#0C3855" strokeWidth="0.6" />
              <line x1="45" y1="7" x2="45" y2="23" stroke="#0C3855" strokeWidth="0.5" />
              <line x1="37" y1="15" x2="53" y2="15" stroke="#0C3855" strokeWidth="0.5" />
              <circle cx="18" cy="45" r="1.5" fill="#0C7D8D" />
              <circle cx="45" cy="45" r="1.5" fill="#0C3855" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#all-products-cmyk-grid)" />
        </svg>
      </div>

      {/* Decorative Corner Glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0C7D8D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0C3855]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Page Hero */}
      <section 
        className="relative bg-gradient-to-br from-[#0C3855]/5 to-transparent border-b border-neutral-100 py-12 md:py-16 text-left overflow-hidden"
        aria-labelledby="products-hero-title"
      >
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0c3855_1px,transparent_1px),linear-gradient(to_bottom,#0c3855_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase">
            OUR PRODUCT RANGE
          </span>
          <h1 
            id="products-hero-title"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-neutral-900 tracking-tight"
          >
            Healthcare Printing Products
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
            Explore our range of customized printing products for hospitals, diagnostic centres, clinics, pathology laboratories and healthcare organizations.
          </p>
        </div>
      </section>

      {/* Category Filter Controls */}
      <section 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12 mb-10"
        aria-label="Product Categories Filter"
      >
        <div className="flex flex-nowrap overflow-x-auto pb-3 -mx-2 px-2 md:-mx-0 md:px-0 scrollbar-hide md:flex-wrap md:justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(category);
                  }
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C3855] ${
                  isActive 
                    ? 'bg-[#0C3855] text-white shadow-sm' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product List Grid */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                layout={!prefersReducedMotion}
                initial={!prefersReducedMotion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={!prefersReducedMotion ? { opacity: 0, scale: 0.95 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : idx * 0.03 }}
                key={product.slug}
                className="group flex flex-col h-full justify-between bg-white border border-neutral-200/70 hover:border-neutral-300 rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg text-left"
              >
                <div className="space-y-4">
                  {/* Product Image Area */}
                  <div className="relative w-full aspect-[4/3] bg-neutral-50 rounded-2xl flex items-center justify-center overflow-hidden border border-neutral-100/60 p-4">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:12px_12px]" />
                    <img
                      src={product.image}
                      alt={`${product.name} template illustration`}
                      width={400}
                      height={300}
                      className="w-full max-w-[130px] sm:max-w-[160px] h-28 sm:h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23a1a1aa">Printopia Solutions</text></svg>';
                        console.warn("Missing image:", e.currentTarget.src);
                      }}
                    />
                  </div>

                  {/* Category Badge & Product Identity */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-wider text-[#0C3855] font-extrabold uppercase">
                      {product.category}
                    </span>
                    <h2 className="text-sm sm:text-base md:text-lg font-display font-bold text-neutral-950 tracking-tight leading-snug min-h-[44px] flex items-center">
                      {product.name}
                    </h2>
                    <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 min-h-[36px]">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Card footer details link */}
                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to={`/products/${product.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0C3855] hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:underline"
                    aria-label={`View details for ${product.name}`}
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Custom Product CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 md:mt-24">
        <div className="relative bg-[#0C3855] text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center md:text-left overflow-hidden shadow-xl border border-white/5">
          {/* Subtle graphic accent shapes inside CTA */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-400/10 filter blur-[80px]" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-mono tracking-widest uppercase font-bold text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>B2B Custom Specifications</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
                Need a Custom Healthcare Printing Product?
              </h2>
              <p className="text-sm sm:text-base text-white/85 max-w-3xl leading-relaxed">
                Share your required size, paper, GSM, quantity and finishing specifications. Our team will prepare a customized quotation for your organization.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center md:justify-start">
              <button
                onClick={() => onRequestQuote()}
                className="px-6 py-3.5 bg-white text-[#0C3855] hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href={`https://wa.me/919432436942?text=${encodeURIComponent("Hello Printopia Solutions, I am looking for a custom healthcare printing solution. Please share details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
              >
                <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
