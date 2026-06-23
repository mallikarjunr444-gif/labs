import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Brain,
  Lock,
  TrendingUp,
  Volume2,
  VolumeX,
  MessageCircle,
  ShieldCheck,
  Clock3,
  Menu,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoCtaSection from '../components/VideoCtaSection';
import BrandLogo from '../components/BrandLogo';
import { PremiumFooter } from '../sections';
import { publicInfoLinks } from './PublicInfoPage';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const Home: React.FC = () => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isSoundOn, setIsSoundOn] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [parallax, setParallax] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const audio = new Audio('/media/ambient_house-forest-park-with-wind-and-bird-calls-321622.mp3');
    audio.loop = true;
    audio.volume = 0.22;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = React.useCallback(async () => {
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

  const features = [
    { icon: Brain, title: 'AI-Powered Detection', description: 'Advanced ML model identifies skin conditions instantly' },
    { icon: Zap, title: 'Instant Results', description: 'Get comprehensive analysis in under 1 minute' },
    { icon: Lock, title: 'Secure & Private', description: 'HIPAA compliant with end-to-end encryption' },
    { icon: TrendingUp, title: 'Clinical Grade', description: 'Medical-grade accuracy trusted by professionals' },
  ];

  const stats = [
    { value: '100K+', label: 'Images Analyzed' },
    { value: '94%', label: 'Average Accuracy' },
    { value: '8+', label: 'Conditions Detected' },
    { value: '24/7', label: 'Available' },
  ];

  const conditions = [
    { name: 'Acne Vulgaris', accuracy: '96%' },
    { name: 'Melanoma', accuracy: '94%' },
    { name: 'Eczema', accuracy: '92%' },
    { name: 'Psoriasis', accuracy: '93%' },
    { name: 'Rosacea', accuracy: '88%' },
    { name: 'Vitiligo', accuracy: '90%' },
    { name: 'Dermatitis', accuracy: '89%' },
    { name: 'Fungal Infections', accuracy: '91%' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 backdrop-blur-sm">
      <section
        className="relative min-h-screen overflow-hidden text-white"
        onMouseMove={(e) => {
          const { clientX, clientY, currentTarget } = e;
          const rect = currentTarget.getBoundingClientRect();
          const x = ((clientX - rect.left) / rect.width - 0.5) * 1.6;
          const y = ((clientY - rect.top) / rect.height - 0.5) * 1.6;
          setParallax({ x, y });
        }}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      >
        <img
          src="/media/hero-man-bench.jpg"
          alt="Calm outdoor scene"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
          style={{ transform: `scale(1.08) translate(${parallax.x * 8}px, ${parallax.y * 8}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60" />
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background:
              `radial-gradient(circle at ${50 + parallax.x * 8}% ${35 + parallax.y * 8}%, rgba(255,255,255,0.2), rgba(255,255,255,0) 55%)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.58),rgba(0,0,0,0)_55%)]" />

        <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
            

          

            <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center"
            style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
          >
            <span className="mb-6 inline-flex items-center rounded-full border border-white/25 bg-white/6 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm shadow-sm">
              #1 Skin AI Companion
            </span>
            <h1
              className="mx-auto max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.03] text-white animate-text-gradient sm:text-5xl lg:text-7xl"
              style={{ transform: `translateZ(40px) rotateX(0.8deg)` }}
            >
              Medicus Labs a health companion{' '}
              <br className="hidden sm:block" />
              that actually knows your skin
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/85 sm:mt-5 sm:text-lg">
              Personalized skin intelligence that helps you act early, stay informed,
              and connect with care when needed.
            </p>

            {/* App Store / Google Play removed per request */}

            <div className="mt-5 flex flex-col items-center gap-3 text-sm text-white/80 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5" style={{ transform: 'translateZ(20px)' }}>
              <div className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                Zero Waiting Time
              </div>
              <div className="inline-flex items-center gap-2">
                <ShieldCheck size={15} />
                Safe and Secure
              </div>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={toggleSound}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-white/90 backdrop-blur-md transition hover:bg-black/55 sm:mt-4"
          >
            {isSoundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            Ambient: {isSoundOn ? 'On' : 'Off'}
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose Medicus Labs?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Healthcare-grade AI with clinical accuracy and security
            </p>
          </motion.div>

              <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl glass-card glass-card-hover border-transparent hover:border-sky-300 transition-all group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-200 transition-colors">
                  <feature.icon className="text-sky-600" size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Supported Conditions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Conditions We Detect</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive analysis across major dermatological conditions with clinical-grade accuracy
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {conditions.map((condition, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-2xl glass-card glass-card-hover hover:border-sky-300 transition-all text-center group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">{condition.name}</p>
                <p className="text-sm font-semibold text-sky-600">{condition.accuracy} Accuracy</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Public Information */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Public Information</p>
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Important pages for every visitor</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              About Us, Contact Us, Privacy Policy, Terms & Conditions, and Disclaimer are available publicly from the home page.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {publicInfoLinks.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  to={item.to}
                  className="group flex h-full min-h-[180px] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-sky-300 hover:bg-white hover:shadow-lg"
                >
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 transition group-hover:bg-sky-600 group-hover:text-white">
                    <item.icon size={21} />
                  </span>
                  <span className="text-lg font-bold text-slate-950">{item.label}</span>
                  <span className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.description}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700">
                    View page
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <VideoCtaSection />

      <PremiumFooter />
    </div>
  );
};

export default Home;
