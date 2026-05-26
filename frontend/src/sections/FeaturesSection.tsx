import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Lock, BarChart3, FileText, Smartphone, Cloud } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Advanced AI Analysis',
      description: 'Cutting-edge machine learning for accurate dermatology assessment',
      color: 'from-cyan-500',
    },
    {
      icon: Lock,
      title: 'Secure Patient Data',
      description: 'HIPAA compliant encryption and secure data handling',
      color: 'from-emerald-500',
    },
    {
      icon: BarChart3,
      title: 'Clinical Insights',
      description: 'Detailed analytics and confidence scoring for every analysis',
      color: 'from-blue-500',
    },
    {
      icon: FileText,
      title: 'PDF Reports',
      description: 'Generate downloadable clinical reports instantly',
      color: 'from-amber-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Optimized experience across all devices and screen sizes',
      color: 'from-pink-500',
    },
    {
      icon: Cloud,
      title: 'Cloud Powered',
      description: 'Fast, reliable analysis with enterprise-grade infrastructure',
      color: 'from-violet-500',
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/15 to-transparent rounded-full blur-3xl"
          animate={{ x: [50, -50, 50], y: [-30, 30, -30] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">Enterprise Features</p>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">Premium Capabilities</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Everything you need for professional healthcare AI analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 hover:border-accent-blue/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)' }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 space-y-4">
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color}/30 to-transparent border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all duration-300`}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}
                >
                  <feature.icon className="w-7 h-7 text-accent-blue" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                </div>

                <motion.div
                  className="pt-4 border-t border-white/10 flex items-center text-accent-blue/60 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -8 }}
                  whileHover={{ x: 0 }}
                >
                  Learn more →
                </motion.div>
              </div>

              {/* Glowing border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-accent-blue opacity-0 group-hover:opacity-30 group-hover:shadow-glow-lg transition-all duration-300 pointer-events-none"
                initial={{ scale: 0.95, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
