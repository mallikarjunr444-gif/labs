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
  /** Optional label, e.g. "ADVERTISEMENT" */
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

/**
 * AdSpace Component
 * Clean, policy-compliant AdSense container for Medicus Labs.
 * Publisher Client ID: ca-pub-8305972358699914
 */
export const AdSpace: React.FC<AdSpaceProps> = ({
  slot,
  format = 'auto',
  fullWidthResponsive = true,
  variant = 'banner',
  className = '',
  label = 'ADVERTISEMENT',
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense push notice:', err);
    }
  }, []);

  const variantStyles = {
    banner: 'w-full min-h-[90px] sm:min-h-[120px] max-w-7xl mx-auto my-6',
    'in-feed': 'w-full min-h-[120px] sm:min-h-[160px] my-8',
    rectangle: 'w-full max-w-[336px] min-h-[280px] mx-auto my-6',
    sidebar: 'w-full max-w-[300px] min-h-[600px] my-6',
    inline: 'w-full min-h-[90px] my-4',
  };

  return (
    <div
      ref={adRef}
      aria-label="Advertisement space"
      className={`overflow-hidden text-center my-4 ${className}`}
    >
      {/* Google AdSense Unit Container - Expands dynamically only when ads are served */}
      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8305972358699914"
        {...(slot ? { 'data-ad-slot': slot } : {})}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSpace;
