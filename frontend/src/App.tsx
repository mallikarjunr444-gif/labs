import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PremiumHome from './pages/PremiumHome';
import Analysis from './pages/Analysis';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PremiumHome />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
