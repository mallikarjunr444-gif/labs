import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap, CheckCircle, Award } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    { icon: Upload, label: 'Upload Image', description: 'Share your skin image securely' },
    { icon: Zap, label: 'AI Analysis', description: 'Instant clinical assessment' },
    { icon: CheckCircle, label: 'Results', description: 'Detailed condition analysis' },
    { icon: Award, label: 'Report', description: 'Download PDF recommendations' },
  ];

  return (
    <section id="workflow" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 -right-60 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
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
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">Healthcare Workflow</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Four simple steps to get your comprehensive dermatology analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent-blue/50 to-transparent" />
              )}

              <div className="relative">
                {/* Step number circle */}
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue/30 to-cyan-glow/20 border border-accent-blue/50 flex items-center justify-center mb-6 mx-auto shadow-glow-md group hover:shadow-glow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(0, 240, 255, 0.5)' }}
                >
                  <step.icon className="w-8 h-8 text-accent-blue" />
                </motion.div>

                {/* Card content */}
                <motion.div
                  className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-6 text-center h-full flex flex-col justify-between hover:border-accent-blue/30 transition-all duration-300"
                  whileHover={{ translateY: -8, boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)' }}
                >
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{step.label}</h3>
                    <p className="text-text-secondary text-sm">{step.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-accent-blue/60 text-xs font-semibold">Step {index + 1}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
