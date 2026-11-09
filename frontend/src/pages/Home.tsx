import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Lock, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import { Aurora, CountUp, Marquee, ScanDevice, ScrollStory, SCAN_CASES, SpotlightCard } from '../components/wow';
import AIChatModal from '../components/AIChatModal';
import SEO from '../components/SEO';
import { SponsoredLinks } from '../components/AdSpace';

const SAMPLE_PROMPTS = [
  'Red, itchy patches on my inner elbows',
  'Breakouts around my jawline and forehead',
  "A scaly plaque on my scalp that won't clear",
  'A new dark spot on my arm with irregular borders',
];

const STATS = [
  { to: 120, suffix: 'K+', decimals: 0, label: 'Images analyzed' },
  { to: 99.2, suffix: '%', decimals: 1, label: 'Top-class accuracy' },
  { to: 8, suffix: '+', decimals: 0, label: 'Conditions detected' },
  { to: 24, suffix: '/7', decimals: 0, label: 'Availability' },
];

const COMPARE = [
  ['Time to a first answer', 'Minutes', 'Days to weeks'],
  ['Cost to start', 'Free', 'Consultation fee'],
  ['Available', 'Any hour, anywhere', 'Clinic hours'],
  ['Gives a diagnosis', 'No, a reference reading', 'Yes'],
  ['Best used for', 'Knowing what to ask', 'Treatment and care'],
];

const CARDS = [
  ['Private by design', 'Images and notes are encrypted in transit and used only to produce your result.'],
  ['A reference, not a verdict', 'Medicus informs. A qualified clinician diagnoses and treats.'],
  ['Clear about limits', 'Results can be wrong. See a doctor for anything new, changing or bleeding.'],
];

const CONDITIONS = [
  { name: 'Acne Vulgaris', accuracy: '96%', desc: 'Common inflammatory skin disease of the pilosebaceous unit.', category: 'Inflammatory', to: '/blog/acne' },
  { name: 'Melanoma', accuracy: '94%', desc: 'Serious type of skin cancer developing from melanocytes.', category: 'Neoplastic', to: '/blog/melanoma' },
  { name: 'Eczema', accuracy: '92%', desc: 'Condition that causes dry, red, itchy and irritated skin.', category: 'Inflammatory', to: '/blog/eczema' },
  { name: 'Psoriasis', accuracy: '93%', desc: 'Autoimmune disease producing patches of abnormal skin.', category: 'Autoimmune', to: '/blog/psoriasis' },
  { name: 'Rosacea', accuracy: '88%', desc: 'Facial condition causing redness and visible blood vessels.', category: 'Vascular', to: '/blog/rosacea' },
  { name: 'Vitiligo', accuracy: '90%', desc: 'Long-term condition causing pale patches on the skin.', category: 'Pigmentary', to: '/blog/vitiligo' },
  { name: 'Dermatitis', accuracy: '89%', desc: 'General term for skin irritation or allergic reactions.', category: 'Allergic', to: '/blog/contact-dermatitis' },
  { name: 'Fungal infections', accuracy: '91%', desc: 'Superficial skin irritation caused by fungi.', category: 'Infectious', to: '/blog/ringworm' },
];

const H2 = 'text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f] sm:text-[48px] lg:text-[56px]';
const FOCUS = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0071e3]/30';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px' },
  transition: { duration: 0.8, ease: [0.28, 0.11, 0.32, 1] as const },
};

const LOCAL_LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#how', label: 'How it works' },
  { href: '#conditions', label: 'Conditions' },
  { href: '#privacy', label: 'Privacy' },
];

const Home: React.FC = () => {
  const [symptomText, setSymptomText] = useState('');
  const [active, setActive] = useState(0);
  const [scanIdx, setScanIdx] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState('');

  const openChat = (query: string) => { setChatQuery(query); setChatOpen(true); };
  const condition = CONDITIONS[active];

  return (
    <>
      <SEO
        title="AI Dermatology - Understand Your Skin"
        description="Clinical-grade AI dermatology reference models with instant ISIC validation and physician-ready reports. Free skin analysis with complete privacy."
      />
      <div className="overflow-x-clip bg-white pt-12 text-[#1d1d1f]">
        {/* Sticky local navigation */}
        <div className="sticky top-12 z-40 border-b border-black/[0.08] bg-[#f5f5f7]/80 backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex h-11 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
            <span className="text-[17px] font-semibold tracking-[-0.01em]">AI Skin Scan</span>
            <nav aria-label="On this page" className="hidden items-center gap-6 md:flex">
              {LOCAL_LINKS.map((l) => (
                <a key={l.href} href={l.href} className={`rounded text-[12px] text-[#1d1d1f]/80 hover:text-[#1d1d1f] ${FOCUS}`}>{l.label}</a>
              ))}
            </nav>
            <Link to="/analysis" className={`inline-flex h-7 items-center rounded-full bg-[#0071e3] px-3.5 text-[12px] text-white hover:bg-[#0077ed] ${FOCUS}`}>Start</Link>
          </div>
        </div>

        {/* Hero */}
        <section id="overview" className="relative scroll-mt-24 px-5 pb-16 pt-16 text-center sm:pt-24">
          <Aurora />
          <motion.div {...reveal}>
            <p className="text-[17px] font-semibold text-[#6e6e73] sm:text-[21px]">Medicus Labs</p>
            <h1 className="mx-auto mt-3 max-w-[900px] text-[48px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[80px] lg:text-[104px]">
              Understand<br /><span className="bg-gradient-to-r from-[#0071e3] via-[#7a5cff] to-[#30b8d5] bg-clip-text text-transparent">your skin.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-[19px] leading-[1.42] text-[#6e6e73] sm:text-[24px]">
              Describe a symptom or share a photo. Get a clear reference reading and a report to take to your doctor, in minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Link to="/analysis" className={`inline-flex h-12 items-center rounded-full bg-[#0071e3] px-7 text-[17px] text-white shadow-[0_8px_24px_-6px_rgba(0,113,227,0.6)] transition-transform hover:scale-[1.03] hover:bg-[#0077ed] ${FOCUS}`}>Start free scan</Link>
              <button type="button" onClick={() => openChat('')} className={`rounded text-[19px] text-[#0071e3] hover:underline ${FOCUS}`}>Ask Medicus AI <span aria-hidden="true">›</span></button>
            </div>
            <p className="mt-5 text-[13px] text-[#6e6e73]">Free. No sign-up needed to start. Not a diagnosis.<sup className="ml-0.5">1</sup></p>
          </motion.div>

          <motion.div {...reveal} className="mt-14 sm:mt-20">
            <ScanDevice scanCase={SCAN_CASES[scanIdx]} />
            <div role="tablist" aria-label="Try an example scan" className="mt-6 inline-flex gap-1 rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-black/[0.06] backdrop-blur">
              {SCAN_CASES.map((c, i) => (
                <button key={c.id} type="button" role="tab" aria-selected={scanIdx === i} onClick={() => setScanIdx(i)} className={`rounded-full px-5 py-2 text-[14px] font-medium transition-colors ${FOCUS} ${scanIdx === i ? 'bg-[#1d1d1f] text-white' : 'text-[#1d1d1f] hover:bg-black/5'}`}>{c.label}</button>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} className="mx-auto mt-16 max-w-[980px] rounded-[28px] bg-[#f5f5f7] p-5 text-left sm:mt-20 sm:p-10">
            <form onSubmit={(e) => { e.preventDefault(); openChat(symptomText); }} className="mx-auto max-w-[760px]">
              <label htmlFor="symptom" className="text-[14px] font-semibold text-[#1d1d1f]">What would you like to check?</label>
              <textarea
                id="symptom"
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                rows={3}
                placeholder="For example: red, scaly rash on my arm for two weeks"
                className="mt-3 w-full resize-none rounded-[20px] border border-[#d2d2d7] bg-white px-5 py-4 text-[17px] leading-[1.5] text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/20"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((p) => (
                  <button key={p} type="button" onClick={() => { setSymptomText(p); openChat(p); }} className={`rounded-full bg-white px-4 py-2 text-left text-[14px] text-[#1d1d1f] transition-all hover:-translate-y-0.5 hover:bg-[#e8e8ed] ${FOCUS}`}>{p}</button>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[13px] text-[#6e6e73]"><Lock size={13} /> Private and encrypted</span>
                <button type="submit" className={`inline-flex h-11 items-center gap-2 rounded-full bg-[#0071e3] px-6 text-[17px] text-white hover:bg-[#0077ed] ${FOCUS}`}>Start chat <Send size={14} /></button>
              </div>
            </form>
          </motion.div>
        </section>

        <Marquee items={CONDITIONS.map((c) => c.name)} />

        <ScrollStory />

        {/* Stats */}
        <section className="bg-black px-5 py-20 sm:py-28" aria-label="Platform numbers">
          <dl className="mx-auto grid max-w-[1080px] grid-cols-2 gap-y-12 text-center md:grid-cols-4">
            {STATS.map((s) => (
              <motion.div key={s.label} {...reveal}>
                <dt className="order-2 mt-2 text-[15px] text-[#a1a1a6]">{s.label}</dt>
                <dd className="bg-gradient-to-b from-white to-[#86868b] bg-clip-text text-[48px] font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-[72px]"><CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} /></dd>
              </motion.div>
            ))}
          </dl>
        </section>

        {/* Comparison */}
        <section className="bg-[#f5f5f7] px-5 py-20 sm:py-28">
          <motion.div {...reveal} className="mx-auto max-w-[900px] text-center">
            <h2 className={H2}>A better first step.</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[19px] leading-[1.4] text-[#6e6e73] sm:text-[21px]">Medicus helps you arrive informed. It does not replace your dermatologist.</p>
          </motion.div>
          <motion.div {...reveal} className="mx-auto mt-12 max-w-[980px] overflow-hidden rounded-[28px] bg-white">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-[#e8e8ed] text-[13px] font-semibold sm:text-[15px]">
              <span className="p-4 sm:p-6" />
              <span className="bg-[#0071e3] p-4 text-white sm:p-6">Medicus scan</span>
              <span className="p-4 text-[#6e6e73] sm:p-6">Clinic visit</span>
            </div>
            {COMPARE.map(([k, a1, b1]) => (
              <div key={k} className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-[#e8e8ed] text-[14px] last:border-0 sm:text-[17px]">
                <span className="p-4 text-[#6e6e73] sm:p-6">{k}</span>
                <span className="bg-[#eaf2fd] p-4 font-semibold sm:p-6">{a1}</span>
                <span className="p-4 sm:p-6">{b1}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Conditions */}
        <section id="conditions" className="scroll-mt-24 bg-white px-5 py-20 sm:py-28">
          <motion.div {...reveal} className="mx-auto max-w-[900px] text-center">
            <h2 className={H2}>Know what it checks.</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[19px] leading-[1.4] text-[#6e6e73] sm:text-[21px]">Pick a condition to see its category and how reliably it is matched.</p>
          </motion.div>
          <div className="mx-auto mt-12 grid max-w-[1080px] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div role="tablist" aria-label="Conditions" className="grid grid-cols-2 gap-3">
              {CONDITIONS.map((c, i) => (
                <button key={c.name} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`rounded-[20px] p-4 text-left transition-all hover:-translate-y-0.5 ${FOCUS} ${active === i ? 'bg-[#0071e3] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'}`}>
                  <span className={`block text-[12px] ${active === i ? 'text-white/80' : 'text-[#6e6e73]'}`}>{c.category}</span>
                  <span className="mt-1 block text-[17px] font-semibold leading-tight">{c.name}</span>
                </button>
              ))}
            </div>
            <div role="tabpanel" className="flex flex-col justify-between rounded-[28px] bg-[#f5f5f7] p-8 sm:p-10">
              <div>
                <p className="text-[14px] font-semibold text-[#6e6e73]">{condition.category}</p>
                <h3 className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[40px]">{condition.name}</h3>
                <p className="mt-4 text-[19px] leading-[1.45] text-[#6e6e73]">{condition.desc}</p>
                <div className="mt-8">
                  <div className="flex justify-between text-[14px]"><span>Match reliability</span><span className="font-semibold">{condition.accuracy}</span></div>
                  <div className="mt-2 h-2 rounded-full bg-[#d2d2d7]"><div className="h-full rounded-full bg-[#0071e3] transition-all duration-700" style={{ width: condition.accuracy }} /></div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link to="/analysis" className={`inline-flex h-11 items-center rounded-full bg-[#0071e3] px-6 text-[17px] text-white hover:bg-[#0077ed] ${FOCUS}`}>Scan for {condition.name.toLowerCase()}</Link>
                <Link to={condition.to} className={`rounded text-[17px] text-[#0071e3] hover:underline ${FOCUS}`}>Read the guide <span aria-hidden="true">›</span></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy and honesty */}
        <section id="privacy" className="scroll-mt-24 bg-black px-5 py-20 text-[#f5f5f7] sm:py-28">
          <motion.h2 {...reveal} className="mx-auto max-w-[900px] text-center text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[56px]">Honest about<br />what this is.</motion.h2>
          <div className="mx-auto mt-14 grid max-w-[1080px] gap-5 md:grid-cols-3">
            {CARDS.map(([t, d]) => (
              <motion.div key={t} {...reveal}>
                <SpotlightCard glow="rgba(41,151,255,0.28)" className="h-full rounded-[28px] bg-[#1c1c1e] p-8 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{t}</h3>
                  <p className="mt-3 text-[17px] leading-[1.5] text-[#a1a1a6]">{d}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center"><Link to="/editorial-policy" className={`rounded text-[17px] text-[#2997ff] hover:underline ${FOCUS}`}>Read our editorial policy <span aria-hidden="true">›</span></Link></p>
        </section>

        {/* Founder */}
        <section className="bg-white px-5 py-20 sm:py-24">
          <motion.div {...reveal} className="mx-auto flex max-w-[860px] flex-col items-center gap-6 rounded-[28px] bg-[#f5f5f7] p-10 text-center sm:p-14">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1d1d1f] text-[20px] font-semibold text-white" aria-hidden="true">MR</span>
            <div>
              <p className="text-[14px] font-semibold text-[#6e6e73]">Founder</p>
              <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.025em]">Mallikarjun R</h3>
              <p className="mx-auto mt-3 max-w-[480px] text-[17px] leading-[1.5] text-[#6e6e73]">Building clinical-grade AI dermatology to make skin health understandable for everyone.</p>
            </div>
            <Link to="/founder" className={`rounded text-[17px] text-[#0071e3] hover:underline ${FOCUS}`}>Read the story <span aria-hidden="true">›</span></Link>
          </motion.div>
        </section>

        <div className="bg-white px-5 pb-10"><div className="mx-auto max-w-[1080px]"><SponsoredLinks /></div></div>

        {/* Closing call to action */}
        <section className="bg-white px-5 pb-24 pt-8 text-center sm:pb-32">
          <motion.div {...reveal}>
            <h2 className={H2}>Start with a scan.</h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[19px] text-[#6e6e73] sm:text-[21px]">Free, private, and ready in minutes.</p>
            <Link to="/analysis" className={`mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#0071e3] px-7 text-[17px] text-white hover:bg-[#0077ed] ${FOCUS}`}>Start free scan <ArrowRight size={18} /></Link>
          </motion.div>
        </section>

        <PremiumFooter />

        <button type="button" onClick={() => openChat('')} className={`fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#1d1d1f] px-5 text-[15px] text-white shadow-lg transition-colors hover:bg-black ${FOCUS}`}>
          <Bot size={18} /> Ask Medicus AI
        </button>

        <AIChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} initialQuery={chatQuery} />
      </div>
    </>
  );
};

export default Home;
