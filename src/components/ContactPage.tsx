import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Phone, Mail, MapPin, Clock, Globe, MessageSquare, 
  ChevronDown, ShieldCheck, Building2, Factory, Headphones, Zap, 
  PackageCheck, HeartPulse, ExternalLink, AlertCircle, Check, Send,
  Sparkles
} from 'lucide-react';
import { images } from '../data/imageMap';
import { submitQuotationRequest } from '../services/quotationService';

interface ContactPageProps {
  onRequestQuote: (productName?: string) => void;
}

const WHATSAPP_NUMBER = "919432436942";
const WHATSAPP_PREFILLED_MSG = "Hello Printopia Solutions, I would like to discuss a healthcare printing requirement.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED_MSG)}`;

export default function ContactPage({ onRequestQuote }: ContactPageProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    organization: '',
    mobile: '',
    email: '',
    customerType: '',
    product: '',
    estimatedQuantity: '',
    city: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Store previous metadata to restore on unmount
    const previousTitle = document.title;

    // Set page title
    document.title = "Contact Printopia Solutions | Healthcare Printing Company Kolkata";

    const updateOrCreateMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      const prevContent = element?.getAttribute('content') || null;
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
      return { element, prevContent };
    };

    const updateOrCreateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      const prevHref = link?.getAttribute('href') || null;
      if (link) {
        link.setAttribute('href', href);
      } else {
        link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        document.head.appendChild(link);
      }
      return { link, prevHref };
    };

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://printopia.in';
    const contactUrl = `${origin}/contact`;
    const descContent = "Contact Printopia Solutions for hospital, diagnostic centre and healthcare printing services in Kolkata, including report pads, lab envelopes, OPD files and custom medical stationery.";

    const metaDesc = updateOrCreateMeta('meta[name="description"]', 'name', 'description', descContent);
    const ogTitle = updateOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', "Contact Printopia Solutions | Healthcare Printing Company Kolkata");
    const ogDesc = updateOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', descContent);
    const ogUrl = updateOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', contactUrl);
    const canonicalLink = updateOrCreateLink('canonical', contactUrl);

    // Scroll to top
    window.scrollTo({ top: 0 });

    return () => {
      // Restore previous metadata when leaving page
      document.title = previousTitle;
      if (metaDesc.prevContent !== null) metaDesc.element?.setAttribute('content', metaDesc.prevContent);
      if (ogTitle.prevContent !== null) ogTitle.element?.setAttribute('content', ogTitle.prevContent);
      if (ogDesc.prevContent !== null) ogDesc.element?.setAttribute('content', ogDesc.prevContent);
      if (ogUrl.prevContent !== null) ogUrl.element?.setAttribute('content', ogUrl.prevContent);
      if (canonicalLink.prevHref !== null) canonicalLink.link?.setAttribute('href', canonicalLink.prevHref);
    };
  }, []);

  const contactInfo = [
    {
      title: "Registered Office",
      content: "Ghoshpur, South Garia, South 24 Parganas, West Bengal – 743613",
      icon: <Building2 className="w-5 h-5 text-[#0C3855]" />
    },
    {
      title: "Manufacturing Unit",
      content: "Langalberia, Dakshin Gobindapur, Kolkata – 700145",
      icon: <Factory className="w-5 h-5 text-[#0C3855]" />
    },
    {
      title: "Kolkata Office",
      content: "362/5 Kalitala Road, Purbachal, Kolkata – 700078",
      icon: <MapPin className="w-5 h-5 text-[#0C3855]" />
    }
  ];

  const businessInfo = [
    {
      title: "Office Phone",
      phones: [
        { label: "+91 94324 36942", href: "tel:+919432436942" }
      ],
      icon: <Phone className="w-5 h-5 text-[#0C3855]" />
    },
    {
      title: "Email Address",
      content: "solutionsprintopia@gmail.com",
      link: "mailto:solutionsprintopia@gmail.com",
      icon: <Mail className="w-5 h-5 text-[#0C3855]" />
    },
    {
      title: "Website",
      content: "www.printopia.in",
      link: "https://printopia.in",
      icon: <Globe className="w-5 h-5 text-[#0C3855]" />
    },
    {
      title: "Business Hours",
      content: "Mon – Sat: 10:00 AM – 7:00 PM, Sun: Closed",
      icon: <Clock className="w-5 h-5 text-[#0C3855]" />
    }
  ];

  const whyChooseItems = [
    {
      title: "Healthcare Printing Experts",
      desc: "Specialized knowledge of clinical standards and hospital documentation workflows.",
      icon: <HeartPulse className="w-6 h-6" />
    },
    {
      title: "Fast Quotation",
      desc: "Prompt quotation assistance for your healthcare printing requirements.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Custom Manufacturing",
      desc: "Complete flexibility in paper selection, GSM, dimensions, and layout customization.",
      icon: <Factory className="w-6 h-6" />
    },
    {
      title: "Bulk Orders",
      desc: "Bulk and recurring order support for hospitals and diagnostic chains.",
      icon: <PackageCheck className="w-6 h-6" />
    },
    {
      title: "Reliable Delivery",
      desc: "Delivery coordination based on destination to ensure your products reach you safely.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Dedicated Support",
      desc: "Friendly design and procurement help desks to assist you at every step of the order.",
      icon: <Headphones className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: "How quickly can I receive a quotation?",
      answer: "Quotation preparation time depends on the product, quantity and specifications. Our team will respond as soon as possible after receiving complete requirements."
    },
    {
      question: "Can I order custom sizes for OPD files and report pads?",
      answer: "Yes, being a direct manufacturer, we can produce printing products in any custom dimension you require. Just specify the height and width in your enquiry."
    },
    {
      question: "Do you support bulk hospital orders?",
      answer: "Absolutely. We provide bulk and recurring order support for hospitals and diagnostic chains. Please share your requirements for a custom proposal."
    },
    {
      question: "Can I send my own artwork or logo for printing?",
      answer: "Yes, you can share your digital artwork in PDF, AI, or CorelDraw format. Our pre-press team will verify it for technical alignment before production."
    },
    {
      question: "Do you deliver outside Kolkata?",
      answer: "Delivery availability and charges depend on the order quantity and destination. Please share your delivery location for confirmation."
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!formState.organization.trim()) {
      newErrors.organization = 'Organisation Name is required';
    }

    const cleanMobile = formState.mobile.replace(/\D/g, '');
    if (!formState.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (cleanMobile.length !== 10) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (formState.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formState.customerType) {
      newErrors.customerType = 'Customer Type is required';
    }

    if (!formState.product) {
      newErrors.product = 'Product Requirement is required';
    }

    if (!formState.estimatedQuantity) {
      newErrors.estimatedQuantity = 'Estimated Quantity is required';
    } else {
      const qty = Number(formState.estimatedQuantity);
      if (isNaN(qty) || qty < 1) {
        newErrors.estimatedQuantity = 'Estimated quantity must be at least 1';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'estimatedQuantity') {
      // Do not allow negative values or decimal points if typing
      if (value !== '' && (parseInt(value, 10) < 1 || isNaN(parseInt(value, 10)))) {
        setFormState(prev => ({ ...prev, estimatedQuantity: '' }));
        return;
      }
    }

    setFormState(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (validateForm()) {
      setSubmitError('');
      
      try {
        setIsSubmitting(true);

        const fullMessage = [
          formState.customerType ? `Customer Type: ${formState.customerType}` : null,
          formState.city ? `City: ${formState.city}` : null,
          formState.message ? `Message: ${formState.message}` : null,
        ].filter(Boolean).join('\n');

        await submitQuotationRequest({
          full_name: formState.name,
          company_name: formState.organization || null,
          phone: formState.mobile,
          email: formState.email || null,
          product_name: formState.product,
          estimated_quantity: formState.estimatedQuantity ? Number(formState.estimatedQuantity) : null,
          message: fullMessage || null,
          source_page: typeof window !== 'undefined' ? window.location.pathname : '/contact',
        });

        setIsSubmitted(true);
        setFormState({
          name: '',
          organization: '',
          mobile: '',
          email: '',
          customerType: '',
          product: '',
          estimatedQuantity: '',
          city: '',
          message: ''
        });
      } catch (error: any) {
        console.error("Quotation submission failed:", error);
        setSubmitError(
          error?.message || "We could not submit your quotation request. Please try again or call/WhatsApp us at +91 94324 36942."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div id="contact-page" className="w-full bg-white pt-24 sm:pt-28 font-sans overflow-hidden">
      
      {/* SECTION 1: Breadcrumb and Structured Schemas */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": typeof window !== 'undefined' ? window.location.origin : "https://printopia.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Contact Us",
              "item": `${typeof window !== 'undefined' ? window.location.origin : "https://printopia.in"}/contact`
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Printopia Solutions",
          "url": typeof window !== 'undefined' ? window.location.origin : "https://printopia.in",
          "logo": `${typeof window !== 'undefined' ? window.location.origin : "https://printopia.in"}${images.logo}`,
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+91-9432436942",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": "en"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "362/5 Kalitala Road, Purbachal",
            "addressLocality": "Kolkata",
            "postalCode": "700078",
            "addressCountry": "IN"
          }
        })}
      </script>

      {/* SECTION 2: Hero Section with Background Video */}
      <header className="relative w-full overflow-hidden bg-[#0C3855] text-white">
        {/* Full-width Video Container */}
        <div className="relative w-full py-12 sm:py-16 md:py-20 lg:py-16 lg:min-h-[420px] flex items-center overflow-hidden">
          
          {/* Fallback solid color background */}
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

          {/* Dark Blue Overlay (rgba(12, 56, 85, 0.60) / 60% opacity dark blue for max text legibility) */}
          <div className="absolute inset-0 bg-[#0C3855]/60 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3855]/85 via-[#0C3855]/70 to-[#0C3855]/50 z-10 pointer-events-none" />

          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0C7D8D]/20 rounded-full filter blur-[100px] pointer-events-none z-10" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-20 space-y-6">
            
            {/* Breadcrumbs inside Hero Header */}
            <nav aria-label="Breadcrumb" className="pb-2">
              <ol className="flex items-center space-x-2 text-xs font-semibold text-[#BED7EB]">
                <li>
                  <Link to="/" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-1 py-0.5">
                    Home
                  </Link>
                </li>
                <li className="select-none text-[#BED7EB]/60">/</li>
                <li className="text-white font-bold" aria-current="page">
                  Contact Us
                </li>
              </ol>
            </nav>

            {/* Two-Column Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Small Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#BED7EB]/15 border border-[#BED7EB]/30 backdrop-blur-md text-[#BED7EB] text-[11px] font-mono tracking-[0.2em] font-extrabold uppercase shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#BED7EB] shrink-0" />
                    <span>CONTACT PRINTOPIA SOLUTIONS</span>
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase drop-shadow-sm"
                >
                  Let's Discuss Your Healthcare Printing Requirements
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-sm sm:text-base md:text-lg text-[#BED7EB] leading-relaxed max-w-2xl font-medium"
                >
                  Partner with Printopia Solutions for premium healthcare printing products including Report Pads, Lab Envelopes, OPD Files, Prescription Pads and custom hospital stationery.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-4 pt-1"
                >
                  <button
                    onClick={() => onRequestQuote()}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#0C7D8D] hover:bg-[#09606c] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C7D8D]"
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </motion.div>

                {/* Four Compact Trust Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3"
                >
                  {[
                    "Healthcare Printing Specialists",
                    "Custom Manufacturing",
                    "Fast Response",
                    "GST Billing"
                  ].map((badge, bIdx) => (
                    <div 
                      key={bIdx}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-semibold text-[#BED7EB] shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </motion.div>

              </div>

              {/* Right Column: Premium Floating Glass Panel */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{ 
                    opacity: { duration: 0.7, delay: 0.2 },
                    scale: { duration: 0.7, delay: 0.2 },
                    y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                  }}
                  className="relative w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 text-white overflow-hidden"
                >
                  {/* Inner ambient glow */}
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#0C7D8D]/30 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-1 relative z-10">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#BED7EB] uppercase font-bold block">
                      PRINTOPIA PROMISE
                    </span>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      Why Partner With Us
                    </h2>
                  </div>

                  <div className="space-y-4 relative z-10">
                    {[
                      "Healthcare Printing Experts",
                      "Fast Quotation Support",
                      "High Quality Offset Printing",
                      "Trusted by Hospitals & Diagnostic Centres"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-white/95 leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        </div>

        {/* Slim Bottom Information Strip */}
        <div className="relative bg-[#08263B] border-y border-white/10 py-3.5 sm:py-4 text-white z-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-bold tracking-wide">
            {[
              "Healthcare Printing",
              "Custom Manufacturing",
              "Quick Response",
              "Premium Quality"
            ].map((item, sIdx) => (
              <div key={sIdx} className="flex items-center space-x-2 text-[#BED7EB] hover:text-white transition-colors">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="uppercase text-[11px] sm:text-xs tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </header>

      {/* SECTION 3: Office Locations & Contact Information */}
      <section className="relative bg-gradient-to-br from-[#F8FCFF] to-[#EDF7FB] border-b border-blue-100/70 py-16 md:py-24 text-left overflow-hidden" aria-labelledby="contact-info-heading">
        {/* Subtle halftone printing dot pattern (2.5% opacity) */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0c3855_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 z-10">
          <div className="text-center space-y-3">
            <h2 id="contact-info-heading" className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
              Our Locations & Contact
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-blue-100/80 shadow-xs hover:border-[#0C3855]/30 hover:shadow-md transition-all duration-300 flex flex-col space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#0C3855]/5 text-[#0C3855] flex items-center justify-center border border-[#0C3855]/10">
                  {info.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-neutral-950 tracking-tight uppercase">
                    {info.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {info.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Contact Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {businessInfo.map((info, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-blue-100/80 shadow-xs flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0C3855]/5 text-[#0C3855] flex items-center justify-center border border-[#0C3855]/10 shadow-xs">
                    {info.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    {info.title}
                  </span>
                </div>
                {info.phones ? (
                  <div className="flex flex-col space-y-1">
                    {info.phones.map((p, pIdx) => (
                      <a 
                        key={pIdx}
                        href={p.href} 
                        className="text-sm font-bold text-[#0C3855] hover:text-blue-700 transition-colors inline-flex items-center"
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                ) : info.link ? (
                  <a 
                    href={info.link} 
                    className="text-sm font-bold text-[#0C3855] hover:text-blue-700 transition-colors inline-flex items-center"
                  >
                    {info.content}
                    {info.title === "Website" && <ExternalLink className="w-3 h-3 ml-1" />}
                  </a>
                ) : (
                  <span className="text-sm font-bold text-neutral-800">
                    {info.content}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Contact Form Section */}
      <section className="relative bg-[#F5FAFD] py-14 md:py-20 border-y border-blue-100/80 text-left overflow-hidden" aria-labelledby="enquiry-heading">
        {/* Subtle printing diagonal pattern (2% opacity) */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(135deg,#0c3855_10%,transparent_10%)] bg-[size:16px_16px]" />
        
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
          
          {/* Form Status Live Region */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {submitError && `Form submission error: ${submitError}`}
            {isSubmitted && 'Your enquiry was submitted successfully.'}
          </div>

          <div className="space-y-8">
            
            {/* Form Title & Subtitle */}
            <div className="text-center space-y-3">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                GET A FAST QUOTATION
              </span>
              <h2 id="enquiry-heading" className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-neutral-950 tracking-tight uppercase">
                Send an Enquiry
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Fill out the form below and our institutional sales team will get back to you with a professional quotation and product samples.
              </p>
              <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
            </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-10 rounded-3xl border border-blue-100 shadow-sm text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-neutral-950">Enquiry Request Submitted</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      Thank you. Our team will review your requirements and contact you shortly.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-[#0C3855] uppercase tracking-widest hover:underline cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                  
                  {submitError && (
                    <div role="alert" className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-2.5 text-red-600 text-[11px] font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Name & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:outline-none transition-all ${errors.name ? 'border-red-300 ring-1 ring-red-100' : 'border-neutral-200 focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20'}`}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="organization" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Organisation Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="organization"
                        name="organization"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.organization}
                        aria-describedby={errors.organization ? "organization-error" : undefined}
                        value={formState.organization}
                        onChange={handleInputChange}
                        placeholder="Hospital, clinic or company name"
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:outline-none transition-all ${errors.organization ? 'border-red-300 ring-1 ring-red-100' : 'border-neutral-200 focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20'}`}
                      />
                      {errors.organization && (
                        <p id="organization-error" role="alert" className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" /> {errors.organization}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="mobile" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="tel" 
                        id="mobile"
                        name="mobile"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.mobile}
                        aria-describedby={errors.mobile ? "mobile-error" : undefined}
                        value={formState.mobile}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:outline-none transition-all ${errors.mobile ? 'border-red-300 ring-1 ring-red-100' : 'border-neutral-200 focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20'}`}
                      />
                      {errors.mobile && (
                        <p id="mobile-error" role="alert" className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" /> {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:outline-none transition-all ${errors.email ? 'border-red-300 ring-1 ring-red-100' : 'border-neutral-200 focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20'}`}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Customer Type & Product Requirement */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="customerType" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Customer Type <span className="text-red-500">*</span>
                      </label>
                      <select 
                        id="customerType"
                        name="customerType"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.customerType}
                        aria-describedby={errors.customerType ? "customerType-error" : undefined}
                        value={formState.customerType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:outline-none transition-all cursor-pointer ${errors.customerType ? 'border-red-300 ring-1 ring-red-100' : 'border-neutral-200 focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20'}`}
                      >
                        <option value="">Select Customer Type</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Diagnostic Centre">Diagnostic Centre</option>
                        <option value="Clinic">Clinic</option>
                        <option value="Pathology Laboratory">Pathology Laboratory</option>
                        <option value="Nursing Home">Nursing Home</option>
                        <option value="Healthcare Company">Healthcare Company</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.customerType && (
                        <p id="customerType-error" role="alert" className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" /> {errors.customerType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="product" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Product Requirement <span className="text-red-500">*</span>
                      </label>
                      <select 
                        id="product"
                        name="product"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.product}
                        aria-describedby={errors.product ? "product-error" : undefined}
                        value={formState.product}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:outline-none transition-all cursor-pointer ${errors.product ? 'border-red-300 ring-1 ring-red-100' : 'border-neutral-200 focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20'}`}
                      >
                        <option value="">Select a product</option>
                        <option value="Report Pad">Report Pad</option>
                        <option value="Lab Envelope">Lab Envelope</option>
                        <option value="OPD File">OPD File</option>
                        <option value="Prescription Pad">Prescription Pad</option>
                        <option value="Test Report Folder">Test Report Folder</option>
                        <option value="Patient ID Band">Patient ID Band</option>
                        <option value="Hospital Bag">Hospital Bag</option>
                        <option value="Other Printing Item">Other Printing Item</option>
                        <option value="Multiple Products">Multiple Products</option>
                      </select>
                      {errors.product && (
                        <p id="product-error" role="alert" className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" /> {errors.product}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Estimated Quantity & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="estimatedQuantity" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        Estimated Quantity <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        id="estimatedQuantity"
                        name="estimatedQuantity"
                        min="1"
                        step="1"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.estimatedQuantity}
                        aria-describedby={errors.estimatedQuantity ? "estimatedQuantity-error" : undefined}
                        value={formState.estimatedQuantity}
                        onChange={handleInputChange}
                        placeholder="e.g. 500"
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:outline-none transition-all ${errors.estimatedQuantity ? 'border-red-300 ring-1 ring-red-100' : 'border-neutral-200 focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20'}`}
                      />
                      {errors.estimatedQuantity && (
                        <p id="estimatedQuantity-error" role="alert" className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" /> {errors.estimatedQuantity}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="city" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                        City / Location
                      </label>
                      <input 
                        type="text" 
                        id="city"
                        name="city"
                        value={formState.city}
                        onChange={handleInputChange}
                        placeholder="Your city (e.g. Kolkata)"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-widest ml-1">
                      Message / Requirements
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your specifications (paper GSM, dimensions, custom logo printing, etc.)"
                      rows={3}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 bg-[#0C3855] hover:bg-blue-800 disabled:bg-neutral-300 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 focus-visible:outline-none cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>SEND ENQUIRY</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <a 
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 focus-visible:outline-none cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>

                </form>
              )}
          </div>
        </div>
      </section>

      {/* SECTION 5: Why Contact Printopia */}
      <section className="relative bg-white py-16 md:py-24 text-left overflow-hidden" aria-labelledby="why-contact-heading">
        {/* Subtle dot grid pattern (2% opacity) */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0c3855_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 z-10">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
              INSTITUTIONAL PARTNERSHIP
            </span>
            <h2 id="why-contact-heading" className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
              Why Contact Printopia
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#F8FCFF]/80 p-8 rounded-3xl border border-blue-100/70 hover:border-[#0C3855]/30 hover:shadow-md transition-all duration-300 flex flex-col space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0C3855]/5 text-[#0C3855] flex items-center justify-center border border-[#0C3855]/10">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-display font-bold text-neutral-950 tracking-tight uppercase leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Frequently Asked Questions */}
      <section className="relative bg-white py-16 md:py-24 border-t border-slate-100 text-left overflow-hidden" aria-labelledby="faq-title">
        {/* Subtle printing grid pattern (1.5% opacity) */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#0c3855_1px,transparent_1px),linear-gradient(to_bottom,#0c3855_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative max-w-4xl mx-auto px-6 space-y-10 z-10">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
              QUICK ANSWERS
            </span>
            <h2 id="faq-title" className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight uppercase">
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
                  className="bg-[#F8FCFF]/60 rounded-2xl border border-blue-100/80 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer focus-visible:outline-none"
                    aria-expanded={isOpen}
                    id={`faq-btn-${idx}`}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight uppercase">
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
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-500 leading-relaxed border-t border-blue-100/60">
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

      {/* SECTION 7: Final CTA */}
      <section className="relative bg-[#0C3855] text-white py-16 md:py-24 text-center md:text-left overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          <div className="lg:col-span-8 space-y-6">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-mono tracking-widest uppercase font-bold text-cyan-300">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Free Consultation</span>
            </span>
            <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight uppercase">
              Let's Discuss Your Printing Requirement
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed">
              Our team is ready to help you choose the right paper, GSM, printing specifications and quantities for your healthcare organization. No project is too small or too large for our dedicated manufacturing lines.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <button
              onClick={() => onRequestQuote()}
              className="px-6 py-4 bg-white text-[#0C3855] hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 focus-visible:outline-none cursor-pointer"
            >
              <span>Request a Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 focus-visible:outline-none"
            >
              <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+919432436942"
              className="px-6 py-4 border border-white/30 hover:border-white text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 focus-visible:outline-none"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
