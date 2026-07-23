import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const benefits = [
  {
    number: "01",
    title: "Healthcare Printing Focus",
    description: "Products and specifications are planned specifically for hospitals, diagnostic centres, clinics and pathology laboratories."
  },
  {
    number: "02",
    title: "Customized Manufacturing",
    description: "Size, paper, GSM, branding, finishing and quantity can be customized according to each institution’s requirement."
  },
  {
    number: "03",
    title: "Free Basic Design Support",
    description: "Basic artwork setup and design assistance are available with confirmed printing orders."
  },
  {
    number: "04",
    title: "Quality Checked Production",
    description: "Printing, finishing and packing are checked carefully before dispatch."
  }
];

export default function WhyPrintopia() {
  return (
    <section 
      id="why-printopia" 
      className="bg-neutral-50 py-20 lg:py-28 text-[#0A192F] border-t border-neutral-100"
      aria-labelledby="why-printopia-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading & Introduction */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-[11px] font-mono tracking-[0.2em] font-extrabold text-[#0C3855] uppercase mb-4 block">
              WHY PRINTOPIA
            </span>
            
            <h2 
              id="why-printopia-heading" 
              className="font-display text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold tracking-tight leading-[1.15] mb-6 text-[#0A192F]"
            >
              Why Healthcare Businesses Choose Printopia
            </h2>
            
            <p className="text-base lg:text-[18px] text-gray-500 leading-relaxed mb-8 max-w-lg">
              We combine healthcare printing experience, customized manufacturing and careful quality control to deliver reliable print solutions for hospitals, diagnostic centres, clinics and laboratories.
            </p>
            
            <Link 
              to="/about"
              className="inline-flex items-center space-x-1.5 text-sm font-semibold text-blue-600 hover:text-[#0C3855] transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4 rounded-md py-1"
              id="why-printopia-cta"
            >
              <span>Learn About Our Process</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right Column: Numbered Benefit Rows */}
          <div className="lg:col-span-7 border-t border-neutral-200">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group py-8 flex flex-col sm:flex-row gap-4 sm:gap-8 text-left border-b border-neutral-200 hover:border-blue-600 transition-colors duration-300 relative"
              >
                {/* Large Number */}
                <div className="sm:w-16 shrink-0">
                  <span className="font-display text-[48px] md:text-[64px] font-extrabold text-blue-500/20 group-hover:text-blue-600 transition-colors duration-300 leading-none select-none">
                    {benefit.number}
                  </span>
                </div>
                
                {/* Content Block */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl sm:text-[28px] font-bold text-[#0A192F] transition-transform duration-300 group-hover:translate-x-1 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed max-w-xl">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
