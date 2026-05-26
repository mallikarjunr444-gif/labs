import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Droplets, Layers, Heart, AlertTriangle, Eye, Zap, Microscope } from 'lucide-react';

export const SupportedConditionsSection: React.FC = () => {
  const conditions = [
    { name: 'Acne', IconComponent: AlertCircle, color: 'from-red-500/30' },
    { name: 'Eczema', IconComponent: Droplets, color: 'from-orange-500/30' },
    { name: 'Psoriasis', IconComponent: Layers, color: 'from-yellow-500/30' },
    { name: 'Rosacea', IconComponent: Heart, color: 'from-pink-500/30' },
    { name: 'Melanoma', IconComponent: AlertTriangle, color: 'from-gray-500/30' },
    { name: 'Vitiligo', IconComponent: Eye, color: 'from-slate-500/30' },
    { name: 'Dermatitis', IconComponent: Zap, color: 'from-cyan-500/30' },
    { name: 'Fungal Infection', IconComponent: Microscope, color: 'from-emerald-500/30' },
  ];

  return (
    <section id="conditions" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent-blue/10 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">Comprehensive Coverage</p>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">Supported Conditions</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Advanced analysis across 8+ dermatological conditions with clinical-grade accuracy
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {conditions.map((condition, index) => (
            <motion.div
              key={index}
              className={`group relative rounded-2xl bg-gradient-to-br ${condition.color} to-transparent border border-white/10 backdrop-blur-xl p-6 h-40 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-accent-blue/50 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -8, boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)' }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 text-center space-y-3">
                <div className="flex justify-center">
                  <condition.IconComponent size={48} className="text-accent-blue" />
                </div>
                <h3 className="font-semibold text-text-primary text-lg">{condition.name}</h3>
                <p className="text-text-secondary text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to learn more
                </p>
              </div>

              <motion.div
                className="absolute inset-0 border-2 border-accent-blue rounded-2xl opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent-blue/10 to-cyan-glow/10 border border-accent-blue/30 backdrop-blur-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary text-lg">
            Not sure what condition you have? Our AI will help identify and provide insights. <span className="text-accent-blue font-semibold">Upload an image to get started.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
