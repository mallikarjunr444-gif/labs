import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

/* ───────────────────────── ambient background ───────────────────────── */

/** Slow, blurred colour fields behind the hero. Static when motion is reduced. */
export const Aurora: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const reduce = useReducedMotion();
  const blob = (cls: string, x: number[], y: number[], dur: number) => (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full blur-[90px] ${cls}`}
      animate={reduce ? undefined : { x, y, scale: [1, 1.15, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {blob(`-left-24 top-0 h-[420px] w-[420px] ${dark ? 'bg-[#0071e3]/40' : 'bg-[#0071e3]/25'}`, [0, 60, 0], [0, 40, 0], 14)}
      {blob(`right-0 top-24 h-[380px] w-[380px] ${dark ? 'bg-[#bf5af2]/30' : 'bg-[#bf5af2]/20'}`, [0, -50, 0], [0, 60, 0], 17)}
      {blob(`left-1/3 top-[320px] h-[360px] w-[360px] ${dark ? 'bg-[#30d5c8]/25' : 'bg-[#30d5c8]/20'}`, [0, 40, 0], [0, -40, 0], 19)}
    </div>
  );
};

/* ───────────────────────── numbers that count up ───────────────────────── */

export const CountUp: React.FC<{ to: number; decimals?: number; suffix?: string; duration?: number }> = ({ to, decimals = 0, suffix = '', duration = 1.6 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) { if (reduce) setValue(to); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
};

/* ───────────────────────── spotlight card ───────────────────────── */

/** A card whose surface is lit by the pointer. */
export const SpotlightCard: React.FC<React.HTMLAttributes<HTMLDivElement> & { glow?: string }> = ({ children, className = '', glow = 'rgba(0,113,227,0.18)', ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden ${className}`}
      style={{ ['--glow' as string]: glow }}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), var(--glow), transparent 60%)' }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

/* ───────────────────────── marquee ───────────────────────── */

export const Marquee: React.FC<{ items: string[] }> = ({ items }) => {
  const row = (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
      {items.map((t) => (
        <li key={t} className="whitespace-nowrap text-[28px] font-semibold tracking-[-0.02em] text-[#1d1d1f]/20 sm:text-[40px]">{t}</li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden bg-white py-8 sm:py-10" role="presentation">
      <span className="sr-only">Conditions covered: {items.join(', ')}</span>
      <div className="marquee-track flex w-max">{row}{row}</div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

/* ───────────────────────── the scan device ───────────────────────── */

export interface ScanCase {
  id: string;
  label: string;
  tone: [string, string]; // skin gradient
  spots: { x: number; y: number; r: number; c: string; o?: number }[];
  ring?: { x: number; y: number; r: number };
  tags: { x: number; y: number; text: string }[];
  bars: [string, number][];
}

export const SCAN_CASES: ScanCase[] = [
  {
    id: 'acne', label: 'Acne', tone: ['#f1c7a8', '#d99b78'],
    spots: [
      { x: 90, y: 110, r: 11, c: '#c8423b' }, { x: 150, y: 90, r: 8, c: '#d65a4f' }, { x: 190, y: 150, r: 12, c: '#bf3a34' },
      { x: 120, y: 190, r: 9, c: '#d65a4f' }, { x: 75, y: 220, r: 7, c: '#cc4b43' }, { x: 205, y: 225, r: 8, c: '#d65a4f' },
      { x: 160, y: 250, r: 6, c: '#e0786a' }, { x: 110, y: 140, r: 5, c: '#e0786a' },
    ],
    tags: [{ x: 190, y: 150, text: 'Inflammatory papule' }, { x: 90, y: 110, text: 'Pustule' }],
    bars: [['Acne vulgaris', 96], ['Folliculitis', 3], ['Rosacea', 1]],
  },
  {
    id: 'eczema', label: 'Eczema', tone: ['#a9704f', '#8a553a'],
    spots: [
      { x: 140, y: 150, r: 58, c: '#b3453a', o: 0.55 }, { x: 175, y: 195, r: 40, c: '#c25548', o: 0.5 }, { x: 105, y: 190, r: 30, c: '#9f3a30', o: 0.45 },
    ],
    tags: [{ x: 140, y: 150, text: 'Dry, inflamed patch' }, { x: 175, y: 195, text: 'Scaling' }],
    bars: [['Dermatitis (eczema)', 92], ['Psoriasis', 5], ['Fungal infection', 3]],
  },
  {
    id: 'ringworm', label: 'Fungal', tone: ['#f6d4bd', '#e3b08f'],
    spots: [], ring: { x: 150, y: 170, r: 52 },
    tags: [{ x: 150, y: 118, text: 'Ring-shaped border' }, { x: 150, y: 170, text: 'Clearer centre' }],
    bars: [['Fungal infection (tinea)', 91], ['Dermatitis', 6], ['Psoriasis', 3]],
  },
];

export const ScanDevice: React.FC<{ scanCase: ScanCase; caption?: boolean }> = ({ scanCase, caption = true }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 14 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="[perspective:1200px]">
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative mx-auto w-[280px] sm:w-[320px]">
        <div className="absolute -inset-6 -z-10 rounded-[64px] bg-[#0071e3]/20 blur-3xl" aria-hidden="true" />
        <div className="rounded-[46px] bg-[#1d1d1f] p-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <div className="relative overflow-hidden rounded-[36px] bg-black">
            <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
            <div className="px-3 pb-3 pt-10">
              <div className="relative aspect-[300/320] overflow-hidden rounded-[24px]" role="img" aria-label={`Illustration of a ${scanCase.label.toLowerCase()} skin scan`}>
                <AnimatePresence mode="wait">
                  <motion.svg key={scanCase.id} viewBox="0 0 300 320" className="absolute inset-0 h-full w-full" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                    <defs>
                      <radialGradient id={`skin-${scanCase.id}`} cx="45%" cy="40%" r="75%">
                        <stop offset="0%" stopColor={scanCase.tone[0]} />
                        <stop offset="100%" stopColor={scanCase.tone[1]} />
                      </radialGradient>
                      <filter id="soft"><feGaussianBlur stdDeviation="2.2" /></filter>
                      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .08 0" /></filter>
                    </defs>
                    <rect width="300" height="320" fill={`url(#skin-${scanCase.id})`} />
                    <rect width="300" height="320" filter="url(#grain)" />
                    {scanCase.spots.map((s, i) => (
                      <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={s.o ?? 0.85} filter="url(#soft)" />
                    ))}
                    {scanCase.ring && (
                      <>
                        <circle cx={scanCase.ring.x} cy={scanCase.ring.y} r={scanCase.ring.r} fill="none" stroke="#c4523f" strokeWidth="9" opacity="0.7" filter="url(#soft)" />
                        <circle cx={scanCase.ring.x} cy={scanCase.ring.y} r={scanCase.ring.r - 14} fill="#e8a48c" opacity="0.25" filter="url(#soft)" />
                      </>
                    )}
                  </motion.svg>
                </AnimatePresence>

                {/* corner reticle */}
                {['left-3 top-3 border-l-2 border-t-2 rounded-tl-lg', 'right-3 top-3 border-r-2 border-t-2 rounded-tr-lg', 'left-3 bottom-3 border-l-2 border-b-2 rounded-bl-lg', 'right-3 bottom-3 border-r-2 border-b-2 rounded-br-lg'].map((c) => (
                  <span key={c} className={`absolute h-6 w-6 border-white/90 ${c}`} aria-hidden="true" />
                ))}

                {/* scan line */}
                {!reduce && (
                  <motion.div key={`scan-${scanCase.id}`} aria-hidden="true" className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#2997ff]/35 to-transparent" initial={{ y: -96 }} animate={{ y: [-96, 330, -96] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-[#7cc0ff] shadow-[0_0_12px_2px_#2997ff]" />
                  </motion.div>
                )}

                {/* detection tags */}
                {scanCase.tags.map((t, i) => (
                  <motion.div key={`${scanCase.id}-${t.text}`} className="absolute z-10" style={{ left: `${(t.x / 300) * 100}%`, top: `${(t.y / 320) * 100}%` }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.5, type: 'spring', stiffness: 260, damping: 18 }}>
                    <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-white shadow ring-4 ring-white/40" />
                    <span className="ml-3 mt-2 inline-block whitespace-nowrap rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">{t.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* result sheet */}
              <div className="mt-3 rounded-[20px] bg-[#1d1d1f] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Closest match</p>
                <AnimatePresence mode="wait">
                  <motion.div key={scanCase.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    {scanCase.bars.map(([name, v], i) => (
                      <div key={name} className="mt-2.5">
                        <div className={`flex justify-between text-[12px] ${i === 0 ? 'font-semibold text-white' : 'text-[#a1a1a6]'}`}><span>{name}</span><span>{v}%</span></div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div className={`h-full rounded-full ${i === 0 ? 'bg-[#2997ff]' : 'bg-[#6e6e73]'}`} initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.28, 0.11, 0.32, 1] }} />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {caption && <p className="mt-6 text-center text-[12px] text-[#86868b]">Illustration. Not a real patient image.</p>}
    </div>
  );
};

/* ───────────────────────── scroll-pinned story ───────────────────────── */

const STORY = [
  { kicker: 'Describe', title: 'Tell it what you see.', body: 'Type a symptom in your own words, or add a photo. No forms, no medical vocabulary.' },
  { kicker: 'Compare', title: 'It checks the closest matches.', body: 'Your input is mapped to a reference library of skin conditions, ranked by how well each one fits.' },
  { kicker: 'Share', title: 'Leave with a report.', body: 'Get a plain-language summary with severity and next steps, ready to hand to your dermatologist.' },
];

const StoryScreen: React.FC<{ step: number }> = ({ step }) => (
  <div className="relative mx-auto w-[280px] sm:w-[320px]">
    <div className="absolute -inset-8 -z-10 rounded-[72px] bg-[#2997ff]/25 blur-3xl" aria-hidden="true" />
    <div className="rounded-[46px] bg-[#2a2a2d] p-[10px] ring-1 ring-white/15">
      <div className="relative h-[480px] overflow-hidden rounded-[36px] bg-black sm:h-[540px]">
        <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#0b0b0c]" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div key={step} className="absolute inset-0 px-5 pt-14" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.4, ease: [0.28, 0.11, 0.32, 1] }}>
            {step === 0 && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Medicus AI</p>
                <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="ml-auto w-fit max-w-[88%] rounded-[18px] rounded-br-md bg-[#0071e3] px-4 py-2.5 text-[14px] text-white">There is a red, scaly patch on my elbow. It itches at night.</motion.p>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="w-fit max-w-[90%] rounded-[18px] rounded-bl-md bg-[#2c2c2e] px-4 py-2.5 text-[14px] text-[#f5f5f7]">How long has it been there, and has it spread?</motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex w-fit gap-1.5 rounded-full bg-[#2c2c2e] px-4 py-3" aria-hidden="true">
                  {[0, 1, 2].map((i) => (<motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-[#86868b]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }} />))}
                </motion.div>
              </div>
            )}
            {step === 1 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Closest matches</p>
                {[['Dermatitis (eczema)', 92], ['Psoriasis', 5], ['Fungal infection', 3]].map(([n, v], i) => (
                  <div key={n as string} className="mt-5">
                    <div className={`flex justify-between text-[14px] ${i === 0 ? 'font-semibold text-white' : 'text-[#a1a1a6]'}`}><span>{n}</span><span>{v}%</span></div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><motion.div className={`h-full rounded-full ${i === 0 ? 'bg-[#2997ff]' : 'bg-[#6e6e73]'}`} initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 0.25 + i * 0.15, duration: 1, ease: [0.28, 0.11, 0.32, 1] }} /></div>
                  </div>
                ))}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 rounded-2xl bg-[#1c1c1e] p-4 text-[13px] leading-[1.5] text-[#a1a1a6]">Matched against a reference library of common skin conditions.</motion.p>
              </div>
            )}
            {step === 2 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Your report</p>
                <div className="mt-4 rounded-2xl bg-[#1c1c1e] p-4">
                  <div className="flex items-center justify-between"><span className="text-[13px] text-[#a1a1a6]">Severity</span><span className="rounded-full bg-[#ff9f0a]/20 px-2.5 py-0.5 text-[12px] font-semibold text-[#ff9f0a]">Moderate</span></div>
                  <p className="mt-3 text-[15px] font-semibold text-white">Dermatitis (eczema)</p>
                  <p className="mt-1 text-[13px] leading-[1.5] text-[#a1a1a6]">Keep the skin moisturised and avoid known triggers. See a dermatologist if it spreads or does not improve.</p>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-4 flex items-center justify-center rounded-full bg-[#0071e3] py-3 text-[14px] font-semibold text-white">Download PDF</motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </div>
);

export const ScrollStory: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(STORY.length - 1, Math.floor(v * STORY.length * 0.999))));
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section ref={ref} id="how" className="relative h-[330vh] bg-black text-[#f5f5f7]" aria-label="How it works">
      <div className="sticky top-12 flex h-[calc(100vh-3rem)] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071e3]/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-[1080px] items-center gap-6 px-5 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="relative min-h-[190px] sm:min-h-[220px]">
              {STORY.map((s, i) => (
                <motion.div key={s.title} className="absolute inset-x-0 top-0" initial={false} animate={{ opacity: step === i ? 1 : 0, y: step === i ? 0 : step > i ? -28 : 28 }} transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }} aria-hidden={step !== i}>
                  <p className="text-[15px] font-semibold text-[#2997ff]">{s.kicker}</p>
                  <h2 className="mt-2 text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[52px]">{s.title}</h2>
                  <p className="mt-4 max-w-[440px] text-[17px] leading-[1.5] text-[#a1a1a6] sm:text-[19px]">{s.body}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3" aria-hidden="true">
              {STORY.map((s, i) => (<span key={s.title} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-10 bg-[#2997ff]' : 'w-1.5 bg-[#3a3a3c]'}`} />))}
            </div>
          </div>
          <div className="order-1 scale-[0.72] sm:scale-90 lg:order-2 lg:scale-100"><StoryScreen step={step} /></div>
        </div>
        <motion.div className="absolute bottom-0 left-0 h-[3px] origin-left bg-[#2997ff]" style={{ scaleX: bar, width: '100%' }} aria-hidden="true" />
      </div>
    </section>
  );
};
