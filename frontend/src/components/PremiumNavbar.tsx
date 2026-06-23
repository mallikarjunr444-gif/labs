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
  const heroPaths = ['/'];
  const isHeroPage = heroPaths.includes(location.pathname);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'} ${isHeroPage ? 'bg-white/6 backdrop-blur-2xl text-white liquid-panel' : 'bg-white shadow-glow-md text-slate-900 border-b'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6" style={{ transformStyle: 'preserve-3d' }}>
          <Link to="/" className="relative z-10 inline-flex items-center" aria-label="Medicus Labs home">
            <BrandLogo tone={isHeroPage ? 'light' : 'dark'} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-8 text-sm md:flex">
              {navItems.map((item) => (
                <Link key={item.name} to={item.href} className={`hover:opacity-90 ${isHeroPage ? 'text-white/85 hover:text-white' : 'text-slate-700 hover:text-slate-900'} transition-transform hover:-translate-y-0.5` }>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA & Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition">
                  <User size={16} />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setShowAuthModal(true)} className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition">Login</button>
                <button onClick={() => setShowAuthModal(true)} className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition">Sign Up</button>
              </>
            )}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/analysis"
                className="relative group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-cyan-glow" />
                <span className="absolute inset-0 bg-gradient-to-r from-accent-blue/90 to-cyan-glow/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white font-bold flex items-center gap-2">
                  <Sparkles size={14} />
                  Start Analysis
                  <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={15} />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-text-primary transition hover:bg-gray-200 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
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
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
            <motion.div
              className="relative flex min-h-screen flex-col gap-1 px-5 pb-8 pt-24 sm:px-8 sm:pt-28"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={item.href}
                    className="block border-b border-gray-200 py-3.5 text-xl font-semibold text-text-primary transition hover:text-accent-blue sm:py-4 sm:text-2xl"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-slate-100 text-text-primary font-bold text-lg mb-4">
                      <User size={18} />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-lg border border-gray-200 bg-white text-text-primary font-bold text-lg"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => {setIsOpen(false); setShowAuthModal(true);}} className="flex items-center justify-center w-full py-4 rounded-lg bg-slate-100 text-text-primary font-bold text-lg mb-4">Login</button>
                    <button onClick={() => {setIsOpen(false); setShowAuthModal(true);}} className="flex items-center justify-center w-full py-4 rounded-lg bg-indigo-600 text-white font-bold text-lg">Sign Up</button>
                  </>
                )}
              </div>
              <motion.div
                className="pt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/analysis"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-gradient-to-r from-accent-blue to-cyan-glow text-white font-bold text-lg shadow-glow-md"
                >
                  <Sparkles size={18} />
                  Start Analysis
                  <ArrowRight size={18} />
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
