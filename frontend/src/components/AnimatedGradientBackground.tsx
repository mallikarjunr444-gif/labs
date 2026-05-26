import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-medical-blue via-deep-blue to-cyan-glow opacity-30 animate-gradient-shift"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-glow rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float"
        initial={{ scale: 0.8, x: -100, y: -100 }}
        animate={{ scale: [0.8, 1.2, 0.8], x: ["-25%", "25%", "-25%"], y: ["-25%", "25%", "-25%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-medical-blue rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float delay-500"
        initial={{ scale: 1.2, x: 100, y: 100 }}
        animate={{ scale: [1.2, 0.8, 1.2], x: ["25%", "-25%", "25%"], y: ["25%", "-25%", "25%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

export default AnimatedGradientBackground;
