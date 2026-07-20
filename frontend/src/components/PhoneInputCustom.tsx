import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';
import { motion } from 'framer-motion';

const COUNTRIES = [
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
  { code: 'BR', dial: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NG', dial: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'KE', dial: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: 'PK', dial: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'BD', dial: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'LK', dial: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: 'NP', dial: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: 'MY', dial: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'ID', dial: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'TH', dial: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: 'PH', dial: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: 'KR', dial: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: 'IT', dial: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: 'MX', dial: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: 'AR', dial: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'SA', dial: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'TR', dial: '+90', flag: '🇹🇷', name: 'Turkey' },
];

type Country = (typeof COUNTRIES)[number];

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  required?: boolean;
}

export default function PhoneInputCustom({ value = '', onChange, required }: Props) {
  const [selected, setSelected] = useState<Country>(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<'down' | 'up'>('down');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // try to initialize from provided E.164 value
    try {
      if (value && value.startsWith('+')) {
        const p = parsePhoneNumberFromString(value);
        if (p) {
          const cc = p.country || p.countryCallingCode;
          const match = COUNTRIES.find((c) => c.code === (p.country || '').toUpperCase());
          if (match) setSelected(match);
          setNumber(p.nationalNumber || p.nationalNumber || '');
          return;
        }
      }
    } catch (err) {
      // ignore
    }
    // fallback to navigator locale
    try {
      const lang = navigator.language || (navigator as any).userLanguage || 'en-IN';
      const parts = lang.split('-');
      const cc = parts.length > 1 ? parts[1].toUpperCase() : parts[0].toUpperCase();
      const match = COUNTRIES.find((c) => c.code === cc);
      if (match) setSelected(match);
    } catch (err) {
      setSelected(COUNTRIES[0]);
    }
  }, []);

  useEffect(() => {
    // notify parent with E.164 if valid, otherwise send raw dial+number
    try {
      const combined = `${selected.dial}${number}`;
      const parsed = parsePhoneNumberFromString(number || combined, selected.code as CountryCode);
      if (parsed && parsed.isValid()) {
        onChange?.(parsed.number || combined);
        setError(null);
      } else {
        onChange?.(combined);
      }
    } catch (err) {
      onChange?.(`${selected.dial}${number}`);
    }
  }, [selected, number]);

  const calculatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const dropdownHeight = 400; // Approximate max height
    
    // If not enough space below, open upward
    if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
      setPosition('up');
    } else {
      setPosition('down');
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(target) &&
        !target.closest('.phone-dropdown-portal')
      ) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleResize = () => calculatePosition();
    const handleScroll = () => {
      // Close dropdown on scroll for better UX
      setOpen(false);
      setSearch('');
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open, calculatePosition]);

  const filtered = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  );

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          border: '1.5px solid #e2e8f0',
          borderRadius: 10,
          background: '#fff',
          overflow: 'visible',
        }}
        className="phone-input-wrapper"
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            calculatePosition();
            setOpen((s) => !s);
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '12px 10px 12px 14px',
            background: 'transparent',
            border: 'none',
            borderRight: '1.5px solid #e2e8f0',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 600,
            color: '#1e293b',
            minWidth: 76,
          }}
        >
          <span style={{ fontSize: 20 }}>{selected.flag}</span>
          <span style={{ fontSize: 13, color: '#475569' }}>{selected.dial}</span>
          <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 2 }}>
            ▼
          </span>
        </button>

        <input
          type="tel"
          required={required}
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/[^0-9\s\-]/g, ''))}
          placeholder="Enter mobile number"
          aria-label="Mobile number"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '12px 14px',
            fontSize: 15,
            color: '#0f172a',
          }}
        />
      </div>

      {open && createPortal(
        <motion.div
          className="phone-dropdown-portal"
          initial={{ opacity: 0, scale: 0.95, y: position === 'down' ? -10 : 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: position === 'down' ? -10 : 10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: buttonRef.current 
              ? Math.max(8, Math.min(buttonRef.current.getBoundingClientRect().left, window.innerWidth - Math.min(320, window.innerWidth - 32) - 8))
              : 8,
            [position === 'down' ? 'top' : 'bottom']: position === 'down' 
              ? (buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 6 : 0)
              : (buttonRef.current ? window.innerHeight - buttonRef.current.getBoundingClientRect().top + 6 : 0),
            zIndex: 99999,
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: 12,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            width: 'min(320px, calc(100vw - 32px))',
            maxHeight: 'min(420px, calc(100vh - 120px))',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
          role="listbox"
        >
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
            <input
              ref={searchInputRef}
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              aria-label="Search countries"
              style={{
                width: '100%',
                border: '1.5px solid #e2e8f0',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 13,
                outline: 'none',
                background: '#f8fafc',
                color: '#1e293b',
              }}
            />
          </div>

          <div 
            style={{ 
              overflowY: 'auto', 
              flex: 1,
              overscrollBehavior: 'contain'
            }}
          >
            {filtered.map((c) => (
              <div
                key={`${c.code}-${c.dial}`}
                onClick={() => {
                  setSelected(c);
                  setOpen(false);
                  setSearch('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(c);
                    setOpen(false);
                    setSearch('');
                  }
                }}
                role="option"
                aria-selected={selected.code === c.code}
                tabIndex={0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  background: selected.code === c.code ? '#f0f9ff' : 'transparent',
                  borderBottom: '1px solid #f8fafc',
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>{c.flag}</span>
                <span style={{ flex: 1, fontSize: 14, color: '#1e293b', fontWeight: 500 }}>{c.name}</span>
                <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600, fontFamily: 'monospace' }}>{c.dial}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                No countries found
              </div>
            )}
          </div>
        </motion.div>,
        document.body
      )}

      {error && <p style={{ color: '#ef4444', marginTop: 8, fontSize: 13 }}>{error}</p>}
    </div>
  );
}