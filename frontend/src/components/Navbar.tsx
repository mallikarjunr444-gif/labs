import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white rounded-full p-2 group-hover:shadow-lg transition">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75A4.25 4.25 0 001.5 5.75v8.5A4.25 4.25 0 005.75 18.5h8.5a4.25 4.25 0 004.25-4.25V9.5" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                <path d="M7 10h6M10 7v6" strokeWidth="2" stroke="currentColor" fill="none"/>
              </svg>
            </div>
            <span className="text-white text-xl font-bold hidden sm:inline">Medicus Labs™</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/analysis" className="text-white hover:text-blue-100 transition font-medium">
              Analysis
            </Link>
            <Link to="/history" className="text-white hover:text-blue-100 transition font-medium">
              History
            </Link>
            <Link to="/login" className="text-white hover:text-blue-100 transition font-medium">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/analysis" className="block text-white hover:bg-blue-700 px-3 py-2 rounded">
              Analysis
            </Link>
            <Link to="/history" className="block text-white hover:bg-blue-700 px-3 py-2 rounded">
              History
            </Link>
            <Link to="/login" className="block text-white hover:bg-blue-700 px-3 py-2 rounded">
              Login
            </Link>
            <Link to="/register" className="block bg-white text-blue-600 px-3 py-2 rounded font-bold">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
