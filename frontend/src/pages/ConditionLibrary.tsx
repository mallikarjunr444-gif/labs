import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Search, ShieldCheck, Stethoscope, Activity, FileText, CheckCircle2 } from 'lucide-react';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';

interface ConditionItem {
  id: string;
  name: string;
  icdCode: string;
  category: 'Inflammatory' | 'Malignant / Premalignant' | 'Infectious / Fungal' | 'Pigmentary';
  urgency: 'Low Risk' | 'Moderate' | 'High / Urgent';
  prevalence: string;
  symptoms: string[];
  description: string;
  link?: string;
}

const conditionsData: ConditionItem[] = [
  {
    id: 'acne',
    name: 'Acne Vulgaris',
    icdCode: 'ICD-11: 8A40 / DA01',
    category: 'Inflammatory',
    urgency: 'Low Risk',
    prevalence: '85% of adolescents & young adults',
    symptoms: ['Comedones (blackheads/whiteheads)', 'Inflammatory papules & pustules', 'Nodules & deep cysts', 'Post-inflammatory erythema'],
    description: 'Chronic inflammatory condition of the pilosebaceous units triggered by hyperkeratinization, excess sebum, and Cutibacterium acnes colonization.',
    link: '/blog/acne',
  },
  {
    id: 'melanoma',
    name: 'Cutaneous Melanoma',
    icdCode: 'ICD-11: 2C30',
    category: 'Malignant / Premalignant',
    urgency: 'High / Urgent',
    prevalence: '~5% of skin cancers, highest lethality',
    symptoms: ['Asymmetrical shape', 'Irregular or notched borders', 'Uneven pigmentation', 'Diameter > 6mm or rapid evolution'],
    description: 'Highly aggressive malignant tumor arising from basal melanocytes. Early diagnosis via ABCDE screening yields >99% 5-year survival.',
    link: '/blog/melanoma',
  },
  {
    id: 'eczema',
    name: 'Atopic Dermatitis (Eczema)',
    icdCode: 'ICD-11: EA80',
    category: 'Inflammatory',
    urgency: 'Moderate',
    prevalence: '15-20% of children, 3-10% of adults',
    symptoms: ['Intense nocturnal pruritus', 'Dry scaly erythematous plaques', 'Flexural fold distribution', 'Lichenification from chronic scratching'],
    description: 'Chronic relapsing inflammatory dermatosis driven by filaggrin gene mutations and Th2 immune hyper-reactivity.',
    link: '/blog/eczema',
  },
  {
    id: 'psoriasis',
    name: 'Plaque Psoriasis',
    icdCode: 'ICD-11: EA90',
    category: 'Inflammatory',
    urgency: 'Moderate',
    prevalence: '2-3% of global population',
    symptoms: ['Sharply demarcated erythematous plaques', 'Silvery micaceous scaling', 'Auspitz sign (pinpoint bleeding)', 'Nail pitting'],
    description: 'T-cell mediated autoimmune skin disease characterized by rapid keratinocyte hyperproliferation (turnover in 3-5 days).',
    link: '/blog/psoriasis',
  },
  {
    id: 'rosacea',
    name: 'Rosacea',
    icdCode: 'ICD-11: ED90',
    category: 'Inflammatory',
    urgency: 'Low Risk',
    prevalence: 'up to 10% of fair-skinned adults',
    symptoms: ['Persistent facial flushing & redness', 'Telangiectasias (visible facial veins)', 'Papules & sterile pustules', 'Ocular irritation'],
    description: 'Neurovascular and innate immune disorder driven by cathelicidin peptide LL-37 processing and Demodex mite density elevation.',
    link: '/blog/rosacea',
  },
  {
    id: 'bcc',
    name: 'Basal Cell Carcinoma (BCC)',
    icdCode: 'ICD-11: 2C31',
    category: 'Malignant / Premalignant',
    urgency: 'High / Urgent',
    prevalence: 'Most common human cancer worldwide',
    symptoms: ['Pearly translucent papule', 'Rolled border with central ulceration', 'Telangiectatic vessel branching', 'Non-healing bleeding spot'],
    description: 'Slow-growing non-melanoma skin cancer arising from basal epidermal keratinocytes, strongly linked to cumulative UV exposure.',
  },
  {
    id: 'ak',
    name: 'Actinic Keratosis',
    icdCode: 'ICD-11: EK90',
    category: 'Malignant / Premalignant',
    urgency: 'Moderate',
    prevalence: 'Common in elderly fair-skinned individuals',
    symptoms: ['Rough sandpaper-like scaly patch', 'Erythematous base', 'Tenderness on palpation', 'Sun-exposed anatomic sites'],
    description: 'Premalignant keratinocyte dysplasia caused by chronic UV damage; carries risk of transformation into Squamous Cell Carcinoma.',
  },
  {
    id: 'sk',
    name: 'Seborrheic Keratosis',
    icdCode: 'ICD-11: ED80',
    category: 'Inflammatory',
    urgency: 'Low Risk',
    prevalence: '>80% of individuals over age 50',
    symptoms: ['Warty "stuck-on" appearance', 'Verrucous or greasy surface', 'Variable color (tan to dark brown)', 'Comedone-like openings'],
    description: 'Common benign epidermal tumor with zero malignant potential, often mimicking dysplastic nevi or melanoma.',
  },
  {
    id: 'vitiligo',
    name: 'Vitiligo',
    icdCode: 'ICD-11: ED60',
    category: 'Pigmentary',
    urgency: 'Low Risk',
    prevalence: '0.5-1% of global population',
    symptoms: ['Depigmented chalk-white macules', 'Symmetrical periorificial distribution', 'Leukotrichia (white hair in macules)', 'Koebnerization'],
    description: 'Autoimmune destruction of epidermal melanocytes mediated by CD8+ cytotoxic T-lymphocytes.',
  },
  {
    id: 'tinea',
    name: 'Tinea Versicolor',
    icdCode: 'ICD-11: 1F2D',
    category: 'Infectious / Fungal',
    urgency: 'Low Risk',
    prevalence: 'High in warm humid climates',
    symptoms: ['Hypopigmented or hyperpigmented macules', 'Fine branny scale on scraping', 'Distribution on upper chest & back', 'Mild itching with sweating'],
    description: 'Superficial fungal infection caused by dimorphic yeast Malassezia globosa transforming into pathogenic hyphal form.',
  },
];

const ConditionLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Inflammatory', 'Malignant / Premalignant', 'Infectious / Fungal', 'Pigmentary'];

  const filtered = conditionsData.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.icdCode.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Interactive Skin Condition Library & Medical Diagnostic Reference | Medicus Labs"
        description="Comprehensive dermatological reference library indexing 10+ skin conditions (Acne, Eczema, Melanoma, Psoriasis, Rosacea, BCC, Vitiligo) with ICD-11 codes, visual symptoms, risk tiers, and clinical AI analysis integration."
      />
      <div className="min-h-screen bg-[#FAF9F5] text-[#141515] font-sans">
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-4">
              <Stethoscope size={14} /> Medical Diagnostic Reference
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-4">
              Clinical Skin Condition Library
            </h1>
            <p className="text-[#5A554A] text-base sm:text-lg leading-relaxed">
              Explore disease pathology, ICD-11 classification codes, visual clinical presentations, and AI vision pre-screening capabilities across major dermatological conditions.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-4 sm:p-6 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A857A]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conditions, ICD codes, symptoms..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#FAF9F5] border border-[#E5E2DA] text-sm text-[#141515] focus:outline-none focus:border-[#206E55] transition"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#206E55] text-white shadow-sm'
                        : 'bg-[#FAF9F5] text-[#5A554A] border border-[#E5E2DA] hover:border-[#206E55] hover:text-[#206E55]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ad Container */}
          <AdSpace variant="banner" label="ADVERTISEMENT" className="my-8" />

          {/* Condition Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono bg-[#E8F2ED] text-[#206E55] px-2.5 py-1 rounded-md font-bold">
                      {item.icdCode}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.urgency === 'High / Urgent'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : item.urgency === 'Moderate'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.urgency}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#141515] mb-2">{item.name}</h3>
                  <p className="text-xs font-medium text-[#8A857A] mb-4">
                    Category: <strong className="text-[#5A554A]">{item.category}</strong> • Prevalence: <strong className="text-[#5A554A]">{item.prevalence}</strong>
                  </p>

                  <p className="text-sm text-[#5A554A] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-bold text-[#141515] uppercase tracking-wider">Key Visual Symptoms:</h4>
                    <ul className="space-y-1.5 text-xs text-[#5A554A]">
                      {item.symptoms.map((symptom, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#206E55] mt-0.5 shrink-0" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#206E55] hover:underline"
                    >
                      Read Clinical Guide <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <span className="text-xs text-[#8A857A]">Clinical reference ready</span>
                  )}
                  <Link
                    to="/analysis"
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-[#E5E2DA] text-[#141515] text-xs font-bold hover:bg-[#206E55] hover:text-white transition"
                  >
                    AI Scan
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom E-E-A-T Footer Banner */}
          <div className="mt-16 bg-[#F3F1EB] border border-[#E5E2DA] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#206E55]/10 flex items-center justify-center text-[#206E55] flex-shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#141515] text-base mb-1">
                  ICD-11 &amp; ISIC Standardized Classifications
                </h4>
                <p className="text-xs text-[#5A554A] leading-relaxed max-w-2xl">
                  Medical information is structured in accordance with the World Health Organization (WHO) ICD-11 classification standards and the International Skin Imaging Collaboration archive.
                </p>
              </div>
            </div>
            <Link
              to="/editorial-policy"
              className="px-5 py-2.5 rounded-full bg-white border border-[#E5E2DA] text-[#206E55] font-bold text-xs hover:bg-[#E8F2ED] transition whitespace-nowrap shadow-sm"
            >
              Editorial Standards &rarr;
            </Link>
          </div>
        </main>

        <PremiumFooter />
      </div>
    </>
  );
};

export default ConditionLibrary;
