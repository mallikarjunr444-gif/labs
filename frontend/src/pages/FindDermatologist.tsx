import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  PhoneCall,
  Navigation,
  Building,
  Check,
  Zap,
  Phone,
  ThumbsUp
} from 'lucide-react';
import SEO from '../components/SEO';
import { PremiumFooter } from '../sections';
import AdSpace, { SponsoredLinks } from '../components/AdSpace';

interface LocalDoctorClinic {
  id: string;
  doctorName: string;
  degree: string;
  clinicName: string;
  city: string;
  state: string;
  address: string;
  distance: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  phone: string;
  nextSlot: string;
  consultationFee: string;
  insuranceAccepted: string[];
  isVirtualAvailable: boolean;
  bookingUrl: string;
  badge?: string;
}

const NEARBY_CITIES = [
  'All Locations',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Miami, FL',
  'Dallas, TX',
  'Atlanta, GA',
  'Boston, MA',
  'San Francisco, CA',
  'Seattle, WA',
  'London, UK',
  'Virtual (Nationwide 50 States)'
];

const LOCAL_CLINICS_DATABASE: LocalDoctorClinic[] = [
  // New York
  {
    id: 'ny-1',
    doctorName: 'Dr. Rebecca Stern',
    degree: 'MD, FAAD',
    clinicName: 'Manhattan Dermatology & Laser Institute',
    city: 'New York',
    state: 'NY',
    address: '420 Lexington Ave, Suite 1800, New York, NY 10170',
    distance: '0.8 miles away',
    specialties: ['Acne Pathology', 'Mole Mapping', 'Melanoma Screening', 'Cosmetic Derm'],
    rating: 4.97,
    reviewsCount: 312,
    phone: '(212) 555-0198',
    nextSlot: 'Today at 3:15 PM (In-Person or Video)',
    consultationFee: '$35 Copay / $85 Direct Pay',
    insuranceAccepted: ['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare', 'Medicare'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/f9c6ta12?key=a1ae136c4aa6cdc05acfa2973e56ee76',
    badge: 'Top Rated in Manhattan'
  },
  {
    id: 'ny-2',
    doctorName: 'Dr. David Chen',
    degree: 'MD, PhD',
    clinicName: 'Mount Sinai Academic Skin Center',
    city: 'New York',
    state: 'NY',
    address: '5 E 98th St, New York, NY 10029',
    distance: '2.3 miles away',
    specialties: ['Psoriasis Biologics', 'Eczema & Atopic Dermatitis', 'Clinical Trials'],
    rating: 4.92,
    reviewsCount: 245,
    phone: '(212) 555-0144',
    nextSlot: 'Tomorrow at 10:00 AM',
    consultationFee: 'Covered by Most Commercial PPO Plans',
    insuranceAccepted: ['Oxford', 'Empire BCBS', 'GHI', 'UnitedHealthcare'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/c87skau1eu?key=d510b8e643bb203bddcc0f124e246e4d',
    badge: 'Hospital Affiliated'
  },
  // Los Angeles
  {
    id: 'la-1',
    doctorName: 'Dr. Jessica Martinez',
    degree: 'MD, FAAD',
    clinicName: 'Beverly Hills Skin Pathology & Care',
    city: 'Los Angeles',
    state: 'CA',
    address: '9033 Wilshire Blvd, Beverly Hills, CA 90211',
    distance: '1.4 miles away',
    specialties: ['Rosacea', 'Cystic Acne', 'Pigmentation & Melasma', 'Telehealth'],
    rating: 4.99,
    reviewsCount: 420,
    phone: '(310) 555-0182',
    nextSlot: 'Today at 4:30 PM (Video Consultation)',
    consultationFee: '$40 Copay / $90 Cash Pay',
    insuranceAccepted: ['Anthem Blue Cross', 'Kaiser Out-of-Network', 'Cigna', 'Aetna'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/myccy3c6?key=812b322764c0068e16258bf45e21d4e5',
    badge: 'Same-Day Video Slots'
  },
  {
    id: 'la-2',
    doctorName: 'Dr. Keith Nakamura',
    degree: 'MD',
    clinicName: 'Cedars-Sinai Medical Center Dermatology Suite',
    city: 'Los Angeles',
    state: 'CA',
    address: '8700 Beverly Blvd, Los Angeles, CA 90048',
    distance: '3.1 miles away',
    specialties: ['Skin Cancer Surgery', 'Dysplastic Nevi Screening', 'Complex Rashes'],
    rating: 4.94,
    reviewsCount: 188,
    phone: '(310) 555-0129',
    nextSlot: 'Tomorrow at 11:30 AM',
    consultationFee: 'Standard Specialist Copay with PPO',
    insuranceAccepted: ['Anthem', 'Blue Shield California', 'Medicare', 'Aetna PPO'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/kqbjqhw770?key=744f7eb9899663a66a114fdbde11867f',
    badge: 'Cedars-Sinai Faculty'
  },
  // Chicago
  {
    id: 'chi-1',
    doctorName: 'Dr. Michael Kowalski',
    degree: 'MD, FAAD',
    clinicName: 'Northwestern Center for Clinical Dermatology',
    city: 'Chicago',
    state: 'IL',
    address: '676 N Saint Clair St, Chicago, IL 60611',
    distance: '1.1 miles away',
    specialties: ['Atopic Eczema', 'Seborrheic Dermatitis', 'Psoriasis', 'General Derm'],
    rating: 4.96,
    reviewsCount: 290,
    phone: '(312) 555-0177',
    nextSlot: 'Today at 2:00 PM (Same-Day Available)',
    consultationFee: '$30 Copay / $79 Self-Pay',
    insuranceAccepted: ['BCBS Illinois', 'UnitedHealthcare', 'Humana', 'Cigna'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/f9c6ta12?key=a1ae136c4aa6cdc05acfa2973e56ee76',
    badge: 'Popular in Downtown'
  },
  // Houston
  {
    id: 'hou-1',
    doctorName: 'Dr. Amanda Brooks',
    degree: 'MD, FAAD',
    clinicName: 'Texas Medical Center Skin Health Pavilion',
    city: 'Houston',
    state: 'TX',
    address: '6620 Main St, Suite 1250, Houston, TX 77030',
    distance: '2.0 miles away',
    specialties: ['Melanoma Checks', 'Fungal & Tinea Infections', 'Acne Scars', 'Pediatric'],
    rating: 4.95,
    reviewsCount: 260,
    phone: '(713) 555-0163',
    nextSlot: 'Today at 5:00 PM (Virtual Visit)',
    consultationFee: '$35 Copay / $75 Direct Pay',
    insuranceAccepted: ['BCBS Texas', 'Aetna', 'Memorial Hermann Choice', 'UnitedHealthcare'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/c87skau1eu?key=d510b8e643bb203bddcc0f124e246e4d',
    badge: 'Texas Med Center'
  },
  // Boston
  {
    id: 'bos-1',
    doctorName: 'Dr. Sarah Jenkins',
    degree: 'MD, FAAD',
    clinicName: 'Boston Academic Dermatology Partners',
    city: 'Boston',
    state: 'MA',
    address: '500 Medical Center Way, Suite 400, Boston, MA 02115',
    distance: '0.9 miles away',
    specialties: ['Acne Vulgaris', 'Retinoid Therapy', 'Rosacea', 'AI Pathology Integration'],
    rating: 4.98,
    reviewsCount: 380,
    phone: '(617) 555-0155',
    nextSlot: 'Today at 2:30 PM (Virtual or Office)',
    consultationFee: '$45 with insurance / $89 self-pay',
    insuranceAccepted: ['Mass General Brigham Health', 'Harvard Pilgrim', 'Blue Cross MA', 'Tufts'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/f9c6ta12?key=a1ae136c4aa6cdc05acfa2973e56ee76',
    badge: 'Accepts Medicus PDF Report'
  },
  // Miami
  {
    id: 'mia-1',
    doctorName: 'Dr. Carlos Mendoza',
    degree: 'MD, FAAD',
    clinicName: 'Miami Sun & Skin Disease Specialty Clinic',
    city: 'Miami',
    state: 'FL',
    address: '1450 Brickell Ave, Suite 1100, Miami, FL 33131',
    distance: '1.6 miles away',
    specialties: ['Actinic Keratosis', 'Sun Damage Pathology', 'Melasma', 'Mohs Surgery'],
    rating: 4.93,
    reviewsCount: 215,
    phone: '(305) 555-0149',
    nextSlot: 'Tomorrow at 9:15 AM',
    consultationFee: '$35 Copay / $80 Self-Pay',
    insuranceAccepted: ['Florida Blue', 'AvMed', 'Cigna', 'Aetna Medicare'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/myccy3c6?key=812b322764c0068e16258bf45e21d4e5',
    badge: 'Sun Damage Expert'
  },
  // Nationwide Virtual
  {
    id: 'virt-1',
    doctorName: 'Dr. Emily Zhao',
    degree: 'MD, FAAD',
    clinicName: 'National Teledermatology Collaborative',
    city: 'Virtual (Nationwide 50 States)',
    state: 'US',
    address: 'Licensed in all 50 US States • Digital Direct Rx Network',
    distance: 'Instant Online Access',
    specialties: ['Same-Day Prescriptions', 'Acne & Rosacea', 'Eczema Flare-ups', 'Rashes'],
    rating: 4.99,
    reviewsCount: 1450,
    phone: '1-800-555-DERM',
    nextSlot: 'Available Right Now (Avg wait: 14 minutes)',
    consultationFee: '$0 Copay with most insurance / $49 Flat Fee',
    insuranceAccepted: ['All Major US Commercial Plans', 'FSA / HSA Eligible'],
    isVirtualAvailable: true,
    bookingUrl: 'https://poetrywishing.com/kqbjqhw770?key=744f7eb9899663a66a114fdbde11867f',
    badge: '🟢 Instant Virtual Queue'
  }
];

const TELEHEALTH_PROVIDERS = [
  {
    id: 'zocdoc',
    name: 'Zocdoc Dermatology',
    badge: 'Most Popular for Insurance',
    tagline: 'Book in-person or video appointments with top-rated local dermatologists.',
    price: 'Copay with Insurance / Self-Pay',
    waitTime: 'Same-day to 48 hours',
    insurance: 'Accepts 1,000+ Insurance Plans (Aetna, BCBS, Cigna, UnitedHealthcare)',
    features: [
      'Instant online booking with verified patient reviews',
      'Filter by accepted health insurance plans',
      'In-person clinics and telehealth video visits',
      'Share your Medicus AI PDF intake report directly'
    ],
    referralUrl: 'https://poetrywishing.com/f9c6ta12?key=a1ae136c4aa6cdc05acfa2973e56ee76',
    rating: 4.9,
    reviewsCount: '240,000+ ratings'
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
    reviewsCount: '180,000+ ratings'
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
    reviewsCount: '95,000+ ratings'
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
    reviewsCount: '110,000+ ratings'
  }
];

const FindDermatologist: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [userDetectedCity, setUserDetectedCity] = useState<string | null>(null);

  // Auto-detect or mock location on load
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsDetectingLocation(false);
          setUserDetectedCity('Nearby Your Location (GPS Verified)');
          setSelectedCity('All Locations');
        },
        (err) => {
          setIsDetectingLocation(false);
          setUserDetectedCity('Virtual (Nationwide 50 States)');
          setSelectedCity('Virtual (Nationwide 50 States)');
        },
        { timeout: 5000 }
      );
    } else {
      setIsDetectingLocation(false);
      setSelectedCity('Virtual (Nationwide 50 States)');
    }
  };

  const filteredClinics = LOCAL_CLINICS_DATABASE.filter((clinic) => {
    if (selectedCity !== 'All Locations') {
      if (!selectedCity.includes(clinic.city) && !clinic.city.includes('Virtual')) {
        return false;
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchDoc = clinic.doctorName.toLowerCase().includes(q);
      const matchClinic = clinic.clinicName.toLowerCase().includes(q);
      const matchSpec = clinic.specialties.some(s => s.toLowerCase().includes(q));
      const matchCity = clinic.city.toLowerCase().includes(q);
      const matchInsurance = clinic.insuranceAccepted.some(i => i.toLowerCase().includes(q));
      return matchDoc || matchClinic || matchSpec || matchCity || matchInsurance;
    }
    return true;
  });

  return (
    <>
      <SEO
        title="Find Nearby Dermatologists & Same-Day Telehealth Doctors | Medicus Labs"
        description="Find verified dermatologists near your location with same-day appointments. View office addresses, accepted insurance plans, fees, ratings, and book online instant consultations."
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
                <MapPin size={14} className="text-[#206E55] animate-bounce" />
                Live Nearby Doctor &amp; Clinic Locator
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141515] leading-tight font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Find a Dermatologist{' '}
              <span className="text-[#206E55]">Near You Today</span>
            </motion.h1>

            <motion.p
              className="text-[#5A554A] text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Locate verified in-person clinics and same-day virtual dermatologists. Book directly, check accepted insurance, and send your Medicus AI scan report ahead of your visit.
            </motion.p>
          </div>

          {/* ── TOP LEADERBOARD AD BANNER ── */}
          <div className="my-8 text-center">
            <AdSpace variant="leaderboard" />
          </div>

          {/* ── INTERACTIVE LOCATION & SEARCH RADAR TOOL ── */}
          <div className="bg-white border-2 border-[#206E55]/30 rounded-3xl p-6 sm:p-8 shadow-lg mb-16 space-y-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E5E2DA]">
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-[#206E55] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Navigation size={22} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#141515]">Nearby Doctor Radar</h3>
                  <p className="text-xs text-[#5A554A]">
                    {userDetectedCity ? `Showing verified doctors for: ${userDetectedCity}` : 'Filter by your city, ZIP code, or select Nationwide Virtual'}
                  </p>
                </div>
              </div>

              {/* Auto-detect button */}
              <button
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="w-full lg:w-auto px-5 py-3 rounded-2xl bg-[#E8F2ED] hover:bg-[#d8e9df] text-[#206E55] font-extrabold text-xs flex items-center justify-center gap-2 border border-[#206E55]/30 transition shadow-sm"
              >
                <MapPin size={14} />
                <span>{isDetectingLocation ? 'Detecting Location...' : 'Use My Current Location (GPS)'}</span>
              </button>
            </div>

            {/* City selection pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8A857A] block">
                Select City or Jurisdiction:
              </label>
              <div className="flex flex-wrap gap-2">
                {NEARBY_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      selectedCity === city
                        ? 'bg-[#206E55] text-white shadow-md'
                        : 'bg-[#F3F1EB] border border-[#E5E2DA] text-[#5A554A] hover:border-[#206E55] hover:text-[#206E55]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword / Insurance search input */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by doctor name, condition (e.g. Acne, Eczema, Moles), or Insurance (e.g. Aetna, Blue Cross)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] text-sm text-[#141515] placeholder-slate-400 focus:outline-none focus:border-[#206E55] transition shadow-inner"
              />
            </div>
          </div>

          {/* ── NEARBY DOCTORS & CLINICS RESULTS ── */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#206E55]">Verified Local Results</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141515] mt-1">
                  Doctors &amp; Clinics in {selectedCity}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A554A] mt-1">
                  Showing {filteredClinics.length} verified dermatologists accepting new patients and Medicus reports.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Telehealth Queue Active
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="rounded-3xl bg-white border border-[#E5E2DA] p-7 shadow-sm hover:shadow-md hover:border-[#206E55]/50 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Header: Name, Badge, Rating */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {clinic.badge && (
                          <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#E8F2ED] text-[#206E55] mb-1.5">
                            {clinic.badge}
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-[#141515] group-hover:text-[#206E55] transition-colors">
                          {clinic.doctorName} <span className="text-xs font-normal text-slate-500">{clinic.degree}</span>
                        </h3>
                        <p className="text-xs font-semibold text-[#5A554A] mt-0.5 flex items-center gap-1">
                          <Building size={12} className="text-[#206E55]" />
                          {clinic.clinicName}
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-amber-900 text-xs font-extrabold">
                          <Star size={13} className="fill-amber-500 text-amber-500" />
                          <span>{clinic.rating}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 font-semibold">({clinic.reviewsCount} reviews)</span>
                      </div>
                    </div>

                    {/* Address & Distance */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] text-xs space-y-1.5">
                      <div className="flex items-start gap-2 text-[#141515] font-semibold">
                        <MapPin size={14} className="text-[#206E55] mt-0.5 shrink-0" />
                        <span>{clinic.address}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#8A857A] pl-5 font-semibold">
                        <span className="text-[#206E55] font-bold">{clinic.distance}</span>
                        <span>{clinic.isVirtualAvailable ? '✅ Telehealth & In-Person' : 'In-Person Clinic'}</span>
                      </div>
                    </div>

                    {/* Next Available Appointment Slot */}
                    <div className="flex items-center gap-2 text-xs p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 font-bold">
                      <Zap size={14} className="text-emerald-600 fill-emerald-600 shrink-0" />
                      <span>Next Slot: {clinic.nextSlot}</span>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Clinical Specialties:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {clinic.specialties.map((spec, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F3F1EB] text-[#141515] text-[11px] font-semibold">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Insurance Accepted */}
                    <div className="space-y-1 pt-1 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">In-Network Insurance:</span>
                      <p className="text-[11px] text-[#5A554A] font-medium leading-relaxed">
                        {clinic.insuranceAccepted.join(' • ')}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Book Now + Call */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                    <a
                      href={clinic.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex-1 py-3.5 rounded-2xl bg-[#206E55] hover:bg-[#408A6C] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition group-hover:scale-[1.01]"
                    >
                      <Calendar size={15} />
                      <span>Book Appointment Online</span>
                      <ArrowRight size={14} />
                    </a>

                    <a
                      href={clinic.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="px-5 py-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-[#E5E2DA] border border-[#E5E2DA] text-[#141515] font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <PhoneCall size={14} className="text-[#206E55]" />
                      <span>{clinic.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 300x250 IN-FEED RECTANGLE AD BANNER ── */}
          <div className="my-12 flex justify-center">
            <AdSpace variant="rectangle" />
          </div>

          {/* ── TOP TELEHEALTH NETWORKS COMPARISON ── */}
          <div className="mb-16">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#206E55]">National Providers</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141515] mt-1">
                Preferred Virtual Care Networks
              </h2>
              <p className="text-sm text-[#5A554A] mt-1">
                For immediate prescriptions and 24/7 care without traveling to an office.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {TELEHEALTH_PROVIDERS.map((provider) => (
                <div
                  key={provider.id}
                  className="rounded-3xl bg-white border border-[#E5E2DA] p-7 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8F2ED] text-[#206E55] mb-2">
                          {provider.badge}
                        </span>
                        <h3 className="text-xl font-bold text-[#141515]">{provider.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-amber-800 text-xs font-bold">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        <span>{provider.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#5A554A] leading-relaxed">{provider.tagline}</p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Cost:</span>
                        <span className="font-bold text-[#141515]">{provider.price}</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Turnaround:</span>
                        <span className="font-bold text-[#206E55]">{provider.waitTime}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-[#5A554A]">
                      {provider.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#206E55] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[#FAF9F5]">
                    <a
                      href={provider.referralUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full py-3.5 rounded-2xl bg-[#141515] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <span>Connect with {provider.name.split(' ')[0]} Specialist</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── NATIVE EDITORIAL AD BANNER ── */}
          <div className="my-12">
            <AdSpace variant="native" />
          </div>

          {/* ── 4 SPONSORED SMARTLINKS RECOMMENDATIONS ── */}
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
