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
  CheckCircle,
  ArrowRight,
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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Assets
const LOGO_URL = "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/0hzqlwr8_A_Logo-39.png";

// Solution Background Images (User Provided)
const SOLUTION_IMAGES = {
  disasterms: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/uhcudkwx_DisasterMS.jpeg",
  chatbot: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/r17o5z6g_Chatbot.jpeg",
  predictive: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/8p6d6ixy_Predictive%20Models.jpeg",
  emcc: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/fo7g0r4a_EM%20-CC.jpeg",
  iot: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/kuz3we6e_IOT.jpeg",
  protocol: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/98h2v114_Protocol%20designer.jpeg",
  codeblue: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/8qdv50zu_Tele%20Code%20Blue%20Kit.jpeg",
  triage: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/3vpmqdvv_Triage.jpeg",
  teleintubation: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/bu492laq_Tele-Intubation.jpeg",
  consultation: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/vu15sx4d_Screenshot%202026-03-20%20at%2016.28.33.png"
};

// Solutions Data - Disruptive Technology
const solutions = [
  {
    id: 1,
    title: "DisasterMS",
    description: "Revolutionary closed-loop disaster response platform. AI-driven early warning and autonomous response systems that redefine facility safety standards.",
    icon: ShieldCheck,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.disasterms
  },
  {
    id: 2,
    title: "AI Assistant",
    description: "Next-generation RAG architecture delivering unprecedented accuracy. Enterprise-ready AI that transforms how organizations access and act on critical knowledge.",
    icon: Brain,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.chatbot
  },
  {
    id: 3,
    title: "Predictive Analytics",
    description: "Breakthrough ML models forecasting climate-related risks before they materialize. Turning data into foresight across healthcare, utilities, and government.",
    icon: TrendingUp,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.predictive
  },
  {
    id: 4,
    title: "Mass Triage System",
    description: "First-of-its-kind digital victim identification technology. Transforming mass-casualty response with speed and precision never before possible.",
    icon: Users,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.triage
  },
  {
    id: 5,
    title: "EM:CC Network",
    description: "Pioneering network connecting regional healthcare clusters. Breaking down silos to enable seamless patient journey management across facilities.",
    icon: Radio,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.emcc
  },
  {
    id: 6,
    title: "Tele-Intubation",
    description: "Robotic tele-intubation redefining critical airway management. Bringing specialist expertise to any location, instantly.",
    icon: Stethoscope,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.teleintubation
  },
  {
    id: 7,
    title: "Code Blue Kit",
    description: "Revolutionary hardware-software system for remote emergency coordination. Transforming code blue response with real-time virtual collaboration.",
    icon: HeartPulse,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.codeblue
  },
  {
    id: 8,
    title: "Protocol Designer",
    description: "AI-powered platform revolutionizing how organizations design and execute emergency protocols. From weeks to hours.",
    icon: FileText,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.protocol
  },
  {
    id: 9,
    title: "Consultation Platform",
    description: "Adaptive telehealth infrastructure serving telemedicine, advisory, and education sectors. One platform, unlimited applications.",
    icon: Video,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.consultation
  }
];

// Benefits Data - Why We're Different
const benefits = [
  { title: "Disruptive by Design", description: "Technology that challenges the status quo and creates new possibilities" },
  { title: "Disaster Management Focus", description: "Purpose-built solutions for emergency response and crisis management" },
  { title: "AI-First Approach", description: "Machine learning and automation at the core of every solution" },
  { title: "Proven Innovation", description: "Four patents pending protecting our breakthrough methodologies" },
  { title: "Scalable Architecture", description: "Cloud-native platforms built for rapid deployment and growth" },
  { title: "Field-Tested", description: "Solutions refined through real-world emergency deployments" },
  { title: "Integration Ready", description: "Seamless connectivity with existing infrastructure and systems" },
  { title: "Future-Proof", description: "Continuously evolving technology that stays ahead of emerging challenges" },
  { title: "Mission-Critical Reliability", description: "Systems designed for zero downtime when it matters most" }
];

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header-sticky ${isScrolled ? "header-scrolled" : ""}`} data-testid="header">
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" data-testid="logo-link">
            <img src={LOGO_URL} alt="ARETION" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="font-heading text-xl font-bold text-[#1E3A5F]">ARETION</span>
              <span className="block text-xs font-subheading text-[#6B8CAE] tracking-wider">SOLUTIONS</span>
            </div>
          </a>

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
            className="md:hidden p-2 text-[#1E3A5F]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-[#6B8CAE]/20"
            data-testid="mobile-nav"
          >
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("solutions")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Solutions</button>
              <button onClick={() => scrollToSection("benefits")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Why Us</button>
              <a href="https://platform.aretion.org/contact" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">Get In Touch</a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// Hero Section - Investor Focused
const HeroSection = () => {
  return (
    <section className="hero-section" data-testid="hero-section">
      <div className="hero-pattern"></div>
      <div className="container-main relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-16">
          {/* Text Content */}
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A5F] leading-tight mb-4 text-center" data-testid="hero-headline">
              Intelligent Ecosystem for Critical Infrastructure
            </h1>
            <p className="font-heading text-lg sm:text-xl text-[#8B4513] font-semibold text-center mb-8">
              We Design and Deliver Disruptive Technology
            </p>
            
            <div className="font-heading text-[#3D1C1C]/80 leading-relaxed space-y-6 text-left max-w-3xl mx-auto">
              <p className="text-lg font-medium text-[#1E3A5F]">
                Our mission: To transform critical infrastructure safety through disruptive technology.
              </p>
              <p>
                ARETION creates breakthrough technology that transforms how critical infrastructure operates. We don't iterate on legacy systems—we replace them with intelligent, AI-powered platforms that anticipate problems before they occur and respond autonomously when they do.
              </p>
              
              <div className="mt-8">
                <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4">Our Approach</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Disruptive Innovation:</strong> First integrated platform spanning disaster management, telehealth, and predictive analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Proprietary Technology:</strong> Four patents pending, AI models trained on real-world deployments, deep domain expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Proven Impact:</strong> Field-tested solutions trusted by healthcare networks across Saudi Arabia and the Gulf region</span>
                  </li>
                </ul>
              </div>
              
              <p className="font-semibold text-[#8B4513] text-lg mt-6">
                Challenging the status quo. Delivering what others say is impossible.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-testid="hero-deck-btn"
              >
                Get In Touch
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="https://aretion.co.uk/governance"
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

// Solutions Section - Disruptive Technology Portfolio
const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="solutions-section">
      <div className="container-main">
        {/* Section Header */}
        <motion.div 
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Our Technology
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4" data-testid="solutions-title">
            Disruptive Solutions Suite
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            Nine breakthrough platforms transforming how critical infrastructure organizations operate, respond, and protect what matters most.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="solutions-grid" data-testid="solutions-grid">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className={`solution-card ${solution.size} ${solution.bgImage ? 'has-bg-image' : ''}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              data-testid={`solution-card-${solution.id}`}
              style={solution.bgImage ? {
                position: 'relative',
                overflow: 'hidden'
              } : {}}
            >
              {solution.bgImage && (
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${solution.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(1px)',
                    opacity: 0.2,
                    transform: 'scale(1.05)'
                  }}
                />
              )}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded bg-[#1E3A5F]/10 flex items-center justify-center">
                    <solution.icon className="h-6 w-6 text-[#1E3A5F]" />
                  </div>
                  {solution.comingSoon ? (
                    <span className="badge-coming-soon">Coming Soon</span>
                  ) : (
                    <span className="badge-available">Available</span>
                  )}
                </div>
                <h3 className="font-subheading text-xl font-semibold text-[#1E3A5F] mb-2">
                  {solution.title}
                </h3>
                <p className="font-body text-[#3D1C1C]/70 text-sm leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Capabilities Section - Competitive Moat
const CapabilitiesSection = () => {
  const sections = [
    {
      id: "early-warning",
      title: "Proprietary Early Warning Technology",
      items: [
        {
          icon: Droplets,
          title: "Real-time infrastructure intelligence",
          description: "These solutions provide predictive insights that competitors cannot replicate. Deployed across numerous facilities with an exceptionally low false positive rate—a significant improvement over legacy systems."
        },
        {
          icon: Thermometer,
          title: "Machine learning at the edge",
          description: "Proprietary ML models trained on extensive facility data enable predictive maintenance that dramatically reduces equipment failures. Each deployment generates training data that strengthens our competitive moat—a flywheel effect that accelerates with scale."
        },
        {
          icon: Shield,
          title: "CBRN detection and response",
          description: "Advanced Chemical, Biological, Radiological, and Nuclear threat detection integrated into our early warning ecosystem. Real-time monitoring and automated response protocols protect personnel and infrastructure from emerging threats."
        }
      ]
    },
    {
      id: "fire-detection",
      title: "Unified Detection Platform",
      items: [
        {
          icon: Flame,
          title: "System-agnostic integration layer",
          description: "Our middleware integrates with many legacy detection systems, creating immediate value without rip-and-replace. This approach reduces sales cycles significantly and creates switching costs that drive excellent retention rates."
        },
        {
          icon: LayoutDashboard,
          title: "Command center dashboard",
          description: "Real-time operational visibility across distributed facilities. Enterprise customers report significantly faster incident response times. Dashboard telemetry feeds our analytics engine, creating upsell opportunities for predictive modules."
        }
      ]
    },
    {
      id: "data-center",
      title: "Critical Infrastructure Protection",
      items: [
        {
          icon: Database,
          title: "Data center resilience",
          description: "Purpose-built for healthcare data centers where downtime is extremely costly. Our uptime SLA is backed by insurance—a unique market differentiator that closes enterprise deals."
        },
        {
          icon: Lock,
          title: "Compliance automation",
          description: "Automated compliance reporting for HIPAA, SOC 2, and regional healthcare regulations. Dramatically reduces customer audit costs and creates regulatory lock-in that competitors cannot easily overcome."
        }
      ]
    },
    {
      id: "leadership",
      title: "Executive Continuity Solutions",
      items: [
        {
          icon: Shield,
          title: "High-margin hardware bundle",
          description: "Secure operations centers combine proprietary hardware with software subscriptions. Hardware drives significant deal value with strong margins; software creates recurring revenue at even higher margins. Long-term contracts with substantial value."
        },
        {
          icon: Satellite,
          title: "Resilient communications",
          description: "Satellite-backup communication systems ensure continuity during regional outages. This capability is mandatory for government contracts—a large addressable market we're positioned to capture."
        }
      ]
    },
    {
      id: "all-hazard",
      title: "Platform Architecture",
      items: [
        {
          icon: Zap,
          title: "Unified response orchestration",
          description: "Single platform replacing multiple point solutions. Customers consolidate vendor relationships, significantly reducing their total cost of ownership while increasing our share of wallet. The platform creates natural expansion revenue as customers adopt additional modules."
        },
        {
          icon: Hospital,
          title: "Field-validated technology",
          description: "Created and tested by field disaster specialists. This operational track record is our primary sales asset—prospects can speak with reference customers who've relied on our systems during actual crises. No competitor can match this validation."
        }
      ]
    }
  ];

  return (
    <TooltipProvider>
    <section id="capabilities" className="py-20 lg:py-28 bg-white" data-testid="capabilities-section">
      <div className="container-main">
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Innovation Edge
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
            Technology Differentiation
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            Proprietary technology and field-tested innovations that set us apart from conventional solutions.
          </p>
        </motion.div>

        {/* Capability Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
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
                  <div key={itemIndex} className="hidden md:block">
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20 cursor-pointer hover:bg-[#1E3A5F] hover:border-[#1E3A5F] transition-all group"
                          initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#1E3A5F] group-hover:bg-[#C4A77D] flex items-center justify-center flex-shrink-0 transition-colors">
                              <item.icon className="h-5 w-5 text-[#C4A77D] group-hover:text-[#1E3A5F]" />
                            </div>
                            <h4 className="font-heading text-lg font-semibold text-[#1E3A5F] group-hover:text-white transition-colors">
                              {item.title}
                            </h4>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="bottom" 
                        className="max-w-md p-4 bg-[#1E3A5F] text-white border-none shadow-xl"
                      >
                        <p className="font-body text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
                {/* Mobile version - shows description directly */}
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={`mobile-${itemIndex}`}
                    className="md:hidden bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20"
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

        {/* Why This Matters */}
        <motion.div 
          className="mt-20 bg-[#1E3A5F] rounded-lg p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
            Why This Matters
          </h3>
          <p className="font-body text-white/90 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            Operations never stop. When your facility's early warning systems detect threats before they become crises, when your leadership team can coordinate response from a secure position, when your critical infrastructure fails over automatically rather than failing completely—operations continue uninterrupted. Treatment schedules hold. Processes proceed. Emergency departments function.
          </p>
          <p className="font-body text-[#C4A77D] text-lg font-semibold">
            Your facility becomes more than a collection of buildings and equipment. It becomes a resilient organism designed to deliver through any scenario.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://platform.aretion.org/contact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Schedule a Facility Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
    </TooltipProvider>
  );
};

// Benefits Section
const BenefitsSection = () => {
  return (
    <section id="benefits" className="benefits-section py-20 lg:py-28" data-testid="benefits-section">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
              Why ARETION
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-6" data-testid="benefits-title">
              The Disruptive Difference
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 max-w-2xl mx-auto">
              We don't just improve existing systems—we reimagine what's possible when technology is designed without constraints.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="benefits-list">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex items-start gap-4 p-6 bg-white/80 rounded border border-[#6B8CAE]/20"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-subheading font-semibold text-[#1E3A5F]">{benefit.title}</h4>
                  <p className="text-sm text-[#3D1C1C]/70">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Demo Section - CTA
const DemoSection = () => {
  return (
    <section id="demo" className="py-20 lg:py-28 bg-white" data-testid="demo-section">
      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
              Get Started
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-6" data-testid="demo-title">
              Ready to Disrupt the Status Quo?
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 mb-10 max-w-2xl mx-auto">
              Join the organizations already transforming their operations with ARETION's disruptive technology platforms.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary" 
                data-testid="demo-request-btn"
              >
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary" 
                data-testid="demo-call-btn"
              >
                Contact Us
              </a>
            </div>

            {/* Key Differentiators */}
            <div className="grid sm:grid-cols-3 gap-6" data-testid="demo-features">
              <div className="stats-card">
                <Zap className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">AI-Powered</h4>
                <p className="text-sm text-[#3D1C1C]/70">Intelligent automation at every level</p>
              </div>
              <div className="stats-card">
                <Shield className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Field-Proven</h4>
                <p className="text-sm text-[#3D1C1C]/70">Tested in real emergency scenarios</p>
              </div>
              <div className="stats-card">
                <Building className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Enterprise Ready</h4>
                <p className="text-sm text-[#3D1C1C]/70">Scalable for any organization size</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Market Opportunity Section
const MarketOpportunitySection = () => {
  const marketSegments = [
    { segment: "Critical Infrastructure Protection", value: "$197B", growth: "5.1% CAGR" },
    { segment: "Disaster Preparedness Systems", value: "$308B", growth: "8.2% CAGR" },
    { segment: "Natural Disaster Detection (IoT)", value: "$25.2B", growth: "36.3% CAGR" },
    { segment: "Business Continuity Management", value: "$2.09B", growth: "15.5% CAGR" },
  ];

  const growthDrivers = [
    { icon: Zap, title: "Climate Urgency", description: "Increasing frequency and severity of natural disasters driving mandatory preparedness" },
    { icon: Building, title: "Government Mandates", description: "Multi-billion dollar allocations for resilience infrastructure globally" },
    { icon: Radio, title: "IoT & AI Maturity", description: "Technology now reliable enough for mission-critical deployment" },
    { icon: Shield, title: "Regulatory Tailwinds", description: "Early warning systems becoming legally mandated across jurisdictions" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" data-testid="market-section">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Market Opportunity
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            $500B+ Combined Addressable Market
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            The global demand for critical infrastructure protection, disaster detection, and automated response technology is experiencing unprecedented growth.
          </p>
        </motion.div>

        {/* Market Segments */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {marketSegments.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0E8] rounded-lg p-6 text-center border border-[#6B8CAE]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-1">{item.value}</div>
              <div className="font-subheading text-sm font-semibold text-[#8B4513] mb-2">{item.growth}</div>
              <p className="font-body text-sm text-[#3D1C1C]/70">{item.segment}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Now */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-2xl font-bold text-[#1E3A5F] text-center mb-8">Why Now?</h3>
          <div className="grid sm:grid-cols-2 gap-6">
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

// Why We Win Section (Competitive Moat)
const WhyWeWinSection = () => {
  const advantages = [
    {
      icon: Zap,
      title: "Cutting-Edge Technology",
      description: "AI-powered predictive detection that identifies disasters before they happen, with automated response in under one second."
    },
    {
      icon: Users,
      title: "Built by Domain Experts",
      description: "Designed by senior specialists across disaster management, business continuity, healthcare operations, and clinical research."
    },
    {
      icon: Shield,
      title: "Battle-Tested Solutions",
      description: "Created and tested by field disaster specialists in real emergency situations—not theoretical simulations."
    },
    {
      icon: Building,
      title: "Purpose-Built for Institutions",
      description: "Specifically designed for governments, municipalities, and critical infrastructure operators—not retrofitted consumer technology."
    },
    {
      icon: Lock,
      title: "Integrated Platform",
      description: "Unified solution covering detection, response, and continuity. Competitors offer siloed point solutions; we offer end-to-end protection."
    },
    {
      icon: TrendingUp,
      title: "Modular & Scalable",
      description: "Architecture scales from single-site deployment to national infrastructure with minimal marginal cost increase."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="moat-section">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Competitive Advantage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            Why We Win
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            A combination no competitor offers: integrated predictive and response platform built by experts who understand the operational reality of critical infrastructure.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 border border-[#6B8CAE]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#1E3A5F] flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-[#C4A77D]" />
              </div>
              <h4 className="font-heading text-lg font-bold text-[#1E3A5F] mb-2">{item.title}</h4>
              <p className="font-body text-sm text-[#3D1C1C]/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Business Model Section
const BusinessModelSection = () => {
  const revenueStreams = [
    { icon: Database, title: "Hardware & Devices", description: "Sensors, detection devices, and monitoring equipment with maintenance contracts", type: "Capital + Recurring" },
    { icon: LayoutDashboard, title: "SaaS Platform", description: "Cloud-based monitoring, analytics, and command center subscription", type: "Annual Subscription" },
    { icon: Users, title: "Consulting & Implementation", description: "Deployment, integration, and training services", type: "Project-Based" },
    { icon: Shield, title: "Government Contracts", description: "Multi-year framework agreements with ministries and municipalities", type: "Long-Term Agreements" },
    { icon: TrendingUp, title: "Data & Intelligence", description: "Premium predictive analytics, risk scoring, and insights", type: "Subscription" },
    { icon: FileText, title: "Technology Licensing", description: "IP licensing to third-party integrators and partners", type: "Royalty/License" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" data-testid="business-model-section">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Business Model
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            Multiple Revenue Streams
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            Diversified income sources ensuring sustainable growth and predictable revenue through government-backed contracts.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {revenueStreams.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-[#C4A77D]" />
                </div>
                <span className="text-xs font-semibold text-[#8B4513] bg-[#8B4513]/10 px-2 py-1 rounded">{item.type}</span>
              </div>
              <h4 className="font-heading text-lg font-bold text-[#1E3A5F] mb-2">{item.title}</h4>
              <p className="font-body text-sm text-[#3D1C1C]/70">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Highlights */}
        <motion.div 
          className="mt-12 max-w-3xl mx-auto bg-[#1E3A5F] rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-xl font-bold text-white mb-4">Revenue Model Highlights</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-white">
            <div>
              <div className="font-heading text-2xl font-bold text-[#C4A77D]">Long-Term</div>
              <p className="text-sm text-white/80">Government contracts with multi-year visibility</p>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-[#C4A77D]">Recurring</div>
              <p className="text-sm text-white/80">SaaS subscriptions provide predictable revenue</p>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-[#C4A77D]">Scalable</div>
              <p className="text-sm text-white/80">Platform scales without proportional cost increase</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section - Trusted Partners
const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="testimonials-section">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Proven Impact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4" data-testid="testimonials-title">
            Trusted by Industry Leaders
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 mb-12">
            Our solutions are deployed across critical infrastructure sectors, delivering measurable results.
          </p>
          
          {/* Golden Minute Stat */}
          <div className="text-center mb-12">
            <div className="font-heading text-4xl sm:text-5xl font-bold text-[#8B4513] mb-2">
              Golden <span className="relative"><span className="opacity-50">Hour</span><span className="absolute left-0 right-0 top-1/2 h-[3px] bg-[#1E3A5F]"></span></span> <span className="font-body text-[#1E3A5F]">Minute</span>
            </div>
            <p className="font-body text-[#3D1C1C]/80">Response Optimization</p>
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
                <span className="font-subheading font-semibold text-[#3D1C1C]">Healthcare Industry</span>
              </div>
            </div>
          </div>

          {/* Milestone */}
          <div className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-full mb-8">
            <CheckCircle className="h-5 w-5 text-[#C4A77D]" />
            <span className="font-subheading font-semibold">All Products Ready to Deploy</span>
          </div>
          
          {/* CTA to Contact */}
          <div className="mt-4">
            <a 
              href="https://platform.aretion.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-testid="testimonials-contact-btn"
            >
              Explore Partnership
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Trust & Compliance Section
const TrustComplianceSection = () => {
  const certifications = [
    {
      title: "CSA STAR Level Two",
      subtitle: "Security Trust Assurance and Risk",
      description: "Third-Party Audit — CSA Three-Tiered Cloud Security Assurance Program"
    },
    {
      title: "ISO/IEC 27001",
      subtitle: "Information Security Management",
      description: "Certified Information Security Management Standard"
    },
    {
      title: "ISO/IEC 27017",
      subtitle: "Cloud Security Controls",
      description: "Code of Practice for Cloud-Specific Information Security Controls"
    },
    {
      title: "ISO/IEC 27018",
      subtitle: "Personal Data Protection",
      description: "Code of Practice for Protecting Personal Data in the Cloud"
    },
    {
      title: "PCI DSS v4.0.1",
      subtitle: "Payment Security",
      description: "Payment Card Industry Data Security Standard Compliant"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" data-testid="compliance-section">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Trust & Compliance
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            Our platforms are built on a foundation of rigorous security standards and regulatory compliance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#1E3A5F] flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-[#C4A77D]" />
              </div>
              <h4 className="font-heading text-lg font-bold text-[#1E3A5F] mb-1">{cert.title}</h4>
              <p className="font-subheading text-sm font-semibold text-[#8B4513] mb-2">{cert.subtitle}</p>
              <p className="font-body text-sm text-[#3D1C1C]/70">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const contactLinks = [
    { title: "Investor Relations", url: "https://platform.aretion.org/contact" },
    { title: "Strategic Partnerships", url: "https://platform.aretion.org/contact" },
    { title: "Media & Press", url: "https://platform.aretion.org/contact" },
    { title: "General Inquiries", url: "https://platform.aretion.org/contact" }
  ];

  return (
    <section id="contact" className="contact-section py-20 lg:py-28" data-testid="contact-section">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#C4A77D] mb-4">
              Connect
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6" data-testid="contact-title">
              Let's Talk
            </h2>
            <p className="font-body text-white/80 mb-12">
              Whether you're an investor, potential partner, or enterprise customer—we'd like to hear from you.
            </p>

            <div className="grid sm:grid-cols-2 gap-4" data-testid="contact-links">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  data-testid={`contact-link-${index}`}
                >
                  <span className="font-heading text-lg text-white">{link.title}</span>
                  <ArrowRight className="h-5 w-5 text-[#C4A77D] group-hover:translate-x-1 transition-transform" />
                </motion.a>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4">
                For investor inquiries:
              </p>
              <a 
                href="mailto:contact@aretion.org"
                className="inline-flex items-center text-[#C4A77D] font-semibold hover:text-white transition-colors text-lg"
                data-testid="contact-direct-email"
              >
                contact@aretion.org
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section py-12" data-testid="footer">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Logo & Company Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto brightness-0 invert" />
              <span className="font-heading text-lg font-bold text-white">Arkan Alray Co</span>
            </div>
            <p className="text-white/60 text-sm mb-2">Registered in the Kingdom of Saudi Arabia</p>
          </div>

          {/* Contact Information */}
          <div className="text-white/80 text-sm space-y-2">
            <p className="font-semibold text-white mb-3">Contact Us</p>
            <p>King Abdullah Financial District</p>
            <p>Innovation Boulevard, Al Aqeeq</p>
            <p>KAFD, Building 7229, Riyadh 13519</p>
            <p className="mt-3">
              <a href="tel:+966115256458" className="hover:text-white transition-colors">+966 11 525 6458</a>
            </p>
            <p>
              <a href="mailto:Contact@aretion.org" className="hover:text-white transition-colors">Contact@aretion.org</a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm" data-testid="footer-copyright">
            © {currentYear} Arkan Alray Co. All rights reserved.
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

