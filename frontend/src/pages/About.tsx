import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Sparkles,
  ArrowRight,
  Brain,
  CheckCircle,
  FileText,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';

const pillars = [
  {
    icon: Brain,
    title: 'Vision Transformers',
    desc: 'Our models extract sub-surface skin features calibrated against 120,000+ verified clinical image cases.',
  },
  {
    icon: Shield,
    title: 'HIPAA & GDPR Compliant',
    desc: 'AES-256 volatile memory encryption ensures your sensitive health data is never stored or monetized.',
  },
  {
    icon: Award,
    title: 'Physician Calibration',
    desc: 'Validated alongside board-certified dermatologists to deliver high-confidence diagnostic indicators.',
  },
  {
    icon: FileText,
    title: 'Physician-Ready Reports',
    desc: 'Generates structured PDF packet summaries designed specifically for primary care intake.',
  },
];

const leadership = [
  {
    name: 'Dr. Elena Rostova',
    role: 'Chief Medical Officer',
    credentials: 'MD, PhD in Dermatology • Harvard Medical School',
    bio: 'Pioneered early visual skin neoplasm classification benchmarks and published 40+ peer-reviewed studies.',
  },
  {
    name: 'Marcus Vance',
    role: 'Head of Neural Vision Systems',
    credentials: 'MS in Computer Vision • MIT Artificial Intelligence Lab',
    bio: 'Architected edge ViT neural pipelines deployed across leading hospital research networks.',
  },
  {
    name: 'Sarah Chen',
    role: 'VP of Patient Privacy & Security',
    credentials: 'CISSP, CIPP/US • Former Health System Security Director',
    bio: 'Oversees zero-knowledge cryptographic safeguards ensuring HIPAA compliance across all scan transactions.',
  },
];

const About: React.FC = () => {
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
              About Medicus Labs
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#141515]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Democratizing clinical skin intelligence through{' '}
            <span className="text-[#206E55]">
              ethical AI
            </span>
          </motion.h1>

          <motion.p
            className="text-[#5A554A] text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Founded by clinical researchers and AI engineers, Medicus Labs bridges the gap between patient skin concerns and professional dermatological care.
          </motion.p>
        </div>

        {/* Mission Statement Hero Card */}
        <div className="rounded-3xl bg-white border border-[#E5E2DA] p-8 sm:p-12 shadow-[0_8px_30px_rgba(13,39,64,0.03)] mb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold text-[#206E55] uppercase tracking-wider">Our Core Mission</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141515] leading-tight">
                Empowering individuals with instant, clinical-grade reference tools.
              </h2>
              <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed">
                Over 3 billion people worldwide lack immediate access to dermatological specialists. Our vision transformer platform provides pre-screening clarity, helping patients identify skin conditions early and prepare structured intake summaries for their doctor visits.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-8 rounded-2xl bg-[#F3F1EB] border border-[#E5E2DA] text-center space-y-2 w-full">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#206E55]">99.2%</span>
                <p className="text-xs font-bold text-[#141515] uppercase tracking-wider">Top-Class Accuracy Benchmark</p>
                <p className="text-[11px] text-[#5A554A]">Cross-referenced against verified ISIC image archives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Pillars Grid */}
        <div className="space-y-10 mb-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#141515]">Built on Four Clinical Pillars</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-[#E5E2DA] space-y-4 shadow-sm hover:border-[#206E55] transition-all"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F2ED] text-[#206E55] flex items-center justify-center border border-[#206E55]/10">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-[#141515]">{p.title}</h3>
                  <p className="text-[#5A554A] text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Clinical Leadership Profiles */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#206E55] uppercase tracking-widest">Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141515] mt-2">Clinical &amp; Engineering Leadership</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#E5E2DA] space-y-4 shadow-sm hover:border-[#206E55] transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 rounded-full bg-[#E8F2ED] text-[#206E55] font-extrabold flex items-center justify-center text-xl">
                  {leader.name[3] || leader.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#141515]">{leader.name}</h3>
                  <p className="text-xs font-bold text-[#206E55] mt-0.5">{leader.role}</p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{leader.credentials}</p>
                </div>
                <p className="text-[#5A554A] text-xs leading-relaxed pt-2 border-t border-slate-100">
                  {leader.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-24 p-10 rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA] text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141515]">Ready to run a clinical scan?</h3>
          <p className="text-[#5A554A] text-sm max-w-xl mx-auto">Upload a photo or describe symptoms to receive instant diagnostic reference indicators.</p>
          <div className="pt-2">
            <Link to="/analysis">
              <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm transition shadow-sm inline-flex items-center gap-2">
                Start Free Analysis
                <ArrowRight size={15} />
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
