import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Zap,
  Lock,
  FileText,
  Layers,
  BarChart3,
  Check,
  Sparkles,
  ArrowRight,
  ScanLine,
  MessageCircle,
  ShieldCheck,
  Camera,
  Activity,
  Clock,
  Download,
  Star,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

/* ─── Feature Cards ─────────────────────────────────────────────── */
const featureList = [
  {
    icon: ScanLine,
    title: 'AI Skin Photo Analysis',
    desc: 'Upload any skin photo and our Vision Transformer model instantly evaluates it across 8 major dermatological categories — Melanoma, Acne, Eczema, Psoriasis, Rosacea, Vitiligo, Dermatitis & Fungal.',
    tag: 'Core Feature',
    color: 'from-emerald-50 to-green-50',
    accent: '#0071e3',
  },
  {
    icon: MessageCircle,
    title: 'Talk to Medicus AI Chat',
    desc: 'Ask any skin health question in natural language. Medicus AI provides contextual, medically-grounded responses with follow-up support and conversation history — like a doctor in your pocket.',
    tag: 'AI Chat',
    color: 'from-[#eaf2fd] to-[#eaf2fd]',
    accent: '#0071e3',
  },
  {
    icon: FileText,
    title: 'Physician-Ready PDF Reports',
    desc: 'One click generates a formatted clinical PDF containing diagnostic confidence scores, condition rankings, severity levels, and care recommendations — ready to bring to any doctor\'s appointment.',
    tag: 'Clinical Utility',
    color: 'from-violet-50 to-purple-50',
    accent: '#7c3aed',
  },
  {
    icon: Brain,
    title: 'Vision Transformer (ViT) Engine',
    desc: 'Multi-scale self-attention architecture trained on 120,000+ verified clinical cases from ISIC, HAM10000 & DermNet archives for balanced and accurate cross-skin-tone classification.',
    tag: 'Core AI Model',
    color: 'from-amber-50 to-orange-50',
    accent: '#d97706',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Privacy',
    desc: 'Your images are processed entirely in volatile RAM — never stored, never logged. Instant cryptographic purge after analysis. AES-256 encrypted transit. Fully HIPAA & GDPR compliant.',
    tag: 'Security',
    color: 'from-rose-50 to-red-50',
    accent: '#dc2626',
  },
  {
    icon: Zap,
    title: 'Sub-Second Inference Speed',
    desc: 'GPU-accelerated neural pipeline delivers full diagnostic confidence scores and condition rankings in under 600ms — no wait times, no loading spinners, instant results.',
    tag: 'Performance',
    color: 'from-yellow-50 to-lime-50',
    accent: '#65a30d',
  },
  {
    icon: Camera,
    title: 'Multi-Format Image Upload',
    desc: 'Supports JPG, PNG, WEBP, and HEIC. Smart pre-processing pipeline normalises lighting, removes artefacts, and prepares images for optimal AI analysis accuracy.',
    tag: 'Upload Engine',
    color: 'from-teal-50 to-[#eaf2fd]',
    accent: '#0d9488',
  },
  {
    icon: Layers,
    title: 'Multi-Condition Cross-Reference',
    desc: 'Unlike single-label classifiers, Medicus AI simultaneously ranks multiple possible conditions with probability scores — giving you the full diagnostic picture, not just one guess.',
    tag: 'Comprehensive',
    color: 'from-indigo-50 to-[#eaf2fd]',
    accent: '#4f46e5',
  },
  {
    icon: BarChart3,
    title: 'Confidence Score Dashboard',
    desc: 'Every analysis returns a detailed breakdown with percentage confidence per condition, severity rating, and AI-generated notes — transparent, auditable, and explainable.',
    tag: 'Explainability',
    color: 'from-pink-50 to-rose-50',
    accent: '#db2777',
  },
];

/* ─── How It Works Steps ────────────────────────────────────────── */
const steps = [
  {
    num: '01',
    icon: Camera,
    title: 'Upload Your Skin Photo',
    desc: 'Take a clear photo or upload an existing image from your device. Supports all major formats.',
  },
  {
    num: '02',
    icon: Brain,
    title: 'AI Analyses in Real-Time',
    desc: 'Our Vision Transformer model runs in under 600ms, evaluating 8 dermatological categories simultaneously.',
  },
  {
    num: '03',
    icon: Activity,
    title: 'View Confidence Scores',
    desc: 'See ranked condition probabilities, severity ratings, and AI-generated clinical notes instantly.',
  },
  {
    num: '04',
    icon: Download,
    title: 'Export PDF for Your Doctor',
    desc: 'Generate a physician-ready PDF report in one click and bring it to your next appointment.',
  },
];

/* ─── Comparison Matrix ─────────────────────────────────────────── */
const specMatrix = [
  { spec: 'Inference Latency',        medicus: '< 600ms',                   industry: '3.5s – 8.0s' },
  { spec: 'Model Architecture',       medicus: 'Vision Transformer ViT-H/14', industry: 'Standard CNN / ResNet' },
  { spec: 'Conditions Evaluated',     medicus: '8 categories simultaneously', industry: '1–3 per scan' },
  { spec: 'Data Encryption',          medicus: 'AES-256 Volatile Purge',     industry: 'Standard DB Storage' },
  { spec: 'Physician PDF Generation', medicus: 'Instant < 1 min',            industry: 'Manual / Unavailable' },
  { spec: 'HIPAA & GDPR Compliance',  medicus: 'Fully Verified',             industry: 'Varies' },
  { spec: 'AI Chat Support',          medicus: 'Included — Free',            industry: 'Paid add-on / None' },
  { spec: 'Image Storage After Scan', medicus: 'Zero — Purged Immediately',  industry: 'Stored on servers' },
];

/* ─── Stats ─────────────────────────────────────────────────────── */
const stats = [
  { value: '99.2%', label: 'Top-Class Accuracy' },
  { value: '120K+', label: 'Clinical Cases Trained' },
  { value: '< 600ms', label: 'Analysis Speed' },
  { value: '8', label: 'Conditions Covered' },
  { value: 'Zero', label: 'Data Stored' },
  { value: 'Free', label: 'For Everyone' },
];

/* ─── FAQ ────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Is Medicus Labs free to use?',
    a: 'Yes — all core features including AI skin photo analysis, the Medicus AI chat, and PDF report generation are completely free with no credit card required.',
  },
  {
    q: 'How accurate is the AI analysis?',
    a: 'Our Vision Transformer model achieves up to 99.2% top-class accuracy across major dermatological categories, benchmarked against 120,000+ verified clinical cases from ISIC, HAM10000, and DermNet.',
  },
  {
    q: 'Is my photo stored or shared?',
    a: 'No. Images are processed in volatile RAM only and cryptographically purged immediately after analysis. Nothing is ever stored on our servers.',
  },
  {
    q: 'Can I share the PDF with my doctor?',
    a: 'Yes. The PDF is specifically designed to be physician-readable with diagnostic confidence scores, severity classifications, and clinical notes formatted for medical intake.',
  },
];

const Features: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO title="Features - Clinical AI Dermatology Platform" description="Explore all Medicus Labs features: AI skin analysis, physician-ready PDF reports, Vision Transformer engine, zero-knowledge privacy, and more." />
      <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] pt-28 selection:bg-[#0071e3]/20 font-sans">

      {/* ── HERO HEADER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-transparent text-[#6e6e73] text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Everything Medicus Labs Offers
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1d1d1f]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Built for patients,{' '}
            <span className="text-[#0071e3]">trusted by clinicians</span>
          </motion.h1>

          <motion.p
            className="text-[#6e6e73] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Medicus Labs combines clinical-grade AI, instant analysis, and physician-ready reports — all completely free, private, and encrypted.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/analysis">
              <button className="px-7 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#2997ff] text-white font-bold text-sm transition shadow-sm inline-flex items-center gap-2">
                Try It Free — No Sign Up
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link to="/about">
              <button className="px-7 py-3.5 rounded-full bg-white border border-[#d2d2d7] hover:border-[#0071e3] text-[#1d1d1f] font-bold text-sm transition">
                Learn About Our AI →
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-white border border-[#d2d2d7] shadow-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0071e3]">{s.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6e6e73] mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>



        {/* ── FEATURE CARDS ── */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-2">All Features</h2>
          <p className="text-[#6e6e73] text-sm">Everything included — free, forever.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-[#d2d2d7] space-y-4 shadow-sm hover:shadow-md hover:border-[#0071e3]/40 transition-all duration-300 group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center border border-black/5`}>
                    <Icon size={20} style={{ color: feat.accent }} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#f5f5f7] text-[#6e6e73]">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition">{feat.title}</h3>
                <p className="text-[#6e6e73] text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── HOW IT WORKS ── */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-widest">Simple 4-Step Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-2">How Medicus Labs Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-7 rounded-3xl bg-white border border-[#d2d2d7] shadow-sm space-y-4 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}
                >
                  <div className="absolute top-5 right-5 text-5xl font-black text-[#d2d2d7] select-none">{step.num}</div>
                  <div className="w-12 h-12 rounded-2xl bg-[#eaf2fd] text-[#0071e3] flex items-center justify-center border border-[#0071e3]/10 relative z-10">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-[#1d1d1f] text-base relative z-10">{step.title}</h3>
                  <p className="text-[#6e6e73] text-xs leading-relaxed relative z-10">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>



        {/* ── COMPARISON MATRIX ── */}
        <motion.div
          className="rounded-3xl bg-[#f5f5f7] border border-[#d2d2d7] p-8 sm:p-12 shadow-sm space-y-8 mb-24"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-widest">Benchmarking</span>
            <h2 className="text-3xl font-extrabold text-[#1d1d1f]">Medicus Labs vs. Industry Average</h2>
            <p className="text-[#6e6e73] text-sm">See exactly how our platform stacks up against others.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#1d1d1f]">
              <thead>
                <tr className="border-b border-[#d2d2d7] text-xs font-bold text-[#6e6e73] uppercase tracking-wider">
                  <th className="pb-4 pl-4">Capability / Specification</th>
                  <th className="pb-4 text-[#0071e3]">✅ Medicus Labs AI</th>
                  <th className="pb-4 text-[#86868b]">Industry Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d2d2d7]">
                {specMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/50 transition">
                    <td className="py-4 pl-4 font-semibold text-[#1d1d1f]">{row.spec}</td>
                    <td className="py-4 font-extrabold text-[#0071e3]">
                      <span className="inline-flex items-center gap-1.5">
                        <Check size={14} className="text-[#0071e3] flex-shrink-0" />
                        {row.medicus}
                      </span>
                    </td>
                    <td className="py-4 text-[#6e6e73]">{row.industry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>



        {/* ── MINI FAQ ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-widest">Quick Answers</span>
            <h2 className="text-3xl font-extrabold text-[#1d1d1f] mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl bg-white border border-[#d2d2d7] shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#1d1d1f] hover:text-[#0071e3] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-[#0071e3]' : 'text-[#86868b]'}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="px-5 pb-5 text-[#6e6e73] text-xs leading-relaxed border-t border-[#fbfbfd] pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <motion.div
          className="rounded-3xl bg-[#0071e3] p-10 sm:p-14 text-center text-white space-y-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
            <Star size={12} fill="white" />
            Free for Everyone
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to analyse your skin?
          </h2>
          <p className="text-white/75 text-base max-w-xl mx-auto">
            No account needed. No credit card. Just upload a photo and get clinical AI insights in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/analysis">
              <button className="px-8 py-4 rounded-full bg-white text-[#0071e3] font-extrabold text-sm hover:bg-[#eaf2fd] transition shadow-md inline-flex items-center gap-2">
                Start Free Analysis
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm transition inline-flex items-center gap-2">
                <MessageCircle size={15} />
                Contact Our Team
              </button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 text-white/60 text-xs font-semibold pt-2">
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> HIPAA Compliant</span>
            <span className="flex items-center gap-1.5"><Lock size={13} /> AES-256 Encrypted</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> Zero Wait Time</span>
          </div>
        </motion.div>

      </section>

      <PremiumFooter />
    </div>
    </>
  );
};

export default Features;
