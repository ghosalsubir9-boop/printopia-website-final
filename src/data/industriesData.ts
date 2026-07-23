import { images } from "./imageMap";

export interface IndustryProduct {
  id: string;
  name: string;
  description: string;
  image?: string;
  badge?: string;
  specifications?: string[];
}

export interface IndustryDetail {
  slug: string;
  title: string;
  shortTitle: string;
  heroHeading: string;
  heroSubheading: string;
  introduction: string;
  iconName: "stethoscope" | "graduation-cap" | "briefcase" | "utensils" | "factory" | "shopping-bag";
  heroImage?: string;
  metaTitle: string;
  metaDescription: string;
  products: IndustryProduct[];
}

export const INDUSTRIES_DATA: IndustryDetail[] = [
  {
    slug: "healthcare",
    title: "Hospitals & Diagnostic Centres",
    shortTitle: "Healthcare",
    heroHeading: "Precision Printing Solutions for Hospitals & Diagnostic Centres",
    heroSubheading: "Specialized clinical stationery, patient files, report pads, lab envelopes, and diagnostic records engineered for healthcare accuracy and privacy.",
    introduction: "Printopia Solutions manufactures precision-printed materials for hospitals, pathology labs, radiology centers, clinics, and nursing homes. Our products ensure clinical accuracy, patient confidentiality, durable paper handling, and institutional branding.",
    iconName: "stethoscope",
    heroImage: images.products.reportPad,
    metaTitle: "Hospital & Diagnostic Centre Printing Solutions | Printopia Solutions",
    metaDescription: "Custom medical and healthcare printing solutions. High quality report pads, OPD files, lab envelopes, X-ray envelopes, patient ID bands, and hospital paper bags.",
    products: [
      {
        id: "report-pads",
        name: "Report Pads",
        description: "Customized medical report pads printed on premium bond paper with tear-off padding and anti-bleed ink performance.",
        image: images.products.reportPad,
        badge: "Most Popular",
        specifications: ["A4 / A5 custom sizes", "70-100 GSM premium bond paper", "Single or multi-color printing", "Custom clinic branding"]
      },
      {
        id: "prescription-pads",
        name: "Prescription Pads",
        description: "High-grade doctor prescription pads with security watermarks, doctor registration details, and clean perforations.",
        image: images.products.reportPad,
        badge: "Essential",
        specifications: ["A5 & Custom Doctor Sizes", "Sequential numbering", "Hard backing board", "Carbonless duplicate option"]
      },
      {
        id: "opd-files",
        name: "OPD Files",
        description: "Durable medical record folders with internal pockets, document clips, and patient history indexing sections.",
        image: images.products.opdFile,
        badge: "High Durability",
        specifications: ["250-350 GSM Art Board / Kraft", "Inner pocket & cobra clip", "Gloss/Matte Lamination", "Barcoding support"]
      },
      {
        id: "lab-envelopes",
        name: "Lab Envelopes",
        description: "Secure laboratory report envelopes available with window or non-window options and self-adhesive peel & seal strips.",
        image: images.products.labEnvelope,
        badge: "Secure Seal",
        specifications: ["Custom sizes (9x4, 10x12, etc.)", "80-100 GSM Maplitho paper", "Peel & seal or gummed flap", "Confidential window alignment"]
      },
      {
        id: "xray-envelopes",
        name: "X-Ray Envelopes",
        description: "Heavy-duty protective envelopes designed specifically for radiology films, CT scans, and MRI report preservation.",
        image: images.products.xrayEnvelope,
        badge: "Radiology Spec",
        specifications: ["100-140 GSM Kraft/Maplitho paper", "Large formats (10x12, 12x15, 14x17)", "Reinforced edges", "Custom dark printing"]
      },
      {
        id: "test-report-files",
        name: "Test Report Files",
        description: "Professional multi-page laboratory investigation folders with clear plastic report slots and institutional branding.",
        image: images.products.testReportFile,
        badge: "Diagnostic Grade",
        specifications: ["Heavy cardstock material", "Inner clear sleeves / prongs", "Vibrant full color print", "Custom hospital layout"]
      },
      {
        id: "patient-id-bands",
        name: "Patient Identification Bands",
        description: "Waterproof, tear-resistant medical ID wristbands with secure snap closures and barcode print support.",
        image: images.products.patientBands,
        badge: "Clinical Safety",
        specifications: ["Waterproof Synthetic Paper / Tyvek", "Tamper-evident snap closure", "Adult & Pediatric sizes", "Thermal barcode compatible"]
      },
      {
        id: "hospital-paper-bags",
        name: "Hospital Paper Bags",
        description: "Eco-friendly, sturdy carry bags for pharmacy dispenses, patient discharge files, and diagnostic samples.",
        image: images.products.hospitalBags,
        badge: "Eco Friendly",
        specifications: ["100-150 GSM Kraft paper", "Reinforced twisted handles", "Bulk load capacity up to 5kg", "Custom healthcare prints"]
      },
      {
        id: "bill-books",
        name: "Bill Books",
        description: "Duplicate and triplicate carbonless bill books with sequential numbering for hospital billing counters.",
        image: images.products.billBook,
        badge: "Accounts",
        specifications: ["NCR (Carbonless) Paper", "Duplicate / Triplicate sets", "Sequential red numbering", "Sturdy book binding"]
      },
      {
        id: "receipt-books",
        name: "Receipt Books",
        description: "Official money receipt books customized with hospital tax registration, logos, and counterfoils.",
        image: images.products.billBook,
        badge: "Finance",
        specifications: ["Perforated counterfoil", "Hard cover binding", "Custom size formats", "Security tint option"]
      }
    ]
  },
  {
    slug: "education",
    title: "Schools & Educational Institutions",
    shortTitle: "Education",
    heroHeading: "Customized Printing & Stationery for Schools, Colleges & Universities",
    heroSubheading: "Comprehensive academic print collateral from school diaries, student ID cards, report cards, and certificates to prospectuses and exam stationery.",
    introduction: "Printopia Solutions offers end-to-end printing for educational institutions across India. From official student identification cards and embossed graduation certificates to school diaries and prospectus brochures, we deliver institutional excellence.",
    iconName: "graduation-cap",
    heroImage: images.products.idCard,
    metaTitle: "School & Educational Institution Printing Services | Printopia Solutions",
    metaDescription: "High-quality printing solutions for schools, colleges, and educational institutes. School diaries, student ID cards, certificates, report cards, and mark sheets.",
    products: [
      {
        id: "school-diaries",
        name: "School Diaries",
        description: "Customized student planners and academic handbooks with hardbound or softbound covers, calendar pages, and school rules.",
        image: images.products.brochure,
        badge: "Academic Must",
        specifications: ["Hardbound / Perfect binding", "Customized inner grid & layout", "70 GSM Maplitho paper", "Ribbon bookmark option"]
      },
      {
        id: "student-id-cards",
        name: "Student ID Cards",
        description: "High-definition PVC smart ID cards with barcode, QR code integration, and matching printed lanyards.",
        image: images.products.idCard,
        badge: "Smart ID",
        specifications: ["Durable 760-micron PVC card", "RFID / Barcode / QR ready", "Gloss / Matte finish", "Printed satin lanyard attached"]
      },
      {
        id: "report-cards",
        name: "Report Cards",
        description: "Multi-fold progress report cards with structured grading tables, attendance charts, and teacher feedback panels.",
        badge: "Assessment",
        specifications: ["250-300 GSM Art Card", "Creasing and score folding", "Embossed school crest option", "Glossy or matte lamination"]
      },
      {
        id: "mark-sheets",
        name: "Mark Sheets",
        description: "Security-printed official grade sheets with anti-copy watermarks, micro-text borders, and hologram positioning.",
        badge: "Security Print",
        specifications: ["100-120 GSM Security paper", "Micro-text border print", "UV invisible ink capability", "Official seal watermark"]
      },
      {
        id: "certificates",
        name: "Certificates",
        description: "Prestige graduation, achievement, and sports certificates with metallic foil stamping and gold leaf accents.",
        badge: "Premium Finish",
        specifications: ["250-300 GSM Parchment / Textured Paper", "Gold / Silver foil stamping", "Custom border filigree", "A4 / Letter sizes"]
      },
      {
        id: "admission-forms",
        name: "Admission Forms",
        description: "Professional student application and registration forms with attached acknowledgement slips and checklist.",
        badge: "Administrative",
        specifications: ["Single or multi-page formats", "80 GSM smooth paper", "Perforated tear-off slip", "Numbered application tracking"]
      },
      {
        id: "exercise-books",
        name: "Exercise Books",
        description: "Institutional notebooks and workbooks customized with school logos, subject grids, and durable covers.",
        badge: "Custom Grid",
        specifications: ["Pin binding or thread sewing", "Custom rule lines (Four line, single line)", "High-whiteness paper", "Laminated cover board"]
      },
      {
        id: "question-papers",
        name: "Question Papers",
        description: "Confidential examination question paper printing with strict privacy protocols and tamper-proof packing.",
        badge: "Confidential",
        specifications: ["Secure production room printing", "Opaque tamper-evident packing", "Fast turnaround for exams", "Multiple page bookleting"]
      },
      {
        id: "answer-sheets",
        name: "Answer Sheets",
        description: "Standardized main and supplementary examination answer booklets with official header boxes and barcoding.",
        badge: "Exam Station",
        specifications: ["4, 8, 12, 16, 24-page options", "Stapled binding", "Sequential booklet numbering", "Smooth writing surface"]
      },
      {
        id: "prospectuses",
        name: "Prospectuses",
        description: "High-impact institutional profile booklets highlighting campus infrastructure, faculty, and academic programs.",
        image: images.products.brochure,
        badge: "Admissions CTA",
        specifications: ["130-170 GSM Gloss Art Paper", "Perfect / Saddle-stitch bound", "Full color vivid photography", "Spot UV cover accents"]
      },
      {
        id: "school-brochures",
        name: "School Brochures",
        description: "Informative bi-fold and tri-fold promotional pamphlets for admissions outreach and annual events.",
        image: images.products.brochure,
        badge: "Promotional",
        specifications: ["Tri-fold / Bi-fold formats", "170 GSM Art paper", "Crisp fold scoring", "High resolution imagery"]
      },
      {
        id: "fee-receipt-books",
        name: "Fee Receipt Books",
        description: "Official multi-copy fee receipt counterfoil books for school cashiers and administrative record keeping.",
        image: images.products.billBook,
        badge: "Finance",
        specifications: ["2-part or 3-part carbonless sets", "Perforated counterfoils", "Hardcover protection", "Sequential numbering"]
      }
    ]
  },
  {
    slug: "corporate",
    title: "Corporate Offices",
    shortTitle: "Corporate",
    heroHeading: "Executive Print & Corporate Stationery Solutions",
    heroSubheading: "Elevate your corporate identity with premium business cards, luxury letterheads, custom folders, employee badges, and marketing collateral.",
    introduction: "Printopia Solutions helps enterprises, corporate offices, consultancies, and MNCs build strong corporate identities. We deliver sophisticated stationery, presentation materials, and brand literature crafted to leave a lasting executive impression.",
    iconName: "briefcase",
    heroImage: images.products.visitingCard,
    metaTitle: "Corporate Office Printing & Branding Solutions | Printopia Solutions",
    metaDescription: "Premium corporate stationery and branding print materials. Visiting cards, letterheads, presentation folders, employee ID cards, corporate diaries, and brochures.",
    products: [
      {
        id: "letterheads",
        name: "Letterheads",
        description: "Executive letterheads printed on high-white executive paper compatible with all laser and inkjet office printers.",
        badge: "Corporate Identity",
        specifications: ["100-120 GSM Executive Bond Paper", "Watermark & texture options", "A4 standard size", "Sharp CMYK logo reproduction"]
      },
      {
        id: "visiting-cards",
        name: "Visiting Cards",
        description: "Premium business cards available in matte, velvet soft-touch, spot UV, metallic foil, and rounded corner finishes.",
        image: images.products.visitingCard,
        badge: "Best Seller",
        specifications: ["350-400 GSM Heavy Art Card", "Soft-Touch Matte / Spot UV", "Gold / Silver foil accents", "Standard 3.5 x 2 inch format"]
      },
      {
        id: "envelopes",
        name: "Envelopes",
        description: "Branded corporate envelopes in DL, C5, and C4 formats with peel & seal adhesive closures.",
        image: images.products.labEnvelope,
        badge: "Stationery",
        specifications: ["100 GSM Executive Maplitho", "Window or non-window formats", "DL, C5 (A5), C4 (A4) sizes", "Inside security tinting"]
      },
      {
        id: "presentation-folders",
        name: "Presentation Folders",
        description: "Custom document folders with business card slots, inner pockets, and glossy brand presentation coatings.",
        image: images.products.opdFile,
        badge: "Client Pitch",
        specifications: ["300 GSM Heavy Art Board", "Single / Double inner pockets", "Business card die-cut slot", "Matte lamination + Spot UV"]
      },
      {
        id: "notepads",
        name: "Notepads",
        description: "Executive desk pads and conference memo pads customized with light watermarks and company branding.",
        image: images.products.reportPad,
        badge: "Office Essential",
        specifications: ["50 or 100 sheets per pad", "Top glue padding with stiff back", "70-80 GSM executive paper", "Custom grid or line layouts"]
      },
      {
        id: "employee-id-cards",
        name: "Employee ID Cards",
        description: "Corporate access cards with NFC / RFID smart chip integration, barcode printing, and custom branded lanyards.",
        image: images.products.idCard,
        badge: "Security Access",
        specifications: ["High-durability PVC card", "Mifare / RFID smart chip option", "Dual-sided HD print", "Lanyard with safety breakaway"]
      },
      {
        id: "corporate-diaries",
        name: "Corporate Diaries",
        description: "Luxury PU leather executive planners and annual organizers foil stamped with your company emblem.",
        badge: "Executive Gift",
        specifications: ["Leatherette / Hardbound cover", "Debossing / Metallic foil stamping", "Page-a-day or week view layout", "Information & map pages"]
      },
      {
        id: "calendars",
        name: "Calendars",
        description: "Custom desktop wire-O bound calendars and wall calendars featuring corporate achievements and products.",
        badge: "New Year Brand",
        specifications: ["Table top wire-O binding", "250 GSM Art Card leaves", "Hard standee board base", "Spot UV highlight effects"]
      },
      {
        id: "brochures",
        name: "Brochures",
        description: "Corporate profiles and product brochures printed on glossy cardstock with vibrant color fidelity.",
        image: images.products.brochure,
        badge: "Corporate Sales",
        specifications: ["Multi-page saddle-stitched / perfect", "170-250 GSM Gloss / Matte paper", "Vibrant color saturation", "Precision folding"]
      },
      {
        id: "flyers",
        name: "Flyers",
        description: "High-volume promotional flyers and event handouts for corporate campaigns and product launches.",
        image: images.products.flyers,
        badge: "Promotions",
        specifications: ["A4 / A5 / DL sizes", "130-170 GSM Art paper", "Single / Double side print", "Bulk cost optimization"]
      },
      {
        id: "invoice-books",
        name: "Invoice Books",
        description: "Custom duplicate and triplicate GST-compliant tax invoice books with sequential numbering.",
        image: images.products.billBook,
        badge: "GST Billing",
        specifications: ["NCR carbonless papers", "Duplicate (1+1) or Triplicate (1+2)", "Sequential red numbering", "Perforated tear lines"]
      },
      {
        id: "company-profiles",
        name: "Company Profiles",
        description: "Prestige corporate capability booklets designed to showcase company history, services, and team.",
        badge: "B2B Credibility",
        specifications: ["Heavy card cover with Spot UV", "Inner pages on 150 GSM matte", "Perfect bound spine", "Custom landscape/portrait format"]
      }
    ]
  },
  {
    slug: "hospitality",
    title: "Restaurants & Hotels",
    shortTitle: "Hospitality",
    heroHeading: "Durable & Elegant Printing for Restaurants, Cafes & Hotels",
    heroSubheading: "Spill-resistant menu cards, table tent cards, custom food packaging sleeves, paper bags, and brand loyalty stationery.",
    introduction: "Printopia Solutions delivers hospitality print collateral designed for heavy daily use, appetizing visual presentation, and seamless operations. From waterproof menu cards to eco-friendly food packaging sleeves and bill books, we elevate dining and hotel experiences.",
    iconName: "utensils",
    heroImage: images.products.brochure,
    metaTitle: "Restaurant & Hotel Printing & Packaging | Printopia Solutions",
    metaDescription: "Professional hospitality printing for restaurants, cafes, and hotels. Custom menu cards, food packaging sleeves, table tent cards, paper bags, and feedback cards.",
    products: [
      {
        id: "menu-cards",
        name: "Menu Cards",
        description: "Spill-resistant, washable laminated menu cards, hardbound booklets, and tri-fold dining menus.",
        badge: "Washable / Durable",
        specifications: ["Heavy 350 GSM Art Board", "125/250 Micron Thermal Lamination", "Hardbound leatherette fold option", "Vivid food color reproduction"]
      },
      {
        id: "table-tent-cards",
        name: "Table Tent Cards",
        description: "Self-standing promotional tent cards for chef specials, beverage menus, and QR code digital ordering.",
        badge: "Table Promo",
        specifications: ["300 GSM stiff cardstock", "Pre-scored tri-panel fold", "Gloss lamination for easy wiping", "A5 / A6 display sizes"]
      },
      {
        id: "bill-books",
        name: "Bill Books",
        description: "KOT (Kitchen Order Ticket) and guest bill books with duplicate carbonless sheets and sequential numbers.",
        image: images.products.billBook,
        badge: "KOT & Billing",
        specifications: ["NCR Carbonless sheets", "KOT duplicate format", "Sequential red numbering", "Compact waiter pad sizes"]
      },
      {
        id: "food-packaging-sleeves",
        name: "Food Packaging Sleeves",
        description: "Custom printed paper sleeves and bands for burger boxes, takeout containers, and cutlery wrapping.",
        badge: "Takeout Packaging",
        specifications: ["Food-grade certified paperboard", "Oil and moisture resistant coating", "Custom die-cut locking tabs", "Vivid soy ink printing"]
      },
      {
        id: "paper-bags",
        name: "Paper Bags",
        description: "Sturdy takeaway kraft paper bags with wide block bottoms designed to prevent food container spilling.",
        image: images.products.hospitalBags,
        badge: "Takeaway Bags",
        specifications: ["120-180 GSM Kraft paper", "Wide flat bottom base", "Twisted / Flat paper handles", "Grease-resistant liner option"]
      },
      {
        id: "stickers-and-labels",
        name: "Stickers and Labels",
        description: "Tamper-evident food delivery seal stickers and branded packaging labels.",
        image: images.products.stickerLabel,
        badge: "Delivery Seal",
        specifications: ["Waterproof vinyl / Chromo paper", "Tamper-evident void pattern", "Custom die-cut shapes", "Strong food packaging adhesive"]
      },
      {
        id: "delivery-inserts",
        name: "Delivery Inserts",
        description: "Promotional discount cards and thank you notes placed inside delivery packages to boost repeat orders.",
        badge: "Customer Retention",
        specifications: ["150-250 GSM Art Card", "Compact 4x6 / 3.5x2 inch size", "QR code menu/discount link", "High contrast finish"]
      },
      {
        id: "feedback-cards",
        name: "Feedback Cards",
        description: "Elegantly formatted guest comment and rating cards for hotel rooms and restaurant checkouts.",
        badge: "Guest Review",
        specifications: ["Easy write-on matte paper", "Custom rating scales & checkboxes", "Compact envelope pair", "Branded hotel stationery"]
      },
      {
        id: "loyalty-cards",
        name: "Loyalty Cards",
        description: "Stampable loyalty cards and VIP membership cards to reward frequent diners and hotel guests.",
        badge: "Repeat Sales",
        specifications: ["Uncoated cardstock for clean stamp ink", "Matt / Velvet card options", "Standard credit card format", "Custom stamp boxes"]
      },
      {
        id: "restaurant-brochures",
        name: "Restaurant Brochures",
        description: "Catering service catalogues and banqueting event brochures for hotel event sales.",
        image: images.products.brochure,
        badge: "Catering Sales",
        specifications: ["Gate-fold or Tri-fold layouts", "170 GSM Art paper", "High-gloss photographic finish", "Menu highlights & venue photos"]
      },
      {
        id: "visiting-cards",
        name: "Visiting Cards",
        description: "Managerial visiting cards and takeaway contact cards with location map and table booking QR codes.",
        image: images.products.visitingCard,
        badge: "Contact Card",
        specifications: ["350 GSM Art Card", "Matte + Spot UV accent", "Direct WhatsApp / Call QR code", "Standard / Square shapes"]
      }
    ]
  },
  {
    slug: "manufacturing",
    title: "Manufacturers & Industrial Companies",
    shortTitle: "Manufacturing",
    heroHeading: "Heavy-Duty Industrial Printing & Packaging Solutions",
    heroSubheading: "Durable product labels, packaging boxes, instruction manuals, barcode stickers, safety tags, and dispatch logistics documentation.",
    introduction: "Printopia Solutions supports factories, OEMs, exporters, and industrial manufacturers with heavy-duty labels, outer packaging boxes, technical manuals, and compliance documentation engineered to withstand harsh factory and shipping conditions.",
    iconName: "factory",
    heroImage: images.products.stickerLabel,
    metaTitle: "Industrial & Manufacturing Printing & Packaging | Printopia Solutions",
    metaDescription: "Robust industrial printing solutions. Product labels, packaging boxes, instruction manuals, barcode stickers, delivery challans, and safety labels.",
    products: [
      {
        id: "product-labels",
        name: "Product Labels",
        description: "High-adhesion product stickers for machinery, consumer goods, chemical containers, and auto parts.",
        image: images.products.stickerLabel,
        badge: "High Adhesion",
        specifications: ["Waterproof Vinyl / Polyester", "Chemical & heat resistant coating", "Roll or sheet delivery", "Aggressive industrial adhesive"]
      },
      {
        id: "packaging-boxes",
        name: "Packaging Boxes",
        description: "Custom printed corrugated and mono-carton boxes built for product protection and retail shelf display.",
        badge: "Structural Box",
        specifications: ["3-Ply / 5-Ply Corrugated or Duplex Board", "Custom die-cut structures", "Vibrant outer litho printing", "High crush resistance"]
      },
      {
        id: "instruction-manuals",
        name: "Instruction Manuals",
        description: "Multi-page technical operation manuals, user guides, and schematic booklets for machinery and appliances.",
        badge: "Technical Print",
        specifications: ["Saddle-stitched or folded sheet", "60-80 GSM Maplitho paper", "Clear technical diagram print", "Multi-language formatting"]
      },
      {
        id: "product-catalogues",
        name: "Product Catalogues",
        description: "Comprehensive industrial product spec books with detailed technical tables, part numbers, and dimensions.",
        image: images.products.brochure,
        badge: "B2B Sales",
        specifications: ["Heavy art card cover", "Perfect binding or Wire-O", "130-170 GSM inner pages", "High clarity product photos"]
      },
      {
        id: "barcode-stickers",
        name: "Barcode Stickers",
        description: "High-density thermal transfer barcode labels compatible with inventory scanners and automated warehouse systems.",
        image: images.products.stickerLabel,
        badge: "Inventory Tech",
        specifications: ["Scratch-resistant thermal coat", "1D & 2D QR / DataMatrix print", "Sequential serial numbers", "Custom roll core size"]
      },
      {
        id: "warranty-cards",
        name: "Warranty Cards",
        description: "Official warranty certificate cards with unique serial number stamping and registration tear-off slips.",
        badge: "Customer Support",
        specifications: ["250-300 GSM stiff cardstock", "Unique serial numbering", "Writeable matte surface", "Security micro-print"]
      },
      {
        id: "safety-labels",
        name: "Safety Labels",
        description: "Hazardous warning stickers, machinery safety notices, and OSHA-compliant industrial alert signs.",
        badge: "OSHA / Safety",
        specifications: ["UV resistant outdoor vinyl", "High visibility neon / reflex inks", "Weatherproof lamination", "Strong peel strength"]
      },
      {
        id: "dispatch-labels",
        name: "Dispatch Labels",
        description: "Weatherproof shipping and destination labels designed to withstand transit friction and humidity.",
        badge: "Logistics",
        specifications: ["Self-adhesive chromo paper", "Large format address blocks", "Barcode & consignment fields", "Easy peel backing"]
      },
      {
        id: "invoice-books",
        name: "Invoice Books",
        description: "Multi-copy factory invoice books with tax breakdowns, transporter details, and copy classification.",
        image: images.products.billBook,
        badge: "Factory Accounts",
        specifications: ["NCR carbonless sets (1+2, 1+3)", "Original/Duplicate color coding", "Hard backing protection", "Sequential numbering"]
      },
      {
        id: "delivery-challans",
        name: "Delivery Challans",
        description: "Dispatch challan books and material gate pass books for factory gate security and inventory tracking.",
        badge: "Gate Control",
        specifications: ["Duplicate / Triplicate sets", "Perforated tear sheets", "Custom gate pass fields", "Durable cloth spine binding"]
      },
      {
        id: "corporate-stationery",
        name: "Corporate Stationery",
        description: "Factory administration letterheads, visiting cards, envelopes, and official voucher books.",
        image: images.products.visitingCard,
        badge: "Admin Print",
        specifications: ["Matched corporate Pantone colors", "High whiteness bond paper", "Consistent brand identity", "Bulk supply packages"]
      }
    ]
  },
  {
    slug: "retail",
    title: "Retail & Local Businesses",
    shortTitle: "Retail",
    heroHeading: "High-Conversion Printing & Packaging for Retail & Shops",
    heroSubheading: "Eye-catching shopping bags, product stickers, price tags, flyers, posters, and customer loyalty rewards.",
    introduction: "Printopia Solutions helps retail stores, fashion boutiques, supermarkets, jewelry showrooms, and local businesses turn window shoppers into loyal customers. Our retail print collateral combines vibrant colors, sturdy packaging, and compelling promotional messaging.",
    iconName: "shopping-bag",
    heroImage: images.products.hospitalBags,
    metaTitle: "Retail & Local Business Printing Solutions | Printopia Solutions",
    metaDescription: "Customized retail print products for shops and local businesses. Shopping bags, product stickers, price tags, flyers, posters, and loyalty cards.",
    products: [
      {
        id: "shopping-bags",
        name: "Shopping Bags",
        description: "Custom branded luxury shopping bags with reinforced rope handles, metallic foil accents, and high load strength.",
        image: images.products.hospitalBags,
        badge: "Retail Hero",
        specifications: ["170-250 GSM Art Board / Kraft", "Cotton rope / Ribbon handles", "Matt or Gloss lamination", "Reinforced card bottom"]
      },
      {
        id: "product-stickers",
        name: "Product Stickers",
        description: "Vivid product branding stickers, seal labels, and discount tags for retail packaging.",
        image: images.products.stickerLabel,
        badge: "Branding",
        specifications: ["Glossy paper / Clear vinyl", "Custom die-cut contour shapes", "Permanent or removable adhesive", "Vibrant CMYK colors"]
      },
      {
        id: "price-tags",
        name: "Price Tags",
        description: "Garment hang tags, price labels, and barcode product tags with pre-punched string holes.",
        badge: "Garment & Goods",
        specifications: ["300-350 GSM Stiff Art Card", "Pre-punched hole slot", "Matte / Gloss or Spot UV finish", "Double-sided branding"]
      },
      {
        id: "flyers",
        name: "Flyers",
        description: "High-impact promotional leaflets for store grand openings, seasonal sales, and local distribution.",
        image: images.products.flyers,
        badge: "Promotions",
        specifications: ["130-170 GSM Gloss Art paper", "A5 / A4 / DL formats", "Vibrant photographic print", "Fast turn-around print"]
      },
      {
        id: "posters",
        name: "Posters",
        description: "Vibrant promotional store posters and window display graphics that attract foot traffic.",
        badge: "Store Display",
        specifications: ["170-250 GSM Premium Poster Paper", "A3, A2, A1 large formats", "High resolution color depth", "Optional moisture lamination"]
      },
      {
        id: "visiting-cards",
        name: "Visiting Cards",
        description: "Store contact cards with QR codes linking to Google Maps location and Instagram store catalog.",
        image: images.products.visitingCard,
        badge: "Store Contact",
        specifications: ["350 GSM Art Card", "Soft touch matte coating", "Store address & map print", "Spot UV highlight option"]
      },
      {
        id: "bill-books",
        name: "Bill Books",
        description: "Duplicate cash memo books and GST retail bill books with clear perforations.",
        image: images.products.billBook,
        badge: "Cash Memo",
        specifications: ["NCR Carbonless sheets", "Custom shop header print", "Sequential numbering", "Sturdy book binding"]
      },
      {
        id: "loyalty-cards",
        name: "Loyalty Cards",
        description: "Customer loyalty stamp cards that motivate repeat visits and reward loyal store shoppers.",
        badge: "Repeat Buyers",
        specifications: ["Easy-stamp uncoated cardstock", "10-stamp box layout", "Wallet friendly size", "Attractive promotional text"]
      },
      {
        id: "product-catalogues",
        name: "Product Catalogues",
        description: "Mini product lookbooks and seasonal collection catalogues for retail shoppers.",
        image: images.products.brochure,
        badge: "Lookbook",
        specifications: ["Saddle-stitched booklet format", "150 GSM glossy inner pages", "Vivid product color matching", "Compact handbag size"]
      },
      {
        id: "promotions-leaflets",
        name: "Promotional Leaflets",
        description: "Door-to-door promotional leaflets and newspaper inserts highlighting discount offers.",
        image: images.products.flyers,
        badge: "Local Reach",
        specifications: ["Lightweight 90-130 GSM paper", "High speed web/offset print", "Cost-effective bulk orders", "High contrast offer callouts"]
      }
    ]
  }
];

export const WHY_CHOOSE_PRINTOPIA = [
  {
    title: "Custom Sizes",
    description: "Every industry has distinct dimensions. We offer fully bespoke die-cuts, custom lengths, and tailored specifications for every product.",
    icon: "Ruler"
  },
  {
    title: "Quality Printing",
    description: "State-of-the-art German offset presses and high-definition digital equipment ensure razor-sharp text, vibrant colors, and precise registration.",
    icon: "CheckCircle"
  },
  {
    title: "Bulk Order Support",
    description: "Scalable manufacturing infrastructure capable of handling large-volume institutional contracts with consistent quality control.",
    icon: "Layers"
  },
  {
    title: "Fast Delivery",
    description: "Streamlined production scheduling and reliable pan-India logistics to meet urgent event dates and tight institutional deadlines.",
    icon: "Truck"
  },
  {
    title: "Competitive Pricing",
    description: "Direct-from-manufacturer transparent pricing with maximum cost-efficiency for recurring B2B orders.",
    icon: "Tag"
  },
  {
    title: "Design Assistance",
    description: "Our in-house prepress team assists with layout design, artwork proofing, dimension adjustments, and print preparation.",
    icon: "Palette"
  }
];
