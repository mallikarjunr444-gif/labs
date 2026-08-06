import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Database, Globe, Mail, ChevronDown, Check } from 'lucide-react';
import { PremiumFooter } from '../sections';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    color: 'text-[#206E55]',
    lightBg: 'bg-[#E8F2ED]',
    content: (
      <ul className="space-y-3 text-[#5A554A] text-xs sm:text-sm leading-relaxed font-semibold">
        {[
          ['Personal details', 'Name, age, gender, phone number, and email address submitted during patient intake.'],
          ['Uploaded photographs', 'High-resolution dermatological photos analyzed strictly in-memory.'],
          ['Metadata logs', 'Model parameters, processing speed metrics, and scan timestamps.'],
          ['Email subscriptions', 'Contact parameters retained for newsletter and clinical reference guides.']
        ].map(([b, r]) => (
          <li key={b} className="flex gap-3">
            <Check className="text-[#206E55] mt-1 flex-shrink-0" size={16} />
            <span>
              <strong className="text-[#141515]">{b}</strong> — {r}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Database,
    title: 'How We Process Data',
    color: 'text-[#206E55]',
    lightBg: 'bg-[#E8F2ED]',
    content: (
      <ul className="space-y-3 text-[#5A554A] text-xs sm:text-sm leading-relaxed font-semibold">
        {[
          'Running real-time automated AI inference models for skin classification.',
          'Generating clinical-grade 1-page PDF reports with verifiable secure hashes.',
          'Delivering requested platform updates and research publications to newsletter subscribers.',
          'Enforcing security policies and verifying HIPAA compliance auditing metrics.'
        ].map((t) => (
          <li key={t} className="flex gap-3">
            <Check className="text-[#206E55] mt-1 flex-shrink-0" size={16} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Lock,
    title: 'Security & Encryption Standards',
    color: 'text-[#206E55]',
    lightBg: 'bg-[#E8F2ED]',
    content: (
      <div className="text-[#5A554A] text-xs sm:text-sm leading-relaxed space-y-3 font-semibold">
        <p>
          We employ strict administrative and technical measures to shield data from unauthorized access or exposure:
        </p>
        <ul className="space-y-2 pl-2">
          <li className="flex gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#206E55] mt-2 flex-shrink-0" />
            <span><strong>Zero-Storage Scans:</strong> Images are processed instantly in volatile RAM and are automatically purged from memory.</span>
          </li>
          <li className="flex gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#206E55] mt-2 flex-shrink-0" />
            <span><strong>End-to-End Encryption:</strong> All transactions transit over secure HTTPS channels using AES-256 encryption.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: Globe,
    title: 'Third-Party Processing',
    color: 'text-[#206E55]',
    lightBg: 'bg-[#E8F2ED]',
    content: (
      <div className="text-[#5A554A] text-xs sm:text-sm leading-relaxed space-y-3 font-semibold">
        <p>
          Medicus Labs™ does not sell or rent data. We only share diagnostic payloads with:
        </p>
        <ul className="space-y-2">
          <li className="flex gap-3">
            <Check className="text-[#206E55] mt-1 flex-shrink-0" size={16} />
            <span><strong>AI LLM Providers:</strong> (e.g. Groq/OpenAI) for real-time symptom diagnostic processing, bound by HIPAA-compliant APIs.</span>
          </li>
          <li className="flex gap-3">
            <Check className="text-[#206E55] mt-1 flex-shrink-0" size={16} />
            <span><strong>Legal Mandates:</strong> Solely if required by court order to protect personal safety.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    title: 'Patient Data Rights (GDPR & CCPA)',
    color: 'text-[#206E55]',
    lightBg: 'bg-[#E8F2ED]',
    content: (
      <div className="text-[#5A554A] text-xs sm:text-sm leading-relaxed space-y-3 font-semibold">
        <p>You have full autonomy over your records, including the right to:</p>
        <ul className="space-y-2">
          {[
            'Request immediate removal of subscription metadata records.',
            'Opt-out of any marketing or research publications.',
            'Download or transfer a complete transcript of your account data.'
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <Check className="text-[#206E55] mt-1 flex-shrink-0" size={16} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Send requests directly to <a href="mailto:support@medicuslabs.app" className="text-[#206E55] hover:underline font-bold">support@medicuslabs.app</a>.
        </p>
      </div>
    ),
  },
];

const AccordionItem: React.FC<{ s: typeof sections[0]; i: number }> = ({ s, i }) => {
  const [open, setOpen] = useState(i === 0);
  const Icon = s.icon;
  return (
    <motion.div
      className="bg-white border border-[#E5E2DA] rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-shadow duration-300"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left group"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-2xl ${s.lightBg} ${s.color} flex items-center justify-center flex-shrink-0 border border-[#206E55]/10`}>
            <Icon size={18} />
          </div>
          <span className="font-bold text-base text-[#141515] group-hover:text-[#206E55] transition-colors font-display">
            {s.title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-slate-50">
              <div className="pt-4">{s.content}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen bg-[#FAF9F5] text-[#141515] font-sans">
    <section className="relative pt-36 pb-16 px-4 sm:px-6 text-center overflow-hidden">
      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <ShieldCheck size={12} />
          Legal Integrity
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 font-display text-[#141515] leading-tight">
          Privacy <span className="text-[#206E55]">Policy</span>
        </h1>
        <p className="text-[#5A554A] text-sm sm:text-base font-semibold">
          Last updated: July 20, 2026 · We operate under rigorous clinical compliance standards.
        </p>
      </motion.div>
    </section>

    <main className="px-4 sm:px-6 pb-28 max-w-3xl mx-auto space-y-5">
      {sections.map((s, i) => (
        <AccordionItem key={s.title} s={s} i={i} />
      ))}
      
      {/* HIPAA Compliance Spotlight */}
      <motion.div 
        className="p-6 rounded-3xl bg-[#E8F2ED]/40 border border-[#206E55]/15 space-y-3"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="font-bold text-[#141515] text-base flex items-center gap-2 font-display">
          <ShieldCheck className="text-[#206E55]" size={18} />
          HIPAA & Clinical Data Safeguards
        </h3>
        <p className="text-[#5A554A] text-xs sm:text-sm leading-relaxed font-semibold">
          Medicus Labs™ adheres to standard healthcare data protocols. Patient identifiers and uploaded pathology photographs are decrypted locally, analyzed in-memory, and immediately discarded. No visual health datasets are saved or repurposed for AI retraining.
        </p>
      </motion.div>
    </main>

    <PremiumFooter />
  </div>
);

export default PrivacyPolicy;
