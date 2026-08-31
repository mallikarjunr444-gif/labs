import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Lock,
  Activity,
  FileText,
  ChevronRight,
  Send,
  Bot,
  Sparkles,
  Shield,
  Clock,
  ShieldCheck,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VideoCtaSection from '../components/VideoCtaSection';
import { PremiumFooter } from '../sections';
import { publicInfoLinks } from './PublicInfoPage';
import AIChatModal from '../components/AIChatModal';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

// ── SAMPLE PRE-SET SYMPTOM PROMPTS ──
const SAMPLE_PROMPTS = [
  'Red, itchy patches on my inner elbows',
  'Breakouts around my jawline and forehead',
  'A scaly plaque on my scalp that won\'t clear',
  'A new dark spot on my arm with irregular borders'
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [symptomText, setSymptomText] = useState('');
  const [activeCondition, setActiveCondition] = useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('medicus_hero_sound') === 'on' ? false : true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simulatorRef = useRef<HTMLDivElement | null>(null);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem('medicus_hero_sound', nextMuted ? 'off' : 'on');

    // Clear any running fade
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (!nextMuted) {
      // Create audio element on first use
      if (!audioRef.current) {
        const audio = new Audio('/forest-ambient.mp3');
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;
      }
      audioRef.current.play().catch(() => {});
      // Fade in
      let vol = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (!audioRef.current) return;
        vol = Math.min(vol + 0.02, 0.35);
        audioRef.current.volume = vol;
        if (vol >= 0.35 && fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }, 80);
    } else {
      if (!audioRef.current) return;
      // Fade out then pause
      let vol = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (!audioRef.current) return;
        vol = Math.max(vol - 0.02, 0);
        audioRef.current.volume = vol;
        if (vol <= 0 && fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
          audioRef.current?.pause();
        }
      }, 80);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setChatQuery(symptomText);
    setIsChatOpen(true);
  };

  const handlePromptClick = (prompt: string) => {
    setSymptomText(prompt);
    setChatQuery(prompt);
    setIsChatOpen(true);
  };

  const stats = [
    { value: '120K+', label: 'Images Analyzed' },
    { value: '99.2%', label: 'Top-Class Accuracy' },
    { value: '8+', label: 'Conditions Detected' },
    { value: '24/7', label: 'Availability' },
  ];

  const conditions = [
    { name: 'Acne Vulgaris', accuracy: '96%', desc: 'Common inflammatory skin disease of the pilosebaceous unit.', category: 'Inflammatory' },
    { name: 'Melanoma', accuracy: '94%', desc: 'Serious type of skin cancer developing from melanocytes.', category: 'Neoplastic' },
    { name: 'Eczema', accuracy: '92%', desc: 'Condition that causes dry, red, itchy, and irritated skin.', category: 'Inflammatory' },
    { name: 'Psoriasis', accuracy: '93%', desc: 'Autoimmune disease producing patches of abnormal skin.', category: 'Autoimmune' },
    { name: 'Rosacea', accuracy: '88%', desc: 'Facial condition causing redness and visible blood vessels.', category: 'Vascular' },
    { name: 'Vitiligo', accuracy: '90%', desc: 'Long-term condition causing pale patches on skin tissue.', category: 'Pigmentary' },
    { name: 'Dermatitis', accuracy: '89%', desc: 'General term for skin irritation or allergic reactions.', category: 'Allergic' },
    { name: 'Fungal Infections', accuracy: '91%', desc: 'Superficial skin tissue irritation caused by fungi.', category: 'Infectious' },
  ];

  return (
    <>
      <SEO
        title="AI Dermatology - Understand Your Skin"
        description="Clinical-grade AI dermatology reference models with instant ISIC validation and physician-ready reports. Free skin analysis with complete privacy."
      />
      <div className="min-h-screen bg-[#FAF9F5] text-[#141515] overflow-x-hidden selection:bg-[#206E55]/20 font-sans">
      
      {/* ── TOP CINEMATIC FULLSCREEN HERO SECTION ── */}
      <section className="relative w-full min-h-screen flex flex-col justify-between items-center text-center text-white overflow-hidden pt-32 pb-10 px-4 select-none">
        
        {/* Background Image / Overlay (Forest Lake Image) */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/hero-bg.webp'), url('/hero-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.75) contrast(1.05)',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6 my-auto pt-6">
          
          {/* #1 Health AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-lg"
          >
            <Sparkles size={14} className="text-emerald-300" />
            #1 Health AI Worldwide
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display leading-[1.08] tracking-tight text-white max-w-3xl text-balance"
          >
            AI Dermatology That Helps You Understand Your Skin
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl font-medium text-white/90 max-w-2xl leading-relaxed text-balance"
          >
            Clinical-grade AI reference models, instant ISIC validation, and physician-ready reports—built for complete privacy.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link to="/analysis">
              <button className="px-8 py-4 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm sm:text-base transition-all shadow-xl hover:scale-105 inline-flex items-center gap-2.5 border border-white/20">
                Start Free Analysis
                <ArrowRight size={18} />
              </button>
            </Link>

            <button
              onClick={scrollToSimulator}
              className="px-8 py-4 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 font-bold text-sm sm:text-base transition-all border border-white/30 shadow-xl hover:scale-105 inline-flex items-center gap-2.5"
            >
              Learn More
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-6 pt-2 text-xs sm:text-sm font-semibold text-white/80"
          >
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> Zero Waiting Time
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Safe and Secure
            </span>
          </motion.div>
        </div>

        {/* Bottom Bar: Sound Toggle & Perfectly Centered Scroll Indicator */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-3 items-center px-4 sm:px-8 pt-6 border-t border-white/15 text-xs font-bold uppercase tracking-widest text-white/80">
          
          {/* Sound Button (Left) */}
          <div className="justify-self-start">
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition text-xs font-bold"
            >
              <span className="flex items-center gap-2">
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {isMuted ? 'SOUND: OFF' : 'SOUND: ON'}
              </span>
            </button>
          </div>

          {/* Centered Scroll Indicator (Center) */}
          <div className="flex flex-col items-center gap-1.5 justify-self-center cursor-pointer" onClick={scrollToSimulator}>
            <span className="text-[10px] tracking-[0.2em] font-extrabold text-white/90">SCROLL</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-white/70 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-white" />
            </motion.div>
          </div>

          {/* Trust Badge (Right) */}
          <div className="justify-self-end hidden sm:flex items-center gap-2 text-[11px] font-extrabold tracking-wider text-white/70">
            <Shield size={14} className="text-emerald-400" />
            <span>HIPAA ENFORCED</span>
          </div>
        </div>
      </section>

      {/* ── TOP ADVERTISEMENT BANNER SPACE ── */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <AdSpace variant="leaderboard" />
      </div>

      {/* ── SECOND HERO SECTION ("Hi, I'm Medicus Labs") ── */}
      <section ref={simulatorRef} className="relative px-4 sm:px-6 lg:px-8 pb-12 pt-16">
        <div className="mx-auto max-w-[880px] text-left sm:text-center flex flex-col items-center">
          <p className="mb-4 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#206E55]">
            Trusted Clinical AI Companion
          </p>
          <h2 className="m-0 text-4xl sm:text-6xl lg:text-[4.6rem] font-extrabold font-display leading-[1.06] text-[#141515] tracking-tight max-w-4xl text-balance">
            Hi, I’m Medicus Labs
          </h2>
          <h3 className="mt-4 text-xl sm:text-3xl font-medium leading-snug tracking-tight text-[#141515] max-w-2xl">
            Secure. Private. Built on clinical models.
          </h3>
          <p className="mt-4 text-[#5A554A] text-base sm:text-lg max-w-xl leading-relaxed">
            Tell me about your skin symptoms or upload a clinical photograph. Get an instant diagnostic reference and physician-ready report in minutes.
          </p>
          
          {/* ── CHAT & SYMPTOM SIMULATOR CARD (AUGUST STYLE) ── */}
          <div className="mt-10 w-full max-w-[660px]">
            <div className="flex flex-col rounded-3xl bg-white border border-[#E5E2DA] shadow-[0_8px_30px_rgba(13,39,64,0.03)] overflow-hidden">
              
              <div className="flex items-center gap-3 p-4 bg-[#F5FAF7]/60 border-b border-[#E5E2DA]/50">
                <div className="flex -space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#E8F2ED] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#206E55]">AI</div>
                  <div className="w-7 h-7 rounded-full bg-sky-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-sky-600">MD</div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#141515]">AI-Assisted Dermatology Reference Check</span>
              </div>

              <form onSubmit={handleStartAnalysis} className="flex flex-col">
                <div className="p-5">
                  <textarea
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder="Describe your skin condition (e.g. Red, scaly rash on my arm for two weeks)..."
                    rows={3}
                    className="w-full text-base border-none outline-none resize-none placeholder-slate-400 text-[#141515] bg-transparent focus:ring-0 focus:outline-none"
                  />
                  
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 text-left">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 w-full mb-1">Or click a sample query:</span>
                    {SAMPLE_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handlePromptClick(prompt)}
                        className="text-xs px-3.5 py-2 rounded-full border border-[#E5E2DA] bg-[#FAF9F5] text-[#5A554A] hover:bg-[#E8F2ED] hover:border-[#206E55] hover:text-[#206E55] transition font-medium text-left truncate max-w-full"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#FAF9F5]/40 border-t border-[#E5E2DA]/50 gap-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <Lock size={12} className="text-[#206E55]" />
                    HIPAA • Secure &amp; Private
                  </span>
                  
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm transition shadow-sm flex items-center gap-1.5 active:scale-95 flex-shrink-0"
                  >
                    Start chat, free
                    <Send size={13} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── CLINICAL TRUST GRID (AUGUST STYLE) ── */}
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center rounded-3xl border border-[#E5E2DA] bg-[#F3F1EB]/50 px-6 sm:px-16 py-10 mt-16 sm:mt-24">
          <ul className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <li className="flex flex-col items-start">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F2ED] text-[#206E55] flex items-center justify-center mb-4 border border-[#206E55]/10">
                <Lock size={16} />
              </div>
              <h3 className="text-lg font-bold text-[#141515] mb-2">HIPAA-compliant</h3>
              <p className="text-xs sm:text-sm text-[#5A554A] leading-relaxed">
                Your medical reference data remains encrypted and safe at all times.
              </p>
            </li>
            <li className="flex flex-col items-start lg:border-l lg:border-[#E5E2DA] lg:pl-10">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F2ED] text-[#206E55] flex items-center justify-center mb-4 border border-[#206E55]/10">
                <Activity size={16} />
              </div>
              <h3 className="text-lg font-bold text-[#141515] mb-2">Diagnostic Scan</h3>
              <p className="text-xs sm:text-sm text-[#5A554A] leading-relaxed">
                Analyze matches across major conditions in under one minute.
              </p>
            </li>
            <li className="flex flex-col items-start lg:border-l lg:border-[#E5E2DA] lg:pl-10">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F2ED] text-[#206E55] flex items-center justify-center mb-4 border border-[#206E55]/10">
                <Brain size={16} />
              </div>
              <h3 className="text-lg font-bold text-[#141515] mb-2">Clinical-Grade</h3>
              <p className="text-xs sm:text-sm text-[#5A554A] leading-relaxed">
                Models built on thousands of certified dermatological case archives.
              </p>
            </li>
            <li className="flex flex-col items-start lg:border-l lg:border-[#E5E2DA] lg:pl-10">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F2ED] text-[#206E55] flex items-center justify-center mb-4 border border-[#206E55]/10">
                <FileText size={16} />
              </div>
              <h3 className="text-lg font-bold text-[#141515] mb-2">Physician-Ready</h3>
              <p className="text-xs sm:text-sm text-[#5A554A] leading-relaxed">
                Generate formatted PDF report packets to share with your physician.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="py-16 border-y border-[#E5E2DA] bg-[#F3F1EB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl sm:text-5xl font-extrabold text-[#206E55] mb-2">
                  {stat.value}
                </h3>
                <p className="text-[#5A554A] text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLINICAL ARTICLE SECTIONS (AUGUST STYLE) ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 sm:space-y-36">
        
        <div className="text-left sm:text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#206E55] mb-2">Clinical Architecture</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515]">
            Dermatological assistance that guides your care
          </h2>
        </div>

        {/* Article 1 */}
        <article className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 sm:gap-20">
          <div className="w-full lg:max-w-[480px] space-y-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#141515] leading-tight">
              Evaluate skin concerns in plain language
            </h3>
            <p className="text-[#5A554A] text-base sm:text-lg leading-relaxed">
              Describe your symptoms directly. Medicus AI analyzes diagnostic indicators, evaluates severity levels, and presents clinical summaries without medical jargon.
            </p>
            <div className="pt-2">
              <Link to="/analysis" className="inline-flex min-h-[50px] items-center justify-center gap-1.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] px-8 text-sm font-bold text-white transition-colors shadow-sm">
                Discuss symptoms
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:max-w-[500px] flex-shrink-0 bg-[#F3F1EB] rounded-3xl border border-[#E5E2DA] p-6 relative aspect-[4/3] flex items-center justify-center">
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm w-full space-y-4 max-w-[380px]">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <span className="w-8 h-8 rounded-full bg-[#E8F2ED] text-[#206E55] flex items-center justify-center text-xs font-bold">AI</span>
                <div>
                  <h4 className="text-xs font-bold leading-none text-[#141515]">Clinical Helper</h4>
                  <p className="text-[9px] text-[#5A554A] font-semibold leading-none mt-1">Dermatology Assessment</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs p-3 rounded-xl bg-slate-50 text-[#141515] font-medium max-w-[90%]">
                  I noticed a red patch on my elbow. It's itchy and dry.
                </div>
                <div className="text-xs p-3 rounded-xl bg-[#E8F2ED] text-[#206E55] font-semibold max-w-[90%]">
                  Based on indicators, this matches Dermatitis (Eczema) with a 92% index. Keep hydrated and consult a doctor.
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ── IN-BETWEEN 300x250 RECTANGLE BANNER ── */}
        <div className="my-8 flex justify-center">
          <AdSpace variant="rectangle" />
        </div>

        {/* Article 2 */}
        <article className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 sm:gap-20">
          <div className="w-full lg:max-w-[480px] space-y-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#141515] leading-tight">
              Compare visual indicators immediately
            </h3>
            <p className="text-[#5A554A] text-base sm:text-lg leading-relaxed">
              Match photos and observations with our medical mapping library. View diagnostic indexes, care guidelines, and clinical statistics instantly.
            </p>
            <div className="pt-2">
              <Link to="/analysis" className="inline-flex min-h-[50px] items-center justify-center gap-1.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] px-8 text-sm font-bold text-white transition-colors shadow-sm">
                Run comparative scan
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:max-w-[500px] flex-shrink-0 bg-[#F3F1EB] rounded-3xl border border-[#E5E2DA] p-6 relative aspect-[4/3] flex items-center justify-center">
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm w-full space-y-4.5 max-w-[380px]">
              <h4 className="text-xs font-bold text-[#141515] uppercase tracking-wider">Analysis Matches</h4>
              <div className="space-y-3">
                {[
                  { name: 'Acne Vulgaris', val: '96%' },
                  { name: 'Eczema', val: '92%' },
                  { name: 'Rosacea', val: '88%' }
                ].map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#141515]">{item.name}</span>
                      <span className="text-[#206E55]">{item.val}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#FAF9F5] rounded-full overflow-hidden border border-[#E5E2DA]/60">
                      <div className="h-full bg-[#206E55]" style={{ width: item.val }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Article 3 */}
        <article className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 sm:gap-20">
          <div className="w-full lg:max-w-[480px] space-y-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#141515] leading-tight">
              Physician-ready assessment reports
            </h3>
            <p className="text-[#5A554A] text-base sm:text-lg leading-relaxed">
              Export a complete PDF summary detailing condition assessments, key findings, severity classifications, and preventive steps for your next appointment.
            </p>
            <div className="pt-2">
              <Link to="/analysis" className="inline-flex min-h-[50px] items-center justify-center gap-1.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] px-8 text-sm font-bold text-white transition-colors shadow-sm">
                Get PDF report sample
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:max-w-[500px] flex-shrink-0 bg-[#F3F1EB] rounded-3xl border border-[#E5E2DA] p-6 relative aspect-[4/3] flex items-center justify-center">
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm w-full space-y-3.5 max-w-[360px] text-left">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medicus Labs Report</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-[9px] font-bold text-amber-700 uppercase">Attention</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#141515]">Key Findings</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  - Sub-clinical skin barrier irritation observed.<br />
                  - High confidence index match for dermatitis.
                </p>
              </div>
              <button type="button" className="w-full py-2.5 bg-[#F3F1EB] text-[#206E55] font-bold text-xs rounded-lg hover:bg-[#E8F2ED] transition flex items-center justify-center gap-1">
                <FileText size={12} />
                Download Report PDF
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* ── SUPPORTED CONDITIONS INTERACTIVE SHOWCASE ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-[#F3F1EB]/40 border-y border-[#E5E2DA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#141515] mb-4">
              Supported conditions library
            </h2>
            <p className="text-[#5A554A] text-base sm:text-lg">
              Check analysis accuracy across major clinical categories.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {conditions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveCondition(index)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    activeCondition === index
                      ? 'bg-white border-[#206E55] shadow-[0_4px_20px_rgba(13,39,64,0.03)]'
                      : 'bg-[#FAF9F5]/45 border-[#E5E2DA] hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                    <span className="text-[10px] font-bold text-[#206E55] bg-[#E8F2ED] px-2.5 py-0.5 rounded-full">{item.accuracy} Accuracy</span>
                  </div>
                  <h4 className="font-bold text-base text-[#141515] group-hover:text-[#206E55] transition-colors relative z-10">{item.name}</h4>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 h-full">
              <AnimatePresence mode="wait">
                {activeCondition !== null && (
                  <motion.div
                    key={activeCondition}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="p-8 rounded-3xl bg-white border border-[#E5E2DA] flex flex-col h-full justify-between shadow-lg relative overflow-hidden"
                  >
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#206E55] bg-[#E8F2ED] px-3 py-1 rounded-lg mb-3">
                          {conditions[activeCondition].category} category
                        </span>
                        <h3 className="text-3xl font-extrabold text-[#141515]">{conditions[activeCondition].name}</h3>
                      </div>
                      
                      <p className="text-[#5A554A] text-sm leading-relaxed font-medium">
                        {conditions[activeCondition].desc}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                          <span>Diagnosis Reliability Index</span>
                          <span className="text-[#206E55]">{conditions[activeCondition].accuracy} Accuracy</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#FAF9F5] rounded-full overflow-hidden border border-[#E5E2DA]/60">
                          <motion.div
                            className="h-full bg-[#206E55] rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: conditions[activeCondition].accuracy }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <Link to="/analysis" className="block w-full">
                        <button className="w-full py-4 rounded-full bg-[#FAF9F5] border border-[#D1CDC2] hover:bg-[#E8F2ED] hover:border-[#206E55] text-[#206E55] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 group">
                          Start Analysis for {conditions[activeCondition].name}
                          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE ADVERTISEMENT BANNER SPACE ── */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <AdSpace variant="leaderboard" />
      </div>

      {/* ── PUBLIC INFORMATION SECTION ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#206E55]">Public Portal</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#141515] mt-3 mb-4">
            Legal &amp; support documentation
          </h2>
          <p className="text-[#5A554A] text-base sm:text-lg">
            Compliance guidelines, user agreements, and system report channels.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {publicInfoLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  to={item.to}
                  className="group flex flex-col h-full min-h-[200px] rounded-3xl border border-[#E5E2DA] bg-white p-6 transition-all duration-300 hover:border-[#206E55]/60 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E8F2ED] text-[#206E55] transition group-hover:bg-[#206E55] group-hover:text-white">
                    <Icon size={16} />
                  </span>
                  <span className="text-base font-bold text-[#141515] group-hover:text-[#206E55] transition-colors">{item.label}</span>
                  <span className="mt-2 flex-1 text-xs leading-relaxed text-[#5A554A] font-semibold">{item.description}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#206E55] group-hover:underline">
                    Launch Page
                    <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── NATIVE AD BANNER SPACE ── */}
        <div className="mt-12">
          <AdSpace variant="native" />
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#E5E2DA] p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E8F2ED] to-[#206E55] text-white font-extrabold flex items-center justify-center text-3xl border-2 border-[#206E55]/20 shadow-md flex-shrink-0">
              MR
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#206E55] mb-1">Founder & CEO</p>
              <h3 className="text-2xl font-extrabold text-[#141515]">Mallikarjun R</h3>
              <p className="text-[#5A554A] text-sm mt-2 max-w-2xl">
                Building clinical-grade AI dermatology to democratize skin health for everyone.
                <Link to="/founder" className="text-[#206E55] font-bold hover:underline ml-1">View full profile →</Link>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="https://www.linkedin.com/in/mallikarjunr-com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-[#E5E2DA] bg-white flex items-center justify-center text-[#5A554A] hover:text-[#0077B5] hover:border-[#0077B5] transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="https://github.com/mallikarjunr444-gif" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full border border-[#E5E2DA] bg-white flex items-center justify-center text-[#5A554A] hover:text-[#24292E] hover:border-[#24292E] transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPONSORED DEALS & RECOMMENDATIONS (SMARTLINKS) ── */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SponsoredLinks />
      </div>

      {/* ── LOWER ADVERTISEMENT BANNER SPACE ── */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <AdSpace variant="leaderboard" />
      </div>

      {/* ── VIDEO CALL TO ACTION ── */}
      <section className="relative z-10 border-t border-[#E5E2DA]">
        <VideoCtaSection />
      </section>

      {/* ── PREMIUM FOOTER ── */}
      <PremiumFooter />

      {/* ── FLOATING LIVE AI CHAT TRIGGER ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setChatQuery('');
            setIsChatOpen(true);
          }}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
        >
          <Bot size={18} />
          <span>Ask Medicus AI</span>
        </button>
      </div>

      {/* ── LIVE STREAMING AI CHAT MODAL ── */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatQuery}
      />
    </div>
    </>
  );
};

export default Home;
