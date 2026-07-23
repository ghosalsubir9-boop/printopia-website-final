import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Printer,
  Package,
  Layers,
  FileText,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Clock,
  Ruler,
  Tag,
  Palette,
  Users,
  Stethoscope,
  GraduationCap,
  Briefcase,
  Utensils,
  Factory,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { images } from '../data/imageMap';

interface HomePageProps {
  onRequestQuote: (productName?: string) => void;
  onViewDetails?: (product: any) => void;
}

export default function HomePage({ onRequestQuote }: HomePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Commercial Printing & Packaging Solutions | Printopia Solutions";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Printopia Solutions provides custom commercial printing, business stationery, marketing materials and packaging solutions for healthcare, schools, corporate offices, restaurants, manufacturers and retail businesses."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  // Section 2: Industries We Serve (6 items)
  const industriesList = [
    {
      slug: "healthcare",
      title: "Hospitals & Diagnostic Centres",
      icon: Stethoscope,
      image: images.products.reportPad,
      description: "Clinical report pads, OPD files, lab envelopes, prescription pads, patient ID bands, and hospital paper bags.",
      badge: "Healthcare Specialists"
    },
    {
      slug: "education",
      title: "Schools & Educational Institutions",
      icon: GraduationCap,
      image: images.school.schoolDiary,
      alt: "School Diary Printing",
      description: "Academic school diaries, PVC student ID cards, mark sheets, graduation certificates, and prospectus booklets.",
      badge: "Academic Printing"
    },
    {
      slug: "corporate",
      title: "Corporate Offices",
      icon: Briefcase,
      image: images.products.visitingCard,
      description: "Executive visiting cards, letterheads, presentation folders, corporate diaries, and marketing brochures.",
      badge: "Executive B2B"
    },
    {
      slug: "hospitality",
      title: "Restaurants & Hotels",
      icon: Utensils,
      image: images.products.brochure,
      description: "Spill-resistant menu cards, table tent cards, takeaway packaging sleeves, paper bags, and bill books.",
      badge: "Dining & Stay"
    },
    {
      slug: "manufacturing",
      title: "Manufacturers & Industrial Companies",
      icon: Factory,
      image: images.products.stickerLabel,
      description: "Heavy-duty product labels, packaging boxes, technical instruction manuals, barcode stickers, and delivery challans.",
      badge: "Industrial Grade"
    },
    {
      slug: "retail",
      title: "Retail & Local Businesses",
      icon: ShoppingBag,
      image: images.products.hospitalBags,
      description: "Custom shopping bags, product stickers, price tags, flyers, posters, and customer loyalty reward cards.",
      badge: "Retail & Shops"
    }
  ];

  // Section 3: Popular Printing Solutions
  const popularSolutions = [
    { name: "Report Pads", category: "Healthcare", image: images.products.reportPad, desc: "Custom medical & diagnostic report pads." },
    { name: "Lab Envelopes", category: "Healthcare", image: images.products.labEnvelope, desc: "Confidential laboratory report envelopes." },
    { name: "School Diaries", category: "Education", image: images.school.schoolDiary, desc: "Hardbound student planners & handbooks." },
    { name: "Mark Sheets", category: "Education", image: images.products.idCard, desc: "Security printed grade sheets with watermarks." },
    { name: "Certificates", category: "Education", image: images.products.visitingCard, desc: "Prestige graduation certificates with foil." },
    { name: "Visiting Cards", category: "Corporate", image: images.products.visitingCard, desc: "Premium cards with matte, velvet, or spot UV." },
    { name: "Letterheads", category: "Corporate", image: images.products.reportPad, desc: "Executive bond paper letterheads." },
    { name: "Corporate Folders", category: "Corporate", image: images.products.opdFile, desc: "Presentation folders with die-cut card slots." },
    { name: "Menu Cards", category: "Hospitality", image: images.products.brochure, desc: "Spill-resistant, washable laminated menus." },
    { name: "Bill Books", category: "Accounts", image: images.products.billBook, desc: "Carbonless NCR duplicate and triplicate books." },
    { name: "Product Labels", category: "Manufacturing", image: images.products.stickerLabel, desc: "High-adhesion waterproof vinyl product labels." },
    { name: "Packaging Boxes", category: "Packaging", image: images.products.hospitalBags, desc: "Custom printed corrugated & duplex boxes." },
    { name: "Brochures", category: "Marketing", image: images.products.brochure, desc: "Tri-fold & bi-fold corporate sales brochures." },
    { name: "Flyers", category: "Promotions", image: images.products.flyers, desc: "High-volume promotional leaflets & handouts." },
    { name: "Paper Bags", category: "Packaging", image: images.products.hospitalBags, desc: "Sustainably-crafted Kraft paper carry bags." },
    { name: "Stickers", category: "Retail", image: images.products.stickerLabel, desc: "Custom die-cut branding stickers and seals." }
  ];

  // Section 4: Complete Printing Services
  const printingServices = [
    { title: "Offset Printing", desc: "High-volume precision printing on German presses delivering sharp text and maximum cost efficiency.", icon: Printer },
    { title: "Commercial Printing", desc: "Tailored commercial print runs for business collateral, catalogs, directories, and books.", icon: FileText },
    { title: "Business Stationery", desc: "Cohesive office identity packages including letterheads, envelopes, notepads, and visiting cards.", icon: Layers },
    { title: "Custom Packaging", desc: "Structural corrugated boxes, retail mono-cartons, food sleeves, and branded paper bags.", icon: Package },
    { title: "Marketing Materials", desc: "Brochures, flyers, posters, banners, and promotional leaflets designed to drive conversions.", icon: Sparkles },
    { title: "Labels and Stickers", desc: "Waterproof, chemical-resistant roll labels, die-cut stickers, and barcode tags.", icon: Tag },
    { title: "Bulk Printing", desc: "Scalable production capacity built for high-quantity institutional contracts and recurring B2B orders.", icon: Truck },
    { title: "Custom Design Support", desc: "In-house pre-press artwork assistance, layout adjustments, dimension proofing, and color matching.", icon: Palette }
  ];

  // Section 5: Why Choose Printopia Solutions
  const whyChooseUsPillars = [
    { title: "Industry-Specific Printing Solutions", desc: "Tailored specifications and specialized materials designed for healthcare, education, corporate, hospitality, industrial, and retail.", icon: ShieldCheck },
    { title: "Custom Size & Specification Support", desc: "Fully bespoke die-cut dimensions, paper types, GSM weights, fold formats, and finishing treatments.", icon: Ruler },
    { title: "High-Quality Printing", desc: "State-of-the-art offset and digital printing technology ensuring razor-sharp clarity and color accuracy.", icon: Award },
    { title: "Competitive Bulk Pricing", desc: "Direct-from-manufacturer transparent B2B rates with scaled volume discounts.", icon: Tag },
    { title: "Reliable Production Process", desc: "Strict quality control protocols from pre-press digital proofing to final finishing and packing.", icon: Clock },
    { title: "Design Assistance", desc: "Dedicated prepress design team to help prepare, correct, and optimize artwork for print accuracy.", icon: Palette },
    { title: "Fast Delivery Support", desc: "Streamlined production scheduling and reliable pan-India logistics for on-time delivery.", icon: Truck },
    { title: "Dedicated Customer Service", desc: "Personal account assistance and responsive communication throughout your ordering process.", icon: Users }
  ];

  // Section 6: How We Work (4 Steps)
  const workflowSteps = [
    { step: "01", title: "Share Your Requirement", desc: "Tell us your product, size, quantity, paper preference, and printing specifications via our quotation form or email." },
    { step: "02", title: "Receive Specification & Quotation", desc: "Get transparent factory-direct pricing, material guidance, and clear production timelines." },
    { step: "03", title: "Design & Production", desc: "Approve the digital artwork proof, and our team begins high-precision offset or digital manufacturing." },
    { step: "04", title: "Quality Check & Delivery", desc: "Every batch undergoes rigorous quality inspection before secure packing and reliable delivery." }
  ];

  // Section 7: Featured Industry Solutions
  const featuredIndustrySolutions = [
    { title: "Healthcare Printing", link: "/industries/healthcare", desc: "Clinical report pads, OPD files, lab envelopes, prescription pads, & patient bands.", icon: Stethoscope },
    { title: "Educational Printing", link: "/industries/education", desc: "School diaries, student ID cards, mark sheets, graduation certificates, & prospectuses.", icon: GraduationCap },
    { title: "Corporate Printing", link: "/industries/corporate", desc: "Visiting cards, letterheads, presentation folders, corporate diaries, & brochures.", icon: Briefcase },
    { title: "Hospitality Printing", link: "/industries/hospitality", desc: "Spill-resistant menu cards, table tent cards, packaging sleeves, & bill books.", icon: Utensils },
    { title: "Industrial Labels & Packaging", link: "/industries/manufacturing", desc: "Product stickers, corrugated boxes, instruction manuals, & barcode labels.", icon: Factory },
    { title: "Retail Promotional Printing", link: "/industries/retail", desc: "Custom shopping bags, price tags, promotional flyers, posters, & loyalty cards.", icon: ShoppingBag }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-[76px]">

      {/* SECTION 1: HOME HERO SECTION */}
      <section className="relative py-24 sm:py-32 lg:py-36 text-white overflow-hidden bg-[#0C3855] border-b border-white/10">
        {/* Layer 1: Lowest Layer - Background Video / Visual */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-110 contrast-105"
          aria-hidden="true"
        >
          <source
            src="https://res.cloudinary.com/qsr7wdp3/video/upload/f_auto,q_auto:good,vc_auto/VN20260722_194942_rfuscp.mp4"
            type="video/mp4"
          />
        </video>

        {/* Layer 2: Middle Layer - Soft Transparent Gradient Overlay (Darker Left, Light/Transparent Right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C3855]/70 via-[#0C3855]/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C3855]/35 via-transparent to-[#0C3855]/15 z-10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#BED7EB_1px,transparent_1px)] [background-size:24px_24px] z-10 pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0C7D8D]/10 rounded-full blur-3xl pointer-events-none z-10" />

        {/* Layer 3: Top Layer - Content aligned cleanly on left, keeping right visual area open */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
          <div className="max-w-2xl sm:max-w-3xl space-y-8 text-left">
            
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#BED7EB] text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#0C7D8D]" />
              <span>Commercial Printing & Packaging Partner</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
              Commercial Printing & Packaging Solutions Across Industries
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#BED7EB]/95 leading-relaxed font-normal drop-shadow-xs max-w-2xl">
              Printopia Solutions delivers high-precision offset and digital printing, corporate stationery, marketing collateral, and custom packaging for healthcare, educational, corporate, hospitality, industrial, and retail organizations.
            </p>

            {/* Primary & Secondary Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#industries-we-serve"
                className="px-8 py-4 bg-[#0C7D8D] hover:bg-[#085a66] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2.5"
              >
                <span>Explore Industries</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest rounded-xl border border-white/25 backdrop-blur-md transition-all flex items-center space-x-2 cursor-pointer hover:border-white shadow-md"
              >
                <span>View Products</span>
                <ChevronRight className="w-4 h-4 text-[#BED7EB]" />
              </button>
            </div>

            {/* Corporate Key Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/20 text-xs text-[#BED7EB] max-w-2xl">
              <div className="flex items-center space-x-2 bg-slate-900/40 py-2.5 px-3 rounded-lg border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0C7D8D] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Pan-India Logistics</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/40 py-2.5 px-3 rounded-lg border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0C7D8D] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Bulk Volume Pricing</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/40 py-2.5 px-3 rounded-lg border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0C7D8D] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Free Design Proofs</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/40 py-2.5 px-3 rounded-lg border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0C7D8D] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">GST Invoicing</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRIES WE SERVE */}
      <section id="industries-we-serve" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              Multi-Sector Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C3855] tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Customized commercial printing, stationery, promotional collateral, and packaging engineered for your sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesList.map((ind) => {
              const IconComp = ind.icon;
              return (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0C7D8D]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Banner */}
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={ind.image}
                        alt={ind.alt || ind.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C3855]/80 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#0C3855]/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-md">
                        {ind.badge}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-[#BED7EB]/30 text-[#0C7D8D]">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0C3855] group-hover:text-[#0C7D8D] transition-colors">
                          {ind.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {ind.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="p-6 pt-0">
                    <Link
                      to={`/industries/${ind.slug}`}
                      className="w-full py-3 bg-[#0C3855] hover:bg-[#0C7D8D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3: POPULAR PRINTING SOLUTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              High-Demand B2B Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C3855] tracking-tight">
              Popular Printing Solutions
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Explore our most requested products crafted with precision offset and digital technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularSolutions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className="group bg-white rounded-2xl border border-slate-200 p-4 hover:border-[#0C7D8D]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 bg-slate-50 rounded-xl overflow-hidden mb-3 border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-[#0C3855] text-[10px] font-extrabold uppercase tracking-wider rounded-md border border-slate-200">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0C3855] group-hover:text-[#0C7D8D] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onRequestQuote(item.name)}
                    className="text-[11px] font-bold text-[#0C7D8D] hover:text-[#085a66] uppercase tracking-wider cursor-pointer"
                  >
                    Request Quote
                  </button>
                  <Link
                    to="/products"
                    className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#0C7D8D] group-hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-slate-100 hover:bg-[#0C3855] hover:text-white text-[#0C3855] text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              <span>View All Commercial Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 4: COMPLETE PRINTING SERVICES */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              Manufacturing Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C3855] tracking-tight">
              Complete Printing Services
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              From high-speed offset production to custom prepress design, we manage your entire print lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {printingServices.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0C7D8D]/40 transition-all duration-300 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#BED7EB]/30 text-[#0C7D8D] flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0C3855]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE PRINTOPIA SOLUTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              The Printopia Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C3855] tracking-tight">
              Why Choose Printopia Solutions?
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Built on quality craftsmanship, transparent B2B pricing, and reliable production schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#0C7D8D]/40 hover:shadow-lg transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0C3855] text-white flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0C3855]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 6: HOW WE WORK (4 Steps) */}
      <section className="py-20 bg-[#0C3855] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#BED7EB] mb-3 block">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How We Work
            </h2>
            <p className="text-sm text-[#BED7EB]/80 mt-3">
              A transparent, hassle-free workflow from initial requirement to final doorstep delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md space-y-4"
              >
                <span className="text-2xl font-black font-mono text-[#0C7D8D] bg-white/10 px-3 py-1 rounded-lg inline-block">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-[#BED7EB]/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: FEATURED INDUSTRY SOLUTIONS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0C7D8D] mb-3 block">
              Tailored Portfolios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C3855] tracking-tight">
              Featured Industry Solutions
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Direct access to specialized printing ranges crafted for specific institutional needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredIndustrySolutions.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0C7D8D] hover:shadow-xl transition-all duration-300 flex items-start space-x-4"
                >
                  <div className="p-3 rounded-xl bg-[#BED7EB]/30 text-[#0C7D8D] group-hover:bg-[#0C7D8D] group-hover:text-white transition-colors shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#0C3855] group-hover:text-[#0C7D8D] transition-colors flex items-center space-x-1">
                      <span>{item.title}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 8: COMPANY INTRODUCTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0C7D8D]">
                About Printopia Solutions
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0C3855] tracking-tight">
                Your Reliable Printing Partner
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Printopia Solutions supports businesses with customized printing, stationery, promotional materials and packaging solutions. From small business requirements to bulk institutional orders, we provide professional service with consistent quality.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/about"
                className="px-8 py-4 bg-[#0C3855] hover:bg-[#0C7D8D] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-20 bg-[#0C3855] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Looking for a Custom Printing Solution?
          </h2>
          <p className="text-sm sm:text-base text-[#BED7EB] max-w-2xl mx-auto leading-relaxed">
            Tell us your product, size, quantity and printing specifications. Our team will help you with the right solution.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button
              onClick={() => onRequestQuote('Custom Solution')}
              className="px-8 py-4 bg-[#0C7D8D] hover:bg-[#085a66] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Request a Quotation
            </button>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest rounded-xl border border-white/20 transition-all"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
