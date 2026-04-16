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
    title: "AI Chatbot Engine",
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
  { title: "AI-First Approach", description: "Machine learning and automation at the core of every solution" },
  { title: "Proven Innovation", description: "Four patents pending protecting our breakthrough methodologies" },
  { title: "Scalable Architecture", description: "Cloud-native platforms built for rapid deployment and growth" },
  { title: "Field-Tested", description: "Solutions refined through real-world emergency deployments" },
  { title: "Integration Ready", description: "Seamless connectivity with existing infrastructure and systems" },
  { title: "Future-Proof", description: "Continuously evolving technology that stays ahead of emerging challenges" },
  { title: "Domain Expertise", description: "Built by specialists who understand critical infrastructure operations" },
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
              href="https://aretion.co.uk/governance" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
              data-testid="nav-meet-team"
            >
              Leadership
            </a>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <a 
              href="https://aretion.co.uk/contact"
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
              <a href="https://aretion.co.uk/governance" target="_blank" rel="noopener noreferrer" className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Leadership</a>
              <button onClick={() => scrollToSection("contact")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Contact</button>
              <a href="https://aretion.co.uk/contact" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">Get In Touch</a>
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
                href="https://aretion.co.uk/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-testid="hero-deck-btn"
              >
                Get In Touch
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <button 
                onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
                data-testid="hero-explore-btn"
              >
                Explore Solutions
              </button>
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
              href="https://aretion.co.uk/contact" 
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
                href="https://aretion.co.uk/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary" 
                data-testid="demo-request-btn"
              >
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="https://aretion.co.uk/contact"
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

// Testimonials Section - Trusted Partners
const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="testimonials-section">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            Trusted Partners
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4" data-testid="testimonials-title">
            Transforming Critical Infrastructure
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 mb-8">
            Trusted by healthcare networks and critical infrastructure operators across Saudi Arabia.
          </p>
          
          {/* CTA to Contact */}
          <div className="mt-8">
            <a 
              href="https://aretion.co.uk/contact"
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

// Contact Section - Investor Relations
const ContactSection = () => {
  const contactLinks = [
    { title: "Investor Relations", url: "mailto:solutions@aretion.co.uk?subject=Investor%20Inquiry" },
    { title: "Strategic Partnerships", url: "mailto:solutions@aretion.co.uk?subject=Partnership%20Inquiry" },
    { title: "Media & Press", url: "mailto:solutions@aretion.co.uk?subject=Media%20Inquiry" },
    { title: "General Inquiries", url: "mailto:solutions@aretion.co.uk?subject=General%20Inquiry" }
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
                href="mailto:solutions@aretion.co.uk"
                className="inline-flex items-center text-[#C4A77D] font-semibold hover:text-white transition-colors text-lg"
                data-testid="contact-direct-email"
              >
                Solutions@aretion.co.uk
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
  const [activePolicy, setActivePolicy] = useState(null);

  const policies = {
    privacy: {
      title: "Privacy Notice",
      lastUpdated: "9 Feb 2026",
      content: `We, ARETION & Company (the brand used on aretion.co.uk), understand that your privacy is important to you. We are committed to respecting your privacy and protecting your personal data.

1. Data Controller
When ARETION & Company collects and processes personal data in accordance with this Privacy Notice, we do so as a data controller.

Company details:
• Legal name: ARETION & Company
• Registered office: 71-75 SHELTON STREET COVENT GARDEN, LONDON, WC2H 9JQ
• Contact email: post@aretion.co.uk
• Data Protection Officer: dpo@aretion.co.uk

2. Who This Notice Applies To
This Privacy Notice applies to:
• Website visitors
• People who contact us with enquiries
• Representatives of clients, partners, suppliers
• Individuals who request or receive services
• Job applicants

3. How We Collect Personal Data
We collect personal data:
• Directly from you (when you email us or submit an enquiry)
• Automatically when you use our website
• From your organisation
• From third parties where appropriate

4. Categories of Personal Data
• Name, email address, telephone number
• Organisation and role
• The content of your messages
• Website technical and usage data
• Recruitment data (if applicable)

5. Why We Use Personal Data
• Providing and securing the website
• Responding to enquiries and relationship management
• Service delivery
• Legal compliance and protection of rights

6. Your Rights
You may have the right to:
• Request access to personal data
• Request rectification
• Request erasure
• Request restriction of processing
• Object to processing
• Request data portability
• Withdraw consent

7. Contact and Complaints
Contact: post@aretion.co.uk (please include "Privacy" in the subject line)
Complaints: You have the right to lodge a complaint with the Information Commissioner's Office (ICO).`
    },
    terms: {
      title: "Terms of Use",
      lastUpdated: "7 Feb 2026",
      content: `These Terms of Use apply to your access to and use of the ARETION & Company website. By using the Site, you agree to these Terms.

1. About These Terms
These Terms apply to your use of the Site and all content and functionality made available through the Site.

2. About Us
The Site is operated by ARETION & Company.
Contact: Post@aretion.co.uk
Registered office: 71-75 SHELTON STREET COVENT GARDEN, LONDON, WC2H 9JQ

3. Copyright and Intellectual Property
All Site Content is owned by or licensed to ARETION and is protected by applicable intellectual property laws. You may not copy, reproduce, modify, or distribute any Site Content without our prior written permission.

4. Use of Site Content
We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Site for your internal, non-commercial use.

5. Restrictions
You may not:
• Access, search, collect, or mine data from the Site by automated means
• "Mirror" the Site Content
• Use the Site to develop AI tools or machine learning systems
• Use the Site in violation of applicable laws

6. User Submissions
If you submit materials to us, you grant ARETION a worldwide, non-exclusive, royalty-free licence to use your submission for purposes connected with operating the Site.

7. Disclaimers
The Site and Site Content are provided "as is" and "as available", without warranty of any kind.

8. Limitation of Liability
To the extent permitted by law, ARETION will not be liable for any loss or damage arising out of your use of the Site.

9. Governing Law
These Terms are governed by the laws of England and Wales.

10. Contact
Questions: compliance@aretion.co.uk`
    },
    conduct: {
      title: "Code of Conduct",
      lastUpdated: "10 Feb 2026",
      content: `ARETION & Company and its subsidiaries are committed to the highest standards of ethical conduct, professional integrity, and legal compliance.

Our Core Values:
• Integrity - Act with honesty, fairness, and transparency
• Patient-Centred Impact - Prioritise patient safety and wellbeing
• Independence and Objectivity - Provide impartial, evidence-based advice
• Respect - Value the dignity and rights of everyone
• Accountability - Take responsibility for our work
• Sustainability - Consider long-term environmental and social impact
• Transparency - Communicate openly and honestly

Key Principles:

1. Anti-Bribery and Anti-Corruption
Zero-tolerance policy on bribery and corruption in any form.

2. Conflicts of Interest
Committed to identifying, disclosing, and managing conflicts of interest fairly and transparently.

3. Confidentiality and Data Protection
Committed to protecting sensitive and confidential information, including patient data and client information.

4. Professional Conduct
• Provide honest, competent, evidence-based advice
• Challenge advice that could harm patients
• Respect patient autonomy and informed consent

5. Fair Treatment and Inclusion
• Equal opportunity in recruitment and career development
• Fair pay and reward
• Respectful treatment regardless of background
• Zero tolerance for discrimination or harassment

6. Speaking Up
We encourage reporting concerns without fear of retaliation.

Contact:
• Compliance Team: compliance@aretion.co.uk
• Whistleblowing Hotline: +44 20 3985 0907`
    },
    antibribery: {
      title: "Anti-Bribery and Anti-Corruption Policy",
      lastUpdated: "14 Feb 2026",
      content: `ARETION & Company has ZERO TOLERANCE for bribery and corruption in any form.

1. Policy Statement
We are committed to conducting business ethically, transparently, and in full compliance with all applicable anti-bribery and anti-corruption laws.

2. What is Bribery?
Bribery is the offer, promise, giving, requesting, or acceptance of any advantage with the intention of:
• Inducing someone to perform an improper function
• Rewarding them for having done so
• Influencing them to act improperly

3. Prohibited Conduct
• Offering or giving bribes
• Receiving or soliciting bribes
• Using third parties for bribery
• Facilitation payments (strictly prohibited)

4. Gifts and Hospitality
Modest, reasonable gifts and hospitality may be appropriate if they:
• Are of modest value (typically under £50)
• Are not cash or cash equivalents
• Are not connected to pending business decisions
• Are transparent and properly recorded

5. Government Officials
Interactions with government officials require heightened care. Prior written approval from Compliance is required before providing any benefit.

6. Third-Party Intermediaries
We are responsible for the conduct of agents, consultants, and other intermediaries. Due diligence is required before engagement.

7. Reporting
If you suspect bribery or corruption, report immediately to:
• Your manager
• Compliance Team: compliance@aretion.co.uk
• Whistleblowing Hotline: +44 20 3985 0907

8. Protection Against Retaliation
ARETION prohibits retaliation against anyone who reports concerns in good faith.

9. Consequences
Breaches may result in:
• Disciplinary action including dismissal
• Criminal prosecution
• Civil liability
• Regulatory sanctions`
    }
  };

  return (
    <>
      <footer className="footer-section py-12" data-testid="footer">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-4">
              <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto brightness-0 invert" />
              <span className="font-heading text-lg font-bold text-white">ARETION & Company</span>
            </div>

            {/* Footer Links */}
            <nav className="flex flex-wrap justify-center gap-6" data-testid="footer-links">
              <button 
                onClick={() => setActivePolicy('privacy')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-privacy"
              >
                Privacy Notice
              </button>
              <button 
                onClick={() => setActivePolicy('terms')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-terms"
              >
                Terms of Use
              </button>
              <button 
                onClick={() => setActivePolicy('conduct')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-conduct"
              >
                Code of Conduct
              </button>
              <button 
                onClick={() => setActivePolicy('antibribery')} 
                className="footer-link cursor-pointer" 
                data-testid="footer-anti-bribery"
              >
                Anti-Bribery Policy
              </button>
            </nav>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-white/60 text-sm" data-testid="footer-copyright">
              © {currentYear} ARETION & Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      <Dialog open={activePolicy !== null} onOpenChange={() => setActivePolicy(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] bg-[#F5F0E8]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-[#1E3A5F]">
              {activePolicy && policies[activePolicy]?.title}
            </DialogTitle>
            <p className="text-sm text-[#6B8CAE]">
              Last updated: {activePolicy && policies[activePolicy]?.lastUpdated}
            </p>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="prose prose-sm max-w-none">
              {activePolicy && (
                <pre className="whitespace-pre-wrap font-body text-sm text-[#3D1C1C] leading-relaxed bg-transparent border-none p-0">
                  {policies[activePolicy]?.content}
                </pre>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
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
        <DemoSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
