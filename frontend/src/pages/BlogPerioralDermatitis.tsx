import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogPerioralDermatitis: React.FC = () => (
  <>
    <SEO
      title="Perioral Dermatitis: Steroid-Induced Flares, Zero-Therapy & Topical Metronidazole | Medicus Labs"
      description="Clinical guide on Perioral (Periorificial) Dermatitis: topical corticosteroid rebound, fluorinated toothpaste triggers, zero-therapy protocols, oral doxycycline, and AI differential diagnosis."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Perioral Dermatitis' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Dermatology Guide • ICD-11: ED91
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Perioral Dermatitis: Steroid-Induced Rebound Flares, Zero-Therapy Protocols &amp; Clinical Care
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>11 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Pathology:</strong> Inflammatory papulopustular eruption surrounding the mouth, nose, and periorbital regions.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Primary Trigger:</strong> Prolonged use of topical, inhaled, or systemic corticosteroids causing cutaneous dependency.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>First-Line Protocol:</strong> Absolute cessation of steroids ("Zero-Therapy") + topical Metronidazole 0.75% or Pimecrolimus.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Classic Sign:</strong> Characteristic narrow sparing zone of vermilion border surrounding the lips.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Etiology &amp; Corticosteroid Dependency</h2>
            <p>Perioral Dermatitis (POD) is an erythematous papulopustular facial dermatosis predominantly affecting young women aged 20–45 and young children. The single most prominent precipitating factor is the application of topical corticosteroids (even mild OTC hydrocortisone) to facial skin, leading to chronic dependency and severe withdrawal flare-ups.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Tempark T, Shwayder TA. Perioral dermatitis: a review of the clinical picture, etiology, and management. <em>Pediatr Dermatol.</em> 2014;31(2):127-146.</li>
              <li>WHO ICD-11 Code ED91: Perioral Dermatitis. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <SponsoredLinks />

        <AdSpace variant="leaderboard" className="my-10" />

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Facial Bumps with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload a clear photo for perioral dermatitis vs acne vs rosacea differential analysis.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free AI Scan <ArrowRight size={16} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogPerioralDermatitis;
