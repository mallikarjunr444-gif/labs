import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Lock } from 'lucide-react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed before completing. Please try again.');
      } else {
        setError(err.message || 'Failed to sign in with Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-[#E5E2DA] relative overflow-hidden text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Ambient Top Glow */}
        <div className="w-32 h-32 bg-[#E8F2ED] rounded-full blur-2xl absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header Icon & Title */}
        <div className="relative z-10 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] flex items-center justify-center mx-auto shadow-sm">
            <Sparkles size={26} />
          </div>

          <h2 className="text-2xl font-extrabold text-[#141515] font-display">
            Welcome to Medicus Labs™
          </h2>

          <p className="text-xs sm:text-sm text-[#5A554A] font-semibold leading-relaxed">
            Sign in securely using your Google account to access clinical skin analysis tools and verified reports.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Primary Action Button - Continue with Google */}
        <div className="mt-8 space-y-4 relative z-10">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#206E55] hover:bg-slate-50/80 text-slate-800 font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-[#206E55]/30 border-t-[#206E55] animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 488 512">
                <path fill="#4285F4" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126.9 26.8 170.2 68.8l-79.3 79.3c-33.4-31.8-78.7-51.7-129.9-51.7-97.2 0-176.4 79.2-176.4 176.4s79.2 176.4 176.4 176.4c70.8 0 131.3-41.5 158.2-101.9H248V261.8h239.2c.8 8.6 1.8 17.2 1.8 26z" />
              </svg>
            )}
            <span className="font-extrabold">
              {loading ? 'Connecting Google...' : 'Continue with Google'}
            </span>
          </button>
        </div>

        {/* Security Badge & Terms */}
        <div className="mt-8 pt-5 border-t border-[#E5E2DA] space-y-2 text-[11px] text-[#5A554A] font-semibold">
          <p className="flex items-center justify-center gap-1.5 text-[#206E55] font-extrabold">
            <Lock size={12} />
            Secure Authentication via Google OAuth 2.0
          </p>
          <p className="text-slate-400">
            By continuing, you agree to Medicus Labs’{' '}
            <a href="/terms" className="text-[#206E55] underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-[#206E55] underline">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
