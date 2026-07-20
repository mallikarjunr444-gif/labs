import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, Globe, Send, CheckCircle, User, FileText, MessageSquare, Zap, Shield, HeartPulse } from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const stats = [
    { value: '< 24h', label: 'Response Time', icon: Clock },
    { value: '99.9%', label: 'Uptime SLA', icon: Zap },
    { value: 'HIPAA', label: 'Compliant', icon: Shield },
    { value: '24/7', label: 'AI Available', icon: HeartPulse },
  ];

  const contactCards = [
    {
      icon: Mail, title: 'Email Support',
      value: 'medicuslabs.com@gmail.com', href: 'mailto:medicuslabs.com@gmail.com',
      desc: 'Clinical support team responds within 24 hours.',
      iconBg: 'bg-sky-50', iconColor: 'text-sky-600', border: 'hover:border-sky-300',
    },
    {
      icon: Clock, title: 'Support Hours',
      value: 'Mon – Fri · 9AM – 6PM', href: null,
      desc: 'Patient queries and system status updates.',
      iconBg: 'bg-violet-50', iconColor: 'text-violet-600', border: 'hover:border-violet-300',
    },
    {
      icon: Globe, title: 'Global Access',
      value: 'Worldwide · Cloud Platform', href: null,
      desc: 'Available from any device, anywhere on the globe.',
      iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', border: 'hover:border-emerald-300',
    },
  ];

  const inputBase = 'w-full pl-11 pr-4 py-3.5 rounded-2xl border text-slate-800 placeholder:text-slate-400 transition-all duration-200 font-medium text-sm outline-none bg-slate-50';
  const inputClass = (name: string) =>
    `${inputBase} ${focused === name ? 'border-sky-400 ring-4 ring-sky-400/10 bg-white' : 'border-slate-200 hover:border-slate-300'}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-100">
      <PremiumNavbar />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-96 h-72 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-violet-100/40 rounded-full blur-3xl pointer-events-none" />

        <motion.div className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold tracking-widest uppercase mb-6">
            <MessageSquare size={11} /> Get In Touch
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-[1.08] text-slate-900">
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500">
              Our Clinical Team
            </span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Questions about image analysis, reports, or privacy? We're here — expect a real human reply.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div className="relative z-10 max-w-2xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-sm">
                <Icon size={18} className="text-sky-500 mx-auto mb-2" />
                <p className="text-slate-900 font-extrabold text-lg leading-none">{s.value}</p>
                <p className="text-slate-400 text-xs font-semibold mt-1">{s.label}</p>
              </div>
            );
          })}
        </motion.div>
      </section>

      <main className="px-4 sm:px-6 pb-28 max-w-6xl mx-auto space-y-8">

        {/* ── Contact Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title}
                className={`bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm transition-all duration-300 group ${c.border} hover:shadow-md`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className={`w-11 h-11 rounded-2xl ${c.iconBg} ${c.iconColor} flex items-center justify-center mb-4`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} className="text-sky-600 font-semibold text-sm hover:text-sky-800 hover:underline transition block mb-2 truncate">{c.value}</a>
                ) : (
                  <p className="text-sky-600 font-semibold text-sm mb-2">{c.value}</p>
                )}
                <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Contact Form ── */}
        <motion.div className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg shadow-slate-100/60">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Send a Secure Message</h2>
              <p className="text-slate-400 text-sm">All messages are encrypted and handled by our clinical team.</p>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
                  <p className="text-emerald-700 text-sm font-semibold">Message sent! We'll respond within 24 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                  <User className="absolute left-3.5 bottom-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={16} />
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    placeholder="John Doe" required className={inputClass('name')} />
                </div>
                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                  <Mail className="absolute left-3.5 bottom-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={16} />
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="john@example.com" required className={inputClass('email')} />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Subject</label>
                <FileText className="absolute left-3.5 bottom-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={16} />
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                  placeholder="How can we help?" required className={inputClass('subject')} />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  placeholder="Describe your inquiry in detail..." required rows={5}
                  className={`${inputClass('message')} pl-4 resize-none`} />
              </div>

              <motion.button type="submit" disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/20 disabled:opacity-50 transition-all hover:shadow-sky-500/30 hover:from-sky-600 hover:to-cyan-600"
                whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Secure Message</>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* ── Global Network Banner ── */}
        <motion.div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1),transparent_70%)]" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-4">
              <Globe size={26} className="text-sky-400" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-2">Medicus Labs Global Network</h3>
            <p className="text-sky-400 font-semibold text-sm mb-3">Multi-Region Cloud · Sub-second AI Latency</p>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              HIPAA-compliant infrastructure across global edge locations. Your data never leaves its regional boundary.
            </p>
          </div>
        </motion.div>

      </main>
      <PremiumFooter />
    </div>
  );
};

export default Contact;
