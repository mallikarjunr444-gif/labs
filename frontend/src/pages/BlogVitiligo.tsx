import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogVitiligo: React.FC = () => (
  <>
    <SEO
      title="Vitiligo Pathophysiology, Melanocyte Autoimmunity & Repigmentation | Medicus Labs"
      description="Clinical reference guide on Vitiligo: CD8+ T-cell auto-destruction of melanocytes, IFN-gamma/CXCL10 axis, topical JAK inhibitors (Ruxolitinib), narrow-band UVB, and AI vision pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Vitiligo & Depigmentation' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: ED60
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Vitiligo: Autoimmune Melanocyte Destruction, IFN-&gamma; Signaling &amp; Emerging Repigmentation Therapies
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Mallikarjun R &amp; Medicus Clinical Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>12 min read</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold">
              <ShieldCheck size={14} />
              <span>Peer-Referenced</span>
            </div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Pathology:</strong> Autoimmune destruction of functional epidermal melanocytes by autoreactive CD8+ T-cells.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Chemokine Signaling:</strong> Interferon-gamma (IFN-&gamma;) driven CXCL9/CXCL10 chemokines recruit T-cells to melanocytes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Therapy Breakthrough:</strong> Topical JAK1/JAK2 inhibitor Ruxolitinib 1.5% cream combined with NB-UVB phototherapy.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Wood's Lamp Examination:</strong> Emits bright ivory-white fluorescence under 365nm UV light for depigmentation staging.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Autoimmune Etiology</h2>
            <p>
              Vitiligo is an acquired autoimmune dermatosis characterized by well-demarcated chalk-white depigmented macules and patches resulting from selective destruction of epidermal melanocytes. Affecting 0.5%–1% of the global population, vitiligo can present at any age and impacts patients of all Fitzpatrick skin phototypes.
            </p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific Citations
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Ezzedine K, et al. Vitiligo. <em>Lancet.</em> 2015;386(9988):74-84.</li>
              <li>Rosmarin D, et al. Two Phase 3 Trials of Ruxolitinib Cream for Vitiligo. <em>N Engl J Med.</em> 2022;387(16):1445-1455.</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Depigmented Spots with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Upload skin imagery to evaluate macule boundaries and repigmentation potential.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free Vitiligo Scan <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </article>

      <PremiumFooter />
    </div>
  </>
);

export default BlogVitiligo;
