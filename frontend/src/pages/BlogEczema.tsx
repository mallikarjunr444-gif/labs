import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const BlogEczema: React.FC = () => (
  <>
    <SEO title="Eczema - Symptoms, Causes & AI Dermatology Insights | Medicus Labs" description="Learn about eczema (atopic dermatitis): causes, symptoms, triggers, treatments, and how AI analysis can help identify eczema patterns for better skin health." />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6"><Sparkles size={12} /> Blog / Eczema</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-4">Eczema (Atopic Dermatitis): Understanding & Managing Flare-Ups</h1>
        <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed mb-8">Last updated: July 2026 • Estimated reading time: 4 minutes</p>
        <div className="prose prose-sm max-w-none text-[#5A554A] space-y-6">
          <h2 className="text-2xl font-bold text-[#141515]">What is Eczema?</h2>
          <p>Eczema, also known as atopic dermatitis, is a chronic inflammatory skin condition characterized by dry, red, intensely itchy skin patches. It results from a compromised skin barrier and immune system hyper-reactivity.</p>
          <h2 className="text-2xl font-bold text-[#141515]">Common Symptoms</h2>
          <ul><li>Intense itching (pruritus), especially at night</li><li>Dry, scaly, or cracked skin patches</li><li>Red to dark-brownish patches on hands, feet, elbows, or knees</li><li>Small raised bumps that may leak fluid when scratched</li></ul>
          <h2 className="text-2xl font-bold text-[#141515]">Common Triggers</h2>
          <p>Environmental allergens, stress, weather changes, irritants like soaps, and certain foods can trigger flare-ups. Identifying personal triggers is essential for management.</p>
          <h2 className="text-2xl font-bold text-[#141515]">AI Analysis for Eczema</h2>
          <p>Upload a photo to Medicus Labs AI for instant analysis of eczema patterns, severity assessment, and clinical reference scores.</p>
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

export default BlogEczema;