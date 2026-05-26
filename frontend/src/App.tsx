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
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
