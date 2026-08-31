import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Sparkles,
  ArrowRight,
  Brain,
  FileText,
  Users,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
    desc: 'Validated alongside dermatological datasets to deliver high-confidence diagnostic indicators.',
  },
  {
    icon: FileText,
    title: 'Physician-Ready Reports',
    desc: 'Generates structured PDF packet summaries designed specifically for primary care intake.',
  },
];

const foundingTeam = [
  {
    name: 'Mallikarjun R',
    role: 'Founder & CEO',
    focus: 'Vision, AI Product Development, Full Stack Development, Cloud & DevOps',
    linkedin: 'https://www.linkedin.com/in/mallikarjunr-com/',
    initials: 'MR',
  },
  {
    name: 'Nigam Patel H',
    role: 'Co-Founder',
    focus: 'Co-Founder • Platform Strategy & Operations',
    linkedin: 'https://www.linkedin.com/in/nigam-patel-h-19668b383/',
    initials: 'NP',
  },
  {
    name: 'Mallanagouda M',
    role: 'Co-Founder',
    focus: 'Co-Founder • Systems Architecture & Infrastructure',
    linkedin: 'https://www.linkedin.com/in/mallanagouda-m-93b52938b/',
    initials: 'MM',
  },
  {
    name: 'Mohammed Adil',
    role: 'Co-Founder',
    focus: 'Co-Founder • Product Engineering & Clinical AI Workflows',
    linkedin: 'https://www.linkedin.com/in/mohammed-adil-b737ab388/',
    initials: 'MA',
  },
];

const About: React.FC = () => {
  return (
    <>
      <SEO title="About Us & Co-Founders | Medicus Labs" description="Founded by Mallikarjun R (Founder & CEO), Nigam Patel H (Co-Founder), Mallanagouda M (Co-Founder), and Mohammed Adil (Co-Founder), Medicus Labs bridges clinical dermatology and AI." />
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
            Founded by product builders and AI engineers, Medicus Labs bridges the gap between patient skin concerns and professional dermatological care.
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
                <strong>Medicus Labs was founded by Mallikarjun R</strong> to bridge the critical gap in dermatological care access. Over 3 billion people worldwide lack immediate access to dermatological specialists. Our vision transformer platform provides pre-screening clarity, helping patients identify skin conditions early and prepare structured intake summaries for their doctor visits.
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

        {/* ── IN-PAGE ADVERTISEMENT BANNER ── */}
        <div className="mb-16 text-center">
          <AdSpace variant="leaderboard" />
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

        {/* Real Founding Team Section (2x2 Grid) */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#206E55] uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#141515]">Meet the Founding Team</h2>
            <p className="text-[#5A554A] text-sm sm:text-base">The engineers and product visionaries building Medicus Labs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {foundingTeam.map((member, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#E5E2DA] flex flex-col justify-between space-y-6 shadow-sm hover:border-[#206E55] hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#E8F2ED] text-[#206E55] font-extrabold flex items-center justify-center text-xl border-2 border-[#206E55]/20 shadow-sm flex-shrink-0 group-hover:bg-[#206E55] group-hover:text-white transition-colors duration-300">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#141515] group-hover:text-[#206E55] transition-colors">{member.name}</h3>
                      <p className="text-xs font-bold text-[#206E55] mt-0.5">{member.role}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[#5A554A] text-xs leading-relaxed font-semibold">
                    {member.focus}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F2ED] text-[#206E55] hover:bg-[#206E55] hover:text-white font-bold text-xs transition-all shadow-sm group/btn"
                  >
                    <LinkedinIcon size={14} />
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Team</span>
                </div>
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
    </>
  );
};

export default About;
