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

// Solutions Data
const solutions = [
  {
    id: 1,
    title: "DisasterMs",
    description: "Advanced ecosystem for facility safety with early warning, disaster prediction, and full closed-loop response system.",
    icon: ShieldCheck,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.disasterms
  },
  {
    id: 2,
    title: "Specialized Chatbot",
    description: "Secure AI chatbot trained on organizational data, providing accurate, source-based answers with minimal hallucination.",
    icon: Brain,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.chatbot
  },
  {
    id: 3,
    title: "Predictive Models",
    description: "Statistical models for predicting climate-related changes and natural disasters, improving preparedness.",
    icon: TrendingUp,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.predictive
  },
  {
    id: 4,
    title: "Triage",
    description: "Digital system for recognizing and identifying mass-casualty victims, fully integrated with facility systems.",
    icon: Users,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.triage
  },
  {
    id: 5,
    title: "EM:CC",
    description: "Emergency Medicine Cluster Coverage connecting facilities in the same region for safe patient journey management.",
    icon: Radio,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.emcc
  },
  {
    id: 6,
    title: "Tele-Intubation",
    description: "Remote expert support for critical airway management in emergency situations.",
    icon: Stethoscope,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.teleintubation
  },
  {
    id: 7,
    title: "Tele Code Blue Kit",
    description: "Virtual tools to activate and coordinate code blue events remotely.",
    icon: HeartPulse,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.codeblue
  },
  {
    id: 8,
    title: "Protocol Designer",
    description: "AI SaaS platform to design and manage custom disaster and emergency protocols.",
    icon: FileText,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.protocol
  },
  {
    id: 9,
    title: "Consultation Platform",
    description: "Our ready-built consultation platform adapts to telemedicine providers, advisory firms, educational institutes, and international conferences.",
    icon: Video,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.consultation
  }
];

// Benefits Data
const benefits = [
  { title: "Stronger Safety", description: "Enhanced readiness for any emergency scenario" },
  { title: "Smarter Decisions", description: "Data-driven decision support" },
  { title: "Clear Visibility", description: "Comprehensive dashboards for leaders" },
  { title: "Modular Platform", description: "Scalable solutions that grow with you" }
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
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection("demo")} 
              className="btn-primary"
              data-testid="nav-book-demo"
            >
              Book a Demo
            </button>
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
              <button onClick={() => scrollToSection("benefits")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Benefits</button>
              <button onClick={() => scrollToSection("contact")} className="text-left font-subheading text-sm font-medium text-[#3D1C1C] py-2">Contact</button>
              <button onClick={() => scrollToSection("demo")} className="btn-primary w-full">Book a Demo</button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// Hero Section
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
              Smarter Systems. Better Outcomes. Ahead of the Curve.
            </p>
            
            <div className="font-heading text-[#3D1C1C]/80 leading-relaxed space-y-6 text-left max-w-3xl mx-auto">
              <p>
                At ARETION Solutions, we understand that modern organizations demand more than incremental improvements—it demands transformation. Critical infrastructure and organizations face unprecedented challenges: rising operational complexity, safety imperatives, and the need to deliver exceptional performance at scale.
              </p>
              <p className="font-semibold text-[#1E3A5F]">
                We don't just offer solutions. We partner with you to reimagine what's possible.
              </p>
              
              <div className="mt-8">
                <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4">What Sets Us Apart</h3>
                <p className="mb-4">
                  Our expertise spans the full stack—from intelligent systems architecture to advanced statistical modeling, process automation, and predictive analytics. Our team of full-stack engineers, data scientists, and domain specialists work in concert to solve the problems that matter most:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Smarter Operations:</strong> Streamlined workflows, optimized resource allocation, and reduced inefficiencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Safer Operations:</strong> Real-time insights, risk prediction, and evidence-driven decision support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-0.5" />
                    <span><strong>Future-Ready Infrastructure:</strong> Scalable, adaptable solutions that evolve with your institution</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4">Who We Serve</h3>
                <p>
                  Whether you're a regional facility seeking operational excellence, a large network pursuing system-wide transformation, or a research institution advancing science, ARETION is built for you.
                </p>
              </div>
              
              <p className="text-[#1E3A5F] font-medium mt-6">
                The landscape is changing rapidly. The question isn't whether you'll adapt—it's whether you'll lead.
              </p>
              <p className="font-semibold text-[#8B4513] text-lg">
                Let's make your systems smarter, together.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <button 
                onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
                data-testid="hero-explore-btn"
              >
                Explore Solutions
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section
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
            Our Solutions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4" data-testid="solutions-title">
            Comprehensive Infrastructure Suite
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            Discover our integrated platform designed to enhance safety, efficiency, and coordination within critical infrastructure facilities.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="solutions-grid" data-testid="solutions-grid">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className={`solution-card ${solution.size} ${solution.bgImage ? 'has-bg-image' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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

// Capabilities Section - Detailed Feature Descriptions
const CapabilitiesSection = () => {
  const sections = [
    {
      id: "early-warning",
      title: "Early Warning Detection",
      items: [
        {
          icon: Droplets,
          title: "Detecting threats before they impact operations",
          description: "Our environmental monitoring systems represent years of precision engineering to identify critical infrastructure failures before they cascade into operational crises. Deployed across facilities from emergency departments to research centers, these solutions continuously analyze water levels, temperature variations, and pressure anomalies in real-time. When patterns deviate from normal baselines, the system doesn't just alert—it begins orchestrating protective responses automatically. Leaders no longer need to wait for a flooding alarm to realize their basement is compromised."
        },
        {
          icon: Thermometer,
          title: "Understanding your facility's vital signs",
          description: "Temperature isn't just a comfort metric in critical infrastructure. It's a language that tells the story of system health. Our thermal monitoring platform listens to that language across every critical zone—from operating rooms maintaining surgical precision to data centers requiring absolute climate stability. The system learns what \"normal\" looks like for your unique facility, then watches for the whispers of trouble. A subtle temperature shift that a human might dismiss often precedes catastrophic equipment failure by hours."
        }
      ]
    },
    {
      id: "fire-detection",
      title: "Fire & Flame Detection",
      items: [
        {
          icon: Flame,
          title: "Integration that changes everything",
          description: "Fire detection isn't new. What's new is making every fire detector in your facility intelligent and connected. Our platform unifies disparate detection systems into a coherent intelligence network. When one detector triggers, the entire facility responds with clarity—leadership knows where the threat is, what systems are activating, and how pathways need to shift. No confusion. No delay. No false alarms disrupting operations unnecessarily."
        },
        {
          icon: LayoutDashboard,
          title: "Vision across your entire facility",
          description: "Every flame detector, every heat monitor, every smoke alarm—they're no longer isolated sentries. They're nodes in a unified command network. The dashboard shows not just where fire has been detected, but the trajectory of threats as they develop, allowing facility teams to stay ahead of escalation rather than chasing emergencies as they unfold."
        }
      ]
    },
    {
      id: "data-center",
      title: "Data Center & Critical Infrastructure",
      items: [
        {
          icon: Database,
          title: "When your data center is everything, security is everything",
          description: "Records. Treatment histories. Research data. Lab results. The digital heartbeat of modern organizations. Our data center protection systems maintain constant surveillance of the environmental and security factors that keep this critical infrastructure alive. Temperature fluctuations, humidity imbalances, power supply anomalies, unauthorized access attempts—all monitored, all correlated, all responded to with automated precision."
        },
        {
          icon: Lock,
          title: "Continuity without compromise",
          description: "Your systems must run. Always. Our infrastructure monitoring ensures that the moment any critical system shows signs of stress, failover mechanisms activate seamlessly. Backup power engages. Redundant cooling systems activate. Alternative data pathways come online. Operations never pause because your digital infrastructure never fails."
        }
      ]
    },
    {
      id: "leadership",
      title: "Leadership Protection & Secure Operations",
      items: [
        {
          icon: Shield,
          title: "Executive safety in an uncertain world",
          description: "Your facility's leadership team faces threats that extend far beyond operational complexity. CBRNE events. Cyber intrusions. Physical breaches. Our secure operations center is designed as a sanctuary—a hardened command post where executives maintain secure communication and strategic coordination even when facility-wide systems are compromised. Biometric access control, environmental contamination detection, isolated communication channels, and emergency protocols create a space where leadership can make decisions with absolute confidence in information security and personal safety."
        },
        {
          icon: Satellite,
          title: "Communication that survives catastrophe",
          description: "When conventional networks fail, backup systems activate. When buildings shake, encrypted channels hold steady. Your facility's leadership maintains the ability to communicate, coordinate, and command responses even under conditions that would silence lesser systems. This isn't redundancy—it's resilience architecture."
        }
      ]
    },
    {
      id: "all-hazard",
      title: "Holistic All-Hazard Response",
      items: [
        {
          icon: Zap,
          title: "One system. Every threat. Any scenario.",
          description: "Floods. Fires. Cyber attacks. Chemical threats. Power failures. Equipment breakdowns. Water system compromises. Most facilities have separate response protocols for each scenario, creating fragmentation and confusion when multiple threats emerge simultaneously. Our platform treats the facility as an integrated organism—where the response to one threat automatically coordinates with protections against all others. When a flood is detected in the basement AND a cyber intrusion begins simultaneously, the system doesn't execute two independent response playbooks. It understands the correlation, predicts cascading effects, and coordinates protective measures across physical and digital infrastructure."
        },
        {
          icon: Hospital,
          title: "Built for the reality of modern operations",
          description: "This isn't theoretical infrastructure protection. This is field-tested across hundreds of deployments. Refined through real emergencies. Strengthened by operational feedback from the teams who trust their most critical operations to these systems. Every component reflects the hard lessons learned when lives depend on decision speed and system reliability."
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
            Our Capabilities
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
            Comprehensive Protection Systems
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            From early warning detection to holistic all-hazard response, our integrated systems protect what matters most.
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
                  <Tooltip key={itemIndex} delayDuration={100}>
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
              Precision, Integration, Security
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 max-w-2xl mx-auto">
              We assign a dedicated project manager to each project, ensuring the full implementation of our premium IT solutions. This approach not only exceeds end-user expectations but also facilitates real-time feedback and enhancements, guaranteeing that your investment yields exceptional results.
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

// Demo Section
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
              Ready to Transform Your Operations?
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 mb-10 max-w-2xl mx-auto">
              Our consultants are ready to help you navigate your operational goals. 
              Book a demo to see our solutions in action.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary" 
                data-testid="demo-request-btn"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-6" data-testid="demo-features">
              <div className="stats-card">
                <Clock className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Quick Setup</h4>
                <p className="text-sm text-[#3D1C1C]/70">Get started within days, not months</p>
              </div>
              <div className="stats-card">
                <Building className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Enterprise Ready</h4>
                <p className="text-sm text-[#3D1C1C]/70">Scalable for any organization size</p>
              </div>
              <div className="stats-card">
                <ShieldCheck className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">Secure & Compliant</h4>
                <p className="text-sm text-[#3D1C1C]/70">Built with industry standards</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
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
            Trusted By
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4" data-testid="testimonials-title">
            Our Partners & Clients
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 mb-8">
            Working alongside leading organizations in Saudi Arabia and beyond.
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
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const contactLinks = [
    { title: "Sales Inquiry", url: "https://aretion.co.uk/contact" },
    { title: "Implementation & Integration", url: "https://aretion.co.uk/contact" },
    { title: "Research Collaboration", url: "https://aretion.co.uk/contact" },
    { title: "Careers/Recruitment", url: "https://aretion.co.uk/contact" }
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
              Get In Touch
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6" data-testid="contact-title">
              Contact Us
            </h2>
            <p className="font-body text-white/80 mb-12">
              Ready to explore innovative solutions for your organization? 
              Get in touch with our team.
            </p>

            <div className="grid sm:grid-cols-2 gap-4" data-testid="contact-links">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
                For immediate inquiries, email us directly at:
              </p>
              <a 
                href="mailto:solutions@aretion.co.uk"
                className="inline-flex items-center text-[#C4A77D] font-semibold hover:text-white transition-colors text-lg"
                data-testid="contact-direct-email"
              >
                solutions@aretion.co.uk
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
