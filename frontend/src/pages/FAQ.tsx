import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Shield, Brain, FileText, MessageSquare } from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

type FAQItem = {
  question: string;
  answer: string;
  category: 'general' | 'accuracy' | 'privacy' | 'reports';
  icon: React.ComponentType<any>;
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    {
      question: 'What is Medicus Labs?',
      answer: 'Medicus Labs is an AI-powered dermatology analysis platform that uses advanced machine learning to identify skin conditions from images. Our system is designed to provide instant preliminary assessments to aid healthcare professionals and patients.',
      category: 'general',
      icon: HelpCircle,
    },
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI model achieves 94%+ accuracy on the ISIC dataset. However, AI analysis should always be reviewed by a qualified dermatologist. We provide confidence scores for each analysis to help gauge reliability.',
      category: 'accuracy',
      icon: Brain,
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes. All patient data is encrypted end-to-end using industry-standard protocols. We comply with HIPAA and GDPR regulations. Images are processed securely and can be deleted anytime from your dashboard.',
      category: 'privacy',
      icon: Shield,
    },
    {
      question: 'Can I use this for diagnosis?',
      answer: 'Medicus Labs provides preliminary analysis only and should not be used as a substitute for professional medical diagnosis. Always consult with a qualified dermatologist for diagnosis and treatment.',
      category: 'accuracy',
      icon: Brain,
    },
    {
      question: 'What skin conditions can be detected?',
      answer: 'We support detection of 8+ common dermatological conditions including Acne, Eczema, Psoriasis, Rosacea, Melanoma, Vitiligo, Dermatitis, and Fungal Infections. New conditions are being added regularly.',
      category: 'accuracy',
      icon: Brain,
    },
    {
      question: 'How do I upload an image?',
      answer: 'Navigate to the Analysis page, fill in patient information, and upload a clear skin image. The image should be well-lit and show the affected area clearly. Supported formats: PNG, JPG, GIF (up to 10MB).',
      category: 'reports',
      icon: FileText,
    },
    {
      question: 'Can I download the report?',
      answer: 'Yes! After analysis completes, you can download a detailed clinical PDF report including the uploaded image, AI predictions, confidence scores, and medical recommendations.',
      category: 'reports',
      icon: FileText,
    },
    {
      question: 'Is there a free trial?',
      answer: 'Medicus Labs is completely free to use. We believe in making AI-powered dermatology analysis accessible to everyone. Simply sign up, upload your skin images, and get instant AI analysis.',
      category: 'general',
      icon: HelpCircle,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'accuracy', label: 'AI & Accuracy' },
    { id: 'privacy', label: 'Privacy & Security' },
    { id: 'reports', label: 'Reports & Usage' },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500/10 selection:text-sky-900">
      <PremiumNavbar />

      <main className="relative pt-32 pb-24 px-4 sm:px-6">
        {/* Decorative background gradients */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-sky-100/30 via-slate-50/0 to-slate-50/0 pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-sky-400/5 to-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-12 shadow-xl shadow-slate-100/50 border border-slate-200/60">
            <div className="absolute inset-0">
              <img src="/media/hero-man-bench.jpg" alt="Medicus Labs Help" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply" />
            </div>
            <div className="relative z-10 py-16 px-8 text-center sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 tracking-wider uppercase mb-4">
                  FAQ & Knowledge Base
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  Have Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">We've Got Answers</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                  Learn how our clinical AI engine operates, understand our data security practices, and get instructions on uploading patient images.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Search Box */}
          <motion.div 
            className="relative mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all shadow-sm font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
              >
                Clear
              </button>
            )}
          </motion.div>

          {/* Categories Tab Selector */}
          <motion.div 
            className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenIndex(null);
                }}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* FAQ Accordion List */}
          <motion.div
            className="space-y-4 min-h-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const Icon = faq.icon;
                  const isOpen = openIndex === index;

                  return (
                    <motion.div
                      key={faq.question}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className={`uiverse-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen 
                          ? 'bg-white border-sky-200 shadow-lg shadow-sky-500/[0.02]' 
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl transition-colors ${
                            isOpen ? 'bg-sky-50 text-sky-600' : 'bg-slate-50 text-slate-500'
                          }`}>
                            <Icon size={20} />
                          </div>
                          <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                            isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-950'
                          }`}>
                            {faq.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`ml-4 flex-shrink-0 p-1.5 rounded-full ${
                            isOpen ? 'bg-sky-50 text-sky-600' : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 pl-[70px] border-t border-slate-50">
                              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center border border-dashed border-slate-300 rounded-3xl bg-white"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <HelpCircle size={28} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">No questions found</h3>
                  <p className="text-slate-500 max-w-sm mx-auto text-sm">
                    We couldn't find any FAQs matching "{searchQuery}". Try using different terms or contact our support.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA Box */}
          <motion.div
            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center relative overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Glowing effect inside card */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-sky-400" size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
              <p className="text-slate-400 text-sm sm:text-base mb-6 font-medium">
                Our support team is always ready to answer specific requests regarding medical reporting, data audits, or custom API access.
              </p>
              <a
                href="/contact"
                className="uiverse-btn inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-lg shadow-white/5"
              >
                Submit a Support Ticket
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
};

export default FAQ;
