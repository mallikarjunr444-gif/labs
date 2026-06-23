import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
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
      title: 'Email',
      value: 'support@medicuslabs.com',
      description: 'Get support within 24 hours',
    },
    {
      icon: Phone,
      title: 'Support Hours',
      value: 'Monday to Friday',
      description: 'General support for platform questions',
    },
    {
      icon: MapPin,
      title: 'Service Area',
      value: 'Online',
      description: 'Public users can contact us from anywhere',
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
    <div className="min-h-screen bg-white text-text-primary">
      <PremiumNavbar />

      <main className="relative px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
        {/* Background effects: use navbar screenshot as subtle backdrop */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="relative mb-10 w-full overflow-hidden rounded-2xl sm:mb-12">
            <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/45" />
            <div className="relative z-10 px-4 py-14 text-center sm:px-6 sm:py-20">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block text-[11px] font-bold text-white/85 tracking-[0.2em] uppercase mb-3">Get in Touch</span>
                <h1 className="font-display mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">Contact <span className="gradient-text">Our Team</span></h1>
                <p className="text-white/95 text-base max-w-2xl mx-auto">
                  Have a question about Medicus Labs, privacy, reports, or the AI skin-analysis workflow? Send a message and our team will review it as soon as possible.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8 lg:mb-16">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-cyan-glow/30 sm:p-6 lg:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-glow/10 flex items-center justify-center mb-4">
                  <info.icon className="text-accent-blue" size={24} />
                </div>
                <h3 className="font-semibold text-lg text-text-primary mb-2">{info.title}</h3>
                <p className="text-accent-blue font-medium mb-2">{info.value}</p>
                <p className="text-text-secondary text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-12 grid grid-cols-1 gap-5 lg:mb-16 lg:grid-cols-2 lg:gap-8">
            <motion.section
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-slate-950 mb-3">How we can help</h2>
              <p className="text-slate-600 leading-7 mb-5">
                Medicus Labs support is for platform questions, product feedback, privacy requests, and general help with public pages. We cannot diagnose, prescribe, or replace a licensed dermatologist.
              </p>
              <ul className="space-y-3">
                {supportTopics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-slate-600">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-sky-500" />
                    <span className="leading-7">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-slate-950 mb-3">Before you contact us</h2>
              <p className="text-slate-600 leading-7 mb-5">
                For the fastest response, include the page you were using, the device or browser, and a short description of the issue. Do not include more health information than needed for support.
              </p>
              <ul className="space-y-3">
                {publicNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-slate-600">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-slate-400" />
                    <span className="leading-7">{note}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
              {submitted && (
                <motion.div
                  className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <p className="text-green-400 text-sm font-medium">Message sent successfully! We'll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-base text-black placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-base text-black placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-base text-black placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-base text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition resize-none font-medium"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-glow to-blue-500 text-[#020617] font-bold text-sm flex items-center justify-center gap-2 shadow-glow-md hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#020617]/20 border-t-[#020617] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Map Section (placeholder) */}
          <motion.div
            className="mt-12 flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-accent-blue/5 to-cyan-glow/5 p-5 sm:mt-16 sm:h-80 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <MapPin className="text-accent-blue mx-auto mb-4" size={48} />
              <p className="text-text-secondary">San Francisco, CA</p>
              <p className="text-gray-600 text-sm">Headquarters</p>
            </div>
          </motion.div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
};

export default Contact;
