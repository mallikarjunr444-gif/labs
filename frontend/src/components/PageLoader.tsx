import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF9F5]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring - brand forest green */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#E5E2DA] border-t-[#206E55] shadow-[0_0_15px_rgba(32,110,85,0.1)]"></div>
        {/* Inner pulsing logo indicator */}
        <div className="absolute h-8 w-8 animate-pulse rounded-full bg-[#206E55]/10 blur-sm"></div>
      </div>
      <p className="mt-4 text-sm font-bold tracking-widest text-[#206E55] uppercase animate-pulse">
        Medicus Labs
      </p>
    </div>
  );
};

export default PageLoader;
