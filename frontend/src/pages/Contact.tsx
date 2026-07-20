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
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Connect With Us
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#141515]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact our clinical{' '}
            <span className="text-[#206E55]">
              AI engineering team
            </span>
          </motion.h1>

          <motion.p
            className="text-[#5A554A] text-base sm:text-lg leading-relaxed"
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
                  className="p-6 rounded-3xl bg-white border border-[#E5E2DA] shadow-sm space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-lg text-[#141515]">{opt.title}</h3>
                  <p className="text-[#5A554A] text-xs leading-relaxed">{opt.desc}</p>
                  <span className="text-xs font-bold text-[#206E55] block pt-1">{opt.contact}</span>
                </motion.div>
              );
            })}

            {/* Medical Disclaimer Note */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-800 text-xs">
              <ShieldAlert size={18} className="flex-shrink-0 text-amber-600 mt-0.5" />
              <p>
                <strong>Emergency Note:</strong> If you are experiencing a medical emergency or severe acute symptoms, please contact local emergency services immediately.
              </p>
            </div>
          </div>

          {/* Form Column (Right) */}
          <motion.div
            className="lg:col-span-7 rounded-3xl bg-white border border-[#E5E2DA] p-8 sm:p-10 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-[#141515] mb-6">Send Us a Direct Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-[#5A554A] block mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Dr. John Smith"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] text-[#141515] placeholder-slate-400 text-sm focus:outline-none focus:border-[#206E55] transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5A554A] block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@hospital.org"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] text-[#141515] placeholder-slate-400 text-sm focus:outline-none focus:border-[#206E55] transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A554A] block mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Inquiry topic..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] text-[#141515] placeholder-slate-400 text-sm focus:outline-none focus:border-[#206E55] transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A554A] block mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can assist you..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] text-[#141515] placeholder-slate-400 text-sm focus:outline-none focus:border-[#206E55] transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
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
