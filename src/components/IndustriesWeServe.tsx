import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const industries = [
  {
    number: "01",
    title: "Hospitals",
    description: "Patient files, report pads, envelopes, forms, bags and institutional stationery."
  },
  {
    number: "02",
    title: "Diagnostic Centres",
    description: "Lab envelopes, test report folders, report sheets, stickers and branded stationery."
  },
  {
    number: "03",
    title: "Clinics",
    description: "Prescription pads, OPD files, letterheads, appointment cards and forms."
  },
  {
    number: "04",
    title: "Pathology Laboratories",
    description: "Sample labels, lab envelopes, report folders, requisition forms and barcode stickers."
  },
  {
    number: "05",
    title: "Nursing Homes",
    description: "Admission forms, discharge folders, patient records, bill books and hospital stationery."
  }
];

export default function IndustriesWeServe() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const panelVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 25 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section 
      id="industries-we-serve" 
      className="bg-[#F4F7FA] py-20 lg:py-28 text-[#0A192F]"
      aria-labelledby="industries-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-[11px] font-mono tracking-[0.2em] font-extrabold text-blue-600 uppercase mb-4 block">
            INDUSTRIES WE SERVE
          </span>
          <h2 
            id="industries-heading"
            className="font-display text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-[#0A192F] mb-6"
          >
            Printing Solutions for Healthcare Businesses
          </h2>
          <p className="text-base lg:text-[18px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            We support different healthcare institutions with customized printed products for daily operations, patient communication and brand presentation.
          </p>
        </div>

        {/* 5-Column Responsive Panel Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.number}
              variants={panelVariants}
              className="group flex flex-col justify-between p-6 sm:p-8 bg-transparent hover:bg-white/60 border-b border-neutral-200 hover:border-blue-600 transition-all duration-300 min-h-[320px] text-left"
            >
              <div>
                {/* Industry Number */}
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600/60 group-hover:text-blue-600 transition-colors duration-300 block mb-4">
                  {industry.number}
                </span>

                {/* Industry Title */}
                <h3 className="text-xl sm:text-[28px] font-bold text-[#0A192F] leading-tight mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                  {industry.title}
                </h3>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-neutral-200 group-hover:bg-blue-600 transition-colors duration-300 mb-4" />

                {/* Supporting Text */}
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  {industry.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4">
                <Link
                  to="/industries/healthcare"
                  className="inline-flex items-center space-x-1 text-xs font-bold tracking-wider uppercase text-neutral-400 group-hover:text-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
