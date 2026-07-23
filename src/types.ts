/**
 * Types and interfaces for Printopia Solutions Home Page
 */

export interface NavItem {
  label: string;
  id: string; // 'home', 'products', 'about', 'guide', 'faq', 'contact'
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  image: string;
  accentColor: string;
  ctaText: string;
}

export interface PrintCategory {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  specs: string[];
}

export interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface PaperConfigurator {
  category: string;
  paperType: string;
  finish: string;
  quantity: number;
  customDesign: boolean;
}
