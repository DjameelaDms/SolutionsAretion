import React, { useState, useEffect, createContext, useContext } from "react";
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
  Video,
  Globe
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

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Language Provider
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('aretion-language');
    return saved || 'ar';
  });

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('aretion-language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/0hzqlwr8_A_Logo-39.png";

// Solution Images
const SOLUTION_IMAGES = {
  disasterms: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/rk0yh9bv_Medical_Disaster.png",
  chatbot: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/qz2a2s5y_chatbot.png",
  predictive: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/djbwxkfm_Weather_Prediction.png",
  triage: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/bwwmdxdj_mass_triage.png",
  emcc: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/2l1wfmxb_emcc.png",
  teleintubation: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/a5mufowl_teleintubation.png",
  codeblue: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/5p4e1nlp_Code_Blue_Kit.png",
  protocol: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/h3svgqrj_protocol_designer.png",
  consultation: "https://customer-assets.emergentagent.com/job_medical-solutions/artifacts/a5mufowl_teleintubation.png"
};

// Arabic Solutions Data
const solutions = [
  {
    id: 1,
    title: "نظام إدارة الكوارث",
    subtitle: "DisasterMS",
    description: "منصة ثورية متكاملة للاستجابة للكوارث مدعومة بالذكاء الاصطناعي، توفر أنظمة إنذار مبكر واستجابة آلية تعيد تعريف معايير السلامة المؤسسية.",
    icon: ShieldCheck,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.disasterms
  },
  {
    id: 2,
    title: "المساعد الذكي",
    subtitle: "AI Assistant",
    description: "بنية RAG من الجيل الجديد توفر دقة غير مسبوقة. ذكاء اصطناعي مؤسسي يحوّل طريقة وصول المؤسسات للمعرفة الحيوية واتخاذ القرارات.",
    icon: Brain,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.chatbot
  },
  {
    id: 3,
    title: "التحليلات التنبؤية",
    subtitle: "Predictive Analytics",
    description: "نماذج تعلم آلي متطورة للتنبؤ بالمخاطر المناخية قبل وقوعها، تخدم قطاعات الصحة والمرافق والجهات الحكومية.",
    icon: TrendingUp,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.predictive
  },
  {
    id: 4,
    title: "نظام الفرز الجماعي",
    subtitle: "Mass Triage System",
    description: "تقنية رقمية رائدة لتحديد هوية المصابين، تحوّل الاستجابة للكوارث الجماعية بسرعة ودقة لم تكن ممكنة من قبل.",
    icon: Users,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.triage
  },
  {
    id: 5,
    title: "شبكة الطوارئ الطبية",
    subtitle: "EM:CC Network",
    description: "شبكة رائدة تربط المجمعات الصحية الإقليمية، تكسر الحواجز لتمكين إدارة سلسة لرحلة المريض عبر المنشآت.",
    icon: Radio,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.emcc
  },
  {
    id: 6,
    title: "التنبيب عن بُعد",
    subtitle: "Tele-Intubation",
    description: "تقنية التنبيب الروبوتي عن بُعد تعيد تعريف إدارة مجرى الهواء الحرج، بتوفير خبرة متخصصة لأي موقع فوراً.",
    icon: Stethoscope,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.teleintubation
  },
  {
    id: 7,
    title: "حقيبة الشفرة الزرقاء",
    subtitle: "Code Blue Kit",
    description: "نظام ثوري يجمع بين الأجهزة والبرمجيات للتنسيق عن بُعد في حالات الطوارئ، يحوّل الاستجابة لحالات التوقف القلبي.",
    icon: HeartPulse,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.codeblue
  },
  {
    id: 8,
    title: "مصمم البروتوكولات",
    subtitle: "Protocol Designer",
    description: "منصة مدعومة بالذكاء الاصطناعي تحدث ثورة في تصميم وتنفيذ بروتوكولات الطوارئ، من أسابيع إلى ساعات.",
    icon: FileText,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.protocol
  },
  {
    id: 9,
    title: "منصة الاستشارات",
    subtitle: "Consultation Platform",
    description: "بنية تحتية مرنة للرعاية الصحية عن بُعد تخدم قطاعات الطب عن بُعد والاستشارات والتعليم. منصة واحدة، تطبيقات لا محدودة.",
    icon: Video,
    comingSoon: false,
    size: "",
    bgImage: SOLUTION_IMAGES.consultation
  }
];

// Arabic Benefits Data
const benefits = [
  { title: "ابتكار بالتصميم", description: "تقنيات تتحدى الوضع الراهن وتفتح آفاقاً جديدة" },
  { title: "التركيز على إدارة الكوارث", description: "حلول مصممة خصيصاً للاستجابة للطوارئ وإدارة الأزمات" },
  { title: "الذكاء الاصطناعي أولاً", description: "التعلم الآلي والأتمتة في صميم كل حل نقدمه" },
  { title: "ابتكار مثبت", description: "أربع براءات اختراع قيد التسجيل تحمي منهجياتنا المبتكرة" },
  { title: "بنية قابلة للتوسع", description: "منصات سحابية مصممة للنشر السريع والنمو المستدام" },
  { title: "مختبرة ميدانياً", description: "حلول طُوّرت واختُبرت من قِبل متخصصين في حالات طوارئ حقيقية" },
  { title: "جاهزة للتكامل", description: "اتصال سلس مع البنية التحتية والأنظمة القائمة" },
  { title: "مستقبلية", description: "تطور مستمر للبقاء في طليعة التحديات الناشئة" },
  { title: "موثوقية حرجة", description: "أنظمة مصممة لضمان عدم التوقف عند الحاجة الماسة" }
];

// Header Component - Arabic
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

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
              <span className="font-heading text-xl font-bold text-[#1E3A5F]">أريشن للحلول</span>
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
                      {language === 'ar' ? 'EN' : 'عربي'}
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
                data-testid="nav-investor-deck"
              >
                تواصل معنا
              </a>
              <button 
                onClick={() => scrollToSection("benefits")} 
                className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
                data-testid="nav-benefits"
              >
                لماذا نحن
              </button>
              <button 
                onClick={() => scrollToSection("solutions")} 
                className="font-subheading text-sm font-medium text-[#3D1C1C] hover:text-[#1E3A5F] transition-colors"
                data-testid="nav-solutions"
              >
                الحلول
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
                <button onClick={() => scrollToSection("solutions")} className="text-right font-subheading text-sm font-medium text-[#3D1C1C] py-2">الحلول</button>
                <button onClick={() => scrollToSection("benefits")} className="text-right font-subheading text-sm font-medium text-[#3D1C1C] py-2">لماذا نحن</button>
                <a href="https://platform.aretion.org/contact" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">تواصل معنا</a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </TooltipProvider>
  );
};

// Hero Section - Arabic
const HeroSection = () => {
  return (
    <section className="hero-section" data-testid="hero-section">
      <div className="hero-pattern"></div>
      <div className="container-main relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-16">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A5F] leading-tight mb-4 text-center" data-testid="hero-headline">
              منظومة ذكية للبنية التحتية الحيوية
            </h1>
            <p className="font-heading text-lg sm:text-xl text-[#8B4513] font-semibold text-center mb-8">
              نصمم ونقدم تقنيات مبتكرة
            </p>
            
            <div className="font-heading text-[#3D1C1C]/80 leading-relaxed space-y-6 text-right max-w-3xl mx-auto">
              <p className="text-lg font-medium text-[#1E3A5F]">
                رسالتنا: تحويل سلامة البنية التحتية الحيوية من خلال التقنيات المبتكرة.
              </p>
              <p>
                تبتكر أريشن تقنيات متقدمة تحوّل طريقة عمل البنية التحتية الحيوية. نحن لا نطور الأنظمة القديمة، بل نستبدلها بمنصات ذكية مدعومة بالذكاء الاصطناعي تتنبأ بالمشكلات قبل وقوعها وتستجيب لها آلياً.
              </p>
              
              <div className="mt-8">
                <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-4 text-right">منهجيتنا</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                    <span className="text-right flex-1"><strong>ابتكار مبتكر:</strong> أول منصة متكاملة تجمع إدارة الكوارث والرعاية الصحية عن بُعد والتحليلات التنبؤية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                    <span className="text-right flex-1"><strong>تقنية خاصة:</strong> أربع براءات اختراع قيد التسجيل، ونماذج ذكاء اصطناعي مدربة على نشرات فعلية، وخبرة عميقة في المجال</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#8B4513] flex-shrink-0 mt-1" />
                    <span className="text-right flex-1"><strong>أثر مثبت:</strong> حلول مختبرة ميدانياً موثوقة من الشبكات الصحية في المملكة العربية السعودية ومنطقة الخليج</span>
                  </li>
                </ul>
              </div>
              
              <p className="font-semibold text-[#8B4513] text-lg mt-6">
                نتحدى الوضع الراهن. ننجز ما يقول الآخرون أنه مستحيل.
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
                <ChevronLeft className="ml-2 h-4 w-4" />
                تواصل معنا
              </a>
              <a 
                href="https://platform.aretion.org/advisors"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                data-testid="hero-team-btn"
              >
                تعرف على فريقنا
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section - Arabic
const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F5F0E8]" data-testid="solutions-section">
      <div className="container-main">
        {/* Section Header */}
        <motion.div 
          className="max-w-2xl mr-auto mb-16 text-right"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            تقنياتنا
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4" data-testid="solutions-title">
            باقة الحلول المبتكرة
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            تسع منصات متطورة تحوّل طريقة عمل مؤسسات البنية التحتية الحيوية واستجابتها وحمايتها لما يهم.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className={`solution-card ${solution.size} ${solution.bgImage ? 'has-bg-image' : ''}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={solution.bgImage ? { backgroundImage: `url(${solution.bgImage})` } : {}}
            >
              <div className="solution-card-content text-right">
                <div className="solution-icon-wrapper mr-auto ml-0">
                  <solution.icon className="solution-icon" />
                </div>
                <div>
                  <h3 className="solution-title">{solution.title}</h3>
                  <p className="solution-subtitle text-xs text-[#6B8CAE] mb-2">{solution.subtitle}</p>
                </div>
                <p className="solution-description">{solution.description}</p>
                <span className="solution-badge">متاح</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Capabilities Section - Arabic
const CapabilitiesSection = () => {
  const sections = [
    {
      id: "early-warning",
      title: "تقنية الإنذار المبكر الخاصة",
      items: [
        {
          icon: Droplets,
          title: "ذكاء البنية التحتية الآني",
          description: "حلول توفر رؤى تنبؤية لا يستطيع المنافسون تقليدها. منتشرة في منشآت عديدة بمعدل إنذارات كاذبة منخفض للغاية - تحسن كبير على الأنظمة القديمة."
        },
        {
          icon: Thermometer,
          title: "التعلم الآلي الطرفي",
          description: "نماذج تعلم آلي خاصة مدربة على بيانات منشآت واسعة تمكن من الصيانة التنبؤية وتقليل أعطال المعدات بشكل كبير. كل نشر يولد بيانات تدريب تعزز ميزتنا التنافسية."
        },
        {
          icon: Shield,
          title: "كشف والاستجابة للتهديدات CBRN",
          description: "كشف متقدم للتهديدات الكيميائية والبيولوجية والإشعاعية والنووية متكامل في منظومة الإنذار المبكر. مراقبة آنية وبروتوكولات استجابة آلية لحماية الأفراد والبنية التحتية."
        }
      ]
    },
    {
      id: "fire-detection",
      title: "منصة الكشف الموحدة",
      items: [
        {
          icon: Flame,
          title: "طبقة التكامل الشاملة",
          description: "برمجياتنا الوسيطة تتكامل مع أنظمة الكشف القديمة المتعددة، مما يخلق قيمة فورية دون استبدال كامل. هذا النهج يقلل دورات المبيعات بشكل كبير ويخلق تكاليف تحويل تدفع معدلات احتفاظ ممتازة."
        },
        {
          icon: LayoutDashboard,
          title: "لوحة قيادة مركز التحكم",
          description: "رؤية تشغيلية آنية عبر المنشآت الموزعة. يفيد عملاؤنا من المؤسسات بأوقات استجابة أسرع بشكل ملحوظ للحوادث. بيانات اللوحة تغذي محرك التحليلات لدينا."
        }
      ]
    },
    {
      id: "data-center",
      title: "حماية البنية التحتية الحيوية",
      items: [
        {
          icon: Database,
          title: "مرونة مراكز البيانات",
          description: "مصممة خصيصاً لمراكز بيانات الرعاية الصحية حيث تكلفة التوقف باهظة. اتفاقية مستوى الخدمة لوقت التشغيل لدينا مدعومة بالتأمين - ميزة سوقية فريدة تُغلق الصفقات المؤسسية."
        },
        {
          icon: Lock,
          title: "أتمتة الامتثال",
          description: "تقارير امتثال آلية لـ HIPAA و SOC 2 والتنظيمات الصحية الإقليمية. تقليل كبير لتكاليف التدقيق لدى العملاء وخلق قفل تنظيمي يصعب على المنافسين تجاوزه."
        }
      ]
    },
    {
      id: "leadership",
      title: "حلول استمرارية القيادة",
      items: [
        {
          icon: Shield,
          title: "حزمة أجهزة وبرمجيات عالية الهامش",
          description: "مراكز عمليات آمنة تجمع أجهزة خاصة مع اشتراكات برمجية. الأجهزة تدفع قيمة صفقة كبيرة بهوامش قوية؛ البرمجيات تخلق إيرادات متكررة بهوامش أعلى."
        },
        {
          icon: Satellite,
          title: "اتصالات مرنة",
          description: "أنظمة اتصالات احتياطية عبر الأقمار الصناعية تضمن الاستمرارية أثناء الانقطاعات الإقليمية. هذه القدرة إلزامية للعقود الحكومية - سوق كبير قابل للاستهداف نحن مؤهلون لاقتناصه."
        }
      ]
    },
    {
      id: "all-hazard",
      title: "بنية المنصة",
      items: [
        {
          icon: Zap,
          title: "تنسيق استجابة موحد",
          description: "منصة واحدة تستبدل حلولاً نقطية متعددة. العملاء يوحدون علاقات الموردين، مما يقلل تكلفة الملكية الإجمالية بشكل كبير مع زيادة حصتنا من محفظتهم."
        },
        {
          icon: Hospital,
          title: "تقنية مُثبتة ميدانياً",
          description: "أُنشئت واختُبرت من قبل متخصصين ميدانيين في الكوارث. هذا السجل التشغيلي هو أصلنا البيعي الرئيسي - يمكن للعملاء المحتملين التحدث مع عملاء مرجعيين اعتمدوا على أنظمتنا أثناء أزمات فعلية."
        }
      ]
    }
  ];

  return (
    <section id="capabilities" className="py-20 lg:py-28 bg-white" data-testid="capabilities-section">
      <div className="container-main">
        {/* Section Header */}
        <motion.div 
          className="max-w-2xl mr-auto mb-16 text-right"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
            الميزة التنافسية
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
            التميز التقني
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            تقنيات خاصة وابتكارات مُختبرة ميدانياً تميزنا عن الحلول التقليدية.
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
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-6 pb-4 border-b-2 border-[#C4A77D] text-right">
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
                    <div className="flex items-center gap-4 mb-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-[#C4A77D]" />
                      </div>
                      <h4 className="font-heading text-lg font-semibold text-[#1E3A5F] text-right">
                        {item.title}
                      </h4>
                    </div>
                    <p className="font-body text-sm text-[#3D1C1C]/80 leading-relaxed text-right">
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

// Benefits Section - Arabic
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
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-subheading text-xs font-semibold tracking-[0.2em] uppercase text-[#8B4513] mb-4">
              لماذا أريشن
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-6" data-testid="benefits-title">
              الفرق المبتكر
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 max-w-2xl mx-auto">
              نحن لا نحسّن الأنظمة القائمة فحسب، بل نعيد تصور ما هو ممكن عندما تُصمم التقنية بلا قيود.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card text-right"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="font-heading text-lg font-semibold text-[#1E3A5F] mb-2">{benefit.title}</h4>
                <p className="text-sm text-[#3D1C1C]/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Market Opportunity Section - Arabic
const MarketOpportunitySection = () => {
  const marketSegments = [
    { segment: "حماية البنية التحتية الحيوية", value: "197 مليار $", growth: "نمو 5.1%" },
    { segment: "أنظمة الاستعداد للكوارث", value: "308 مليار $", growth: "نمو 8.2%" },
    { segment: "كشف الكوارث الطبيعية (IoT)", value: "25.2 مليار $", growth: "نمو 36.3%" },
    { segment: "إدارة استمرارية الأعمال", value: "2.09 مليار $", growth: "نمو 15.5%" },
  ];

  const growthDrivers = [
    { icon: Zap, title: "إلحاح المناخ", description: "تزايد تواتر وحدة الكوارث الطبيعية يدفع الاستعداد الإلزامي" },
    { icon: Building, title: "التفويضات الحكومية", description: "مخصصات بمليارات الدولارات للبنية التحتية المرنة عالمياً" },
    { icon: Radio, title: "نضج IoT والذكاء الاصطناعي", description: "التقنية أصبحت موثوقة بما يكفي للنشر في المهام الحرجة" },
    { icon: Shield, title: "رياح تنظيمية مواتية", description: "أنظمة الإنذار المبكر أصبحت إلزامية قانونياً عبر الولايات القضائية" },
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
            فرصة السوق
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            سوق قابل للاستهداف يتجاوز 500 مليار دولار
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            الطلب العالمي على حماية البنية التحتية الحيوية وكشف الكوارث وتقنيات الاستجابة الآلية يشهد نمواً غير مسبوق.
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
          <h3 className="font-heading text-2xl font-bold text-[#1E3A5F] text-center mb-8">لماذا الآن؟</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {growthDrivers.map((driver, index) => (
              <div key={index} className="flex gap-4 items-start flex-row-reverse text-right">
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

// Why We Win Section - Arabic
const WhyWeWinSection = () => {
  const advantages = [
    {
      icon: Zap,
      title: "تقنيات متطورة",
      description: "كشف تنبؤي مدعوم بالذكاء الاصطناعي يحدد الكوارث قبل وقوعها، مع استجابة آلية في أقل من ثانية."
    },
    {
      icon: Users,
      title: "بناها خبراء المجال",
      description: "صممها كبار المتخصصين في إدارة الكوارث واستمرارية الأعمال وعمليات الرعاية الصحية والبحث السريري."
    },
    {
      icon: Shield,
      title: "حلول مُختبرة ميدانياً",
      description: "أنشأها واختبرها متخصصون ميدانيون في الكوارث في حالات طوارئ حقيقية - وليس محاكاة نظرية."
    },
    {
      icon: Building,
      title: "مصممة للمؤسسات",
      description: "مصممة خصيصاً للحكومات والبلديات ومشغلي البنية التحتية الحيوية - وليست تقنية استهلاكية مُعدّلة."
    },
    {
      icon: Lock,
      title: "منصة متكاملة",
      description: "حل موحد يغطي الكشف والاستجابة والاستمرارية. المنافسون يقدمون حلولاً منعزلة؛ نحن نقدم حماية شاملة."
    },
    {
      icon: TrendingUp,
      title: "معيارية وقابلة للتوسع",
      description: "بنية تتوسع من نشر في موقع واحد إلى بنية تحتية وطنية مع زيادة هامشية ضئيلة في التكلفة."
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
            الميزة التنافسية
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            لماذا لا يوجد منافس لنا
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            مزيج لا يقدمه أي منافس: منصة تنبؤية واستجابة متكاملة بناها خبراء يفهمون الواقع التشغيلي للبنية التحتية الحيوية.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 border border-[#6B8CAE]/20 text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#1E3A5F] flex items-center justify-center mb-4 mr-auto ml-0">
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

// Business Model Section - Arabic
const BusinessModelSection = () => {
  const revenueStreams = [
    { icon: Database, title: "الأجهزة والمعدات", description: "أجهزة استشعار ومراقبة مع عقود صيانة", type: "رأسمالي + متكرر" },
    { icon: LayoutDashboard, title: "منصة SaaS", description: "اشتراك سحابي للمراقبة والتحليلات ومركز القيادة", type: "اشتراك سنوي" },
    { icon: Users, title: "الاستشارات والتنفيذ", description: "خدمات النشر والتكامل والتدريب", type: "قائم على المشروع" },
    { icon: Shield, title: "العقود الحكومية", description: "اتفاقيات إطارية متعددة السنوات مع الوزارات والبلديات", type: "اتفاقيات طويلة الأجل" },
    { icon: TrendingUp, title: "البيانات والذكاء", description: "تحليلات تنبؤية متقدمة وتقييم المخاطر والرؤى", type: "اشتراك" },
    { icon: FileText, title: "ترخيص التقنية", description: "ترخيص الملكية الفكرية للمكاملين والشركاء", type: "ترخيص/حقوق ملكية" },
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
            نموذج الأعمال
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            مصادر إيرادات متعددة
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            مصادر دخل متنوعة تضمن نمواً مستداماً وإيرادات متوقعة من خلال عقود مدعومة حكومياً.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {revenueStreams.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#F5F0E8] rounded-lg p-6 border border-[#6B8CAE]/20 text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4 flex-row-reverse">
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
          <h3 className="font-heading text-xl font-bold text-white mb-4">أبرز ملامح نموذج الإيرادات</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-white">
            <div>
              <div className="font-heading text-2xl font-bold text-[#C4A77D]">طويل الأمد</div>
              <p className="text-sm text-white/80">عقود حكومية برؤية متعددة السنوات</p>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-[#C4A77D]">متكرر</div>
              <p className="text-sm text-white/80">اشتراكات SaaS توفر إيرادات متوقعة</p>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-[#C4A77D]">قابل للتوسع</div>
              <p className="text-sm text-white/80">المنصة تتوسع دون زيادة نسبية في التكلفة</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Demo Section - Arabic
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
              ابدأ الآن
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-6" data-testid="demo-title">
              مستعد لتحدي الوضع الراهن؟
            </h2>
            <p className="font-body text-lg text-[#3D1C1C]/80 mb-10 max-w-2xl mx-auto">
              انضم إلى المؤسسات التي تحوّل عملياتها بالفعل مع منصات أريشن التقنية المبتكرة.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary" 
                data-testid="demo-request-btn"
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                اطلب عرضاً توضيحياً
              </a>
              <a 
                href="https://platform.aretion.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary" 
                data-testid="demo-call-btn"
              >
                تواصل معنا
              </a>
            </div>

            {/* Key Differentiators */}
            <div className="grid sm:grid-cols-3 gap-6" data-testid="demo-features">
              <div className="stats-card">
                <Zap className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">مدعوم بالذكاء الاصطناعي</h4>
                <p className="text-sm text-[#3D1C1C]/70">أتمتة ذكية في كل مستوى</p>
              </div>
              <div className="stats-card">
                <Shield className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">مُثبت ميدانياً</h4>
                <p className="text-sm text-[#3D1C1C]/70">مُختبر في سيناريوهات طوارئ حقيقية</p>
              </div>
              <div className="stats-card">
                <Building className="h-8 w-8 text-[#1E3A5F] mx-auto mb-4" />
                <h4 className="font-subheading font-semibold text-[#1E3A5F] mb-2">جاهز للمؤسسات</h4>
                <p className="text-sm text-[#3D1C1C]/70">قابل للتوسع لأي حجم مؤسسة</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section - Arabic
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
            الأثر المُثبت
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4" data-testid="testimonials-title">
            موثوقون من قادة القطاع
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80 mb-12">
            حلولنا منتشرة عبر قطاعات البنية التحتية الحيوية، تحقق نتائج قابلة للقياس.
          </p>
          
          {/* Golden Minute Stat */}
          <div className="text-center mb-12">
            <div className="font-heading text-3xl sm:text-4xl font-bold text-[#8B4513] mb-2">
              الاستجابة من أول دقيقة - <span className="text-[#1E3A5F]">الدقيقة الذهبية</span>
            </div>
            <p className="font-body text-[#3D1C1C]/80">تحسين زمن الاستجابة</p>
          </div>

          {/* Client Sectors */}
          <div className="bg-white/80 rounded-lg p-8 border border-[#6B8CAE]/20 mb-8">
            <h3 className="font-heading text-xl font-bold text-[#1E3A5F] mb-6">عملاؤنا يشملون</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3 p-4">
                <Building className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">البلديات</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4">
                <Shield className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">الوزارات</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4">
                <Hospital className="h-8 w-8 text-[#1E3A5F]" />
                <span className="font-subheading font-semibold text-[#3D1C1C]">القطاع الصحي</span>
              </div>
            </div>
          </div>

          {/* Milestone */}
          <div className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-full mb-8">
            <span className="font-subheading font-semibold">جاهزة للسوق</span>
            <CheckCircle className="h-5 w-5 text-[#C4A77D]" />
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
              <ArrowLeft className="ml-2 h-4 w-4" />
              استكشف الشراكة
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Trust & Compliance Section - Arabic
const TrustComplianceSection = () => {
  const certifications = [
    {
      title: "CSA STAR المستوى الثاني",
      subtitle: "ثقة الأمان والمخاطر",
      description: "تدقيق طرف ثالث — برنامج ضمان أمان السحابة ثلاثي المستويات من CSA"
    },
    {
      title: "ISO/IEC 27001",
      subtitle: "إدارة أمن المعلومات",
      description: "معيار إدارة أمن المعلومات المعتمد"
    },
    {
      title: "ISO/IEC 27017",
      subtitle: "ضوابط أمان السحابة",
      description: "مدونة الممارسات لضوابط أمن المعلومات الخاصة بالسحابة"
    },
    {
      title: "ISO/IEC 27018",
      subtitle: "حماية البيانات الشخصية",
      description: "مدونة الممارسات لحماية البيانات الشخصية في السحابة"
    },
    {
      title: "PCI DSS v4.0.1",
      subtitle: "أمان الدفع",
      description: "متوافق مع معيار أمان بيانات صناعة بطاقات الدفع"
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
            الثقة والامتثال
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            أمان على مستوى المؤسسات
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            منصاتنا مبنية على أساس معايير أمان صارمة وامتثال تنظيمي.
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

// Contact Section - Arabic
const ContactSection = () => {
  const contactLinks = [
    { title: "علاقات المستثمرين", url: "https://platform.aretion.org/contact" },
    { title: "الشراكات الاستراتيجية", url: "https://platform.aretion.org/contact" },
    { title: "الإعلام والصحافة", url: "https://platform.aretion.org/contact" },
    { title: "الاستفسارات العامة", url: "https://platform.aretion.org/contact" }
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
              تواصل
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6" data-testid="contact-title">
              لنتحدث
            </h2>
            <p className="font-body text-white/80 mb-12">
              سواء كنت مستثمراً أو شريكاً محتملاً أو عميلاً مؤسسياً — نود أن نسمع منك.
            </p>

            <div className="grid sm:grid-cols-2 gap-4" data-testid="contact-links">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all group flex-row-reverse"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  data-testid={`contact-link-${index}`}
                >
                  <span className="font-heading text-lg text-white">{link.title}</span>
                  <ArrowLeft className="h-5 w-5 text-[#C4A77D] group-hover:-translate-x-1 transition-transform" />
                </motion.a>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4">
                للتواصل المباشر:
              </p>
              <a 
                href="mailto:contact@aretion.org"
                className="inline-flex items-center text-[#C4A77D] font-semibold hover:text-white transition-colors text-lg flex-row-reverse"
                data-testid="contact-direct-email"
              >
                contact@aretion.org
                <ArrowLeft className="mr-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer - Arabic
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section py-12" data-testid="footer">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Logo & Company Info */}
          <div className="text-right">
            <div className="flex items-center gap-4 justify-end mb-4">
              <span className="font-heading text-lg font-bold text-white">شركة أركان الراي</span>
              <img src={LOGO_URL} alt="ARETION" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/60 text-sm mb-2">مسجلة في المملكة العربية السعودية</p>
          </div>

          {/* Contact Information */}
          <div className="text-white/80 text-sm space-y-2 text-right">
            <p className="font-semibold text-white mb-3">تواصل معنا</p>
            <p>مركز الملك عبدالله المالي</p>
            <p>شارع الابتكار، العقيق</p>
            <p>مبنى 7229، الرياض 13519</p>
            <p className="mt-3">
              <a href="tel:+966115256458" className="hover:text-white transition-colors" dir="ltr">+966 11 525 6458</a>
            </p>
            <p>
              <a href="mailto:Contact@aretion.org" className="hover:text-white transition-colors">Contact@aretion.org</a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm" data-testid="footer-copyright">
            © {currentYear} شركة أركان الراي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen" dir="rtl">
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
    </LanguageProvider>
  );
}

export default App;
