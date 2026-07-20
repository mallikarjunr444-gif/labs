import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Minus, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';

const faqCategories = ['All', 'Accuracy & Models', 'Privacy & HIPAA', 'Reports & PDF'];

const allFaqs = [
  {
    category: 'Accuracy & Models',
    q: 'How accurate is the Medicus AI skin analysis model?',
    a: 'Our neural vision transformers achieve up to 99.2% top-class accuracy across major dermatological categories, benchmarked against over 120,000 verified clinical cases.',
  },
  {
    category: 'Accuracy & Models',
    q: 'Which skin conditions are supported by the analysis engine?',
    a: 'The system currently evaluates inputs across 8 major categories: Acne Vulgaris, Melanoma, Eczema, Psoriasis, Rosacea, Vitiligo, Dermatitis, and Fungal Infections.',
  },
  {
    category: 'Privacy & HIPAA',
    q: 'Is my uploaded skin image stored or sold?',
    a: 'No. All images are processed in volatile memory with instant cryptographic purge after feature extraction. Data is encrypted using AES-256 standards in full compliance with HIPAA & GDPR.',
  },
  {
    category: 'Privacy & HIPAA',
    q: 'Do I need an account to run a scan?',
    a: 'No, you can perform an instant preliminary scan without creating an account. Creating an account allows you to save scan history and export reports.',
  },
  {
    category: 'Reports & PDF',
    q: 'Can I present the exported PDF report to my doctor?',
    a: 'Yes. The system generates a formatted, physician-ready PDF summary containing diagnostic metrics, severity classifications, and baseline clinical notes specifically designed for medical intake.',
  },
  {
    category: 'Reports & PDF',
    q: 'How fast is a PDF report generated?',
    a: 'Reports are compiled and ready for PDF download in under 60 seconds.',
  },
];

const Faq: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070e17] text-white pt-32 selection:bg-sky-500/25 relative overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Help &amp; Knowledge Base
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              Questions
            </span>
          </motion.h1>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 text-sm transition"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 shadow-md'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Cards */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl overflow-hidden transition-all"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-bold text-base text-white hover:text-sky-300 transition"
              >
                <span className="pr-4">{faq.q}</span>
                {openIdx === idx ? <Minus size={18} className="text-sky-400 flex-shrink-0" /> : <Plus size={18} className="text-slate-400 flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-slate-400 text-sm leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions card */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-500/20 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
          <p className="text-slate-400 text-xs sm:text-sm">Our medical support team is available 24/7 to assist with platform technical questions.</p>
          <div>
            <Link to="/contact">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold text-xs hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition">
                Contact Clinical Support
              </button>
            </Link>
          </div>
        </div>

      </section>

      <PremiumFooter />
    </div>
  );
};

export default Faq;
