import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  Check,
  ShieldAlert,
  Clock3,
  Stethoscope
} from 'lucide-react';
import { PremiumFooter } from '../sections';

const contactOptions = [
  {
    icon: Stethoscope,
    title: 'Clinical & Hospital Partners',
    desc: 'For hospital system integration, custom API deployments, and enterprise diagnostic tools.',
    contact: 'clinical@medicuslabs.ai',
  },
  {
    icon: MessageSquare,
    title: 'General Support & Feedback',
    desc: 'Questions regarding your analysis scans, account access, or PDF report exports.',
    contact: 'support@medicuslabs.ai',
  },
  {
    icon: MapPin,
    title: 'Research Headquarters',
    desc: 'Medicus AI Labs Inc. • 500 Medical Center Way, Suite 400, Boston, MA 02115',
    contact: 'Boston, MA',
  },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-white pt-32 selection:bg-sky-500/25 relative overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Connect With Us
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact our clinical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              AI engineering team
            </span>
          </motion.h1>

          <motion.p
            className="text-slate-400 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions about platform integration, security protocols, or diagnostic datasets? We are here to help.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Cards Column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            {contactOptions.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-lg text-white">{opt.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{opt.desc}</p>
                  <span className="text-xs font-bold text-sky-300 block pt-1">{opt.contact}</span>
                </motion.div>
              );
            })}

            {/* Medical Disclaimer Note */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-amber-200 text-xs">
              <ShieldAlert size={18} className="flex-shrink-0 text-amber-400 mt-0.5" />
              <p>
                <strong>Emergency Note:</strong> If you are experiencing a medical emergency or severe acute symptoms, please contact local emergency services immediately.
              </p>
            </div>
          </div>

          {/* Form Column (Right) */}
          <motion.div
            className="lg:col-span-7 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Direct Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Dr. John Smith"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@hospital.org"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Inquiry topic..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can assist you..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold text-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    Message Sent Successfully!
                    <Check size={16} />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </section>

      <PremiumFooter />
    </div>
  );
};

export default Contact;
