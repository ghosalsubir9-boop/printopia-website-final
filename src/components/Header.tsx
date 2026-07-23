import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Stethoscope, 
  GraduationCap, 
  Briefcase, 
  Utensils, 
  Factory, 
  ShoppingBag
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { images } from '../data/imageMap';

interface HeaderProps {
  onRequestQuote?: () => void;
}

const navItems = [
  { label: 'Home', id: 'home', path: '/' },
  { label: 'About Us', id: 'about', path: '/about' },
  { label: 'Industries', id: 'industries', path: '/industries', hasDropdown: true },
  { label: 'Products', id: 'products', path: '/products' },
  { label: 'Blog', id: 'guide', path: '/printing-guide' },
  { label: 'Contact', id: 'contact', path: '/contact' },
];

const industryDropdownItems = [
  { name: 'Hospitals & Diagnostic Centres', path: '/industries/healthcare', icon: Stethoscope },
  { name: 'Schools & Educational Institutions', path: '/industries/education', icon: GraduationCap },
  { name: 'Corporate Offices', path: '/industries/corporate', icon: Briefcase },
  { name: 'Restaurants & Hotels', path: '/industries/hospitality', icon: Utensils },
  { name: 'Manufacturers & Industrial Companies', path: '/industries/manufacturing', icon: Factory },
  { name: 'Retail & Local Businesses', path: '/industries/retail', icon: ShoppingBag },
];

export default function Header({ onRequestQuote }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const getActiveId = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.startsWith('/products')) return 'products';
    if (path.startsWith('/industries')) return 'industries';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/printing-guide')) return 'guide';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const currentActive = getActiveId();

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      id="app-header"
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 h-[76px] transition-all duration-300 ease-in-out border-b border-white/10 ${
        scrolled
          ? 'bg-[#0C3855]/95 backdrop-blur-[18px] shadow-lg shadow-black/15'
          : 'bg-[#0C3855]/80 backdrop-blur-[18px] shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo Brand Mark (Left) */}
          <button
            id="header-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg p-1 -ml-1"
            aria-label="Printopia Solutions Home"
          >
            <img
              src={images.logo}
              alt="Printopia Logo"
              width={150}
              height={45}
              className="w-auto h-[32px] sm:h-[42px] object-contain transition-transform duration-300 group-hover:scale-105"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="45" viewBox="0 0 150 45"><rect width="100%" height="100%" fill="none"/><text x="10" y="28" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23BED7EB">PRINTOPIA</text></svg>';
              }}
            />
          </button>

          {/* Desktop Navigation Links (Center/Right) */}
          <nav
            id="desktop-nav"
            role="navigation"
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-1 bg-white/10 p-1 rounded-full border border-white/15 backdrop-blur-md"
          >
            {navItems.map((item) => {
              const isActive = currentActive === item.id;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <button
                      id={`nav-item-${item.id}`}
                      onClick={() => handleNavClick(item.path)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/75 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-bg"
                          className="absolute inset-0 bg-[#0C7D8D] shadow-md rounded-full -z-10 border border-white/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute left-0 top-full pt-2 w-80 z-50"
                        >
                          <div className="bg-[#0C3855]/98 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-2 space-y-1">
                            <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                              <span className="text-[10px] font-extrabold tracking-widest text-[#BED7EB] uppercase">
                                Industries We Serve
                              </span>
                              <button
                                onClick={() => handleNavClick('/industries')}
                                className="text-[11px] font-bold text-[#BED7EB] hover:text-white underline uppercase tracking-wider"
                              >
                                View All
                              </button>
                            </div>

                            {industryDropdownItems.map((ind) => {
                              const IconComponent = ind.icon;
                              const isSubActive = location.pathname === ind.path;
                              return (
                                <button
                                  key={ind.path}
                                  onClick={() => handleNavClick(ind.path)}
                                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                                    isSubActive
                                      ? 'bg-[#0C7D8D] text-white font-bold shadow-sm'
                                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  <div className={`p-1.5 rounded-lg shrink-0 ${isSubActive ? 'bg-white/20 text-white' : 'bg-white/10 text-[#BED7EB]'}`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <span className="truncate">{ind.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-[#0C7D8D] shadow-md rounded-full -z-10 border border-white/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle (Right) */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation (Full-screen Slide Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden fixed inset-x-0 top-[76px] bg-[#0C3855]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl overflow-y-auto max-h-[calc(100vh-76px)] z-40"
          >
            <div className="px-6 pt-5 pb-8 space-y-3">
              {navItems.map((item) => {
                const isActive = currentActive === item.id;

                if (item.hasDropdown) {
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleNavClick(item.path)}
                          className={`flex-1 text-left px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#0C7D8D] text-white shadow-md border border-white/20'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {item.label} Overview
                        </button>
                        <button
                          onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                          className="p-3 text-white/80 hover:text-white"
                          aria-label="Toggle Industries Submenu"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Mobile Expandable Submenu */}
                      <AnimatePresence>
                        {mobileIndustriesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 pr-2 space-y-1.5 overflow-hidden"
                          >
                            {industryDropdownItems.map((ind) => {
                              const IconComp = ind.icon;
                              return (
                                <button
                                  key={ind.path}
                                  onClick={() => handleNavClick(ind.path)}
                                  className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 flex items-center space-x-2.5 transition-colors"
                                >
                                  <IconComp className="w-4 h-4 text-[#BED7EB]" />
                                  <span className="truncate">{ind.name}</span>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    id={`mobile-nav-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0C7D8D] text-white shadow-md border border-white/20'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
