import React from "react";
import "@/App.css";
import { Toaster } from "sonner";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

// Import Landing Page Components
import Header from "./components/landing/Header";
import HeroSection from "./components/landing/HeroSection";
import SolutionsSection from "./components/landing/SolutionsSection";
import CapabilitiesSection from "./components/landing/CapabilitiesSection";
import BenefitsSection from "./components/landing/BenefitsSection";
import MarketOpportunitySection from "./components/landing/MarketOpportunitySection";
import WhyWeWinSection from "./components/landing/WhyWeWinSection";
import BusinessModelSection from "./components/landing/BusinessModelSection";
import DemoSection from "./components/landing/DemoSection";
import TrustComplianceSection from "./components/landing/TrustComplianceSection";
import ContactSection from "./components/landing/ContactSection";
import Footer from "./components/landing/Footer";

// Inner App Component that uses language context
const AppContent = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <CapabilitiesSection />
        <BenefitsSection />
        <MarketOpportunitySection />
        <WhyWeWinSection />
        <BusinessModelSection />
        <DemoSection />
        <TrustComplianceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

// Main App Component with Language Provider
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
