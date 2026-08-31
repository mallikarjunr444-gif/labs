import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogKeratoacanthoma: React.FC = () => (
  <>
    <SEO
      title="Keratoacanthoma (KA): Rapid Growth, Central Keratin Crater & Surgical Care | Medicus Labs"
      description="Clinical oncology guide on Keratoacanthoma (KA): rapid crateriform tumor kinetics, squamous cell carcinoma variant classification, histopathology, excision margins, and AI vision pre-screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Keratoacanthoma' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Oncology Guide • ICD-11: 2C31 / EK90
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Keratoacanthoma: Rapid Tumoral Kinetics, Central Keratin Crater &amp; cSCC Histopathological Differential
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Oncology Group
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
              <h4 className="font-bold mb-1">Clinical Management Notice</h4>
              <p>Because Keratoacanthoma cannot be reliably distinguished from well-differentiated invasive Squamous Cell Carcinoma on clinical or partial biopsy grounds, definitive surgical excision is universally recommended.</p>
            </div>
          </div>

          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Growth Pattern:</strong> Triphasic natural history — rapid proliferation (4-8 weeks), maturation, and occasional spontaneous involution.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Classic Morphology:</strong> Volcaniform dome-shaped nodule with a prominent central hyperkeratotic plug.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Anatomic Distribution:</strong> Sun-exposed areas (face, hands, extensor forearms) of elderly individuals.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Standard Treatment:</strong> Complete surgical excision with 4mm margins.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Overview &amp; Natural History</h2>
            <p>Keratoacanthoma (KA) is a rapidly evolving cutaneous neoplasm originating from infundibular hair follicle keratinocytes. Most dermatopathologists classify KA as a subtype of well-differentiated Squamous Cell Carcinoma.</p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Kwiek B, Schwartz RA. Keratoacanthoma (KA): An update and review. <em>J Am Acad Dermatol.</em> 2016;74(6):1220-1233.</li>
              <li>WHO ICD-11 Code 2C31: Keratoacanthoma. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Scan Rapidly Growing Nodules with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload photos of crateriform nodules for clinical risk score reporting.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free Scan <ArrowRight size={16} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogKeratoacanthoma;
