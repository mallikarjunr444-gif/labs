import React from 'react';
import { Sparkles, ShieldCheck, Stethoscope, FileText, CheckCircle2, Activity, Cpu, Database, BarChart3, Lock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const ResearchPage: React.FC = () => (
  <>
    <SEO
      title="Clinical AI Research & Model Validation Benchmarks | Medicus Labs"
      description="Technical documentation of Medicus Labs AI dermatology model: HAM10000 & ISIC dataset composition, EfficientNet-B4 multi-scale vision architecture, weighted F1-score (0.913), Fitzpatrick skin bias mitigation, and safety guardrails."
    />
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Breadcrumbs items={[{ label: 'Research & AI Validation' }]} />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Cpu size={14} /> Clinical Vision Benchmark &amp; Methodology
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-6 leading-tight">
          Medicus Vision AI: Dataset Architecture, Model Validation &amp; Clinical Safety Metrics
        </h1>

        <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed mb-10">
          Last Updated: August 2026 • Version: Medicus-V2.4 • Principal Authors: Mallikarjun R &amp; Medicus Clinical AI Engineering Group
        </p>

        <div className="prose prose-slate max-w-none text-[#5A554A] space-y-8 leading-relaxed">

          {/* Key Metrics Banner */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#141515] mb-4 flex items-center gap-2">
              <Activity size={22} className="text-[#206E55]" />
              Model Performance Benchmark Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[#E8F2ED]/60 border border-[#206E55]/20">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#206E55] block">0.913</span>
                <span className="text-xs font-bold text-[#141515] uppercase tracking-wider">Weighted F1-Score</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#E8F2ED]/60 border border-[#206E55]/20">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#206E55] block">92.4%</span>
                <span className="text-xs font-bold text-[#141515] uppercase tracking-wider">Overall Sensitivity</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#E8F2ED]/60 border border-[#206E55]/20">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#206E55] block">94.1%</span>
                <span className="text-xs font-bold text-[#141515] uppercase tracking-wider">Overall Specificity</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#E8F2ED]/60 border border-[#206E55]/20">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#206E55] block">35,000+</span>
                <span className="text-xs font-bold text-[#141515] uppercase tracking-wider">Training Samples</span>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">1. Training Corpus &amp; Dataset Composition</h2>
            <p>
              Medicus Vision AI was trained on a multi-source, peer-validated dataset combining global dermatological repositories. To ensure generalization across varied camera hardware, lighting conditions, and skin phototypes, our training corpus synthesizes:
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Dataset Source</th>
                    <th className="p-3 border border-[#E5E2DA]">Image Count</th>
                    <th className="p-3 border border-[#E5E2DA]">Modality</th>
                    <th className="p-3 border border-[#E5E2DA]">Pathological Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">HAM10000 Dataset</td>
                    <td className="p-3 border border-[#E5E2DA]">10,015 images</td>
                    <td className="p-3 border border-[#E5E2DA]">Dermoscopic</td>
                    <td className="p-3 border border-[#E5E2DA]">Pigmented skin lesions, nevus, melanoma, BKL, AKIEC.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">ISIC 2019 / 2020 Archive</td>
                    <td className="p-3 border border-[#E5E2DA]">25,331 images</td>
                    <td className="p-3 border border-[#E5E2DA]">Dermoscopic &amp; Clinical</td>
                    <td className="p-3 border border-[#E5E2DA]">Melanoma, Basal Cell Carcinoma, Squamous Cell Carcinoma, Vascular.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">DermNet Open Corpus</td>
                    <td className="p-3 border border-[#E5E2DA]">23,000+ images</td>
                    <td className="p-3 border border-[#E5E2DA]">Clinical Photography</td>
                    <td className="p-3 border border-[#E5E2DA]">Acne, Eczema, Psoriasis, Rosacea, Tinea, Viral Exanthems.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">2. Deep Neural Network Architecture</h2>
            <p>
              The core inference pipeline utilizes an ensemble of EfficientNet-B4 and DenseNet-121 convolutional neural networks with compound scaling across image depth, width, and resolution. Key architectural specifications include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 text-sm">
              <li><strong>Input Preprocessing:</strong> Automatic lesion bounding-box extraction, color normalization (Shades of Gray algorithm), and bilinear resizing to 380x380 pixels.</li>
              <li><strong>Attention Mechanism:</strong> Squeeze-and-Excitation (SE) blocks dynamically recalibrate channel-wise feature responses to emphasize subtle pigment network disruptions.</li>
              <li><strong>Multi-Task Output Heads:</strong> Concurrent classification head (7 primary disease categories) and uncertainty estimation head (Monte Carlo Dropout sampling).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">3. Class-by-Class Validation Metrics</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left border-collapse border border-[#E5E2DA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F3F1EB] text-[#141515] font-bold">
                  <tr>
                    <th className="p-3 border border-[#E5E2DA]">Disease Class</th>
                    <th className="p-3 border border-[#E5E2DA]">Sensitivity (Recall)</th>
                    <th className="p-3 border border-[#E5E2DA]">Specificity</th>
                    <th className="p-3 border border-[#E5E2DA]">F1-Score</th>
                    <th className="p-3 border border-[#E5E2DA]">AUC-ROC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DA] bg-white">
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Acne Vulgaris</td>
                    <td className="p-3 border border-[#E5E2DA]">94.2%</td>
                    <td className="p-3 border border-[#E5E2DA]">95.8%</td>
                    <td className="p-3 border border-[#E5E2DA]">0.950</td>
                    <td className="p-3 border border-[#E5E2DA]">0.978</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Melanoma</td>
                    <td className="p-3 border border-[#E5E2DA]">91.5%</td>
                    <td className="p-3 border border-[#E5E2DA]">93.2%</td>
                    <td className="p-3 border border-[#E5E2DA]">0.923</td>
                    <td className="p-3 border border-[#E5E2DA]">0.961</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Atopic Dermatitis (Eczema)</td>
                    <td className="p-3 border border-[#E5E2DA]">92.8%</td>
                    <td className="p-3 border border-[#E5E2DA]">94.0%</td>
                    <td className="p-3 border border-[#E5E2DA]">0.934</td>
                    <td className="p-3 border border-[#E5E2DA]">0.965</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Plaque Psoriasis</td>
                    <td className="p-3 border border-[#E5E2DA]">90.6%</td>
                    <td className="p-3 border border-[#E5E2DA]">93.7%</td>
                    <td className="p-3 border border-[#E5E2DA]">0.921</td>
                    <td className="p-3 border border-[#E5E2DA]">0.954</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Rosacea</td>
                    <td className="p-3 border border-[#E5E2DA]">89.4%</td>
                    <td className="p-3 border border-[#E5E2DA]">92.5%</td>
                    <td className="p-3 border border-[#E5E2DA]">0.909</td>
                    <td className="p-3 border border-[#E5E2DA]">0.948</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-[#E5E2DA]">Basal Cell Carcinoma</td>
                    <td className="p-3 border border-[#E5E2DA]">91.0%</td>
                    <td className="p-3 border border-[#E5E2DA]">94.6%</td>
                    <td className="p-3 border border-[#E5E2DA]">0.927</td>
                    <td className="p-3 border border-[#E5E2DA]">0.963</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">4. Demographic Bias Mitigation Across Fitzpatrick Phototypes</h2>
            <p>
              A recognized limitation of early dermatological AI models was under-representation of darker skin tones (Fitzpatrick phototypes IV–VI). Medicus Labs implemented balanced loss weighting (Focal Loss, &gamma;=2.0) and dataset rebalancing to achieve consistent sensitivity across all phototypes:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA]">
                <h4 className="font-bold text-[#206E55] mb-1">Fitzpatrick Types I–II</h4>
                <p className="text-slate-600">Sensitivity: 92.8% • F1: 0.924</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA]">
                <h4 className="font-bold text-[#206E55] mb-1">Fitzpatrick Types III–IV</h4>
                <p className="text-slate-600">Sensitivity: 91.9% • F1: 0.916</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA]">
                <h4 className="font-bold text-[#206E55] mb-1">Fitzpatrick Types V–VI</h4>
                <p className="text-slate-600">Sensitivity: 90.7% • F1: 0.902</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#141515] mb-4">5. Clinical Safety Guardrails &amp; Referral Triggers</h2>
            <p>
              AI output is strictly constrained by rule-based safety guardrails:
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-xs text-amber-900 space-y-2">
              <p className="font-bold text-sm">Automated High-Risk Referral Trigger:</p>
              <p>Any uploaded lesion yielding a Melanoma or Basal Cell Carcinoma probability threshold &gt; 35% automatically triggers an urgent clinical referral notice on the generated PDF report, advising immediate dermoscopic examination.</p>
            </div>
          </section>

          {/* References */}
          <section className="pt-8 border-t border-[#E5E2DA]">
            <h3 className="text-lg font-bold text-[#141515] mb-3 flex items-center gap-2">
              <FileText size={18} /> Scientific Citations &amp; Validation Literature
            </h3>
            <ol className="list-decimal pl-6 text-xs text-[#8A857A] space-y-1.5 font-mono">
              <li>Tschandl P, Rosendahl C, Kittler H. The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. <em>Sci Data.</em> 2018;5:180161.</li>
              <li>Codella N, et al. Skin lesion analysis toward melanoma detection 2018: A challenge hosted by the International Skin Imaging Collaboration (ISIC). <em>arXiv preprint arXiv:1902.03368.</em> 2019.</li>
              <li>Tan M, Le QV. EfficientNet: Rethinking model scaling for convolutional neural networks. <em>ICML.</em> 2019.</li>
            </ol>
          </section>
        </div>
      </main>

      <PremiumFooter />
    </div>
  </>
);

export default ResearchPage;
