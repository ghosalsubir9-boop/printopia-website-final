import React from 'react';
import { motion } from 'motion/react';
import { images } from '../data/imageMap';
import { Camera, Users, Settings, Building2 } from 'lucide-react';

const teams = [
  {
    id: 'customer-care',
    title: 'Customer Care & Client Support',
    description: 'Our dedicated account managers ensure smooth communication and timely updates for all institutional orders.',
    image: images.about.customerCare,
    icon: Camera
  },
  {
    id: 'creative-design',
    title: 'Creative Design Team',
    description: 'Expert designers specializing in medical layouts, ensuring clarity, precision, and healthcare standards compliance.',
    image: images.about.creativeTeam,
    icon: Users
  },
  {
    id: 'production-team',
    title: 'Production Team',
    description: 'Skilled technicians operating high-precision offset machines to deliver consistent quality across bulk runs.',
    image: images.about.productionProcess,
    icon: Settings
  },
  {
    id: 'infrastructure',
    title: 'Advanced Printing Infrastructure',
    description: 'Equipped with the latest offset and digital printing technology to handle high-volume institutional requirements.',
    image: images.about.printingMachine,
    icon: Building2
  }
];

export const TeamAndInfrastructure: React.FC = () => {
  return (
    <section className="py-24 bg-[#F2F8FC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            Our Team & Infrastructure
          </motion.h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            The backbone of Printopia's excellence lies in our professional team and state-of-the-art manufacturing facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {teams.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col md:flex-row bg-neutral-50 rounded-[32px] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f4f4f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23a1a1aa">Printopia Solutions</text></svg>';
                    console.warn("Missing image:", e.currentTarget.src);
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
