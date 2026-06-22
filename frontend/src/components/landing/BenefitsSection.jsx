import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BenefitsSection = () => {
  const { t } = useLanguage();
  const content = t('benefits');

  return (
    <section id="benefits" className="benefits-section py-20 lg:py-28" data-testid="benefits-section">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#6B8CAE] text-sm font-medium tracking-wider uppercase mb-4 block">
              {content.sectionLabel}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
              {content.title}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.items?.map((item, index) => (
              <motion.div 
                key={index}
                className="text-right p-4 rounded-lg border border-[#6B8CAE]/20 bg-[#F5F0E8]/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <h3 className="font-heading text-base font-semibold text-[#1E3A5F] mb-1">{item.title}</h3>
                <p className="font-body text-sm text-[#3D1C1C]/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
