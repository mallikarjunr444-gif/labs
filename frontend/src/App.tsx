import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PremiumNavbar from './components/PremiumNavbar';
import {
  HeroSection,
  AboutSection,
  WorkflowSection,
  SupportedConditionsSection,
  FeaturesSection,
  UploadDashboard,
  ResultDashboard,
  FAQSection,
  ContactSection,
  PremiumFooter,
} from './sections';
import Home from './pages/Home';
import Features from './pages/Features';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PublicInfoPage from './pages/PublicInfoPage';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-white min-h-screen">
          <PremiumNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<PublicInfoPage type="about" />} />
            <Route path="/privacy-policy" element={<PublicInfoPage type="privacy" />} />
            <Route path="/terms-conditions" element={<PublicInfoPage type="terms" />} />
            <Route path="/disclaimer" element={<PublicInfoPage type="disclaimer" />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <PremiumFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
