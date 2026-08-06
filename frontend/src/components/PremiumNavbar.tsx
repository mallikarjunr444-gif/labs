import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, MessageCircle, Sparkles, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BrandLogo from './BrandLogo';
import AuthModal from './AuthModal';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Condition Hub', href: '/condition-library' },
  { name: 'AI Research', href: '/research' },
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Analysis', href: '/analysis' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const PremiumNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === '/';

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

  // Glass style on home, light style everywhere else
  const navBg = isHome
    ? isScrolled
      ? 'bg-black/55 backdrop-blur-xl border-b border-white/10 shadow-lg'
      : 'bg-black/25 backdrop-blur-md border-b border-white/10'
    : isScrolled
      ? 'bg-[#FAF9F5] border-b border-[#E5E2DA]/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
      : 'bg-[#FAF9F5] border-b border-[#E5E2DA]/80';

  const logoTone = isHome ? 'light' : 'dark';
  const linkBase = isHome
    ? 'text-white/75 hover:text-white'
    : 'text-[#5A554A] hover:text-[#206E55]';
  const linkActive = isHome ? 'text-white' : 'text-[#206E55]';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3.5 ${navBg}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">

          {/* Logo */}
          <Link to="/" aria-label="Medicus Labs home" className="flex items-center gap-2 shrink-0">
            {isHome
              ? <span className="text-xl font-extrabold tracking-tight text-white drop-shadow-sm">Medicus Labs</span>
              : <BrandLogo tone="dark" />
            }
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-7 text-sm font-semibold">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-200 ${
                    location.pathname === item.href ? linkActive : linkBase
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA & Auth */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-1.5 text-sm font-semibold transition ${isHome ? 'text-white/70 hover:text-white' : 'text-[#5A554A] hover:text-[#206E55]'}`}
                >
                  <User size={15} />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${isHome ? 'border-white/20 bg-white/10 text-white hover:bg-white/20' : 'border-[#D1CDC2] bg-white text-[#5A554A] hover:border-[#206E55] hover:text-[#206E55]'}`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className={`text-sm font-semibold transition ${isHome ? 'text-white/70 hover:text-white' : 'text-[#5A554A] hover:text-[#206E55]'}`}
              >
                Sign In
              </button>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {isHome ? (
                <Link
                  to="/analysis"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm backdrop-blur-sm shadow-lg transition-all"
                >
                  <MessageCircle size={14} />
                  Talk to Medicus
                </Link>
              ) : (
                <Link
                  to="/analysis"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-sm transition-colors"
                >
                  <Sparkles size={13} />
                  Start Analysis
                  <ArrowRight size={14} />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden active:scale-95 ${isHome ? 'border-white/20 bg-white/10 text-white hover:bg-white/20' : 'border-[#E5E2DA] bg-[#FAF9F5] text-[#141515] hover:bg-[#F3F1EB]'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
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
            <div className={`absolute inset-0 backdrop-blur-xl ${isHome ? 'bg-black/80' : 'bg-[#FAF9F5]/98'}`} />
            <motion.div
              className="relative flex min-h-screen flex-col gap-1 px-5 pb-8 pt-24 sm:px-8 sm:pt-28"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.08 }}
            >
              {navItems.map((item, i) => (
                <motion.div key={item.name} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    to={item.href}
                    className={`block border-b py-3.5 text-lg font-bold transition sm:py-4 ${isHome ? 'border-white/10 text-white/90 hover:text-white' : 'border-[#E5E2DA]/60 text-[#141515] hover:text-[#206E55]'}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-base ${isHome ? 'bg-white/10 border border-white/20 text-white' : 'bg-[#F3F1EB] text-[#141515]'}`}>
                      <User size={16} /> Profile
                    </Link>
                    <button type="button" onClick={logout} className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full border font-bold text-base ${isHome ? 'border-white/20 bg-white/10 text-white' : 'border-[#D1CDC2] bg-white text-[#5A554A]'}`}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setIsOpen(false); setShowAuthModal(true); }} className={`flex items-center justify-center w-full py-3.5 rounded-full font-bold text-base ${isHome ? 'bg-white/10 border border-white/20 text-white' : 'bg-[#F3F1EB] text-[#141515]'}`}>
                    Sign In
                  </button>
                )}
                <Link to="/analysis" className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#206E55] text-white font-bold text-base shadow-sm">
                  <Sparkles size={16} />
                  Start Analysis
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default PremiumNavbar;
