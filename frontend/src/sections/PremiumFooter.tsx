import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Sparkles,
  ArrowRight,
  Mail,
  Check,
  Github,
  Twitter,
  Linkedin,
  Disc as Discord,
  Activity,
  Heart,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

const footerColumns = [
  {
    title: 'Company',
    links: [
      { name: 'About Medicus', href: '/about' },
      { name: 'Platform Features', href: '/features' },
      { name: 'Clinical Research', href: '/analysis' },
      { name: 'Careers & Hiring', href: '/contact' },
      { name: 'Press & Media Kit', href: '/contact' },
    ],
  },
  {
    title: 'Health Library',
    links: [
      { name: 'Acne Vulgaris', href: '/analysis' },
      { name: 'Melanoma Scanning', href: '/analysis' },
      { name: 'Eczema & Psoriasis', href: '/analysis' },
      { name: 'Rosacea & Vitiligo', href: '/analysis' },
      { name: 'Physician PDF Reports', href: '/analysis' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'API Documentation', href: '/faq' },
      { name: 'HIPAA Compliance', href: '/privacy' },
      { name: 'Security Standards', href: '/security' },
      { name: 'User Reference Guide', href: '/faq' },
      { name: 'System Status: 99.9%', href: '/contact' },
    ],
  },
  {
    title: 'Legal & Safety',
    links: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Medical Disclaimer', href: '/disclaimer' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR Compliance', href: '/compliance' },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Discord, href: 'https://discord.com', label: 'Discord' },
];

export const PremiumFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent via-[#060b13] to-black text-slate-300 overflow-hidden pt-20 pb-12 border-t border-white/10 font-sans">
      
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── TOP NEWSLETTER BLOCK ── */}
        <motion.div
          className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} />
                Stay Informed
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get clinical AI updates &amp; research insights
              </h3>
              <p className="text-slate-400 text-sm max-w-xl">
                Subscribe to our monthly newsletter covering dermatological AI benchmarks, platform feature releases, and medical privacy standards.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your clinical email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/5 border border-white/10 !text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition text-sm caret-sky-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] text-slate-950 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                >
                  {isSubscribed ? (
                    <>
                      Subscribed!
                      <Check size={16} />
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* ── STAGGERED FOUR COLUMNS ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Brand Info Column */}
          <motion.div className="lg:col-span-1 space-y-5" variants={itemVariants}>
            <Link to="/" className="inline-block" aria-label="Medicus Labs home">
              <BrandLogo tone="light" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clinical-grade AI dermatology assistant. Fast, encrypted, and built to empower patients and physicians worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/50 hover:scale-110 hover:rotate-6 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* 4 Responsive Columns */}
          {footerColumns.map((col, idx) => (
            <motion.div key={idx} className="space-y-4" variants={itemVariants}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center text-xs text-slate-400 hover:text-sky-300 transition-all duration-200 relative"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                      {/* Left to right animated underline */}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-sky-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── TRUST BADGES & BOTTOM COPYRIGHT ROW ── */}
        <motion.div
          className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-400">
              <Lock size={13} className="text-sky-400" />
              HIPAA Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-400">
              <Shield size={13} className="text-cyan-400" />
              AES-256 Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-400">
              <Activity size={13} className="text-blue-400" />
              Clinical Vision AI
            </span>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="text-center md:text-right space-y-1">
            <p>&copy; {new Date().getFullYear()} Medicus Labs™. All rights reserved.</p>
            <p className="text-[10px] text-slate-600">
              Designed for reference checking &amp; pre-screening support. Not a substitute for professional medical advice.
            </p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default PremiumFooter;
