import React from 'react';

type BrandLogoProps = {
  tone?: 'dark' | 'light';
  className?: string;
};

const BrandLogo: React.FC<BrandLogoProps> = ({ tone = 'dark', className = '' }) => {
  return (
    <span className={`inline-flex min-w-0 items-center gap-3 ${className}`}>
      <img
        src="/media/medicus-labs-logo.png"
        alt="Medicus Labs"
        width="220"
        height="36"
        className={`h-7 w-auto max-w-[150px] object-contain min-[380px]:max-w-[170px] sm:h-8 sm:max-w-[200px] lg:h-9 lg:max-w-[220px] ${
          tone === 'light' ? 'brightness-0 invert' : ''
        }`}
      />
    </span>
  );
};

export default BrandLogo;
