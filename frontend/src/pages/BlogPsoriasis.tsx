import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const BlogPsoriasis: React.FC = () => (
  <>
    <SEO title="Psoriasis - Autoimmune Causes & AI Analysis | Medicus Labs" description="Learn about psoriasis: an autoimmune skin condition causing rapid skin cell buildup. Understand symptoms, triggers, treatments, and how AI analysis helps." />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6"><Sparkles size={12} /> Blog / Psoriasis</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-4">Psoriasis: Understanding the Autoimmune Skin Condition</h1>
        <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed mb-8">Last updated: July 2026 • Estimated reading time: 4 minutes</p>
        <div className="prose prose-sm max-w-none text-[#5A554A] space-y-6">
          <h2 className="text-2xl font-bold text-[#141515]">What is Psoriasis?</h2>
          <p>Psoriasis is a chronic autoimmune condition that accelerates skin cell growth, causing thick, scaly patches on the skin. It affects approximately 2-3% of the global population.</p>
          <h2 className="text-2xl font-bold text-[#141515]">Common Symptoms</h2>
          <ul><li>Thick, red patches covered with silvery-white scales</li><li>Dry, cracked skin that may bleed</li><li>Itching, burning, or soreness</li><li>Thickened, pitted, or ridged nails</li></ul>
          <h2 className="text-2xl font-bold text-[#141515]">Common Triggers</h2>
          <p>Stress, infections, cold weather, skin injuries, certain medications, and lifestyle factors like smoking and alcohol can trigger flare-ups.</p>
          <h2 className="text-2xl font-bold text-[#141515]">AI Analysis for Psoriasis</h2>
          <p>Upload a photo to Medicus Labs AI for instant analysis of psoriasis patterns, severity assessment, and clinical reference scores to discuss with your dermatologist.</p>
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

export default BlogPsoriasis;