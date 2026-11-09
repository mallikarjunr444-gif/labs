import React, { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getApiBaseUrl } from '../lib/apiBase';

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
      { name: 'Clinical AI Scan', href: '/analysis' },
      { name: 'Contact', href: '/contact' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  },
  {
    title: 'Health Library',
    links: [
      { name: 'Medical Blog & Articles', href: '/blog' },
      { name: 'Acne Vulgaris Guide', href: '/blog/acne' },
      { name: 'Melanoma Screening', href: '/blog/melanoma' },
      { name: 'Atopic Dermatitis & Eczema', href: '/blog/eczema' },
      { name: 'Plaque Psoriasis Guide', href: '/blog/psoriasis' },
      { name: 'Rosacea Subtypes', href: '/blog/rosacea' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'AI Research & Validation', href: '/research' },
      { name: 'Editorial & E-E-A-T Policy', href: '/editorial-policy' },
      { name: 'Evidence Skincare Protocol', href: '/blog/skincare-guide' },
      { name: 'FAQ & User Guide', href: '/faq' },
      { name: 'Data & Security', href: '/privacy-policy' },
        ],
  },
  {
    title: 'Legal & Safety',
    links: [
      { name: 'Terms of Service', href: '/terms-conditions' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Medical Disclaimer', href: '/disclaimer' },
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
      const res = await fetch(`${getApiBaseUrl()}/subscribe`, {
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


  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73]">
      <div className="mx-auto max-w-[1080px] px-5 pb-8 pt-16 sm:pt-20">
        <div className="rounded-[28px] bg-white p-7 sm:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#1d1d1f] sm:text-[34px]">Stay informed.</h3>
              <p className="mt-3 max-w-[420px] text-[17px] leading-[1.5]">A short monthly note on skin-health research, new features and privacy.</p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                <label className="relative flex-1">
                  <span className="sr-only">Email address</span>
                  <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" style={{ paddingLeft: 44 }} className="h-12 w-full rounded-full border border-[#d2d2d7] bg-white pl-11 pr-4 text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/20" />
                </label>
                <button type="submit" disabled={isLoading || isSubscribed} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0071e3] px-6 text-[17px] text-white transition-colors hover:bg-[#0077ed] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0071e3]/30">
                  {isSubscribed ? (<>Subscribed <Check size={16} /></>) : isLoading ? 'Sending…' : (<>Subscribe <ArrowRight size={16} /></>)}
                </button>
              </form>
              {subError && <p role="alert" className="mt-3 text-[14px] text-[#c4281c]">{subError}</p>}
              {isSubscribed && <p role="status" className="mt-3 text-[14px] text-[#1a7f37]">Thanks. Check your inbox for a welcome email.</p>}
            </div>
          </div>
        </div>

        <ol className="mt-12 list-decimal space-y-2 border-b border-[#d2d2d7] pb-6 pl-4 text-[12px] leading-[1.6]">
          <li>Medicus Labs provides AI-generated information for education and preliminary reference. It is not a medical diagnosis and does not replace a qualified dermatologist or physician.</li>
          <li>Results can be incomplete or wrong. See a clinician for any skin change that is new, growing, bleeding or worrying, and seek urgent care in an emergency.</li>
        </ol>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-8 md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold text-[#1d1d1f]">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-[12px]">
                {col.links.map((link: { name: string; href: string; external?: boolean }) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#1d1d1f] hover:underline">{link.name}</a>
                    ) : (
                      <Link to={link.href} className="hover:text-[#1d1d1f] hover:underline">{link.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-[#d2d2d7] pt-5 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} Medicus Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-[#1d1d1f] hover:underline">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-[#1d1d1f] hover:underline">Terms of Use</Link>
            <Link to="/disclaimer" className="hover:text-[#1d1d1f] hover:underline">Medical Disclaimer</Link>
            <Link to="/sitemap" className="hover:text-[#1d1d1f] hover:underline">Sitemap</Link>
            <span className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-[#6e6e73] hover:text-[#1d1d1f]"><Icon size={16} /></a>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
