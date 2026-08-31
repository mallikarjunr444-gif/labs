import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogSeborrheicDermatitis: React.FC = () => (
  <>
    <SEO
      title="Seborrheic Dermatitis: Scalp Care, Malassezia Yeast & Anti-Fungal Regimens | Medicus Labs"
      description="Clinical guide on Seborrheic Dermatitis: Malassezia globosa etiology, sebaceous gland distribution, scalp dandruff, facial erythema, ketoconazole 2%, selenium sulfide, and AI pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Seborrheic Dermatitis' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: EA81
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Seborrheic Dermatitis: Malassezia Yeast Etiology, Scalp Care &amp; Anti-Fungal Regimens
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Research Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>12 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Pathology:</strong> Chronic papulosquamous dermatosis targeting sebaceous-rich anatomical regions.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Microbial Driver:</strong> Overgrowth of lipophilic yeast <em>Malassezia globosa/restricta</em> cleaving sebum triglycerides.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Therapy:</strong> Ketoconazole 2%, Ciclopirox olamine, Zinc Pyrithione, and short-term topical hydrocortisone.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Distribution:</strong> Scalp, nasolabial folds, eyebrow margins, retroauricular, and sternal skin.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Etiology &amp; Pathophysiology</h2>
            <p>Seborrheic Dermatitis is a common, chronic, relapsing inflammatory skin disorder affecting 3%–5% of the general population and up to 50% of adults in its mildest scalp form (dandruff). It displays a bimodal age distribution, occurring in infants (cradle cap) and adults aged 30–60.</p>
            <p className="mt-4">The pathophysiologic mechanism involves three interacting factors: sebaceous secretion quantity, <em>Malassezia</em> yeast metabolic activity releasing free fatty acids (oleic acid), and individual host immune susceptibility.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Clinical Presentation &amp; Anatomic Distribution</h2>
            <p>Lesions present as ill-defined erythematous patches covered with greasy yellowish scales. Common sites include the scalp vertex, glabella, nasolabial sulci, external auditory canal, and pre-sternal chest.</p>
          </section>

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Borda LJ, Wikramanayake TC. Seborrheic Dermatitis and Dandruff: A Comprehensive Review. <em>J Clin Investig Dermatol.</em> 2015;3(2):10.13188.</li>
              <li>WHO ICD-11 Code EA81: Seborrhoeic Dermatitis. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Analyze Scalp &amp; Facial Redness with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload a photo for instant seborrheic dermatitis vs psoriasis differential analysis.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free AI Scan <ArrowRight size={16} /></button></Link>
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

export default BlogSeborrheicDermatitis;
