import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BrandLogo from './BrandLogo';
import AuthModal from './AuthModal';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Analysis', href: '/analysis' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const PremiumNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl' 
            : 'py-4.5 bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-lg'
        } rounded-full`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between gap-3 px-6 sm:px-8">
          <Link to="/" className="inline-flex items-center" aria-label="Medicus Labs home">
            <BrandLogo tone="light" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-7 text-sm font-semibold">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-sky-400'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA & Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition">
                  <User size={15} />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10 hover:border-white/30 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="text-sm font-semibold text-white/80 hover:text-white transition"
                >
                  Login / Sign Up
                </button>
              </>
            )}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/analysis"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] text-slate-900 font-bold text-sm transition-all duration-300"
              >
                <Sparkles size={13} />
                Start Analysis
                <ArrowRight size={14} className="ml-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10 lg:hidden active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xl" />
            <motion.div
              className="relative flex min-h-screen flex-col gap-1 px-6 pb-8 pt-28 sm:px-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.08 }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    to={item.href}
                    className="block border-b border-white/10 py-3.5 text-lg font-bold text-white/90 transition hover:text-sky-400 sm:py-4"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-base mb-4">
                      <User size={16} />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-white/10 bg-slate-900 text-white font-bold text-base"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => {setIsOpen(false); setShowAuthModal(true);}} className="flex items-center justify-center w-full py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-base mb-4">Login / Sign Up</button>
                  </>
                )}
              </div>
              <motion.div
                className="pt-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/analysis"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-900 font-bold text-base shadow-lg shadow-sky-500/10"
                >
                  <Sparkles size={16} />
                  Start Analysis
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default PremiumNavbar;
