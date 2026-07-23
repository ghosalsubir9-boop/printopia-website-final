import React from 'react';
import { motion } from 'motion/react';

const clientLogos = [
  { id: 1, name: 'Apollo Hospitals' },
  { id: 2, name: 'Fortis Healthcare' },
  { id: 3, name: 'Max Healthcare' },
  { id: 4, name: 'Medanta' },
  { id: 5, name: 'Tata Memorial' },
  { id: 6, name: 'Manipal Hospitals' },
  { id: 7, name: 'Narayana Health' },
  { id: 8, name: 'Cloudnine' },
  { id: 9, name: 'Columbia Asia' },
  { id: 10, name: 'AMRI Hospitals' },
  { id: 11, name: 'Peerless Hospital' },
  { id: 12, name: 'Belle Vue Clinic' },
  { id: 13, name: 'Woodlands Hospital' },
  { id: 14, name: 'Ruby General' },
  { id: 15, name: 'Desun Hospital' },
  // Placeholders for 30+ logos
  ...Array.from({ length: 15 }).map((_, i) => ({ id: i + 16, name: `Partner ${i + 16}` }))
];

export const ClientTrust: React.FC = () => {
  return (
    <section className="py-20 bg-[#F2F8FC] border-b border-blue-100/60 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
        >
          Trusted by Healthcare Professionals
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 max-w-2xl mx-auto"
        >
          Serving hospitals, diagnostic centres, clinics and healthcare brands with premium printing solutions.
        </motion.p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex whitespace-nowrap items-center">
          {clientLogos.map((logo) => (
            <div 
              key={logo.id} 
              className="mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="w-32 h-16 bg-neutral-200 rounded flex items-center justify-center text-neutral-400 font-bold text-xs p-2 text-center">
                {logo.name}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 flex whitespace-nowrap items-center">
          {clientLogos.map((logo) => (
            <div 
              key={`${logo.id}-clone`} 
              className="mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="w-32 h-16 bg-neutral-200 rounded flex items-center justify-center text-neutral-400 font-bold text-xs p-2 text-center">
                {logo.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
