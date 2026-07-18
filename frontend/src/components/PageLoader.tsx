import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-800 border-t-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"></div>
        {/* Inner pulsing logo indicator */}
        <div className="absolute h-8 w-8 animate-pulse rounded-full bg-cyan-500/25 blur-sm"></div>
      </div>
      <p className="mt-4 text-sm font-semibold tracking-widest text-cyan-400 uppercase animate-pulse">
        Medicus Labs
      </p>
    </div>
  );
};

export default PageLoader;
