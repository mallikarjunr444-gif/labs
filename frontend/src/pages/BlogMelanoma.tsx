import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const BlogMelanoma: React.FC = () => (
  <>
    <SEO title="Melanoma - Early Detection & AI Skin Cancer Analysis | Medicus Labs" description="Learn about melanoma skin cancer: ABCDE signs, early detection, risk factors, treatment options, and how AI analysis can help with early melanoma identification." />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6"><Sparkles size={12} /> Blog / Melanoma</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-4">Melanoma: Early Detection Saves Lives</h1>
        <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed mb-8">Last updated: July 2026 • Estimated reading time: 5 minutes</p>
        <div className="prose prose-sm max-w-none text-[#5A554A] space-y-6">
          <h2 className="text-2xl font-bold text-[#141515]">What is Melanoma?</h2>
          <p>Melanoma is the most serious form of skin cancer, developing in melanocytes (pigment-producing cells). Early detection dramatically improves outcomes, with a 99% 5-year survival rate when caught early.</p>
          <h2 className="text-2xl font-bold text-[#141515]">The ABCDE Rule</h2>
          <ul><li><strong>A</strong>symmetry — one half doesn't match the other</li><li><strong>B</strong>order — irregular, ragged, or blurred edges</li><li><strong>C</strong>olor — uneven shades of brown, black, or other colors</li><li><strong>D</strong>iameter — larger than 6mm (pencil eraser size)</li><li><strong>E</strong>volving — changing in size, shape, or color</li></ul>
          <h2 className="text-2xl font-bold text-[#141515]">Risk Factors</h2>
          <p>UV exposure, fair skin, family history, multiple moles, and weakened immune system increase risk.</p>
          <h2 className="text-2xl font-bold text-[#141515]">AI Analysis for Melanoma Detection</h2>
          <p>Medicus Labs AI can analyze skin lesions for potential melanoma indicators. Upload a photo for instant clinical reference.</p>
        </div>
        <div className="mt-12 p-8 rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA] text-center">
          <h3 className="text-xl font-bold text-[#141515] mb-2">Analyze your skin with AI</h3>
          <Link to="/analysis"><button className="px-6 py-3 rounded-full bg-[#206E55] text-white font-bold text-sm hover:bg-[#408A6C] transition inline-flex items-center gap-2">Try Now <ArrowRight size={14} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogMelanoma;