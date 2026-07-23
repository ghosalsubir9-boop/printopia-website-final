import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Paperclip, Send, ShieldCheck, Clock, Layers, Phone, Mail, MapPin, Award, CheckCircle, FileText, Settings, HelpCircle, Briefcase, Plus, AlertCircle, MessageSquare } from 'lucide-react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import FeaturedProducts from './components/FeaturedProducts';
import { ClientTrust } from './components/ClientTrust';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TeamAndInfrastructure } from './components/TeamAndInfrastructure';
import { ManufacturingProcess } from './components/ManufacturingProcess';
import { Testimonials } from './components/Testimonials';
import { DownloadCatalogue } from './components/DownloadCatalogue';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ExperienceStatsBar from './components/ExperienceStatsBar';
import { AmbientBackground } from './components/AmbientBackground';
import HomePage from './components/HomePage';
import HealthcarePage from './components/HealthcarePage';
import { ProductItem, FEATURED_PRODUCTS } from './data';
import { submitQuotationRequest, fetchQuotationRequests } from './services/quotationService';

// Lazy load components for code splitting
const AllProductsPage = React.lazy(() => import('./components/AllProductsPage'));
const ProductDetailPage = React.lazy(() => import('./components/ProductDetailPage'));
const IndustriesPage = React.lazy(() => import('./components/IndustriesPage'));
const IndustryDetailPage = React.lazy(() => import('./components/IndustryDetailPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const PrintingGuidePage = React.lazy(() => import('./components/PrintingGuidePage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));

// Skeleton Loader for Suspense
const PageSkeleton = () => (
  <div className="min-h-screen bg-white pt-32 px-6">
    <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
      <div className="h-12 bg-neutral-100 rounded-2xl w-1/3" />
      <div className="h-64 bg-neutral-50 rounded-[32px]" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-80 bg-neutral-50 rounded-[32px]" />
        ))}
      </div>
    </div>
  </div>
);

// Schema.org JSON-LD
const SEO_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://printopia.in/#organization",
      "name": "Printopia Solutions",
      "url": "https://printopia.in",
      "logo": "https://printopia.in/Images/LOGO.webp",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9432436942",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi", "bn"]
      }
    },
    {
      "@type": "LocalBusiness",
      "name": "Printopia Solutions",
      "image": "https://printopia.in/Images/LOGO.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "362/5 Kalitala Road, Purbachal",
        "addressLocality": "Kolkata",
        "addressRegion": "WB",
        "postalCode": "700078",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.518,
        "longitude": 88.383
      },
      "url": "https://printopia.in",
      "telephone": "+919432436942",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "19:00"
      }
    }
  ]
};

// Reusable Page Banner Component for premium sub-pages
const PageBanner = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="relative pt-32 pb-16 bg-neutral-900 overflow-hidden border-b border-neutral-800">
    <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-cyan-500/10 filter blur-[100px]" />
    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left space-y-3 z-10">
      <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 font-extrabold uppercase">Printopia Solutions</span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">{title}</h1>
      <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

// AppContent handles layout and routes, allowing access to useNavigate & useLocation
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormSubmitted, setQuoteFormSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Report Pad');
  
  // Product details modal state
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<ProductItem | null>(null);

  // Quotation form fields with Indian pre-sets for high-fidelity clinical B2B use
  const [hospitalName, setHospitalName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Local storage lists
  const [pastQuotes, setPastQuotes] = useState<any[]>([]);

  // Load past quotes on mount or when modal opens/submits
  useEffect(() => {
    let isMounted = true;
    fetchQuotationRequests().then((quotes) => {
      if (isMounted && Array.isArray(quotes)) {
        setPastQuotes(quotes);
      }
    }).catch(err => {
      console.warn('Error loading past quotes:', err);
    });
    return () => {
      isMounted = false;
    };
  }, [isQuoteModalOpen, quoteFormSubmitted]);

  // Lock body scroll when modals are active (Accessibility + UX)
  useEffect(() => {
    if (isQuoteModalOpen || selectedDetailProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isQuoteModalOpen, selectedDetailProduct]);

  // Keyboard accessibility handler (Escape key closes modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsQuoteModalOpen(false);
        setSelectedDetailProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRequestQuote = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    } else {
      setSelectedProduct('Report Pad');
    }
    setIsQuoteModalOpen(true);
    setQuoteFormSubmitted(false);
  };

  const handleViewDetails = (product: ProductItem) => {
    setSelectedDetailProduct(product);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError('');

    try {
      setIsSubmitting(true);

      await submitQuotationRequest({
        full_name: contactName,
        company_name: hospitalName || null,
        phone: phone,
        email: email || null,
        product_name: selectedProduct,
        estimated_quantity: quantity ? Number(quantity) : null,
        message: notes || null,
        source_page: window.location.pathname,
      });

      // Save to localStorage for durable persistent B2B logging
      const newQuote = {
        id: 'RFQ-' + Math.floor(Math.random() * 90000 + 10000),
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        hospitalName,
        contactName,
        email,
        phone,
        selectedProduct,
        quantity: quantity || 'Not specified',
        notes: notes || 'N/A'
      };

      const updated = [newQuote, ...pastQuotes];
      localStorage.setItem('printopia_quotations', JSON.stringify(updated));
      setPastQuotes(updated);

      setQuoteFormSubmitted(true);
      
      // Reset form
      setHospitalName('');
      setContactName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setQuantity('');
    } catch (error: any) {
      console.error("Quotation submission failed:", error);
      setSubmitError(
        error?.message || "We could not submit your quotation request. Please try again or call or WhatsApp us at +91 94324 36942."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-cyan-400">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify(SEO_SCHEMA)}
      </script>

      {/* 1. Header Navigation */}
      <Header onRequestQuote={() => handleRequestQuote()} />

      {/* 2. Routes Routing Layout */}
      <React.Suspense fallback={<PageSkeleton />}>
        <Routes>
          
          {/* HOME ROUTE */}
          <Route
            path="/"
            element={<HomePage onRequestQuote={handleRequestQuote} onViewDetails={handleViewDetails} />}
          />

          {/* PRODUCTS ROUTE */}
          <Route
            path="/products"
            element={<AllProductsPage onRequestQuote={handleRequestQuote} />}
          />
          <Route
            path="/products/:slug"
            element={<ProductDetailPage onRequestQuote={handleRequestQuote} />}
          />

          {/* INDUSTRIES ROUTES */}
          <Route
            path="/industries"
            element={<IndustriesPage onRequestQuote={handleRequestQuote} />}
          />
          <Route
            path="/industries/healthcare"
            element={<HealthcarePage onRequestQuote={handleRequestQuote} onViewDetails={handleViewDetails} />}
          />
          <Route
            path="/industries/:slug"
            element={<IndustryDetailPage onRequestQuote={handleRequestQuote} />}
          />

          {/* ABOUT ROUTE */}
          <Route
            path="/about"
            element={<AboutPage onRequestQuote={handleRequestQuote} />}
          />

          {/* PRINTING GUIDE ROUTE */}
          <Route
            path="/printing-guide"
            element={<PrintingGuidePage onRequestQuote={handleRequestQuote} />}
          />

          {/* CONTACT ROUTE */}
          <Route
            path="/contact"
            element={<ContactPage onRequestQuote={handleRequestQuote} />}
          />

        </Routes>
      </React.Suspense>

      {/* 5. Premium Corporate Footer */}
      <Footer onRequestQuote={() => handleRequestQuote()} />

      {/* 3. Product Details Modal */}
      <AnimatePresence>
        {selectedDetailProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetailProduct(null)}
              className="absolute inset-0 bg-neutral-950/45 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_35px_80px_rgba(0,0,0,0.22)] border border-neutral-100 overflow-hidden z-10 p-6 sm:p-10 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDetailProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-all duration-200 cursor-pointer focus:outline-none"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Technical Specifications Layout */}
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-cyan-600 font-bold uppercase">
                    Technical Specifications
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-neutral-900 tracking-tight mt-1">
                    {selectedDetailProduct.name} Manufacturing Options
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                    Our high-volume production lines are optimized for clinical durability and brand consistency. Below are our default manufacturing baselines.
                  </p>
                </div>

                {/* Spec Table */}
                <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-neutral-50/50 text-xs sm:text-sm">
                  <div className="grid grid-cols-3 gap-4 p-4 border-b border-neutral-100 text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-wider">
                    <div className="col-span-1">Parameters</div>
                    <div className="col-span-2">Standard Manufacturing Tolerances</div>
                  </div>

                  <div className="divide-y divide-neutral-100 text-xs text-neutral-700">
                    <div className="grid grid-cols-3 gap-4 p-4">
                      <div className="font-mono font-bold text-neutral-500 uppercase">Material Stocks</div>
                      <div className="col-span-2 font-medium">
                        {selectedDetailProduct.id === 1 && "Premium medical uncoated wood-free paper (80gsm - 100gsm)"}
                        {selectedDetailProduct.id === 2 && "Super-white high tensile kraft / cartridge paper (120gsm)"}
                        {selectedDetailProduct.id === 3 && "Rigid heavy-duty virgin board / imported kraft board (350gsm - 450gsm)"}
                        {selectedDetailProduct.id === 4 && "FSC-certified ribbed kraft paper or tear-resistant non-woven PP (140gsm+)"}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4">
                      <div className="font-mono font-bold text-neutral-500 uppercase">Print Calibrations</div>
                      <div className="col-span-2 font-medium">
                        Calibrated high-definition offset printing with anti-smudge environment-friendly soy-based inks.
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4">
                      <div className="font-mono font-bold text-neutral-500 uppercase">Finishes Available</div>
                      <div className="col-span-2 font-medium">
                        {selectedDetailProduct.id === 1 && "Header gumming, side-perf tearing lines, hard cardboard backing base"}
                        {selectedDetailProduct.id === 2 && "Acoustic matte window die-cuts, secure pressure-sensitive peel & seal flap"}
                        {selectedDetailProduct.id === 3 && "Creased folding spine, optional stainless steel clips, custom document slits"}
                        {selectedDetailProduct.id === 4 && "Reinforced side-gussets, solid block-bottom fold, rigid twisted loop handles"}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4">
                      <div className="font-mono font-bold text-neutral-500 uppercase">Minimum Order Run</div>
                      <div className="col-span-2 font-mono text-cyan-600 font-bold">
                        500 Units (With volume tiers up to 50,000+)
                      </div>
                    </div>
                  </div>
                </div>

                {/* B2B Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-neutral-800 shrink-0" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500">ISO 9001 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-neutral-800 shrink-0" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500">7-10 Days Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-neutral-800 shrink-0" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500">Free Press Proof</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={() => setSelectedDetailProduct(null)}
                    className="flex-1 py-3 bg-transparent border border-neutral-200 hover:border-neutral-800 text-neutral-700 hover:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer focus:outline-none"
                  >
                    Back to Catalog
                  </button>
                  <button
                    onClick={() => {
                      const prodName = selectedDetailProduct.name;
                      setSelectedDetailProduct(null);
                      handleRequestQuote(prodName);
                    }}
                    className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none"
                  >
                    Proceed with Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Premium Quotation Request Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.18)] border border-neutral-100 overflow-hidden z-10 p-7 sm:p-9 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-all duration-200 cursor-pointer focus:outline-none"
                aria-label="Close quote modal"
              >
                <X className="w-5 h-5" />
              </button>

              {quoteFormSubmitted ? (
                /* Submission Success Screen */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(16,185,129,0.3)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 tracking-tight">
                    Quotation Request Submitted
                  </h3>
                  <p className="text-sm text-neutral-500 mt-2 max-w-sm leading-relaxed text-center">
                    Thank you. Our team will review your requirements and contact you shortly.
                  </p>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <a
                      href="https://wa.me/919432436942"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold tracking-widest mt-8">
                    Printopia Solutions
                  </span>
                </motion.div>
              ) : (
                /* Form Screen */
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-cyan-600 font-bold uppercase">
                      B2B Manufacturing Quote
                    </span>
                    <h3 className="font-display text-2xl font-extrabold text-neutral-900 tracking-tight mt-1">
                      Request B2B Quotation
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Get custom pricing, basic design support, and delivery timelines directly from our engineering unit.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Hospital / Diagnostic Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                          Hospital or Centre Name
                        </label>
                        <input
                          type="text"
                          required
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
                          placeholder="e.g. Fortis Diagnostic Centre, Mumbai"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-medium text-neutral-900"
                        />
                      </div>

                      {/* Contact Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                          Contact Representative
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Rahul Sharma (Purchase Manager)"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="procure@manipalhospitals.com"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-medium text-neutral-900"
                        />
                      </div>

                      {/* Phone / Mobile */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Selected Product */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                          Select Product Class
                        </label>
                        <select
                          value={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-medium text-neutral-900"
                        >
                          <option value="Report Pad">Report Pad Printing</option>
                          <option value="Lab Envelope">Lab Envelope Printing</option>
                          <option value="OPD File">OPD File Manufacturing</option>
                          <option value="Hospital Bags">Hospital Carry Bags</option>
                        </select>
                      </div>

                      {/* Required Run Quantity */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                          Estimated Quantity
                        </label>
                        <input
                          type="number"
                          name="estimatedQuantity"
                          required
                          min="1"
                          step="1"
                          inputMode="numeric"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="Enter required quantity"
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    {/* Notes & Special Finishes */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                          Specifications / Finish Preferences
                        </label>
                        <span className="text-[9px] font-mono text-neutral-400">Optional</span>
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Matte finish, pocket size for OPD files, PP vs paper handles, window requirement for envelopes..."
                        rows={3}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/80 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-medium text-neutral-900 resize-none"
                      />
                    </div>

                    {/* Attachment simulator */}
                    <div className="flex items-center space-x-2.5 p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs text-neutral-500 font-medium">
                      <Paperclip className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>Attach design guidelines or layout PDF (File upload will be enabled after backend integration)</span>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="modal-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 ${isSubmitting ? 'bg-neutral-400' : 'bg-neutral-900 hover:bg-neutral-800'} text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-all flex items-center justify-center space-x-2 cursor-pointer focus:outline-none`}
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>{isSubmitting ? 'Submitting...' : 'Generate Manufacturing Proposal'}</span>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Default export wraps AppContent in BrowserRouter for correct Router navigation contexts
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
