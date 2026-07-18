import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, UploadCloud, ShieldCheck, Cpu, Brain, FileText, Mail, 
  ChevronDown, AlertTriangle, ShieldAlert, CheckCircle, Download, RefreshCw,
  Clock, ArrowRight, Shield
} from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';
import PhoneInputCustom from '../components/PhoneInputCustom';
import { getApiBaseUrl } from '../lib/apiBase';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
};

type FormErrors = Partial<Record<keyof FormState | 'image' | 'submit', string>>;

type AnalysisResult = {
  condition: string;
  confidence: number;
  reportId: string;
  precautions: string[];
  severity?: string;
  severityLevel?: string;
  urgent?: boolean;
  description?: string;
  keyFindings?: string[];
  symptoms?: Record<string, number>;
  differentialDiagnoses?: Array<{ condition: string; probability: number }>;
  poweredBy?: string;
  disclaimer?: string;
};

const AGES = Array.from({ length: 100 }, (_, i) => i + 1);

type AnalysisInputFieldProps = {
  label: string;
  name: keyof FormState;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  errors: FormErrors;
  type?: 'text' | 'email' | 'select';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
};

const AnalysisInputField: React.FC<AnalysisInputFieldProps> = ({
  label,
  name,
  form,
  setForm,
  errors,
  type = 'text',
  required,
  options,
  placeholder,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'select' ? (
      <div className="relative">
        <select
          value={form[name]}
          onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
          required={required}
          className={`w-full px-4 py-3 rounded-xl bg-slate-50/50 border text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition font-semibold text-sm sm:text-base appearance-none outline-none cursor-pointer ${
            errors[name] ? 'border-red-400' : 'border-slate-200'
          } ${form[name] ? 'text-slate-900' : 'text-slate-400'}`}
        >
          <option value="" className="text-slate-400">{placeholder || `Select ${label}`}</option>
          {(options || []).map((opt) => (
            <option key={opt.value} value={opt.value} className="text-slate-900 font-semibold">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
      </div>
    ) : (
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-slate-50/50 border text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition font-semibold text-sm sm:text-base outline-none ${
          errors[name] ? 'border-red-400' : 'border-slate-200'
        }`}
      />
    )}
    {errors[name] && <span className="text-xs text-red-500 font-bold mt-0.5">! {errors[name]}</span>}
  </div>
);

const Analysis: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const steps = [
    { id: 1, label: 'Patient Info', icon: User },
    { id: 2, label: 'Image Upload', icon: UploadCloud },
    { id: 3, label: 'ISIC Validation', icon: ShieldCheck },
    { id: 4, label: 'AI Analysis', icon: Cpu },
    { id: 5, label: 'Prediction', icon: Brain },
    { id: 6, label: 'Report', icon: FileText },
    { id: 7, label: 'Delivery', icon: Mail },
  ] as const;

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone || form.phone.replace(/\D/g, '').length < 7) e.phone = 'Valid phone number required';
    if (!form.age) e.age = 'Age is required';
    if (!form.gender) e.gender = 'Gender is required';
    return e;
  }, [form]);

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      setErrors((p) => ({ ...p, image: 'Please upload JPG, PNG, or WEBP only.' }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: 'Image must be under 10MB.' }));
      return;
    }
    setImage(file);
    setErrors((p) => ({ ...p, image: undefined }));
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview((e.target?.result as string) || null);
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!image) {
      setErrors((p) => ({ ...p, image: 'Please upload a skin image.' }));
      return;
    }

    setLoading(true);
    const stepsMessages = [
      { s: 3, msg: 'ISIC validation in progress...' },
      { s: 4, msg: 'AI model analysis running...' },
      { s: 5, msg: 'Generating risk prediction...' },
      { s: 6, msg: 'Preparing clinical report...' },
      { s: 7, msg: 'Finalizing patient delivery...' },
    ];

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('fullName', form.fullName);
      formData.append('email', form.email);
      formData.append('mobile', form.phone);
      formData.append('age', form.age);
      formData.append('gender', form.gender);

      for (const { s, msg } of stepsMessages) {
        setStep(s);
        setLoadingStep(msg);
        await new Promise((r) => setTimeout(r, 900));
      }

      const API = getApiBaseUrl();
      const res = await fetch(`${API}/analysis/start`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || errData.error || 'Analysis failed');
      }

      const data = await res.json();
      const confidenceRaw = Number(data?.prediction?.confidence_percentage ?? data?.prediction?.confidence ?? 0);
      const normalized: AnalysisResult = {
        condition: data?.prediction?.disease || 'Dermatology Assessment',
        confidence: Math.max(0, Math.min(100, Math.round(confidenceRaw <= 1 ? confidenceRaw * 100 : confidenceRaw))),
        reportId: data?.analysis_id || `AN-${Date.now()}`,
        precautions: Array.isArray(data?.recommendations) ? data.recommendations : [],
        severity: data?.prediction?.severity || 'Unknown',
        severityLevel: data?.prediction?.severity_level || 'low',
        urgent: data?.prediction?.urgent ?? false,
        description: data?.prediction?.description || '',
        keyFindings: Array.isArray(data?.prediction?.key_findings) ? data.prediction.key_findings : [],
        symptoms: data?.prediction?.symptoms || {},
        differentialDiagnoses: Array.isArray(data?.prediction?.differential_diagnoses) ? data.prediction.differential_diagnoses : [],
        poweredBy: data?.powered_by || 'Grok Vision AI',
        disclaimer: 'This AI analysis is not a substitute for professional medical diagnosis.',
      };

      setResult(normalized);
      setStep(7);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setErrors((p) => ({ ...p, submit: err?.message || 'Analysis failed' }));
      setStep(1);
    }
  };

  const downloadPDF = async () => {
    if (!result) return;
    const API = getApiBaseUrl();
    const res = await fetch(`${API}/reports/${result.reportId}/download`);
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      setErrors((p) => ({ ...p, submit: 'Report download is not available yet.' }));
      return;
    }
    setErrors((p) => ({ ...p, submit: 'Report endpoint is connected. PDF generation will be enabled next.' }));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500/10 selection:text-sky-900">
      <PremiumNavbar />

      <main className="relative pt-32 pb-24 px-4 sm:px-6">
        {/* Ambient page background glow */}
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] bg-gradient-to-br from-sky-400/5 to-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-12 shadow-xl border border-slate-200/60">
            <div className="absolute inset-0">
              <img src="/media/hero-man-bench.jpg" alt="Clinical AI Diagnostics" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply" />
            </div>
            <div className="relative z-10 py-16 px-8 text-center sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 tracking-wider uppercase mb-4">
                  Clinical AI Workflow
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                  Skin Pathology <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">Analysis Engine</span>
                </h1>
                <p className="text-slate-300 text-base max-w-2xl mx-auto font-medium">
                  Follow our secure pipeline for automated classifications, ISIC validation, and instant reporting.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Stepper Widget */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm mb-10 overflow-x-auto">
            <div className="flex justify-between items-center min-w-[760px] px-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isDone = step > s.id;

                return (
                  <div key={s.id} className="flex items-center flex-1 last:flex-initial">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25 scale-110'
                            : isDone
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle size={16} /> : <Icon size={16} />}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-bold tracking-wide transition-colors ${
                          isActive ? 'text-sky-600' : isDone ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>

                    {i < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-4 transition-colors duration-300 ${
                          step > s.id ? 'bg-emerald-500' : 'bg-slate-100'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Artificial Loading overlay */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-slate-950/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-sky-500 animate-spin" />
                  <Clock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-400" size={20} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white mb-1">Analyzing Patient Specimen</p>
                  <p className="text-slate-400 text-sm font-semibold">{loadingStep}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Output Section */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ResultCard result={result} patient={form} imagePreview={imagePreview} onDownload={downloadPDF} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form and Upload Screen */}
          {!result && !loading && (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Form panel */}
              <div className="uiverse-card bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-1">Patient Details</h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Input baseline clinical metadata required for diagnostics</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <AnalysisInputField label="Full Name" name="fullName" form={form} setForm={setForm} errors={errors} required placeholder="Dr. John Smith" />
                  </div>
                  
                  <AnalysisInputField label="Email Address" name="email" form={form} setForm={setForm} errors={errors} type="email" required placeholder="patient@example.com" />
                  
                  <AnalysisInputField
                    label="Age"
                    name="age"
                    form={form}
                    setForm={setForm}
                    errors={errors}
                    type="select"
                    required
                    placeholder="Select age"
                    options={AGES.map((a) => ({ value: String(a), label: String(a) }))}
                  />

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <PhoneInputCustom value={form.phone} onChange={(val) => setForm((p) => ({ ...p, phone: val }))} required />
                    {errors.phone && <span className="text-xs text-red-500 font-bold mt-1 block">! {errors.phone}</span>}
                  </div>

                  <div className="sm:col-span-2">
                    <AnalysisInputField
                      label="Gender"
                      name="gender"
                      form={form}
                      setForm={setForm}
                      errors={errors}
                      type="select"
                      required
                      placeholder="Select gender"
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other / Prefer not to say' },
                      ]}
                    />
                  </div>
                </div>

                {errors.submit && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
                    <ShieldAlert className="text-red-500 flex-shrink-0" size={20} />
                    <p className="text-red-700 text-xs sm:text-sm font-semibold">! {errors.submit}</p>
                  </div>
                )}
              </div>

              {/* Upload panel */}
              <div className="flex flex-col gap-6">
                {/* Upload box */}
                <div className="uiverse-card bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-4">Patient Image</h3>

                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleFileSelect(e.dataTransfer.files[0] || null);
                    }}
                    className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
                      dragOver 
                        ? 'border-sky-500 bg-sky-50/50' 
                        : imagePreview 
                        ? 'border-emerald-300 bg-emerald-50/[0.05]' 
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {imagePreview ? (
                      <div className="w-full space-y-4">
                        <img src={imagePreview} alt="Preview" className="max-h-40 w-full rounded-xl object-cover shadow-sm border border-slate-100" />
                        <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                          File loaded — Click to change
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                          <UploadCloud size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 mb-1">Drop patient photograph here or click to browse</p>
                          <p className="text-slate-400 text-xs font-medium">JPEG, PNG, or WEBP up to 10MB</p>
                        </div>
                      </>
                    )}
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                  />
                  {errors.image && <p className="mt-2 text-xs text-red-500 font-bold">! {errors.image}</p>}
                </div>

                {/* Validation checklist */}
                <div className="uiverse-card bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Pipeline Status</h3>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Patient Information Profile', ready: !!(form.fullName && form.email && form.phone && form.age && form.gender) },
                      { label: 'High Resolution Image Uploaded', ready: !!imagePreview },
                      { label: 'ISIC Archive Cross Reference', ready: false },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-1">
                        <span className="text-xs sm:text-sm font-semibold text-slate-600">{item.label}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${
                            item.ready
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                        >
                          {item.ready ? 'Ready' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit trigger */}
                <button
                  type="submit"
                  className="uiverse-btn w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                >
                  Initialize Diagnostic Engine
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Powered by partners badge */}
              <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 shadow-sm">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Integrated Standards:</span>
                {['ISIC Classification Standard', 'Grok Vision ML V3', 'HIPAA Secure DB'].map((t) => (
                  <span key={t} className="text-xs sm:text-sm font-bold text-sky-600">
                    {t}
                  </span>
                ))}
              </div>
            </form>
          )}
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
};

function ResultCard({
  result,
  patient,
  imagePreview,
  onDownload,
}: {
  result: AnalysisResult;
  patient: FormState;
  imagePreview: string | null;
  onDownload: () => Promise<void>;
}) {
  const isUrgent = result.urgent || result.severityLevel === 'high';
  const confidence = result.confidence || 0;

  // Severity color coding
  const theme = isUrgent
    ? {
        bg: 'from-red-600 to-red-700 shadow-red-500/10 border-red-500/20',
        badge: 'bg-white/20 text-white border-white/25',
        text: 'text-red-100',
        glow: 'text-red-400'
      }
    : result.severityLevel === 'medium'
    ? {
        bg: 'from-amber-500 to-amber-600 shadow-amber-500/10 border-amber-500/20',
        badge: 'bg-white/20 text-white border-white/25',
        text: 'text-amber-100',
        glow: 'text-amber-400'
      }
    : {
        bg: 'from-slate-900 to-slate-950 shadow-slate-900/10 border-slate-800',
        badge: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
        text: 'text-slate-400',
        glow: 'text-sky-400'
      };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Result card */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br border shadow-xl text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${theme.bg}`}>
        <div className="relative z-10 space-y-4">
          {isUrgent && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-extrabold tracking-wider uppercase">
              <ShieldAlert size={12} />
              Urgent - Seek Dermatology Consultation
            </span>
          )}
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5">{result.condition}</h2>
            {result.severity && (
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}>
                Severity: {result.severity}
              </span>
            )}
          </div>
          
          <p className={`text-xs sm:text-sm font-semibold ${theme.text}`}>
            Scan ID: {result.reportId} — {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Circular Confidence Gauge */}
        <div className="relative z-10 flex flex-col items-center self-center md:self-auto bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
          <svg width="76" height="76" viewBox="0 0 80 80" className="rotate-[-90deg]">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6.5" />
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeDasharray={`${(confidence / 100) * 201} 201`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute top-8 text-center">
            <span className="text-base font-extrabold text-white block leading-none">{confidence}%</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-2 block">Confidence</span>
        </div>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient specs */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Patient Reference Profile</h3>
          
          <div className="space-y-3 mb-6">
            {[
              ['Full Name', patient.fullName],
              ['Email Address', patient.email],
              ['Contact Mobile', patient.phone],
              ['Patient Age', `${patient.age} years old`],
              ['Gender Identity', patient.gender],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-1">
                <span className="text-xs sm:text-sm font-semibold text-slate-500">{k}</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{v}</span>
              </div>
            ))}
          </div>

          {imagePreview && (
            <div className="mt-auto pt-4 border-t border-slate-50">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">Submitted photograph</span>
              <img src={imagePreview} alt="Uploaded Specimen" className="w-full h-36 rounded-xl object-cover border border-slate-100 shadow-sm" />
            </div>
          )}
        </div>

        {/* Clinical findings */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Clinical Guidance & Findings</h3>
            
            {result.description && (
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-semibold">{result.description}</p>
            )}

            <div className="space-y-2 mb-4">
              {(result.precautions || []).slice(0, 5).map((p, i) => (
                <div key={i} className="flex gap-2 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                  <CheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={14} />
                  <span>{p}</span>
                </div>
              ))}
            </div>

            {result.keyFindings && result.keyFindings.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Assessment Indicators</h4>
                {result.keyFindings.map((f, i) => (
                  <div key={i} className="flex gap-2 text-xs text-slate-500 font-semibold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex gap-3 text-xs sm:text-sm font-medium leading-relaxed">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
            <p>{result.disclaimer || 'This AI analysis is not a substitute for professional medical diagnosis.'}</p>
          </div>
        </div>
      </div>

      {/* Button Triggers */}
      <div className="flex gap-4 flex-wrap">
        <button 
          onClick={onDownload} 
          className="flex-1 min-w-[200px] py-4 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all"
        >
          <Download size={18} />
          Download PDF Report
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="flex-1 min-w-[200px] py-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition"
        >
          <RefreshCw size={16} />
          New Analysis
        </button>
      </div>

      <p className="text-center text-xs font-medium text-slate-400 mt-2">
        A clinical summary and report delivery confirmation has been sent to <span className="font-bold text-slate-500">{patient.email}</span>.
      </p>

      {result.poweredBy && (
        <p className="text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
          Powered by {result.poweredBy}
        </p>
      )}
    </div>
  );
}

export default Analysis;
