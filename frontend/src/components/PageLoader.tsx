import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fbfbfd]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring - brand forest green */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#d2d2d7] border-t-[#0071e3] shadow-[0_0_15px_rgba(0,113,227,0.1)]"></div>
        {/* Inner pulsing logo indicator */}
        <div className="absolute h-8 w-8 animate-pulse rounded-full bg-[#0071e3]/10 blur-sm"></div>
      </div>
      <p className="mt-4 text-sm font-bold tracking-widest text-[#0071e3] uppercase animate-pulse">
        Medicus Labs
      </p>
    </div>
  );
};

export default PageLoader;
