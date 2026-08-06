import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';

const BlogMelanoma: React.FC = () => (
  <>
    <SEO
      title="Melanoma & Dysplastic Nevi: Early Detection, ABCDE Rule & AI Screening | Medicus Labs"
      description="Clinical reference guide on Melanoma skin cancer: ABCDE & EFG diagnostic rules, melanocyte transformation, dermoscopy criteria, Breslow depth staging, and AI early vision screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A857A] mb-4">
          <Link to="/blog" className="hover:text-[#206E55]">Blog</Link>
          <span>/</span>
          <span className="text-[#206E55]">Melanoma Screening</span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Oncology &amp; Dermatology • ICD-11: 2C30
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Melanoma &amp; Dysplastic Nevi: Diagnostic ABCDE Evaluation, Dermoscopy &amp; AI Early Warning
        </h1>

        {/* Author Byline */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Mallikarjun R &amp; Medicus Clinical Vision Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>14 min read</span>
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

          {/* Warning Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4 text-amber-900 text-sm">
            <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold mb-1">Urgent Clinical Notice</h4>
              <p>
                Melanoma is a high-grade cutaneous malignancy. Early intervention yields a 5-year survival rate exceeding 99%. Any suspicious, evolving, or bleeding mole requires immediate evaluation by a board-certified dermatologist.
              </p>
            </div>
          </div>

          {/* Key Clinical Summary */}
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Pathology:</strong> Malignant transformation of melanocytes driven by somatic mutations (BRAF V600E, NRAS, TERT promoter).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Primary Screening:</strong> The ABCDE rule and "Ugly Duckling" sign for atypical nevi identification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Prognostic Marker:</strong> Breslow tumor thickness (in millimeters) is the single most vital predictor of metastatic risk.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>AI Role:</strong> ISIC-trained vision models detect micro-asymmetry, pigment network disruption, and blue-white veils.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Introduction &amp; Oncogenic Mechanisms</h2>
            <p>
              Cutaneous melanoma originates from the malignant transformation of pigment-producing melanocytes situated in the basal layer of the epidermis. Although accounting for under 5% of all skin cancer cases, melanoma is responsible for over 75% of skin cancer-related mortalities.
            </p>
            <p className="mt-4">
              Ultraviolet (UV) radiation (both UVA and UVB) induces direct DNA damage and formation of cyclobutane pyrimidine dimers (CPDs). Key oncogenic drivers include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 text-sm">
              <li><strong>BRAF V600E Mutation:</strong> Present in up to 50% of cutaneous melanomas, leading to constitutive activation of the MAPK/ERK signaling pathway.</li>
              <li><strong>NRAS &amp; KIT Mutations:</strong> Common in chronic sun-damaged skin, acral lentiginous, and mucosal melanomas.</li>
              <li><strong>CDKN2A Germline Mutations:</strong> High-risk familial predisposition genes regulating p16INK4a tumor suppressor function.</li>
            </ul>
          </section>

          {/* Ad Container */}
          <AdSpace variant="in-feed" label="ADVERTISEMENT" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. The ABCDE &amp; EFG Screening Protocol</h2>
            <p>
              Dermatologists utilize standardized visual criteria to distinguish common benign nevi from potential melanomas:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">The ABCDE Criteria</h4>
                <ul className="text-xs space-y-2">
                  <li><strong>A — Asymmetry:</strong> One half of the lesion does not mirror the other half in contour or pattern.</li>
                  <li><strong>B — Border Irregularity:</strong> Edges are notched, scalloped, ragged, or poorly circumscribed.</li>
                  <li><strong>C — Color Variation:</strong> Uneven distribution of dark brown, black, blue, red, or depigmented white areas.</li>
                  <li><strong>D — Diameter:</strong> Lesion exceeds 6mm in size (though early melanomas may be smaller).</li>
                  <li><strong>E — Evolving:</strong> Significant change in size, shape, elevation, color, or new symptoms (itching, bleeding).</li>
                </ul>
              </div>
              <div className="bg-white border border-[#E5E2DA] p-5 rounded-2xl">
                <h4 className="font-bold text-[#206E55] text-base mb-2">The Nodular EFG Criteria</h4>
                <p className="text-xs mb-3">Nodular melanoma often lacks classic ABCDE features and presents as:</p>
                <ul className="text-xs space-y-2">
                  <li><strong>E — Elevated:</strong> Firm, raised bump above the skin plane.</li>
                  <li><strong>F — Firm:</strong> Hard or rubbery texture on palpation.</li>
                  <li><strong>G — Growing:</strong> Rapidly expanding size over a period of weeks.</li>
                  <li><strong>"Ugly Duckling" Sign:</strong> A pigmented lesion that looks visually distinct from all surrounding nevi on the patient's body.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">3. Major Histological Subtypes</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Subtype</th>
                    <th className="p-3 border border-[#E5E2DA]">Prevalence</th>
                    <th className="p-3 border border-[#E5E2DA]">Key Histopathological Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Superficial Spreading (SSM)</td>
                    <td className="p-3 border border-[#E5E2DA]">~70% of cases</td>
                    <td className="p-3 border border-[#E5E2DA]">Prominent radial growth phase; pagetoid melanocytic spread in epidermis.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Nodular Melanoma (NM)</td>
                    <td className="p-3 border border-[#E5E2DA]">~15% of cases</td>
                    <td className="p-3 border border-[#E5E2DA]">Aggressive vertical growth from onset; rapid dermal invasion without radial phase.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Lentigo Maligna (LMM)</td>
                    <td className="p-3 border border-[#E5E2DA]">~10% of cases</td>
                    <td className="p-3 border border-[#E5E2DA]">Arises on chronically sun-damaged facial skin of elderly patients; slow expansion.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Acral Lentiginous (ALM)</td>
                    <td className="p-3 border border-[#E5E2DA]">~5% of cases</td>
                    <td className="p-3 border border-[#E5E2DA]">Occurs on palms, soles, subungual nail beds; independent of UV exposure.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">4. Staging &amp; Surgical Referral Principles</h2>
            <p>
              Prognostic staging relies on the AJCC 8th Edition TNM classification system:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-3 text-sm">
              <li><strong>Breslow Thickness:</strong> Measured in millimeters from the granular layer to the deepest tumor margin. Lesions &lt; 0.8mm have excellent survival rates (&gt;98%), whereas lesions &gt; 4mm carry high risk of regional nodal metastasis.</li>
              <li><strong>Ulceration Status:</strong> Microscopic presence of epidermal ulceration significantly worsens staging classification.</li>
              <li><strong>Surgical Margins:</strong> Wide local excision (WLE) with 1cm to 2cm clear margins; Sentinel Lymph Node Biopsy (SLNB) indicated for tumors &gt; 0.8mm or thin ulcerated lesions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">5. Medicus Labs AI Early Detection Framework</h2>
            <p>
              Medicus AI incorporates deep convolutional neural networks trained on over 50,000 dermoscopic and clinical images from the International Skin Imaging Collaboration (ISIC) dataset.
            </p>
            <p className="mt-3">
              The AI evaluates dermoscopic features including atypical pigment network patterns, irregular streaks (pseudopods), regression structures, and blue-white veils. When an anomaly is detected, the platform flags the lesion for urgent physician dermoscopy and biopsy.
            </p>
          </section>

          {/* Scientific Citations */}
          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific Citations &amp; Clinical Sources
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Swetter SM, et al. Guidelines of care for the management of primary cutaneous melanoma. <em>J Am Acad Dermatol.</em> 2019;80(1):208-250.</li>
              <li>Gershenwald JE, et al. Melanoma staging: Evidence-based changes in the American Joint Committee on Cancer eighth edition cancer staging manual. <em>CA Cancer J Clin.</em> 2017;67(6):472-492.</li>
              <li>WHO ICD-11 Code 2C30: Melanoma of Skin. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Perform an AI Pre-Screening Scan</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Scan suspicious moles or skin spots for early risk scores, visual symmetry maps, and clinical PDF exports.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free Melanoma Scan <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </article>

      <PremiumFooter />
    </div>
  </>
);

export default BlogMelanoma;