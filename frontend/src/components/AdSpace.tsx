import React from 'react';

/**
 * AdSpace Component — Medicus Labs
 * Reserves styled advertisement space across pages and blog articles,
 * maintaining exact aspect ratios and preventing Cumulative Layout Shift (CLS).
 */

export interface AdSpaceProps {
  variant?: 'leaderboard' | 'mobile' | 'rectangle' | 'banner' | 'halfpage' | 'skyscraper' | 'native';
  className?: string;
}

const AD_DIMENSIONS: Record<string, { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90, label: '728 × 90 Leaderboard' },
  mobile:      { width: 320, height: 50, label: '320 × 50 Mobile Banner' },
  rectangle:   { width: 300, height: 250, label: '300 × 250 Medium Rectangle' },
  banner:      { width: 468, height: 60, label: '468 × 60 Standard Banner' },
  halfpage:    { width: 160, height: 300, label: '160 × 300 Half Page' },
  skyscraper:  { width: 160, height: 600, label: '160 × 600 Skyscraper' },
};

export const AdSpace: React.FC<AdSpaceProps> = ({
  variant = 'rectangle',
  className = '',
}) => {
  if (variant === 'native') {
    return (
      <div
        className={`my-6 w-full max-w-4xl mx-auto min-h-[90px] rounded-xl border border-dashed border-[#DDD7CD] bg-[#FAF9F5]/80 flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        aria-label="Advertisement Space"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A857A]">
          Advertisement
        </span>
        <span className="text-[10px] text-[#A39E93] mt-0.5">
          Sponsored Content Space
        </span>
      </div>
    );
  }

  // Leaderboard: 728x90 on desktop, 320x50 on mobile
  if (variant === 'leaderboard') {
    return (
      <div className={`my-6 flex justify-center items-center ${className}`} aria-label="Advertisement Space">
        {/* Desktop: 728x90 */}
        <div
          className="hidden sm:flex flex-col justify-center items-center rounded-xl border border-dashed border-[#DDD7CD] bg-[#FAF9F5]/80 select-none"
          style={{ width: 728, height: 90 }}
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A857A]">
            Advertisement
          </span>
          <span className="text-[10px] text-[#A39E93] mt-0.5">
            Leaderboard Space (728×90)
          </span>
        </div>

        {/* Mobile: 320x50 */}
        <div
          className="flex sm:hidden flex-col justify-center items-center rounded-xl border border-dashed border-[#DDD7CD] bg-[#FAF9F5]/80 select-none"
          style={{ width: 320, height: 50 }}
        >
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#8A857A]">
            Advertisement
          </span>
          <span className="text-[8px] text-[#A39E93]">
            Mobile Banner Space (320×50)
          </span>
        </div>
      </div>
    );
  }

  const dim = AD_DIMENSIONS[variant];
  if (!dim) return null;

  return (
    <div className={`my-6 flex justify-center items-center ${className}`} aria-label="Advertisement Space">
      <div
        className="flex flex-col justify-center items-center rounded-xl border border-dashed border-[#DDD7CD] bg-[#FAF9F5]/80 text-center select-none px-2"
        style={{ width: dim.width, height: dim.height }}
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A857A]">
          Advertisement
        </span>
        <span className="text-[9px] text-[#A39E93] mt-0.5">
          {dim.label}
        </span>
      </div>
    </div>
  );
};

const RECOMMENDED_RESOURCES = [
  {
    href: '/find-dermatologist',
    label: 'Verified Dermatologists',
    desc: 'Find licensed board-certified dermatologists and clinic appointments near you.',
    emoji: '🩺',
  },
  {
    href: '/analysis',
    label: 'Clinical AI Skin Scan',
    desc: 'Instant non-invasive cutaneous lesion screening with evidence-based pathology models.',
    emoji: '🔬',
  },
  {
    href: '/research',
    label: 'Dermatological Research',
    desc: 'Explore peer-reviewed clinical validation studies and diagnostic accuracy metrics.',
    emoji: '📑',
  },
  {
    href: '/faq',
    label: 'Clinical FAQ & Guides',
    desc: 'Browse evidence-based answers regarding skin health, diagnosis, and medical intake.',
    emoji: '💡',
  },
];

export const SponsoredLinks: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`my-10 ${className}`} aria-label="Recommended Resources">
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A857A] mb-4 text-center">
      Recommended Resources &amp; Clinical Tools
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {RECOMMENDED_RESOURCES.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex flex-col gap-2 p-5 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#206E55] hover:shadow-md transition-all group"
        >
          <span className="text-2xl">{item.emoji}</span>
          <span className="text-sm font-bold text-[#141515] group-hover:text-[#206E55] transition-colors leading-snug">
            {item.label}
          </span>
          <span className="text-xs text-[#5A554A] leading-relaxed">{item.desc}</span>
          <span className="text-xs font-bold text-[#206E55] mt-auto">
            Explore →
          </span>
        </a>
      ))}
    </div>
  </div>
);

export default AdSpace;
