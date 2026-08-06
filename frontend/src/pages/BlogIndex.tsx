import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Search, Clock, BookOpen, User, ShieldCheck } from 'lucide-react';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';

export interface ArticleMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Dermatology' | 'Cancer Screening' | 'Skincare Protocols' | 'AI Technology';
  readTime: string;
  date: string;
  author: string;
  image: string;
  icdCode?: string;
}

export const articlesList: ArticleMeta[] = [
  {
    id: 'acne',
    slug: '/blog/acne',
    title: 'Acne Vulgaris: Pathophysiology, Grade I–IV Classification & Evidence-Based Clinical Management',
    excerpt: 'An in-depth dermatological reference guide on pilosebaceous pathology, C. acnes proliferation, hormonal triggers, topical retinoids, systemic therapies, and AI-assisted skin assessment.',
    category: 'Dermatology',
    readTime: '12 min read',
    date: 'August 2026',
    author: 'Mallikarjun R & Medical Review Team',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: 8A40 / DA01',
  },
  {
    id: 'melanoma',
    slug: '/blog/melanoma',
    title: 'Melanoma & Dysplastic Nevi: Diagnostic ABCDE Evaluation, Dermoscopy & AI Early Warning',
    excerpt: 'Comprehensive clinical guide on melanocyte transformation, ABCDE and EFG rules, Clark level staging, dermoscopic diagnostic criteria, and early visual AI screening.',
    category: 'Cancer Screening',
    readTime: '14 min read',
    date: 'August 2026',
    author: 'Mallikarjun R & Clinical Vision AI Team',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: 2C30',
  },
  {
    id: 'eczema',
    slug: '/blog/eczema',
    title: 'Atopic Dermatitis & Eczema: Filaggrin Barrier Defects, Immunological Triggers & Moisture Protocols',
    excerpt: 'Detailed examination of epidermal barrier dysfunction, Th2 immune responses, trigger identification, topical immunomodulators, and daily moisture-locking clinical regimens.',
    category: 'Dermatology',
    readTime: '11 min read',
    date: 'August 2026',
    author: 'Medicus Labs Research Team',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: EA80',
  },
  {
    id: 'psoriasis',
    slug: '/blog/psoriasis',
    title: 'Plaque Psoriasis & Autoimmune Dermatology: T-Cell Mediated Pathogenesis & Biologic Therapies',
    excerpt: 'Comprehensive analysis of keratinocyte hyperproliferation, PASI evaluation standards, systemic immunosuppressants, phototherapy, and AI pattern recognition.',
    category: 'Dermatology',
    readTime: '13 min read',
    date: 'August 2026',
    author: 'Mallikarjun R & Clinical Review Team',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: EA90',
  },
  {
    id: 'rosacea',
    slug: '/blog/rosacea',
    title: 'Rosacea Subtypes: Erythematotelangiectatic to Papulopustular — Clinical Signs & Anti-Inflammatory Care',
    excerpt: 'Clinical identification guide for facial erythema, Demodex folliculorum hypersensitivity, neurovascular reactivity, topical ivermectin/brimonidine, and AI differential diagnosis.',
    category: 'Dermatology',
    readTime: '10 min read',
    date: 'August 2026',
    author: 'Medicus Labs Research Team',
    image: 'https://images.unsplash.com/photo-1512290900673-700200411b0b?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: ED90',
  },
  {
    id: 'skincare-guide',
    slug: '/blog/skincare-guide',
    title: 'Evidence-Based Dermatological Skincare: Ingredient Synergy & AI Pre-Screening Protocols',
    excerpt: 'Comprehensive dermatological protocol covering active ingredients (retinoids, niacinamide, L-ascorbic acid, ceramides), Fitzpatrick skin phototypes, and pre-screening workflows.',
    category: 'Skincare Protocols',
    readTime: '15 min read',
    date: 'August 2026',
    author: 'Mallikarjun R & Skincare Advisory Team',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    icdCode: 'Dermatological Guide',
  },
  {
    id: 'ringworm',
    slug: '/blog/ringworm',
    title: 'Tinea Corporis (Ringworm): Fungal Pathology, KOH Diagnosis & Antifungal Protocols',
    excerpt: 'Clinical guide on superficial dermatophytosis, Trichophyton rubrum etiology, annular scaly plaques, KOH wet mount preparation, and allylamine therapeutics.',
    category: 'Dermatology',
    readTime: '11 min read',
    date: 'August 2026',
    author: 'Medicus Clinical Research Team',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: 1F28',
  },
  {
    id: 'vitiligo',
    slug: '/blog/vitiligo',
    title: 'Vitiligo: Autoimmune Melanocyte Destruction, IFN-γ Signaling & Emerging Repigmentation Therapies',
    excerpt: 'In-depth reference on autoreactive CD8+ T-cell destruction of melanocytes, CXCL9/CXCL10 chemokines, topical Ruxolitinib 1.5%, and NB-UVB phototherapy.',
    category: 'Dermatology',
    readTime: '12 min read',
    date: 'August 2026',
    author: 'Mallikarjun R & Medicus Clinical Team',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: ED60',
  },
  {
    id: 'basal-cell',
    slug: '/blog/basal-cell',
    title: 'Basal Cell Carcinoma (BCC): Hedgehog Pathway Signaling, Subtypes & Mohs Surgical Protocols',
    excerpt: 'Clinical oncology guide on non-melanoma skin cancer, PTCH1 loss-of-function, nodular vs superficial variants, arborizing telangiectasia, and Mohs micrographic surgery.',
    category: 'Cancer Screening',
    readTime: '13 min read',
    date: 'August 2026',
    author: 'Medicus Clinical Oncology Group',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    icdCode: 'ICD-11: 2C31',
  },
];

const BlogIndex: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Dermatology', 'Cancer Screening', 'Skincare Protocols', 'AI Technology'];

  const filteredArticles = articlesList.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Dermatology Medical Journal & Skin AI Research | Medicus Labs"
        description="Explore peer-referenced clinical guides, dermatological research articles, AI skin analysis breakthroughs, and skin disease prevention protocols. Edited by Mallikarjun R & Medicus Labs Medical Team."
      />
      <div className="min-h-screen bg-[#FAF9F5] text-[#141515] font-sans">
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} /> Clinical Medical Library &amp; Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#141515] mb-4 leading-tight">
              Dermatological Insights &amp; AI Vision Research
            </h1>
            <p className="text-[#5A554A] text-base sm:text-lg leading-relaxed">
              Evidence-based medical guides, disease classification standards (ICD-11), skin barrier science, and AI diagnostic reference tools. Reviewed by our clinical engineering team.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-4 sm:p-6 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Box */}
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A857A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, ICD codes, symptoms..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#FAF9F5] border border-[#E5E2DA] text-sm text-[#141515] focus:outline-none focus:border-[#206E55] transition"
                />
              </div>

              {/* Category Pills */}
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

          {/* Featured Article Banner */}
          {filteredArticles.length > 0 && (
            <div className="mb-14 rounded-3xl bg-white border border-[#E5E2DA] overflow-hidden shadow-sm hover:shadow-md transition grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#E8F2ED] text-[#206E55] text-xs font-bold uppercase tracking-wider">
                      Featured Guide
                    </span>
                    {filteredArticles[0].icdCode && (
                      <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-semibold">
                        {filteredArticles[0].icdCode}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141515] mb-4 leading-snug">
                    <Link to={filteredArticles[0].slug} className="hover:text-[#206E55] transition">
                      {filteredArticles[0].title}
                    </Link>
                  </h2>
                  <p className="text-[#5A554A] text-sm sm:text-base leading-relaxed mb-6">
                    {filteredArticles[0].excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E2DA]">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#5A554A]">
                    <User size={14} className="text-[#206E55]" />
                    <span>{filteredArticles[0].author}</span>
                    <span>•</span>
                    <Clock size={14} className="text-[#8A857A]" />
                    <span>{filteredArticles[0].readTime}</span>
                  </div>
                  <Link
                    to={filteredArticles[0].slug}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#206E55] hover:underline"
                  >
                    Read Full Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 relative min-h-[260px]">
                <img
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Ad Container */}
          <AdSpace variant="banner" label="ADVERTISEMENT" className="my-8" />

          {/* Grid of Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article) => (
              <article
                key={article.id}
                className="bg-white border border-[#E5E2DA] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#206E55] text-xs font-bold uppercase tracking-wider shadow-sm">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    {article.icdCode && (
                      <span className="text-[11px] font-mono bg-[#FAF9F5] text-[#5A554A] border border-[#E5E2DA] px-2 py-0.5 rounded font-semibold inline-block mb-3">
                        {article.icdCode}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-[#141515] mb-3 group-hover:text-[#206E55] transition leading-snug">
                      <Link to={article.slug}>{article.title}</Link>
                    </h3>
                    <p className="text-[#5A554A] text-sm leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 border-t border-[#FAF9F5] mt-auto">
                  <div className="flex items-center justify-between text-xs text-[#8A857A] pt-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} />
                      <span>{article.readTime}</span>
                    </div>
                    <Link
                      to={article.slug}
                      className="inline-flex items-center gap-1 font-bold text-[#206E55] hover:underline"
                    >
                      Read <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Medical Disclaimer & Editorial Banner */}
          <div className="mt-16 bg-[#F3F1EB] border border-[#E5E2DA] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#206E55]/10 flex items-center justify-center text-[#206E55] flex-shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#141515] text-base mb-1">
                  Medical Editorial Integrity &amp; E-E-A-T Standards
                </h4>
                <p className="text-xs text-[#5A554A] leading-relaxed max-w-2xl">
                  All articles on Medicus Labs are authored and reviewed in accordance with clinical guidelines from ICD-11, ISIC Archive, and peer-reviewed dermatological research. Content is for educational reference and pre-screening support only.
                </p>
              </div>
            </div>
            <Link
              to="/editorial-policy"
              className="px-5 py-2.5 rounded-full bg-white border border-[#E5E2DA] text-[#206E55] font-bold text-xs hover:bg-[#E8F2ED] transition whitespace-nowrap shadow-sm"
            >
              Read Editorial Policy &rarr;
            </Link>
          </div>
        </main>

        <PremiumFooter />
      </div>
    </>
  );
};

export default BlogIndex;
