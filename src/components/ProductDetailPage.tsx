import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, CheckCircle, Clock, Sparkles, PhoneCall, AlertTriangle, 
  MessageSquare, ArrowRight, ChevronRight, Check, ChevronDown,
  Building, User, Mail, MapPin, Layers, AlertCircle,
  ZoomIn, ZoomOut, Maximize2, X, RotateCcw, ChevronLeft
} from 'lucide-react';
import { PRODUCTS_DATA, ProductData } from '../data/productsData';
import { ALL_PRODUCTS } from './AllProductsPage';
import { submitQuotationRequest } from '../services/quotationService';

function getDynamicProductData(slugKey: string): ProductData | undefined {
  const match = ALL_PRODUCTS.find((p) => p.slug === slugKey);
  if (!match) return undefined;

  const primaryCat = Array.isArray(match.categories) && match.categories.length > 0 ? match.categories[0] : match.category;

  return {
    slug: match.slug,
    name: match.name,
    h1: `${match.name} Printing`,
    category: primaryCat,
    seoTitle: `${match.name} Printing Services | Printopia Solutions`,
    metaDescription: `High-quality ${match.name.toLowerCase()} printing solutions for ${primaryCat.toLowerCase()} institutions and businesses by Printopia Solutions. Custom sizes, paper options, and bulk pricing.`,
    image: match.image,
    altText: match.altText || `${match.name} Printing`,
    eyebrow: `CUSTOM ${primaryCat.toUpperCase()} PRINTING`,
    description: match.description,
    trustNote: "Custom Specifications • Premium Quality • Bulk Turnaround",
    productOverview: `${match.name} solutions manufactured by Printopia Solutions according to your custom size, paper stock, GSM, printing side, finishing, and volume requirements. Ideal for ${primaryCat.toLowerCase()} and commercial operations.`,
    suitableFor: [
      `${primaryCat} Organizations`,
      "Commercial Enterprises",
      "Institutional Clients",
      "Corporate Office Operations",
      "High-Volume Retail & B2B"
    ],
    features: [
      { title: "Custom Dimensions", description: "Produced precisely according to your required finished size and format." },
      { title: "Premium Paper Stocks", description: "Choose from coated art paper, executive bond, textured cards, or synthetic media." },
      { title: "Vivid Color Printing", description: "High-definition offset and digital printing for crisp text and vivid graphics." },
      { title: "Custom Finishing Options", description: "Matt/gloss lamination, foil stamping, embossing, die-cutting, or perforation." },
      { title: "Institutional Branding", description: "Seamless integration of your brand logo, corporate identity, and layout specifications." },
      { title: "Bulk Volume Discounts", description: "Economical pricing structured for high-capacity institutional and commercial orders." }
    ],
    specifications: {
      productName: match.name,
      commonSizes: "Standard sizes & Custom dimensions",
      paperTypes: "Executive Bond, Gloss/Matte Art Paper, Maplitho, PVC / Card Stock",
      gsmOptions: "80 GSM, 100 GSM, 130 GSM, 250 GSM, 300 GSM, 350 GSM",
      printing: "Single-sided / Double-sided full color or spot color print",
      finishing: "Lamination, Die-cutting, Perforation, Numbering, Pad/Book binding",
      quantity: "Flexible min. order quantities & bulk B2B production"
    },
    customizationList: [
      "Custom logo and brand color matching",
      "Tailored dimensions and folding layouts",
      "Multiple GSM and stock selections",
      "Specialty metallic foil or spot UV accents",
      "Sequential numbering and barcode/QR printing",
      "Custom inner pages and grid formats"
    ],
    customizationSupportCopy: "Share your specifications, artwork, or sample requirements. Our print specialists will assist in setting up your production layout.",
    faqItems: [
      { question: `What are the minimum order quantities for ${match.name}?`, answer: `We offer flexible order quantities suitable for both trial batches and large bulk B2B production runs.` },
      { question: `Can we customize the paper type and GSM for ${match.name}?`, answer: `Yes, we provide a wide selection of paper types and GSM weights to match your exact institutional standards.` },
      { question: `How long does production take for ${match.name}?`, answer: `Standard turnaround is typically 3 to 5 business days following final artwork approval, with express options available.` },
      { question: `How do I request a custom price quote?`, answer: `Submit your required specifications via our online quotation form or WhatsApp us directly for an immediate estimate.` }
    ]
  };
}

interface ProductDetailPageProps {
  onRequestQuote: (productName?: string) => void;
}

export default function ProductDetailPage({ onRequestQuote }: ProductDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formError, setFormError] = useState("");

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  // Close lightbox on ESC key & lock body scrolling
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  // Reset zoom & pan when lightbox opens or closes
  useEffect(() => {
    if (isLightboxOpen) {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [isLightboxOpen]);

  // Retrieve current product based on slug
  const productKey = slug || "report-pad";
  const product: ProductData | undefined = PRODUCTS_DATA[productKey] || getDynamicProductData(productKey);

  // If the product is not found, we redirect or show a premium 404 block
  useEffect(() => {
    if (!product) {
      document.title = "Product Not Found | Printopia Solutions";
      return;
    }

    // Dynamic SEO Metadata updates
    document.title = product.seoTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', product.metaDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = product.metaDescription;
      document.head.appendChild(meta);
    }

    // Scroll to top on mount / change
    window.scrollTo({ top: 0 });
  }, [product, slug]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    mobile: "",
    email: "",
    city: "",
    size: "Standard",
    paperType: "Premium Standard",
    gsm: "Standard Choice",
    quantity: "",
    printingSide: "Single Side",
    additional: ""
  });

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      const defaultSize = product.specifications.commonSizes.split(',')[0]?.trim() || "Standard";
      const defaultPaper = product.specifications.paperTypes.split(',')[0]?.trim() || "Standard Paper";
      const defaultGsm = product.specifications.gsmOptions.split(',')[0]?.trim() || "Standard GSM";
      
      setFormData({
        name: "",
        organization: "",
        mobile: "",
        email: "",
        city: "",
        size: defaultSize,
        paperType: defaultPaper,
        gsm: defaultGsm,
        quantity: "",
        printingSide: "Single Side",
        additional: ""
      });
      setOpenFaqIndex(null);
      setFormError("");
      setFormSuccess(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div id="product-not-found" className="min-h-[80vh] pt-32 pb-20 bg-white text-neutral-900 flex items-center font-sans">
        <div className="max-w-xl mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-display font-black tracking-tight text-neutral-900">
            Product Not Found
          </h1>
          <p className="text-sm text-neutral-500 leading-relaxed">
            The requested printing product is not available or has been moved.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#0C3855] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-800 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError("");
    setSubmitError("");
    setFormSuccess(false);

    // Validation
    if (!formData.name.trim()) {
      setFormError("Name is required.");
      return;
    }
    if (!formData.organization.trim()) {
      setFormError("Organization Name is required.");
      return;
    }
    if (!formData.mobile.trim()) {
      setFormError("Mobile Number is required.");
      return;
    }
    if (!formData.quantity.trim()) {
      setFormError("Quantity is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const messageContent = `Size: ${formData.size}\nPaper: ${formData.paperType}\nGSM: ${formData.gsm}\nPrinting: ${formData.printingSide}\nCity: ${formData.city || 'N/A'}\nAdditional: ${formData.additional || 'None'}`;

      await submitQuotationRequest({
        full_name: formData.name,
        company_name: formData.organization || null,
        phone: formData.mobile,
        email: formData.email || null,
        product_name: product.name,
        estimated_quantity: formData.quantity ? Number(formData.quantity) : null,
        message: messageContent,
        source_page: window.location.pathname,
      });

      setFormSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        organization: "",
        mobile: "",
        email: "",
        city: "",
        size: product.specifications.commonSizes.split(',')[0].trim(),
        paperType: product.specifications.paperTypes.split(',')[0].trim(),
        gsm: product.specifications.gsmOptions.split(',')[0].trim(),
        quantity: "",
        printingSide: "Single Side",
        additional: "",
      });
    } catch (error: any) {
      console.error("Quotation submission failed:", error);
      setSubmitError(
        error?.message || "We could not submit your enquiry. Please try again or call or WhatsApp us at +91 94324 36942."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToQuotation = () => {
    const element = document.getElementById("product-quotation-form");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamically select related products from all other available products (exactly 4)
  const allOtherProducts = Object.values(PRODUCTS_DATA).filter(p => p.slug !== product.slug);
  const relatedProducts = allOtherProducts.slice(0, 4);

  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <div id={`product-detail-page-${product.slug}`} className="w-full bg-white pt-24 sm:pt-28 pb-16 font-sans overflow-hidden">
      
      {/* Structured Schema Markup (JSON-LD) */}
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
              "name": "Products",
              "item": `${typeof window !== 'undefined' ? window.location.origin : 'https://printopia.in'}/all-products`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": product.name,
              "item": typeof window !== 'undefined' ? window.location.href : `https://printopia.in/product/${product.slug}`
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": `${typeof window !== 'undefined' ? window.location.origin : 'https://printopia.in'}${product.image}`,
          "description": product.description,
          "category": product.category,
          "brand": {
            "@type": "Brand",
            "name": "Printopia Solutions"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": product.faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      {/* Section 1: Breadcrumb */}
      <nav 
        aria-label="Breadcrumb" 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 border-b border-neutral-100"
      >
        <ol className="flex flex-wrap items-center space-x-2 text-xs sm:text-sm font-semibold text-neutral-400">
          <li>
            <Link to="/" className="hover:text-[#0C3855] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0C3855] rounded px-1 py-0.5">
              Home
            </Link>
          </li>
          <li className="select-none text-neutral-300">/</li>
          <li>
            <Link to="/products" className="hover:text-[#0C3855] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0C3855] rounded px-1 py-0.5">
              Products
            </Link>
          </li>
          <li className="select-none text-neutral-300">/</li>
          <li className="text-[#0C3855] font-bold" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Section 2: Product Hero */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20" aria-label="Product Hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Product Image Gallery */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Enlarge image of ${product.name}`}
            className="lg:col-span-5 relative bg-neutral-100 border border-neutral-200/50 rounded-3xl overflow-hidden h-[350px] sm:h-[460px] lg:h-[560px] w-full flex items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3855]"
          >
            <img
              src={product.image}
              alt={product.altText}
              width={800}
              height={600}
              className="w-full h-full object-cover object-center rounded-3xl select-none group-hover:scale-[1.03] transition-transform duration-500"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23a1a1aa">Printopia Solutions</text></svg>';
                console.warn("Missing image:", e.currentTarget.src);
              }}
            />
            <div className="absolute bottom-4 right-4 bg-neutral-900/80 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all shadow-xl pointer-events-none border border-white/20">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Click to enlarge</span>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#0C3855] font-extrabold uppercase block">
                {product.eyebrow}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-neutral-950 tracking-tight leading-none">
                {product.h1}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
                {product.description}
              </p>
            </div>

            {/* CTA buttons row */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
              <button
                onClick={handleScrollToQuotation}
                className="px-6 py-3.5 bg-[#0C3855] hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C3855]"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/919432436942?text=${encodeURIComponent(`Hello Printopia Solutions, I am interested in ordering custom medical ${product.name}. Please share specifications and options.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
              >
                <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:+919432436942"
                className="px-6 py-3.5 border border-neutral-300 hover:border-neutral-800 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Trust note */}
            <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-[#0C3855] font-bold uppercase tracking-wider">
              {product.trustNote.split('•').map((note, noteIdx, noteArr) => (
                <React.Fragment key={noteIdx}>
                  <span>{note.trim()}</span>
                  {noteIdx < noteArr.length - 1 && <span className="text-neutral-300">•</span>}
                </React.Fragment>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Section 3: Product Overview */}
      <section className="bg-neutral-50/50 border-y border-neutral-100 py-16" aria-label="Product Overview">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight">
                Custom {product.name} for Healthcare Organizations
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {product.productOverview}
              </p>
            </div>

            {/* High-contrast highlight panel */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-sm space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-[#0C3855] font-bold uppercase block border-b border-neutral-100 pb-2">
                SUITABLE FOR
              </span>
              <ul className="space-y-2.5 text-sm font-semibold text-neutral-800">
                {product.suitableFor.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C3855]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Key Features */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24" aria-labelledby="features-heading">
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 
              id="features-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              {product.name} Features
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {product.features.map((feat, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-neutral-200/60 hover:border-neutral-300 transition-colors shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0C3855]/5 text-[#0C3855] font-mono text-xs font-bold flex items-center justify-center border border-[#0C3855]/10">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-display font-bold text-neutral-900 tracking-tight leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Available Specifications */}
      <section className="bg-neutral-50/50 py-16 border-y border-neutral-100" aria-labelledby="specs-heading">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <h2 
                id="specs-heading" 
                className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
              >
                Available Specifications
              </h2>
              <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden text-left">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-mono font-bold text-neutral-600 uppercase tracking-wider">
                      <th className="p-4 sm:p-5">Specification</th>
                      <th className="p-4 sm:p-5">Available Details</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-neutral-100">
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-neutral-900">Product</td>
                      <td className="p-4 sm:p-5 text-neutral-600">{product.specifications.productName}</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-neutral-900">Common Sizes</td>
                      <td className="p-4 sm:p-5 text-neutral-600">{product.specifications.commonSizes}</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-neutral-900">Paper Types</td>
                      <td className="p-4 sm:p-5 text-neutral-600">{product.specifications.paperTypes}</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-neutral-900">GSM Options</td>
                      <td className="p-4 sm:p-5 text-neutral-600">{product.specifications.gsmOptions}</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-neutral-900">Printing</td>
                      <td className="p-4 sm:p-5 text-neutral-600">{product.specifications.printing}</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-neutral-900">Finishing</td>
                      <td className="p-4 sm:p-5 text-neutral-600">{product.specifications.finishing}</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-neutral-900">Quantity</td>
                      <td className="p-4 sm:p-5 text-neutral-600">{product.specifications.quantity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Customization Options */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 text-left" aria-labelledby="custom-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-[#0C3855] font-extrabold uppercase">
              B2B SPECIFICATION MATRIX
            </span>
            <h2 
              id="custom-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              Customization Options
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Printopia Solutions manufactures medical stationery tailored exactly to institutional parameters. We offer extensive personalized configurations including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {product.customizationList.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm text-neutral-800 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#0C3855] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#0C3855]/5 border border-[#0C3855]/10 rounded-3xl p-8 sm:p-10 space-y-4">
            <h3 className="text-lg font-display font-bold text-[#0C3855] tracking-tight">
              Pre-press Design Support
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {product.customizationSupportCopy}
            </p>
            <div className="pt-2">
              <button
                onClick={handleScrollToQuotation}
                className="px-5 py-3 bg-[#0C3855] hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer focus-visible:outline-none"
              >
                <span>Inquire Custom Layout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Section 7: Process Timeline */}
      <section className="bg-neutral-50/50 py-16 border-y border-neutral-100 text-left" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <h2 
              id="process-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              Our Step-by-Step Order Process
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Submit Enquiry", desc: "Share specifications, required size, paper type, GSM and quantity via our quote form." },
              { step: "02", title: "Get Quotation", desc: "Our team reviews requirements and prepares a customized corporate commercial proposal." },
              { step: "03", title: "Design Proofing", desc: "Our pre-press department designs and sends a digital print-ready layout for verification." },
              { step: "04", title: "Bulk Printing", desc: "Upon proof approval, high-speed offset calibration machines run the production." },
              { step: "05", title: "Safe Delivery", desc: "Bags and files are packed in secure moisture-proof master cartons and dispatched." }
            ].map((p, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200/50 relative space-y-4">
                <span className="text-3xl font-mono font-black text-[#0C3855]/10 absolute top-4 right-4 leading-none">
                  {p.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-neutral-900 tracking-tight uppercase">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Why Printopia */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 text-left" aria-labelledby="why-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-[11px] font-mono tracking-widest text-[#0C3855] font-extrabold uppercase">
              B2B MANUFACTURING TRUST
            </span>
            <h2 
              id="why-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              Why Hospitals Trust Printopia Solutions
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              We leverage premium wood-free pulps, precise automated folding, and clinical-grade adhesive pasting systems to deliver stationery that operates flawlessly inside rigorous medical routines.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-4">
            {[
              { title: "Healthcare Printing Specialization", desc: "Engineered specifically for clinics, lab settings, and hospital systems." },
              { title: "Customized Manufacturing", desc: "Unmatched flexibility in dimensions, colors, bindings, and paper grades." },
              { title: "Consistent Print Quality", desc: "High-definition offset and digital machinery for zero readability errors." },
              { title: "Bulk Order Capability", desc: "Equipped to handle massive and regular institutional bulk supply runs." },
              { title: "Reliable Delivery Support", desc: "Secure packaging with prompt shipping logistics and tracking support." }
            ].map((point, idx) => (
              <div key={idx} className="flex items-start space-x-3.5 border-b border-neutral-100 last:border-b-0 pb-3 last:pb-0">
                <span className="w-5 h-5 rounded-full bg-[#0C3855]/5 text-[#0C3855] border border-[#0C3855]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div className="space-y-1">
                  <span className="text-sm font-bold text-neutral-900 block tracking-tight">
                    {point.title}
                  </span>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 9: Industries We Serve */}
      <section className="bg-neutral-50/50 py-16 border-y border-neutral-100 text-left" aria-labelledby="industries-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <h2 
              id="industries-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              Who Uses Our {product.name}?
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Hospitals",
              "Diagnostic Centres",
              "Pathology Laboratories",
              "Clinics",
              "Nursing Homes",
              "Medical Institutions"
            ].map((ind, idx) => (
              <div 
                key={idx} 
                className="bg-white p-5 rounded-2xl border border-neutral-200/50 hover:border-neutral-300 transition-all text-center flex flex-col items-center justify-center space-y-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0C3855]/5 text-[#0C3855] flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-900">
                  {ind}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Related Products */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 text-left" aria-labelledby="related-heading">
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 
              id="related-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              Related Healthcare Printing Products
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((prod) => (
              <div 
                key={prod.slug}
                className="group flex flex-col h-full justify-between bg-white border border-neutral-200/70 hover:border-neutral-300 rounded-3xl p-4 transition-all duration-300 hover:shadow-lg text-left"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] bg-neutral-50 rounded-2xl flex items-center justify-center overflow-hidden border border-neutral-100/60 p-4">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:12px_12px]" />
                    <img
                      src={prod.image}
                      alt={prod.name}
                      width={160}
                      height={120}
                      className="w-full max-w-[110px] sm:max-w-[130px] h-24 sm:h-28 object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="10" fill="%23a1a1aa">Printopia Solutions</text></svg>';
                        console.warn("Missing image:", e.currentTarget.src);
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono tracking-wider text-[#0C3855] font-extrabold uppercase block">
                      {prod.category}
                    </span>
                    <h3 className="text-sm font-display font-bold text-neutral-950 tracking-tight leading-snug min-h-[40px] flex items-center">
                      {prod.name}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    to={`/products/${prod.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0C3855] hover:text-blue-700 transition-colors focus-visible:outline-none"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="bg-neutral-50/50 py-16 border-y border-neutral-100 text-left" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-3">
            <h2 
              id="faq-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-1 bg-[#0C3855] mx-auto rounded" />
          </div>

          <div className="space-y-3">
            {product.faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
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

      {/* Section 12: Quotation Form */}
      <section id="product-quotation-form" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 text-left" aria-labelledby="form-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-[#0C3855] font-extrabold uppercase">
              RELIABLE B2B ESTIMATES
            </span>
            <h2 
              id="form-heading" 
              className="text-2xl sm:text-3xl font-display font-black text-neutral-950 tracking-tight"
            >
              Request Custom {product.name} Quotation
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Our pre-press department can match your pre-existing designs or construct dynamic clinical templates based on layout drafts. Provide your information below to obtain a customized PDF proposal and quotation.
            </p>
            <div className="p-5 bg-[#0C3855]/5 border border-[#0C3855]/10 rounded-2xl flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#0C3855] shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-neutral-900 block uppercase">
                  Response SLA Target
                </span>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  We process hospital and diagnostic RFQ proposals within 2 business hours, attaching customized spec sheets and logistics estimates.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {formSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 rounded-3xl border border-blue-100 shadow-sm text-center space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
                  <Check className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-black text-neutral-900 tracking-tight">Quotation Request Submitted</h3>
                  <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
                    Thank you. Our institutional sales team will review your requirements for <strong>{product.name}</strong> and contact you with a customized proposal shortly.
                  </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/919432436942?text=${encodeURIComponent(`Hello Printopia Solutions, I just submitted a quotation request for ${product.name} on your website. Please check and assist.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  
                  <button 
                    onClick={() => setFormSuccess(false)}
                    className="px-8 py-4 bg-white border border-neutral-200 text-neutral-600 text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-50 transition-all"
                  >
                    Submit another enquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 bg-neutral-50 p-6 sm:p-10 rounded-3xl border border-neutral-200/60">
                {(formError || submitError) && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center space-x-2.5 text-xs font-bold uppercase">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError || submitError}</span>
                  </div>
                )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors"
                  />
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Hospital/Clinic/Lab Name"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <PhoneCall className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="organization@domain.com"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors"
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="E.g., Kolkata"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors"
                  />
                </div>
              </div>

              {/* Required Size Dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Required Size
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors cursor-pointer"
                >
                  {product.specifications.commonSizes.split(',').map((sizeStr) => {
                    const s = sizeStr.trim();
                    return <option key={s} value={s}>{s}</option>;
                  })}
                  <option value="Custom">Custom Size</option>
                </select>
              </div>

              {/* Paper Type Dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Paper / Material Type
                </label>
                <select
                  name="paperType"
                  value={formData.paperType}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors cursor-pointer"
                >
                  {product.specifications.paperTypes.split(',').map((paperStr) => {
                    const p = paperStr.trim();
                    return <option key={p} value={p}>{p}</option>;
                  })}
                  <option value="Other">Other customized specification</option>
                </select>
              </div>

              {/* GSM Dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  GSM / Weight Options
                </label>
                <select
                  name="gsm"
                  value={formData.gsm}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors cursor-pointer"
                >
                  {product.specifications.gsmOptions.split(',').map((gsmStr) => {
                    const g = gsmStr.trim();
                    return <option key={g} value={g}>{g}</option>;
                  })}
                  <option value="Other">Custom thickness</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Estimated Quantity <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter required quantity"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors"
                  />
                </div>
              </div>

              {/* Printing Side Dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                  Printing Side
                </label>
                <select
                  name="printingSide"
                  value={formData.printingSide}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors cursor-pointer"
                >
                  <option value="Single Side">Single Side</option>
                  <option value="Double Side">Double Side</option>
                  <option value="None / Pre-printed Borders">Pre-printed borders only</option>
                </select>
              </div>

            </div>

            {/* Additional Requirements */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono tracking-wider font-extrabold text-neutral-500 uppercase block">
                Additional Requirements (Optional)
              </label>
              <textarea
                name="additional"
                value={formData.additional}
                onChange={handleInputChange}
                rows={4}
                placeholder="Share required layout, binding pattern, custom margins, accreditation details, etc."
                className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0C3855] focus:ring-1 focus:ring-[#0C3855] transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-4 ${isSubmitting ? 'bg-neutral-400' : 'bg-[#0C3855] hover:bg-blue-800'} text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none`}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Quotation Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/919432436942?text=${encodeURIComponent(`Hello Printopia Solutions, I want to inquire about customizable hospital ${product.name} bulk packages. Please send pricing catalog.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center space-x-2 focus-visible:outline-none"
              >
                <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>

          </form>
          )}
        </div>
        </div>
      </section>

      {/* Section 13: Final CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-8 mb-16">
        <div className="relative bg-[#0C3855] text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center md:text-left overflow-hidden shadow-xl border border-white/5">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-400/10 filter blur-[80px]" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
                Need Customized {product.name} Printing?
              </h2>
              <p className="text-sm sm:text-base text-white/85 max-w-3xl leading-relaxed">
                Send us your size, material, quantity and design requirements to receive a customized B2B quotation.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center md:justify-start">
              <button
                onClick={handleScrollToQuotation}
                className="px-6 py-3.5 bg-white text-[#0C3855] hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer focus-visible:outline-none"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href={`https://wa.me/919432436942?text=${encodeURIComponent(`Hello Printopia Solutions, I am looking for customizable ${product.name} with specific medical standards. Can we talk?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-2 focus-visible:outline-none"
              >
                <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:+919432436942"
                className="px-6 py-3.5 bg-[#0C3855] border border-white/20 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-2 focus-visible:outline-none"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-neutral-950/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLightboxOpen(false);
              }
            }}
          >
            {/* Top Toolbar Header */}
            <div className="w-full max-w-6xl flex items-center justify-between text-white z-10 py-2.5 px-4 bg-neutral-900/80 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
              <div className="flex items-center space-x-3 truncate mr-2">
                <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-xs">
                  {product.name}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase tracking-wider">
                  Full Resolution
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.5))}
                  disabled={zoomLevel <= 1}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white transition-all cursor-pointer"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className="px-2.5 py-1 text-xs font-mono font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer min-w-[50px] text-center"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.5))}
                  disabled={zoomLevel >= 3}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white transition-all cursor-pointer"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-white/20 my-auto mx-1" />

                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-white transition-all cursor-pointer"
                  title="Close (ESC)"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Canvas */}
            <div 
              className={`relative flex-1 w-full flex items-center justify-center overflow-hidden my-3 ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsLightboxOpen(false);
                }
              }}
              onWheel={(e) => {
                if (e.deltaY < 0) {
                  setZoomLevel((prev) => Math.min(3, prev + 0.25));
                } else {
                  setZoomLevel((prev) => {
                    const next = Math.max(1, prev - 0.25);
                    if (next === 1) setPanOffset({ x: 0, y: 0 });
                    return next;
                  });
                }
              }}
              onDoubleClick={() => {
                if (zoomLevel > 1) {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                } else {
                  setZoomLevel(2);
                }
              }}
              onMouseDown={(e) => {
                if (zoomLevel > 1) {
                  setIsDragging(true);
                  setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
                }
              }}
              onMouseMove={(e) => {
                if (isDragging && zoomLevel > 1) {
                  setPanOffset({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y
                  });
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={(e) => {
                if (e.touches.length === 2) {
                  const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                  );
                  setTouchDistance(dist);
                } else if (e.touches.length === 1 && zoomLevel > 1) {
                  setIsDragging(true);
                  setDragStart({
                    x: e.touches[0].clientX - panOffset.x,
                    y: e.touches[0].clientY - panOffset.y
                  });
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && touchDistance !== null) {
                  const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                  );
                  const factor = dist / touchDistance;
                  setZoomLevel((prev) => Math.min(3, Math.max(1, prev * factor)));
                  setTouchDistance(dist);
                } else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
                  setPanOffset({
                    x: e.touches[0].clientX - dragStart.x,
                    y: e.touches[0].clientY - dragStart.y
                  });
                }
              }}
              onTouchEnd={() => {
                setIsDragging(false);
                setTouchDistance(null);
              }}
            >
              <motion.img
                src={product.image}
                alt={product.altText}
                style={{
                  scale: zoomLevel,
                  x: zoomLevel > 1 ? panOffset.x : 0,
                  y: zoomLevel > 1 ? panOffset.y : 0,
                }}
                transition={{ type: isDragging ? false : 'spring', stiffness: 300, damping: 30 }}
                className="max-h-[82vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-2xl shadow-2xl pointer-events-auto select-none"
                draggable={false}
              />
            </div>

            {/* Bottom Hints Footer */}
            <div className="text-center text-[11px] sm:text-xs text-white/70 bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span>Scroll or Pinch to zoom</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span>Double-click to 2x zoom</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span>Drag to pan</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
