import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Brain, Lock, BarChart3, TrendingUp, Cloud,
  Shield, CheckCircle2, Database, Activity, Cpu, ArrowRight
} from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

type FeatureItem = {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  details: string[];
};

type WorkflowStep = {
  number: number;
  title: string;
  description: string;
};

type AccuracyItem = {
  condition: string;
  accuracy: number;
  cases: number;
};

const Features: React.FC = () => {
  const features: FeatureItem[] = [
    {
      icon: Brain,
      title: 'AI Detection Engine',
      description: 'Advanced deep learning model trained on 100,000+ dermatological images for accurate skin condition detection.',
      details: ['ResNet-based architecture', 'Multi-class classification', '94%+ accuracy rate']
    },
    {
      icon: Database,
      title: 'ISIC Dataset Validation',
      description: 'Integration with International Skin Imaging Collaboration dataset for clinical-grade validation.',
      details: ['ISIC certified', 'Continuous updates', 'Research-backed']
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Instant processing of skin images with sub-second response times.',
      details: ['< 500ms processing', 'Cloud-optimized', 'Parallel processing']
    },
    {
      icon: TrendingUp,
      title: 'Confidence Scoring',
      description: 'Detailed confidence metrics for each prediction with clinical interpretation guidelines.',
      details: ['Probability scores', 'Severity assessment', 'Reliability indicators']
    },
    {
      icon: BarChart3,
      title: 'PDF Report Generation',
      description: 'Professional clinical reports with patient info, predictions, and dermatologist recommendations.',
      details: ['Customizable templates', 'Image embedding', 'Clinical-grade format']
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Secure cloud-based storage with automatic backup and version control.',
      details: ['Auto-backup', 'Global CDN', 'Redundancy']
    },
    {
      icon: Lock,
      title: 'Secure Patient Data',
      description: 'Military-grade encryption and HIPAA/GDPR compliance for patient privacy.',
      details: ['End-to-end encryption', 'HIPAA compliant', 'GDPR certified']
    },
    {
      icon: Shield,
      title: 'Dermatology Intelligence',
      description: 'Clinical decision support with evidence-based recommendations and treatment guidance.',
      details: ['Evidence-based', 'Peer-reviewed', 'Doctor-approved']
    },
  ];

  const workflowSteps: WorkflowStep[] = [
    { number: 1, title: 'Image Upload', description: 'Patient uploads clear skin image' },
    { number: 2, title: 'Pre-processing', description: 'Image normalization and quality check' },
    { number: 3, title: 'AI Analysis', description: 'Deep learning model processes image' },
    { number: 4, title: 'Prediction', description: 'Disease detection with confidence scores' },
    { number: 5, title: 'Report Gen', description: 'Clinical report generated' },
    { number: 6, title: 'Delivery', description: 'Report sent to patient & provider' },
  ];

  const accuracyData: AccuracyItem[] = [
    { condition: 'Acne Vulgaris', accuracy: 96, cases: 12000 },
    { condition: 'Melanoma', accuracy: 94, cases: 8500 },
    { condition: 'Eczema', accuracy: 92, cases: 7200 },
    { condition: 'Psoriasis', accuracy: 93, cases: 6800 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500/10 selection:text-sky-900">
      <PremiumNavbar />

      <main className="relative pt-32 pb-24 px-4 sm:px-6">
        {/* Ambient page glow */}
        <div className="absolute top-[15%] right-[5%] w-[450px] h-[450px] bg-gradient-to-br from-sky-400/5 to-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[50%] left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-sky-500/5 to-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-16 shadow-xl shadow-slate-100/50 border border-slate-200/60">
            <div className="absolute inset-0">
              <img src="/media/hero-man-bench.jpg" alt="Clinical AI Tech" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply" />
            </div>
            <div className="relative z-10 py-20 px-8 text-center sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 tracking-wider uppercase mb-4">
                  Medicus Labs Platform
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                  Clinical-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-cyan-200 animate-text-gradient">AI Technology</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-medium">
                  Explore the architectural capabilities and deep learning technologies that power Medicus Labs' automated skin classification models.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Features Grid Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Engineered Capabilities</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-medium">
              We leverage cloud parallelization and state-of-the-art vision models to deliver high accuracy.
            </p>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="uiverse-card p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 group flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-sky-600 transition-colors">{feature.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 font-medium">{feature.description}</p>
                  
                  <div className="space-y-2 mt-auto border-t border-slate-50 pt-4">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                        <CheckCircle2 size={14} className="text-sky-500 flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* AI Workflow Timeline */}
          <motion.div
            className="mb-24 p-8 md:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12 relative z-10">
              <span className="text-sky-600 font-extrabold text-xs tracking-wider uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Pipeline Automation
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">Automated Processing Pipeline</h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto font-medium">
                Our pipeline scales automatically to deliver diagnostic prediction reports.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center h-full flex flex-col items-center hover:bg-white hover:border-sky-300 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1.5">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.description}</p>
                  </div>

                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-[40px] -right-4 translate-x-1/2 z-20 text-slate-300 pointer-events-none">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Accuracy Benchmarks */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="lg:col-span-1">
              <span className="text-sky-600 font-extrabold text-xs tracking-wider uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Model Evaluation
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">Clinical Accuracy Benchmarks</h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Our neural networks are validated against the standard ISIC archival database. We track confidence values across several common disease profiles to check for accuracy drift.
              </p>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Continuous validation</h4>
                  <p className="text-slate-500 text-xs font-medium">Updated automatically on new archives.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accuracyData.map((item, index) => (
                <motion.div
                  key={item.condition}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">{item.condition}</h3>
                    <span className="text-lg font-extrabold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                      {item.accuracy}%
                    </span>
                  </div>
                  
                  <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.accuracy}%` }}
                      transition={{ delay: 0.2, duration: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    {item.cases.toLocaleString()} cases validation
                  </span>
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
