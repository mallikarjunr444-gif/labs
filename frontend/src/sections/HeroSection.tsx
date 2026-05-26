import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-20 md:pt-32 pb-20 flex items-center">
      {/* Subtle background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-100 opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light border border-cyan-glow/40 w-fit">
                <motion.div
                  className="w-2 h-2 rounded-full bg-accent-blue"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <span className="text-accent-blue text-sm font-semibold">AI-Powered Dermatology</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
                Advanced{' '}
                <span className="bg-gradient-to-r from-accent-blue to-cyan-glow bg-clip-text text-transparent">
                  Dermatology
                </span>{' '}
                Analysis
              </h1>
              <p className="text-lg text-text-secondary max-w-xl leading-relaxed font-normal">
                Modern preventive healthcare experience. Helping you understand your skin health through intelligent AI-powered clinical assistance.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/analysis">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(3, 105, 161, 0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-accent-blue to-cyan-glow text-white rounded-lg font-semibold flex items-center gap-2 shadow-glow-md hover:shadow-glow-lg transition-all duration-300"
                >
                  Start Analysis
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#F3F4F6', borderColor: '#0369A1' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border-2 border-text-secondary text-text-primary rounded-lg font-semibold hover:border-accent-blue transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-gray-200"
            >
              {[
                { icon: Activity, label: 'Clinical Grade AI' },
                { icon: Shield, label: 'HIPAA Compliant' },
                { icon: Zap, label: 'Instant Results' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                    <item.icon className="text-accent-blue" size={20} />
                  </div>
                  <span className="text-text-primary font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visualization */}
          <motion.div
            className="relative h-[600px] hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Clean Card - Floating */}
            <motion.div
              className="absolute top-12 right-0 w-72 h-auto rounded-xl bg-white border border-gray-200 p-6 shadow-glow-md"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-blue" />
                    <span className="text-accent-blue text-xs font-semibold uppercase tracking-wider">Analysis Complete</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-text-primary text-sm font-semibold">Confidence Level</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-blue to-cyan-glow"
                      initial={{ width: '0%' }}
                      animate={{ width: '94%' }}
                      transition={{ duration: 2.5, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-accent-blue text-xs font-semibold">94% Confidence</span>
                </div>
              </div>
            </motion.div>

            {/* Center - Main Dashboard */}
            <motion.div
              className="w-80 h-80 rounded-xl bg-white border border-gray-200 p-8 shadow-glow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="space-y-6 h-full flex flex-col justify-between">
                <div>
                  <p className="text-accent-blue text-xs font-semibold uppercase tracking-wider mb-2">
                    Skin Analysis
                  </p>
                  <h3 className="text-2xl font-bold text-text-primary">Dermatology Scan</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Detection Status</span>
                      <span className="text-accent-blue font-semibold">Active</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-blue to-cyan-glow rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    {[
                      { label: 'Accuracy', value: '99.2%' },
                      { label: 'Processing', value: '2.1s' },
                    ].map((stat, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-text-secondary text-xs">{stat.label}</p>
                        <p className="text-accent-blue font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left Card */}
            <motion.div
              className="absolute bottom-12 left-0 w-64 h-auto rounded-xl bg-white border border-gray-200 p-5 shadow-glow-md"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-accent-blue text-xs font-semibold uppercase tracking-wider">Supported</span>
                  <span className="text-text-primary font-bold text-lg">8+</span>
                </div>
                <p className="text-text-secondary text-sm">Dermatological conditions</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-3">Scroll to explore</p>
          <div className="w-6 h-10 rounded-full border-2 border-text-secondary flex items-center justify-center">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent-blue"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
