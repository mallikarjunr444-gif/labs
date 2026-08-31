import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

const BlogEczema: React.FC = () => (
  <>
    <SEO
      title="Atopic Dermatitis & Eczema: Pathophysiology, Barrier Repair & AI Pre-Screening | Medicus Labs"
      description="In-depth clinical guide on Eczema (Atopic Dermatitis): filaggrin gene mutations, epidermal barrier repair, Th2 cytokine pathways, topical immunomodulators, and AI visual assessment."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A857A] mb-4">
          <Link to="/blog" className="hover:text-[#206E55]">Blog</Link>
          <span>/</span>
          <span className="text-[#206E55]">Atopic Dermatitis &amp; Eczema</span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: EA80
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Atopic Dermatitis &amp; Eczema: Epidermal Barrier Dysfunction, Immunological Pathways &amp; Moisture Protocols
        </h1>

        {/* Author Byline */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Labs Clinical Research Team
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

        {/* Top In-Article Leaderboard (High Viewability Above-the-Fold) */}
        <div className="mb-8 text-center">
          <AdSpace variant="leaderboard" />
        </div>

        {/* Main Content */}
        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">

          {/* Key Summary */}
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Pathology:</strong> Genetic filaggrin (FLG) deficiency causing stratum corneum disruption and immune dysregulation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Immune Driver:</strong> Predominantly Th2-mediated cytokine axis (IL-4, IL-13) causing intense pruritus.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Therapy:</strong> Ceramide-dominant emollients, topical corticosteroids, tacrolimus/pimecrolimus, and JAK inhibitors.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>AI Detection:</strong> Image feature extraction evaluates lichenification, erythema, and excoriation extent.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Epidermal Barrier Pathology</h2>
            <p>
              Atopic Dermatitis (AD), commonly referred to as eczema, is a chronic, relapsing, inflammatory skin disease characterized by intense pruritus, xerosis (dry skin), and erythematous papules or plaques. Affecting approximately 15%–20% of children and 3%–10% of adults globally, eczema imposes significant physical, psychological, and sleep-related burdens.
            </p>
            <p className="mt-4">
              At the molecular level, atopic dermatitis arises from a "outside-in" structural impairment combined with an "inside-out" immunological dysregulation. Loss-of-function mutations in the filaggrin (<em>FLG</em>) gene weaken the stratum corneum structure, leading to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 text-sm">
              <li>Increased Transepidermal Water Loss (TEWL) causing profound skin dehydration.</li>
              <li>Impaired natural moisturizing factor (NMF) synthesis, lowering cutaneous pH regulation.</li>
              <li>Enhanced transepidermal allergen penetration (house dust mites, pollens, microbial proteins).</li>
            </ul>
          </section>

          {/* Ad Container */}
          <AdSpace variant="rectangle" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Immunological Cascade &amp; Itch-Scratch Cycle</h2>
            <p>
              When environmental allergens breach the compromised skin barrier, keratinocytes release alarmins (TSLP, IL-33, IL-25). This activates type 2 innate lymphoid cells (ILC2s) and T-helper 2 (Th2) lymphocytes, which secrete high levels of pro-inflammatory cytokines:
            </p>
            <div className="bg-white border border-[#E5E2DA] p-6 rounded-2xl mt-4 space-y-3 text-sm">
              <p>• <strong>IL-4 &amp; IL-13:</strong> Suppress keratinocyte differentiation proteins (loricrin, involucrin) and amplify barrier damage.</p>
              <p>• <strong>IL-31:</strong> Acts directly on pruriceptive sensory neurons, generating severe, unrelenting itching.</p>
              <p>• <strong>Staphylococcus aureus Supercolonization:</strong> Over 90% of eczema patients harbor <em>S. aureus</em>, forming biofilms that exacerbate inflammatory flares.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">3. Clinical Subtypes &amp; Diagnostic Stages</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Stage</th>
                    <th className="p-3 border border-[#E5E2DA]">Predominant Physical Features</th>
                    <th className="p-3 border border-[#E5E2DA]">Typical Anatomic Distribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Infantile AD (0–2 yrs)</td>
                    <td className="p-3 border border-[#E5E2DA]">Acute edematous, weeping erythematous papules &amp; crusting.</td>
                    <td className="p-3 border border-[#E5E2DA]">Cheeks, scalp, trunk, and extensor surfaces of limbs.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Childhood AD (2–12 yrs)</td>
                    <td className="p-3 border border-[#E5E2DA]">Subacute dry, scaly plaques with early lichenification.</td>
                    <td className="p-3 border border-[#E5E2DA]">Flexural folds (antecubital &amp; popliteal fossae, wrists).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Adult AD (&gt;12 yrs)</td>
                    <td className="p-3 border border-[#E5E2DA]">Chronic thickened, lichenified plaques, hyperpigmentation.</td>
                    <td className="p-3 border border-[#E5E2DA]">Hands, eyelids, neck, flexural creases, and upper chest.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">4. Multi-Tiered Therapeutic Management</h2>
            <p>
              Optimal control requires combining daily proactive barrier restoration with reactive anti-inflammatory interventions:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-3 text-sm">
              <li><strong>Barrier Repair Therapy:</strong> Application of ceramide-dominant, 3:1:1 lipid ratio emollients within 3 minutes post-bathing ("soak and seal" method).</li>
              <li><strong>Topical Anti-Inflammatory Agents:</strong> Low to mid-potency topical corticosteroids (hydrocortisone, triamcinolone) or steroid-sparing topical calcineurin inhibitors (tacrolimus 0.03%–0.1%, pimecrolimus 1%).</li>
              <li><strong>Targeted Biologics &amp; Small Molecules:</strong> Subcutaneous Dupilumab/Tralokinumab (IL-4/IL-13 blockers) or oral JAK inhibitors (Upadacitinib, Abrocitinib) for severe refractor cases.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">5. Medicus Labs AI Eczema Assessment</h2>
            <p>
              Medicus AI analyzes cutaneous surface texture, erythema hue intensity, and spatial lesion boundaries to provide an objective initial SCORAD (Scoring Atopic Dermatitis) reference. Users can track flare progression over time and export validated clinical PDFs for their dermatologist.
            </p>
          </section>

          {/* References */}
          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific References &amp; Clinical Literature
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Wollenberg A, et al. European consensus-based guidelines for the treatment of atopic eczema in adults and children. <em>J Eur Acad Dermatol Venereol.</em> 2018;32(5):657-682.</li>
              <li>Boguniewicz M, Leung DY. Atopic dermatitis: a disease of altered skin barrier and immune dysregulation. <em>Immunol Rev.</em> 2011;242(1):233-246.</li>
              <li>WHO ICD-11 Code EA80: Atopic Eczema. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        {/* CTA */}
        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Your Eczema Patch with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Get instant visual score metrics, severity evaluation, and personalized skincare guidance.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free Eczema Analysis <ArrowRight size={16} />
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

export default BlogEczema;