import React from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_aretion/artifacts/iwj7jhxb_logo.png";

const Footer = () => {
  const { t } = useLanguage();
  const content = t('footer');

  return (
    <footer className="bg-[#1E3A5F] border-t border-white/10 py-12" data-testid="footer">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="text-right">
            <div className="flex items-center gap-3 mb-4 justify-end">
              <span className="font-heading text-xl font-bold text-white">{content.companyName}</span>
              <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="font-body text-sm text-white/70 mb-2">
              {content.tagline}
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <p className="font-semibold text-white mb-3">{content.contact}</p>
            <p className="font-body text-sm text-white/70 whitespace-pre-line mb-2">
              {content.address}
            </p>
            <p className="font-body text-sm text-white/70 mb-1" dir="ltr" style={{ textAlign: 'right' }}>
              {content.phone}
            </p>
            <a 
              href={`mailto:${content.email}`} 
              className="font-body text-sm text-[#C4A77D] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              {content.email}
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="font-body text-sm text-white/50">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
