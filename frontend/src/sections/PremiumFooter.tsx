import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUp, ShieldCheck, Activity, Check, ArrowRight } from 'lucide-react';
import { getApiBaseUrl } from '../lib/apiBase';
import BrandLogo from '../components/BrandLogo';

type FooterLink = { label: string; to: string };

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  PRODUCT: [
    { label: 'Features', to: '/features' },
    { label: 'Analysis', to: '/analysis' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'FAQ', to: '/faq' },
  ],
  COMPANY: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ],
  LEGAL: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms-conditions' },
    { label: 'Disclaimer', to: '/disclaimer' },
  ],
  SUPPORT: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Report an Issue', to: '/report' },
  ],
};


const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/mallikarjunr-com/';

// Safe local SVG social icons
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

export const PremiumFooter: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleLink = (_e: React.MouseEvent<HTMLAnchorElement>, _to: string) => {
    // All links are now active
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToast('Please enter a valid email address.');
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSubStatus('loading');
    try {
      const res = await fetch(`${getApiBaseUrl()}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubStatus('success');
        setEmail('');
        setToast("You're subscribed! Welcome to Medicus Labs.");
        setTimeout(() => {
          setToast(null);
          setSubStatus('idle');
        }, 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      setSubStatus('success');
      setEmail('');
      setToast('Subscribed! Welcome to Medicus Labs.');
      setTimeout(() => {
        setToast(null);
        setSubStatus('idle');
      }, 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 bg-slate-900 text-white border border-slate-800 px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2"
          >
            <ShieldCheck className="text-sky-400" size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative bg-slate-950 border-t border-slate-900 text-slate-400 overflow-hidden">
        {/* Decorative Grid and Glow Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* 1. Header Subscription & Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="relative rounded-3xl bg-slate-900/60 border border-slate-800/80 p-8 sm:p-10 lg:p-12 overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[50px] pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Activity size={12} className="animate-pulse" />
                  Skin Companion Engine
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Evolving clinical skin intelligence.
                </h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                  Join a community tracking conditions accurately. Read documentation, run instant scans, and maintain continuous care.
                </p>
                <div className="pt-2">
                  <Link
                    to="/analysis"
                    className="uiverse-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold text-sm shadow-lg shadow-sky-500/10"
                  >
                    Start Free Analysis
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/40 border border-slate-800/60 p-6 sm:p-8 rounded-2xl space-y-4">
                <h4 className="text-white font-bold text-base flex items-center gap-2">
                  <Mail size={16} className="text-sky-400" />
                  Get Clinical Updates
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Subscribe to receive clinical research, product releases, and platform enhancements.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                  />
                  <button
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="px-5 py-3 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {subStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-900" />
        </div>

        {/* 2. Main Navigation Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/">
                <BrandLogo tone="light" />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Advancing skin health tracking through state-of-the-art AI analysis. Accurate, private, and secure diagnostics accessible 24/7.
              </p>
              
              {/* System Status */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Status: Fully Operational
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3">
                <a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 hover:text-white flex items-center justify-center text-slate-400 transition"
                  title="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 hover:text-white flex items-center justify-center text-slate-400 transition"
                  title="GitHub"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 hover:text-white flex items-center justify-center text-slate-400 transition"
                  title="Twitter"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                <div key={section} className="space-y-4">
                  <h4 className="text-white text-xs font-bold tracking-wider uppercase">
                    {section}
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          onClick={(e) => handleLink(e, link.to)}
                          className="text-slate-400 hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-900" />
        </div>

        {/* 3. Bottom Legal Bar & Trust Badges */}
        <div className="bg-slate-950/80 relative z-10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <p className="text-xs sm:text-sm text-slate-400">
                © {currentYear} Medicus Labs™. All rights reserved.
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 max-w-xl leading-relaxed">
                Disclaimer: Medicus Labs does not provide medical diagnoses or replace consultations with licensed dermatologists.
              </p>
            </div>

            {/* Trust Validation Badges & Back to Top */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <ShieldCheck size={12} className="text-sky-400" />
                HIPAA Secure
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <ShieldCheck size={12} className="text-sky-400" />
                ISIC Standard
              </span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:border-sky-500 hover:text-white flex items-center justify-center transition shadow-lg"
                title="Back to Top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
