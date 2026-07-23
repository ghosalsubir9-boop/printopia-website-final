import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Printer, Zap, Award, FileCheck, Headset } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Healthcare Printing Specialists',
    description: 'Expertise in medical stationery and packaging that meets healthcare standards.',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    icon: Printer,
    title: 'Premium Offset Printing',
    description: 'High-definition offset technology for crisp, professional, and consistent results.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    icon: Zap,
    title: 'Fast Turnaround Time',
    description: 'Efficient production processes to ensure your hospital stays stocked without delays.',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Rigorous multi-point quality checks for every batch before final dispatch.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    icon: FileCheck,
    title: 'GST Invoice',
    description: 'Full GST compliant billing for all business orders to ensure seamless accounting.',
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    icon: Headset,
    title: 'Dedicated Customer Support',
    description: 'A personal account manager for bulk orders and institutional partnerships.',
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#F2F8FC] overflow-hidden border-y border-blue-100/60">
      {/* Subtle Line-Art Illustration of Offset Printing Machine & Workflow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-[0.16] text-[#0C3855] overflow-hidden animate-bg-drift-slow">
        <svg viewBox="0 0 500 500" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
          {/* Printing Cylinders & Press Rollers */}
          <circle cx="150" cy="180" r="60" strokeWidth="1.8" />
          <circle cx="150" cy="180" r="48" strokeDasharray="4 4" />
          <circle cx="150" cy="180" r="10" fill="currentColor" />
          <circle cx="270" cy="240" r="75" strokeWidth="1.8" />
          <circle cx="270" cy="240" r="58" strokeDasharray="5 5" />
          <circle cx="270" cy="240" r="14" fill="currentColor" />
          <circle cx="150" cy="340" r="50" strokeWidth="1.8" />
          <circle cx="150" cy="340" r="8" fill="currentColor" />
          {/* Paper Web Stream Path */}
          <path d="M 30 180 Q 90 180 150 120 T 270 165 T 150 390 L 450 390" strokeWidth="2.5" />
          <circle cx="380" cy="170" r="35" strokeWidth="1.5" />
          <path d="M 380 135 L 380 205 M 345 170 L 415 170" strokeWidth="1" />
          <path d="M 50 420 L 450 420 M 50 432 L 450 432" strokeWidth="1.2" strokeDasharray="8 6" />
          <rect x="330" y="340" width="100" height="50" rx="6" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Decorative Geometric Circles & Abstract Shapes */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-2 border-[#0C3855]/18 pointer-events-none animate-bg-rotate" />
      <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full border border-[#0C7D8D]/22 pointer-events-none animate-bg-float" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-2 border-[#0C3855]/18 pointer-events-none animate-bg-rotate-reverse" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full border border-[#0C7D8D]/22 pointer-events-none animate-bg-float-slow" />
      <div className="absolute top-1/4 left-10 w-40 h-40 bg-[#0C7D8D]/18 rounded-full blur-2xl pointer-events-none animate-bg-pulse" />
      <div className="absolute bottom-1/4 right-10 w-52 h-52 bg-[#0C3855]/18 rounded-full blur-3xl pointer-events-none animate-bg-pulse-delayed" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            Why Choose Printopia?
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            className="h-1.5 bg-[#0C3855] mx-auto rounded-full mb-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
