import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaLightbulb, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-medical-blue">
      {/* Background will be handled by AnimatedGradientBackground component in the parent page */}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 min-h-screen flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-blue/20 border border-light-cyan/20 backdrop-blur-sm w-fit shadow-glass"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,240,255,0.3)" }}
            >
              <FaLightbulb size={16} className="text-cyan-glow" />
              <span className="text-sm font-medium text-light-cyan">AI-Powered Medical Analysis</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r from-cyan-glow via-light-cyan to-white bg-clip-text text-transparent">
                  Advanced Dermatology
                </span>
                <br />
                <span className="text-white">Analysis Platform</span>
              </motion.h1>
              <motion.p
                className="text-lg text-gray-400 max-w-lg"
                variants={itemVariants}
              >
                Modern Preventive Healthcare Experience.
                Helping You Better Understand Your Skin Health.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
              {[
                { label: 'Accuracy', value: '98.5%' },
                { label: 'Analyses', value: '50K+' },
                { label: 'Specialists', value: '100+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl bg-deep-blue/20 border border-light-cyan/10 backdrop-blur-xl shadow-glass hover:bg-deep-blue/30 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 0 25px rgba(0,240,255,0.2)" }}
                >
                  <div className="text-2xl font-bold text-cyan-glow">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => navigate('/analysis')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-glow to-light-cyan text-medical-blue font-bold text-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center gap-2 animate-pulse-glow"
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0,240,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Analysis
                <FaArrowRight size={20} />
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-full border border-light-cyan/50 text-light-cyan font-bold text-lg hover:bg-light-cyan/10 hover:text-white transition-all duration-300 shadow-glass"
                whileHover={{ scale: 1.05, borderColor: "#00F0FF" }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Cards and Illustration */}
          <motion.div
            className="relative h-96 md:h-full flex items-center justify-center"
            variants={itemVariants}
          >
            {/* Futuristic Healthcare Illustration (Placeholder) */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-cyan-glow/30 to-medical-blue/30 filter blur-3xl opacity-60 animate-glow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              <motion.div
                className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-deep-blue/70 rounded-full border border-light-cyan/30 flex items-center justify-center p-4 shadow-2xl shadow-cyan-glow/20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              >
                <FaLightbulb className="text-cyan-glow opacity-80" size={70} />
                <motion.div
                  className="absolute w-full h-full border-4 border-dashed border-light-cyan/40 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Medical Metrics Card */}
            <motion.div
              className="absolute top-10 left-0 w-72 p-6 rounded-3xl bg-gradient-to-br from-deep-blue/40 to-deep-blue/20 border border-light-cyan/20 backdrop-blur-xl shadow-glass animate-float-slow"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,240,255,0.3)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-light-cyan/20 flex items-center justify-center shadow-lg shadow-light-cyan/20">
                  <FaChartLine className="text-cyan-glow" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Skin Health Score</div>
                  <div className="text-3xl font-bold text-white">92<span className="text-light-cyan">/100</span></div>
                </div>
              </div>
              <div className="w-full h-2 bg-medical-blue rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-glow to-light-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-gray-500">Last updated: 2 mins ago</p>
            </motion.div>

            {/* Analysis Report Card */}
            <motion.div
              className="absolute bottom-10 right-0 w-72 p-6 rounded-3xl bg-gradient-to-br from-deep-blue/40 to-deep-blue/20 border border-light-cyan/20 backdrop-blur-xl shadow-glass animate-float-fast"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0,240,255,0.3)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-green-400" size={24} />
                <div>
                  <div className="text-sm text-gray-400">Condition Detected</div>
                  <div className="font-bold text-white">Normal - Healthy</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Confidence Level</span>
                  <span className="text-cyan-glow font-bold">99.2<span className="text-light-cyan">%</span></span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">AI powered analysis. Consult a specialist for confirmation.</div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-light-cyan/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-cyan-glow rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
