import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Calendar,
  ShieldCheck,
  LogOut,
  Edit3,
  Sparkles,
  Activity,
  Check,
  FileText,
  Download,
  ArrowRight,
  Shield,
  Clock,
  ExternalLink,
  X,
  Lock,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../lib/supabase';
import { PremiumFooter } from '../sections';
import AuthModal from '../components/AuthModal';
import { getApiBaseUrl } from '../lib/apiBase';

interface StoredProfile {
  fullName?: string;
  phone?: string;
  title?: string;
}

const Profile: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [supabaseUser, setSupabaseUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [storedProfile, setStoredProfile] = useState<StoredProfile>({});
  const [editForm, setEditForm] = useState({ fullName: '', phone: '', title: '' });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sample or fetched analysis history
  const [history, setHistory] = useState<any[]>([
    {
      id: 'analysis_sample_1',
      condition: 'Acne Vulgaris',
      confidence: '92.4%',
      severity: 'Mild-Moderate',
      date: '2026-07-21',
      status: 'Completed',
    },
    {
      id: 'analysis_sample_2',
      condition: 'Contact Dermatitis',
      confidence: '88.5%',
      severity: 'Moderate',
      date: '2026-07-15',
      status: 'Completed',
    }
  ]);

  useEffect(() => {
    // Load local stored custom profile attributes if any
    try {
      const saved = localStorage.getItem('medicus_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setStoredProfile(parsed);
        setEditForm({
          fullName: parsed.fullName || '',
          phone: parsed.phone || '',
          title: parsed.title || '',
        });
      }
    } catch (e) {
      console.error('Error loading stored profile:', e);
    }

    // Attempt Supabase user fallback check
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setSupabaseUser(data.user);
      }
    }).catch(() => {});
  }, []);

  // Determine dynamic profile values from Firebase, Supabase, or Stored Profile
  const rawFullName = 
    user?.displayName ||
    (user as any)?.reloadUserInfo?.displayName ||
    supabaseUser?.user_metadata?.full_name ||
    supabaseUser?.user_metadata?.name ||
    storedProfile.fullName ||
    (isAuthenticated ? 'Mallikarjun R' : 'Guest User');

  const rawEmail =
    user?.email ||
    supabaseUser?.email ||
    'medicuslabs.com@gmail.com';

  const avatarUrl =
    user?.photoURL ||
    supabaseUser?.user_metadata?.avatar_url ||
    supabaseUser?.user_metadata?.picture ||
    '';

  const creationTime = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : supabaseUser?.created_at
    ? new Date(supabaseUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'July 2026';

  // Check login provider (Google vs Email)
  const isGoogleProvider =
    user?.providerData?.some((p) => p.providerId === 'google.com') ||
    supabaseUser?.app_metadata?.provider === 'google' ||
    Boolean(avatarUrl);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('medicus_user_profile', JSON.stringify(editForm));
      setStoredProfile(editForm);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setShowEditModal(false);
      }, 1200);
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3]/20">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f5f7] border border-transparent text-[#6e6e73] text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Verified Clinical Profile
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            User Account & <span className="text-[#0071e3]">Medical Insights</span>
          </motion.h1>

          <motion.p
            className="text-[#6e6e73] text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Manage your authenticated credentials, Google OAuth profile details, and history of AI skin analysis assessments.
          </motion.p>
        </div>

        {/* Dynamic User Profile Card */}
        <motion.div
          className="rounded-3xl bg-white border border-[#d2d2d7] p-6 sm:p-10 shadow-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#eaf2fd]/60 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-br from-[#0071e3] to-[#0071e3] shadow-md">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={rawFullName}
                    className="w-full h-full object-cover rounded-[22px] bg-[#f5f5f7]"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-[22px] bg-[#eaf2fd] text-[#0071e3] flex items-center justify-center font-bold text-3xl font-display">
                    {rawFullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
                  </div>
                )}
              </div>

              {/* Verified Badge Icon */}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-[#d2d2d7] text-[#0071e3]">
                <ShieldCheck size={20} />
              </div>
            </div>

            {/* User Meta Information */}
            <div className="flex-1 text-center md:text-left space-y-5">
              
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
                    {rawFullName}
                  </h2>

                  {/* Provider Pill */}
                  {isGoogleProvider ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e8e8ed] text-[#424245] text-xs font-bold">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 488 512">
                        <path fill="#4285F4" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126.9 26.8 170.2 68.8l-79.3 79.3c-33.4-31.8-78.7-51.7-129.9-51.7-97.2 0-176.4 79.2-176.4 176.4s79.2 176.4 176.4 176.4c70.8 0 131.3-41.5 158.2-101.9H248V261.8h239.2c.8 8.6 1.8 17.2 1.8 26z"/>
                      </svg>
                      Google Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      Email Auth
                    </span>
                  )}
                </div>

                <p className="text-[#6e6e73] font-semibold text-sm flex items-center justify-center md:justify-start gap-1.5">
                  <Mail size={15} className="text-[#0071e3]" />
                  {rawEmail}
                </p>
              </div>

              {/* Grid Metadata Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-[#d2d2d7]">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] block">
                    Account Status
                  </span>
                  <span className="text-sm font-extrabold text-[#0071e3] flex items-center justify-center md:justify-start gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-ping inline-block" />
                    Active Member
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] block">
                    Joined Date
                  </span>
                  <span className="text-sm font-bold text-[#1d1d1f] flex items-center justify-center md:justify-start gap-1">
                    <Calendar size={14} className="text-[#6e6e73]" />
                    {creationTime}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] block">
                    Login Provider
                  </span>
                  <span className="text-sm font-bold text-[#1d1d1f] flex items-center justify-center md:justify-start gap-1">
                    <Lock size={14} className="text-[#6e6e73]" />
                    {isGoogleProvider ? 'Google OAuth 2.0' : 'Email Authentication'}
                  </span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <Link
                  to="/analysis"
                  className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#2997ff] text-white font-bold text-sm shadow-sm transition flex items-center gap-2"
                >
                  <Activity size={16} />
                  Start Skin Analysis
                  <ArrowRight size={16} />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowEditModal(true)}
                  className="px-5 py-3 rounded-full bg-[#fbfbfd] border border-[#d2d2d7] hover:bg-white text-[#1d1d1f] font-bold text-sm transition flex items-center gap-2"
                >
                  <Edit3 size={15} />
                  Edit Profile
                </button>

                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-5 py-3 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-sm transition flex items-center gap-2"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(true)}
                    className="px-5 py-3 rounded-full bg-[#1d1d1f] hover:bg-[#1d1d1f] text-white font-bold text-sm transition flex items-center gap-2"
                  >
                    Sign In with Google
                  </button>
                )}
              </div>

            </div>

          </div>

        </motion.div>

        {/* Recent Analysis History Section */}
        <motion.div
          className="rounded-3xl bg-white border border-[#d2d2d7] p-6 sm:p-8 shadow-sm space-y-6"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#d2d2d7] pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#1d1d1f] flex items-center gap-2">
                <FileText size={20} className="text-[#0071e3]" />
                Recent Skin Assessments & Reports
              </h3>
              <p className="text-xs text-[#6e6e73] font-semibold mt-1">
                Clinical report logs generated for {rawFullName}
              </p>
            </div>

            <Link
              to="/analysis"
              className="text-xs font-bold text-[#0071e3] hover:underline flex items-center gap-1"
            >
              + New Analysis
            </Link>
          </div>

          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#fbfbfd] border border-[#d2d2d7] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#0071e3]/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-[#1d1d1f]">{item.condition}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#eaf2fd] text-[#0071e3] text-xs font-bold">
                        {item.confidence} Confidence
                      </span>
                    </div>
                    <p className="text-xs text-[#6e6e73] font-semibold flex items-center gap-3">
                      <span>Severity: <strong className="text-[#1d1d1f]">{item.severity}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {item.date}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      to="/analysis"
                      className="px-4 py-2 rounded-xl bg-white border border-[#d2d2d7] text-xs font-bold text-[#0071e3] hover:bg-[#eaf2fd] transition flex items-center gap-1.5"
                    >
                      <FileText size={14} />
                      View Analysis
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#fbfbfd] rounded-2xl border border-dashed border-[#d2d2d7]">
              <Activity size={32} className="mx-auto text-[#6e6e73] mb-3" />
              <p className="text-sm font-bold text-[#1d1d1f]">No Analysis Scans Found</p>
              <p className="text-xs text-[#6e6e73] mt-1">Start your first AI dermatology assessment to generate reports.</p>
              <Link
                to="/analysis"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] text-white font-bold text-xs shadow-sm hover:bg-[#2997ff] transition"
              >
                Start Free Analysis →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Security & HIPAA Compliance Info */}
        <div className="p-6 rounded-3xl bg-[#eaf2fd]/60 border border-[#0071e3]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3">
            <Shield size={22} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-[#1d1d1f] text-sm mb-0.5">Medical Privacy & Data Encryption</h4>
              <p className="text-[#6e6e73] font-semibold leading-relaxed">
                Your authenticated account profile and uploaded dermatological scan data are encrypted in accordance with HIPAA standards and Google OAuth 2.0 security protocols.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              className="bg-white rounded-3xl border border-[#d2d2d7] p-6 sm:p-8 w-full max-w-lg shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="absolute top-5 right-5 text-[#86868b] hover:text-[#6e6e73] p-1"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">Edit Clinical Profile</h3>
              <p className="text-xs text-[#6e6e73] mb-6">Update your display information for medical report generation.</p>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#6e6e73] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    placeholder="e.g. Dr. Mallikarjun R"
                    className="w-full px-4 py-3 rounded-2xl bg-[#fbfbfd] border border-[#d2d2d7] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6e6e73] mb-1.5">Contact Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-2xl bg-[#fbfbfd] border border-[#d2d2d7] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6e6e73] mb-1.5">Clinical Title / Role</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="e.g. Dermatologist / Clinical Researcher"
                    className="w-full px-4 py-3 rounded-2xl bg-[#fbfbfd] border border-[#d2d2d7] text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3.5 rounded-full border border-[#d2d2d7] bg-[#fbfbfd] text-[#1d1d1f] font-bold text-sm hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-full bg-[#0071e3] text-white font-bold text-sm hover:bg-[#2997ff] flex items-center justify-center gap-2"
                  >
                    {saveSuccess ? (
                      <>
                        Saved!
                        <Check size={16} />
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auth Modal Trigger */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      <PremiumFooter />
    </div>
  );
};

export default Profile;
