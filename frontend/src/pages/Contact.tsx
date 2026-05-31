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
      value: 'support@mediluslabs.com',
      description: 'Get support within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Monday to Friday, 9AM-6PM EST',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      description: 'Headquarters and support center',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <PremiumNavbar />

      <main className="relative pt-28 pb-20 px-4 sm:px-6">
        {/* Background effects: use navbar screenshot as subtle backdrop */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden mb-12">
            <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/45" />
            <div className="relative z-10 py-20 px-6 text-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block text-[11px] font-bold text-white/85 tracking-[0.2em] uppercase mb-3">Get in Touch</span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Contact <span className="gradient-text">Our Team</span></h1>
                <p className="text-white/95 text-base max-w-xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-white border border-white/[0.08] hover:border-cyan-glow/30 transition-all duration-300"
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

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-10 rounded-3xl bg-white border border-white/[0.08]">
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
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-accent-blue/5 to-cyan-glow/5 border border-white/[0.08] h-80 flex items-center justify-center"
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
