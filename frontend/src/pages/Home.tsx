import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Brain, Lock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PremiumNavbar from '../components/PremiumNavbar';
import VideoCtaSection from '../components/VideoCtaSection';
import { PremiumFooter } from '../sections';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const Home: React.FC = () => {
  const features = [
    { icon: Brain, title: 'AI-Powered Detection', description: 'Advanced ML model identifies skin conditions instantly' },
    { icon: Zap, title: 'Instant Results', description: 'Get comprehensive analysis in under 1 minute' },
    { icon: Lock, title: 'Secure & Private', description: 'HIPAA compliant with end-to-end encryption' },
    { icon: TrendingUp, title: 'Clinical Grade', description: 'Medical-grade accuracy trusted by professionals' },
  ];

  const stats = [
    { value: '100K+', label: 'Images Analyzed' },
    { value: '94%', label: 'Average Accuracy' },
    { value: '8+', label: 'Conditions Detected' },
    { value: '24/7', label: 'Available' },
  ];

  const conditions = [
    { name: 'Acne Vulgaris', accuracy: '96%' },
    { name: 'Melanoma', accuracy: '94%' },
    { name: 'Eczema', accuracy: '92%' },
    { name: 'Psoriasis', accuracy: '93%' },
    { name: 'Rosacea', accuracy: '88%' },
    { name: 'Vitiligo', accuracy: '90%' },
    { name: 'Dermatitis', accuracy: '89%' },
    { name: 'Fungal Infections', accuracy: '91%' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PremiumNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-40 -left-48 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-40 -right-48 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <motion.span
                  className="inline-block text-xs font-bold text-sky-600 tracking-[0.2em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Advanced Dermatology AI
                </motion.span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  AI-Powered Skin <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">Analysis</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-lg">
                  Get instant, accurate dermatological insights powered by advanced AI. Trusted by healthcare professionals worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <LiquidButton asChild size="lg" className="w-full sm:w-auto text-white">
                  <Link to="/analysis" className="!text-white">
                    <span className="inline-flex items-center gap-2 font-bold">
                      Start Free Analysis
                      <ArrowRight className="transition-transform" size={18} />
                    </span>
                  </Link>
                </LiquidButton>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-900 font-bold hover:border-sky-300 hover:bg-sky-50 transition-all"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-sm text-slate-600">HIPAA Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-sm text-slate-600">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-sm text-slate-600">24/7 Available</span>
                </div>
              </div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              className="relative h-96 md:h-[500px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-100 to-cyan-50 border border-slate-200 flex items-center justify-center shadow-xl overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-sky-300 opacity-70"
                    animate={{ y: [0, 20, 0], x: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose Medicus Labs?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Healthcare-grade AI with clinical accuracy and security
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-200 transition-colors">
                  <feature.icon className="text-sky-600" size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Supported Conditions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Conditions We Detect</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive analysis across major dermatological conditions with clinical-grade accuracy
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {conditions.map((condition, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all text-center group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">{condition.name}</p>
                <p className="text-sm font-semibold text-sky-600">{condition.accuracy} Accuracy</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <VideoCtaSection />

      <PremiumFooter />
    </div>
  );
};

export default Home;
