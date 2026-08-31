import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogRingworm: React.FC = () => (
  <>
    <SEO
      title="Tinea Corporis (Ringworm): Fungal Pathology, Diagnosis & Antifungal Care | Medicus Labs"
      description="Clinical guide on Tinea Corporis (Ringworm / Dermatophytosis): Trichophyton rubrum etiology, annular scaly plaque identification, KOH wet mount diagnosis, topical terbinafine, and AI vision pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Tinea Corporis (Ringworm)' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: 1F28
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Tinea Corporis (Ringworm): Dermatophyte Pathology, KOH Diagnosis &amp; Antifungal Protocols
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Research Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>11 min read</span>
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
                <span><strong>Etiology:</strong> Superficial dermatophyte infection of non-hairy skin by <em>Trichophyton rubrum</em> or <em>Microsporum canis</em>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Morphology:</strong> Annular (ring-shaped) erythematous plaque with active scaly border &amp; central clearing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Therapy:</strong> Topical allylamines (Terbinafine 1%) or imidazoles (Clotrimazole, Ketoconazole); oral itraconazole for extensive disease.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Diagnostic Pitfall:</strong> Misapplication of topical steroids causes "Tinea Incognito" and localized immunosuppression.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Fungal Keratinophilic Pathology</h2>
            <p>
              Tinea Corporis, commonly known as ringworm of the body, is a superficial fungal infection affecting the glabrous skin. Dermatophytes are keratinophilic fungi capable of digesting keratinized tissue in the stratum corneum, hair, and nails.
            </p>
            <p className="mt-4">
              Transmission occurs via direct contact with infected humans (anthropophilic species like <em>T. rubrum</em>), domestic animals (zoophilic species like <em>M. canis</em>), or contaminated fomites (fomitophilic).
            </p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Diagnostic Microscopic Confirmation</h2>
            <p>
              Definitive clinical confirmation involves Potassium Hydroxide (KOH 10–20%) direct microscopic preparation of skin scrapings taken from the active expanding lesion border, revealing translucent septate hyphae with arthroconidia.
            </p>
          </section>

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific Citations
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Sahoo AK, Mahajan R. Management of tinea corporis, tinea cruris, and tinea pedis: A comprehensive review. <em>Indian Dermatol Online J.</em> 2016;7(2):77-86.</li>
              <li>WHO ICD-11 Code 1F28: Dermatophytosis. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Fungal Lesions with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Upload a photo of annular red rings for instant fungal vs eczema differential reference scoring.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free Ringworm Scan <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </article>

      <PremiumFooter />
    </div>
  </>
);

export default BlogRingworm;
