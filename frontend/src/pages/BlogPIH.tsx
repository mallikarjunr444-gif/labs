import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogPIH: React.FC = () => (
  <>
    <SEO
      title="Post-Inflammatory Hyperpigmentation (PIH): Epidermal vs Dermal Melanin & Treatment | Medicus Labs"
      description="Clinical guide on Post-Inflammatory Hyperpigmentation (PIH): inflammatory melanogenesis, basal layer pigment incontinence, azelaic acid, tranexamic acid, chemical peels, and AI analysis."
    />
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] pt-32 selection:bg-[#0071e3]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Post-Inflammatory Hyperpigmentation' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-transparent text-[#6e6e73] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Pigmentary Dermatology • ICD-11: ED62
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
          Post-Inflammatory Hyperpigmentation (PIH): Epidermal vs. Dermal Melanin Dynamics &amp; Active Therapeutics
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#d2d2d7] mb-10 text-xs text-[#6e6e73]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#0071e3]" />
            <span className="font-bold text-[#1d1d1f]">Authored by:</span> Medicus Clinical Dermatology Group
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>11 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#0071e3] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        {/* Top In-Article Leaderboard (High Viewability Above-the-Fold) */}
        <div className="mb-8 text-center">
          <AdSpace variant="leaderboard" />
        </div>

        <div className="prose prose-slate max-w-none text-[#6e6e73] space-y-8 leading-relaxed">
          <div className="bg-[#eaf2fd]/60 border border-[#0071e3]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#0071e3] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#1d1d1f]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" /><span><strong>Pathology:</strong> Reactive hypermelanosis following inflammatory cutaneous injury (acne, eczema, laser trauma).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" /><span><strong>Depth Variant:</strong> Epidermal PIH (brown/tan, wood's lamp accentuation) vs Dermal PIH (slate gray, melanophages in dermis).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" /><span><strong>Key Actives:</strong> Azelaic Acid 15%-20%, Niacinamide 5%, Tranexamic Acid 3%, Alpha Arbutin, Glycolic Acid peels.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" /><span><strong>Fitzpatrick Impact:</strong> Exceedingly high prevalence in skin phototypes IV–VI.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">1. Inflammatory Melanogenesis Mechanics</h2>
            <p>Post-Inflammatory Hyperpigmentation arises when inflammatory mediators (prostaglandins E2/D2, leukotrienes C4/D4, histamine, IL-1) stimulate epidermal melanocyte synthesis and transfer of melanosomes to surrounding keratinocytes.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#d2d2d7]">
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#86868b] space-y-1.5 font-mono">
              <li>Chaowattanapanit S, et al. Postinflammatory hyperpigmentation: A comprehensive review for dermatologists. <em>J Am Acad Dermatol.</em> 2020;82(5):1061-1070.</li>
              <li>WHO ICD-11 Code ED62: Postinflammatory Hyperpigmentation. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#eaf2fd] via-white to-[#f5f5f7] border border-[#0071e3]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#1d1d1f] mb-2">Check Post-Acne Dark Spots with AI</h3>
          <p className="text-sm text-[#6e6e73] max-w-xl mx-auto mb-6">Upload photos of dark post-inflammatory spots for automated depth &amp; severity scoring.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#2997ff] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free PIH Scan <ArrowRight size={16} /></button></Link>
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

export default BlogPIH;
