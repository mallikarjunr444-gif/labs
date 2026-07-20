
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
const BlogAcne = lazy(() => import('./pages/BlogAcne'));
const BlogEczema = lazy(() => import('./pages/BlogEczema'));
const BlogMelanoma = lazy(() => import('./pages/BlogMelanoma'));
const BlogPsoriasis = lazy(() => import('./pages/BlogPsoriasis'));

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
            {/* Blog Pages */}
            <Route path="/blog/acne" element={<BlogAcne />} />
            <Route path="/blog/eczema" element={<BlogEczema />} />
            <Route path="/blog/melanoma" element={<BlogMelanoma />} />
            <Route path="/blog/psoriasis" element={<BlogPsoriasis />} />
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
