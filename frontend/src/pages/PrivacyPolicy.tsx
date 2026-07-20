import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Database, Globe, Mail, ChevronDown } from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

const sections = [
  {
    icon: Eye, title: 'Information We Collect', color: 'bg-sky-500', lightBg: 'bg-sky-50', textColor: 'text-sky-600',
    content: (
      <ul className="space-y-3 text-slate-500 text-sm leading-relaxed">
        {[['Personal details','Name, age, gender, phone number, and email address you provide during analysis.'],['Uploaded images','Skin photographs submitted for AI-powered dermatological analysis.'],['Usage data','Pages visited, features used, browser type, and device information.'],['Communication data','Email address if you subscribe to clinical updates.']].map(([b,r]) => (
          <li key={b} className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0"/><span><strong className="text-slate-700">{b}</strong> — {r}</span></li>
        ))}
      </ul>
    ),
  },
  {
    icon: Database, title: 'How We Use Your Information', color: 'bg-violet-500', lightBg: 'bg-violet-50', textColor: 'text-violet-600',
    content: (
      <ul className="space-y-3 text-slate-500 text-sm leading-relaxed">
        {['To perform AI-assisted dermatological analysis and generate diagnostic reports.','To send clinical research updates and product releases (if subscribed).','To improve the accuracy and reliability of our AI models.','To comply with legal obligations and enforce our Terms & Conditions.'].map(t => (
          <li key={t} className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"/><span>{t}</span></li>
        ))}
      </ul>
    ),
  },
  {
    icon: Lock, title: 'Data Security', color: 'bg-emerald-500', lightBg: 'bg-emerald-50', textColor: 'text-emerald-600',
    content: (
      <div className="text-slate-500 text-sm leading-relaxed space-y-3">
        <p>We take reasonable administrative, technical, and physical measures to protect your information from unauthorized access, alteration, or disclosure.</p>
        <p>Uploaded images are processed in memory and not permanently stored beyond the session. All data is transmitted over <strong className="text-slate-700">HTTPS/TLS encrypted connections</strong>.</p>
      </div>
    ),
  },
  {
    icon: Globe, title: 'Data Sharing', color: 'bg-amber-500', lightBg: 'bg-amber-50', textColor: 'text-amber-600',
    content: (
      <div className="text-slate-500 text-sm leading-relaxed space-y-3">
        <p>We do <strong className="text-slate-700">not</strong> sell, trade, or rent your personal information to third parties. We may share data with:</p>
        <ul className="space-y-2">
          <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"/><span><strong className="text-slate-700">AI service providers</strong> — such as Groq, under strict data processing agreements.</span></li>
          <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"/><span><strong className="text-slate-700">Legal authorities</strong> — if required by law or to protect user safety.</span></li>
        </ul>
      </div>
    ),
  },
  {
    icon: ShieldCheck, title: 'Your Rights', color: 'bg-rose-500', lightBg: 'bg-rose-50', textColor: 'text-rose-600',
    content: (
      <div className="text-slate-500 text-sm leading-relaxed space-y-3">
        <ul className="space-y-2">
          {['Request access to, correction of, or deletion of your personal data.','Unsubscribe from clinical update emails at any time.','Request a copy of the data we hold about you.'].map(t => (
            <li key={t} className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0"/><span>{t}</span></li>
          ))}
        </ul>
        <p>Contact us at <a href="mailto:medicuslabs.com@gmail.com" className="text-sky-600 hover:underline">medicuslabs.com@gmail.com</a></p>
      </div>
    ),
  },
  {
    icon: Mail, title: 'Contact', color: 'bg-indigo-500', lightBg: 'bg-indigo-50', textColor: 'text-indigo-600',
    content: (
      <p className="text-slate-500 text-sm">Questions about this Privacy Policy? Contact us at <a href="mailto:medicuslabs.com@gmail.com" className="text-sky-600 hover:underline font-semibold">medicuslabs.com@gmail.com</a></p>
    ),
  },
];

const AccordionItem: React.FC<{ s: typeof sections[0]; i: number }> = ({ s, i }) => {
  const [open, setOpen] = useState(i === 0);
  const Icon = s.icon;
  return (
    <motion.div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07, duration: 0.5 }} viewport={{ once: true }}>
      <button className="w-full flex items-center gap-4 p-6 text-left group" onClick={() => setOpen(o => !o)}>
        <div className={`w-10 h-10 rounded-xl ${s.lightBg} ${s.textColor} flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} />
        </div>
        <span className={`flex-1 font-bold text-slate-800 text-base group-hover:${s.textColor} transition-colors`}>{s.title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-6 pb-6 pt-0 border-t border-slate-100">
              <div className="pt-4">{s.content}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen bg-white text-slate-900">
    <PremiumNavbar />

    <section className="relative pt-36 pb-20 px-4 sm:px-6 text-center overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-96 h-72 bg-sky-100/70 rounded-full blur-3xl pointer-events-none" />
      <motion.div className="relative z-10 max-w-2xl mx-auto" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold tracking-widest uppercase mb-6">
          <ShieldCheck size={11} /> Legal · Privacy
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-5 leading-[1.08] text-slate-900">
          Privacy{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">Policy</span>
        </h1>
        <p className="text-slate-500 text-base font-medium">Last updated: July 19, 2026 · Effective immediately</p>
      </motion.div>
    </section>

    <main className="px-4 sm:px-6 pb-28 max-w-3xl mx-auto space-y-4">
      {sections.map((s, i) => <AccordionItem key={s.title} s={s} i={i} />)}
    </main>
    <PremiumFooter />
  </div>
);

export default PrivacyPolicy;
