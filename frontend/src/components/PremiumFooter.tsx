import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Linkedin, Twitter, Github } from 'react-icons/fa';

const PremiumFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Roadmap'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press'],
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms', 'HIPAA', 'Compliance'],
    },
  ];

  const socialLinks = [
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Github, url: '#', label: 'GitHub' },
    { icon: Mail, url: '#', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-black to-gray-950 pt-20 pb-8">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Medicus Labs
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Advanced AI-powered dermatology analysis for modern healthcare.
            </p>
            <p className="text-gray-600 text-xs mt-4">
              Advancing Intelligent Dermatology Assistance & Preventive Healthcare.
            </p>
          </motion.div>

          {/* Links columns */}
          {footerLinks.map((column, idx) => (
            <motion.div
              key={idx}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 1) * 0.1 }}
            >
              <h3 className="font-bold text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-gray-500 hover:text-cyan-400 transition text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Copyright and disclaimer */}
          <motion.div
            className="space-y-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>© {currentYear} Medicus Labs™. All rights reserved.</p>
            <p className="text-xs text-gray-700">
              This platform is for educational and informational purposes. Always consult with a qualified healthcare professional for medical advice.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex justify-end gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Made with love */}
        <motion.div
          className="mt-12 text-center text-gray-600 text-sm flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>Made with</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={16} className="text-red-500" />
          </motion.span>
          <span>for healthcare</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
