import React from 'react';

/**
 * AdSpace Component — Medicus Labs
 * Clean placeholder component maintaining full TypeScript interface compatibility
 * across all existing blog pages and views.
 * Adsterra third-party ad networks have been completely disabled in favor of Google AdSense.
 */

export interface AdSpaceProps {
  /**
   * Which banner size variant to render
   */
  variant?: 'leaderboard' | 'mobile' | 'rectangle' | 'banner' | 'halfpage' | 'skyscraper' | 'native';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = () => null;

export const SponsoredLinks: React.FC<{ className?: string }> = () => null;

export default AdSpace;
