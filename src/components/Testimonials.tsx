import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, User } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Sameer Gupta',
    role: 'Medical Director',
    content: 'The quality of the OPD files and prescription pads provided by Printopia is exceptional. Their understanding of medical stationery requirements is unparalleled.',
    rating: 5
  },
  {
    id: 2,
    name: 'Rajesh Khanna',
    role: 'Procurement Head',
    content: 'We have been partnering with Printopia for over 3 years now. Their fast turnaround time and GST compliant billing make them our preferred vendor.',
    rating: 5
  },
  {
    id: 3,
    name: 'Meera Deshmukh',
    role: 'Hospital Administrator',
    content: 'The patient identification bands and test report files are durable and professionally printed. Highly recommended for any hospital looking for quality.',
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none animate-bg-float-slow">
        <Quote size={200} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Client Testimonials
          </motion.h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            See what healthcare administrators and medical professionals say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800 p-8 rounded-3xl border border-neutral-700 hover:border-blue-500 transition-colors duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-300 mb-6 italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t.name}</h4>
                  <p className="text-blue-400 text-xs font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

