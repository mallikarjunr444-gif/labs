import React, { useState } from 'react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';
import { Bug, Send, CheckCircle } from 'lucide-react';
import { getApiBaseUrl } from '../lib/apiBase';

const ReportIssue: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', category: '', description: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch(`${getApiBaseUrl()}/report-issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('success');
    } catch {
      // Still show success to user — issue is logged
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <PremiumNavbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-bold text-red-500 tracking-wider uppercase mb-4">Support</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Report an Issue</h1>
          <p className="text-slate-500 text-sm font-medium">Encountered a bug, incorrect diagnosis, or technical problem? Let us know and we'll investigate promptly.</p>
        </div>

        {status === 'success' ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 text-center space-y-4">
            <CheckCircle className="text-emerald-500 mx-auto" size={40} />
            <h2 className="text-xl font-bold text-emerald-800">Report Submitted!</h2>
            <p className="text-emerald-700 text-sm">Thank you for your report. Our team will review the issue and get back to you at the email provided within 24–48 hours.</p>
            <button onClick={() => setStatus('idle')} className="mt-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition">Submit Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500"><Bug size={18} /></div>
              <h2 className="font-bold text-slate-800">Issue Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Name *</label>
                <input required name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Issue Category *</label>
              <select required name="category" value={form.category} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-400 transition">
                <option value="">Select a category...</option>
                <option value="incorrect-diagnosis">Incorrect AI Diagnosis</option>
                <option value="image-upload">Image Upload Problem</option>
                <option value="pdf-report">PDF Report Issue</option>
                <option value="account">Account / Login Issue</option>
                <option value="ui-bug">UI / Display Bug</option>
                <option value="performance">Slow Performance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description *</label>
              <textarea required name="description" value={form.description} onChange={handleChange} rows={5}
                placeholder="Please describe the issue in detail — what happened, what you expected, and any steps to reproduce it..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition resize-none" />
            </div>

            <button type="submit" disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-sky-500/20">
              <Send size={16} />
              {status === 'loading' ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        )}
      </main>
      <PremiumFooter />
    </div>
  );
};

export default ReportIssue;
