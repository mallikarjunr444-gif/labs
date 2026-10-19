import React, { useEffect, useRef } from 'react';

/**
 * AdSpace Component — Medicus Labs
 * Standards-compliant Google AdSense rendering with zero Layout Shift (CLS).
 * Does NOT render dummy wireframe boxes or fake placeholder text,
 * adhering strictly to Google Publisher Quality Guidelines.
 */

export interface AdSpaceProps {
  variant?: 'leaderboard' | 'mobile' | 'rectangle' | 'banner' | 'halfpage' | 'skyscraper' | 'native';
  className?: string;
  slot?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({
  variant = 'rectangle',
  className = '',
  slot,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only attempt push once per mount
    if (pushedRef.current) return;
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle = adsbygoogle;
        pushedRef.current = true;
      }
    } catch {
      // Ignore adsbygoogle errors when ad blocker is active or ads are pending
    }
  }, []);

  return (
    <div className={`my-4 flex justify-center items-center overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 0, width: '100%' }}
        data-ad-client="ca-pub-8305972358699914"
        data-ad-slot={slot || undefined}
        data-ad-format={variant === 'rectangle' ? 'rectangle' : 'auto'}
        data-full-width-responsive="true"
      />
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
