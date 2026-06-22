import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TrustComplianceSection = () => {
  const { t } = useLanguage();
  const content = t('trust');

  return (
    <section className="py-20 lg:py-28 bg-white" data-testid="trust-section">
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#6B8CAE] text-sm font-medium tracking-wider uppercase mb-4 block">
            {content.sectionLabel}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            {content.title}
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 max-w-3xl mx-auto">
            {content.description}
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.certifications?.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0E8] rounded-lg p-6 text-center border border-[#6B8CAE]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#1E3A5F] flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#C4A77D]" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#1E3A5F] mb-2">{cert.title}</h3>
              <p className="font-body text-sm text-[#3D1C1C]/70">{cert.description}</p>
              <div className="mt-4 flex justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustComplianceSection;
