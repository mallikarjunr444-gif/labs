import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogHidradenitis: React.FC = () => (
  <>
    <SEO
      title="Hidradenitis Suppurativa (Acne Inversa): Hurley Staging & Biologics | Medicus Labs"
      description="Clinical guide on Hidradenitis Suppurativa: follicular occlusion, apocrine gland-bearing sites, Hurley Stage I-III classification, Adalimumab TNF-alpha blocking, and AI visual evaluation."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Hidradenitis Suppurativa' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: 8A42
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Hidradenitis Suppurativa: Follicular Occlusion Pathology, Hurley Staging &amp; Biologic Therapies
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Dermatology Board
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>13 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Pathology:</strong> Chronic inflammatory follicular disease affecting intertriginous apocrine-rich sites.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Lesion Sequence:</strong> Follicular hyperkeratosis &rarr; occlusion &rarr; rupture &rarr; sinus tract formation &amp; scarring.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Hurley Staging:</strong> Stage I (abscesses), Stage II (recurrent abscesses with sinus tracts), Stage III (interconnected tracts).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Approved Biologics:</strong> Adalimumab (TNF-&alpha; inhibitor) and Secukinumab (IL-17A blocker).</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Follicular Rupture Dynamics</h2>
            <p>Hidradenitis Suppurativa (HS), also known as acne inversa, is a painful, chronic inflammatory skin condition affecting intertriginous skin of the axillae, groin, perineum, and inframammary regions. It affects approximately 1% of adults, with a 3:1 female predominance.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Zouboulis CC, et al. European S1 guideline for the treatment of hidradenitis suppurativa/acne inversa. <em>J Eur Acad Dermatol Venereol.</em> 2015;29(4):619-644.</li>
              <li>WHO ICD-11 Code 8A42: Hidradenitis Suppurativa. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Deep Nodule Symptoms with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload photos of intertriginous nodules for clinical reference grading.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free AI Scan <ArrowRight size={16} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogHidradenitis;
