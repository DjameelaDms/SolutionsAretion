import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const content = t('contact');
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const contactLinks = [
    { ...content.categories?.[0], url: "https://platform.aretion.org/contact" },
    { ...content.categories?.[1], url: "https://platform.aretion.org/contact" },
    { ...content.categories?.[2], url: "https://platform.aretion.org/contact" },
    { ...content.categories?.[3], url: "https://platform.aretion.org/contact" }
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#1E3A5F]" data-testid="contact-section">
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
          <p className="font-body text-lg text-white/80 max-w-3xl mx-auto">
            {content.description}
          </p>
        </motion.div>

        {/* Contact Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactLinks.map((category, index) => (
            <motion.a
              key={index}
              href={category.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-heading text-lg font-semibold text-white mb-2 text-right">{category.title}</h3>
              <p className="font-body text-sm text-white/70 mb-4 text-right">{category.description}</p>
              <div className="flex items-center gap-2 text-[#C4A77D] group-hover:translate-x-1 transition-transform">
                <ArrowIcon className="h-4 w-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
