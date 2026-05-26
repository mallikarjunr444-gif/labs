import React from 'react';
import { motion } from 'framer-motion';
import PremiumNavbar from '../components/PremiumNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import SupportedConditions from '../components/SupportedConditions';
import FAQSection from '../components/FAQSection';
import PremiumFooter from '../components/PremiumFooter';

const PremiumHome = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <PremiumNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Supported Conditions */}
      <SupportedConditions />

      {/* How It Works Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black" />
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Simple 3-Step Process
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get professional dermatology analysis in minutes, not days.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Image',
                description: 'Take or upload a clear photo of the affected skin area',
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our advanced AI analyzes the image using deep learning',
              },
              {
                step: '3',
                title: 'Get Report',
                description: 'Receive detailed clinical insights and recommendations',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                {/* Connector line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                )}

                <motion.div
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl"
                  whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(34, 211, 238, 0.2)' }}
                >
                  {/* Step number */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-bold -mt-12 mb-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.step}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-950/30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Analyses Completed', value: '50,000+' },
              { label: 'AI Accuracy', value: '98.5%' },
              { label: 'Response Time', value: '<10s' },
              { label: 'Active Users', value: '10,000+' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/40 to-black" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Transform Your Dermatology Care?
              </span>
            </h2>

            <p className="text-xl text-gray-400">
              Join thousands of patients and healthcare providers using Medicus Labs for advanced skin analysis.
            </p>

            <motion.a
              href="/analysis"
              className="inline-block px-12 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Analysis Today
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <PremiumFooter />
    </div>
  );
};

export default PremiumHome;
