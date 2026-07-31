import React, { useEffect, useRef } from 'react';

interface AdSpaceProps {
  /** Google AdSense Ad Slot ID (optional) */
  slot?: string;
  /** Ad Format type: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical' */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /** Responsive layout: true | false */
  fullWidthResponsive?: boolean;
  /** Layout variant for styling container space */
  variant?: 'banner' | 'in-feed' | 'rectangle' | 'sidebar' | 'inline';
  /** Optional custom CSS classes */
  className?: string;
  /** Optional label, e.g. "ADVERTISEMENT" or "SPONSORED" */
  label?: string;
  /** Show subtle fallback frame when ad is empty / loading */
  showPlaceholder?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

/**
 * AdSpace Component
 * Reserves designated space for Google AdSense & display advertisements on Medicus Labs.
 * Client Publisher ID: ca-pub-8305972358699914
 */
export const AdSpace: React.FC<AdSpaceProps> = ({
  slot,
  format = 'auto',
  fullWidthResponsive = true,
  variant = 'banner',
  className = '',
  label = 'ADVERTISEMENT',
  showPlaceholder = true,
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate push calls
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense push error (AdBlocker or pending approval):', err);
    }
  }, []);

  // Determine container heights based on variant to reserve layout space (prevent CLS)
  const variantStyles = {
    banner: 'w-full min-h-[90px] sm:min-h-[120px] max-w-7xl mx-auto my-6',
    'in-feed': 'w-full min-h-[150px] sm:min-h-[180px] my-8',
    rectangle: 'w-full max-w-[336px] min-h-[280px] mx-auto my-6',
    sidebar: 'w-full max-w-[300px] min-h-[600px] my-6',
    inline: 'w-full min-h-[100px] my-4',
  };

  return (
    <div
      ref={adRef}
      aria-label="Advertisement container"
      className={`relative overflow-hidden rounded-2xl border border-[#E5E2DA] bg-[#F9F8F6]/80 p-3 sm:p-4 text-center transition-all duration-300 ${variantStyles[variant]} ${className}`}
    >
      {/* Small subtle label indicating reserved ad space */}
      {label && (
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-6 bg-[#D8D4CA]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8A857A]">
            {label}
          </span>
          <span className="h-[1px] w-6 bg-[#D8D4CA]" />
        </div>
      )}

      {/* Google AdSense Unit Container */}
      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8305972358699914"
        data-ad-slot={slot || '1234567890'}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />

      {/* Backup preview space indicator for development / pending AdSense approval */}
      {showPlaceholder && (
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#FAF9F5] via-[#F3F1EB] to-[#E8F2ED]/40 p-4 border border-dashed border-[#206E55]/20">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#206E55]">
            <svg
              className="w-4 h-4 opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>Reserved Ad Space</span>
          </div>
          <p className="mt-1 text-[11px] text-[#5A554A]/80">
            AdSense client: ca-pub-8305972358699914
          </p>
        </div>
      )}
    </div>
  );
};

export default AdSpace;
