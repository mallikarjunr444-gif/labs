import React from 'react';
import { motion } from 'framer-motion';
import { Download, AlertCircle, CheckCircle, TrendingUp, Camera } from 'lucide-react';

export const ResultDashboard: React.FC = () => {
  return (
    <section id="results" className="relative min-h-screen bg-white py-24 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-accent-blue/15 to-transparent rounded-full blur-3xl"
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
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">Results</p>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">Clinical Analysis Dashboard</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Comprehensive dermatological insights with AI confidence scoring
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Image Preview */}
          <motion.div
            className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl overflow-hidden shadow-glow-lg h-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full bg-gradient-to-br from-accent-blue/20 to-cyan-glow/10 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Camera size={56} className="text-accent-blue" />
                </div>
                <p className="text-text-secondary text-sm">Patient Image</p>
              </div>
            </div>
          </motion.div>

          {/* Main Results Card */}
          <motion.div
            className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 shadow-glow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              {/* Detection Result */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-glow/20 flex items-center justify-center">
                    <CheckCircle className="text-accent-blue" size={24} />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Detected Condition</p>
                    <h3 className="text-3xl font-bold text-text-primary">Acne Vulgaris</h3>
                  </div>
                </div>
              </div>

              {/* Confidence Ring */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-text-secondary font-medium">AI Confidence Score</p>
                  <motion.span
                    className="text-3xl font-bold bg-gradient-to-r from-accent-blue to-cyan-glow bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    94.7%
                  </motion.span>
                </div>
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-blue to-cyan-glow rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '94.7%' }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Severity */}
              <div className="space-y-3">
                <p className="text-text-secondary font-medium">Severity Assessment</p>
                <div className="flex gap-2">
                  {['Mild', 'Moderate', 'Severe'].map((level, index) => (
                    <motion.div
                      key={index}
                      className={`flex-1 py-2 px-3 rounded-lg text-center font-medium transition-all duration-300 ${
                        index === 1
                          ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                          : 'bg-white/5 text-text-secondary border border-white/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {level}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Analysis Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Symptoms */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 shadow-glow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-text-primary mb-6">Detected Symptoms</h3>
            <div className="space-y-3">
              {['Comedones (blackheads)', 'Pustules (whiteheads)', 'Inflammation', 'Sebum production'].map((symptom, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-accent-blue/30 transition-all duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-glow" />
                  <span className="text-text-secondary text-sm">{symptom}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 shadow-glow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-text-primary mb-6">Skincare Recommendations</h3>
            <div className="space-y-3">
              {['Use gentle cleanser twice daily', 'Apply non-comedogenic moisturizer', 'Wear SPF 30+ sunscreen', 'Avoid picking at skin'].map((rec, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{rec}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Precautions Timeline */}
        <motion.div
          className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 shadow-glow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-text-primary mb-6">Precautions & Warnings</h3>
          <div className="space-y-4">
            {[
              { icon: AlertCircle, label: 'Do Not Use', items: ['Oil-based products', 'Comedogenic makeups'] },
              { icon: TrendingUp, label: 'Monitor Progress', items: ['Track improvements weekly', 'Follow-up analysis in 4 weeks'] },
            ].map((section, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <section.icon className={`${index === 0 ? 'text-red-400' : 'text-blue-400'}`} size={20} />
                  <span className="font-semibold text-text-primary">{section.label}</span>
                </div>
                <ul className="ml-8 space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-text-secondary text-sm">• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Report Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-accent-blue to-cyan-glow text-medical-blue rounded-lg font-bold flex items-center gap-2 shadow-glow-lg hover:shadow-glow-xl transition-all duration-300"
          >
            <Download size={20} />
            Download PDF Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-accent-blue/50 text-accent-blue rounded-lg font-semibold hover:border-accent-blue hover:bg-white/5 transition-all duration-300"
          >
            Share Results
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
