import React, { useEffect, useRef, useState } from 'react';

/**
 * AdSpace Component — Medicus Labs
 * Renders Adsterra display banners by size variant.
 *
 * All Adsterra ad units are active (medicuslabs.app site ID: 6020615)
 *
 * Adsterra Banner Keys:
 *   320×50  → 5bb38a3877be00921d1f6096f9c3f9f3  (mobile leaderboard)
 *   468×60  → 73ef526d1c2f418a47836e899545d3a4  (standard banner)
 *   160×300 → 0ee1c0bcce534edceeb794c3154bcfa5  (half page)
 *   300×250 → e997ac116d226473ad86ae02134ed496  (medium rectangle — best RPM)
 *   160×600 → 1c29220216959c0bcc7dcc831282e41c  (wide skyscraper)
 *   728×90  → 372da341128f0211df6d8544c27ca92c  (leaderboard — desktop)
 *
 * Native Banner container: 29779f7044e37e17928797be20705afd
 *
 * Site-wide (in index.html body):
 *   Popunder: pl31113087.profitableratecpmnetwork.com
 *   Social Bar: pl31113092.profitableratecpmnetwork.com
 */

interface AdSpaceProps {
  /**
   * Which Adsterra banner size to render:
   *   'leaderboard'   → 728×90  (desktop top/bottom)
   *   'mobile'        → 320×50  (mobile)
   *   'rectangle'     → 300×250 (mid-article — best earning)
   *   'banner'        → 468×60
   *   'halfpage'      → 160×300
   *   'skyscraper'    → 160×600
   *   'native'        → Native Banner (auto-sizes, looks editorial)
   */
  variant?: 'leaderboard' | 'mobile' | 'rectangle' | 'banner' | 'halfpage' | 'skyscraper' | 'native';
  className?: string;
}

// Adsterra iframe banner configs
const ADSTERRA_UNITS: Record<string, { key: string; width: number; height: number }> = {
  leaderboard: { key: '372da341128f0211df6d8544c27ca92c', width: 728, height: 90 },
  mobile:      { key: '5bb38a3877be00921d1f6096f9c3f9f3', width: 320, height: 50 },
  rectangle:   { key: 'e997ac116d226473ad86ae02134ed496', width: 300, height: 250 },
  banner:      { key: '73ef526d1c2f418a47836e899545d3a4', width: 468, height: 60 },
  halfpage:    { key: '0ee1c0bcce534edceeb794c3154bcfa5', width: 160, height: 300 },
  skyscraper:  { key: '1c29220216959c0bcc7dcc831282e41c', width: 160, height: 600 },
};

const NATIVE_KEY = '29779f7044e37e17928797be20705afd';

/**
 * IframeAd — renders a single Adsterra banner via atOptions + invoke.js
 * Uses IntersectionObserver lazy loading with a 300px prefetch threshold so ads
 * load effortlessly without blocking initial page render or freezing mobile threads.
 */
const IframeAd: React.FC<{ adKey: string; width: number; height: number }> = ({
  adKey,
  width,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const injected = useRef(false);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || injected.current || !containerRef.current) return;
    injected.current = true;

    const container = containerRef.current;

    // Script 1: atOptions config
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.text = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    container.appendChild(configScript);

    // Script 2: invoke.js loader
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `https://poetrywishing.com/${adKey}/invoke.js`;
    invokeScript.async = true;
    container.appendChild(invokeScript);
  }, [isVisible, adKey, width, height]);

  return (
    <div
      ref={containerRef}
      style={{ width, height, overflow: 'hidden', display: 'inline-block' }}
      aria-label="Advertisement"
    />
  );
};

/**
 * NativeAd — renders the Adsterra Native Banner unit with IntersectionObserver lazy loading.
 */
const NativeAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const injected = useRef(false);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || injected.current || !containerRef.current) return;
    injected.current = true;

    const container = containerRef.current;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `https://poetrywishing.com/${NATIVE_KEY}/invoke.js`;
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    container.appendChild(invokeScript);
  }, [isVisible]);

  return (
    <div aria-label="Advertisement" style={{ width: '100%', minHeight: 90 }}>
      <div id={`container-${NATIVE_KEY}`} ref={containerRef} />
    </div>
  );
};

/**
 * AdSpace — main exported component
 * Auto-selects responsive size based on variant prop.
 * On mobile screens, leaderboard falls back to 320×50 automatically.
 */
export const AdSpace: React.FC<AdSpaceProps> = ({
  variant = 'rectangle',
  className = '',
}) => {
  if (variant === 'native') {
    return (
      <div className={`my-6 text-center overflow-hidden ${className}`}>
        <NativeAd />
      </div>
    );
  }

  // If leaderboard, serve 728x90 on desktop and 320x50 on mobile screens
  if (variant === 'leaderboard') {
    const desktopUnit = ADSTERRA_UNITS.leaderboard;
    const mobileUnit = ADSTERRA_UNITS.mobile;

    return (
      <div className={`my-6 text-center ${className}`}>
        {/* Desktop: 728x90 */}
        <div className="hidden sm:flex justify-center items-center" style={{ minHeight: desktopUnit.height }}>
          <IframeAd adKey={desktopUnit.key} width={desktopUnit.width} height={desktopUnit.height} />
        </div>
        {/* Mobile: 320x50 */}
        <div className="flex sm:hidden justify-center items-center" style={{ minHeight: mobileUnit.height }}>
          <IframeAd adKey={mobileUnit.key} width={mobileUnit.width} height={mobileUnit.height} />
        </div>
      </div>
    );
  }

  const unit = ADSTERRA_UNITS[variant];
  if (!unit) return null;

  return (
    <div
      className={`my-6 flex justify-center items-center ${className}`}
      style={{ minHeight: unit.height }}
    >
      <IframeAd adKey={unit.key} width={unit.width} height={unit.height} />
    </div>
  );
};

/**
 * SponsoredLinks — Renders 3 Adsterra Smartlink cards as a "Recommended for You" section.
 * Place at the bottom of blog articles for maximum CTR.
 * Each click earns money via Adsterra Smartlink (highest-paying offer per visitor country).
 */
const SMARTLINKS = [
  {
    href: 'https://poetrywishing.com/myccy3c6?key=812b322764c0068e16258bf45e21d4e5',
    label: 'Best Skincare Products',
    desc: 'Discover dermatologist-recommended skincare routines and products.',
    emoji: '🧴',
  },
  {
    href: 'https://poetrywishing.com/f9c6ta12?key=a1ae136c4aa6cdc05acfa2973e56ee76',
    label: 'Clinical Health Resources',
    desc: 'Access evidence-based health tools and clinical reference guides.',
    emoji: '🩺',
  },
  {
    href: 'https://poetrywishing.com/kqbjqhw770?key=744f7eb9899663a66a114fdbde11867f',
    label: 'Dermatology Tools & Offers',
    desc: 'Explore top-rated dermatology tools and exclusive health deals.',
    emoji: '✨',
  },
  {
    href: 'https://poetrywishing.com/c87skau1eu?key=d510b8e643bb203bddcc0f124e246e4d',
    label: 'Wellness & Vitality Guides',
    desc: 'Explore trusted physician-approved health programs and benefits.',
    emoji: '💊',
  },
];

export const SponsoredLinks: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`my-10 ${className}`} aria-label="Sponsored recommendations">
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A857A] mb-4 text-center">
      Sponsored Recommendations
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SMARTLINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex flex-col gap-2 p-5 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#206E55] hover:shadow-md transition-all group"
        >
          <span className="text-2xl">{link.emoji}</span>
          <span className="text-sm font-bold text-[#141515] group-hover:text-[#206E55] transition-colors leading-snug">
            {link.label}
          </span>
          <span className="text-xs text-[#5A554A] leading-relaxed">{link.desc}</span>
          <span className="text-xs font-bold text-[#206E55] mt-auto">
            Learn more →
          </span>
        </a>
      ))}
    </div>
  </div>
);

export default AdSpace;
