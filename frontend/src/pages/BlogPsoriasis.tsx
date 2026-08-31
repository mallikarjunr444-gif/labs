import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

const BlogPsoriasis: React.FC = () => (
  <>
    <SEO
      title="Plaque Psoriasis & Autoimmune Dermatology: Pathogenesis & Biologics | Medicus Labs"
      description="Comprehensive clinical guide on Plaque Psoriasis: keratinocyte hyperproliferation, IL-23/IL-17 cytokine axis, PASI evaluation standards, phototherapy, biologics, and AI vision assessment."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A857A] mb-4">
          <Link to="/blog" className="hover:text-[#206E55]">Blog</Link>
          <span>/</span>
          <span className="text-[#206E55]">Psoriasis &amp; Autoimmune Dermatology</span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: EA90
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Plaque Psoriasis &amp; Autoimmune Dermatology: T-Cell Mediated Pathogenesis &amp; Biologic Therapies
        </h1>

        {/* Author Byline */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Mallikarjun R &amp; Medicus Clinical Review Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>13 min read</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold">
              <ShieldCheck size={14} />
              <span>Peer-Referenced</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">

          {/* Key Clinical Summary */}
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Pathology:</strong> Immune-mediated inflammatory disease driven by dendritic cell and T-cell activation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Cytokine Axis:</strong> IL-23/IL-17 inflammatory signaling accelerates epidermal turnover from 28 to 4 days.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Clinical Signs:</strong> Well-demarcated erythematous plaques with silvery-white micaceous scales (Auspitz sign).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Therapy:</strong> High-potency topical steroids, vitamin D analogues, narrow-band UVB phototherapy, and IL-17/IL-23 biologics.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Immunopathogenesis</h2>
            <p>
              Psoriasis is a chronic, non-communicable, systemic autoimmune dermatosis affecting approximately 2%–3% of the global population. While predominantly presenting as cutaneous plaques, psoriasis is increasingly recognized as a multi-system inflammatory condition associated with psoriatic arthritis (PsA), metabolic syndrome, and cardiovascular comorbidities.
            </p>
            <p className="mt-4">
              The hallmark of psoriasis is keratinocyte hyperproliferation coupled with aberrant epidermal differentiation. Normal epidermal turnover requires 28–30 days; in psoriatic lesions, this transit time is dramatically accelerated to 3–5 days.
            </p>
            <p className="mt-3">
              The pathogenic cascade relies on cross-talk between innate immune cells and T-lymphocytes:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-3 text-sm">
              <li><strong>Dendritic Cell Activation:</strong> Plasmacytoid dendritic cells produce IFN-&alpha; in response to antimicrobial peptide LL-37 self-DNA complexes.</li>
              <li><strong>IL-23 Production:</strong> Myeloid dendritic cells secrete Interleukin-23 (IL-23), stimulating differentiation and maintenance of Th17 and Tc17 cells.</li>
              <li><strong>IL-17 Release:</strong> Th17 cells release Interleukin-17A (IL-17A), Interleukin-17F, and IL-22, driving explosive epidermal hyperplasia and neutrophil recruitment (Munro microabscesses).</li>
            </ol>
          </section>

          {/* Ad Container */}
          <AdSpace variant="rectangle" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Clinical Phenotypes &amp; Diagnostic Markers</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">Major Clinical Subtypes</h4>
                <ul className="text-xs space-y-2">
                  <li><strong>Plaque Psoriasis (Psoriasis Vulgaris):</strong> Accounts for &gt;85% of cases; symmetrical erythematous plaques with thick silvery scales on elbows, knees, scalp, and lumbosacral region.</li>
                  <li><strong>Guttate Psoriasis:</strong> Sudden eruption of small drop-like papules, frequently triggered by preceding Group A Streptococcal pharyngitis.</li>
                  <li><strong>Inverse Psoriasis:</strong> Smooth, shiny red plaques in intertriginous folds (axillae, groin, inframammary) lacking micaceous scale.</li>
                  <li><strong>Pustular &amp; Erythrodermic Psoriasis:</strong> Life-threatening severe variants requiring urgent hospitalization and systemic monitoring.</li>
                </ul>
              </div>
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">Classic Physical Signs</h4>
                <ul className="text-xs space-y-2">
                  <li><strong>Auspitz Sign:</strong> Pinpoint punctate bleeding observed after mechanical scraping or removal of micaceous scales, reflecting dilated dermal capillaries.</li>
                  <li><strong>Koebner Phenomenon:</strong> Development of new psoriatic plaques along sites of mechanical cutaneous trauma or friction.</li>
                  <li><strong>Nail Psoriasis:</strong> Pitting, "oil-drop" discoloration, subungual hyperkeratosis, and onycholysis present in up to 50% of patients.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">3. PASI Scoring &amp; Severity Assessment</h2>
            <p>
              The Psoriasis Area and Severity Index (PASI) combines evaluation of lesion erythema, induration (thickness), and desquamation (scaling) across four anatomical body regions (head, trunk, upper extremities, lower extremities):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 text-sm">
              <li><strong>Mild Psoriasis:</strong> Body Surface Area (BSA) &lt; 3%, PASI &lt; 5.</li>
              <li><strong>Moderate-to-Severe Psoriasis:</strong> BSA &gt; 10%, PASI &gt; 10, or severe involvement of high-impact sites (hands, feet, scalp, genitals).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">4. Therapeutic Spectrum &amp; Biologic Breakthroughs</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Treatment Class</th>
                    <th className="p-3 border border-[#E5E2DA]">Mechanism / Specific Agents</th>
                    <th className="p-3 border border-[#E5E2DA]">Clinical Indication</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Topical Therapy</td>
                    <td className="p-3 border border-[#E5E2DA]">Clobetasol propionate + Calcipotriene (Vit D3 analogue), Tapinarof, Roflumilast.</td>
                    <td className="p-3 border border-[#E5E2DA]">Mild to moderate localized plaque psoriasis.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Phototherapy</td>
                    <td className="p-3 border border-[#E5E2DA]">Narrowband UVB (NB-UVB 311nm) or PUVA photochemotherapy.</td>
                    <td className="p-3 border border-[#E5E2DA]">Widespread moderate plaque &amp; guttate psoriasis.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Oral Systemics</td>
                    <td className="p-3 border border-[#E5E2DA]">Methotrexate, Cyclosporine, Acitretin, Apremilast (PDE4 inhibitor), Deucravacitinib.</td>
                    <td className="p-3 border border-[#E5E2DA]">Moderate-to-severe disease refractor to topicals.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">IL-17 / IL-23 Biologics</td>
                    <td className="p-3 border border-[#E5E2DA]">Secukinumab, Ixekizumab, Bimekizumab (IL-17 inhibitors); Guselkumab, Risankizumab (IL-23 inhibitors).</td>
                    <td className="p-3 border border-[#E5E2DA]">Severe psoriasis achieving PASI 90 to PASI 100 complete skin clearance.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">5. Medicus AI Psoriasis Pattern Recognition</h2>
            <p>
              Medicus AI isolates micaceous scaling reflections, plaque boundary sharpness, and erythema chroma index from smartphone photos. This yields an objective baseline reference to assist patients in tracking therapeutic responsiveness during topical or biologic treatment.
            </p>
          </section>

          {/* References */}
          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific Citations &amp; Clinical Sources
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Menter A, et al. Joint AAD-NPF guidelines of care for the management and treatment of psoriasis with biologics. <em>J Am Acad Dermatol.</em> 2019;80(4):1029-1072.</li>
              <li>Armstrong AW, Read C. Pathophysiology, Clinical Presentation, and Treatment of Psoriasis: A Review. <em>JAMA.</em> 2020;323(19):1945-1960.</li>
              <li>WHO ICD-11 Code EA90: Psoriasis. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        {/* CTA */}
        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Analyze Psoriasis Plaques with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Generate an instant visual plaque assessment report and share results with your rheumatologist or dermatologist.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free Psoriasis Analysis <ArrowRight size={16} />
            </button>
          </Link>
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

export default BlogPsoriasis;