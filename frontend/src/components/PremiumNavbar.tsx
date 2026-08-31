import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, MessageCircle, Sparkles, User, Home, 
  BookOpen, Cpu, Layers, Info, HelpCircle, Mail, ChevronRight, Stethoscope 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BrandLogo from './BrandLogo';
import AuthModal from './AuthModal';

// Core Primary Links displayed in Desktop Header
const desktopNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Find Doctors', href: '/find-dermatologist' },
  { name: 'AI Research', href: '/research' },
  { name: 'Analysis', href: '/analysis' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
];

// Mobile Drawer Links with Icons
const mobileNavItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Find Doctors', href: '/find-dermatologist', icon: Stethoscope },
  { name: 'Blog & Articles', href: '/blog', icon: BookOpen },
  { name: 'AI Research', href: '/research', icon: Cpu },
  { name: 'Platform Features', href: '/features', icon: Layers },
  { name: 'AI Analyzer', href: '/analysis', icon: Sparkles },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'FAQ', href: '/faq', icon: HelpCircle },
  { name: 'Contact Support', href: '/contact', icon: Mail },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
      ? 'bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-lg'
      : 'bg-black/35 backdrop-blur-md border-b border-white/10'
    : isScrolled
      ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E5E2DA] shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
      : 'bg-[#FAF9F5] border-b border-[#E5E2DA]';

  const linkBase = isHome
    ? 'text-white/80 hover:text-white'
    : 'text-[#4A453A] hover:text-[#206E55]';
  const linkActive = isHome ? 'text-white font-bold' : 'text-[#206E55] font-extrabold';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 ${navBg}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" aria-label="Medicus Labs home" className="flex items-center gap-2 shrink-0">
            {isHome
              ? <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">Medicus Labs</span>
              : <BrandLogo tone="dark" />
            }
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm lg:text-base font-semibold">
            {desktopNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`whitespace-nowrap transition-colors duration-200 ${
                  location.pathname === item.href ? linkActive : linkBase
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA & Auth */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-1.5 text-sm font-semibold transition ${isHome ? 'text-white/80 hover:text-white' : 'text-[#5A554A] hover:text-[#206E55]'}`}
                >
                  <User size={16} />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition whitespace-nowrap ${isHome ? 'border-white/20 bg-white/10 text-white hover:bg-white/20' : 'border-[#D1CDC2] bg-white text-[#5A554A] hover:border-[#206E55] hover:text-[#206E55]'}`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className={`text-sm font-semibold transition whitespace-nowrap ${isHome ? 'text-white/80 hover:text-white' : 'text-[#5A554A] hover:text-[#206E55]'}`}
              >
                Sign In
              </button>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {isHome ? (
                <Link
                  to="/analysis"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm backdrop-blur-sm shadow-md transition-all whitespace-nowrap"
                >
                  <MessageCircle size={15} />
                  Talk to Medicus
                </Link>
              ) : (
                <Link
                  to="/analysis"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-sm transition-colors whitespace-nowrap"
                >
                  <Sparkles size={14} />
                  Start Analysis
                  <ArrowRight size={15} />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden active:scale-95 shadow-sm ${
              isHome 
                ? 'border-white/30 bg-white/15 text-white hover:bg-white/25 backdrop-blur-md' 
                : 'border-[#D5D2C8] bg-white text-[#141515] hover:bg-[#F3F1EB]'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile App Navigation Drawer */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dark Backdrop overlay */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
              onClick={() => setIsOpen(false)} 
            />

            {/* Sliding Drawer Body */}
            <motion.div
              className={`relative z-50 flex flex-col h-full w-full max-w-md ml-auto overflow-y-auto px-6 pb-10 pt-24 shadow-2xl ${
                isHome ? 'bg-[#121413] text-white' : 'bg-[#FAF9F5] text-[#141515]'
              }`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div className="flex flex-col gap-1 divide-y divide-[#E5E2DA]/30">
                {mobileNavItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div 
                      key={item.name} 
                      initial={{ x: 20, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      transition={{ delay: 0.03 * i }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between py-4 px-2 rounded-xl text-base font-bold transition ${
                          isActive
                            ? isHome
                              ? 'bg-white/10 text-white pl-4'
                              : 'bg-[#E8F2ED] text-[#206E55] pl-4'
                            : isHome
                              ? 'text-white/80 hover:text-white hover:bg-white/5'
                              : 'text-[#35332E] hover:text-[#206E55] hover:bg-[#F3F1EB]'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <Icon size={18} className={isActive ? (isHome ? 'text-white' : 'text-[#206E55]') : 'text-[#8A857A]'} />
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-[#A39E93]" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Auth & CTA Buttons */}
              <div className="mt-8 pt-6 border-t border-[#E5E2DA]/40 flex flex-col gap-3.5">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm transition ${
                        isHome ? 'bg-white/10 border border-white/20 text-white' : 'bg-white border border-[#D5D2C8] text-[#141515] shadow-sm'
                      }`}
                    >
                      <User size={17} /> User Profile
                    </Link>
                    <button 
                      type="button" 
                      onClick={() => { setIsOpen(false); logout(); }} 
                      className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full border font-bold text-sm transition ${
                        isHome ? 'border-white/20 bg-white/10 text-white' : 'border-[#D1CDC2] bg-[#F3F1EB] text-[#5A554A]'
                      }`}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => { setIsOpen(false); setShowAuthModal(true); }} 
                    className={`flex items-center justify-center w-full py-3.5 rounded-full font-bold text-sm transition ${
                      isHome ? 'bg-white/15 border border-white/20 text-white' : 'bg-white border border-[#D5D2C8] text-[#141515] shadow-sm'
                    }`}
                  >
                    Sign In to Account
                  </button>
                )}
                <Link 
                  to="/analysis" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-base shadow-md transition"
                >
                  <Sparkles size={18} />
                  Start AI Skin Analysis
                  <ArrowRight size={18} />
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
