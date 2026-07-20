import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const team = [
  { name: 'Mallikarjun R', role: 'Founder & CEO', focus: 'Vision, AI Product, Full Stack, Cloud & DevOps', linkedin: 'https://www.linkedin.com/in/mallikarjunr-com/', initials: 'MR' },
  { name: 'Nigam Patel H', role: 'Co-Founder', focus: 'Platform Strategy & Operations', linkedin: 'https://www.linkedin.com/in/nigam-patel-h-19668b383/', initials: 'NP' },
  { name: 'Mallanagouda M', role: 'Co-Founder', focus: 'Systems Architecture & Infrastructure', linkedin: 'https://www.linkedin.com/in/mallanagouda-m-93b52938b/', initials: 'MM' },
  { name: 'Mohammed Adil', role: 'Co-Founder', focus: 'Product Engineering & Clinical AI Workflows', linkedin: 'https://www.linkedin.com/in/mohammed-adil-b737ab388/', initials: 'MA' },
];

const TeamPage: React.FC = () => (
  <>
    <SEO title="Team - Meet the Founders | Medicus Labs" description="Meet the founding team behind Medicus Labs. AI engineers and product builders democratizing clinical-grade dermatology." />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Leadership Team
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#141515] mb-4">Meet Our Team</h1>
        <p className="text-[#5A554A] text-base sm:text-lg mb-16 max-w-2xl mx-auto">The engineers and product visionaries building Medicus Labs.</p>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((m, i) => (
            <motion.div key={i} className="p-8 rounded-3xl bg-white border border-[#E5E2DA] text-left space-y-6 shadow-sm hover:border-[#206E55] transition-all"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F2ED] text-[#206E55] font-extrabold flex items-center justify-center text-xl border-2 border-[#206E55]/20">{m.initials}</div>
                <div><h3 className="text-xl font-bold text-[#141515]">{m.name}</h3><p className="text-xs font-bold text-[#206E55]">{m.role}</p></div>
              </div>
              <p className="text-[#5A554A] text-xs leading-relaxed font-semibold pt-2 border-t border-slate-100">{m.focus}</p>
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F2ED] text-[#206E55] hover:bg-[#206E55] hover:text-white font-bold text-xs transition">
                <LinkedinIcon size={14} /> LinkedIn <ExternalLink size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      <PremiumFooter />
    </div>
  </>
);

export default TeamPage;