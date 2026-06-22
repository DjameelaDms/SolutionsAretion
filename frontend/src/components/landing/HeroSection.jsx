import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = () => {
  const { language, t, isRTL } = useLanguage();
  const content = t('hero');
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16" data-testid="hero-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="container-main relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A5F] mb-6 leading-tight">
              {content.title}
            </h1>
            
            {/* Subtitle */}
            <p className="font-subheading text-lg sm:text-xl text-[#8B4513] mb-6">
              {content.subtitle}
            </p>
            
            {/* Mission Statement */}
            <p className="font-body text-base sm:text-lg text-[#3D1C1C]/80 mb-4 max-w-3xl mx-auto">
              {content.mission}
            </p>
            
            {/* Description */}
            <p className="font-body text-sm sm:text-base text-[#3D1C1C]/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>

            {/* Methodology */}
            <div className="mt-8">
              <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4 text-right">{content.methodologyTitle}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                  <span className="text-right flex-1"><strong>{content.methodology1Title}</strong> {content.methodology1Desc}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                  <span className="text-right flex-1"><strong>{content.methodology2Title}</strong> {content.methodology2Desc}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                  <span className="text-right flex-1"><strong>{content.methodology3Title}</strong> {content.methodology3Desc}</span>
                </li>
              </ul>
            </div>

            {/* Tagline */}
            <p className="font-heading text-lg sm:text-xl text-[#8B4513] font-semibold mt-8 mb-8">
              {content.tagline}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
                data-testid="hero-deck-btn"
              >
                {content.ctaContact}
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://platform.aretion.org/advisors"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                data-testid="hero-team-btn"
              >
                {content.ctaTeam}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
