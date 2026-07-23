import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Stethoscope, 
  GraduationCap, 
  Briefcase, 
  Utensils, 
  Factory, 
  ShoppingBag,
  CheckCircle2,
  Phone,
  MessageSquare
} from 'lucide-react';
import { INDUSTRIES_DATA, WHY_CHOOSE_PRINTOPIA } from '../data/industriesData';

interface IndustriesPageProps {
  onRequestQuote: (productName?: string) => void;
}

const getIndustryIcon = (iconName: string) => {
  switch (iconName) {
    case 'stethoscope':
      return <Stethoscope className="w-8 h-8 text-[#0C7D8D]" />;
    case 'graduation-cap':
      return <GraduationCap className="w-8 h-8 text-[#0C7D8D]" />;
    case 'briefcase':
      return <Briefcase className="w-8 h-8 text-[#0C7D8D]" />;
    case 'utensils':
      return <Utensils className="w-8 h-8 text-[#0C7D8D]" />;
    case 'factory':
      return <Factory className="w-8 h-8 text-[#0C7D8D]" />;
    case 'shopping-bag':
      return <ShoppingBag className="w-8 h-8 text-[#0C7D8D]" />;
    default:
      return <Briefcase className="w-8 h-8 text-[#0C7D8D]" />;
  }
};

export default function IndustriesPage({ onRequestQuote }: IndustriesPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Printing Solutions for Every Industry | Printopia Solutions";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Printopia Solutions provides custom printing and packaging solutions for healthcare, education, corporate, hospitality, manufacturing, and retail businesses.");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-[76px]">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-28 bg-[#0C3855] text-white overflow-hidden border-b border-white/10">
        {/* Subtle background graphics */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#BED7EB_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0C7D8D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#BED7EB] text-xs font-extrabold tracking-widest uppercase mb-6"
          >
            <span>B2B Industry Specialization</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6"
          >
            Printing Solutions for Every Industry
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-[#BED7EB]/90 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Printopia Solutions provides custom printing and packaging solutions for healthcare, education, corporate, hospitality, manufacturing, and retail businesses with unmatched precision and fast delivery.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => onRequestQuote()}
              className="px-8 py-4 bg-gradient-to-r from-[#0C7D8D] to-[#085a66] hover:from-[#09606c] hover:to-[#06424b] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20 cursor-pointer"
            >
              Request Custom Quotation
            </button>
            <a
              href={`https://wa.me/919432436942?text=${encodeURIComponent("Hello Printopia Solutions, I am interested in custom industry printing solutions.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#BED7EB]" />
              <span>WhatsApp Inquiry</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. INDUSTRIES SIX CARDS GRID SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              Tailored Sector Offerings
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0C3855] tracking-tight">
              Select Your Industry
            </h2>
            <div className="w-20 h-1 bg-[#0C7D8D] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES_DATA.map((ind, index) => (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0C7D8D]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#BED7EB]/25 flex items-center justify-center group-hover:bg-[#0C7D8D] group-hover:text-white transition-all duration-300">
                      <div className="group-hover:text-white group-hover:scale-110 transition-transform duration-300">
                        {getIndustryIcon(ind.iconName)}
                      </div>
                    </div>
                    <span className="text-xs font-extrabold tracking-widest text-slate-400 font-mono">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0C3855] mb-3 group-hover:text-[#0C7D8D] transition-colors duration-200">
                    {ind.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {ind.heroSubheading}
                  </p>

                  {/* Product highlights sample list */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                    {ind.products.slice(0, 4).map((p) => (
                      <div key={p.id} className="flex items-center space-x-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0C7D8D] shrink-0" />
                        <span className="truncate">{p.name}</span>
                      </div>
                    ))}
                    {ind.products.length > 4 && (
                      <p className="text-[11px] font-bold text-[#0C7D8D] pt-1">
                        + {ind.products.length - 4} more specialized products
                      </p>
                    )}
                  </div>
                </div>

                {/* Explore Solutions CTA */}
                <Link
                  to={`/industries/${ind.slug}`}
                  className="w-full py-3.5 px-5 bg-slate-100 hover:bg-[#0C3855] text-[#0C3855] hover:text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-md"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE PRINTOPIA SOLUTIONS */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              Manufacturing Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C3855]">
              Why Choose Printopia Solutions?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              We combine state-of-the-art print infrastructure with strict quality control to deliver institutional-grade print products across all sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_PRINTOPIA.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0C7D8D]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0C7D8D]/10 flex items-center justify-center text-[#0C7D8D] mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0C3855] mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="py-16 bg-[#0C3855] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need custom printing specs for your business?
            </h2>
            <p className="text-sm text-[#BED7EB] mt-2">
              Our print consultants will prepare a customized quotation within 24 hours.
            </p>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <button
              onClick={() => onRequestQuote()}
              className="px-6 py-3.5 bg-[#0C7D8D] hover:bg-[#085a66] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              Get Instant Quote
            </button>
            <a
              href="tel:+919432436942"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#BED7EB]" />
              <span>Call Sales</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
