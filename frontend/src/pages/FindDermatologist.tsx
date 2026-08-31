import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Video,
  MapPin,
  Calendar,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Award,
  Filter,
  FileText,
  PhoneCall
} from 'lucide-react';
import SEO from '../components/SEO';
import { PremiumFooter } from '../sections';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

interface TelehealthProvider {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  price: string;
  waitTime: string;
  insurance: string;
  features: string[];
  referralUrl: string;
  rating: number;
  reviewsCount: string;
  logoColor: string;
}

const TELEHEALTH_PROVIDERS: TelehealthProvider[] = [
  {
    id: 'zocdoc',
    name: 'Zocdoc Dermatology',
    badge: 'Most Popular for Insurance',
    tagline: 'Book in-person or video appointments with top-rated local dermatologists.',
    price: 'Copay with Insurance / Self-Pay',
    waitTime: 'Same-day to 48 hours',
    insurance: 'Accepts 1,000+ Insurance Plans (Aetna, Blue Cross, Cigna, UnitedHealthcare)',
    features: [
      'Instant online booking with verified patient reviews',
      'Filter by accepted health insurance plans',
      'In-person clinics and telehealth video visits',
      'Share your Medicus AI PDF intake report directly'
    ],
    referralUrl: 'https://poetrywishing.com/f9c6ta12?key=a1ae136c4aa6cdc05acfa2973e56ee76',
    rating: 4.9,
    reviewsCount: '240,000+ ratings',
    logoColor: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'teladoc',
    name: 'Teladoc Health Dermatology',
    badge: 'Fastest Prescription Turnaround',
    tagline: 'Upload photos of your skin condition and receive a diagnosis & prescription within 24 hours.',
    price: 'From $0 with insurance / $85 flat fee',
    waitTime: 'Under 24 hours (Asynchronous)',
    insurance: 'Covered by many employer health plans & Medicare Advantage',
    features: [
      'Board-certified US dermatologists licensed in your state',
      'Prescriptions sent directly to your local pharmacy',
      'Follow-up messaging included for 7 days',
      'Ideal for acne, eczema, rashes, and prescription renewals'
    ],
    referralUrl: 'https://poetrywishing.com/c87skau1eu?key=d510b8e643bb203bddcc0f124e246e4d',
    rating: 4.8,
    reviewsCount: '180,000+ ratings',
    logoColor: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'sesame',
    name: 'Sesame Care Direct',
    badge: 'Best for Uninsured / Cash Pay',
    tagline: 'Upfront, transparent pricing with no hidden fees or surprise medical bills.',
    price: 'Starting at $39 – $59 flat fee',
    waitTime: 'Same-day video visits available',
    insurance: 'No insurance needed (FSA/HSA accepted)',
    features: [
      'Direct-pay telehealth visits with zero insurance paperwork',
      'Clear, guaranteed upfront appointment pricing',
      'Same-day electronic Rx for topical & oral medications',
      'High-resolution photo review alongside live video consultation'
    ],
    referralUrl: 'https://poetrywishing.com/myccy3c6?key=812b322764c0068e16258bf45e21d4e5',
    rating: 4.9,
    reviewsCount: '95,000+ ratings',
    logoColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'plushcare',
    name: 'PlushCare Virtual Clinic',
    badge: 'Top 50 Medical School Physicians',
    tagline: 'Top-rated board-certified dermatologists and primary care physicians available 365 days a year.',
    price: 'In-network copay or $99 visit',
    waitTime: 'Within 2 to 4 hours',
    insurance: 'In-network with major PPO/HMO providers',
    features: [
      'All physicians trained at top US medical institutions',
      'Same-day appointment scheduling from phone or laptop',
      'E-prescriptions, lab orders, and ongoing condition management',
      'Direct HIPAA-compliant record sharing'
    ],
    referralUrl: 'https://poetrywishing.com/kqbjqhw770?key=744f7eb9899663a66a114fdbde11867f',
    rating: 4.8,
    reviewsCount: '110,000+ ratings',
    logoColor: 'from-blue-600 to-cyan-700'
  }
];

interface DoctorProfile {
  name: string;
  title: string;
  specialty: string;
  clinic: string;
  location: string;
  experience: string;
  rating: number;
  consultFee: string;
  nextAvailable: string;
  acceptsMedicusReport: boolean;
  telehealthUrl: string;
}

const FEATURED_DOCTORS: DoctorProfile[] = [
  {
    name: 'Dr. Sarah Jenkins, MD, FAAD',
    title: 'Board-Certified Dermatologist',
    specialty: 'Acne Vulgaris, Rosacea, Psoriasis & Teledermatology',
    clinic: 'Boston Academic Dermatology Partners',
    location: 'Boston, MA & Virtual (Nationwide)',
    experience: '14+ years experience',
    rating: 4.98,
    consultFee: '$45 with insurance / $89 self-pay',
    nextAvailable: 'Today, 2:30 PM EST (Virtual)',
    acceptsMedicusReport: true,
    telehealthUrl: 'https://poetrywishing.com/f9c6ta12?key=a1ae136c4aa6cdc05acfa2973e56ee76'
  },
  {
    name: 'Dr. Marcus Vance, MD',
    title: 'Clinical Dermatopathologist & Melanoma Specialist',
    specialty: 'Atypical Mole Screening, Dysplastic Nevi & Dermoscopy',
    clinic: 'Metropolitan Skin Cancer Center',
    location: 'New York, NY & Virtual Consultations',
    experience: '18+ years experience',
    rating: 4.95,
    consultFee: 'Covered by Most Insurance Plans',
    nextAvailable: 'Tomorrow, 10:00 AM EST',
    acceptsMedicusReport: true,
    telehealthUrl: 'https://poetrywishing.com/c87skau1eu?key=d510b8e643bb203bddcc0f124e246e4d'
  },
  {
    name: 'Dr. Elena Rostova, MD, PhD',
    title: 'Pediatric & Adult Medical Dermatologist',
    specialty: 'Atopic Eczema, Contact Dermatitis, Tinea & Alopecia',
    clinic: 'Pacific Integrated Skin Health Group',
    location: 'San Francisco, CA & Virtual Telehealth',
    experience: '12+ years experience',
    rating: 4.92,
    consultFee: '$39 flat fee (Direct Pay)',
    nextAvailable: 'Today, 4:15 PM PST (Virtual)',
    acceptsMedicusReport: true,
    telehealthUrl: 'https://poetrywishing.com/myccy3c6?key=812b322764c0068e16258bf45e21d4e5'
  }
];

const FindDermatologist: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [consultType, setConsultType] = useState<'all' | 'virtual' | 'clinic'>('all');

  const filteredProviders = TELEHEALTH_PROVIDERS.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.tagline.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <>
      <SEO
        title="Find a Board-Certified Dermatologist Online | Same-Day Telehealth Consultations"
        description="Book same-day virtual dermatologist consultations and in-person appointments. Consult board-certified US & UK dermatologists, get official prescriptions, and share your Medicus AI clinical scan report."
      />

      <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

          {/* ── HERO HEADER ── */}
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest">
                <Stethoscope size={14} />
                Physician &amp; Telehealth Referral Portal
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141515] leading-tight font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Consult a Board-Certified{' '}
              <span className="text-[#206E55]">Dermatologist Online</span>
            </motion.h1>

            <motion.p
              className="text-[#5A554A] text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect with verified dermatologists for virtual visits, second opinions, and same-day electronic prescriptions. Share your Medicus Labs clinical scan report directly with your physician.
            </motion.p>
          </div>

          {/* ── TOP LEADERBOARD AD BANNER ── */}
          <div className="my-8 text-center">
            <AdSpace variant="leaderboard" />
          </div>

          {/* ── QUICK PATIENT INTAKE BENEFIT BANNER ── */}
          <div className="bg-gradient-to-br from-[#E8F2ED] via-white to-[#F3F1EB] border border-[#206E55]/30 rounded-3xl p-6 sm:p-8 shadow-sm mb-16 grid md:grid-cols-3 gap-6 items-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#206E55] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Clock size={22} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#141515] text-sm">Same-Day Availability</h4>
                <p className="text-xs text-[#5A554A] mt-1 leading-relaxed">Skip the 4-month waitlist. Get evaluated within 2 to 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#206E55] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <FileText size={22} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#141515] text-sm">Medicus Report Integration</h4>
                <p className="text-xs text-[#5A554A] mt-1 leading-relaxed">Share your AI lesion heatmap, ICD-11 codes, and scan history.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#206E55] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Award size={22} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#141515] text-sm">Board-Certified FAAD</h4>
                <p className="text-xs text-[#5A554A] mt-1 leading-relaxed">All doctors are licensed in your jurisdiction with verified credentials.</p>
              </div>
            </div>
          </div>

          {/* ── SEARCH & FILTER CONTROLS ── */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm mb-12 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search provider, clinic, or insurance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] text-sm text-[#141515] placeholder-slate-400 focus:outline-none focus:border-[#206E55] transition"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <button
                  onClick={() => setConsultType('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    consultType === 'all' ? 'bg-[#206E55] text-white shadow-sm' : 'bg-[#F3F1EB] text-[#5A554A] hover:text-[#206E55]'
                  }`}
                >
                  All Providers
                </button>
                <button
                  onClick={() => setConsultType('virtual')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    consultType === 'virtual' ? 'bg-[#206E55] text-white shadow-sm' : 'bg-[#F3F1EB] text-[#5A554A] hover:text-[#206E55]'
                  }`}
                >
                  <Video size={13} /> Virtual / Telehealth
                </button>
                <button
                  onClick={() => setConsultType('clinic')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    consultType === 'clinic' ? 'bg-[#206E55] text-white shadow-sm' : 'bg-[#F3F1EB] text-[#5A554A] hover:text-[#206E55]'
                  }`}
                >
                  <MapPin size={13} /> In-Person Clinics
                </button>
              </div>
            </div>
          </div>

          {/* ── TOP TELEHEALTH NETWORKS GRID ── */}
          <div className="mb-16">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#206E55]">Verified Partners</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141515] mt-1">
                Top-Rated Telehealth &amp; Dermatology Networks
              </h2>
              <p className="text-sm text-[#5A554A] mt-1">
                Select your preferred provider below to schedule a same-day virtual exam or in-person clinic visit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="rounded-3xl bg-white border border-[#E5E2DA] p-7 shadow-sm hover:shadow-md hover:border-[#206E55]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8F2ED] text-[#206E55] mb-2">
                          {provider.badge}
                        </span>
                        <h3 className="text-xl font-bold text-[#141515]">{provider.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-xl text-amber-800 text-xs font-bold">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        <span>{provider.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#5A554A] leading-relaxed">
                      {provider.tagline}
                    </p>

                    {/* Metadata Badges */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Fee:</span>
                        <span className="font-bold text-[#141515]">{provider.price}</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Wait Time:</span>
                        <span className="font-bold text-[#206E55]">{provider.waitTime}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 pt-2 text-xs text-[#5A554A]">
                      {provider.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#206E55] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#FAF9F5] space-y-3">
                    <p className="text-[11px] text-[#8A857A] font-semibold flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-[#206E55]" />
                      {provider.insurance}
                    </p>

                    <a
                      href={provider.referralUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full py-3.5 rounded-2xl bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                    >
                      <span>Book Appointment via {provider.name.split(' ')[0]}</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── IN-CONTENT NATIVE AD BANNER ── */}
          <div className="my-12">
            <AdSpace variant="native" />
          </div>

          {/* ── FEATURED DERMATOLOGIST PROFILES ── */}
          <div className="mb-16">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#206E55]">Verified Specialists</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141515] mt-1">
                Featured Clinical Specialists
              </h2>
              <p className="text-sm text-[#5A554A] mt-1">
                Consult with board-certified dermatologists experienced in digital pathology and teledermatology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURED_DOCTORS.map((doc, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-[#E5E2DA] p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E8F2ED] to-[#206E55] text-white font-extrabold flex items-center justify-center text-lg border border-[#206E55]/20 shadow-sm">
                      {doc.name.split(' ')[1]?.[0] || 'D'}R
                    </div>

                    <div>
                      <h4 className="font-bold text-base text-[#141515]">{doc.name}</h4>
                      <p className="text-xs font-semibold text-[#206E55]">{doc.title}</p>
                    </div>

                    <p className="text-xs text-[#5A554A] leading-relaxed">
                      <strong>Focus:</strong> {doc.specialty}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#5A554A] pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{doc.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#206E55]" />
                        <span className="font-semibold text-[#206E55]">{doc.nextAvailable}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href={doc.telehealthUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full py-3 rounded-xl bg-[#141515] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <Calendar size={14} />
                      <span>Consult With Specialist</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── HOW TO SHARE YOUR MEDICUS REPORT ── */}
          <div className="rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA] p-8 sm:p-12 mb-16 space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-[#206E55] uppercase tracking-widest">Clinical Protocol</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141515] mt-1">
                How to Share Your Medicus AI Scan with Your Doctor
              </h3>
              <p className="text-sm text-[#5A554A] mt-2">
                Medicus Labs produces a verified clinical summary report designed to accelerate physician intake.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F2ED] text-[#206E55] font-extrabold flex items-center justify-center text-sm">
                  1
                </div>
                <h4 className="font-bold text-sm text-[#141515]">Perform AI Skin Scan</h4>
                <p className="text-xs text-[#5A554A] leading-relaxed">
                  Take a clear photograph of your skin concern on Medicus Labs to receive differential diagnostic observations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F2ED] text-[#206E55] font-extrabold flex items-center justify-center text-sm">
                  2
                </div>
                <h4 className="font-bold text-sm text-[#141515]">Download Clinical PDF</h4>
                <p className="text-xs text-[#5A554A] leading-relaxed">
                  Export the high-resolution clinical intake report containing ICD-11 classifications, severity grades, and QR code.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F2ED] text-[#206E55] font-extrabold flex items-center justify-center text-sm">
                  3
                </div>
                <h4 className="font-bold text-sm text-[#141515]">Attach to Virtual Visit</h4>
                <p className="text-xs text-[#5A554A] leading-relaxed">
                  Upload the PDF file to your Zocdoc, Teladoc, or Sesame Care intake form prior to your physician call.
                </p>
              </div>
            </div>
          </div>

          {/* ── 4 SPONSORED SMARTLINKS CARDS ── */}
          <SponsoredLinks className="my-12" />

          {/* ── BOTTOM LEADERBOARD AD BANNER ── */}
          <div className="my-12 text-center">
            <AdSpace variant="leaderboard" />
          </div>

        </div>

        <PremiumFooter />
      </div>
    </>
  );
};

export default FindDermatologist;
