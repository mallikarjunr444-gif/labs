import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, FileText, CheckCircle2, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogAcneVsRosacea: React.FC = () => (
  <>
    <SEO
      title="Difference Between Acne and Rosacea: Key Clinical Indicators | Medicus Labs"
      description="Clinical comparison guide: Acne Vulgaris vs Rosacea. Comedones presence, age distribution, flushing triggers, ocular involvement, and AI differential diagnosis."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: 'Acne vs Rosacea Differential' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Clinical Differential Guide
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Difference Between Acne Vulgaris and Rosacea: Key Visual &amp; Anatomical Indicators
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] mb-10 text-xs text-[#5A554A]">
          <div className="flex items-center gap-2">
            <User size={15} className="text-[#206E55]" />
            <span className="font-bold text-[#141515]">Authored by:</span> Medicus Clinical Review Team
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><Clock size={14} /><span>10 min read</span></div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#206E55] font-semibold"><ShieldCheck size={14} /><span>Peer-Referenced</span></div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">
          <div className="bg-[#E8F2ED]/60 border border-[#206E55]/20 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#206E55] mb-3 flex items-center gap-2"><Stethoscope size={20} /> Executive Clinical Summary</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#141515]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Comedones (Blackheads/Whiteheads):</strong> Hallmark of Acne Vulgaris; universally absent in Rosacea.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Facial Erythema &amp; Flushing:</strong> Persistent central facial redness and telangiectasia indicate Rosacea.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Age Onset:</strong> Acne peaks in adolescence (12–24 yrs); Rosacea peaks in adults aged 30–50.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#206E55] mt-1 shrink-0" /><span><strong>Anatomic Extent:</strong> Acne affects face, chest, and back; Rosacea is strictly confined to mid-facial regions.</span></li>
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Side-by-Side Clinical Comparison</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Feature</th>
                    <th className="p-3 border border-[#E5E2DA]">Acne Vulgaris</th>
                    <th className="p-3 border border-[#E5E2DA]">Rosacea (Papulopustular)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Comedones</td>
                    <td className="p-3 border border-[#E5E2DA]">Present (Open &amp; Closed)</td>
                    <td className="p-3 border border-[#E5E2DA]">Absent</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Background Redness</td>
                    <td className="p-3 border border-[#E5E2DA]">Absent or confined to papule borders</td>
                    <td className="p-3 border border-[#E5E2DA]">Persistent central facial erythema</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Telangiectasias</td>
                    <td className="p-3 border border-[#E5E2DA]">Absent</td>
                    <td className="p-3 border border-[#E5E2DA]">Frequently present</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Eye Symptoms</td>
                    <td className="p-3 border border-[#E5E2DA]">None</td>
                    <td className="p-3 border border-[#E5E2DA]">Ocular involvement in up to 50%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <AdSpace variant="rectangle" className="my-8" />

          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2"><FileText size={18} /> Scientific References</h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Plewig G, Kligman AM. Acne and Rosacea. 3rd ed. <em>Springer;</em> 2000.</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 text-center shadow-sm">
          <h3 className="text-2xl font-extrabold text-[#141515] mb-2">Check Facial Bumps with AI Differential</h3>
          <p className="text-sm text-[#5A554A] max-w-xl mx-auto mb-6">Upload photos for automated Acne vs Rosacea differential probability scoring.</p>
          <Link to="/analysis"><button className="px-8 py-3.5 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2">Start Free Differential Scan <ArrowRight size={16} /></button></Link>
        </div>
      </article>
      <PremiumFooter />
    </div>
  </>
);

export default BlogAcneVsRosacea;
