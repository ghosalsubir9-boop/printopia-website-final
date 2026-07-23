import { images } from "./data/imageMap";

export interface PremiumSlide {
  id: number;
  product: string;
  headline: string;
  description: string;
  image: string;
  accentBg: string; // Tailwind class for abstract shape background
  shadowColor: string;
}

export const HERO_SLIDES: PremiumSlide[] = [
  {
    id: 1,
    product: "Report Pad",
    headline: "Premium Report Pad Printing for Hospitals & Diagnostic Centres",
    description: "Manufactured with premium paper quality and customized specifications for hospitals and diagnostic centres.",
    image: images.products.reportPad,
    accentBg: "from-blue-500/20 to-cyan-500/10",
    shadowColor: "rgba(14,165,233,0.15)"
  },
  {
    id: 2,
    product: "Lab Envelope",
    headline: "Custom Lab Envelope Printing",
    description: "Premium window and non-window laboratory envelopes designed for healthcare professionals.",
    image: images.products.labEnvelope,
    accentBg: "from-indigo-500/20 to-blue-500/10",
    shadowColor: "rgba(99,102,241,0.15)"
  },
  {
    id: 3,
    product: "OPD File",
    headline: "Professional OPD File Manufacturing",
    description: "Custom printed OPD files with pocket and clip options.",
    image: images.products.opdFile,
    accentBg: "from-sky-500/20 to-indigo-500/10",
    shadowColor: "rgba(56,189,248,0.15)"
  },
  {
    id: 4,
    product: "Hospital Bags",
    headline: "Premium Hospital Carry Bags",
    description: "Paper Bags, PP Bags and Non-Woven Bags manufactured for hospitals and diagnostic centres.",
    image: images.products.hospitalBags,
    accentBg: "from-cyan-500/20 to-blue-500/10",
    shadowColor: "rgba(6,182,212,0.15)"
  }
];

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  badge: string;
  accentBg: string;
  colSpanDesktop: string;
  features: string[];
  image: string;
}

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "Report Pad",
    description: "Custom hospital prescription and medical report pads printed on premium uncoated paper for perfect medical legibility.",
    badge: "Prescription Pads & Medical Charts",
    accentBg: "from-cyan-500/15 to-blue-500/5",
    colSpanDesktop: "md:col-span-7",
    features: ["FSC-Certified 80-100gsm Uncoated Paper", "Prescription & Case Sheet Specifications", "Pre-padded with Heavy Backboard Support"],
    image: images.products.reportPad
  },
  {
    id: 2,
    name: "Lab Envelope",
    description: "High-integrity clinical envelopes featuring precision window cutouts and heavy-duty secure flap seals for diagnostics.",
    badge: "Confidential Window Envelopes",
    accentBg: "from-blue-500/15 to-indigo-500/5",
    colSpanDesktop: "md:col-span-5",
    features: ["High-grade 120gsm Cartridge Stock", "Premium Matte or Polycarbonate Window", "Pressure Sensitive Self-Adhesive Flap"],
    image: images.products.labEnvelope
  },
  {
    id: 3,
    name: "OPD File",
    description: "Ergonomically engineered patient record files with optional heavy-duty metallic clip binders and inner document pockets.",
    badge: "Patient Case History Folders",
    accentBg: "from-indigo-500/15 to-sky-500/5",
    colSpanDesktop: "md:col-span-5",
    features: ["Heavy Duty 350-450gsm Imported Cardboard", "Creased Spine with Optional Steel Clips", "Custom Pockets for Diagnostic Report Slits"],
    image: images.products.opdFile
  },
  {
    id: 4,
    name: "Hospital Bags",
    description: "Sustainably-crafted, reinforced hospital carry bags in premium medical-grade paper, non-woven, and polypropylene materials.",
    badge: "Eco-Friendly B2B Packaging",
    accentBg: "from-sky-500/15 to-cyan-500/5",
    colSpanDesktop: "md:col-span-7",
    features: ["Biocompatible Kraft & Polypropylene Bags", "Reinforced Block Bottom & Rigid Handles", "Water-resistant Ink with High Tear-Strength"],
    image: images.products.hospitalBags
  }
];
