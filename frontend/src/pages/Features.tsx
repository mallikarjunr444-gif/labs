import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Lock,
  FileText,
  Activity,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  Database,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';

const detailedFeatures = [
  {
    icon: Brain,
    title: 'Vision Transformer (ViT) Architecture',
    tag: 'Core Model',
    desc: 'Self-attention mechanism processing multi-scale image patches to detect subtle micro-patterns in skin texture, pigmentation, and lesion boundaries.',
  },
  {
    icon: Zap,
    title: 'Sub-Second GPU Inference',
    tag: 'Performance',
    desc: 'Model quantization and TensorRT pipeline execution deliver complete multi-condition risk evaluations in under 600 milliseconds.',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Encryption',
    tag: 'Security',
    desc: 'Images are processed in volatile memory with instant cryptographic purge after feature extraction. Full HIPAA & GDPR compliance.',
  },
  {
    icon: FileText,
    title: 'Physician PDF Generation',
    tag: 'Clinical Export',
    desc: 'Formated baseline report detailing condition indexes, severity metrics, and diagnostic risk classifications for doctor intake.',
  },
  {
    icon: Layers,
    title: 'Multi-Condition Cross-Checking',
    tag: 'Diagnostic Depth',
    desc: 'Evaluates inputs simultaneously across 8 major categories: Acne, Melanoma, Eczema, Psoriasis, Rosacea, Vitiligo, Dermatitis, and Fungal Infections.',
  },
  {
    icon: Database,
    title: '120K+ Dataset Calibration',
    tag: 'Benchmark Data',
    desc: 'Trained and audited against verified dermatological archives with ongoing monthly validation by board-certified clinicians.',
  },
];

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070e17] text-white pt-32 selection:bg-sky-500/25 relative overflow-hidden font-sans">
      
      {/* Background Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Platform Features
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Built for clinical accuracy &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              unmatched speed
            </span>
          </motion.h1>

          <motion.p
            className="text-slate-400 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore the neural architecture, security protocols, and diagnostic reporting tools powering Medicus Labs.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl hover:border-sky-400/40 transition duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Spec Matrix Card */}
        <div className="mt-24 rounded-3xl bg-white/[0.03] border border-white/10 p-8 sm:p-12 backdrop-blur-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white">Technical Specifications</h2>
            <p className="text-slate-400 text-sm mt-2">Enterprise-ready performance metrics</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Inference Latency</span>
              <span className="text-3xl font-extrabold text-sky-400">&lt; 600ms</span>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Encryption Standard</span>
              <span className="text-3xl font-extrabold text-cyan-400">AES-256</span>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Confidence Accuracy</span>
              <span className="text-3xl font-extrabold text-sky-400">99.2%</span>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Supported Conditions</span>
              <span className="text-3xl font-extrabold text-cyan-400">8+ Major</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 p-10 rounded-3xl bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-blue-500/10 border border-sky-500/20 text-center space-y-5">
          <h2 className="text-3xl font-extrabold text-white">Experience the platform live</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Test the vision transformer on your skin symptoms in under 60 seconds.
          </p>
          <div>
            <Link to="/analysis">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold text-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition">
                Start Free Scan
              </button>
            </Link>
          </div>
        </div>

      </section>

      <PremiumFooter />
    </div>
  );
};

export default Features;
