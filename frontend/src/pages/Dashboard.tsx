import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, TrendingUp, Activity, Download, Calendar, ArrowRight,
  User, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [hasScans] = useState(false); // Start with no scans
  const [profileName, setProfileName] = useState('John Doe');
  const [memberSince, setMemberSince] = useState('Jan 15, 2026');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [draftProfileName, setDraftProfileName] = useState('John Doe');
  const [draftMemberSince, setDraftMemberSince] = useState('Jan 15, 2026');

  const stats = [
    { label: 'Total Scans', value: 42, icon: Activity, color: 'sky' },
    { label: 'Avg Accuracy', value: '94.2%', icon: TrendingUp, color: 'cyan' },
    { label: 'Reports Generated', value: 38, icon: BarChart3, color: 'blue' },
    { label: 'Conditions Detected', value: 12, icon: CheckCircle, color: 'emerald' },
  ];

  const recentScans = [
    {
      id: 1,
      date: '2026-05-26',
      condition: 'Acne Vulgaris',
      confidence: 94,
      status: 'Completed',
      image: 'scan_001.jpg',
    },
    {
      id: 2,
      date: '2026-05-25',
      condition: 'Eczema',
      confidence: 87,
      status: 'Completed',
      image: 'scan_002.jpg',
    },
    {
      id: 3,
      date: '2026-05-24',
      condition: 'Psoriasis',
      confidence: 91,
      status: 'Completed',
      image: 'scan_003.jpg',
    },
    {
      id: 4,
      date: '2026-05-23',
      condition: 'Melanoma',
      confidence: 96,
      status: 'Completed',
      image: 'scan_004.jpg',
    },
  ];

  const accuracyByCondition = [
    { condition: 'Acne', accuracy: 96 },
    { condition: 'Eczema', accuracy: 89 },
    { condition: 'Psoriasis', accuracy: 92 },
    { condition: 'Rosacea', accuracy: 88 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PremiumNavbar />

      <main className="relative pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ paddingTop: '6rem' }}>
            <img src="/media/hero-man-bench.jpg" alt="Scenic wellness background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/70" />
            <div className="relative z-10 px-4 py-14 text-center sm:px-6 sm:py-20" style={{ borderRadius: 24 }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">Analytics Dashboard</h1>
              <p className="mt-4 text-white/95 text-lg max-w-3xl mx-auto">Track your scans, reports, and AI insights</p>
            </div>
          </div>
          {/* Header */}
          <motion.div
            className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
              <p className="text-slate-600">Track your scans, reports, and AI insights</p>
            </div>

            <div className="flex w-full flex-wrap gap-2 md:w-auto md:justify-end">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`min-w-[88px] px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-slate-600 font-medium text-sm">{stat.label}</h3>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      stat.color === 'sky'
                        ? 'bg-sky-100 text-sky-600'
                        : stat.color === 'cyan'
                        ? 'bg-cyan-100 text-cyan-600'
                        : stat.color === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    <stat.icon size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Accuracy Chart */}
            <motion.div
              className="lg:col-span-2 p-8 rounded-2xl bg-white border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Accuracy by Condition</h2>
              <div className="space-y-4">
                {accuracyByCondition.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-700">{item.condition}</span>
                      <span className="text-sm font-bold text-sky-600">{item.accuracy}%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-sky-500 to-cyan-400"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${item.accuracy}%` }}
                        transition={{ delay: index * 0.1, duration: 1.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* User Profile */}
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">User Profile</h2>
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
                  {profileName
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join('')
                    .toUpperCase() || 'JD'}
                </div>
                <div>
                  <p className="text-sm text-slate-600">Name</p>
                  <p className="font-bold text-slate-900">{profileName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Member Since</p>
                  <p className="font-bold text-slate-900">{memberSince}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDraftProfileName(profileName);
                    setDraftMemberSince(memberSince);
                    setIsEditProfileOpen(true);
                  }}
                  className="w-full py-2 rounded-lg bg-white text-sky-600 font-medium hover:bg-slate-100 transition"
                >
                  Edit Profile
                </button>
              </div>
            </motion.div>
          </div>

          {/* Recent Scans Table */}
          <motion.div
            className="p-8 rounded-2xl bg-white border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Scans</h2>
              <button className="text-sky-600 font-medium hover:text-sky-700 transition">View All</button>
            </div>

            {!hasScans ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Activity size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No scans uploaded yet</h3>
                <p className="text-slate-600 mb-6">Start by uploading a skin image for AI analysis</p>
                <Link
                  to="/analysis"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-medium hover:shadow-lg transition"
                >
                  Start Your First Scan
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Condition</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Confidence</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentScans.map((scan, index) => (
                      <motion.tr
                        key={scan.id}
                        className="border-b border-slate-200 hover:bg-slate-50 transition"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <td className="px-4 py-4 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-400" />
                            {scan.date}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-slate-900">{scan.condition}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-sky-500 to-cyan-400"
                                style={{ width: `${scan.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-sky-600">{scan.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                            <CheckCircle size={14} />
                          {scan.status}
                        </span>
                      </td>
                        <td className="px-4 py-4">
                          <button className="text-sky-600 hover:text-sky-700 transition">
                            <Download size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            className="mt-8 p-8 rounded-2xl bg-white border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { time: '2 hours ago', action: 'Completed skin analysis scan', type: 'scan' },
                { time: '1 day ago', action: 'Downloaded clinical report PDF', type: 'download' },
                { time: '3 days ago', action: 'Uploaded new patient image', type: 'upload' },
                { time: '1 week ago', action: 'Received dermatologist recommendation', type: 'comment' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 pb-4 border-b border-slate-200 last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Edit Profile</h3>
            <p className="text-sm text-slate-600 mb-6">Update the profile details shown on the dashboard.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  value={draftProfileName}
                  onChange={(e) => setDraftProfileName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Member Since</label>
                <input
                  type="text"
                  value={draftMemberSince}
                  onChange={(e) => setDraftMemberSince(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="Jan 15, 2026"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileName(draftProfileName.trim() || 'John Doe');
                  setMemberSince(draftMemberSince.trim() || 'Jan 15, 2026');
                  setIsEditProfileOpen(false);
                }}
                className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2.5 font-medium text-white hover:shadow-lg transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <PremiumFooter />
    </div>
  );
};

export default Dashboard;
