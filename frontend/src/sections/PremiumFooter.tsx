import React from 'react';
import MeadowRiseFooter from '../components/MeadowRiseFooter';
import { getApiBaseUrl } from '../lib/apiBase';

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


const SANS = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Inter, "Helvetica Neue", Arial, system-ui, sans-serif';

const PALETTE = {
  sky: ['#fbfbfd', '#e4ecfa'] as [string, string],
  haze: '#dbe6f8',
  glow: '#ffffff',
  hills: [
    ['#cfdaee', '#b7c6e0'],
    ['#a9bddf', '#869fcc'],
    ['#7f9bd0', '#5a74ab'],
    ['#566fae', '#3a5083'],
    ['#364b7e', '#212f55'],
    ['#1b2644', '#0d1429'],
  ] as [string, string][],
  ground: '#080a12',
  ink: '#1d1d1f',
  sub: '#6e6e73',
  pill: '#0071e3',
  pillInk: '#ffffff',
  text: '#f5f5f7',
  muted: '#a1a1a6',
  line: 'rgba(255,255,255,0.14)',
};

export const PremiumFooter: React.FC = () => {
  const onSubscribe = async (email: string) => {
    const res = await fetch(`${getApiBaseUrl()}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.detail || 'Subscription failed');
  };

  return (
    <MeadowRiseFooter
      name="Medicus Labs"
      brandHref="/"
      preset="meadow"
      palette={PALETTE}
      fontFamily={SANS}
      serifFamily={SANS}
      heading={'Your skin,\n*understood.*'}
      subheading="Free, private and ready in minutes. Not a diagnosis. Always see a doctor for medical advice."
      cta={{ label: 'Start free scan', href: '/analysis' }}
      tagline="A short monthly note on skin-health research and new features."
      placeholder="Your email address"
      successMessage="You are subscribed. Thank you."
      onSubscribe={onSubscribe}
      columns={footerColumns.map((c) => ({ title: c.title, links: c.links.map((l) => ({ label: l.name, href: l.href })) }))}
      socialTitle="Follow"
      socials={[{ icon: 'linkedin', href: 'https://www.linkedin.com/in/mallikarjunr-com/' }]}
      legal={[
        { label: 'Blog', href: '/blog' },
        { label: 'Privacy', href: '/privacy-policy' },
        { label: 'Terms', href: '/terms-conditions' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'Sitemap', href: '/sitemap' },
      ]}
      seed={5}
      mist={0.5}
      botanicals={false}
    />
  );
};

export default PremiumFooter;
