import React, { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Brain, 
  TrendingUp, 
  Users, 
  Radio, 
  Stethoscope, 
  HeartPulse, 
  Wifi, 
  FileText,
  Mail,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Building,
  Droplets,
  Thermometer,
  Flame,
  LayoutDashboard,
  Database,
  Lock,
  Shield,
  Satellite,
  Zap,
  Hospital,
  Video
} from "lucide-react";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { ScrollArea } from "./components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Toaster, toast } from "sonner";

// API Configuration
const API_URL = process.env.REACT_APP_BACKEND_URL || "";

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_aretion/artifacts/iwj7jhxb_logo.png";

// Solution Images (Original uploaded images)
const SOLUTION_IMAGES = {
  disasterms: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/uhcudkwx_DisasterMS.jpeg",
  chatbot: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/r17o5z6g_Chatbot.jpeg",
  predictive: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/8p6d6ixy_Predictive%20Models.jpeg",
  triage: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/3vpmqdvv_Triage.jpeg",
  emcc: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/fo7g0r4a_EM%20-CC.jpeg",
  teleintubation: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/bu492laq_Tele-Intubation.jpeg",
  codeblue: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/8qdv50zu_Tele%20Code%20Blue%20Kit.jpeg",
  protocol: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/98h2v114_Protocol%20designer.jpeg",
  consultation: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/bu492laq_Tele-Intubation.jpeg"
};

// Solutions Data
const solutions = [
  {
    id: 1,
    title: "DisasterMS",
    subtitle: "Disaster Management System",
    description: "Revolutionary closed-loop disaster response platform with AI-driven early warning and autonomous response systems that redefine facility safety standards.",
    icon: ShieldCheck,
    comingSoon: false,
    size: "large",
    bgImage: SOLUTION_IMAGES.disasterms
  },
  {
    id: 2,
    title: "AI Assistant",
    subtitle: "Enterprise Intelligence",
    description: "Next-generation RAG architecture delivering unprecedented accuracy. Enterprise AI that transforms how organizations access critical knowledge and make decisions.",
    icon: Brain,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.chatbot
  },
  {
    id: 3,
    title: "Predictive Analytics",
    subtitle: "Climate Risk Intelligence",
    description: "Proprietary ML models predicting climate-related hazards before they strike. Serving healthcare, utilities, and government sectors.",
    icon: TrendingUp,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.predictive
  },
  {
    id: 4,
    title: "Mass Triage System",
    subtitle: "Mass Casualty Response",
    description: "Breakthrough digital victim identification technology transforming mass casualty response with unprecedented speed and accuracy.",
    icon: Users,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.triage
  },
  {
    id: 5,
    title: "EM:CC Network",
    subtitle: "Emergency Medical Coordination",
    description: "First-of-its-kind network connecting regional health clusters, breaking down barriers to enable seamless patient journey management across facilities.",
    icon: Radio,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.emcc
  },
  {
    id: 6,
    title: "Tele-Intubation",
    subtitle: "Remote Airway Management",
    description: "Remote robotic intubation technology that redefines critical airway management, delivering specialist expertise to any location instantly.",
    icon: Stethoscope,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.teleintubation
  },
  {
    id: 7,
    title: "Code Blue Kit",
    subtitle: "Remote Resuscitation",
    description: "Revolutionary hardware-software system for remote emergency coordination that transforms cardiac arrest response.",
    icon: HeartPulse,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.codeblue
  },
  {
    id: 8,
    title: "Protocol Designer",
    subtitle: "Emergency Protocol Engine",
    description: "AI-powered platform revolutionizing emergency protocol design and implementation. From weeks to hours.",
    icon: FileText,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.protocol
  },
  {
    id: 9,
    title: "Consultation Platform",
    subtitle: "Virtual Care Infrastructure",
    description: "Flexible telehealth infrastructure serving telemedicine, consultation, and education sectors. One platform, unlimited applications.",
    icon: Video,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.consultation
  }
];

// Capabilities Data
const capabilitySections = [
  {
    id: "early-warning",
    title: "Proprietary Early Warning Technology",
    items: [
      {
        icon: Droplets,
        title: "Real-Time Infrastructure Intelligence",
        description: "Solutions delivering predictive insights competitors cannot replicate. Deployed across numerous facilities with extremely low false alarm rates—a significant improvement over legacy systems."
      },
      {
        icon: Thermometer,
        title: "Edge Machine Learning",
        description: "Proprietary ML models trained on extensive facility data enabling predictive maintenance that significantly reduces equipment failures. Each deployment generates training data that compounds our competitive advantage."
      },
      {
        icon: Shield,
        title: "CBRN Threat Detection & Response",
        description: "Advanced chemical, biological, radiological, and nuclear threat detection integrated into our early warning ecosystem. Real-time monitoring and automated response protocols protecting personnel and infrastructure."
      }
    ]
  },
  {
    id: "fire-detection",
    title: "Unified Detection Platform",
    items: [
      {
        icon: Flame,
        title: "Comprehensive Integration Layer",
        description: "Our middleware integrates with multiple legacy detection systems, creating immediate value without full replacement. This approach significantly reduces sales cycles and creates switching costs that drive excellent retention rates."
      },
      {
        icon: LayoutDashboard,
        title: "Command Center Dashboard",
        description: "Real-time operational visibility across distributed facilities. Our enterprise clients report significantly faster incident response times. Dashboard data feeds our analytics engine."
      }
    ]
  },
  {
    id: "data-center",
    title: "Critical Infrastructure Protection",
    items: [
      {
        icon: Database,
        title: "Data Center Resilience",
        description: "Purpose-built for healthcare data centers where downtime cost is prohibitive. Our uptime SLA meets HIPAA compliance requirements."
      },
      {
        icon: Lock,
        title: "Compliance Automation",
        description: "Automated compliance reporting for HIPAA, SOC 2, and regional healthcare regulations. Significant reduction in client audit costs."
      }
    ]
  },
  {
    id: "leadership",
    title: "Leadership Continuity Solutions",
    items: [
      {
        icon: Satellite,
        title: "Remote Command Center",
        description: "Secure platform for critical infrastructure operators to manage multi-site operations. Military-grade encryption with regional compliance."
      },
      {
        icon: Shield,
        title: "Leadership Succession Protocols",
        description: "Automated protocols ensuring leadership continuity during emergencies. Public sector and healthcare organizations particularly value this capability."
      }
    ]
  }
];

// Benefits Data
const benefits = [
  { title: "Innovation by Design", description: "We challenge what's possible, delivering technology that creates new categories" },
  { title: "Disaster Management Focus", description: "Every solution purpose-built for emergency response and crisis management" },
  { title: "AI-First Approach", description: "Machine learning and automation at the core of everything we build" },
  { title: "Proven Innovation", description: "Four patents pending protecting our breakthrough methodologies" },
  { title: "Scalable Architecture", description: "Cloud-native platforms designed for rapid deployment and growth" },
  { title: "Field-Tested", description: "Created and tested by field disaster specialists in real emergency situations" },
  { title: "Future-Ready", description: "Continuously evolving to stay ahead of emerging threats" },
  { title: "Integration-Ready", description: "Seamless connectivity with existing infrastructure and systems" },
  { title: "Mission-Critical Reliability", description: "Designed for zero downtime when it matters most" }
];

// Market Data
const marketSegments = [
  { value: "197", unit: "B", growth: "5.1%", label: "Critical Infrastructure Protection" },
  { value: "308", unit: "B", growth: "8.2%", label: "Disaster Preparedness Systems" },
  { value: "25.2", unit: "B", growth: "36.3%", label: "Natural Disaster Detection (IoT)" },
  { value: "2.09", unit: "B", growth: "15.5%", label: "Business Continuity Management" }
];

// Growth Drivers
const growthDrivers = [
  { icon: TrendingUp, title: "Climate Urgency", description: "Increasing frequency and severity of natural disasters driving mandatory preparedness" },
  { icon: Zap, title: "Government Mandates", description: "Billions allocated for resilient infrastructure globally" },
  { icon: Clock, title: "IoT & AI Maturity", description: "Technology now reliable enough for mission-critical deployment" },
  { icon: Shield, title: "Favorable Regulatory Winds", description: "Early warning systems becoming legally mandatory across many countries" }
];

// Competitive Advantages
const competitiveAdvantages = [
  { title: "Advanced Technologies", description: "AI-powered predictive detection identifying disasters before they occur, with sub-second automated response." },
  { title: "Built by Domain Experts", description: "Designed by leading specialists in disaster management, business continuity, healthcare operations, and clinical research." },
  { title: "Field-Tested Solutions", description: "Created and tested by field disaster specialists in real emergencies—not theoretical simulations." },
  { title: "Enterprise-Designed", description: "Purpose-built for governments, municipalities, and critical infrastructure operators—not repurposed consumer technology." },
  { title: "Integrated Platform", description: "Unified solution covering detection, response, and continuity. Competitors offer siloed solutions; we deliver comprehensive protection." },
  { title: "Modular and Scalable", description: "Architecture that scales from single-site deployment to national infrastructure with minimal marginal cost increase." }
];

// Business Model
const businessModels = [
  { icon: Wifi, title: "Enterprise SaaS", description: "Recurring platform subscriptions with multi-year commitments. Target retention rate exceeding 95%. Contracts include ongoing support and updates." },
  { icon: FileText, title: "Technology Licensing", description: "Licensing agreements with infrastructure operators. High gross margins without direct end-user support costs. IP protected." },
  { icon: Users, title: "Implementation Services", description: "High-value integration services with healthy margins. Creates long-term relationships with enterprise clients and opens upgrade opportunities." },
  { icon: ShieldCheck, title: "Hardware Sales", description: "Complementary hardware sales where needed, creating ecosystem lock-in and driving ongoing service revenue." }
];

// Contact Categories
const contactCategories = [
  { title: "Investor Relations", description: "Investment opportunities and strategic partnership discussions", url: "https://platform.aretion.org/contact" },
  { title: "Strategic Partnerships", description: "Technology integration and regional distribution opportunities", url: "https://platform.aretion.org/contact" },
  { title: "Media & Press", description: "Press inquiries and media opportunities", url: "https://platform.aretion.org/contact" },
  { title: "General Inquiries", description: "General information and support", url: "https://platform.aretion.org/contact" }
];

// Certifications
const certifications = [
  { title: "ISO 27001", description: "Information Security Management" },
  { title: "CSA STAR Level 2", description: "Cloud Security Certification" },
  { title: "HIPAA Ready", description: "Healthcare Compliance" },
  { title: "SOC 2 Type II", description: "Security Audit Certification" }
];

// Header Component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <span className="font-heading text-xl font-bold text-[#1E3A5F]">ARETION Solutions</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
              <button 
                onClick={() => scrollToSection("solutions")} 
                className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
                data-testid="nav-solutions"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection("benefits")} 
                className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
                data-testid="nav-benefits"
              >
                Why Us
              </button>
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-testid="nav-investor-deck"
              >
                Get In Touch
              </a>
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
                <button onClick={() => scrollToSection("solutions")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Solutions</button>
                <button onClick={() => scrollToSection("benefits")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Why Us</button>
                <a href="https://platform.aretion.org/contact" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">Get In Touch</a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </TooltipProvider>
  );
};

// Hero Section Component
const HeroSection = () => {
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
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A5F] mb-6 leading-tight" data-testid="hero-headline">
              Disruptive Technology for Critical Infrastructure
            </h1>
            
            {/* Subtitle */}
            <p className="font-subheading text-lg sm:text-xl text-[#8B4513] mb-6">
              We Create What Doesn't Exist
            </p>
            
            {/* Mission Statement */}
            <p className="font-body text-base sm:text-lg text-[#3D1C1C]/80 mb-4 max-w-3xl mx-auto">
              Our Mission: Transform critical infrastructure safety through breakthrough technology.
            </p>
            
            {/* Description */}
            <p className="font-body text-sm sm:text-base text-[#3D1C1C]/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              ARETION builds breakthrough technologies that transform how critical infrastructure operates. We don't upgrade legacy systems—we replace them with AI-powered intelligent platforms that predict problems before they occur and respond autonomously.
            </p>

            {/* Our Approach */}
            <div className="mt-8 text-left max-w-2xl mx-auto">
              <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4">Our Approach</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                  <span><strong>Breakthrough Innovation:</strong> First integrated platform combining disaster management, telemedicine, and predictive analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                  <span><strong>Proprietary Technology:</strong> Four patents pending, AI models trained on real deployments, deep domain expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                  <span><strong>Proven Impact:</strong> Field-tested solutions trusted by health networks across Saudi Arabia and GCC</span>
                </li>
              </ul>
            </div>

            {/* Tagline */}
            <p className="font-heading text-lg sm:text-xl text-[#8B4513] font-semibold mt-8 mb-8">
              We challenge the status quo. We accomplish what others say is impossible.
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
                Get In Touch
                <ChevronRight className="h-4 w-4" />
              </a>
              <a 
                href="https://platform.aretion.org/advisors"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                data-testid="hero-team-btn"
              >
                Meet Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section Component
const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="solutions-section">
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#6B8CAE] text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Technologies
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4" data-testid="solutions-title">
            Disruptive Solutions Suite
          </h2>
          <p className="font-body text-base sm:text-lg text-[#3D1C1C]/80 max-w-3xl mx-auto">
            Nine breakthrough platforms transforming how critical infrastructure organizations operate, respond, and protect what matters.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className={`solution-card ${solution.bgImage ? 'has-bg-image' : ''}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={solution.bgImage ? { backgroundImage: `url(${solution.bgImage})` } : {}}
            >
              <div className="solution-card-content">
                <div className="solution-icon-wrapper">
                  <solution.icon className="solution-icon" />
                </div>
                <div>
                  <h3 className="solution-title">{solution.title}</h3>
                  <p className="solution-subtitle text-xs text-[#6B8CAE] mb-2">{solution.subtitle}</p>
                </div>
                <p className="solution-description">{solution.description}</p>
                <span className="solution-badge">Available</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Capabilities Section Component
const CapabilitiesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-white" data-testid="capabilities-section">
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#6B8CAE] text-sm font-medium tracking-wider uppercase mb-4 block">
            Competitive Edge
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
            Technical Excellence
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            Proprietary technologies and field-tested innovations that set us apart.
          </p>
        </motion.div>

        {/* Capability Sections */}
        <div className="space-y-12">
          {capabilitySections.map((section, sectionIndex) => (
            <motion.div 
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-6 pb-4 border-b-2 border-[#C4A77D]">
                {section.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-[#C4A77D]" />
                      </div>
                      <h4 className="font-heading text-lg font-semibold text-[#1E3A5F]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="font-body text-sm text-[#3D1C1C]/80 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section Component
const BenefitsSection = () => {
  return (
    <section id="benefits" className="benefits-section py-20 lg:py-28" data-testid="benefits-section">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#6B8CAE] text-sm font-medium tracking-wider uppercase mb-4 block">
              Value Proposition
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4" data-testid="benefits-title">
              What Sets Us Apart
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="text-left p-4 rounded-lg border border-[#6B8CAE]/20 bg-[#F5F0E8]/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <h3 className="font-heading text-base font-semibold text-[#1E3A5F] mb-1">{benefit.title}</h3>
                <p className="font-body text-sm text-[#3D1C1C]/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Market Opportunity Section Component
const MarketOpportunitySection = () => {
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
            Market Opportunity
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            $500B+ Addressable Market
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 max-w-3xl mx-auto">
            Global demand for critical infrastructure protection, disaster detection, and automated response technologies is experiencing unprecedented growth.
          </p>
        </motion.div>

        {/* Market Segments */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {marketSegments.map((segment, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 border border-[#6B8CAE]/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-1">
                ${segment.value}
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
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1E3A5F] text-center mb-8">Why Now?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {growthDrivers.map((driver, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                  <driver.icon className="h-6 w-6 text-[#C4A77D]" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-[#1E3A5F] mb-1">{driver.title}</h4>
                  <p className="font-body text-sm text-[#3D1C1C]/70">{driver.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Why We Win Section Component
const WhyWeWinSection = () => {
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
            Why We Win
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitiveAdvantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#8B4513] flex-shrink-0 mt-1" />
                <div>
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

// Business Model Section Component
const BusinessModelSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#1E3A5F]" data-testid="business-model-section">
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#C4A77D] text-sm font-medium tracking-wider uppercase mb-4 block">
            Business Model
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Sustainable & Growing Revenue
          </h2>
        </motion.div>

        {/* Revenue Models */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {businessModels.map((model, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-heading text-lg font-semibold text-white mb-3">{model.title}</h3>
              <p className="font-body text-sm text-white/80 leading-relaxed">{model.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Distribution */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl font-semibold text-white">Target Revenue Distribution</h3>
            <div className="font-heading text-2xl font-bold text-[#C4A77D]">Long-Term</div>
          </div>
          <div className="space-y-4">
            {[
              { label: "SaaS", percentage: 60 },
              { label: "Licensing", percentage: 20 },
              { label: "Services", percentage: 15 },
              { label: "Hardware", percentage: 5 }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-white font-subheading text-sm">{item.label}</div>
                <div className="flex-1 h-8 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#C4A77D] to-[#8B4513] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                <div className="w-12 text-white font-subheading text-sm text-right">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Demo Section Component (Testimonials)
const DemoSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="demo-section">
      <div className="container-main">
        <div className="text-center">
          {/* Golden Minute Stat */}
          <div className="text-center mb-12">
            <div className="font-heading text-4xl sm:text-5xl font-bold text-[#8B4513] mb-2">
              Golden <span className="relative"><span className="opacity-50">Hour</span><span className="absolute left-0 right-0 top-1/2 h-[3px] bg-[#1E3A5F]"></span></span> <span className="font-body text-[#1E3A5F]">Minute</span>
            </div>
            <p className="font-body text-[#3D1C1C]/80">Response time improvement</p>
          </div>

          {/* Milestone */}
          <div className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-full mb-8">
            <CheckCircle className="h-5 w-5 text-[#C4A77D]" />
            <span className="font-subheading font-semibold">All Products Ready to Deploy</span>
          </div>

          {/* Client Sectors */}
          <div className="bg-white/80 rounded-lg p-8 border border-[#6B8CAE]/20 mb-8">
            <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-6">Our Clients Include</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3 p-4">
                <Building className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">Municipalities</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4">
                <Shield className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">Ministries</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4">
                <Hospital className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">Healthcare Sector</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://platform.aretion.org/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Explore Partnership
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  return null; // Placeholder for future testimonials
};

// Trust & Compliance Section Component
const TrustComplianceSection = () => {
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
            Trust & Compliance
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            Global Standards, Local Implementation
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 max-w-3xl mx-auto">
            We adhere to the highest global security and compliance standards, with deep understanding of regional requirements.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
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

// Contact Section Component
const ContactSection = () => {
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
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Start the Conversation
          </h2>
          <p className="font-body text-lg text-white/80 max-w-3xl mx-auto">
            Whether you're an investor exploring opportunities, a potential partner, or an organization seeking solutions, we're here to connect.
          </p>
        </motion.div>

        {/* Contact Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCategories.map((category, index) => (
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
              <h3 className="font-heading text-lg font-semibold text-white mb-2">{category.title}</h3>
              <p className="font-body text-sm text-white/70 mb-4">{category.description}</p>
              <div className="flex items-center gap-2 text-[#C4A77D] group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#1E3A5F] border-t border-white/10 py-12" data-testid="footer">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto brightness-0 invert" />
              <span className="font-heading text-xl font-bold text-white">Arkan Alray Co</span>
            </div>
            <p className="font-body text-sm text-white/70 mb-2">
              Disruptive Technology for Critical Infrastructure
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:text-right">
            <p className="font-semibold text-white mb-3">Contact Us</p>
            <p className="font-body text-sm text-white/70 mb-2">
              King Abdullah Financial District (KAFD)<br />
              Innovation Boulevard, Al Aqeeq, KAFD Building 7229<br />
              Riyadh 13519, Saudi Arabia
            </p>
            <p className="font-body text-sm text-white/70 mb-1">+966 11 525 6458</p>
            <a href="mailto:Contact@aretion.org" className="font-body text-sm text-[#C4A77D] hover:text-white transition-colors">
              Contact@aretion.org
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="font-body text-sm text-white/50">
            © 2025 Arkan Alray Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen">
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
        <TestimonialsSection />
        <TrustComplianceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
