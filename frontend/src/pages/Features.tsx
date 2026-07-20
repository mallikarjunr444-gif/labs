import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Lock,
  FileText,
  Layers,
  BarChart3,
  Check,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';

const featureList = [
  {
    icon: Brain,
    title: 'Vision Transformers (ViT)',
    desc: 'Multi-scale self-attention architecture trained on sub-surface skin layer features across 120,000+ verified clinical cases.',
    tag: 'Core AI Model',
  },
  {
    icon: Zap,
    title: 'Sub-Second Inference Speed',
    desc: 'GPU-accelerated neural pipeline delivers diagnostic confidence scores and condition rankings in under 600 milliseconds.',
    tag: 'Performance',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Encryption',
    desc: 'Images are processed in volatile RAM with instant cryptographic purge after feature extraction in compliance with HIPAA & GDPR.',
    tag: 'Security & Privacy',
  },
  {
    icon: FileText,
    title: 'Physician-Ready PDF Exports',
    desc: 'Generates structured PDF packet summaries detailing condition indexes, severity metrics, and care steps for doctor visits.',
    tag: 'Clinical Utility',
  },
  {
    icon: Layers,
    title: 'Multi-Condition Evaluation',
    desc: 'Simultaneously cross-references 8 major dermatological categories including Melanoma, Acne, Eczema, and Psoriasis.',
    tag: 'Comprehensive Coverage',
  },
  {
    icon: BarChart3,
    title: 'Dataset Calibration Metrics',
    desc: 'Calibrated continuously against ISIC, HAM10000, and DermNet archives for balanced skin tone representation.',
    tag: 'Model Accuracy',
  },
];

const specMatrix = [
  { spec: 'Inference Latency', medicus: '< 600ms', industry: '3.5s - 8.0s' },
  { spec: 'Model Architecture', medicus: 'Vision Transformer (ViT-H/14)', industry: 'Standard CNN / ResNet' },
  { spec: 'Data Encryption', medicus: 'AES-256 Volatile Purge', industry: 'Standard Database Storage' },
  { spec: 'Physician PDF Generation', medicus: 'Instant < 1 min', industry: 'Manual / Unavailable' },
  { spec: 'HIPAA & GDPR Compliance', medicus: 'Fully Verified', industry: 'Varies' },
];

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Technical Capabilities
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#141515]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Engineered for clinical precision &amp;{' '}
            <span className="text-[#206E55]">
              instant speed
            </span>
          </motion.h1>

          <motion.p
            className="text-[#5A554A] text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the neural vision architecture, privacy protocols, and reporting workflows powering Medicus Labs.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#E5E2DA] space-y-4 shadow-sm hover:border-[#206E55] transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F2ED] text-[#206E55] flex items-center justify-center border border-[#206E55]/10">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#206E55] bg-[#E8F2ED] px-3 py-1 rounded-full">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#141515] pt-2">{feat.title}</h3>
                <p className="text-[#5A554A] text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Specification Comparison Matrix */}
        <div className="rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#206E55] uppercase tracking-widest">Benchmarking</span>
            <h2 className="text-3xl font-extrabold text-[#141515]">Specification Comparison Matrix</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#141515]">
              <thead>
                <tr className="border-b border-[#E5E2DA] text-xs font-bold text-[#5A554A] uppercase tracking-wider">
                  <th className="pb-4 pl-4">Capability / Specification</th>
                  <th className="pb-4 text-[#206E55]">Medicus Labs AI</th>
                  <th className="pb-4 text-slate-400">Industry Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DA]">
                {specMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/40 transition">
                    <td className="py-4 pl-4 font-bold text-[#141515]">{row.spec}</td>
                    <td className="py-4 font-extrabold text-[#206E55] flex items-center gap-1.5">
                      <Check size={14} className="text-[#206E55]" />
                      {row.medicus}
                    </td>
                    <td className="py-4 text-[#5A554A]">{row.industry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link to="/analysis">
            <button className="px-8 py-4 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm transition shadow-sm inline-flex items-center gap-2">
              Experience the Platform
              <ArrowRight size={15} />
            </button>
          </Link>
        </div>

      </section>

      <PremiumFooter />
    </div>
  );
};

export default Features;
