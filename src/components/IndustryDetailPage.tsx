import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Ruler, 
  Layers, 
  Truck, 
  Tag, 
  Palette, 
  Phone,
  FileText,
  Stethoscope,
  GraduationCap,
  Briefcase,
  Utensils,
  Factory,
  ShoppingBag
} from 'lucide-react';
import { INDUSTRIES_DATA, WHY_CHOOSE_PRINTOPIA, IndustryProduct } from '../data/industriesData';

interface IndustryDetailPageProps {
  onRequestQuote: (productName?: string) => void;
}

const getIndustryIcon = (iconName: string) => {
  switch (iconName) {
    case 'stethoscope':
      return <Stethoscope className="w-10 h-10 text-[#0C7D8D]" />;
    case 'graduation-cap':
      return <GraduationCap className="w-10 h-10 text-[#0C7D8D]" />;
    case 'briefcase':
      return <Briefcase className="w-10 h-10 text-[#0C7D8D]" />;
    case 'utensils':
      return <Utensils className="w-10 h-10 text-[#0C7D8D]" />;
    case 'factory':
      return <Factory className="w-10 h-10 text-[#0C7D8D]" />;
    case 'shopping-bag':
      return <ShoppingBag className="w-10 h-10 text-[#0C7D8D]" />;
    default:
      return <Briefcase className="w-10 h-10 text-[#0C7D8D]" />;
  }
};

const getWhyIcon = (icon: string) => {
  switch (icon) {
    case 'Ruler': return <Ruler className="w-6 h-6 text-[#0C7D8D]" />;
    case 'CheckCircle': return <CheckCircle2 className="w-6 h-6 text-[#0C7D8D]" />;
    case 'Layers': return <Layers className="w-6 h-6 text-[#0C7D8D]" />;
    case 'Truck': return <Truck className="w-6 h-6 text-[#0C7D8D]" />;
    case 'Tag': return <Tag className="w-6 h-6 text-[#0C7D8D]" />;
    case 'Palette': return <Palette className="w-6 h-6 text-[#0C7D8D]" />;
    default: return <CheckCircle2 className="w-6 h-6 text-[#0C7D8D]" />;
  }
};

export default function IndustryDetailPage({ onRequestQuote }: IndustryDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const industry = INDUSTRIES_DATA.find((ind) => ind.slug === slug);

  useEffect(() => {
    if (industry) {
      if (slug === 'healthcare') {
        document.title = "Hospital & Diagnostic Centre Printing Services | Printopia Solutions";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            "content",
            "Custom printing solutions for hospitals, clinics, pathology labs and diagnostic centres, including report pads, OPD files, lab envelopes, prescription pads and more."
          );
        }
      } else {
        document.title = `${industry.title} Printing Solutions | Printopia Solutions`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", industry.metaDescription);
        }
      }
    }
    window.scrollTo(0, 0);
  }, [industry, slug]);

  if (!industry) {
    return (
      <div className="min-h-screen bg-slate-50 pt-[120px] pb-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-[#0C3855] mb-4">Industry Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          The requested industry page does not exist or has been moved.
        </p>
        <Link
          to="/industries"
          className="px-6 py-3 bg-[#0C7D8D] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
        >
          View All Industries
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Printopia Solutions, I am looking for custom printing for ${industry.title}. Please share details and pricing.`
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-[76px]">
      
      {/* 1. UNIQUE HERO SECTION */}
      <section className="relative py-16 sm:py-24 bg-[#0C3855] text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#BED7EB_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#0C7D8D]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Breadcrumb Back Link */}
          <div className="mb-6">
            <Link
              to="/industries"
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#BED7EB] hover:text-white uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Industries</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-[#BED7EB] text-xs font-bold uppercase tracking-wider">
                {getIndustryIcon(industry.iconName)}
                <span>{industry.shortTitle} Solutions</span>
              </div>

              {/* Single H1 heading per page constraint */}
              <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                {industry.heroHeading}
              </h1>

              <p className="text-base sm:text-lg text-[#BED7EB]/90 leading-relaxed max-w-2xl">
                {industry.heroSubheading}
              </p>

              {/* Quick CTAs */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="#products-section"
                  className="px-7 py-3.5 bg-[#0C7D8D] hover:bg-[#085a66] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-lg border border-white/20 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
                >
                  <span>Explore {industry.shortTitle} Products</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onRequestQuote(`${industry.title} General Inquiry`)}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Request a Quotation</span>
                </button>
              </div>
            </div>

            {/* Optional Hero Image or Decorative Graphic */}
            <div className="lg:col-span-4 flex justify-center">
              {industry.heroImage ? (
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-white/5 p-3">
                  <img
                    src={industry.heroImage}
                    alt={`${industry.title} printing sample`}
                    className="w-full h-64 sm:h-72 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C3855]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-xs text-white/90 font-medium bg-[#0C3855]/90 p-3 rounded-xl backdrop-blur-md border border-white/10">
                    Customized manufacturing according to institutional artwork standards.
                  </div>
                </div>
              ) : (
                <div className="w-64 h-64 rounded-3xl bg-white/10 border border-white/20 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="p-4 rounded-2xl bg-[#0C7D8D] text-white">
                    {getIndustryIcon(industry.iconName)}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[#BED7EB]">
                    {industry.title}
                  </span>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 2. SOLUTIONS OVERVIEW SECTION */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-[#BED7EB]/30 shrink-0 flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#0C7D8D]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0C3855] mb-2">
                {slug === 'healthcare'
                  ? 'Solutions for Hospitals, Clinics and Diagnostic Centres'
                  : 'Industry-Focused Manufacturing Overview'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {industry.introduction}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. HEALTHCARE PRINTING PRODUCTS / PRODUCT GRID SECTION */}
      <section id="products-section" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              Complete Product Catalogue
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0C3855]">
              {slug === 'healthcare'
                ? 'Healthcare Printing Products'
                : `Printing & Packaging Products for ${industry.title}`}
            </h2>
            <p className="text-sm text-slate-500 mt-3">
              Explore our comprehensive range of specialized products available for bulk customization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0C7D8D]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product Thumbnail or Fallback Graphic */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden border-b border-slate-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={`${product.name} - ${industry.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 text-slate-400">
                        <FileText className="w-12 h-12 mb-2 text-[#0C7D8D]/40" />
                        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 text-center">
                          {product.name}
                        </span>
                      </div>
                    )}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#0C3855]/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-md">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#0C3855] group-hover:text-[#0C7D8D] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Specifications list if present */}
                    {product.specifications && product.specifications.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Specifications:
                        </span>
                        <div className="grid grid-cols-1 gap-1">
                          {product.specifications.map((spec, i) => (
                            <div key={i} className="flex items-center space-x-2 text-[11px] text-slate-500">
                              <CheckCircle2 className="w-3 h-3 text-[#0C7D8D] shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    onClick={() => onRequestQuote(product.name)}
                    className="w-full py-2.5 bg-[#0C7D8D] hover:bg-[#085a66] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Request Quote for {product.name}
                  </button>
                  <a
                    href={`https://wa.me/919432436942?text=${encodeURIComponent(`Hello Printopia Solutions, I am interested in ordering ${product.name} for ${industry.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#0C7D8D]" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>

              </motion.div>
            ))}
          </div>

          {/* SECTION 4: CUSTOM PRINTING AND BULK ORDER SUPPORT */}
          <div className="mt-16 bg-[#0C3855] text-white rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0C7D8D] bg-white/10 px-3 py-1 rounded-lg inline-block">
                Custom Specifications
              </span>
              <h3 className="text-2xl font-bold text-white">
                Custom Printing and Bulk Order Support
              </h3>
              <p className="text-xs sm:text-sm text-[#BED7EB] leading-relaxed max-w-2xl">
                Need specific paper GSM, custom die-cut dimensions, special window placements, metallic clip bindings, or bulk institutional pricing? Our pre-press engineering team provides tailored design layout support and high-volume manufacturing capabilities.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => onRequestQuote(`${industry.title} Custom Specs`)}
                className="px-6 py-3.5 bg-[#0C7D8D] hover:bg-[#085a66] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Request Custom Specs
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: WHY HEALTHCARE BUSINESSES CHOOSE PRINTOPIA SOLUTIONS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              Quality Assurance & Services
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0C3855]">
              {slug === 'healthcare'
                ? 'Why Healthcare Businesses Choose Printopia Solutions'
                : 'Why Choose Printopia Solutions?'}
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Institutional precision, dedicated account management, and reliable bulk manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_PRINTOPIA.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#0C7D8D]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#BED7EB]/30 flex items-center justify-center mb-4">
                  {getWhyIcon(feature.icon)}
                </div>
                <h3 className="text-lg font-bold text-[#0C3855] mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: REQUEST A HEALTHCARE PRINTING QUOTATION */}
      <section className="py-16 bg-[#0C3855] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {slug === 'healthcare'
                ? 'Request a Healthcare Printing Quotation'
                : `Ready to place an order for ${industry.title}?`}
            </h2>
            <p className="text-sm text-[#BED7EB] mt-2">
              Get direct factory pricing, artwork support, and fast nationwide dispatch.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 shrink-0">
            <button
              onClick={() => onRequestQuote(`${industry.title} Order`)}
              className="px-6 py-3.5 bg-[#0C7D8D] hover:bg-[#085a66] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Request a Quotation
            </button>
            <a
              href={`https://wa.me/919432436942?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#BED7EB]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
