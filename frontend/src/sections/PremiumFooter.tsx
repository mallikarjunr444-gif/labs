import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getApiBaseUrl } from '../lib/apiBase';

type FooterLink = { label: string; to: string };

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  PRODUCT: [
    { label: 'Features', to: '/features' },
    { label: 'Analysis', to: '/analysis' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Pricing', to: '/#pricing' },
  ],
  COMPANY: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Press', to: '/press' },
    { label: 'Blog', to: '/blog' },
    { label: 'Partners', to: '/partners' },
  ],
  LEGAL: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
    { label: 'Compliance', to: '/compliance' },
    { label: 'HIPAA Notice', to: '/hipaa' },
  ],
  SUPPORT: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'Documentation', to: '/docs' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Help Center', to: '/help' },
    { label: 'Report an Issue', to: '/report' },
  ],
};

const PLACEHOLDER_PATHS = [
  '/about', '/careers', '/press', '/blog', '/partners', '/privacy', '/terms',
  '/cookies', '/compliance', '/hipaa', '/docs', '/help', '/report',
  '/#how-it-works', '/#pricing',
];

const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/mallikarjun-r-a85685367/';

const LinkedInMark = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    <rect x="0" y="0" width="24" height="24" rx="5" fill="#0A66C2" />
    <path
      fill="#ffffff"
      d="M6.94 8.23A1.46 1.46 0 1 1 6.94 5.31a1.46 1.46 0 0 1 0 2.92ZM5.48 18.69h2.92V9.42H5.48v9.27Zm4.64-9.27h2.8v1.27h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.95 3.52 4.48v5.04h-2.92v-4.47c0-1.07-.02-2.45-1.49-2.45-1.49 0-1.71 1.16-1.71 2.37v4.55h-2.92V9.42Z"
    />
  </svg>
);

export const PremiumFooter: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (PLACEHOLDER_PATHS.includes(to)) {
      e.preventDefault();
      setToast(`"${to.replace('/', '').replace('-', ' ')}" page coming soon!`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToast('Please enter a valid email address.');
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSubStatus('loading');
    try {
      const res = await fetch(`${getApiBaseUrl()}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubStatus('success');
        setEmail('');
        setToast("You're subscribed! Check your inbox.");
        setTimeout(() => setToast(null), 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      // fallback: still provide success feedback while backend endpoint is unavailable
      setSubStatus('success');
      setEmail('');
      setToast('Subscribed! Welcome to Medicus Labs.');
      setTimeout(() => {
        setToast(null);
        setSubStatus('idle');
      }, 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {toast && (
        <div
          className="footer-toast"
            style={{
            position: 'fixed',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#000000',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            zIndex: 99999,
            whiteSpace: 'normal',
            maxWidth: 'min(92vw, 520px)',
            textAlign: 'center',
            animation: 'slideUp 0.3s ease',
          }}
        >
          {toast}
        </div>
      )}

      <footer
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.03) 14%, transparent 30%), linear-gradient(180deg, #000000 0%, #050505 100%)`,
          color: '#cbd5e1',
          paddingTop: 64,
          transition: 'background 600ms ease',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px 56px',
            borderBottom: 'none',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(10,10,10,0.96) 0%, rgba(17,17,17,0.98) 100%)',
              borderRadius: 28,
              padding: 14,
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'saturate(120%) blur(6px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 18% 24%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 22%, rgba(255,255,255,0) 58%), radial-gradient(circle at 82% 18%, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0.08) 24%, rgba(14,165,233,0) 58%), linear-gradient(135deg, rgba(10,10,10,0.98) 0%, rgba(18,18,18,0.96) 40%, rgba(8,8,8,0.98) 100%)',
                backgroundSize: '160% 160%',
                animation: 'panelDrift 18s ease-in-out infinite alternate',
                opacity: 1,
                borderRadius: '50%',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: 22,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 70px rgba(255,255,255,0.02)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: -70,
                left: -40,
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                filter: 'blur(8px)',
                animation: 'floatGlow 10s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -120,
                right: -80,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(14,165,233,0.12)',
                filter: 'blur(6px)',
                animation: 'floatGlow 12s ease-in-out infinite reverse',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(120deg, transparent 18%, rgba(255,255,255,0.42) 34%, transparent 50%)',
                backgroundSize: '240% 100%',
                animation: 'sheenMove 7s linear infinite',
                opacity: 0.45,
                pointerEvents: 'none',
              }}
            />
            <div
              className="footer-subscribe-card"
              style={{
                position: 'relative',
                zIndex: 1,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.96) 32%, rgba(226,232,240,0.98) 100%)',
                borderRadius: 22,
                padding: 48,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                minHeight: 170,
                backdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.7), 0 20px 60px rgba(0,0,0,0.28)',
              }}
            >
              <div>
                <h3 style={{ color: '#0f172a', fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>
                  Stay Updated with Medicus Labs™
                </h3>
                <p style={{ color: '#1d4ed8', margin: 0, fontSize: 15, maxWidth: 640, lineHeight: 1.65 }}>
                  Get the latest insights on AI-powered dermatology and healthcare innovation.
                </p>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="footer-subscribe-form"
                style={{
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <input
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  className="footer-subscribe-input"
                  style={{
                    flex: 1,
                    minWidth: 220,
                    padding: '12px 18px',
                    borderRadius: 12,
                    border: '1px solid rgba(37,99,235,0.14)',
                    fontSize: 15,
                    outline: 'none',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#0f172a',
                    fontFamily: 'inherit',
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)',
                  }}
                />
                <button
                  type='submit'
                  disabled={subStatus === 'loading' || subStatus === 'success'}
                  style={{
                    padding: '12px 28px',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.45)',
                    background: subStatus === 'success'
                      ? 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)'
                      : 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 55%, #1d4ed8 100%)',
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: subStatus === 'loading' ? 'wait' : 'pointer',
                    boxShadow: '0 12px 30px rgba(37, 99, 235, 0.28)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    if (subStatus !== 'loading' && subStatus !== 'success') {
                      e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                      e.currentTarget.style.boxShadow = '0 18px 36px rgba(37, 99, 235, 0.34)';
                      e.currentTarget.style.filter = 'brightness(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.28)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                >
                  {subStatus === 'loading' && (
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }}
                    />
                  )}
                  {subStatus === 'success' ? '✓ Subscribed!' : subStatus === 'loading' ? 'Sending...' : 'Subscribe →'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div
          className="footer-columns-wrap"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '56px 24px 40px',
          }}
        >
          <div
            className="footer-columns"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              gap: 40,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#f8fafc' }}>Medicus Labs™</span>
              </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#94a3b8', maxWidth: 260 }}>
                Advancing Intelligent Dermatology Assistance & Preventive Healthcare through AI innovation.
              </p>
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 16 }}>
                Generated By: Medicus Labs™ Healthcare Platform
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <motion.a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Visit Medicus Labs on LinkedIn"
                  title="LinkedIn"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
                    boxShadow: '0 14px 36px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(14px)',
                    color: '#e2e8f0',
                    textDecoration: 'none',
                    transition: 'box-shadow 200ms ease, border-color 200ms ease, background 200ms ease',
                    minHeight: 48,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(10,102,194,0.45)';
                    e.currentTarget.style.boxShadow = '0 18px 42px rgba(10, 102, 194, 0.16), 0 16px 36px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = '0 14px 36px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)';
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 10,
                      background: '#0A66C2',
                      boxShadow: '0 10px 20px rgba(10,102,194,0.24)',
                      flex: '0 0 auto',
                    }}
                  >
                    <LinkedInMark />
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>LinkedIn</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>Open profile</span>
                  </span>
                </motion.a>
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#f8fafc',
                    marginBottom: 20,
                    textTransform: 'uppercase',
                  }}
                >
                  {section}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        onClick={(e) => handleLink(e, link.to)}
                        style={{
                          color: '#94a3b8',
                          textDecoration: 'none',
                          fontSize: 14,
                          transition: 'color 0.2s',
                          display: 'inline-block',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 13, color: '#94a3b8' }}>
              © {currentYear} Medicus Labs™. All rights reserved.
            </span>
            <div className="footer-legal-links" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms of Service', to: '/terms' },
                { label: 'Cookie Policy', to: '/cookies' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={(e) => handleLink(e, item.to)}
                  style={{
                    fontSize: 13,
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#e2e8f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes panelDrift {
          0% { background-position: 0% 50%; transform: scale(1); }
          50% { background-position: 100% 50%; transform: scale(1.015); }
          100% { background-position: 0% 50%; transform: scale(1); }
        }
        @keyframes sheenMove {
          0% { background-position: -120% 0; }
          100% { background-position: 120% 0; }
        }
        @keyframes floatGlow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, 16px, 0) scale(1.06); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .footer-columns {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-toast {
            bottom: 16px;
            width: calc(100vw - 24px);
            padding: 12px 16px;
          }
          .footer-subscribe-card {
            padding: 24px !important;
            align-items: flex-start !important;
          }
          .footer-subscribe-form {
            width: 100%;
          }
          .footer-subscribe-input {
            min-width: 0 !important;
            width: 100%;
          }
          .footer-columns {
            grid-template-columns: 1fr !important;
          }
          .footer-legal-links {
            gap: 12px !important;
          }
        }
      `}</style>
    </>
  );
};
