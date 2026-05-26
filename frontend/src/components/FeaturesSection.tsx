import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Lock, Smartphone, Brain, Zap } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning models trained on 100,000+ dermatological cases for accurate diagnosis.',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: CheckCircle,
      title: 'Smart Validation',
      description: 'Automated image quality assessment ensures reliable and consistent analysis results.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: FileText,
      title: 'Clinical Reports',
      description: 'Generate comprehensive, professional reports with detailed medical insights instantly.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Enterprise-grade encryption and HIPAA compliance for complete patient data protection.',
      color: 'from-red-400 to-orange-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Seamless experience across all devices with responsive, touch-friendly interface.',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get medical-grade analysis in seconds with confidence scores and recommendations.',
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap size={16} className="text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Enterprise Features</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Premium Healthcare Technology
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience cutting-edge dermatology analysis with enterprise-grade security and reliability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-500/50 transition overflow-hidden"
              whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(34, 211, 238, 0.2)' }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition duration-500" />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon size={28} className="text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                {/* Decorative element */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl -z-10"
                  whileHover={{ scale: 1.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
