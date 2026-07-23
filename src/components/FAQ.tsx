import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: "faq-1",
    question: "What types of healthcare printing services do you offer?",
    answer: "We specialize in a comprehensive range of healthcare printing, including OPD files, prescription pads, laboratory envelopes, X-ray envelopes, patient identification bands, hospital bill books, medical brochures, and custom healthcare packaging."
  },
  {
    id: "faq-2",
    question: "Do you provide custom branding for hospitals?",
    answer: "Yes, all our products are fully customizable with your hospital or clinic's logo, branding colors, address, and contact details. We ensure that your brand identity is professionally reflected in every piece of stationery."
  },
  {
    id: "faq-3",
    question: "What is the minimum order quantity (MOQ) for custom printing?",
    answer: "Our MOQ varies by product. For standard medical stationery like prescription pads, the MOQ is typically 1,000 units. For specialized items like patient identification bands, we can accommodate smaller institutional orders. Please contact us for specific product MOQs."
  },
  {
    id: "faq-4",
    question: "Do you offer GST compliant invoices?",
    answer: "Absolutely. As a B2B focused company, we provide full GST compliant tax invoices for all orders, enabling institutional clients to claim input tax credit (ITC) seamlessly."
  },
  {
    id: "faq-5",
    question: "How long does it take for order delivery?",
    answer: "Our standard turnaround time is 7-10 business days after artwork approval. For repeat orders with no design changes, we can often expedite delivery to within 5-7 business days."
  },
  {
    id: "faq-6",
    question: "Do you provide design support for medical stationery?",
    answer: "Yes, we have a dedicated creative design team that assists in preparing professional artwork, ensuring all medical information is clear and the design meets healthcare standards."
  },
  {
    id: "faq-7",
    question: "What paper quality do you use for prescription pads?",
    answer: "We offer various paper options ranging from standard 70 GSM maplitho to premium 100 GSM super print paper. We can also provide specialty papers upon request for high-end consultant pads."
  },
  {
    id: "faq-8",
    question: "Can you print patient identification bands with barcodes?",
    answer: "Yes, we specialize in thermal and laser-printable patient ID bands that can include barcodes, QR codes, and variable patient data for efficient hospital management."
  },
  {
    id: "faq-9",
    question: "Do you deliver pan-India?",
    answer: "Yes, we partner with reliable logistics providers to deliver healthcare printing solutions to hospitals and diagnostic centers across India."
  },
  {
    id: "faq-10",
    question: "Can I get a sample before placing a bulk order?",
    answer: "We can provide digital proofs for all orders. For physical samples, we have a sample kit available for institutional clients. Please contact our support team to request a sample box."
  },
  {
    id: "faq-11",
    question: "What printing technology do you use?",
    answer: "We primarily use advanced offset printing for high-volume orders to ensure maximum cost-efficiency and color consistency. For specialized requirements, we also utilize digital and thermal printing technologies."
  },
  {
    id: "faq-12",
    question: "Are your hospital files and folders durable?",
    answer: "Yes, our OPD files and patient report folders are made from high-quality duplex board or plastic materials with options for lamination to ensure they withstand frequent handling in a hospital environment."
  },
  {
    id: "faq-13",
    question: "Do you print laboratory test report envelopes?",
    answer: "Yes, we print various sizes of laboratory envelopes, including blood report envelopes, X-ray envelopes, and MRI/CT scan bags with custom institutional branding."
  },
  {
    id: "faq-14",
    question: "How do I request a B2B quotation?",
    answer: "You can request a quotation directly through our website form, call us at +91 94324 36942, or send a WhatsApp message with your requirements."
  },
  {
    id: "faq-15",
    question: "Do you handle bulk institutional contracts?",
    answer: "Yes, we manage annual maintenance contracts (AMC) for large hospital chains and diagnostic groups, providing scheduled deliveries and priority production."
  },
  {
    id: "faq-16",
    question: "Can you print multilingual prescription pads?",
    answer: "Yes, we can design and print stationery in English, Hindi, Bengali, and other regional languages as per your clinic's geographical location."
  },
  {
    id: "faq-17",
    question: "What file formats do you accept for logos?",
    answer: "We prefer high-resolution vector files like .AI, .EPS, or .PDF. However, we can also work with high-quality .PNG or .JPG files."
  },
  {
    id: "faq-18",
    question: "Are there any hidden costs in the quotation?",
    answer: "No, our quotations are transparent and include printing and basic design costs. GST and shipping are clearly mentioned as separate line items."
  },
  {
    id: "faq-19",
    question: "Do you offer emergency printing services?",
    answer: "For existing clients with urgent stock shortages, we offer 'Express Production' to dispatch critical items within 48-72 hours."
  },
  {
    id: "faq-20",
    question: "How can I track my order status?",
    answer: "Once your order is dispatched, you will receive a tracking ID via email/SMS. You can also call your dedicated account manager for real-time updates."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
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
      id="faq-section" 
      className="bg-[#F2F8FC] py-20 lg:py-28 text-[#0A192F] overflow-hidden border-t border-blue-100/60"
      aria-labelledby="faq-heading"
    >
      <motion.div 
        className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-6"
          >
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </motion.div>
          <h2 
            id="faq-heading"
            className="font-display text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold tracking-tight leading-[1.15] text-[#0A192F] mb-6"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base lg:text-[18px] text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
            Find quick answers to the most common questions about our healthcare printing services.
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div 
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                className={`border rounded-[12px] overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-blue-600 shadow-sm' : 'border-neutral-200 hover:border-blue-600'
                }`}
              >
                <button
                  id={`faq-trigger-${index}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none transition-colors duration-300 group cursor-pointer"
                >
                  <span className={`text-[16px] sm:text-[18px] font-bold leading-snug transition-colors duration-300 ${
                    isOpen ? 'text-blue-600' : 'text-[#0A192F] group-hover:text-blue-600'
                  }`}>
                    {faq.question}
                  </span>
                  <span className="shrink-0 ml-4">
                    <Plus 
                      className={`w-5 h-5 transition-transform duration-300 text-blue-600 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`} 
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-[15px] text-gray-500 leading-relaxed border-t border-neutral-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">No matching questions found.</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
