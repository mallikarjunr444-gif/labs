import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const navItems = [
  { name: 'Analysis', href: '/analysis' },
  { name: 'Find Doctors', href: '/find-dermatologist' },
  { name: 'Blog', href: '/blog' },
  { name: 'AI Research', href: '/research' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
];

const menuItems = [
  { name: 'Home', href: '/' },
  ...navItems,
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
  { name: 'Sitemap', href: '/sitemap' },
];

/** One slim, frosted bar on every page: wordmark left, links centred, one action right. */
const PremiumNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const focus = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0071e3]/30';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-12 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" aria-label="Medicus Labs home" className={`shrink-0 rounded ${focus}`}>
            <span className="block text-[19px] font-semibold leading-none tracking-[-0.04em] text-[#1d1d1f]">Medicus Labs</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${focus} ${
                  pathname === item.href ? 'font-semibold text-[#1d1d1f]' : 'text-[#1d1d1f]/70 hover:text-[#1d1d1f]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="hidden items-center gap-1 lg:flex">
                <Link to="/profile" className={`rounded-full px-3 py-1.5 text-[13px] text-[#1d1d1f]/70 hover:text-[#1d1d1f] ${focus}`}>Profile</Link>
                <button type="button" onClick={logout} className={`rounded-full px-3 py-1.5 text-[13px] text-[#1d1d1f]/70 hover:text-[#1d1d1f] ${focus}`}>Sign out</button>
              </div>
            ) : (
              <button type="button" onClick={() => setShowAuth(true)} className={`hidden rounded-full px-3 py-1.5 text-[13px] text-[#1d1d1f]/70 hover:text-[#1d1d1f] lg:block ${focus}`}>
                Sign in
              </button>
            )}
            <Link to="/analysis" className={`inline-flex h-8 items-center rounded-full bg-[#0071e3] px-4 text-[13px] text-white transition-colors hover:bg-[#0077ed] ${focus}`}>
              Start free scan
            </Link>
            <button
              type="button"
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[#1d1d1f] hover:bg-black/5 lg:hidden ${focus}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="site-menu" className="fixed inset-x-0 bottom-0 top-12 z-40 overflow-y-auto bg-white/95 px-6 pb-10 pt-4 backdrop-blur-xl lg:hidden">
          <ul>
            {menuItems.map((item) => (
              <li key={item.href} className="border-b border-[#d2d2d7]/70">
                <Link
                  to={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`flex min-h-[56px] items-center justify-between text-[24px] font-semibold tracking-[-0.02em] ${pathname === item.href ? 'text-[#0071e3]' : 'text-[#1d1d1f]'}`}
                >
                  {item.name}
                  <ChevronRight size={20} className="text-[#86868b]" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex h-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[17px] text-[#1d1d1f]">Profile</Link>
                <button type="button" onClick={() => { setOpen(false); logout(); }} className="flex h-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[17px] text-[#1d1d1f]">Sign out</button>
              </>
            ) : (
              <button type="button" onClick={() => { setOpen(false); setShowAuth(true); }} className="flex h-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[17px] text-[#1d1d1f]">Sign in</button>
            )}
            <Link to="/analysis" className="flex h-12 items-center justify-center rounded-full bg-[#0071e3] text-[17px] text-white">Start free scan</Link>
          </div>
        </div>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default PremiumNavbar;
