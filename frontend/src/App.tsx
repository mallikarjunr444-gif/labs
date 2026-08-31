import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const Analysis = lazy(() => import('./pages/Analysis'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const ReportIssue = lazy(() => import('./pages/ReportIssue'));
const FounderPage = lazy(() => import('./pages/FounderPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const FindDermatologist = lazy(() => import('./pages/FindDermatologist'));

/* Blog & Knowledge Library Pages */
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogAcne = lazy(() => import('./pages/BlogAcne'));
const BlogEczema = lazy(() => import('./pages/BlogEczema'));
const BlogMelanoma = lazy(() => import('./pages/BlogMelanoma'));
const BlogPsoriasis = lazy(() => import('./pages/BlogPsoriasis'));
const BlogRosacea = lazy(() => import('./pages/BlogRosacea'));
const BlogSkincareGuide = lazy(() => import('./pages/BlogSkincareGuide'));
const BlogRingworm = lazy(() => import('./pages/BlogRingworm'));
const BlogVitiligo = lazy(() => import('./pages/BlogVitiligo'));
const BlogBasalCell = lazy(() => import('./pages/BlogBasalCell'));
const BlogSeborrheicDermatitis = lazy(() => import('./pages/BlogSeborrheicDermatitis'));
const BlogPerioralDermatitis = lazy(() => import('./pages/BlogPerioralDermatitis'));
const BlogContactDermatitis = lazy(() => import('./pages/BlogContactDermatitis'));
const BlogHidradenitis = lazy(() => import('./pages/BlogHidradenitis'));
const BlogSCC = lazy(() => import('./pages/BlogSCC'));
const BlogActinicKeratosis = lazy(() => import('./pages/BlogActinicKeratosis'));
const BlogSeborrheicKeratosis = lazy(() => import('./pages/BlogSeborrheicKeratosis'));
const BlogDysplasticNevi = lazy(() => import('./pages/BlogDysplasticNevi'));
const BlogSkinTags = lazy(() => import('./pages/BlogSkinTags'));
const BlogKeratoacanthoma = lazy(() => import('./pages/BlogKeratoacanthoma'));
const BlogTineaVersicolor = lazy(() => import('./pages/BlogTineaVersicolor'));
const BlogOnychomycosis = lazy(() => import('./pages/BlogOnychomycosis'));
const BlogTineaPedis = lazy(() => import('./pages/BlogTineaPedis'));
const BlogMolluscum = lazy(() => import('./pages/BlogMolluscum'));
const BlogShingles = lazy(() => import('./pages/BlogShingles'));
const BlogFolliculitis = lazy(() => import('./pages/BlogFolliculitis'));
const BlogImpetigo = lazy(() => import('./pages/BlogImpetigo'));
const BlogMelasma = lazy(() => import('./pages/BlogMelasma'));
const BlogPIH = lazy(() => import('./pages/BlogPIH'));
const BlogAlopecia = lazy(() => import('./pages/BlogAlopecia'));
const BlogOilySkin = lazy(() => import('./pages/BlogOilySkin'));
const BlogRetinoidsGuide = lazy(() => import('./pages/BlogRetinoidsGuide'));
const BlogHowAIDetects = lazy(() => import('./pages/BlogHowAIDetects'));
const BlogAcneVsRosacea = lazy(() => import('./pages/BlogAcneVsRosacea'));
const BlogWhenToVisitDoctor = lazy(() => import('./pages/BlogWhenToVisitDoctor'));

/* Research & Editorial Policy */
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const EditorialPolicy = lazy(() => import('./pages/EditorialPolicy'));

import PremiumNavbar from './components/PremiumNavbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PageLoader from './components/PageLoader';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PremiumNavbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/find-dermatologist" element={<FindDermatologist />} />
            <Route path="/book-doctor" element={<FindDermatologist />} />

            {/* Medical Library & Blog Pages */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/acne" element={<BlogAcne />} />
            <Route path="/blog/eczema" element={<BlogEczema />} />
            <Route path="/blog/melanoma" element={<BlogMelanoma />} />
            <Route path="/blog/psoriasis" element={<BlogPsoriasis />} />
            <Route path="/blog/rosacea" element={<BlogRosacea />} />
            <Route path="/blog/skincare-guide" element={<BlogSkincareGuide />} />
            <Route path="/blog/ringworm" element={<BlogRingworm />} />
            <Route path="/blog/vitiligo" element={<BlogVitiligo />} />
            <Route path="/blog/basal-cell" element={<BlogBasalCell />} />
            <Route path="/blog/seborrheic-dermatitis" element={<BlogSeborrheicDermatitis />} />
            <Route path="/blog/perioral-dermatitis" element={<BlogPerioralDermatitis />} />
            <Route path="/blog/contact-dermatitis" element={<BlogContactDermatitis />} />
            <Route path="/blog/hidradenitis-suppurativa" element={<BlogHidradenitis />} />
            <Route path="/blog/squamous-cell-carcinoma" element={<BlogSCC />} />
            <Route path="/blog/actinic-keratosis" element={<BlogActinicKeratosis />} />
            <Route path="/blog/seborrheic-keratosis" element={<BlogSeborrheicKeratosis />} />
            <Route path="/blog/dysplastic-nevi" element={<BlogDysplasticNevi />} />
            <Route path="/blog/skin-tags" element={<BlogSkinTags />} />
            <Route path="/blog/keratoacanthoma" element={<BlogKeratoacanthoma />} />
            <Route path="/blog/tinea-versicolor" element={<BlogTineaVersicolor />} />
            <Route path="/blog/onychomycosis" element={<BlogOnychomycosis />} />
            <Route path="/blog/tinea-pedis" element={<BlogTineaPedis />} />
            <Route path="/blog/molluscum-contagiosum" element={<BlogMolluscum />} />
            <Route path="/blog/shingles" element={<BlogShingles />} />
            <Route path="/blog/folliculitis" element={<BlogFolliculitis />} />
            <Route path="/blog/impetigo" element={<BlogImpetigo />} />
            <Route path="/blog/melasma" element={<BlogMelasma />} />
            <Route path="/blog/post-inflammatory-hyperpigmentation" element={<BlogPIH />} />
            <Route path="/blog/alopecia-areata" element={<BlogAlopecia />} />
            <Route path="/blog/skincare-oily-skin" element={<BlogOilySkin />} />
            <Route path="/blog/retinoids-guide" element={<BlogRetinoidsGuide />} />
            <Route path="/blog/how-ai-detects-skin-diseases" element={<BlogHowAIDetects />} />
            <Route path="/blog/acne-vs-rosacea" element={<BlogAcneVsRosacea />} />
            <Route path="/blog/when-to-visit-dermatologist" element={<BlogWhenToVisitDoctor />} />

            {/* Research & Editorial Policy */}
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Support Pages */}
            <Route path="/report" element={<ReportIssue />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
