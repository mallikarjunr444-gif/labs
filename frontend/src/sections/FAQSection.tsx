import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI has been trained on millions of clinical dermatology images and achieves 99.2% accuracy compared to clinical diagnosis. However, it should be used as a screening tool and not a replacement for professional medical consultation.',
    },
    {
      question: 'Is my patient data secure and HIPAA compliant?',
      answer: 'Yes, all patient data is encrypted end-to-end using AES-256 encryption. We are fully HIPAA compliant and follow all regulations for healthcare data protection. Images are automatically deleted after analysis.',
    },
    {
      question: 'Can reports be downloaded and shared with doctors?',
      answer: 'Absolutely. Our platform generates detailed PDF reports that can be downloaded and shared with healthcare professionals. Reports include analysis results, confidence scores, and recommendations.',
    },
    {
      question: 'Which skin conditions can be analyzed?',
      answer: 'We currently support analysis of 8+ dermatological conditions including acne, eczema, psoriasis, rosacea, melanoma, vitiligo, dermatitis, and fungal infections. Our AI continues to learn and expand its capabilities.',
    },
    {
      question: 'Is this a replacement for seeing a doctor?',
      answer: 'No. Medicus Labs™ is a screening and educational tool designed to complement professional medical care, not replace it. Always consult with a qualified dermatologist for diagnosis and treatment.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-accent-blue/10 to-transparent rounded-full blur-3xl"
          animate={{ x: [-50, 50, -50], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">Questions?</p>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">Frequently Asked</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">Everything you need to know about Medicus Labs™</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl overflow-hidden hover:border-accent-blue/30 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <span className="text-left text-lg font-semibold text-text-primary">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="text-accent-blue" size={24} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 px-8 py-6"
                  >
                    <p className="text-text-secondary leading-relaxed text-base">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent-blue/10 to-cyan-glow/10 border border-accent-blue/30 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-text-primary mb-3">Still have questions?</h3>
          <p className="text-text-secondary mb-6">
            Contact our support team or reach out directly. We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-accent-blue to-cyan-glow text-medical-blue rounded-lg font-semibold hover:shadow-glow-lg transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
