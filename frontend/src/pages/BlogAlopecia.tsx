import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogAlopecia: React.FC = () => (
  <>
    <SEO
      title="Alopecia Areata: Autoimmune Hair Loss, JAK Inhibitors & Dermoscopy | Medicus Labs"
      description="Clinical guide on Alopecia Areata: CD8+ T-cell autoimmune attack of hair follicles, immune privilege collapse, exclamation mark hairs, Baricitinib / Ritlecitinib JAK inhibitors, and AI pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Alopecia Areata' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Autoimmune Dermatology • ICD-11: ED70
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Alopecia Areata: Hair Follicle Immune Privilege Collapse, Exclamation Hairs &amp; JAK Inhibitor Breakthroughs
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Trichology Group
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>11 min read</span></div>
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
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Pathology:</strong> Non-scarring autoimmune hair loss characterized by collapse of hair follicle immune privilege.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Trichoscopy Marker:</strong> Pathognomonic "exclamation mark" hairs (tapered proximal shaft), black dots, and yellow dots.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Severity Range:</strong> Patchy Alopecia Areata, Alopecia Totalis (100% scalp loss), Alopecia Universalis (100% body loss).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>FDA-Approved JAK Inhibitors:</strong> Oral Baricitinib (JAK1/2) and Ritlecitinib (JAK3/TEC family).</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Immune Privilege Collapse</h2>
            <p>Alopecia Areata (AA) is an autoimmune non-scarring hair loss disorder affecting ~2% of the population worldwide. Anagen hair follicles normally express low MHC Class I molecules; breakdown of this immune privilege leads CD8+ NKG2D+ T-cells to swarm the bulb matrix.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Pratt CH, et al. Alopecia areata. <em>Nat Rev Dis Primers.</em> 2017;3:17011.</li>
              <li>WHO ICD-11 Code ED70: Alopecia Areata. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Patchy Hair Loss with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload scalp photos for automated hair patch density evaluation.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free Scalp Scan <ArrowRight size={16} /></button></Link>
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

export default BlogAlopecia;
