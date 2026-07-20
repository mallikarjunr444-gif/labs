import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, TrendingUp, Activity, Download, Calendar, ArrowRight,
  User, Clock, CheckCircle, AlertCircle, Edit2, ShieldAlert, Sparkles, Plus
} from 'lucide-react';
import { PremiumFooter } from '../sections';

const Dashboard: React.FC = () => {
  const [profileName, setProfileName] = useState('Dr. Alex Morgan');
  const [memberSince] = useState('Jan 15, 2026');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [draftProfileName, setDraftProfileName] = useState('Dr. Alex Morgan');

  const stats = [
    { label: 'Total Scans', value: 42, icon: Activity, color: 'text-[#206E55] bg-[#E8F2ED]' },
    { label: 'Avg Accuracy', value: '94.2%', icon: TrendingUp, color: 'text-[#206E55] bg-[#E8F2ED]' },
    { label: 'Reports Exported', value: 38, icon: BarChart3, color: 'text-[#206E55] bg-[#E8F2ED]' },
    { label: 'Conditions Detected', value: 8, icon: CheckCircle, color: 'text-[#206E55] bg-[#E8F2ED]' },
  ];

  const recentScans = [
    { id: 1, date: '2026-07-18', condition: 'Acne Vulgaris', confidence: 96, status: 'Completed' },
    { id: 2, date: '2026-07-14', condition: 'Dermatitis (Eczema)', confidence: 92, status: 'Completed' },
    { id: 3, date: '2026-07-02', condition: 'Rosacea', confidence: 88, status: 'Completed' },
    { id: 4, date: '2026-06-28', condition: 'Psoriasis', confidence: 93, status: 'Completed' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileName(draftProfileName);
    setIsEditProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Profile Header Bar */}
        <div className="rounded-3xl bg-white border border-[#E5E2DA] p-6 sm:p-8 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#206E55] text-white font-extrabold flex items-center justify-center text-2xl shadow-sm">
              {profileName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#141515]">{profileName}</h1>
                <button
                  onClick={() => {
                    setDraftProfileName(profileName);
                    setIsEditProfileOpen(true);
                  }}
                  className="text-slate-400 hover:text-[#206E55] transition"
                  title="Edit Profile"
                >
                  <Edit2 size={16} />
                </button>
              </div>
              <p className="text-xs text-[#5A554A] mt-0.5">Member since {memberSince} • HIPAA Account Active</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/analysis">
              <button className="px-6 py-3 rounded-full bg-[#206E55] hover:bg-[#408A6C] text-white font-bold text-sm transition shadow-sm flex items-center gap-2">
                <Plus size={16} />
                New Scan
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="p-6 rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className={`w-10 h-10 rounded-2xl ${stat.color} flex items-center justify-center mb-4 border border-[#206E55]/10`}>
                  <Icon size={18} />
                </div>
                <span className="text-3xl font-extrabold text-[#141515] block mb-1">{stat.value}</span>
                <span className="text-xs text-[#5A554A] font-bold uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Scan History Table Card */}
        <div className="rounded-3xl bg-white border border-[#E5E2DA] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E2DA]">
            <div>
              <h2 className="text-xl font-bold text-[#141515]">Recent Clinical Scans</h2>
              <p className="text-xs text-[#5A554A]">View diagnostic risk summaries and download physician PDF exports</p>
            </div>
            <span className="text-xs font-bold text-[#206E55] bg-[#E8F2ED] px-3 py-1 rounded-full border border-[#206E55]/20">
              {recentScans.length} Active Records
            </span>
          </div>

          <div className="space-y-4">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#206E55] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] flex items-center justify-center font-bold text-xs">
                    #{scan.id}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#141515]">{scan.condition}</h3>
                    <p className="text-[11px] text-[#5A554A]">Date: {scan.date} • Index Confidence: {scan.confidence}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {scan.status}
                  </span>
                  <Link to="/analysis">
                    <button className="px-4 py-2 rounded-full bg-white border border-[#D1CDC2] hover:border-[#206E55] text-xs font-bold text-[#206E55] transition flex items-center gap-1.5">
                      <Download size={13} />
                      Export PDF
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl bg-white border border-[#E5E2DA] p-6 shadow-2xl space-y-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-[#141515]">Edit Profile Details</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#5A554A] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={draftProfileName}
                    onChange={(e) => setDraftProfileName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E2DA] text-[#141515] text-sm focus:outline-none focus:border-[#206E55]"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#D1CDC2] text-[#5A554A] text-xs font-bold hover:bg-[#FAF9F5] transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#206E55] text-white text-xs font-bold hover:bg-[#408A6C] transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PremiumFooter />
    </div>
  );
};

export default Dashboard;
