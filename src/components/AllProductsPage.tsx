import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquare, ShieldCheck, ChevronRight, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../data/imageMap';
import { getPlaceholderImage } from '../utils/placeholderImage';

export interface Product {
  name: string;
  category: string;
  categories: string[];
  slug: string;
  image: string;
  description: string;
  altText?: string;
}

export const CATEGORIES = [
  "All Products",
  "Healthcare",
  "Education",
  "Corporate",
  "Hospitality",
  "Manufacturing",
  "Retail"
];

export const ALL_PRODUCTS: Product[] = [
  // HEALTHCARE PRODUCTS
  {
    name: "Patient Identification Bands & Tags",
    category: "Healthcare",
    categories: ["Healthcare"],
    slug: "patient-identification-bands-tags",
    image: images.products.patientBands,
    description: "Ultra-soft medical wristbands with secure tamper-proof locking snap for precise inpatient tracking.",
    altText: "Patient Identification Bands and Tags"
  },
  {
    name: "Report Pad",
    category: "Healthcare",
    categories: ["Healthcare"],
    slug: "report-pad",
    image: images.products.reportPad,
    description: "Customized prescription and patient consultation report sheets printed on premium uncoated paper.",
    altText: "Custom Hospital Report Pad"
  },
  {
    name: "Prescription Pad",
    category: "Healthcare",
    categories: ["Healthcare"],
    slug: "prescription-pad",
    image: images.products.reportPad,
    description: "Doctor consultation prescription pads with custom clinic header, doctor credentials, and rx layout.",
    altText: "Doctor Consultation Prescription Pad"
  },
  {
    name: "Lab Envelope",
    category: "Healthcare",
    categories: ["Healthcare"],
    slug: "lab-envelope",
    image: images.products.labEnvelope,
    description: "Secure confidential lab results envelope featuring crystal clear polycarbonate window options.",
    altText: "Pathology Lab Result Envelope"
  },
  {
    name: "OPD File",
    category: "Healthcare",
    categories: ["Healthcare"],
    slug: "opd-file",
    image: images.products.opdFile,
    description: "Creased-spine medical case history files with rigid cardboard base and heavy-duty steel clips.",
    altText: "Hospital OPD Patient History File Folder"
  },
  {
    name: "X-Ray Envelope",
    category: "Healthcare",
    categories: ["Healthcare"],
    slug: "x-ray-envelope",
    image: images.products.xrayEnvelope,
    description: "Heavy-duty large-format protective envelopes for high-density diagnostic film scans.",
    altText: "Diagnostic X-Ray Protective Envelope"
  },
  {
    name: "Test Report File",
    category: "Healthcare",
    categories: ["Healthcare"],
    slug: "test-report-file",
    image: images.products.testReportFile,
    description: "High-grade patient folder sleeves designed for medical file compilation and diagnostic storage.",
    altText: "Diagnostic Test Report File Folder"
  },
  {
    name: "Hospital Paper Bags",
    category: "Healthcare",
    categories: ["Healthcare", "Hospitality", "Retail"],
    slug: "hospital-bags",
    image: images.products.hospitalBags,
    description: "Reinforced block-bottom healthcare bags with soft handles, made from durable bio-safe paper.",
    altText: "Custom Printed Hospital Paper Bags"
  },

  // EDUCATION PRODUCTS (EXACT 15 PRODUCTS USING DEDICATED UPLOADED SCHOOL IMAGES)
  {
    name: "School Diary",
    category: "Education",
    categories: ["Education"],
    slug: "school-diary",
    image: images.school.schoolDiary,
    description: "Customized student planners and academic handbooks with hardbound or softbound covers and school rules.",
    altText: "School Diary Printing"
  },
  {
    name: "Student ID Card",
    category: "Education",
    categories: ["Education"],
    slug: "student-id-card",
    image: images.school.studentIdCard,
    description: "High-definition PVC smart ID cards with barcode, QR code integration, and matching printed satin lanyards.",
    altText: "Student ID Card Printing"
  },
  {
    name: "Report Card",
    category: "Education",
    categories: ["Education"],
    slug: "report-card",
    image: images.school.reportCard,
    description: "Multi-fold progress report cards with structured grading tables, attendance charts, and teacher panels.",
    altText: "Report Card Printing"
  },
  {
    name: "Mark Sheet",
    category: "Education",
    categories: ["Education"],
    slug: "mark-sheet",
    image: images.school.markSheet,
    description: "Security-printed official grade sheets with anti-copy watermarks, micro-text borders, and hologram positioning.",
    altText: "Mark Sheet Security Printing"
  },
  {
    name: "School Certificate",
    category: "Education",
    categories: ["Education"],
    slug: "school-certificate",
    image: images.school.schoolCertificate,
    description: "Prestige graduation, achievement, and sports certificates with metallic foil stamping and gold leaf accents.",
    altText: "School Certificate Printing"
  },
  {
    name: "Admission Form",
    category: "Education",
    categories: ["Education"],
    slug: "admission-form",
    image: images.school.admissionForm,
    description: "Professional student application and registration forms with attached acknowledgement slips.",
    altText: "School Admission Form Printing"
  },
  {
    name: "School Prospectus",
    category: "Education",
    categories: ["Education"],
    slug: "school-prospectus",
    image: images.school.schoolProspectus,
    description: "High-impact institutional profile booklets highlighting campus infrastructure, faculty, and academic programs.",
    altText: "School Prospectus Booklet Printing"
  },
  {
    name: "School Brochure",
    category: "Education",
    categories: ["Education"],
    slug: "school-brochure",
    image: images.school.schoolBrochure,
    description: "Informative bi-fold and tri-fold promotional pamphlets for admissions outreach and annual events.",
    altText: "School Brochure Printing"
  },
  {
    name: "Fee Receipt Book",
    category: "Education",
    categories: ["Education"],
    slug: "fee-receipt-book",
    image: images.school.feeReceiptBook,
    description: "Official multi-copy fee receipt counterfoil books for school cashiers and administrative record keeping.",
    altText: "Fee Receipt Book Printing"
  },
  {
    name: "School Letterhead",
    category: "Education",
    categories: ["Education"],
    slug: "school-letterhead",
    image: images.school.schoolLetterhead,
    description: "Official institutional stationery printed on premium executive bond paper for formal correspondence.",
    altText: "School Letterhead Printing"
  },
  {
    name: "School Envelope",
    category: "Education",
    categories: ["Education"],
    slug: "school-envelope",
    image: images.school.schoolEnvelope,
    description: "Branded envelopes in DL, C5, and C4 formats with peel & seal adhesive closures for institutional mailing.",
    altText: "School Envelope Printing"
  },
  {
    name: "Visitor Pass",
    category: "Education",
    categories: ["Education"],
    slug: "visitor-pass",
    image: images.school.visitorPass,
    description: "Security visitor management passes and badges with sequential numbering, clip slots, and campus rules.",
    altText: "Visitor Pass Printing"
  },
  {
    name: "Name Badges",
    category: "Education",
    categories: ["Education"],
    slug: "name-badges",
    image: images.school.nameBadges,
    description: "Custom metallic, acrylic, and plastic pin or magnetic name badges for teachers, staff, and institutional teams.",
    altText: "Name Badges Printing"
  },
  {
    name: "Flyer",
    category: "Education",
    categories: ["Education"],
    slug: "school-flyer",
    image: images.school.flyer, // Uses /Images/Flyer.webp
    description: "Vibrant promotional flyers and handbills for admissions campaigns, summer camps, sports coaching, and school event announcements.",
    altText: "School Flyer Printing"
  },
  {
    name: "School Event Invitation Card",
    category: "Education",
    categories: ["Education"],
    slug: "school-event-invitation-card",
    image: images.school.schoolEventInvitationCard,
    description: "Elegantly designed invitation cards and matching envelopes for sports day, annual functions, and ceremonies.",
    altText: "School Event Invitation Card Printing"
  },

  // CORPORATE PRODUCTS
  {
    name: "Corporate Visiting Card",
    category: "Corporate",
    categories: ["Corporate", "Healthcare", "Hospitality", "Retail"],
    slug: "visiting-card",
    image: images.products.visitingCard,
    description: "Executive business cards with metallic foil accents, soft-touch velvet finish, and spot UV coating.",
    altText: "Corporate Visiting Card"
  },
  {
    name: "Business Envelope",
    category: "Corporate",
    categories: ["Corporate"],
    slug: "business-envelope",
    image: getPlaceholderImage("Business Envelope", "Corporate", "envelope"),
    description: "Custom corporate mailing envelopes in DL, C5, and C4 sizes with secure peel-and-seal flaps.",
    altText: "Corporate Business Envelope"
  },
  {
    name: "Presentation Folder",
    category: "Corporate",
    categories: ["Corporate"],
    slug: "presentation-folder",
    image: getPlaceholderImage("Presentation Folder", "Corporate", "folder"),
    description: "Laminated corporate document presentation folders with business card slots and pocket flaps.",
    altText: "Corporate Presentation Folder"
  },
  {
    name: "Notepad",
    category: "Corporate",
    categories: ["Corporate"],
    slug: "notepad",
    image: getPlaceholderImage("Notepad", "Corporate", "file"),
    description: "Branded corporate writing notepads and desk pads with crisp custom header and grid layout.",
    altText: "Corporate Writing Notepad"
  },
  {
    name: "Employee ID Card",
    category: "Corporate",
    categories: ["Corporate", "Healthcare"],
    slug: "id-card",
    image: images.products.idCard,
    description: "RFID and smart chip compatible corporate PVC employee access badges with printed lanyards.",
    altText: "Employee PVC Access ID Card"
  },
  {
    name: "Corporate Diary",
    category: "Corporate",
    categories: ["Corporate"],
    slug: "corporate-diary",
    image: getPlaceholderImage("Corporate Diary", "Corporate", "card"),
    description: "Premium leatherette hardbound corporate executive diaries with debossed foil logo and bookmark ribbon.",
    altText: "Executive Corporate Diary"
  },
  {
    name: "Company Profile",
    category: "Corporate",
    categories: ["Corporate", "Manufacturing"],
    slug: "company-profile",
    image: getPlaceholderImage("Company Profile", "Corporate", "folder"),
    description: "High-end multi-page corporate profile booklets showcasing company history, capabilities, and team.",
    altText: "Corporate Company Profile Brochure"
  },

  // HOSPITALITY PRODUCTS
  {
    name: "Menu Card",
    category: "Hospitality",
    categories: ["Hospitality"],
    slug: "menu-card",
    image: getPlaceholderImage("Menu Card", "Hospitality", "menu"),
    description: "Waterproof, wipeable, and hardbound restaurant menu cards with luxury foil stamping.",
    altText: "Restaurant Menu Card"
  },
  {
    name: "Table Tent Card",
    category: "Hospitality",
    categories: ["Hospitality"],
    slug: "table-tent-card",
    image: getPlaceholderImage("Table Tent Card", "Hospitality", "card"),
    description: "Freestanding table tent cards for daily specials, QR code digital menus, and promotional offers.",
    altText: "Hospitality Table Tent Card"
  },
  {
    name: "Bill Book & Receipt Book",
    category: "Healthcare",
    categories: ["Healthcare", "Corporate", "Hospitality", "Manufacturing", "Retail"],
    slug: "bill-book",
    image: images.products.billBook,
    description: "Sequential serial-numbered billing pads & receipt counterfoils in duplicate or triplicate carbonless paper.",
    altText: "Custom Bill Book and Receipt Book"
  },
  {
    name: "Food Packaging Sleeve",
    category: "Hospitality",
    categories: ["Hospitality"],
    slug: "food-packaging-sleeve",
    image: getPlaceholderImage("Food Packaging Sleeve", "Hospitality", "box"),
    description: "Custom printed food grade paperboard packaging sleeves for takeaway containers and boxes.",
    altText: "Food Packaging Paper Sleeve"
  },
  {
    name: "Delivery Insert",
    category: "Hospitality",
    categories: ["Hospitality", "Retail"],
    slug: "delivery-insert",
    image: getPlaceholderImage("Delivery Insert", "Hospitality", "card"),
    description: "Compact promotional cards and discount voucher inserts included in food delivery packages.",
    altText: "Food Delivery Promo Insert Card"
  },
  {
    name: "Feedback Card",
    category: "Hospitality",
    categories: ["Hospitality"],
    slug: "feedback-card",
    image: getPlaceholderImage("Feedback Card", "Hospitality", "card"),
    description: "Custom guest feedback and rating forms for hotel rooms, cafes, and dining establishments.",
    altText: "Guest Feedback Card"
  },
  {
    name: "Loyalty Card",
    category: "Hospitality",
    categories: ["Hospitality", "Retail"],
    slug: "loyalty-card",
    image: getPlaceholderImage("Loyalty Card", "Hospitality", "card"),
    description: "Custom punch cards and stamp loyalty cards designed to drive repeat customer visits.",
    altText: "Customer Loyalty Stamp Card"
  },
  {
    name: "Brochures & Pamphlets",
    category: "Corporate",
    categories: ["Healthcare", "Corporate", "Hospitality"],
    slug: "brochure",
    image: images.products.brochure,
    description: "Multi-fold clinical, corporate, and catering pamphlets to highlight specialties, menus, and facilities.",
    altText: "Multi-Fold Promotional Brochure"
  },

  // MANUFACTURING PRODUCTS
  {
    name: "Product Label & Sticker",
    category: "Manufacturing",
    categories: ["Healthcare", "Manufacturing", "Retail", "Hospitality"],
    slug: "sticker-label",
    image: images.products.stickerLabel,
    description: "Industrial-grade waterproof and scratch-resistant self-adhesive product roll labels and barcode stickers.",
    altText: "Industrial Product Label"
  },
  {
    name: "Packaging Box",
    category: "Manufacturing",
    categories: ["Manufacturing", "Retail"],
    slug: "packaging-box",
    image: getPlaceholderImage("Packaging Box", "Manufacturing", "box"),
    description: "Custom die-cut corrugated and paperboard product packaging boxes with high-impact color printing.",
    altText: "Custom Printed Packaging Box"
  },
  {
    name: "Instruction Manual",
    category: "Manufacturing",
    categories: ["Manufacturing"],
    slug: "instruction-manual",
    image: getPlaceholderImage("Instruction Manual", "Manufacturing", "file"),
    description: "Saddle-stitched or folded product user guides, technical manuals, and safety instruction booklets.",
    altText: "Product Instruction Manual"
  },
  {
    name: "Product Catalogue",
    category: "Manufacturing",
    categories: ["Manufacturing", "Retail"],
    slug: "product-catalogue",
    image: getPlaceholderImage("Product Catalogue", "Manufacturing", "folder"),
    description: "Comprehensive product line catalogues showcasing technical specs, part numbers, and images.",
    altText: "Industrial Product Catalogue"
  },
  {
    name: "Barcode Sticker",
    category: "Manufacturing",
    categories: ["Manufacturing", "Retail"],
    slug: "barcode-sticker",
    image: images.products.stickerLabel,
    description: "Precision thermal barcode & QR code tracking stickers for warehouse inventory management.",
    altText: "Barcode Tracking Sticker"
  },
  {
    name: "Warranty Card",
    category: "Manufacturing",
    categories: ["Manufacturing", "Retail"],
    slug: "warranty-card",
    image: getPlaceholderImage("Warranty Card", "Manufacturing", "card"),
    description: "Serial-numbered product guarantee and warranty cards with anti-counterfeit features.",
    altText: "Product Warranty Card"
  },
  {
    name: "Safety Label",
    category: "Manufacturing",
    categories: ["Manufacturing"],
    slug: "safety-label",
    image: images.products.stickerLabel,
    description: "Heavy-duty hazard warning, machinery compliance, and safety instruction adhesive signs.",
    altText: "Industrial Safety Compliance Label"
  },
  {
    name: "Dispatch Label",
    category: "Manufacturing",
    categories: ["Manufacturing", "Retail"],
    slug: "dispatch-label",
    image: images.products.stickerLabel,
    description: "Shipping address and warehouse dispatch barcode labels for logistics and cargo handling.",
    altText: "Shipping & Dispatch Label"
  },
  {
    name: "Delivery Challan",
    category: "Manufacturing",
    categories: ["Manufacturing", "Corporate"],
    slug: "delivery-challan",
    image: images.products.billBook,
    description: "Sequential carbonless delivery challan booklets with goods dispatch verification copies.",
    altText: "Delivery Challan Book"
  },

  // RETAIL PRODUCTS
  {
    name: "Shopping Bag",
    category: "Retail",
    categories: ["Retail"],
    slug: "shopping-bag",
    image: getPlaceholderImage("Shopping Bag", "Retail", "bag"),
    description: "Custom branded craft paper shopping bags with twisted paper or rope handles for retail stores.",
    altText: "Retail Paper Shopping Bag"
  },
  {
    name: "Price Tag",
    category: "Retail",
    categories: ["Retail"],
    slug: "price-tag",
    image: getPlaceholderImage("Price Tag", "Retail", "tag"),
    description: "Custom die-cut garment swing tags and merchandise price labels with string punch holes.",
    altText: "Merchandise Price Tag"
  },
  {
    name: "Flyers & Leaflets",
    category: "Corporate",
    categories: ["Healthcare", "Corporate", "Hospitality", "Retail"],
    slug: "flyers",
    image: images.products.flyers, // Uses /Images/flyers.webp
    description: "Vibrant promotional sheets and handbills printed on lightweight glossy stock for retail campaigns.",
    altText: "Promotional Handout Flyers"
  },
  {
    name: "Poster",
    category: "Retail",
    categories: ["Retail"],
    slug: "poster",
    image: getPlaceholderImage("Poster", "Retail", "file"),
    description: "High-resolution indoor & outdoor promotional display posters printed on glossy photo paper.",
    altText: "Retail Promotional Poster"
  }
];

interface AllProductsPageProps {
  onRequestQuote: (productName?: string) => void;
}

export default function AllProductsPage({ onRequestQuote }: AllProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Dynamic SEO Metadata updates per requirements
    document.title = "Commercial Printing Products for Every Industry | Printopia Solutions";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = "Explore healthcare, education, corporate, hospitality, manufacturing and retail printing products from Printopia Solutions, including stationery, promotional materials, labels and custom packaging.";
    
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = descriptionContent;
      document.head.appendChild(meta);
    }

    // Scroll to top on mount
    window.scrollTo({ top: 0 });
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "All Products" ||
      product.categories.includes(activeCategory) ||
      product.category === activeCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.categories.some((c) => c.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div id="all-products-page" className="relative w-full bg-gradient-to-b from-[#F5FAFF] via-white to-[#F5FAFF] pt-24 sm:pt-28 pb-16 overflow-hidden min-h-screen font-sans">
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
            COMMERCIAL PRINT CATALOGUE
          </span>
          <h1 
            id="products-hero-title"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-neutral-900 tracking-tight"
          >
            Commercial Printing Products for Every Industry
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
            Explore our comprehensive range of customized printing products across Healthcare, Education, Corporate, Hospitality, Manufacturing, and Retail sectors.
          </p>
        </div>
      </section>

      {/* Search & Category Filter Controls */}
      <section 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-10 mb-10 space-y-6"
        aria-label="Product Search and Categories Filter"
      >
        {/* Search Field */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, industry, or description..."
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-neutral-200/90 rounded-2xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0C3855] focus:border-transparent shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-neutral-500 mt-2 text-left pl-2">
              Found <strong className="text-[#0C3855]">{filteredProducts.length}</strong> product{filteredProducts.length === 1 ? '' : 's'} matching "{searchQuery}"
            </p>
          )}
        </div>

        {/* Category Tabs */}
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
                    ? 'bg-[#0C3855] text-white shadow-md scale-105' 
                    : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-900'
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
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-neutral-200 text-center max-w-lg mx-auto space-y-4">
            <p className="text-base font-semibold text-neutral-800">No products found matching your search.</p>
            <p className="text-xs text-neutral-500">Try adjusting your search query or selecting a different industry tab.</p>
            <button
              onClick={() => { setActiveCategory("All Products"); setSearchQuery(""); }}
              className="px-5 py-2.5 bg-[#0C3855] text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout={!prefersReducedMotion}
                  initial={!prefersReducedMotion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={!prefersReducedMotion ? { opacity: 0, scale: 0.95 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : idx * 0.02 }}
                  key={`${product.slug}-${idx}`}
                  className="group flex flex-col h-full justify-between bg-white border border-neutral-200/80 hover:border-neutral-300 rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl text-left"
                >
                  <div className="space-y-4">
                    {/* Product Image Area - Uniform height across cards */}
                    <div className="relative w-full h-44 sm:h-48 bg-neutral-50 rounded-2xl flex items-center justify-center overflow-hidden border border-neutral-100 p-4">
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:12px_12px]" />
                      <img
                        src={product.image}
                        alt={product.altText || `${product.name} - Printopia Solutions`}
                        width={400}
                        height={300}
                        className="w-full max-w-[130px] sm:max-w-[160px] h-28 sm:h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                        loading={idx < 8 ? "eager" : "lazy"}
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%230C3855">Printopia Solutions</text></svg>';
                        }}
                      />
                    </div>

                    {/* Category Badge & Product Identity */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap gap-1">
                        {product.categories.map((cat) => (
                          <span key={cat} className="text-[10px] font-mono tracking-wider text-[#0C3855] font-extrabold uppercase bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/60">
                            {cat}
                          </span>
                        ))}
                      </div>
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

                    <button
                      onClick={() => onRequestQuote(product.name)}
                      className="text-[11px] font-bold text-neutral-600 hover:text-[#0C3855] px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Custom Product CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 md:mt-24">
        <div className="relative bg-[#0C3855] text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center md:text-left overflow-hidden shadow-xl border border-white/5">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-400/10 filter blur-[80px]" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-mono tracking-widest uppercase font-bold text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>B2B Custom Specifications</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
                Need Custom B2B Commercial Printing?
              </h2>
              <p className="text-sm sm:text-base text-white/85 max-w-3xl leading-relaxed">
                Share your required size, paper, GSM, quantity and finishing specifications for any industry. Our team will prepare a customized quotation for your organization.
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
                href={`https://wa.me/919432436942?text=${encodeURIComponent("Hello Printopia Solutions, I am looking for custom commercial printing solutions. Please share details.")}`}
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

