import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import PremiumNavbar from '../components/PremiumNavbar';
import {
  HeroSection,
  AboutSection,
  WorkflowSection,
  SupportedConditionsSection,
  FeaturesSection,
  UploadDashboard,
  ResultDashboard,
  FAQSection,
  ContactSection,
  PremiumFooter,
} from '../sections';

const PremiumHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <PremiumNavbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. About */}
      <AboutSection />

      {/* 3. Workflow */}
      <WorkflowSection />

      {/* 4. Supported Conditions */}
      <SupportedConditionsSection />

      {/* 5. Features */}
      <FeaturesSection />

      {/* 6. Upload Dashboard Preview */}
      <UploadDashboard />

      {/* 7. Result Dashboard Preview */}
      <ResultDashboard />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. Contact */}
      <ContactSection />

      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#020617]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to transform your{' '}
              <span className="gradient-text">dermatology care?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Join thousands of patients and healthcare providers using Medicus Labs for advanced skin analysis.
            </p>
            <motion.button
              onClick={() => navigate('/analysis')}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-glow to-blue-500 text-[#020617] font-bold text-base shadow-glow-lg hover:shadow-glow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Your Analysis Today
              <FiArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 10. Footer */}
      <PremiumFooter />
    </div>
  );
};

export default PremiumHome;
