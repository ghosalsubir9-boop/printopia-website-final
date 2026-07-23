import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare, ShieldCheck } from 'lucide-react';

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section 
      id="final-call-to-action" 
      className="bg-[#0C3855] py-24 lg:py-32 text-white relative overflow-hidden"
    >
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none animate-bg-drift-slow">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div 
        className="max-w-[1000px] mx-auto px-6 sm:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
          <ShieldCheck size={14} className="text-blue-300" />
          B2B Healthcare Partnerships
        </motion.div>
        
        <motion.h2 
          variants={itemVariants}
          className="text-[32px] sm:text-[46px] lg:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-8"
        >
          Need Custom Hospital Printing?
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Join 500+ healthcare brands across India. Get premium quality medical stationery with GST invoicing and fast turnaround.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto h-16 px-10 inline-flex items-center justify-center bg-white text-[#0C3855] text-sm font-bold uppercase tracking-wider rounded-2xl shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            Request a B2B Quotation
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="tel:+919432436942"
            className="w-full sm:w-auto h-16 px-10 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-xl transition-all"
          >
            <Phone className="w-5 h-5 mr-3" />
            Call Now
          </a>

          <a
            href={`https://wa.me/919432436942?text=${encodeURIComponent("Hello Printopia Solutions, I would like to discuss a printing project for my hospital/clinic.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-16 px-10 inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-xl transition-all"
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            WhatsApp
          </a>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-8 text-[11px] font-mono tracking-widest text-blue-200/60 uppercase"
        >
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Bulk Institutional Rates</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Pan-India Delivery</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Free Design Proofs</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
