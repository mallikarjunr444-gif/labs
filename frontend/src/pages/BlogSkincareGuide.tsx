import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

const BlogSkincareGuide: React.FC = () => (
  <>
    <SEO
      title="Evidence-Based Dermatological Skincare & AI Pre-Screening Protocols | Medicus Labs"
      description="Comprehensive dermatological reference on evidence-based skincare: active ingredients (retinoids, niacinamide, L-ascorbic acid, ceramides), Fitzpatrick phototype care, and AI pre-screening integration."
    />
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] pt-32 selection:bg-[#0071e3]/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10">
        <article className="max-w-4xl w-full pb-20">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#86868b] mb-4">
          <Link to="/blog" className="hover:text-[#0071e3]">Blog</Link>
          <span>/</span>
          <span className="text-[#0071e3]">Skincare Protocols</span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-transparent text-[#6e6e73] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Protocol
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
          Evidence-Based Dermatological Skincare: Ingredient Synergy &amp; AI Pre-Screening Protocols
        </h1>

        {/* Author Byline */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#d2d2d7] mb-10 text-xs text-[#6e6e73]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#0071e3]" />
            <span className="font-bold text-[#1d1d1f]">Authored by:</span> Mallikarjun R &amp; Skincare Advisory Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>15 min read</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#0071e3] font-semibold">
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
        <div className="prose prose-slate max-w-none text-[#6e6e73] space-y-8 leading-relaxed">

          {/* Key Summary */}
          <div className="bg-[#eaf2fd]/60 border border-[#0071e3]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#0071e3] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#1d1d1f]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" />
                <span><strong>Pillars:</strong> Cleansing, barrier restoration, targeted active ingredients, and photoprotection.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" />
                <span><strong>Active Actives:</strong> Retinoids (collagen stimulation), Vitamin C (free radical scavenging), Niacinamide (barrier repair).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" />
                <span><strong>Sun Protection:</strong> Broad-spectrum SPF 30+ targeting UVA (320-400nm) and UVB (290-320nm).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#0071e3] mt-1 shrink-0" />
                <span><strong>AI Pre-Screening:</strong> Texture analysis and hydration metric estimation via computer vision.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">1. The Science of Cutaneous Barrier Function</h2>
            <p>
              The human stratum corneum operates as a sophisticated bio-physical barrier ("bricks and mortar" model). Keratinocyte cells (bricks) are surrounded by a dense extracellular matrix composed of ceramides (50%), cholesterol (25%), and free fatty acids (15%). Maintaining optimal epidermal lipid ratios is essential to prevent transepidermal water loss (TEWL) and protect against environmental pollutants.
            </p>
          </section>

          {/* Ad Container */}
          <AdSpace variant="rectangle" className="my-8" />

          <section>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">2. Core Dermatological Actives Matrix</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#d2d2d7] rounded-2xl overflow-hidden">
                <thead className="bg-[#f5f5f7] text-[#1d1d1f] font-bold">
                  <tr>
                    <th className="p-3 border border-[#d2d2d7]">Active Ingredient</th>
                    <th className="p-3 border border-[#d2d2d7]">Mechanism of Action</th>
                    <th className="p-3 border border-[#d2d2d7]">Clinical Indications</th>
                    <th className="p-3 border border-[#d2d2d7]">Synergistic Pairings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d2d2d7] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#d2d2d7]">Retinoids (Tretinoin, Retinol)</td>
                    <td className="p-3 border border-[#d2d2d7]">Binds RAR/RXR receptors; stimulates collagen type I/III synthesis.</td>
                    <td className="p-3 border border-[#d2d2d7]">Acne vulgaris, photoaging, fine rhytids.</td>
                    <td className="p-3 border border-[#d2d2d7]">Pair with Ceramides &amp; Niacinamide. Avoid concurrent AHA/BHA.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#d2d2d7]">L-Ascorbic Acid (Vitamin C)</td>
                    <td className="p-3 border border-[#d2d2d7]">Neutralizes ROS; co-factor for prolyl hydroxylase; suppresses melanogenesis.</td>
                    <td className="p-3 border border-[#d2d2d7]">Post-inflammatory hyperpigmentation, UV damage.</td>
                    <td className="p-3 border border-[#d2d2d7]">Ferulic Acid &amp; Vitamin E (Tocopherol).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#d2d2d7]">Niacinamide (Vitamin B3)</td>
                    <td className="p-3 border border-[#d2d2d7]">Increases NAD+/NADP+ pool; accelerates ceramide biosynthesis.</td>
                    <td className="p-3 border border-[#d2d2d7]">Impaired skin barrier, enlarged pores, rosacea flushing.</td>
                    <td className="p-3 border border-[#d2d2d7]">Compatible with almost all topicals (Zinc, Hyaluronic Acid).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#d2d2d7]">Broad-Spectrum Photoprotection</td>
                    <td className="p-3 border border-[#d2d2d7]">Physical (Zinc Oxide/Titanium Dioxide) &amp; chemical (Tinosorb M/S) UV filters.</td>
                    <td className="p-3 border border-[#d2d2d7]">Prevention of actinic keratosis, melanoma, and photoaging.</td>
                    <td className="p-3 border border-[#d2d2d7]">Apply every morning as final skincare step.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">3. Fitzpatrick Phototype Customization</h2>
            <p>
              Dermatological skincare must account for the Fitzpatrick scale (Types I through VI). Darker skin phototypes (IV–VI) exhibit higher baseline epidermal melanin density and require cautious active ingredient titrations to avoid post-inflammatory hyperpigmentation (PIH).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">4. Integrating Medicus AI for Skincare Tracking</h2>
            <p>
              Medicus AI provides objective skin texture scoring, moisture level estimation, and hyperpigmentation tracking over 30-day care cycles. Users receive tailored product compatibility recommendations based on their specific skin profile.
            </p>
          </section>

          {/* References */}
          <section className="pt-8 border-t border-[#d2d2d7]">
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific References &amp; Literature
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#86868b] space-y-1.5 font-mono">
              <li>Draelos ZD. Active ingredients in dermatological skincare products. <em>Dermatol Clin.</em> 2019;37(1):1-7.</li>
              <li>Mukherjee S, et al. Retinoids in the treatment of skin aging: an overview of clinical efficacy and safety. <em>Clin Interv Aging.</em> 2006;1(4):327-348.</li>
            </ol>
          </section>
        </div>

        {/* CTA */}
        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#eaf2fd] via-white to-[#f5f5f7] border border-[#0071e3]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#1d1d1f] mb-2">Analyze Your Skin Profile with AI</h3>
          <p className="text-sm text-[#6e6e73] max-w-xl mx-auto mb-6">
            Receive personalized dermatological routine recommendations and skin score tracking.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#2997ff] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free Skincare Analysis <ArrowRight size={16} />
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

export default BlogSkincareGuide;
