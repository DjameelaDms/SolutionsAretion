import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const driverIcons = [TrendingUp, Zap, Clock, Shield];

const MarketOpportunitySection = () => {
  const { t } = useLanguage();
  const content = t('market');

  return (
    <section className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="market-section">
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

        {/* Market Segments */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.segments?.map((segment, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 border border-[#6B8CAE]/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-1">
                {segment.value}
              </div>
              <div className="font-subheading text-sm text-[#6B8CAE] mb-2">{segment.unit}</div>
              <div className="text-xs text-[#8B4513] font-semibold mb-2">CAGR {segment.growth}</div>
              <p className="font-body text-sm text-[#3D1C1C]/70">{segment.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Now Section */}
        <motion.div
          className="bg-white rounded-xl p-8 lg:p-12 border border-[#6B8CAE]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1E3A5F] text-center mb-8">
            {content.whyNowTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {content.drivers?.map((driver, index) => {
              const Icon = driverIcons[index];
              return (
                <div key={index} className="flex gap-4 items-start text-right">
                  <div className="w-12 h-12 rounded-lg bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-[#C4A77D]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-lg font-semibold text-[#1E3A5F] mb-1">{driver.title}</h4>
                    <p className="font-body text-sm text-[#3D1C1C]/70">{driver.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketOpportunitySection;
