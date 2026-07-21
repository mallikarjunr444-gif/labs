import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import { getApiBaseUrl } from '../lib/apiBase';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const apiBase = getApiBaseUrl();
      let res = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Direct Website Inquiry',
          message: formData.message,
        }),
      });

      if (!res.ok) {
        res = await fetch('http://127.0.0.1:8000/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: 'Direct Website Inquiry',
            message: formData.message,
          }),
        });
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-full blur-3xl"
          animate={{ x: [50, -50, 50], y: [-30, 30, -30] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            className="flex flex-col gap-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">Get In Touch</p>
              <h2 className="text-5xl md:text-6xl font-bold text-text-primary leading-tight">
                Contact Our <span className="bg-gradient-to-r from-accent-blue to-cyan-glow bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-text-secondary mt-6 text-lg">
                Have questions about Medicus Labs™? We'd love to hear from you. Reach out and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'support@mediculabs.com' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-glow/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-accent-blue" size={24} />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm font-medium">{item.label}</p>
                    <p className="text-text-primary text-lg font-semibold">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 md:p-12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all duration-300"
                  required
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  className="w-full rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all duration-300 resize-none"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-accent-blue to-cyan-glow text-medical-blue rounded-lg font-bold flex items-center justify-center gap-2 shadow-glow-lg hover:shadow-glow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
