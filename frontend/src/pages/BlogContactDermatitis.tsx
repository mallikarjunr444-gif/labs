import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogContactDermatitis: React.FC = () => (
  <>
    <SEO
      title="Contact Dermatitis: Irritant vs Allergic Pathways, Patch Testing & Care | Medicus Labs"
      description="Clinical guide on Contact Dermatitis: Irritant Contact Dermatitis (ICD) vs Allergic Contact Dermatitis (ACD), Type IV delayed hypersensitivity, nickel, fragrance, patch testing, and AI analysis."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Contact Dermatitis' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Allergy &amp; Dermatology • ICD-11: EA82 / EA83
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Contact Dermatitis: Irritant vs. Allergic Pathways, Patch Testing &amp; Clinical Management
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Allergy Group
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>12 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Irritant Contact (ICD):</strong> Non-immunologic direct cytotoxic disruption of epidermal lipid barrier (~80% of cases).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Allergic Contact (ACD):</strong> Type IV delayed-type cell-mediated hypersensitivity reaction requiring sensitization.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Common Allergens:</strong> Nickel sulfate, poison ivy (urushiol), fragrance mix, methylisothiazolinone (preservative).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Diagnostic Tool:</strong> Thin-layer Rapid Use Epicutaneous (TRUE) patch testing with 48-hour occlusion.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Pathophysiologic Differences: ICD vs. ACD</h2>
            <p>Contact Dermatitis encompasses acute or chronic inflammatory skin responses elicited by direct cutaneous exposure to exogenous physical or chemical substances.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Fonacier L, et al. Contact dermatitis: a practice parameter-2015 update. <em>J Allergy Clin Immunol Pract.</em> 2015;3(3 Suppl):S1-S40.</li>
              <li>WHO ICD-11 Code EA82 / EA83: Contact Dermatitis. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Evaluate Skin Rash Patterns with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload photos of acute localized rashes for instant contact dermatitis vs eczema score reporting.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free AI Scan <ArrowRight size={16} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogContactDermatitis;
