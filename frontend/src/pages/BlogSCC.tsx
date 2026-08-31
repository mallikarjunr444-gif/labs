import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogSCC: React.FC = () => (
  <>
    <SEO
      title="Squamous Cell Carcinoma (cSCC): Progression, Dermoscopy & Excision | Medicus Labs"
      description="Clinical oncology guide on Cutaneous Squamous Cell Carcinoma (cSCC): TP53 UV mutations, progression from Actinic Keratosis, keratoacanthoma variant, surgical excision margins, and AI vision pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Squamous Cell Carcinoma' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Oncology Guide • ICD-11: 2C31.1
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Squamous Cell Carcinoma (cSCC): TP53 UV Mutations, Actinic Progression &amp; Surgical Management
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Oncology Group
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>13 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4 text-amber-900 text-sm">
            <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold mb-1">Clinical Warning</h4>
              <p>cSCC is the second most common skin cancer with potential for regional lymph node metastasis (2%–5%). High-risk anatomical sites (lip, ear, immunosuppressed hosts) require rapid surgical evaluation.</p>
            </div>
          </div>

          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Pathology:</strong> Malignant proliferation of epidermal keratinocytes displaying dyskeratosis and keratin pearl formation.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Precursor:</strong> Develops in up to 60% of cases from long-standing Actinic Keratosis lesions.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Therapy:</strong> Standard surgical excision with 4–6mm margins or Mohs Micrographic Surgery for high-risk zones.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Dermoscopy:</strong> White hyperkeratotic central core, targetoid hair follicles, and hairpin vessels.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; TP53 Mutational Dynamics</h2>
            <p>Cutaneous Squamous Cell Carcinoma (cSCC) represents 20% of non-melanoma skin cancers. Chronic ultraviolet B (UVB) radiation induces signature CC-&gt;TT pyrimidine transitions in the <em>TP53</em> tumor suppressor gene, preventing apoptosis of damaged keratinocytes.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Schmults CD, et al. NCCN Clinical Practice Guidelines in Oncology: Squamous Cell Skin Cancer. <em>J Natl Compr Canc Netw.</em> 2021;19(6):699-716.</li>
              <li>WHO ICD-11 Code 2C31.1: Squamous Cell Carcinoma of Skin. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Scan Scaly Hyperkeratotic Spots</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload photos of non-healing scaly nodules for AI cSCC risk evaluation.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free cSCC Scan <ArrowRight size={16} /></button></Link>
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

export default BlogSCC;
