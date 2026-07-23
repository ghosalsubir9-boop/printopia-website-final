import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingCart, Info, CheckCircle2 } from 'lucide-react';
import { images } from '../data/imageMap';
import { ProductItem } from '../data';

interface FeaturedProductsProps {
  onQuoteClick: (productName?: string) => void;
  onViewDetailsClick: (product: ProductItem) => void;
}

const productsData = [
  {
    id: 1,
    title: "Report Pad",
    image: images.products.reportPad,
    description: "Professional hospital report pads printed with sharp text and premium paper quality.",
    category: "Hospital Stationery"
  },
  {
    id: 2,
    title: "Lab Envelope",
    image: images.products.labEnvelope,
    description: "Secure laboratory envelopes with custom institutional branding and window options.",
    category: "Diagnostic Supplies"
  },
  {
    id: 3,
    title: "OPD File",
    image: images.products.opdFile,
    description: "Custom OPD files with pocket options, designed for organized patient record management.",
    category: "Patient Records"
  },
  {
    id: 4,
    title: "Patient Bands",
    image: images.products.patientBands,
    description: "Durable and identification bands for secure patient tracking in clinical settings.",
    category: "Safety & Tracking"
  },
  {
    id: 5,
    title: "Bill Book",
    image: images.products.billBook,
    description: "GST compliant hospital bill books with carbonless paper and serial numbering.",
    category: "Accounts"
  },
  {
    id: 6,
    title: "X-Ray Envelope",
    image: images.products.xrayEnvelope,
    description: "Heavy-duty radiology envelopes for safe storage and transport of medical films.",
    category: "Radiology"
  }
];

export default function FeaturedProducts({ onQuoteClick, onViewDetailsClick }: FeaturedProductsProps) {
  return (
    <section id="featured-products" className="relative bg-white py-24 lg:py-32 overflow-hidden border-y border-blue-100/60">
      {/* Subtle Abstract Printing-Inspired Pattern (CMYK Dots, Paper Outlines & Blueprint Grid at 15% Opacity) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] overflow-hidden animate-bg-drift-slow">
        <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="featured-cmyk-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              {/* Offset sheet outline & blueprint grid */}
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0C3855" strokeWidth="0.8" />
              <rect x="6" y="6" width="24" height="24" fill="none" stroke="#0C7D8D" strokeWidth="0.6" strokeDasharray="3 3" />
              {/* CMYK & Registration Alignment Crosshairs */}
              <circle cx="45" cy="15" r="5" fill="none" stroke="#0C3855" strokeWidth="0.6" />
              <line x1="45" y1="7" x2="45" y2="23" stroke="#0C3855" strokeWidth="0.5" />
              <line x1="37" y1="15" x2="53" y2="15" stroke="#0C3855" strokeWidth="0.5" />
              <circle cx="18" cy="45" r="1.5" fill="#0C7D8D" />
              <circle cx="45" cy="45" r="1.5" fill="#0C3855" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#featured-cmyk-grid)" />
        </svg>
      </div>

      {/* Soft Background Accent Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0C7D8D]/18 rounded-full blur-3xl pointer-events-none animate-bg-pulse" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0C3855]/18 rounded-full blur-3xl pointer-events-none animate-bg-float-slow" />

      {/* Modern Top Section Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0C7D8D]/35 to-transparent pointer-events-none animate-bg-drift" />

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <CheckCircle2 size={14} />
            Premium Printing Solutions
          </motion.div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[52px] font-extrabold text-[#0A192F] tracking-tight leading-[1.1] mb-6">
            Featured B2B Products
          </h2>
          <p className="text-base sm:text-lg lg:text-[20px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            High-quality printing solutions designed specifically for Hospitals, Diagnostic Centres, Clinics and Healthcare Professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {productsData.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden bg-neutral-50 relative">
                <img
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23a1a1aa">Printopia Solutions</text></svg>';
                    console.warn("Missing image:", e.currentTarget.src);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Actions Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-12 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => onQuoteClick(product.title)}
                    className="flex-1 h-12 bg-white text-neutral-900 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#0C3855] hover:text-white transition-all shadow-lg"
                  >
                    <ShoppingCart size={16} />
                    Quick Quote
                  </button>
                  <button
                    onClick={() => onViewDetailsClick({ id: product.id, title: product.title } as any)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all shadow-lg border border-white/30"
                  >
                    <Info size={18} />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                  {product.category}
                </span>
                <h3 className="text-2xl font-bold text-[#0A192F] mb-3 group-hover:text-[#0C3855] transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
                <button
                  onClick={() => onViewDetailsClick({ id: product.id, title: product.title } as any)}
                  className="flex items-center gap-2 text-[#0A192F] font-bold text-sm group-hover:gap-3 transition-all cursor-pointer"
                >
                  View Full Specifications
                  <ArrowRight size={16} className="text-blue-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 px-10 bg-[#0C3855] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-3"
          >
            Explore Complete Catalogue
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
