import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Building, Shield, Hospital, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const DemoSection = () => {
  const { t, isRTL } = useLanguage();
  const content = t('demo');
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="demo-section">
      <div className="container-main">
        <div className="text-center">
          {/* Golden Minute Stat */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-heading text-3xl sm:text-4xl font-bold text-[#8B4513] mb-2">
              {content.goldenMinute}
            </div>
            <p className="font-body text-[#3D1C1C]/80">{content.goldenMinuteDesc}</p>
          </motion.div>

          {/* Milestone */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-subheading font-semibold">{content.marketReady}</span>
            <CheckCircle className="h-5 w-5 text-[#C4A77D]" />
          </motion.div>

          {/* Client Sectors */}
          <motion.div 
            className="bg-white/80 rounded-lg p-8 border border-[#6B8CAE]/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-6">{content.clientsTitle}</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3 p-4">
                <Building className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">{content.clients?.[0]}</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4">
                <Shield className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">{content.clients?.[1]}</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4">
                <Hospital className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">{content.clients?.[2]}</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="https://platform.aretion.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              {content.partnershipCta}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
