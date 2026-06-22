import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Brain, 
  TrendingUp, 
  Users, 
  Radio, 
  Stethoscope, 
  HeartPulse, 
  FileText,
  Video
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Solution Images
const SOLUTION_IMAGES = {
  disasterms: "https://images.unsplash.com/photo-1639313521811-fdfb1c040ddb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBjb21tYW5kJTIwY2VudGVyJTIwb3BlcmF0aW9uc3xlbnwwfHx8fDE3ODIxNjIyMzh8MA&ixlib=rb-4.1.0&q=85",
  chatbot: "https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxBSSUyMGFzc2lzdGFudCUyMGNoYXRib3QlMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzgyMTYyMjMwfDA&ixlib=rb-4.1.0&q=85",
  predictive: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxwcmVkaWN0aXZlJTIwYW5hbHl0aWNzJTIwd2VhdGhlciUyMGRhdGF8ZW58MHx8fHwxNzgyMTYyMjI5fDA&ixlib=rb-4.1.0&q=85",
  emcc: "https://images.unsplash.com/photo-1511233744044-194342066754?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBicm9hZGNhc3QlMjBjb21tdW5pY2F0aW9uJTIwbmV0d29ya3xlbnwwfHx8fDE3ODIxNjIyNDh8MA&ixlib=rb-4.1.0&q=85",
  codeblue: "https://images.unsplash.com/photo-1512102438733-bfa4ed29aef7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBlcXVpcG1lbnQlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc4MjE2MjI0OHww&ixlib=rb-4.1.0&q=85",
  protocol: "https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  consultation: "https://images.pexels.com/photos/8376211/pexels-photo-8376211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
};

const iconMap = {
  1: ShieldCheck,
  2: Brain,
  3: TrendingUp,
  4: Users,
  5: Radio,
  6: Stethoscope,
  7: HeartPulse,
  8: FileText,
  9: Video
};

const imageMap = {
  1: SOLUTION_IMAGES.disasterms,
  2: SOLUTION_IMAGES.chatbot,
  3: SOLUTION_IMAGES.predictive,
  4: null, // No image for Mass Triage
  5: SOLUTION_IMAGES.emcc,
  6: null, // No image for Tele-Intubation
  7: SOLUTION_IMAGES.codeblue,
  8: SOLUTION_IMAGES.protocol,
  9: SOLUTION_IMAGES.consultation
};

const SolutionsSection = () => {
  const { t } = useLanguage();
  const content = t('solutions');

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
            {content.sectionLabel}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
            {content.title}
          </h2>
          <p className="font-body text-base sm:text-lg text-[#3D1C1C]/80 max-w-3xl mx-auto">
            {content.description}
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items?.map((solution, index) => {
            const Icon = iconMap[solution.id];
            const bgImage = imageMap[solution.id];
            
            return (
              <motion.div
                key={solution.id}
                className={`solution-card ${bgImage ? 'has-bg-image' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
              >
                <div className="solution-card-content text-right">
                  <div className="solution-icon-wrapper mr-auto ml-0">
                    {Icon && <Icon className="solution-icon" />}
                  </div>
                  <div>
                    <h3 className="solution-title">{solution.title}</h3>
                    <p className="solution-subtitle text-xs text-[#6B8CAE] mb-2">{solution.subtitle}</p>
                  </div>
                  <p className="solution-description">{solution.description}</p>
                  <span className="solution-badge">{content.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
