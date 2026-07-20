import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const BlogAcne: React.FC = () => (
  <>
    <SEO title="Acne Vulgaris - Causes, Treatments & AI Analysis | Medicus Labs" description="Learn about Acne Vulgaris: causes, symptoms, treatment options, prevention tips, and how AI-powered skin analysis can help identify acne patterns early." />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6"><Sparkles size={12} /> Blog / Acne</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-4">Acne Vulgaris: Causes, Treatments & AI Analysis</h1>
        <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed mb-8">Last updated: July 2026 • Estimated reading time: 5 minutes</p>
        <div className="prose prose-sm max-w-none text-[#5A554A] space-y-6">
          <h2 className="text-2xl font-bold text-[#141515]">What is Acne Vulgaris?</h2>
          <p>Acne Vulgaris is a common chronic inflammatory skin condition affecting the pilosebaceous units — the hair follicles and sebaceous glands. It affects up to 85% of adolescents and young adults worldwide, though it can persist into adulthood.</p>
          
          <h2 className="text-2xl font-bold text-[#141515]">Symptoms</h2>
          <ul><li>Whiteheads and blackheads (comedones)</li><li>Papules — small red, tender bumps</li><li>Pustules — papules with pus at the tip</li><li>Nodules — large, solid, painful lumps under the skin</li><li>Cystic lesions — deep, pus-filled, painful bumps</li></ul>
          
          <h2 className="text-2xl font-bold text-[#141515]">Causes & Risk Factors</h2>
          <p>Acne develops when hair follicles become clogged with oil and dead skin cells. Key factors include excess sebum production, bacteria (Cutibacterium acnes), hormonal changes, genetics, stress, and certain medications.</p>
          
          <h2 className="text-2xl font-bold text-[#141515]">Treatment Options</h2>
          <p>Treatment ranges from OTC benzoyl peroxide and salicylic acid to prescription retinoids, antibiotics, hormonal therapy, and isotretinoin for severe cases.</p>
          
          <h2 className="text-2xl font-bold text-[#141515]">AI Analysis for Acne</h2>
          <p>Medicus Labs AI can analyze skin photos to identify acne patterns, severity levels, and provide clinical reference scores to help you prepare for a dermatologist visit.</p>
        </div>
        <div className="mt-12 p-8 rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA] text-center">
          <h3 className="text-xl font-bold text-[#141515] mb-2">Analyze your skin with AI</h3>
          <p className="text-sm text-[#5A554A] mb-4">Upload a photo for instant clinical-grade analysis.</p>
          <Link to="/analysis"><button className="px-6 py-3 rounded-full bg-[#206E55] text-white font-bold text-sm hover:bg-[#408A6C] transition inline-flex items-center gap-2">Try Now <ArrowRight size={14} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogAcne;