import React from 'react';
import { ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const EditorialPolicy: React.FC = () => (
  <>
    <SEO
      title="Medical Editorial Policy & E-E-A-T Standards | Medicus Labs"
      description="Medicus Labs Medical Editorial Policy: E-E-A-T compliance framework, peer-reviewed clinical sourcing standards (ICD-11, ISIC, PubMed, AAD), medical review protocols, author disclosures, and conflict-of-interest declarations."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8A857A] mb-4">
          <Link to="/" className="hover:text-[#206E55]">Home</Link>
          <span>/</span>
          <span className="text-[#206E55]">Editorial Policy</span>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> E-E-A-T Health Standards &amp; Transparency
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Medical Editorial Policy &amp; Clinical Content Integrity
        </h1>

        <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed mb-10">
          Last Updated: August 2026 • Review Frequency: Bi-annual • Medical Director Oversight: Mallikarjun R &amp; Clinical Engineering Board
        </p>

        {/* Body Sections */}
        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">

          {/* Key Principles Box */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#141515] mb-4 flex items-center gap-2">
              <ShieldCheck size={22} className="text-[#206E55]" />
              Our Four Pillars of Medical Information Quality
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-[#141515]">
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                <h4 className="font-bold text-[#206E55] text-sm mb-1">1. Evidence-Based Sourcing</h4>
                <p>All clinical statements must cite peer-reviewed dermatological literature, World Health Organization (WHO) ICD-11 classifications, or major clinical guidelines (AAD, EADV, BAD).</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                <h4 className="font-bold text-[#206E55] text-sm mb-1">2. Expert Medical Review</h4>
                <p>Content is drafted and peer-reviewed by qualified biomedical engineers, dermatological software researchers, and clinical data reviewers.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                <h4 className="font-bold text-[#206E55] text-sm mb-1">3. Clear Scope &amp; AI Boundaries</h4>
                <p>Every medical article explicitly outlines AI pre-screening limitations, diagnostic boundaries, emergency indicators, and physician consultation recommendations.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                <h4 className="font-bold text-[#206E55] text-sm mb-1">4. Independence &amp; Zero Bias</h4>
                <p>Medicus Labs maintains absolute editorial independence. Medical content is never influenced, sponsored, or altered by commercial advertisers.</p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Purpose &amp; Editorial Commitment</h2>
            <p>
              At Medicus Labs, we believe that accessible health information must be accurate, transparent, and grounded in rigorous scientific evidence. As an AI-powered dermatology platform operating in the Your Money Your Life (YMYL) health domain, we adhere strictly to Google's E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Sourcing &amp; Scientific Citation Standards</h2>
            <p>
              Our authors and research editors follow strict sourcing criteria. We do not rely on unverified blogs or commercial claims. Every medical guide published on Medicus Labs must draw directly from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 text-sm">
              <li><strong>Peer-Reviewed Medical Journals:</strong> Journal of the American Academy of Dermatology (JAAD), JAMA Dermatology, British Journal of Dermatology (BJD), and Lancet Oncology.</li>
              <li><strong>Official Health Organizations:</strong> World Health Organization (WHO) ICD-11 classifications, National Institutes of Health (NIH), and Centers for Disease Control and Prevention (CDC).</li>
              <li><strong>Dermatological Archives &amp; Standards:</strong> The International Skin Imaging Collaboration (ISIC Archive), American Academy of Dermatology (AAD), and European Academy of Dermatology and Venereology (EADV).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">3. Medical Authorship &amp; Contributor Disclosures</h2>
            <p>
              Medicus Labs is led by Founder &amp; CEO <strong>Mallikarjun R</strong>, alongside co-founders Nigam Patel H, Mallanagouda M, and Mohammed Adil. Our team combines expertise in computer vision, biomedical engineering, and software safety to ensure all public content meets high clinical utility standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">4. Corrections &amp; Content Revision Protocol</h2>
            <p>
              Medical knowledge evolves rapidly. We perform bi-annual reviews of all published guides. When new therapeutic guidelines (such as revised AAD consensus recommendations or FDA drug approvals) emerge, our clinical team promptly updates relevant articles, documenting revision timestamps transparently at the top of each document.
            </p>

            <div className="bg-[#FAF9F5] border border-[#E5E2DA] p-6 rounded-2xl mt-4 text-xs text-[#5A554A] space-y-2">
              <p className="font-bold text-[#141515] text-sm">Feedback &amp; Medical Corrections Contact:</p>
              <p>If you identify any factual inaccuracy or outdated reference in our library, please contact our medical editorial team at: <strong>medicuslabs.com@gmail.com</strong>.</p>
            </div>
          </section>
        </div>
      </main>

      <PremiumFooter />
    </div>
  </>
);

export default EditorialPolicy;
