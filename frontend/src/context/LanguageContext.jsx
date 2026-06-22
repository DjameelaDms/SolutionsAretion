import React, { createContext, useContext, useState } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage for saved preference, default to Arabic
    const saved = typeof window !== 'undefined' ? localStorage.getItem('aretion-language') : null;
    return saved || 'ar';
  });

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aretion-language', newLang);
    }
  };

  const t = (section) => {
    return translations[section]?.[language] || translations[section]?.ar || {};
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
