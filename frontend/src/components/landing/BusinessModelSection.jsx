import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BusinessModelSection = () => {
  const { t } = useLanguage();
  const content = t('businessModel');

  const revenueData = [
    { label: 'SaaS', percentage: 60 },
    { label: content.models?.[1]?.title || 'Licensing', percentage: 20 },
    { label: content.models?.[2]?.title || 'Services', percentage: 15 },
    { label: content.models?.[3]?.title || 'Hardware', percentage: 5 }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#1E3A5F]" data-testid="business-model-section">
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#C4A77D] text-sm font-medium tracking-wider uppercase mb-4 block">
            {content.sectionLabel}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
        </motion.div>

        {/* Revenue Models */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content.models?.map((model, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-heading text-lg font-semibold text-white mb-3 text-right">{model.title}</h3>
              <p className="font-body text-sm text-white/80 leading-relaxed text-right">{model.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Distribution */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="font-heading text-2xl font-bold text-[#C4A77D]">{content.timeline}</div>
            <h3 className="font-heading text-xl font-semibold text-white">{content.revenueLabel}</h3>
          </div>
          <div className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-white font-subheading text-sm text-right">{item.percentage}%</div>
                <div className="flex-1 h-8 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#C4A77D] to-[#8B4513] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                <div className="w-32 text-white font-body text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
