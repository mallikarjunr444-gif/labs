import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogBasalCell: React.FC = () => (
  <>
    <SEO
      title="Basal Cell Carcinoma (BCC): Dermoscopy, Subtypes & Surgical Management | Medicus Labs"
      description="Clinical oncology guide on Basal Cell Carcinoma (BCC): Hedgehog pathway (PTCH1/SMO) signaling, nodular vs superficial variants, arborizing telangiectasia dermoscopy, Mohs surgery, and AI screening."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Basal Cell Carcinoma' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Oncology Guide • ICD-11: 2C31
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Basal Cell Carcinoma (BCC): Hedgehog Pathway Signaling, Subtypes &amp; Mohs Surgical Protocols
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Oncology Group
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>13 min read</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold">
              <ShieldCheck size={14} />
              <span>Peer-Referenced</span>
            </div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4 text-amber-900 text-sm">
            <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold mb-1">Clinical Warning</h4>
              <p>
                Basal Cell Carcinoma is the most prevalent human cancer worldwide. Although metastasis is rare (&lt; 0.1%), untreated BCC causes severe local tissue destruction ("rodent ulcer") of facial structures.
              </p>
            </div>
          </div>

          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2">
              <Stethoscope size={20} /> Executive Clinical Summary
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Pathogenesis:</strong> Loss-of-function mutations in <em>PTCH1</em> gene causing constitutive Sonic Hedgehog (SHH) signaling.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Dermoscopic Hallmark:</strong> Prominent arborizing (tree-like) telangiectasias, shiny pearly border, and leaf-like areas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Gold Standard Treatment:</strong> Mohs Micrographic Surgery (MMS) achieving 99% 5-year cure rate for facial lesions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" />
                <span><strong>Advanced Therapeutics:</strong> Hedgehog pathway inhibitors (Vismodegib, Sonidegib) for locally advanced BCC.</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Etiology &amp; Hedgehog Signaling</h2>
            <p>
              Basal Cell Carcinoma arises from non-keratinizing keratinocytes residing in the basal layer of the epidermis and hair follicle outer root sheath. Chronic UV radiation (UVB 290–320nm) triggers characteristic C-&gt;T pyrimidine dimer mutations in tumor suppressor genes.
            </p>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific Citations
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Bichakjian CK, et al. Guidelines of care for the management of basal cell carcinoma. <em>J Am Acad Dermatol.</em> 2018;78(3):540-559.</li>
              <li>WHO ICD-11 Code 2C31: Basal Cell Carcinoma of Skin. World Health Organization, 2024.</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Scan Pearly Skin Lesions with AI</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">
            Evaluate translucent papules or non-healing sores for early BCC risk indicators.
          </p>
          <Link to="/analysis">
            <button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">
              Start Free BCC Scan <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </article>

      <PremiumFooter />
    </div>
  </>
);

export default BlogBasalCell;
