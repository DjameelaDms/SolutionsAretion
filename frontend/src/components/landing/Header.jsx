import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_aretion/artifacts/iwj7jhxb_logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const content = t('header');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#6B8CAE]/10" data-testid="header">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3" data-testid="header-logo">
              <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto" />
              <span className="font-heading text-xl font-bold text-[#1E3A5F]">{content.companyName}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" data-testid="desktop-nav">
              {/* Language Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1E3A5F]/10 hover:bg-[#1E3A5F]/20 transition-colors"
                    data-testid="language-toggle"
                  >
                    <Globe className="h-4 w-4 text-[#1E3A5F]" />
                    <span className="font-subheading text-sm font-medium text-[#1E3A5F]">
                      {content.switchLang}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}</p>
                </TooltipContent>
              </Tooltip>
              
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-testid="nav-contact"
              >
                {content.contact}
              </a>
              <button 
                onClick={() => scrollToSection("benefits")} 
                className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
                data-testid="nav-benefits"
              >
                {content.whyUs}
              </button>
              <button 
                onClick={() => scrollToSection("solutions")} 
                className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
                data-testid="nav-solutions"
              >
                {content.solutions}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-[#6B8CAE]/10 pt-4" data-testid="mobile-menu">
              <nav className="flex flex-col gap-4">
                {/* Mobile Language Toggle */}
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center justify-end gap-2 py-2"
                  data-testid="mobile-language-toggle"
                >
                  <span className="font-subheading text-sm font-medium text-[#1E3A5F]">
                    {language === 'ar' ? 'English' : 'العربية'}
                  </span>
                  <Globe className="h-4 w-4 text-[#1E3A5F]" />
                </button>
                <button onClick={() => scrollToSection("solutions")} className="text-right font-subheading text-sm font-medium text-[#3D1C1C] py-2">{content.solutions}</button>
                <button onClick={() => scrollToSection("benefits")} className="text-right font-subheading text-sm font-medium text-[#3D1C1C] py-2">{content.whyUs}</button>
                <a href="https://platform.aretion.org/contact" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">{content.contact}</a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </TooltipProvider>
  );
};

export default Header;
