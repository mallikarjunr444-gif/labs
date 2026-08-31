import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

const BlogRosacea: React.FC = () => (
  <>
    <SEO
      title="Rosacea Subtypes & Management: Erythema, Papulopustular & AI Guidance | Medicus Labs"
      description="Clinical guide on Rosacea: neurovascular dysregulation, Demodex mite involvement, subtype I-IV classification, topical ivermectin, brimonidine, laser therapy, and AI differential diagnosis."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A857A] mb-4">
          <Link to="/blog" className="hover:text-[#206E55]">Blog</Link>
          <span>/</span>
          <span className="text-[#206E55]">Rosacea Subtypes</span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: ED90
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Rosacea Subtypes: Erythematotelangiectatic to Papulopustular — Clinical Signs &amp; Anti-Inflammatory Care
        </h1>

        {/* Author Byline */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Research Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>10 min read</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold">
              <ShieldCheck size={14} />
              <span>Peer-Referenced</span>
            </div>
          </div>
        </div>

        {/* Top In-Article Leaderboard (High Viewability Above-the-Fold) */}
        <div className="mb-8 text-center">
          <AdSpace variant="leaderboard" />
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">

          {/* Key Summary */}
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Pathology:</strong> Chronic neurovascular and innate immune dysfunction causing facial erythema.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Microbial Factor:</strong> Density elevation of <em>Demodex folliculorum</em> mites triggering LL-37 processing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Subtypes:</strong> Erythematotelangiectatic (ETR), Papulopustular (PPR), Phymatous, Ocular.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Therapy:</strong> Brimonidine, Oxymetazoline, Metronidazole, Ivermectin 1%, Doxycycline 40mg (sub-antimicrobial).</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Etiology &amp; Neurovascular Reactivity</h2>
            <p>
              Rosacea is a common chronic facial dermatosis affecting up to 10% of fair-skinned adults (Fitzpatrick skin types I and II). Characterized by persistent mid-facial erythema, flushing episodes, telangiectasias, and inflammatory papulopustules, rosacea significantly impacts self-esteem and social confidence.
            </p>
            <p className="mt-4">
              Pathophysiologic research reveals two central contributing mechanisms:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 text-sm">
              <li><strong>Innate Immune Dysregulation:</strong> Upregulation of cathelicidin antimicrobial peptide (LL-37) and its activating protease, kallikrein 5 (KLK5), triggering cutaneous angiogenesis and leukocyte infiltration.</li>
              <li><strong>Neurovascular Hyper-Reactivity:</strong> Transient Receptor Potential (TRP) ion channels (TRPV1, TRPA1) on sensory nerve endings trigger vasoactive neuropeptide release in response to heat, alcohol, spicy foods, and emotional stress.</li>
            </ul>
          </section>

          {/* Ad Container */}
          <AdSpace variant="rectangle" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Clinical Classification of Rosacea Subtypes</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">Subtype 1: Erythematotelangiectatic (ETR)</h4>
                <p className="text-xs text-[#5A554A] leading-relaxed">
                  Persistent central facial redness with prominent superficial telangiectasias. Burning and stinging sensations are common during flushing episodes.
                </p>
              </div>
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">Subtype 2: Papulopustular (PPR)</h4>
                <p className="text-xs text-[#5A554A] leading-relaxed">
                  Central facial erythema accompanied by small dome-shaped papules and sterile pustules. Distinct from acne due to the absence of comedones.
                </p>
              </div>
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">Subtype 3: Phymatous Rosacea</h4>
                <p className="text-xs text-[#5A554A] leading-relaxed">
                  Cutaneous tissue hypertrophy and nodular skin thickening, most commonly affecting the nose (rhinophyma). Highly male-predominant.
                </p>
              </div>
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">Subtype 4: Ocular Rosacea</h4>
                <p className="text-xs text-[#5A554A] leading-relaxed">
                  Ocular surface inflammation causing blepharitis, conjunctivitis, foreign body sensation, and telangiectasia of the lid margin.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">3. Evidence-Based Clinical Management</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Target Symptom</th>
                    <th className="p-3 border border-[#E5E2DA]">First-Line Interventions</th>
                    <th className="p-3 border border-[#E5E2DA]">Mechanism of Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Persistent Erythema</td>
                    <td className="p-3 border border-[#E5E2DA]">Brimonidine 0.33% gel or Oxymetazoline 1% cream.</td>
                    <td className="p-3 border border-[#E5E2DA]">Selective &alpha;1/&alpha;2 adrenergic receptor vasoconstriction.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Papules &amp; Pustules</td>
                    <td className="p-3 border border-[#E5E2DA]">Topical Ivermectin 1%, Metronidazole 0.75%, Azelaic Acid 15%.</td>
                    <td className="p-3 border border-[#E5E2DA]">Anti-inflammatory &amp; anti-Demodex mite eradication.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Refractory Inflammation</td>
                    <td className="p-3 border border-[#E5E2DA]">Sub-antimicrobial Doxycycline 40mg modified-release.</td>
                    <td className="p-3 border border-[#E5E2DA]">Inhibits matrix metalloproteinases (MMPs) without antimicrobial resistance.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Telangiectasias</td>
                    <td className="p-3 border border-[#E5E2DA]">Pulsed Dye Laser (PDL 595nm) or Intense Pulsed Light (IPL).</td>
                    <td className="p-3 border border-[#E5E2DA]">Selective photothermolysis of dilated dermal microvessels.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">4. Medicus AI Rosacea Differential Diagnosis</h2>
            <p>
              Medicus AI evaluates central facial erythema patterns to differentiate Rosacea from Systemic Lupus Erythematosus (Malar rash), Seborrheic Dermatitis, and Acne Vulgaris. It provides objective flushing severity indices to guide clinical consultation.
            </p>
          </section>

          {/* Scientific References */}
          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific Citations &amp; Clinical Sources
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Gallo RL, et al. Standard classification and pathophysiology of rosacea: 2017 update by the National Rosacea Society Expert Committee. <em>J Am Acad Dermatol.</em> 2018;78(1):148-155.</li>
              <li>van Zuuren EJ, et al. Interventions for rosacea. <em>Cochrane Database Syst Rev.</em> 2019;9(9):CD003262.</li>
              <li>WHO ICD-11 Code ED90: Rosacea. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        {/* CTA */}
        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Facial Redness with Medicus AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Upload a facial photo for instant erythema profiling, subtype indication, and clinical summary PDF generation.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free Rosacea Scan <ArrowRight size={16} />
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

export default BlogRosacea;
