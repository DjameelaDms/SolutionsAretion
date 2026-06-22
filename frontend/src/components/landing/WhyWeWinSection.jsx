import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WhyWeWinSection = () => {
  const { t } = useLanguage();
  const content = t('whyWeWin');

  return (
    <section className="py-20 lg:py-28 bg-white" data-testid="why-we-win-section">
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            {content.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.advantages?.map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3 text-right">
                <CheckCircle className="h-6 w-6 text-[#8B4513] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-[#1E3A5F] mb-2">{advantage.title}</h3>
                  <p className="font-body text-sm text-[#3D1C1C]/80">{advantage.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWeWinSection;
