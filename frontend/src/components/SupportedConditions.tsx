import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'react-icons/fa';

const SupportedConditions = () => {
  const conditions = [
    {
      name: 'Eczema',
      description: 'Inflammatory skin condition characterized by itching and redness.',
      severity: 'Medium',
      color: 'from-orange-400 to-red-500',
    },
    {
      name: 'Acne',
      description: 'Common skin condition with pimples and inflamed tissue.',
      severity: 'Variable',
      color: 'from-pink-400 to-rose-500',
    },
    {
      name: 'Psoriasis',
      description: 'Autoimmune skin condition causing scaling and inflammation.',
      severity: 'Medium-High',
      color: 'from-red-400 to-orange-500',
    },
    {
      name: 'Rosacea',
      description: 'Chronic condition causing facial flushing and visible blood vessels.',
      severity: 'Mild-Medium',
      color: 'from-pink-500 to-purple-500',
    },
    {
      name: 'Melanoma',
      description: 'Serious form of skin cancer requiring immediate attention.',
      severity: 'High',
      color: 'from-gray-700 to-black',
    },
    {
      name: 'Vitiligo',
      description: 'Disorder causing loss of skin pigmentation in patches.',
      severity: 'Mild',
      color: 'from-gray-400 to-white',
    },
    {
      name: 'Dermatitis',
      description: 'Inflammatory skin reaction causing itching and irritation.',
      severity: 'Mild-Medium',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      name: 'Fungal Infection',
      description: 'Infection caused by fungi with various manifestations.',
      severity: 'Variable',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const next = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % conditions.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage + conditions.length) % conditions.length);
  };

  const visibleConditions = conditions.slice(currentIndex, currentIndex + itemsPerPage).concat(
    currentIndex + itemsPerPage > conditions.length
      ? conditions.slice(0, (currentIndex + itemsPerPage) % conditions.length)
      : []
  );

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Supported Conditions
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI model can analyze and identify a wide range of skin conditions with high accuracy.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {visibleConditions.slice(0, itemsPerPage).map((condition, idx) => (
                <motion.div
                  key={`${condition.name}-${currentIndex + idx}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl hover:border-white/30 transition overflow-hidden"
                  whileHover={{ y: -10 }}
                >
                  {/* Gradient background */}
                  <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${condition.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition`} />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{condition.name}</h3>
                      <motion.div
                        className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${condition.color} text-white`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {condition.severity}
                      </motion.div>
                    </div>

                    <p className="text-gray-400">{condition.description}</p>

                    {/* Progress bar */}
                    <motion.div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mt-6">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${condition.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <motion.button
              onClick={prev}
              className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(conditions.length / itemsPerPage) }).map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * itemsPerPage)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === Math.floor(currentIndex / itemsPerPage)
                      ? 'bg-cyan-400 w-8'
                      : 'bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedConditions;
