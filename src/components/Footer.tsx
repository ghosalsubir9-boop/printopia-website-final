import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  ExternalLink, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Clock, 
  ShieldCheck, 
  Printer, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { motion } from 'motion/react';
import { images } from '../data/imageMap';

interface FooterProps {
  onRequestQuote?: () => void;
}

export default function Footer({ onRequestQuote }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A192F] text-white pt-24 pb-12 overflow-hidden relative border-t border-white/5">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-50" />
      <div className="absolute bottom-0 right-0 p-24 opacity-5 pointer-events-none">
        <Printer size={300} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          {/* Company Info */}
          <div className="space-y-8 text-left lg:col-span-3">
            <div className="flex flex-col items-start">
              <Link to="/" onClick={handleLinkClick}>
                <img 
                  src={images.logo} 
                  alt="Printopia Solutions" 
                  width={150}
                  height={45}
                  className="h-12 w-auto mb-6 brightness-0 invert" 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="45" viewBox="0 0 150 45"><rect width="100%" height="100%" fill="none"/><text x="10" y="28" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23FFFFFF">PRINTOPIA</text></svg>';
                    console.warn("Missing logo:", e.currentTarget.src);
                  }}
                />
              </Link>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                Specialized B2B healthcare printing partner for hospitals, diagnostic centres, and clinics. Delivering precision and quality across India.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, backgroundColor: '#2563eb' }}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center transition-all border border-slate-700/50"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left lg:col-span-2">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "Industries", href: "/industries" },
                { label: "About Us", href: "/about" },
                { label: "Our Products", href: "/products" },
                { label: "Printing Guide", href: "/printing-guide" },
                { label: "Contact Us", href: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href} 
                    onClick={handleLinkClick}
                    className="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors text-[15px]"
                  >
                    <ArrowRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="text-left lg:col-span-2">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              B2B Products
            </h4>
            <ul className="space-y-4">
              {[
                "Hospital Report Pads",
                "Diagnostic Envelopes",
                "Patient ID Bands",
                "OPD Files & Folders",
                "Medical Bill Books",
                "Radiology Bags"
              ].map((product, i) => (
                <li key={i} className="text-slate-400 flex items-center gap-2 text-[15px]">
                  <CheckCircle2 size={14} className="text-blue-500/50" />
                  {product}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-8 text-left lg:col-span-5">
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Contact Details
              </h4>
              
              {/* Three Address Blocks */}
              <div className="space-y-4 mb-6">
                {/* 1. Registered Office */}
                <div className="flex items-start gap-3 group">
                  <MapPin className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <div className="text-xs sm:text-sm leading-snug">
                    <span className="font-bold text-slate-200 block mb-0.5">Registered Office</span>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                      Ghoshpur, South Garia<br />
                      South 24 Parganas, West Bengal – 743613
                    </p>
                  </div>
                </div>

                {/* 2. Manufacturing Unit */}
                <div className="flex items-start gap-3 group">
                  <MapPin className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <div className="text-xs sm:text-sm leading-snug">
                    <span className="font-bold text-slate-200 block mb-0.5">Manufacturing Unit</span>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                      Langalberia, Dakshin Gobindapur<br />
                      Kolkata – 700145
                    </p>
                  </div>
                </div>

                {/* 3. Kolkata Office */}
                <div className="flex items-start gap-3 group">
                  <MapPin className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <div className="text-xs sm:text-sm leading-snug">
                    <span className="font-bold text-slate-200 block mb-0.5">Kolkata Office</span>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                      362/5 Kalitala Road, Purbachal<br />
                      Kolkata – 700078
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone, Email & Working Hours Below Addresses */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 group">
                  <Phone className="text-blue-500 shrink-0" size={16} />
                  <a href="tel:+919432436942" className="text-slate-300 hover:text-white font-medium transition-colors">
                    +91 94324 36942
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <Mail className="text-blue-500 shrink-0" size={16} />
                  <a href="mailto:solutionsprintopia@gmail.com" className="text-slate-300 hover:text-white font-medium transition-colors">
                    solutionsprintopia@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Clock className="text-blue-500 shrink-0" size={16} />
                  <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">Stay Updated</h4>
              <form className="relative">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 pr-12 text-xs focus:outline-none focus:border-blue-500 transition-all text-slate-200 placeholder:text-slate-500"
                />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-white transition-colors p-1">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-slate-800 py-10 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <ShieldCheck size={20} className="text-blue-500" />
            GST Compliant Billing
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <CheckCircle2 size={20} className="text-blue-500" />
            Healthcare Specialist
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Printer size={20} className="text-blue-500" />
            High Precision Offset
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-sm">
          <p>© {currentYear} Printopia Solutions. All Rights Reserved. Crafted for Healthcare Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
