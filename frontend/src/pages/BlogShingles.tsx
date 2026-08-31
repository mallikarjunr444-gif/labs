import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogShingles: React.FC = () => (
  <>
    <SEO
      title="Herpes Zoster (Shingles): Dermatomal Reactivation, Antivirals & PHN | Medicus Labs"
      description="Clinical guide on Herpes Zoster (Shingles): Varicella-Zoster Virus (VZV) ganglion latency, unilateral dermatomal rash, Oral Valacyclovir 72-hour window, Post-Herpetic Neuralgia, and AI pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Herpes Zoster (Shingles)' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Virology Guide • ICD-11: 1E91
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Herpes Zoster (Shingles): Varicella Reactivation, Dermatomal Eruption &amp; Antiviral Windows
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Neurology &amp; Virology Group
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>12 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4 text-amber-900 text-sm">
            <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold mb-1">Time-Sensitive Clinical Window</h4>
              <p>Oral antiviral therapy (Valacyclovir 1000mg TID or Famciclovir 500mg TID) must be initiated within 72 hours of cutaneous eruption to minimize Post-Herpetic Neuralgia (PHN) risk.</p>
            </div>
          </div>

          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Pathogen:</strong> Reactivation of latent Varicella-Zoster Virus (VZV) in dorsal root or cranial nerve ganglia.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Distribution:</strong> Unilateral erythematous maculopapular and vesiculopustular rash strictly respecting the midline of a single dermatome.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Prodrome:</strong> Severe dermatomal burning, radicular neuropathic pain, and hyperesthesia 1–5 days prior to rash.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Complication:</strong> Herpes Zoster Ophthalmicus (V1 branch involvement; Hutchinson sign on nasal tip) threatens vision.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Ganglionic Latency</h2>
            <p>Herpes Zoster (Shingles) is a neurocutaneous disease caused by the reactivation of endogenous Varicella-Zoster Virus that has remained dormant in sensory ganglia following primary varicella (chickenpox) infection.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Cohen JI. Clinical practice. Herpes zoster. <em>N Engl J Med.</em> 2013;369(3):255-263.</li>
              <li>WHO ICD-11 Code 1E91: Herpes Zoster. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Unilateral Painful Rashes with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload photos of dermatomal blister clusters for immediate VZV assessment.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free Shingles Scan <ArrowRight size={16} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogShingles;
