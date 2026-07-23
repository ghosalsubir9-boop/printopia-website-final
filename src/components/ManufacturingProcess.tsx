import React from 'react';
import { motion } from 'motion/react';
import { Layout, Sliders, Printer, Scissors, ShieldCheck, Truck, ChevronRight } from 'lucide-react';

const processSteps = [
  {
    icon: Layout,
    stepNum: "01",
    title: "Requirement Discussion",
    subtitle: "Consultation & Scope",
    description: "Detailed analysis of hospital stationery requirements, paper specifications, and volume planning.",
    accentColor: "from-[#0C3855] to-[#0C7D8D]"
  },
  {
    icon: Sliders,
    stepNum: "02",
    title: "Design Verification",
    subtitle: "Layout & Proof Approval",
    description: "Healthcare artwork layout setup, medical standard checks, logo alignment, and digital proofing.",
    accentColor: "from-[#0C7D8D] to-cyan-600"
  },
  {
    icon: Printer,
    stepNum: "03",
    title: "Printing",
    subtitle: "High-Precision Press",
    description: "Multi-color Heidelberg offset and digital printing for crisp clinical text and sharp color reproduction.",
    accentColor: "from-blue-700 to-[#0C3855]"
  },
  {
    icon: Scissors,
    stepNum: "04",
    title: "Finishing",
    subtitle: "Cutting, Binding & Coating",
    description: "Precision die-cutting, folding, UV varnish coating, numbering, and durable binding for daily hospital use.",
    accentColor: "from-[#0C3855] to-teal-700"
  },
  {
    icon: ShieldCheck,
    stepNum: "05",
    title: "Quality Inspection",
    subtitle: "Multi-Point QA Check",
    description: "Rigorous paper GSM testing, barcode scan validation, color consistency, and dimensional accuracy checks.",
    accentColor: "from-emerald-600 to-teal-700"
  },
  {
    icon: Truck,
    stepNum: "06",
    title: "Delivery",
    subtitle: "Secure Logistics Dispatch",
    description: "Moisture-proof master carton boxing and rapid logistics dispatch directly to healthcare facilities.",
    accentColor: "from-sky-700 to-[#0C3855]"
  }
];

export const ManufacturingProcess: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden border-y border-blue-100/60">
      {/* Blueprint-Style Printing Pattern (14% Opacity) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.14] overflow-hidden animate-bg-drift">
        <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="process-blueprint-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0C3855" strokeWidth="0.8" />
              <rect x="10" y="10" width="30" height="30" fill="none" stroke="#0C7D8D" strokeWidth="0.6" strokeDasharray="4 4" />
              <circle cx="60" cy="20" r="8" fill="none" stroke="#0C3855" strokeWidth="0.6" />
              <line x1="60" y1="8" x2="60" y2="32" stroke="#0C3855" strokeWidth="0.5" />
              <line x1="48" y1="20" x2="72" y2="20" stroke="#0C3855" strokeWidth="0.5" />
              <circle cx="25" cy="60" r="2" fill="#0C7D8D" />
              <circle cx="60" cy="60" r="2" fill="#0C3855" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#process-blueprint-pattern)" />
        </svg>
      </div>

      {/* Abstract Blurred Circles and Soft Geometric Shapes in Section Corners */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0C7D8D]/18 rounded-full blur-3xl pointer-events-none animate-bg-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0C3855]/18 rounded-full blur-3xl pointer-events-none animate-bg-pulse-delayed" />
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-72 h-72 rounded-full border border-dashed border-[#0C3855]/18 pointer-events-none hidden lg:block animate-bg-rotate" />
      <div className="absolute top-1/3 right-8 w-60 h-60 rounded-full border border-[#0C7D8D]/22 pointer-events-none hidden lg:block animate-bg-rotate-reverse" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#0C3855] font-extrabold uppercase block">
            PRECISION MANUFACTURING WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-neutral-950 tracking-tight uppercase">
            Our Printing Process
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0C3855] to-[#0C7D8D] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-2">
            From digital artwork preparation to final hospital delivery, our 6-stage quality workflow guarantees unmatched printing precision for every medical order.
          </p>
        </div>

        {/* 6-Step Timeline Process Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-16 left-12 right-12 h-0.5 bg-gradient-to-r from-[#0C3855]/20 via-[#0C7D8D]/30 to-[#0C3855]/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.stepNum}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group flex flex-col bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-[#0C7D8D]/40 transition-all duration-300 text-left relative"
              >
                {/* Step Number Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-black text-[#0C3855] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {step.stepNum}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1 mb-3">
                  <h3 className="text-base font-display font-black text-neutral-950 tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-[#0C7D8D] uppercase tracking-wide">
                    {step.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-500 leading-relaxed flex-grow">
                  {step.description}
                </p>

                {/* Connecting arrow for desktop inside cards */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-16 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-white border border-neutral-200 text-[#0C3855] flex items-center justify-center shadow-xs">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

