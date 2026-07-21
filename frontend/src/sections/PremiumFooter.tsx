import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Sparkles,
  ArrowRight,
  Mail,
  Check,
  Activity,
  Heart,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerColumns = [
  {
    title: 'Company',
    links: [
      { name: 'About Medicus', href: '/about' },
      { name: 'Founder: Mallikarjun R', href: '/founder' },
      { name: 'Medium Launch Article', href: 'https://medium.com/@mallikarjunr444/medicus-labs-is-back-introducing-medicus-labs-2-0-a748fcc53771', external: true },
      { name: 'Platform Features', href: '/features' },
      { name: 'Clinical Research', href: '/analysis' },
      { name: 'Careers & Hiring', href: '/contact' },
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
      { name: 'HIPAA Compliance', href: '/privacy-policy' },
      { name: 'Security Standards', href: '/privacy-policy' },
      { name: 'User Reference Guide', href: '/faq' },
      { name: 'System Status: 99.9%', href: '/contact' },
    ],
  },
  {
    title: 'Legal & Safety',
    links: [
      { name: 'Terms of Service', href: '/terms-conditions' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Medical Disclaimer', href: '/disclaimer' },
      { name: 'Cookie Policy', href: '/privacy-policy' },
      { name: 'GDPR Compliance', href: '/privacy-policy' },
    ],
  },
];

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/mallikarjunr444-gif', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/mallikarjunr-com/', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/mallikarjunr_official/', label: 'Instagram' },
];

export const PremiumFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subError, setSubError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setSubError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Subscription failed');
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (err: any) {
      setSubError(err?.message || 'Could not subscribe. Please try again.');
      setTimeout(() => setSubError(''), 4000);
    } finally {
      setIsLoading(false);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <footer className="relative z-10 bg-[#FAF9F5] text-[#141515] overflow-hidden pt-20 pb-12 border-t border-[#E5E2DA] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── NEWSLETTER BLOCK ── */}
        <motion.div
          className="rounded-3xl bg-white border border-[#E5E2DA] p-8 sm:p-12 mb-16 shadow-[0_8px_30px_rgba(13,39,64,0.02)] relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F2ED] text-[#206E55] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} />
                Stay Informed
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141515] tracking-tight">
                Get clinical AI updates &amp; research insights
              </h3>
              <p className="text-[#5A554A] text-sm max-w-xl">
                Subscribe to our monthly newsletter covering dermatological AI benchmarks, platform feature releases, and medical privacy standards.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your clinical email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#FAF9F5] border border-[#E5E2DA] !text-[#141515] placeholder-slate-400 focus:outline-none focus:border-[#206E55] focus:ring-1 focus:ring-[#206E55] transition text-sm caret-[#206E55]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  className="px-7 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm transition shadow-sm flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-70"
                >
                  {isSubscribed ? (
                    <>
                      Subscribed! 🎉
                      <Check size={16} />
                    </>
                  ) : isLoading ? (
                    <>
                      Sending...
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
              {subError && (
                <p className="text-red-500 text-xs mt-2 text-center">{subError}</p>
              )}
              {isSubscribed && (
                <p className="text-[#206E55] text-xs mt-2 text-center font-semibold">
                  ✅ Welcome email sent to your inbox!
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── STAGGERED FOUR COLUMNS ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#E5E2DA]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Info Column */}
          <motion.div className="lg:col-span-1 space-y-5" variants={itemVariants}>
            <Link to="/" className="inline-block" aria-label="Medicus Labs home">
              <BrandLogo tone="dark" />
            </Link>
            <p className="text-xs text-[#5A554A] leading-relaxed font-medium">
              Clinical-grade AI dermatology assistant. Fast, encrypted, and built to empower patients and physicians worldwide.
            </p>
             <div className="flex items-center gap-3 pt-2">
               {socialLinks.map((social, idx) => {
                 const Icon = social.icon;
                 return (
                   <motion.a
                     key={idx}
                     href={social.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={social.label}
                     title={social.label}
                     className="w-9 h-9 rounded-full border border-[#E5E2DA] bg-white flex items-center justify-center text-[#5A554A] hover:text-[#206E55] hover:border-[#206E55] transition-all duration-200 shadow-sm"
                     whileHover={{ scale: 1.1, y: -2 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <Icon size={16} />
                   </motion.a>
                 );
               })}
             </div>
          </motion.div>

          {/* 4 Responsive Columns */}
          {footerColumns.map((col, idx) => (
            <motion.div key={idx} className="space-y-4" variants={itemVariants}>
              <h4 className="text-sm font-bold text-[#141515] uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {(link as any).external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-xs text-[#5A554A] hover:text-[#206E55] font-medium transition-all duration-200"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                          {link.name} ↗
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="group inline-flex items-center text-xs text-[#5A554A] hover:text-[#206E55] font-medium transition-all duration-200 relative"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                          {link.name}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── TRUST BADGES & BOTTOM COPYRIGHT ROW ── */}
        <motion.div
          className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#5A554A]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#141515]">
              <Lock size={13} className="text-[#206E55]" />
              HIPAA Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-[#141515]">
              <Shield size={13} className="text-[#206E55]" />
              AES-256 Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-[#141515]">
              <Activity size={13} className="text-[#206E55]" />
              Clinical Vision AI
            </span>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="font-semibold">&copy; {new Date().getFullYear()} Medicus Labs™. All rights reserved.</p>
            <p className="text-[10px] text-slate-400">
              Designed for reference checking &amp; pre-screening support. Not a substitute for professional medical advice.
            </p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default PremiumFooter;
