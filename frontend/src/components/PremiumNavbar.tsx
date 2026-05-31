import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Analysis', href: '/analysis' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const PremiumNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center" style={{ transformStyle: 'preserve-3d' }}>
          {/* Brand text (matches Home header) */}
          <Link to="/" className={`text-2xl font-semibold tracking-tight relative z-10 ${isHeroPage ? 'text-white/95' : 'text-slate-900'}`}>
            Medicus Labs
          </Link>

          {/* Desktop Menu (glass style) */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-8 text-sm md:flex">
              {navItems.map((item) => (
                <Link key={item.name} to={item.href} className={`hover:opacity-90 ${isHeroPage ? 'text-white/85 hover:text-white' : 'text-slate-700 hover:text-slate-900'} transition-transform hover:-translate-y-0.5` }>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && (
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-900 transition"
              >
                Sign Out
              </button>
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
          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="lg:hidden relative z-10 mr-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition"
            >
              Sign Out
            </button>
          )}
          <button
            className="lg:hidden relative z-10 w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-text-primary hover:bg-gray-200 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-white/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative pt-28 px-8 flex flex-col gap-1"
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
                    className="block py-4 text-2xl font-semibold text-text-primary hover:text-accent-blue transition border-b border-gray-200"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
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
              {isAuthenticated && (
                <motion.div
                  className="pt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <button
                    type="button"
                    onClick={logout}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-lg border border-gray-200 bg-white text-text-primary font-bold text-lg"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PremiumNavbar;
