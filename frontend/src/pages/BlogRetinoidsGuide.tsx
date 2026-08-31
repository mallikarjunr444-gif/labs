import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogRetinoidsGuide: React.FC = () => (
  <>
    <SEO
      title="Dermatological Retinoids Guide: Adapalene, Tretinoin, Retinol & Trifarotene | Medicus Labs"
      description="Clinical comparison of Retinoids: Retinoic Acid Receptor (RAR-alpha, beta, gamma) binding, Tretinoin vs Adapalene 0.1% vs Trifarotene vs Retinol, retinization side-effect management, and AI skin progress tracking."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Comprehensive Retinoids Guide' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Pharmacology &amp; Dermatology Guide
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Retinoids in Clinical Dermatology: Tretinoin, Adapalene, Trifarotene &amp; Retinol Compared
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Pharmacology Board
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>13 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        {/* Top In-Article Leaderboard (High Viewability Above-the-Fold) */}
        <div className="mb-8 text-center">
          <AdSpace variant="leaderboard" />
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Mechanism:</strong> Binds nuclear Retinoic Acid Receptors (RARs), normalizing epidermal differentiation &amp; boosting collagen type I.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Generations:</strong> 1st Gen (Tretinoin, Isotretinoin), 3rd Gen (Adapalene, Tazarotene), 4th Gen (Trifarotene - RAR-&gamma; selective).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Retinization Control:</strong> "Sandwich method" (moisturizer &rarr; retinoid &rarr; moisturizer) reduces erythema and scaling.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Stability Note:</strong> Adapalene is photostable and can be co-applied with Benzoyl Peroxide; Tretinoin degrades under UV light.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Receptor Binding Kinetics</h2>
            <p>Retinoids represent a class of synthetic and natural vitamin A derivatives that regulate gene transcription by binding nuclear RAR (&alpha;, &beta;, &gamma;) and RXR receptors in keratinocytes and dermal fibroblasts.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Zasada M, Budzisz E. Retinoids: active molecules influencing skin structure formation in cosmetic and dermatological treatments. <em>Postepy Dermatol Alergol.</em> 2019;36(4):392-397.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Track Retinoid Progress with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload skin photos bi-weekly to track pore clarity and fine wrinkle texture improvement.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free Scan <ArrowRight size={16} /></button></Link>
        </div>
      </article>

        {/* Desktop Sticky Skyscraper (160x600) */}
        <aside className="hidden 2xl:block w-[160px] shrink-0 sticky top-36 h-fit pt-8">
          <AdSpace variant="skyscraper" />
        </aside>
      </div>
      <PremiumFooter />
    </div>
  </>
);

export default BlogRetinoidsGuide;
