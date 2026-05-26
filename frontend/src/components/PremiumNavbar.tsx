import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const PremiumNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Analysis', href: '/analysis' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-deep-blue/40 backdrop-blur-xl border-b border-light-cyan/20 shadow-glow-sm'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative w-10 h-10 bg-gradient-to-br from-cyan-glow to-light-cyan rounded-lg flex items-center justify-center shadow-lg shadow-cyan-glow/30"
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 240, 255, 0.8)' }}
          >
            <span className="text-white font-bold text-xl">M</span>
          </motion.div>
          <span className="text-white font-bold text-xl hidden sm:inline bg-gradient-to-r from-cyan-glow to-light-cyan bg-clip-text text-transparent">
            Medicus Labs
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-cyan-glow transition relative text-sm font-medium group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-glow to-light-cyan group-hover:w-full transition-all duration-300"
              />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.a
            href="/analysis"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-glow to-light-cyan text-medical-blue font-bold text-sm shadow-lg shadow-cyan-glow/40 hover:shadow-glow-md transition-all duration-300 animate-pulse-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Analysis
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-deep-blue/50 backdrop-blur-xl border-t border-light-cyan/20 py-4 px-6 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="block text-gray-300 hover:text-cyan-glow font-medium"
              whileHover={{ x: 10 }}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="/analysis"
            className="block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-glow to-light-cyan text-medical-blue font-bold text-center shadow-lg shadow-cyan-glow/40"
          >
            Start Analysis
          </motion.a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default PremiumNavbar;
