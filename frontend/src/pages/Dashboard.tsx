import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, TrendingUp, Activity, Download, Calendar, ArrowRight,
  User, Clock, CheckCircle, AlertCircle, Edit2, ShieldAlert, Users
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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500/10 selection:text-sky-900">
      <PremiumNavbar />

      <main className="relative pt-32 pb-24 px-4 sm:px-6">
        {/* Ambient page glow */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-sky-400/5 to-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header Banner */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-10 shadow-xl border border-slate-200/60">
            <div className="absolute inset-0">
              <img src="/media/hero-man-bench.jpg" alt="Clinical Analytics" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply" />
            </div>
            <div className="relative z-10 py-16 px-8 text-center sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                  Analytics & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">Patient Dashboard</span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                  Monitor classification accuracy models, audit clinical report downloads, and manage patient profiles.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Controls Bar */}
          <motion.div
            className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            <div>
              <h2 className="text-lg font-bold text-slate-800">Diagnostic Summary</h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Overview of automated skin screenings</p>
            </div>

            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="uiverse-card p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-slate-500 font-semibold text-xs sm:text-sm tracking-wide">{stat.label}</h3>
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        stat.color === 'sky'
                          ? 'bg-sky-50 text-sky-600'
                          : stat.color === 'cyan'
                          ? 'bg-cyan-50 text-cyan-600'
                          : stat.color === 'blue'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent mt-1">
                    {stat.value}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Chart & Profile section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Accuracy Chart */}
            <motion.div
              className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">Accuracy by Condition</h3>
                <p className="text-slate-500 text-xs sm:text-sm mb-6 font-medium">Confidence average compared with biopsy findings</p>
              </div>

              <div className="space-y-5">
                {accuracyByCondition.map((item, index) => (
                  <div key={item.condition}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-sm text-slate-700">{item.condition}</span>
                      <span className="text-xs sm:text-sm font-bold text-sky-600">{item.accuracy}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.accuracy}%` }}
                        transition={{ delay: index * 0.05, duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white shadow-lg flex flex-col justify-between relative overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Decorative radial overlay */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center font-extrabold text-lg text-sky-400 shadow-sm">
                    {profileName
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase() || 'JD'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftProfileName(profileName);
                      setDraftMemberSince(memberSince);
                      setIsEditProfileOpen(true);
                    }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-slate-300 hover:text-white"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block mb-0.5">Account User</span>
                    <p className="font-bold text-base text-slate-100">{profileName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold block mb-0.5">Member Since</span>
                    <p className="font-bold text-sm text-slate-300">{memberSince}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-2 text-xs text-sky-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Credentials Active
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Scans Logs */}
          <motion.div
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Scans History</h3>
                <p className="text-slate-500 text-xs font-semibold">Latest uploaded images and prediction details</p>
              </div>
              <button className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 transition">View All Logs</button>
            </div>

            {!hasScans ? (
              <div className="py-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                  <Activity size={24} className="text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No Scans Recorded</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6 font-medium">Please upload patient data and skin photos to start the pipeline.</p>
                <Link
                  to="/analysis"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-sm shadow-sm transition"
                >
                  Start First Screening
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-6 sm:px-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 text-left">
                        <th className="pb-3 text-xs font-extrabold uppercase tracking-wider text-slate-500">Date Checked</th>
                        <th className="pb-3 text-xs font-extrabold uppercase tracking-wider text-slate-500">Condition Prediction</th>
                        <th className="pb-3 text-xs font-extrabold uppercase tracking-wider text-slate-500">Model Confidence</th>
                        <th className="pb-3 text-xs font-extrabold uppercase tracking-wider text-slate-500">Status</th>
                        <th className="pb-3 text-xs font-extrabold uppercase tracking-wider text-slate-500 text-right">Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentScans.map((scan, index) => (
                        <motion.tr
                          key={scan.id}
                          className="border-b border-slate-100 hover:bg-slate-50/50 transition duration-150"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <td className="py-4 text-xs sm:text-sm text-slate-600 font-semibold">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-slate-400" />
                              {scan.date}
                            </div>
                          </td>
                          <td className="py-4 text-xs sm:text-sm font-bold text-slate-800">{scan.condition}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden relative">
                                <div
                                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                                  style={{ width: `${scan.confidence}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-sky-600">{scan.confidence}%</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
                              <CheckCircle size={12} />
                              {scan.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 transition">
                              <Download size={15} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-6">Recent System Activity</h3>
            <div className="relative border-l border-slate-100 pl-6 space-y-6">
              {[
                { time: '2 hours ago', action: 'Completed skin analysis scan', desc: 'Patient: Jane Doe (Age: 34), Result: Acne Vulgaris.' },
                { time: '1 day ago', action: 'Downloaded clinical report PDF', desc: 'Report ID: AN-1768402. Status: Verified.' },
                { time: '3 days ago', action: 'Uploaded new patient image', desc: 'Model evaluation initialized.' },
                { time: '1 week ago', action: 'Received dermatologist recommendation', desc: 'Annotation updated on server.' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -left-[31px] top-0 w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-white" />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-sm text-slate-800 leading-none">{activity.action}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activity.time}</span>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">{activity.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
            <motion.div 
              className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">Edit Account Profile</h3>
              <p className="text-slate-500 text-sm mb-6 font-semibold">Update details printed on clinical reports and shown on dashboard widgets.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Display Name</label>
                  <input
                    type="text"
                    value={draftProfileName}
                    onChange={(e) => setDraftProfileName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition font-semibold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Member Since</label>
                  <input
                    type="text"
                    value={draftMemberSince}
                    onChange={(e) => setDraftMemberSince(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition font-semibold text-sm"
                    placeholder="Jan 15, 2026"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition"
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
                  className="rounded-xl bg-slate-900 hover:bg-slate-950 px-5 py-2.5 font-bold text-white text-xs sm:text-sm hover:shadow-lg transition"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PremiumFooter />
    </div>
  );
};

export default Dashboard;
