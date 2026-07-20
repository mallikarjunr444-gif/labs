import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Brain,
  Lock,
  TrendingUp,
  Volume2,
  VolumeX,
  ShieldCheck,
  Clock3,
  Activity,
  Globe,
  Sparkles,
  FileText,
  ChevronRight,
  Shield,
  UploadCloud,
  FileCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VideoCtaSection from '../components/VideoCtaSection';
import { PremiumFooter } from '../sections';
import { publicInfoLinks } from './PublicInfoPage';

// ── SAMPLE PRE-SET SYMPTOM PROMPTS ──
const SAMPLE_PROMPTS = [
  'Red, itchy patches on my inner elbows',
  'Breakouts around my jawline and forehead',
  'A scaly plaque on my scalp that won\'t clear',
  'A new dark spot on my arm with irregular borders'
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [symptomText, setSymptomText] = useState('');
  const [activeCondition, setActiveCondition] = useState<number | null>(0);

  useEffect(() => {
    const audio = new Audio('/media/ambient_house-forest-park-with-wind-and-bird-calls-321622.mp3');
    audio.loop = true;
    audio.volume = 0.18;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSoundOn) {
      audio.pause();
      setIsSoundOn(false);
      return;
    }

    try {
      await audio.play();
      setIsSoundOn(true);
    } catch {
      setIsSoundOn(false);
    }
  }, [isSoundOn]);

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to analysis page and pass the entered text in history state
    navigate('/analysis', { state: { initialQuery: symptomText } });
  };

  const handlePromptClick = (prompt: string) => {
    setSymptomText(prompt);
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
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] overflow-x-hidden selection:bg-[#206E55]/20 font-sans">
      
      {/* ── HERO SECTION ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 pt-36 sm:pt-44 lg:pt-48">
        <div className="mx-auto max-w-[880px] text-left sm:text-center flex flex-col items-center">
          <p className="mb-4.5 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#206E55]">
            Trusted Clinical AI Companion
          </p>
          <h1 className="m-0 text-4xl sm:text-6xl lg:text-[4.6rem] font-extrabold font-display leading-[1.06] text-[#141515] tracking-tight max-w-4xl text-balance">
            Hi, I’m Medicus Labs
          </h1>
          <h2 className="mt-4 text-xl sm:text-3xl font-medium leading-snug tracking-tight text-[#141515] max-w-2xl">
            Secure. Private. Built on clinical models.
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">
            Tell me about your skin symptoms or upload a clinical photograph. Get an instant diagnostic reference and physician-ready report in minutes.
          </p>
          
          {/* ── CHAT & SYMPTOM SIMULATOR CARD ── */}
          <div className="mt-10 w-full max-w-[660px]">
            <div className="flex flex-col rounded-3xl bg-white border border-[#E5E2DA] shadow-[0_8px_30px_rgba(13,39,64,0.02)] overflow-hidden">
              
              {/* Header inside the chat simulator */}
              <div className="flex items-center gap-3 p-4 bg-[#F5FAF7]/60 border-b border-[#E5E2DA]/50">
                <div className="flex -space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#E8F2ED] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#206E55]">AI</div>
                  <div className="w-7 h-7 rounded-full bg-sky-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-sky-600">MD</div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#141515]">AI-Assisted Dermatology Reference Check</span>
              </div>

              {/* Textarea Input area */}
              <form onSubmit={handleStartAnalysis} className="flex flex-col">
                <div className="p-5">
                  <textarea
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder="Describe your skin condition (e.g. Red, scaly rash on my arm for two weeks)..."
                    rows={3}
                    className="w-full text-base border-none outline-none resize-none placeholder-slate-400 text-[#141515] bg-transparent focus:ring-0 focus:outline-none"
                  />
                  
                  {/* Preset prompts inside simulator */}
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

                {/* Footer inside the card */}
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

        {/* ── CLINICAL TRUST GRID ── */}
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
      <section className="py-16 border-y border-[#E5E2DA] bg-[#F3F1EB]/20">
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
        
        {/* Article Header */}
        <div className="text-left sm:text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#206E55] mb-2">Clinical Architecture</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515]">
            Dermatological assistance that guides your care
          </h2>
        </div>

        {/* Card 1: Chat guidance */}
        <article className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 sm:gap-20">
          <div className="w-full lg:max-w-[480px] space-y-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#141515] leading-tight">
              Evaluate skin concerns in plain language
            </h3>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              Describe your symptoms directly. Medicus AI analyzes diagnostic indicators, evaluates severity levels, and presents clinical summaries without the medical jargon.
            </p>
            <div className="pt-2">
              <Link to="/analysis" className="inline-flex min-h-[50px] items-center justify-center gap-1.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] px-8 text-sm font-bold text-white transition-colors shadow-sm">
                Discuss symptoms
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          
          {/* Visual Container */}
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
                <div className="text-xs p-3 rounded-xl bg-slate-50 text-[#141515] font-medium max-w-[90%] self-end">
                  I noticed a red patch on my elbow. It\'s itchy and dry.
                </div>
                <div className="text-xs p-3 rounded-xl bg-[#E8F2ED] text-[#206E55] font-semibold max-w-[90%]">
                  Based on indicators, this matches Dermatitis (Eczema) with a 92% index. Keep hydrated, avoid hot baths, and consult a doctor.
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Match conditions */}
        <article className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 sm:gap-20">
          <div className="w-full lg:max-w-[480px] space-y-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#141515] leading-tight">
              Compare visual indicators immediately
            </h3>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              Match your photos and observations with our medical conditional mapping library. View diagnostic indexes, care guidelines, and clinical statistics instantly.
            </p>
            <div className="pt-2">
              <Link to="/analysis" className="inline-flex min-h-[50px] items-center justify-center gap-1.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] px-8 text-sm font-bold text-white transition-colors shadow-sm">
                Run comparative scan
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          
          {/* Visual Container */}
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

        {/* Card 3: Physician Ready PDF Report */}
        <article className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 sm:gap-20">
          <div className="w-full lg:max-w-[480px] space-y-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#141515] leading-tight">
              Physician-ready assessment reports
            </h3>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              Export a complete PDF summary detailing condition assessments, key findings, severity classifications, and preventative steps. Present it at your next doctor’s visit to fast-track your care path.
            </p>
            <div className="pt-2">
              <Link to="/analysis" className="inline-flex min-h-[50px] items-center justify-center gap-1.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] px-8 text-sm font-bold text-white transition-colors shadow-sm">
                Get PDF report sample
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          
          {/* Visual Container */}
          <div className="w-full lg:max-w-[500px] flex-shrink-0 bg-[#F3F1EB] rounded-3xl border border-[#E5E2DA] p-6 relative aspect-[4/3] flex items-center justify-center">
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm w-full space-y-3.5 max-w-[360px] text-left">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medicus Labs Report</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-[9px] font-bold text-amber-700 uppercase">Attention</span>
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-[#141515]">Key Findings</h5>
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
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-[#F3F1EB]/30 border-y border-[#E5E2DA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#141515] mb-4">
              Supported conditions library
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Check analysis accuracy across major clinical categories.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Condition List (Left) */}
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

            {/* Condition Detail Preview (Right) */}
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
                      
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
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

      {/* ── PUBLIC INFORMATION SECTION ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#206E55]">Public Portal</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#141515] mt-3 mb-4">
            Legal &amp; support documentation
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
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
                  className="group flex flex-col h-full min-h-[200px] rounded-3xl border border-[#E5E2DA] bg-white p-6 transition-all duration-300 hover:border-[#206E55]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#206E55]/2"
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
      </section>

      {/* ── VIDEO CALL TO ACTION ── */}
      <section className="relative z-10 border-t border-[#E5E2DA]">
        <VideoCtaSection />
      </section>

      {/* ── PREMIUM FOOTER ── */}
      <PremiumFooter />
    </div>
  );
};

export default Home;
