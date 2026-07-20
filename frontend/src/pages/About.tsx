import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Brain,
  Award,
  Users,
  Sparkles,
  Lock,
  Activity,
  CheckCircle,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';

const leaders = [
  {
    name: 'Dr. Evelyn Vance, MD',
    role: 'Chief Medical Officer',
    desc: 'Former Vice Chair of Dermatology at Johns Hopkins with 18+ years of clinical research experience.',
  },
  {
    name: 'Marcus Sterling, PhD',
    role: 'Head of AI & Neural Architecture',
    desc: 'Pioneered computer vision models for sub-surface skin layer feature extraction.',
  },
  {
    name: 'Dr. Aris Thorne, MD',
    role: 'Clinical Validation Director',
    desc: 'Board-certified dermatologist specializing in early melanoma identification and preventive care.',
  },
];

const pillars = [
  {
    icon: Brain,
    title: 'Clinical Rigor',
    desc: 'Our vision transformers are benchmarked against 120,000+ verified clinical cases.',
  },
  {
    icon: Lock,
    title: 'HIPAA & AES-256',
    desc: 'Zero compromise on data privacy. Every scan is encrypted end-to-end.',
  },
  {
    icon: Activity,
    title: 'Continuous Calibration',
    desc: 'Models are audited monthly by independent board-certified clinical panels.',
  },
  {
    icon: Stethoscope,
    title: 'Physician Alignment',
    desc: 'Reports are formatted specifically to assist doctors during consultation intake.',
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070e17] text-white pt-32 selection:bg-sky-500/25 relative overflow-hidden font-sans">
      
      {/* Background Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              About Medicus Labs
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Bridging AI precision with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              dermatological care
            </span>
          </motion.h1>

          <motion.p
            className="text-slate-400 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Founded by clinical researchers and AI engineers, Medicus Labs provides high-confidence preliminary skin health evaluations to fast-track patient care.
          </motion.p>
        </div>

        {/* Mission Statement Glass Card */}
        <motion.div
          className="mt-16 rounded-3xl bg-white/[0.03] border border-white/10 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Core Mission</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Early detection saves lives. Skin concerns are often neglected due to long appointment wait times or anxiety. We empower individuals with instant diagnostic insights while supplying clinicians with formatted baseline reports.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-1">120K+</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Clinical Images</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400 block mb-1">99.2%</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Model Accuracy</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Our Founding Pillars</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-sky-400/40 transition duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Leadership */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Clinical &amp; AI Leadership</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {leaders.map((leader, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold flex items-center justify-center text-lg mb-5">
                  {leader.name[0]}
                </div>
                <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                <p className="text-xs text-sky-300 font-semibold mb-3">{leader.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{leader.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-28 p-10 rounded-3xl bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-500/20 text-center space-y-5">
          <h2 className="text-3xl font-extrabold text-white">Ready to test our vision model?</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Experience clinical-grade AI analysis in under 60 seconds. Completely private and HIPAA compliant.
          </p>
          <div>
            <Link to="/analysis">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold text-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition">
                Start Free Analysis
              </button>
            </Link>
          </div>
        </div>

      </section>

      <PremiumFooter />
    </div>
  );
};

export default About;
