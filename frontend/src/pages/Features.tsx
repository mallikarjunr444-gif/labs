import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Brain, Lock, BarChart3, TrendingUp, Cloud,
  Shield, Workflow, CheckCircle2, Database
} from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Detection Engine',
      description: 'Advanced deep learning model trained on 100,000+ dermatological images for accurate skin condition detection',
      details: ['ResNet-based architecture', 'Multi-class classification', '94%+ accuracy rate']
    },
    {
      icon: Database,
      title: 'ISIC Dataset Validation',
      description: 'Integration with International Skin Imaging Collaboration dataset for clinical-grade validation',
      details: ['ISIC certified', 'Continuous updates', 'Research-backed']
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Instant processing of skin images with sub-second response times',
      details: ['< 500ms processing', 'Cloud-optimized', 'Parallel processing']
    },
    {
      icon: TrendingUp,
      title: 'Confidence Scoring',
      description: 'Detailed confidence metrics for each prediction with clinical interpretation guidelines',
      details: ['Probability scores', 'Severity assessment', 'Reliability indicators']
    },
    {
      icon: BarChart3,
      title: 'PDF Report Generation',
      description: 'Professional clinical reports with patient info, predictions, and dermatologist recommendations',
      details: ['Customizable templates', 'Image embedding', 'Clinical-grade format']
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Secure cloud-based storage with automatic backup and version control',
      details: ['Auto-backup', 'Global CDN', 'Redundancy']
    },
    {
      icon: Lock,
      title: 'Secure Patient Data',
      description: 'Military-grade encryption and HIPAA/GDPR compliance for patient privacy',
      details: ['End-to-end encryption', 'HIPAA compliant', 'GDPR certified']
    },
    {
      icon: Shield,
      title: 'Dermatology Intelligence',
      description: 'Clinical decision support with evidence-based recommendations and treatment guidance',
      details: ['Evidence-based', 'Peer-reviewed', 'Doctor-approved']
    },
  ];

  const workflowSteps = [
    { number: 1, title: 'Image Upload', description: 'Patient uploads clear skin image' },
    { number: 2, title: 'Pre-processing', description: 'Image normalization and quality check' },
    { number: 3, title: 'AI Analysis', description: 'Deep learning model processes image' },
    { number: 4, title: 'Prediction', description: 'Disease detection with confidence scores' },
    { number: 5, title: 'Report Gen', description: 'Clinical report generated' },
    { number: 6, title: 'Delivery', description: 'Report sent to patient & healthcare provider' },
  ];

  const accuracyData = [
    { condition: 'Acne Vulgaris', accuracy: 96, cases: 12000 },
    { condition: 'Melanoma', accuracy: 94, cases: 8500 },
    { condition: 'Eczema', accuracy: 92, cases: 7200 },
    { condition: 'Psoriasis', accuracy: 93, cases: 6800 },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PremiumNavbar />

      <main className="relative pt-28 pb-20 px-4 sm:px-6 bg-white">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden mb-12" style={{ paddingTop: '6rem' }}>
            <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-black/65" />
            <div className="relative z-10 px-4 py-14 text-center sm:px-6 sm:py-20">
              <span className="inline-block text-xs font-bold text-white/85 tracking-[0.2em] uppercase mb-3">Technology Platform</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">Advanced <span className="gradient-text">AI Features</span></h1>
              <p className="text-lg text-white/95 max-w-2xl mx-auto">Discover the cutting-edge technology behind Medicus Labs' dermatological analysis platform</p>
            </div>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-200 transition-colors">
                  <feature.icon className="text-sky-600" size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{feature.description}</p>
                <div className="space-y-1">
                  {feature.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 size={14} className="text-sky-500 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Workflow Timeline */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">AI Analysis Workflow</h2>
              <p className="text-slate-600">From image upload to clinical report in 6 simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-slate-200 text-center h-full flex flex-col justify-center hover:border-sky-300 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold flex items-center justify-center mx-auto mb-3">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-600">{step.description}</p>
                  </div>

                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-sky-300 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Accuracy Benchmarks */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">Accuracy Benchmarks</h2>
              <p className="text-slate-600">Verified performance across major dermatological conditions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accuracyData.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900">{item.condition}</h3>
                    <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                      {item.accuracy}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-sky-500 to-cyan-400"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${item.accuracy}%` }}
                        transition={{ delay: 0.3, duration: 1.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p className="text-xs text-slate-600">{item.cases.toLocaleString()} training cases</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      <PremiumFooter />
    </div>
  );
};

export default Features;
