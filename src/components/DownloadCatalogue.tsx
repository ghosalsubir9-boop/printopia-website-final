import React from 'react';
import { motion } from 'motion/react';
import { FileDown, BookOpen, Download } from 'lucide-react';

export const DownloadCatalogue: React.FC = () => {
  return (
    <section className="py-20 bg-[#0C3855] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Get Our Latest Catalogue
            </motion.h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl leading-relaxed">
              Explore our full range of healthcare printing products and institutional services. 
              Download our comprehensive product catalogue and company profile.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="flex items-center justify-center gap-3 bg-white text-[#0C3855] px-8 py-5 rounded-2xl font-bold shadow-xl transition-all duration-300 group"
            >
              <BookOpen className="group-hover:animate-pulse" />
              <div className="text-left">
                <span className="block text-xs uppercase opacity-70 tracking-wider">Download</span>
                <span className="text-lg">Product Catalogue</span>
              </div>
              <Download className="ml-2 w-5 h-5 opacity-50" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="flex items-center justify-center gap-3 bg-blue-600/20 backdrop-blur-sm border-2 border-blue-400/30 text-white px-8 py-5 rounded-2xl font-bold transition-all duration-300 group"
            >
              <FileDown className="group-hover:animate-bounce" />
              <div className="text-left">
                <span className="block text-xs uppercase opacity-70 tracking-wider">Download</span>
                <span className="text-lg">Company Profile</span>
              </div>
              <Download className="ml-2 w-5 h-5 opacity-50" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};
