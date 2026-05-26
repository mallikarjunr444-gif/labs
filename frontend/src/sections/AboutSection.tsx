import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-surface-2 py-24 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-light opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            <div>
              <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">About Medicus Labs</p>
              <h2 className="text-5xl md:text-6xl font-bold text-text-primary leading-tight">
                Healthcare Meets{' '}
                <span className="bg-gradient-to-r from-accent-blue to-cyan-glow bg-clip-text text-transparent">
                  Artificial Intelligence
                </span>
              </h2>
            </div>

            <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
              Medicus Labs™ is at the forefront of intelligent dermatology assistance. We combine clinical expertise with cutting-edge AI to deliver accurate, trustworthy skin health insights.
            </p>

            <div className="space-y-4">
              {[
                'Powered by advanced machine learning models trained on millions of clinical images',
                'HIPAA compliant and designed for healthcare professionals',
                'Built for preventive care and early detection',
                'Trusted by healthcare providers worldwide',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 rounded-lg bg-accent-light flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-accent-blue font-bold">✓</span>
                  </div>
                  <span className="text-text-secondary">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-glow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-accent-light/20" />
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-8">
                  <div className="text-6xl font-bold text-accent-blue">99.2%</div>
                  <p className="text-text-secondary text-lg max-w-xs">Clinical Accuracy on Dermatology Analysis</p>
                  <div className="flex justify-center gap-4">
                    {['Fast', 'Accurate', 'Secure'].map((badge, i) => (
                      <motion.div
                        key={i}
                        className="px-4 py-2 rounded-lg bg-accent-light border border-cyan-glow/30 text-sm text-accent-blue font-medium"
                        whileHover={{ backgroundColor: '#E0F2FE', borderColor: '#0369A1' }}
                      >
                        {badge}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
