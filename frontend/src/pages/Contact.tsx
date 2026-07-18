import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, User, FileText, Globe } from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);

    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@medicuslabs.com',
      description: 'Get responses from our clinical support team within 24 hours.',
    },
    {
      icon: Phone,
      title: 'Support Hours',
      value: 'Monday to Friday',
      description: 'General support for patient queries and system status updates.',
    },
    {
      icon: MapPin,
      title: 'Service Access',
      value: 'Online Worldwide',
      description: 'Patients and medical personnel can access support from anywhere.',
    },
  ];

  const supportTopics = [
    'Questions about using the skin image analysis workflow',
    'Help with uploaded image quality, report access, or result interpretation',
    'Privacy questions, data deletion requests, and account support',
    'Feedback from students, users, healthcare workers, and reviewers',
  ];

  const publicNotes = [
    'This contact page is public and can be viewed without logging in.',
    'Please do not send emergency medical requests through this form.',
    'For urgent symptoms, contact a doctor, dermatologist, clinic, or local emergency service.',
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500/10 selection:text-sky-900">
      <PremiumNavbar />

      <main className="relative pt-32 pb-24 px-4 sm:px-6">
        {/* Decorative ambient blobs */}
        <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-12 shadow-xl shadow-slate-100/50 border border-slate-200/60">
            <div className="absolute inset-0">
              <img src="/media/hero-man-bench.jpg" alt="Contact Medicus Labs" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply" />
            </div>
            <div className="relative z-10 py-16 px-8 text-center sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 tracking-wider uppercase mb-4">
                  Get In Touch
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">Our Clinical Team</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                  Have inquiries regarding HIPAA audits, image classification accuracy, or downloading reports? Reach out below.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Quick Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 lg:mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  className="uiverse-card rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">{info.title}</h3>
                  <p className="text-sky-600 font-semibold text-sm mb-2">{info.value}</p>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-auto font-medium">{info.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Guidance Info Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:mb-16">
            <motion.section
              className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-sky-500 rounded-full inline-block" />
                How we can help
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Medicus Labs support is for platform questions, product feedback, privacy requests, and general help with public pages. We cannot diagnose, prescribe, or replace a licensed dermatologist.
              </p>
              <ul className="space-y-4 mt-auto">
                {supportTopics.map((topic, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm sm:text-base">
                    <CheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={16} />
                    <span className="leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 sm:p-8 shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-slate-400 rounded-full inline-block" />
                Medical Disclaimer Notice
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                For the fastest response, include the page you were using, the device or browser, and a short description of the issue. Do not include more health information than needed for support.
              </p>
              <ul className="space-y-4 mt-auto">
                {publicNotes.map((note, i) => (
                  <li key={i} className="flex gap-3 text-slate-500 font-medium text-sm sm:text-base">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg shadow-slate-100/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Send Us a Secure Message</h2>

              {submitted && (
                <motion.div
                  className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
                  <p className="text-emerald-700 text-sm font-semibold">Message sent successfully! We'll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition font-semibold text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition font-semibold text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Subject</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition font-semibold text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Message Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition resize-none font-semibold text-sm sm:text-base"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="uiverse-btn w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!loading ? { scale: 1.01 } : {}}
                  whileTap={!loading ? { scale: 0.99 } : {}}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      Send Secure Message
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Interactive World Map Section */}
          <motion.div
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm text-center relative overflow-hidden h-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Ambient map background grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 relative">
                <span className="absolute inset-0 rounded-2xl bg-sky-400/20 animate-ping pointer-events-none" />
                <Globe size={28} className="relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Medicus Labs Global Network</h3>
              <p className="text-sky-600 font-semibold text-sm mb-2">San Francisco, CA — Headquarters</p>
              <p className="text-slate-500 text-sm max-w-md mx-auto font-medium">
                Our secure HIPAA-compliant cloud processing servers run across multiple global edge locations to ensure sub-second AI latency.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
};

export default Contact;
