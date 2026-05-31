import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is Medicus Labs?',
      answer: 'Medicus Labs is an AI-powered dermatology analysis platform that uses advanced machine learning to identify skin conditions from images. Our system is designed to provide instant preliminary assessments to aid healthcare professionals and patients.',
    },
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI model achieves 94%+ accuracy on the ISIC dataset. However, AI analysis should always be reviewed by a qualified dermatologist. We provide confidence scores for each analysis to help gauge reliability.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes. All patient data is encrypted end-to-end using industry-standard protocols. We comply with HIPAA and GDPR regulations. Images are processed securely and can be deleted anytime from your dashboard.',
    },
    {
      question: 'Can I use this for diagnosis?',
      answer: 'Medicus Labs provides preliminary analysis only and should not be used as a substitute for professional medical diagnosis. Always consult with a qualified dermatologist for diagnosis and treatment.',
    },
    {
      question: 'What skin conditions can be detected?',
      answer: 'We support detection of 8+ common dermatological conditions including Acne, Eczema, Psoriasis, Rosacea, Melanoma, Vitiligo, Dermatitis, and Fungal Infections. New conditions are being added regularly.',
    },
    {
      question: 'How do I upload an image?',
      answer: 'Navigate to the Analysis page, fill in patient information, and upload a clear skin image. The image should be well-lit and show the affected area clearly. Supported formats: PNG, JPG, GIF (up to 10MB).',
    },
    {
      question: 'Can I download the report?',
      answer: 'Yes! After analysis completes, you can download a detailed clinical PDF report including the uploaded image, AI predictions, confidence scores, and medical recommendations.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Medicus Labs is completely free to use. We believe in making AI-powered dermatology analysis accessible to everyone. Simply sign up, upload your skin images, and get instant AI analysis.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <PremiumNavbar />

      <main className="relative pt-28 pb-20 px-4 sm:px-6">
        {/* Background effects: hero image like Home */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0">
            <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="w-full h-full object-cover opacity-40" />
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden mb-12">
            <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/55" />
            <div className="relative z-10 py-20 px-6 text-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
              <span className="inline-block text-[11px] font-bold text-white/80 tracking-[0.2em] uppercase mb-3">
              Help & Support
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-white/90 text-base max-w-xl mx-auto">
              Find answers to common questions about Medicus Labs, how to use our platform, and more.
            </p>
          </motion.div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="rounded-2xl overflow-hidden bg-white border border-white/[0.08] hover:border-cyan-glow/30 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 md:px-8 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors duration-200 group"
                >
                  <h3 className="text-base md:text-lg font-semibold text-text-primary text-left group-hover:text-accent-blue transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="text-accent-blue" size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 py-5 border-t border-white/[0.05] bg-white/[0.02]">
                        <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent-blue/10 to-cyan-glow/10 border border-accent-blue/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-text-primary font-semibold mb-2">Didn't find what you're looking for?</p>
            <p className="text-text-secondary mb-4">
              Contact our support team for more detailed assistance.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-glow to-blue-500 text-[#020617] font-bold text-sm hover:shadow-glow-md transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
};

export default FAQ;
