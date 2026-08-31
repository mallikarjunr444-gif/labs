import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, AlertCircle, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

const BlogAcne: React.FC = () => (
  <>
    <SEO
      title="Acne Vulgaris: Pathophysiology, Grading & Clinical Care | Medicus Labs"
      description="Comprehensive dermatological guide on Acne Vulgaris: pilosebaceous pathology, C. acnes etiology, Grade I–IV severity classification, topical retinoids, systemic treatments, and AI pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A857A] mb-4">
          <Link to="/blog" className="hover:text-[#206E55]">Blog</Link>
          <span>/</span>
          <span className="text-[#206E55]">Acne Vulgaris</span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: 8A40 / DA01
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Acne Vulgaris: Pathophysiology, Grade I–IV Classification &amp; Evidence-Based Clinical Management
        </h1>

        {/* Byline / Author Details */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Mallikarjun R (Founder) &amp; Medicus Labs Medical Team
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

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">

          {/* Key Clinical Summary Box */}
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Pathology:</strong> Chronic inflammation of pilosebaceous units driven by follicular hyperkeratinization and Cutibacterium acnes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Grading:</strong> Ranges from Grade I (Comedonal) to Grade IV (Nodulocystic &amp; Acne Conglobata).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>First-Line Therapy:</strong> Topical benzoyl peroxide, adapalene/tretinoin, and fixed-dose combination agents.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>AI Pre-Screening:</strong> Pattern recognition scores micro-comedones, inflammatory papules, and scarring potential.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Introduction &amp; Epidermal Pathophysiology</h2>
            <p>
              Acne Vulgaris is a multifactorial inflammatory disease affecting the pilosebaceous units — complex cutaneous structures consisting of a hair follicle and its associated sebaceous gland. It represents one of the most prevalent skin conditions globally, affecting over 85% of adolescents aged 12–24 and persisting into adulthood for up to 50% of women and 40% of men.
            </p>
            <p className="mt-4">
              The development of acne lesions involves four central pathogenic mechanisms that act synergistically:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-3 text-sm">
              <li><strong>Follicular Hyperkeratinization:</strong> Abnormal desquamation of keratinocytes lining the follicular infundibulum leads to microcomedone formation and lumen obstruction.</li>
              <li><strong>Hyperseborrhea:</strong> Androgen-stimulated elevation of sebum production provides a lipid-rich substrate for microbial colonization.</li>
              <li><strong>Cutibacterium acnes Proliferation:</strong> Anaerobic proliferation of <em>C. acnes</em> within clogged pores triggers Toll-like receptor 2 (TLR-2) activation.</li>
              <li><strong>Inflammatory Cascade:</strong> Release of pro-inflammatory cytokines (IL-1&alpha;, IL-8, TNF-&alpha;) and neutrophil chemotaxis resulting in papules, pustules, and deep nodules.</li>
            </ol>
          </section>

          {/* Ad Container */}
          <AdSpace variant="rectangle" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Clinical Classification &amp; Lesion Morphology</h2>
            <p>
              Dermatological evaluation categorizes acne lesions into non-inflammatory and inflammatory subtypes:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#141515] text-base mb-2">Non-Inflammatory Lesions</h4>
                <ul className="text-xs space-y-2">
                  <li><strong>Closed Comedones (Whiteheads):</strong> Small, pale skin-colored papules formed by completely obstructed follicular orifices containing sebum and keratin.</li>
                  <li><strong>Open Comedones (Blackheads):</strong> Dilated follicular openings with oxidized melanin and lipids producing dark central impactions.</li>
                </ul>
              </div>
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#141515] text-base mb-2">Inflammatory Lesions</h4>
                <ul className="text-xs space-y-2">
                  <li><strong>Papules:</strong> Raised erythematous bumps (&lt; 5mm) caused by localized perifollicular inflammation.</li>
                  <li><strong>Pustules:</strong> Superficial inflammatory lesions containing purulent exudate at the follicular apex.</li>
                  <li><strong>Nodules &amp; Cysts:</strong> Suppurative dermal lesions (&gt; 5mm) extending deep into subcutaneous tissues, carrying high risk of hypertrophic or atrophic scarring.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">3. Dermatological Severity Grading (Grade I to IV)</h2>
            <p>
              The Global Acne Severity Scale classifies severity to direct therapeutic decisions:
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Grade</th>
                    <th className="p-3 border border-[#E5E2DA]">Clinical Presentation</th>
                    <th className="p-3 border border-[#E5E2DA]">Primary Recommended Interventions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Grade I (Mild)</td>
                    <td className="p-3 border border-[#E5E2DA]">Predominantly comedonal; few scattered papules; no nodules.</td>
                    <td className="p-3 border border-[#E5E2DA]">Topical Retinoid (Adapalene 0.1%) + Salicylic Acid 2% cleanser.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Grade II (Moderate)</td>
                    <td className="p-3 border border-[#E5E2DA]">Multiple open/closed comedones, frequent papules, and mild pustules.</td>
                    <td className="p-3 border border-[#E5E2DA]">Fixed-dose combination Adapalene + Benzoyl Peroxide (BPO 2.5%).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Grade III (Severe)</td>
                    <td className="p-3 border border-[#E5E2DA]">Extensive papules, numerous pustules, and occasional painful nodules.</td>
                    <td className="p-3 border border-[#E5E2DA]">Oral antibiotic (Doxycycline/Lymecycline) + Topical BPO/Retinoid.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Grade IV (Very Severe)</td>
                    <td className="p-3 border border-[#E5E2DA]">Widespread nodulocystic lesions, sinus tracts, severe erythema &amp; scarring.</td>
                    <td className="p-3 border border-[#E5E2DA]">Oral Isotretinoin under strict specialist dermatological monitoring.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">4. Evidence-Based Therapeutic Regimens</h2>
            <p>
              Modern clinical guidelines emphasize early intervention to prevent post-inflammatory hyperpigmentation (PIH) and permanent scarring. Key treatment pillars include:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-3 text-sm">
              <li><strong>Topical Retinoids (Adapalene, Tretinoin, Trifarotene):</strong> Normalize follicular desquamation, exert anti-inflammatory effects, and clear microcomedones.</li>
              <li><strong>Benzoyl Peroxide (BPO 2.5% – 5%):</strong> Potent bactericidal agent generating free radicals against <em>C. acnes</em> without inducing bacterial resistance.</li>
              <li><strong>Azelaic Acid (15% – 20%):</strong> Exhibits dicarboxylic anti-bacterial and competitive tyrosinase inhibition properties, ideal for post-acne hyperpigmentation.</li>
              <li><strong>Oral Antibiotics &amp; Hormonal Regimens:</strong> Tetracyclines used short-term (8–12 weeks) alongside BPO to prevent resistance; anti-androgenic oral contraceptives or spironolactone for female hormonal acne.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">5. The Role of Medicus Labs AI Vision Pre-Screening</h2>
            <p>
              Medicus Labs employs multi-scale convolutional neural networks (CNNs) trained on dermatological archives (HAM10000, ISIC, DermNet) to analyze high-resolution facial imagery. The platform provides:
            </p>
            <div className="bg-[#FAF9F5] border border-[#E5E2DA] p-6 rounded-2xl mt-4 space-y-3 text-sm">
              <p>✔ <strong>Lesion Density Scoring:</strong> Automatically quantifies comedonal vs. inflammatory papular lesion count.</p>
              <p>✔ <strong>Scarring Risk Profiling:</strong> Evaluates dermal erythema intensity to flag early risk of boxcar or rolling atrophic scars.</p>
              <p>✔ <strong>Clinical PDF Export:</strong> Generates structured summary reports containing visual confidence maps for physician review.</p>
            </div>
          </section>

          {/* References & Citations */}
          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Peer-Reviewed References &amp; Scientific Sources
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Zaenglein AL, et al. Guidelines of care for the management of acne vulgaris. <em>J Am Acad Dermatol.</em> 2016;74(5):945-973.</li>
              <li>Thiboutot D, et al. Practical management of acne vulgaris: A consensus from the Global Alliance to Improve Outcomes in Acne. <em>J Am Acad Dermatol.</em> 2018;78(2S1):S1-S23.</li>
              <li>World Health Organization (WHO). International Classification of Diseases 11th Revision (ICD-11), Code 8A40 / DA01: Acne Vulgaris. 2024.</li>
            </ol>
          </section>
        </div>

        {/* Article Bottom Ad */}
        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        {/* Call to Action CTA */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Analyze Your Skin Spot with Medicus AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Upload a clear close-up photograph for instant clinical AI analysis, severity grading, and downloadable physician report.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free AI Skin Scan <ArrowRight size={16} />
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

export default BlogAcne;