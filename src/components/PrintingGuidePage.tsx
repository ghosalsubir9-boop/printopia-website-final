import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, FileText, Layers, Printer, Palette, HelpCircle, 
  ChevronDown, ChevronRight, ArrowRight, CheckCircle, 
  MessageSquare, Phone, Info, ShieldCheck, Zap, Maximize,
  FileType, ImageIcon, Check, AlertTriangle, Scale, Ruler,
  Sparkles, CheckSquare, ListFilter, ArrowDown, PackageCheck,
  Truck, Award, Compass, X
} from 'lucide-react';
import { ALL_PRODUCTS } from './AllProductsPage';
import { images } from '../data/imageMap';

interface PrintingGuidePageProps {
  onRequestQuote: (productName?: string) => void;
}

export default function PrintingGuidePage({ onRequestQuote }: PrintingGuidePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('sec-stationery');
  const [isTocMobileOpen, setIsTocMobileOpen] = useState(false);

  useEffect(() => {
    // Page SEO Meta Updates
    document.title = "Healthcare Printing Knowledge Center | Printopia Solutions";
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = "Comprehensive healthcare printing guide & knowledge center. Learn about paper types, GSM, product sizes, printing methods, and finishing options for hospital stationery.";
    
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

  // ScrollSpy listener to update active TOC item
  useEffect(() => {
    const sectionIds = [
      'sec-stationery',
      'sec-paper-gsm',
      'sec-sizes',
      'sec-printing',
      'sec-finishing',
      'sec-branding',
      'sec-quality',
      'sec-faq'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsTocMobileOpen(false);
  };

  // Section 2: Quick Navigation Dashboard Cards
  const dashboardCards = [
    { id: 'sec-stationery', icon: <FileText className="w-5 h-5" />, title: "Hospital Stationery", desc: "Prescription pads, OPD case files & report sheets." },
    { id: 'sec-paper-gsm', icon: <Layers className="w-5 h-5" />, title: "Paper & GSM Guide", desc: "Material thickness, weights & feel breakdown." },
    { id: 'sec-sizes', icon: <Ruler className="w-5 h-5" />, title: "Product Sizes", desc: "A4, A5, B5 & custom folder dimensions." },
    { id: 'sec-printing', icon: <Printer className="w-5 h-5" />, title: "Printing Methods", desc: "Offset vs Digital precision for medical runs." },
    { id: 'sec-finishing', icon: <Sparkles className="w-5 h-5" />, title: "Finishing Options", desc: "Lamination, spot UV, clips & binding." },
    { id: 'sec-branding', icon: <Palette className="w-5 h-5" />, title: "Hospital Branding", desc: "Color accuracy, vector logos & bleed standards." },
    { id: 'sec-quality', icon: <ShieldCheck className="w-5 h-5" />, title: "Quality Checklist", desc: "Zero-error verification for clinical accuracy." },
    { id: 'sec-faq', icon: <HelpCircle className="w-5 h-5" />, title: "Frequently Asked Questions", desc: "Answers to B2B ordering, quotes & turnaround." }
  ];

  // Section 3: Healthcare Printing Workflow Steps
  const workflowSteps = [
    { num: "01", title: "Choose Product", desc: "Select report pad, envelope, OPD file or bag.", icon: <FileText className="w-4 h-4 text-[#0C3855]" /> },
    { num: "02", title: "Select Paper", desc: "Choose Maplitho, Bond, or Art Board pulp.", icon: <Layers className="w-4 h-4 text-[#0C3855]" /> },
    { num: "03", title: "Select GSM", desc: "Pick 70 GSM to 350+ GSM board thickness.", icon: <Scale className="w-4 h-4 text-[#0C3855]" /> },
    { num: "04", title: "Precision Printing", desc: "High-definition offset or digital color run.", icon: <Printer className="w-4 h-4 text-[#0C3855]" /> },
    { num: "05", title: "Custom Finishing", desc: "Lamination, metallic clip & perforation.", icon: <Sparkles className="w-4 h-4 text-[#0C3855]" /> },
    { num: "06", title: "Safe Delivery", desc: "Moisture-proof packing & pan-India dispatch.", icon: <Truck className="w-4 h-4 text-[#0C3855]" /> }
  ];

  const paperTypes = [
    {
      title: "Maplitho Paper",
      uses: "Commonly used for report pads, prescription sheets, and internal diagnostic notes.",
      advantages: "High brightness, smooth surface for ballpoint pens, and excellent ink absorption.",
      recommended: "Report Pad, Bill Book, OPD Forms."
    },
    {
      title: "Bond Paper",
      uses: "Ideal for high-end corporate hospital letterheads and premium patient files.",
      advantages: "Strong, durable, and has a distinctive 'premium' texture that signifies authority.",
      recommended: "Executive Letterheads, Premium Consultation Pads."
    },
    {
      title: "Art Paper / Art Board",
      uses: "Used for high-resolution medical brochures, flyers, and premium file covers.",
      advantages: "Coated surface (Gloss/Matt) that makes medical illustrations and branding pop.",
      recommended: "Medical Brochures, Hospital Bags, Test Report Files."
    }
  ];

  const gsmTable = [
    { gsm: "70 GSM", feel: "Lightweight", commonUse: "Secondary duplicate bill copies, internal memo pads, and economical prescription slips." },
    { gsm: "80 GSM", feel: "Standard Office", commonUse: "Standard Doctor Consultation pads, report sheets, and hospital letterheads." },
    { gsm: "90 GSM", feel: "Premium Uncoated", commonUse: "High-grade pathology report pads and double-sided clinical documentation." },
    { gsm: "100 GSM", feel: "Heavy-Duty", commonUse: "Diagnostic lab envelopes, secure results enclosures, and pharmacy bags." },
    { gsm: "120 GSM", feel: "Ultra-Premium", commonUse: "Executive report covers, durable patient window envelopes, and greeting cards." },
    { gsm: "300+ GSM", feel: "Rigid Card", commonUse: "OPD Case History files, vaccination folders, and hospital folder sleeves." }
  ];

  const sizesData = [
    { size: "A4 (210 × 297 mm)", category: "Standard Report & Prescription Pads", desc: "The universal clinical standard for doctor consultation pads, discharge summaries, and full-page pathology report sheets." },
    { size: "A5 (148 × 210 mm)", category: "Compact Doctor Memos & OPD Slips", desc: "Half-A4 dimension ideal for quick follow-up slips, outpatient billing counters, and daily medicine dosage charts." },
    { size: "10\" × 12\" Envelopes", category: "Standard X-Ray & Radiology Envelopes", desc: "Protective kraft and art paper envelopes tailored for standard radiological imaging films and diagnostic reports." },
    { size: "12\" × 15\" Envelopes", category: "Large CT Scan & MRI Envelopes", desc: "Heavy-duty large-format protective envelopes engineered to transport CT scan, MRI, and large bone x-ray plates safely." },
    { size: "Custom Die-Cut Folders", category: "Multi-Pocket OPD Case Files", desc: "Customized rigid folder sleeves (e.g. 10\" × 14\") with integrated metallic clip mechanisms, business card slits, and inner document pockets." }
  ];

  const printingMethods = [
    {
      name: "Multi-Color Offset Printing",
      bestFor: "High-Volume Runs (1,000+ units)",
      desc: "Heidelberg offset presses deliver unmatched sharpness, exact CMYK & Pantone color matching, and the lowest cost per unit for institutional hospital supplies.",
      pros: ["Exceptional image resolution & color accuracy", "Most cost-effective for large hospital runs", "Consistent ink coverage across tens of thousands of sheets"]
    },
    {
      name: "High-Speed Digital Printing",
      bestFor: "Short Runs & Urgent Deliveries (100–500 units)",
      desc: "Ideal for emergency checkup camp flyers, rapid Doctor ID card batches, or prototype consultation pads with zero plate setup fees.",
      pros: ["Instant turnarounds (24–48 hours)", "Zero setup cost for low quantities", "Supports variable patient data or serial numbering"]
    },
    {
      name: "Precision Screen Printing",
      bestFor: "Specialty Bags & Spot Metallic Logos",
      desc: "Used for heavy non-woven hospital carry bags, dense opaque white ink on dark paper stock, and raised tactile logo finishes.",
      pros: ["High ink opacity on dark substrates", "Extremely durable against handling & moisture", "Rich tactile finish for premium branding"]
    }
  ];

  const finishingOptions = [
    { title: "Matt & Gloss Lamination", desc: "Protects OPD file folders and lab report covers from water spills, fingerprints, and tearing." },
    { title: "Metallic Clip Assembly", desc: "Rigid stainless steel or plastic clip installations inside patient case folders to keep medical sheets securely organized." },
    { title: "Spot UV Gloss", desc: "Raised clear gloss applied onto hospital logos and doctor visiting cards to create an executive 3D shine." },
    { title: "Perforation & Serial Numbering", desc: "Precision micro-perforated tear lines and consecutive red serial numbering for medical billing pads and cash memos." }
  ];

  const artworkTips = [
    { icon: <ShieldCheck className="w-5 h-5 text-[#0C3855]" />, title: "Vector Logo", desc: "Provide hospital logos in vector format (AI, EPS, SVG) or high-res 300 DPI transparent PNG." },
    { icon: <Zap className="w-5 h-5 text-[#0C3855]" />, title: "Outlined Fonts", desc: "Convert all typography to curves/outlines to eliminate font substitution errors on press." },
    { icon: <Maximize className="w-5 h-5 text-[#0C3855]" />, title: "300 DPI Resolution", desc: "Ensure embedded medical diagrams and clinic imagery are rendered at a minimum of 300 DPI." },
    { icon: <Palette className="w-5 h-5 text-[#0C3855]" />, title: "CMYK Color Space", desc: "Design artwork in CMYK rather than RGB to ensure true-to-life printed color reproduction." },
    { icon: <Ruler className="w-5 h-5 text-[#0C3855]" />, title: "3mm Bleed Margin", desc: "Include 3mm extra background bleed around all outer trim edges to prevent white border cuts." },
    { icon: <Scale className="w-5 h-5 text-[#0C3855]" />, title: "5mm Safe Zone", desc: "Keep critical doctor registration numbers and clinical grids 5mm inside the final trim line." }
  ];

  const qualityChecklist = [
    { title: "Legible Medical Typography", desc: "Ensure doctor registration numbers, dosage instructions, and clinic contact details use at least 8pt font for effortless reading." },
    { title: "Precise Pre-Press Bleed", desc: "Verify 3mm bleed on all background art so precision guillotines produce crisp, clean edges without white fringes." },
    { title: "CMYK Spectrum Alignment", desc: "Calibrate hospital brand colors using standard CMYK offset swatches to maintain brand identity across all stationery." },
    { title: "Archival Acid-Free Paper", desc: "Utilize acid-free paper stock so patient consultation records inside archives do not yellow or deteriorate over years." }
  ];

  const faqs = [
    { question: "Which paper is best for medical report pads?", answer: "We recommend 80 GSM or 90 GSM Maplitho (uncoated) paper. It is the most economical and functional choice for handwritten notes and clinical diagnostic printing." },
    { question: "What GSM should I choose for hospital files?", answer: "For OPD Case History files, we recommend Art Board ranging from 300 GSM to 450 GSM to ensure the file remains rigid and protects patient records over many years." },
    { question: "Can I print on both sides of a report pad?", answer: "Yes, we support double-sided printing. We recommend using at least 90 GSM or 100 GSM paper for double-sided runs to minimize 'show-through' of ink." },
    { question: "Can I customize the design for my hospital?", answer: "Absolutely. We manufacture every order from scratch. You can customize the dimensions, logo placement, column layout, and pre-printed clinic details." },
    { question: "Do you support bulk orders for multi-specialty hospitals?", answer: "Yes, Printopia Solutions is equipped for high-volume B2B runs. We currently serve large diagnostic chains and hospitals with regular monthly supply contracts." },
    { question: "Can you deliver outside Kolkata?", answer: "Yes, we ship across India. All orders are packed in secure moisture-proof cartons and dispatched via national logistics partners like BlueDart, Delhivery, or TCI." },
    { question: "Can I print my hospital logo in specific brand colors?", answer: "Yes, we use Heidelberg multi-color offset presses that can match specific CMYK values or Pantone shades to maintain your corporate brand identity." },
    { question: "How do I request a formal quotation?", answer: "You can use our website quote form, WhatsApp us directly, or call our help desk. Provide the product name, required size, paper type, GSM, and quantity." },
    { question: "What file format should I send for printing?", answer: "We prefer high-resolution PDF files with fonts embedded. We also accept AI, CorelDraw, and high-quality JPEG/PNG files (300 DPI minimum)." },
    { question: "How long does the entire printing process take?", answer: "Standard production takes 5-7 business days after design approval. Shipping time depends on your location (usually 2-5 days for pan-India delivery)." }
  ];

  const tocItems = [
    { id: 'sec-stationery', label: 'Hospital Stationery' },
    { id: 'sec-paper-gsm', label: 'Paper & GSM' },
    { id: 'sec-sizes', label: 'Product Sizes' },
    { id: 'sec-printing', label: 'Printing Methods' },
    { id: 'sec-finishing', label: 'Finishing Options' },
    { id: 'sec-branding', label: 'Hospital Branding' },
    { id: 'sec-quality', label: 'Quality Checklist' },
    { id: 'sec-faq', label: 'FAQ' }
  ];

  return (
    <div id="printing-guide-page" className="w-full bg-white pt-24 sm:pt-28 font-sans overflow-hidden">
      
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
              "name": "Printing Guide",
              "item": `${typeof window !== 'undefined' ? window.location.origin : 'https://printopia.in'}/printing-guide`
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Healthcare Printing Guide & Knowledge Center",
          "description": "Comprehensive guide to healthcare printing including paper types, GSM, product sizes, and artwork standards for hospitals.",
          "author": {
            "@type": "Organization",
            "name": "Printopia Solutions"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Printopia Solutions",
            "logo": {
              "@type": "ImageObject",
              "url": `${typeof window !== 'undefined' ? window.location.origin : 'https://printopia.in'}${images.logo}`
            }
          },
          "datePublished": "2024-01-01"
        })}
      </script>

      {/* SECTION: Breadcrumb */}
      <nav 
        aria-label="Breadcrumb" 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3.5 border-b border-neutral-100"
      >
        <ol className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-neutral-400">
          <li>
            <Link to="/" className="hover:text-[#0C3855] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0C3855] rounded px-1 py-0.5">
              Home
            </Link>
          </li>
          <li className="select-none text-neutral-300">/</li>
          <li className="text-[#0C3855] font-bold" aria-current="page">
            Printing Guide
          </li>
        </ol>
      </nav>

      {/* SECTION 1: HERO */}
      <header className="relative h-[520px] md:h-[620px] lg:h-[720px] border-b border-blue-100/60 text-left overflow-hidden">
        {/* Full-screen Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source 
            src="https://res.cloudinary.com/qsr7wdp3/video/upload/f_auto,q_auto:good,vc_auto/Healthcare_printing_guide_backgr__1080p_202607222350_ba5mqo.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Hero Left-Aligned Content */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-full flex flex-col justify-center z-10">
          <div className="max-w-[620px] space-y-6 transition-all duration-800 animate-[fadeIn_0.8s_ease-out]">
            
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#0C3855]/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0C3855] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.18em] text-[#0C3855] font-extrabold uppercase">
                HEALTHCARE PRINTING RESOURCE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-neutral-950 tracking-tight leading-[1.08] uppercase">
              Healthcare Printing Guide <span className="text-[#0C3855] block">for Hospitals & Diagnostic Centres</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-semibold max-w-[500px]">
              Explore the right paper, size, GSM, printing and finishing options for report pads, lab envelopes, OPD files, prescription pads and other essential healthcare print products.
            </p>

            {/* Mobile CTA Buttons (Stacked Vertically below description) */}
            <div className="flex flex-col gap-3 pt-2 md:hidden">
              <button
                onClick={() => handleScrollToId('sec-dashboard')}
                className="px-6.5 py-3.5 bg-[#0C3855] hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#0C3855]/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3855]"
              >
                <span>Explore the Guide</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
              
              <Link
                to="/contact"
                className="px-6.5 py-3.5 bg-white/90 hover:bg-white border border-neutral-300 hover:border-neutral-800 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
              >
                <MessageSquare className="w-4 h-4 text-[#0C3855]" />
                <span>Request Expert Advice</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Desktop & Tablet Bottom-Right CTA Buttons (Independent from text block) */}
        <div className="hidden md:flex flex-row gap-[16px] absolute bottom-[70px] right-6 sm:right-8 lg:right-[28px] z-20">
          <button
            onClick={() => handleScrollToId('sec-dashboard')}
            className="px-6.5 py-3.5 bg-[#0C3855] hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#0C3855]/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3855]"
          >
            <span>Explore the Guide</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
          
          <Link
            to="/contact"
            className="px-6.5 py-3.5 bg-white/90 hover:bg-white border border-neutral-300 hover:border-neutral-800 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
          >
            <MessageSquare className="w-4 h-4 text-[#0C3855]" />
            <span>Request Expert Advice</span>
          </Link>
        </div>

        {/* Scroll Indicator at Bottom Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <button 
            onClick={() => handleScrollToId('sec-dashboard')}
            className="flex flex-col items-center space-y-1 text-neutral-800 hover:text-[#0C3855] transition-colors cursor-pointer group focus-visible:outline-none"
            aria-label="Scroll to Explore"
          >
            <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-white/60 shadow-xs">
              Scroll to Explore
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#0C3855]" />
          </button>
        </div>
      </header>

      {/* SECTION 2: QUICK NAVIGATION DASHBOARD */}
      <section id="sec-dashboard" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16 text-left" aria-labelledby="dashboard-title">
        <div className="space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
              QUICK NAVIGATION
            </span>
            <h2 id="dashboard-title" className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
              Healthcare Printing Knowledge Center
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto font-medium">
              Choose any topic below to instantly explore detailed printing guidance.
            </p>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          {/* 8 Cards: 4 cols x 2 rows Desktop, 2 cols Tablet, 1 col Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dashboardCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleScrollToId(card.id)}
                className="group bg-white p-6 rounded-2xl border border-neutral-200/70 hover:border-[#0C3855]/40 hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between space-y-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3855]"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0C3855]/5 text-[#0C3855] flex items-center justify-center border border-[#0C3855]/10 group-hover:bg-[#0C3855] group-hover:text-white transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-display font-extrabold text-neutral-950 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center text-[10px] font-bold text-[#0C3855] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  <span>Explore Topic</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: HEALTHCARE PRINTING WORKFLOW */}
      <section id="sec-workflow" className="bg-neutral-50/70 py-14 sm:py-16 border-y border-neutral-200/60 text-left" aria-labelledby="workflow-title">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
              PRODUCTION STAGES
            </span>
            <h2 id="workflow-title" className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
              Healthcare Printing Workflow
            </h2>
            <p className="text-sm text-neutral-600 max-w-xl mx-auto font-medium">
              From product specification to final moisture-proof delivery.
            </p>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          {/* Horizontal Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs hover:border-[#0C3855]/40 hover:shadow-md transition-all group relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                      Step {step.num}
                    </span>
                    <div className="p-1.5 rounded-lg bg-neutral-100 text-[#0C3855] group-hover:bg-[#0C3855] group-hover:text-white transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-bold text-neutral-950 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Connecting Line Arrow indicator on desktop */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-neutral-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MAIN CONTENT AREA WITH FLOATING/STICKY TOC SIDEBAR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-18 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* MAIN GUIDE CONTENT (9 Columns on Desktop) */}
          <div className="lg:col-span-9 space-y-16">

            {/* SECTION 4.1: HOSPITAL STATIONERY */}
            <section id="sec-stationery" className="scroll-mt-28 space-y-8 border-b border-neutral-200/80 pb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 01
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Hospital Stationery Solutions
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl font-medium">
                  Vital pre-printed documentation tools for healthcare institutions to organize patient consultation sheets, prescription history, diagnostic reports, and outpatient billing.
                </p>
              </div>

              {/* Grid of Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_PRODUCTS.map((prod) => (
                  <Link 
                    key={prod.slug}
                    to={`/products/${prod.slug}`}
                    className="bg-neutral-50/60 p-5 rounded-2xl border border-neutral-200/70 hover:border-[#0C3855]/40 hover:bg-white hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-full aspect-[4/3] bg-white rounded-xl border border-neutral-200/50 p-3 flex items-center justify-center overflow-hidden">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-sm font-bold text-neutral-950 tracking-tight leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                    
                    <div className="pt-3 flex items-center text-[11px] font-bold text-[#0C3855] uppercase tracking-wider">
                      <span>Explore Specs</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Best Practice & Hospital Recommendation Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-6 bg-cyan-50/80 border border-cyan-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-cyan-900 font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-cyan-700" />
                    <span>Best Practice Tip</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Always order report pads and prescription sheets in standardized batches of 1,000+ pads to lock in maximum offset press volume discounts and ensure color consistency across departments.
                  </p>
                </div>

                <div className="p-6 bg-blue-50/80 border border-blue-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-[#0C3855] font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#0C3855]" />
                    <span>Hospital Recommendation</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Equip OPD folders with rigid metallic clip assemblies and pre-cut business card slits so doctors can easily attach consultant cards and lab appointment vouchers.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4.2: PAPER & GSM */}
            <section id="sec-paper-gsm" className="scroll-mt-28 space-y-8 border-b border-neutral-200/80 pb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 02
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Paper Types & GSM Thickness Guide
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                  Selecting the correct paper pulp and GSM thickness ensures clinical longevity, smooth ballpoint writing, and printer jam prevention.
                </p>
              </div>

              {/* Paper Types Breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight">
                  Medical Paper Pulps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paperTypes.map((type, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
                      <h4 className="text-sm font-bold text-[#0C3855] uppercase tracking-wide">
                        {type.title}
                      </h4>
                      <div className="space-y-2 text-xs text-neutral-600">
                        <p><strong className="text-neutral-900 font-semibold">Uses:</strong> {type.uses}</p>
                        <p><strong className="text-neutral-900 font-semibold">Advantages:</strong> {type.advantages}</p>
                      </div>
                      <div className="pt-2 border-t border-neutral-100 text-[11px] font-bold text-neutral-800">
                        Best: {type.recommended}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GSM Table */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight">
                  GSM Weight Breakdown
                </h3>
                <div className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-100/70 border-b border-neutral-200 text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                          <th className="p-4 text-left">GSM Rating</th>
                          <th className="p-4 text-left">Paper Feel</th>
                          <th className="p-4 text-left">Suited Medical Applications</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-xs">
                        {gsmTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                            <td className="p-4 font-display font-black text-neutral-950">{row.gsm}</td>
                            <td className="p-4 font-semibold text-neutral-700">{row.feel}</td>
                            <td className="p-4 text-neutral-600 leading-relaxed">{row.commonUse}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Tip & Warning Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-1.5">
                  <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Important Warning</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Avoid using 70 GSM paper for double-sided report printing. High ink absorption on thin paper causes "show-through" which renders reverse diagnostic charts unreadable.
                  </p>
                </div>

                <div className="p-5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Archival Standard</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    We use acid-free archival woodfree pulp for all 80+ GSM Maplitho papers to guarantee that clinical charts stored in medical archives will not turn yellow over 10+ years.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4.3: PRODUCT SIZES */}
            <section id="sec-sizes" className="scroll-mt-28 space-y-8 border-b border-neutral-200/80 pb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 03
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Standard & Custom Product Sizes
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                  Dimensions tailored for standard medical filing cabinets, laboratory envelopes, radiology imaging films, and pharmacy counter dispensers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sizesData.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0C3855]/10 text-[#0C3855] flex items-center justify-center font-bold text-xs">
                      <Ruler className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-950 tracking-tight">
                      {item.size}
                    </h3>
                    <div className="text-xs font-semibold text-[#0C3855]">
                      {item.category}
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4.4: PRINTING METHODS */}
            <section id="sec-printing" className="scroll-mt-28 space-y-8 border-b border-neutral-200/80 pb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Healthcare Printing Methods
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                  Comparing multi-color offset presses, high-speed digital units, and precision screen printing for hospital production runs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {printingMethods.map((method, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded uppercase">
                        {method.bestFor}
                      </span>
                      <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                        {method.name}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {method.desc}
                      </p>
                    </div>

                    <ul className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs text-neutral-700">
                      {method.pros.map((pro, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4.5: FINISHING OPTIONS */}
            <section id="sec-finishing" className="scroll-mt-28 space-y-8 border-b border-neutral-200/80 pb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 05
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Protective Finishing & Structural Options
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                  Coatings, metallic clip installations, micro-perforated tear lines, and spot UV treatments engineered for daily clinical handling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {finishingOptions.map((opt, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
                    <div className="flex items-center space-x-2.5">
                      <Sparkles className="w-4 h-4 text-[#0C3855]" />
                      <h3 className="text-sm font-bold text-neutral-950 tracking-tight">
                        {opt.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed pl-6">
                      {opt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4.6: HOSPITAL BRANDING & ARTWORK STANDARDS */}
            <section id="sec-branding" className="scroll-mt-28 space-y-8 border-b border-neutral-200/80 pb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 06
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Hospital Branding & Pre-Press Standards
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                  Follow these essential artwork guidelines to ensure zero color deviation, razor-sharp medical grids, and perfect trim margins.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artworkTips.map((tip, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
                    <div className="flex items-center space-x-2.5">
                      {tip.icon}
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-950 uppercase tracking-tight">
                        {tip.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4.7: QUALITY CHECKLIST */}
            <section id="sec-quality" className="scroll-mt-28 space-y-8 border-b border-neutral-200/80 pb-12">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 07
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Healthcare Quality Checklist
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                  Four non-negotiable quality checks performed by Printopia Solutions prior to releasing any hospital print batch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualityChecklist.map((check, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
                    <div className="flex items-center space-x-2.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <h3 className="text-sm font-bold text-neutral-950 tracking-tight">
                        {check.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed pl-7">
                      {check.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4.8: FAQ ACCORDION */}
            <section id="sec-faq" className="scroll-mt-28 space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                  CATEGORY 08
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-neutral-600 font-medium">
                  Quick answers regarding ordering, turnarounds, custom dimensions, and pan-India shipping.
                </p>
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
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* DESKTOP STICKY RIGHT SIDEBAR TABLE OF CONTENTS (3 Columns on Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6">
            <div className="bg-neutral-50/90 border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm backdrop-blur-md">
              <div className="flex items-center space-x-2 text-[#0C3855] font-bold text-xs uppercase tracking-wider border-b border-neutral-200 pb-3">
                <Compass className="w-4 h-4 text-[#0C3855]" />
                <span>Guide Topics</span>
              </div>

              <nav className="space-y-1" aria-label="Table of Contents">
                {tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleScrollToId(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isActive 
                          ? 'bg-[#0C3855] text-white font-bold shadow-sm' 
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/50'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-cyan-300" />}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-neutral-200/80 space-y-2">
                <button
                  onClick={() => onRequestQuote()}
                  className="w-full py-2.5 px-3 bg-[#0C3855] hover:bg-blue-950 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* MOBILE FLOATING TOC BUTTON & MODAL */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsTocMobileOpen(true)}
          className="bg-[#0C3855] text-white p-3.5 rounded-full shadow-2xl border border-white/20 flex items-center space-x-2 cursor-pointer focus-visible:outline-none"
          aria-label="Open Table of Contents"
        >
          <Compass className="w-5 h-5 text-cyan-300 animate-spin-slow" />
          <span className="text-xs font-bold uppercase tracking-wider pr-1">Topics</span>
        </button>

        <AnimatePresence>
          {isTocMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsTocMobileOpen(false);
              }}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl border border-neutral-200"
              >
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center space-x-2 text-[#0C3855] font-bold text-sm uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>Select Guide Topic</span>
                  </div>
                  <button
                    onClick={() => setIsTocMobileOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                  {tocItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleScrollToId(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                          isActive 
                            ? 'bg-[#0C3855] text-white' 
                            : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 6: END OF PAGE CTA (Dark Blue Gradient) */}
      <section id="sec-cta" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20 text-left">
        <div className="bg-gradient-to-br from-[#0C3855] via-[#092B42] to-[#061D2D] text-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl border border-blue-900/40">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
            
            <div className="lg:col-span-8 space-y-5">
              <span className="text-[11px] font-mono tracking-[0.2em] text-cyan-400 font-extrabold uppercase block">
                EXPERT CONSULTATION
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-tight uppercase text-white">
                Need Help Choosing the Right Healthcare Printing Solution?
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
                Our printing specialists assist multi-specialty hospitals, pathology chains, and clinics in selecting the ideal paper pulp, GSM rating, custom dimensions, and protective coatings.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              <button
                onClick={() => onRequestQuote()}
                className="w-full px-6 py-4 bg-white text-[#0C3855] hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href={`https://wa.me/919432436942?text=${encodeURIComponent("Hello Printopia Solutions, I am reviewing the Healthcare Printing Guide and need advice on selecting the right paper and GSM for our clinic.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 focus-visible:outline-none"
              >
                <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                <span>Talk to an Expert</span>
              </a>

              <a
                href="tel:+919432436942"
                className="w-full px-6 py-4 border border-white/30 hover:border-white text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 focus-visible:outline-none"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
