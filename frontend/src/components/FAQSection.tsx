import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'react-icons/fa';

const FAQSection = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI model has been trained on over 100,000 dermatological cases and achieves 98.5% accuracy in identifying common skin conditions. However, it should be used as a complementary tool alongside professional medical advice.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we use enterprise-grade encryption (AES-256) and comply with HIPAA, GDPR, and other healthcare regulations. Your data is never shared with third parties and can be deleted on request.',
    },
    {
      question: 'How long does analysis take?',
      answer: 'Skin analysis typically completes in 5-10 seconds. Your comprehensive clinical report is generated instantly after the analysis is complete.',
    },
    {
      question: 'Can I download my report?',
      answer: 'Absolutely! All analysis reports are available in PDF format and can be downloaded immediately. You can also share them with your healthcare provider.',
    },
    {
      question: 'What if the analysis is inconclusive?',
      answer: 'If the analysis is inconclusive, we recommend consulting with a dermatologist for professional medical evaluation. We will provide confidence scores to indicate reliability.',
    },
    {
      question: 'Do you offer integration with EHR systems?',
      answer: 'Yes, we offer API access for healthcare providers. Contact our enterprise team for integration details and custom implementations.',
    },
  ];

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/20 to-black" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about Medicus Labs
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition"
                whileHover={{ paddingLeft: 24 }}
              >
                <h3 className="text-lg font-bold text-white text-left">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: expanded === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-cyan-400" size={24} />
                </motion.div>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expanded === index ? 'auto' : 0,
                  opacity: expanded === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 border-t border-white/10 text-gray-400">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Our support team is here to help</p>
          <motion.a
            href="#contact"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
