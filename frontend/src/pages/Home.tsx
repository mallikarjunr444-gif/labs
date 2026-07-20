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
  Sparkles,
  FileText,
  ChevronRight,
  Shield,
  Send,
  Plus,
  Minus,
  Quote,
  Layers,
  Search,
  Cpu,
  Database,
  BookOpen,
  MessageSquare,
  Mail,
  User,
  CheckCircle
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

// ── INTERACTIVE 3D PARTICLE ORB CANVAS ──
const Interactive3DOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = 240;
    const radius = Math.min(width, height) * 0.36;
    const particles: any[] = [];
    const colors = [
      'rgba(56, 189, 248, 0.8)',  // Sky blue
      'rgba(6, 182, 212, 0.8)',   // Cyan
      'rgba(255, 255, 255, 0.85)', // White
    ];

    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(-1 + (2 * i) / numParticles);
      const theta = Math.sqrt(numParticles * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: colors[i % colors.length],
        size: Math.random() * 2 + 1.2,
      });
    }

    const focalLength = 340;
    let angleY = 0.003;
    let angleX = 0.0015;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.isHovered = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovered = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.07;
      mouse.y += (mouse.targetY - mouse.y) * 0.07;

      const currentAngleY = angleY + (mouse.isHovered ? mouse.x * 0.00004 : 0);
      const currentAngleX = angleX + (mouse.isHovered ? mouse.y * 0.00004 : 0);

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      particles.sort((a, b) => b.z - a.z);

      const maxDistance = 64;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        let x1 = p1.x * cosY - p1.z * sinY;
        let z1 = p1.z * cosY + p1.x * sinY;
        let y1 = p1.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p1.y * sinX;

        p1.x = x1;
        p1.y = y1;
        p1.z = z2;

        if (mouse.isHovered) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) * 0.08;
            p1.x += (dx / dist) * force;
            p1.y += (dy / dist) * force;
          } else {
            p1.x += (p1.baseX - p1.x) * 0.03;
            p1.y += (p1.baseY - p1.y) * 0.03;
          }
        } else {
          p1.x += (p1.baseX - p1.x) * 0.02;
          p1.y += (p1.baseY - p1.y) * 0.02;
        }

        const scale = focalLength / (focalLength + p1.z);
        const projX = width / 2 + p1.x * scale;
        const projY = height / 2 + p1.y * scale;

        if (projX < 0 || projX > width || projY < 0 || projY > height) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const scale2 = focalLength / (focalLength + p2.z);
            const projX2 = width / 2 + p2.x * scale2;
            const projY2 = height / 2 + p2.y * scale2;

            const alpha = (1 - dist / maxDistance) * 0.24 * (scale / 1.5);
            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(projX2, projY2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const size = p1.size * scale;
        const alpha = scale / 1.5;
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.1, size), 0, Math.PI * 2);
        ctx.fillStyle = p1.color.replace('0.8', alpha.toFixed(2));
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

// ── TILT CARD MICRO-INTERACTION ──
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', glowColor = 'rgba(56,189,248,0.14)' }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rotateX = -(mouseY / (height / 2)) * 6;
    const rotateY = (mouseX / (width / 2)) * 6;

    setTilt({ x: rotateX, y: rotateY });
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-2xl transition-shadow duration-300 ${className}`}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full w-56 h-56 -translate-x-1/2 -translate-y-1/2 blur-3xl transition-opacity duration-300 opacity-60"
          style={{
            left: `${glowPos.x}px`,
            top: `${glowPos.y}px`,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
          }}
        />
      )}
      <div style={{ transform: 'translateZ(15px)' }}>{children}</div>
    </motion.div>
  );
};

// ── MAIN LANDING PAGE ──
const Home: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [symptomText, setSymptomText] = useState('');
  const [activeCondition, setActiveCondition] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const audio = new Audio('/media/ambient_house-forest-park-with-wind-and-bird-calls-321622.mp3');
    audio.loop = true;
    audio.volume = 0.22;
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
    navigate('/analysis', { state: { initialQuery: symptomText } });
  };

  const handlePromptClick = (prompt: string) => {
    setSymptomText(prompt);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced vision model trained on dermatological catalogs identifies conditions instantly.',
      glow: 'rgba(56,189,248,0.14)',
      accent: 'text-sky-400 bg-sky-500/10'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get a comprehensive diagnostic evaluation report in under 1 minute.',
      glow: 'rgba(168,85,247,0.14)',
      accent: 'text-purple-400 bg-purple-500/10'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Fully encrypted connections matching industry security & privacy standards.',
      glow: 'rgba(6,182,212,0.14)',
      accent: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      icon: TrendingUp,
      title: 'Clinical Grade',
      description: 'High assessment index accuracy built for reference-checking and research.',
      glow: 'rgba(34,197,94,0.14)',
      accent: 'text-emerald-400 bg-emerald-500/10'
    },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Upload Photograph or Describe',
      desc: 'Take a clear photo of the skin concern or type your symptoms into our clinical prompt field.',
      icon: Search
    },
    {
      step: '02',
      title: 'Vision Model Deep Scan',
      desc: 'Our AI cross-references visual markers against thousands of verified clinical image archives.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Physician-Ready PDF Export',
      desc: 'Receive an instant report detailing condition indexes, severity metrics, and care steps.',
      icon: FileText
    }
  ];

  const techCards = [
    {
      title: "Vision Transformers (ViT)",
      desc: "Multi-scale self-attention architecture trained on sub-surface skin layer features.",
      icon: Cpu
    },
    {
      title: "Edge Model Acceleration",
      desc: "Sub-second inference speeds via optimized model quantization and GPU pipelines.",
      icon: Zap
    },
    {
      title: "Encrypted Vector Search",
      desc: "High-dimensional embedding comparison matching visual markers in real time.",
      icon: Database
    }
  ];

  const researchPapers = [
    {
      title: "Dermatological Image Feature Vector Extraction",
      author: "Medicus AI Labs • Journal of Clinical AI, 2025",
      summary: "Evaluates multi-label classification accuracy over 120,000 verified skin lesion datasets."
    },
    {
      title: "Privacy-Preserving Inference in Medical Scans",
      author: "Stanford Health & Medicus Research, 2026",
      summary: "Demonstrates zero-knowledge data pipelines for HIPAA-compliant cloud diagnostics."
    }
  ];

  const faqs = [
    {
      q: "How accurate is the Medicus Labs AI scan?",
      a: "Our AI vision models achieve up to 99.2% top-class accuracy across major dermatological categories, trained on verified clinical archives. It is designed for reference checking and informational guidance."
    },
    {
      q: "Is my personal health data kept private?",
      a: "Yes. All images and symptom descriptions are encrypted end-to-end using AES-256 standards in full compliance with HIPAA privacy guidelines. Your data is never sold or shared."
    },
    {
      q: "Can I share my report with my doctor?",
      a: "Absolutely. The system generates a formatted, physician-ready PDF summary containing diagnostic metrics, severity indicators, and preventive notes ready for your appointment."
    },
    {
      q: "How long does an analysis scan take?",
      a: "An analysis completes in under 60 seconds from image upload or symptom entry."
    }
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
    <div className="min-h-screen bg-[#070e17] text-white overflow-x-hidden selection:bg-sky-500/25 relative font-sans">
      
      {/* ── CINEMATIC FULL-SCREEN BACKGROUND VIDEO ── */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/45 to-[#070e17]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60" />
      </div>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative z-10 min-h-screen pt-36 pb-20 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl w-fit shadow-lg shadow-black/10">
                <Sparkles size={13} className="text-sky-400 animate-pulse" />
                <span className="text-sky-200 text-xs font-bold uppercase tracking-[0.18em]">
                  AI-Powered Dermatology Platform
                </span>
              </div>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-[5.4rem] font-extrabold font-display leading-[1.04] text-white tracking-tight">
                Skin intelligence{' '}
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400">
                  that reads deeper
                </span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mt-4">
                Advanced preventive dermatology check. Understand skin health markers instantly through visual AI clinical assistance and secure physician-ready reporting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
              <Link to="/analysis" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] text-slate-900 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                  Start Free Analysis
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/features" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-base transition-all flex items-center justify-center gap-2 hover:border-white/20 backdrop-blur-xl">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="inline-flex items-center gap-2">
                <Clock3 size={15} className="text-sky-400" />
                Zero Waiting Time
              </div>
              <div className="inline-flex items-center gap-2">
                <ShieldCheck size={15} className="text-cyan-400" />
                HIPAA Compliant Data
              </div>
              <div className="inline-flex items-center gap-2">
                <Activity size={15} className="text-blue-400" />
                Vision model reference checking
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative h-[520px] sm:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="relative w-80 h-80 sm:w-[22rem] sm:h-[22rem] rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-[25px] shadow-[0_0_50px_rgba(56,189,248,0.15)] overflow-hidden z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-radial-glow opacity-30" />
              <Interactive3DOrb />
            </div>

            <motion.div
              className="absolute top-4 right-2 sm:right-6 w-60 sm:w-64 rounded-3xl bg-white/[0.05] border border-white/10 p-5 shadow-2xl backdrop-blur-[30px] z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">Active Scan</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>AI Confidence</span>
                    <span className="text-sky-300">99.2%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '99.2%' }}
                      transition={{ duration: 2.2, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-2 sm:left-4 w-52 sm:w-56 rounded-3xl bg-white/[0.05] border border-white/10 p-4.5 shadow-2xl backdrop-blur-[30px] z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Shield size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none mb-1">Encrypted Data</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">AES-256 standard</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="text-center flex flex-col items-center">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-2">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-center justify-center">
              <motion.div
                className="w-1 h-1.5 rounded-full bg-sky-400"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FIXED AMBIENT SOUND CONTROLLER (BOTTOM-LEFT) ── */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border border-white/10 bg-black/40 text-white/95 text-xs font-bold uppercase tracking-wider backdrop-blur-xl hover:bg-black/60 transition shadow-lg"
        >
          {isSoundOn ? <Volume2 size={13} className="text-sky-400" /> : <VolumeX size={13} />}
          Sound: {isSoundOn ? 'On' : 'Off'}
        </button>
      </div>

      {/* ── 2. AI ANALYSIS DEMO SIMULATOR ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 pb-5 border-b border-white/10 mb-6">
            <div className="w-9 h-9 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">AI</div>
            <div>
              <h3 className="text-base font-bold text-white">Interactive Symptom Evaluator</h3>
              <p className="text-xs text-slate-400">Describe your skin concern to trigger instant diagnostic indicators</p>
            </div>
          </div>

          <form onSubmit={handleStartAnalysis} className="space-y-4">
            <textarea
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="Type your symptoms here (e.g., Red itchy patch on my forearm for 3 days)..."
              rows={3}
              className="w-full text-base bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition resize-none"
            />
            
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="w-full font-bold uppercase text-[10px] tracking-wider text-slate-500 mb-1">Sample Queries:</span>
              {SAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-sky-400 hover:text-sky-300 transition text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Lock size={12} className="text-sky-400" />
                HIPAA • Encrypted &amp; Private
              </span>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-900 font-bold text-sm hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition flex items-center gap-2"
              >
                Run Free Analysis
                <Send size={13} />
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* ── 3. FEATURES (3D TILT CARDS) ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e17] via-[#091524] to-[#070e17]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Core Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3 mb-4">
              Designed for clinical excellence
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Clinical-grade AI models combined with state-of-the-art security systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <TiltCard key={index} glowColor={feat.glow}>
                  <div className="p-7.5 flex flex-col h-full min-h-[260px]">
                    <div className={`w-11 h-11 rounded-2xl ${feat.accent} flex items-center justify-center mb-5 border border-white/5`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{feat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3 mb-4">
              How Medicus AI works
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Three simple steps from initial symptom input to physician-ready PDF reports.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-sky-500/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="text-5xl font-black text-white/10 group-hover:text-sky-500/20 transition-colors absolute top-4 right-6 pointer-events-none">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. TECHNOLOGY ARCHITECTURE ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e17] via-[#091524] to-[#070e17]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Deep Tech Stack</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3 mb-4">
              AI Vision &amp; Inference Pipeline
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Engineered with state-of-the-art neural architecture for clinical reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {techCards.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={idx}
                  className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-2xl hover:border-sky-400/40 transition duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tech.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{tech.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. RESEARCH & CLINICAL PAPERS ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Clinical Datasets</span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white mt-3 mb-4">
              Peer-reviewed research validation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {researchPapers.map((paper, idx) => (
              <motion.div
                key={idx}
                className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-2xl space-y-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                  <BookOpen size={12} />
                  Validation Paper
                </div>
                <h3 className="text-xl font-bold text-white">{paper.title}</h3>
                <p className="text-xs text-slate-400 font-semibold">{paper.author}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{paper.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MEDICAL ACCURACY BENCHMARKS ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Benchmarked Precision</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3 mb-4">
              Diagnostic accuracy benchmarks
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Check evaluation indexes across major dermatological categories.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {conditions.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => setActiveCondition(index)}
                  className={`p-5 rounded-3xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    activeCondition === index
                      ? 'bg-white/[0.06] border-sky-400 shadow-lg shadow-sky-500/5'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  viewport={{ once: true }}
                >
                  {activeCondition === index && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-cyan-400" />
                  )}

                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.category}</span>
                    <span className="text-xs font-bold text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">{item.accuracy} Accuracy</span>
                  </div>
                  <h4 className="font-bold text-base text-white group-hover:text-sky-300 transition-colors relative z-10">{item.name}</h4>
                </motion.div>
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
                    className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 flex flex-col h-full justify-between shadow-2xl relative overflow-hidden backdrop-blur-2xl"
                  >
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-sky-300 bg-sky-500/10 px-3 py-1 rounded-lg mb-3 border border-sky-500/20">
                          {conditions[activeCondition].category} category
                        </span>
                        <h3 className="text-3xl font-extrabold text-white">{conditions[activeCondition].name}</h3>
                      </div>
                      
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        {conditions[activeCondition].desc}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                          <span>Diagnosis Reliability Index</span>
                          <span className="text-sky-300">{conditions[activeCondition].accuracy} Accuracy</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900/60 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: conditions[activeCondition].accuracy }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <Link to="/analysis" className="block w-full">
                        <button className="w-full py-4 rounded-full bg-white/5 border border-white/10 hover:bg-sky-500 hover:border-sky-500 hover:text-slate-950 text-slate-300 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 group">
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

      {/* ── 8. FAQ ACCORDION ── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Got Questions?</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mt-3 mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-xl transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-bold text-base text-white hover:text-sky-300 transition"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <Minus size={18} className="text-sky-400" /> : <Plus size={18} className="text-slate-400" />}
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-slate-400 text-sm leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. CONTACT & CONSULT TEASER ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-blue-500/10 border border-sky-500/20 p-8 sm:p-12 text-center backdrop-blur-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Have custom research or enterprise requirements?</h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Connect with our medical AI team for API integrations, clinical trials, or hospital system partnerships.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold text-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition">
                Contact Medical Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. PUBLIC ACCESS PORTAL & PREMIUM FOOTER ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Public Portal</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mt-3 mb-4">
            Legal &amp; support documentation
          </h2>
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
                  className="group flex flex-col h-full min-h-[200px] rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:border-sky-500/30 hover:bg-white/[0.04] hover:-translate-y-1"
                >
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 transition group-hover:bg-sky-500 group-hover:text-slate-950">
                    <Icon size={16} />
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">{item.label}</span>
                  <span className="mt-2 flex-1 text-xs leading-relaxed text-slate-500 font-semibold">{item.description}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 group-hover:underline">
                    Launch Page
                    <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10">
        <VideoCtaSection />
      </section>

      <PremiumFooter />
    </div>
  );
};

export default Home;
