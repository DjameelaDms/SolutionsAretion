import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Thermometer, 
  Shield, 
  Flame, 
  LayoutDashboard,
  Database,
  Lock,
  Satellite
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const iconMapping = {
  'ذكاء البنية التحتية الآني': Droplets,
  'التعلم الآلي الطرفي': Thermometer,
  'كشف والاستجابة للتهديدات CBRN': Shield,
  'طبقة التكامل الشاملة': Flame,
  'لوحة قيادة مركز التحكم': LayoutDashboard,
  'مرونة مراكز البيانات': Database,
  'أتمتة الامتثال': Lock,
  'مركز القيادة عن بُعد': Satellite,
  'خطط تعاقب القيادة': Shield,
  // English
  'Real-Time Infrastructure Intelligence': Droplets,
  'Edge Machine Learning': Thermometer,
  'CBRN Threat Detection & Response': Shield,
  'Comprehensive Integration Layer': Flame,
  'Command Center Dashboard': LayoutDashboard,
  'Data Center Resilience': Database,
  'Compliance Automation': Lock,
  'Remote Command Center': Satellite,
  'Leadership Succession Plans': Shield
};

const CapabilitiesSection = () => {
  const { t } = useLanguage();
  const content = t('capabilities');

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
            {content.sectionLabel}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
            {content.title}
          </h2>
          <p className="font-body text-lg text-[#3D1C1C]/80">
            {content.description}
          </p>
        </motion.div>

        {/* Capability Sections */}
        <div className="space-y-12">
          {content.sections?.map((section, sectionIndex) => (
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
                {section.items?.map((item, itemIndex) => {
                  const Icon = iconMapping[item.title] || Shield;
                  return (
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
                          <Icon className="h-5 w-5 text-[#C4A77D]" />
                        </div>
                        <h4 className="font-heading text-lg font-semibold text-[#1E3A5F] text-right flex-1">
                          {item.title}
                        </h4>
                      </div>
                      <p className="font-body text-sm text-[#3D1C1C]/80 leading-relaxed text-right">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
