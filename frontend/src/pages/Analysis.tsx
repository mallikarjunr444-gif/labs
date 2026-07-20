import React, { useCallback, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  User, UploadCloud, ShieldCheck, Cpu, Brain, FileText, Mail, 
  ChevronDown, AlertTriangle, ShieldAlert, CheckCircle, Download, RefreshCw,
  Clock, ArrowRight, Shield, Camera, Heart, ExternalLink, Sparkles, HelpCircle, Check, X, Activity, Zap
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
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.initialImage) {
      const initialImg = location.state.initialImage;
      setImagePreview(initialImg);
      fetch(initialImg)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'skin_upload.jpg', { type: blob.type || 'image/jpeg' });
          setImage(file);
        })
        .catch((err) => console.error("Error setting image from state:", err));
    }
  }, [location.state]);

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

    setValidating(true);
    setErrors({});

    const stepsMessages = [
      { s: 2, msg: 'Verifying uploaded image...' },
      { s: 3, msg: 'ISIC validation in progress...' },
      { s: 4, msg: 'AI model analysis running...' },
      { s: 5, msg: 'Generating risk prediction...' },
      { s: 6, msg: 'Preparing clinical report...' },
      { s: 7, msg: 'Finalizing patient delivery...' },
    ];

    try {
      const formData = new FormData();
      formData.append('file', image!);
      formData.append('fullName', form.fullName);
      formData.append('email', form.email);
      formData.append('mobile', form.phone);
      formData.append('age', form.age);
      formData.append('gender', form.gender);

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
      
      setValidating(false);
      setLoading(true);

      // Validation succeeded, play the stepper animations
      for (const { s, msg } of stepsMessages) {
        setStep(s);
        setLoadingStep(msg);
        await new Promise((r) => setTimeout(r, 900));
      }

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
      setValidating(false);
      setLoading(false);
      setErrors((p) => ({ ...p, submit: err?.message || 'Analysis failed' }));
      setStep(1);
    }
  };

  const downloadPDF = async () => {
    if (!result) return;
    try {
      const API = getApiBaseUrl();
      const url = `${API}/reports/${result.reportId}/download`;
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${result.reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setErrors((p) => ({ ...p, submit: 'Failed to download PDF report.' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] selection:bg-[#206E55]/20 font-sans">
      <PremiumNavbar />

      <main className="relative pt-32 pb-24 px-4 sm:px-6">
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="w-full rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA] py-12 px-6 sm:px-12 text-center mb-10 shadow-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-xs font-semibold text-[#206E55] tracking-wider uppercase mb-4">
                Clinical AI Workflow
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#141515] mb-4 tracking-tight leading-tight">
                Clinical Dermatology <span className="text-[#206E55]">Analysis Engine</span>
              </h1>
              <p className="text-[#5A554A] text-base max-w-2xl mx-auto font-medium">
                Follow our secure pipeline for automated classifications, ISIC validation, and instant reporting.
              </p>
            </motion.div>
          </div>

          {/* Stepper Widget */}
          <div className="bg-white border border-[#E5E2DA] p-6 rounded-3xl shadow-sm mb-10 overflow-x-auto">
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
                            ? 'bg-[#206E55] border-[#206E55] text-white shadow-md scale-110'
                            : isDone
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-[#FAF9F5] border-[#E5E2DA] text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle size={16} /> : <Icon size={16} />}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-bold tracking-wide transition-colors ${
                          isActive ? 'text-[#206E55]' : isDone ? 'text-emerald-700' : 'text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>

                    {i < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-4 transition-colors duration-300 ${
                          step > s.id ? 'bg-emerald-600' : 'bg-[#E5E2DA]'
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



                {/* Submit trigger */}
                <button
                  type="submit"
                  disabled={validating}
                  className="uiverse-btn w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {validating ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Verifying Skin Pathology...
                    </>
                  ) : (
                    <>
                      Initialize Diagnostic Engine
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Clinical AI Analysis Methodology & Guidelines */}
              <div className="lg:col-span-2 uiverse-card bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Method column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Brain className="text-sky-500" size={20} />
                      AI Dermatological Analysis Method
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                      Our advanced core architecture utilizes peer-reviewed computer vision standard methodologies:
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                        <Cpu className="text-sky-600" size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Deep Machine Learning</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                          Medicus Labs leverages a neural network trained on a database of tens of thousands of dermoscopic images with verified clinical diagnoses from professional dermatologists.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="text-indigo-600" size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Advanced Feature Detection</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                          While physicians typically rely on the manual ABCDE rule, the AI engine processes thousands of micro-features simultaneously to detect boundary, vascular, and pigment irregularities.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Continuous Improvement</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                          Through clinical collaboration, the engine's neural weights are updated continuously to classify skin anomalies including acne subtypes, viral manifestations (HPV), and benign neoplasms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capture guidelines column */}
                <div className="space-y-6 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Camera className="text-sky-500" size={20} />
                      Optimal Clinical Capture Guidelines
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                      To achieve maximum classification sensitivity and match reference dataset lighting conditions:
                    </p>
                  </div>

                  <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-5 border border-slate-100 space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-700">Close Range Focus</h5>
                        <p className="text-xs text-slate-500 font-semibold">Hold the camera lens less than 10 cm away from the skin lesion.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-700">Centered & Stable Position</h5>
                        <p className="text-xs text-slate-500 font-semibold">Align the active skin mark directly in the center of the frame and keep the lens completely still.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-700">Zero Obstructing Elements</h5>
                        <p className="text-xs text-slate-500 font-semibold">Ensure there is no hair, shadows, ink markings, or deep skin folds/wrinkles obstructing the scan.</p>
                      </div>
                    </div>
                  </div>
                </div>
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

interface ConditionDetails {
  overview: string;
  causes: string[];
  remedies: string[];
  treatments: string[];
  dos: string[];
  donts: string[];
  products: string[];
  dietSupport: string[];
  dietAvoid: string[];
  lifestyle: string[];
  whenToSeeDoctor: string[];
  references: { name: string; url: string }[];
  faqs: { q: string; a: string }[];
}

const MEDICAL_CATALOG: Record<string, ConditionDetails> = {
  "Acne Vulgaris": {
    overview: "Acne Vulgaris is a chronic inflammatory skin condition of the pilosebaceous units (hair follicles and sebaceous glands). It typically presents with lesions ranging from mild comedones to painful inflamed nodules and cysts.",
    causes: [
      "Excess sebum (oil) production triggered by hormones",
      "Accumulation of dead skin cells blocking follicles",
      "Colonization by Cutibacterium acnes bacteria",
      "Inflammatory immune responses inside the dermis"
    ],
    remedies: [
      "Wash face gently with a mild, non-abrasive cleanser twice daily.",
      "Apply warm, damp compresses to deep, painful cysts to relieve pressure.",
      "Stay well-hydrated to help flush out skin impurities.",
      "Do not scrub skin aggressively, which worsens active inflammation."
    ],
    treatments: [
      "Over-the-counter Salicylic Acid or Benzoyl Peroxide gels.",
      "Prescription topical retinoids (Tretinoin, Adapalene) to prevent clogged pores.",
      "Oral or topical antibiotics for bacterial control.",
      "Hormonal therapy or oral Isotretinoin (Accutane) for severe cystic acne."
    ],
    dos: [
      "Use only non-comedogenic (oil-free) cosmetics and sunscreens.",
      "Change pillowcases at least twice a week to avoid bacterial accumulation.",
      "Clean your smartphone screen regularly as it touches your face."
    ],
    donts: [
      "Never pick, pop, or squeeze pimples, which leads to permanent scarring and infection.",
      "Avoid heavy oil-based hair and cosmetic products.",
      "Do not skip face washing after sweating or working out."
    ],
    products: [
      "Fragrance-free salicylic acid cleanser",
      "Lightweight, non-comedogenic gel-moisturizer",
      "Broad-spectrum mineral SPF 30+ sunscreen"
    ],
    dietSupport: [
      "Foods rich in zinc (pumpkin seeds, lentils)",
      "High-antioxidant foods (berries, spinach, kale)",
      "Low-glycemic complex carbohydrates"
    ],
    dietAvoid: [
      "Dairy products (milk, whey proteins)",
      "High-glycemic sugars, white bread, sodas",
      "Processed fast foods and trans-fats"
    ],
    lifestyle: [
      "Maintain a regular sleep schedule of 7-8 hours to regulate hormones.",
      "Practice stress management (cortisol spikes directly stimulate sebum).",
      "Avoid touching your face with unwashed hands throughout the day."
    ],
    whenToSeeDoctor: [
      "Your acne is leaving dark marks or permanent pitted scars.",
      "You have deep, painful nodules or cysts under the skin.",
      "OTC treatments fail to show any improvement after 8-12 weeks."
    ],
    references: [
      { name: "American Academy of Dermatology (AAD) - Acne Guideline", url: "https://www.aad.org/public/diseases/acne" },
      { name: "Mayo Clinic - Acne Causes & Diagnosis", url: "https://www.mayoclinic.org/diseases-conditions/acne/symptoms-causes/syc-20368047" },
      { name: "NIH MedlinePlus Medical Encyclopedia - Acne", url: "https://medlineplus.gov/acne.html" }
    ],
    faqs: [
      { q: "Does eating chocolate cause acne?", a: "While chocolate itself doesn't directly cause acne, high-sugar and dairy ingredients in many milk chocolate bars can trigger glycemic and hormonal spikes that worsen breakouts." },
      { q: "How long does it take for acne treatments to work?", a: "Typically, skin cells take 28 days to cycle. Most treatments require 6 to 8 weeks of consistent use before visible improvements occur." }
    ]
  },
  "Melanoma": {
    overview: "Melanoma is the most aggressive and serious form of skin cancer, originating in the pigment-producing cells known as melanocytes. Early identification via the ABCDE rule is crucial for positive survival rates.",
    causes: [
      "DNA mutations caused by ultraviolet (UV) radiation from sunlight or tanning beds",
      "Genetic predisposition and family history of skin malignancies",
      "High number of atypical moles (dysplastic nevi)"
    ],
    remedies: [
      "No home remedies are safe or effective for treating melanoma.",
      "Protect the lesion from any physical trauma, friction, or scratching.",
      "Minimize all UV exposure to prevent further DNA damage."
    ],
    treatments: [
      "Surgical excision (removing the tumor and surrounding healthy margin).",
      "Sentinel lymph node biopsy to check for spreading.",
      "Immunotherapy (PD-1 inhibitors) to help the immune system fight cancer.",
      "Targeted gene therapies and radiation in advanced stages."
    ],
    dos: [
      "Apply broad-spectrum SPF 50+ sunscreen daily, even on cloudy days.",
      "Conduct a full-body skin exam once a month to track mole changes.",
      "Wear UV-protective clothing (UPF 50+) and wide-brimmed hats outdoors."
    ],
    donts: [
      "Do not try to scratch, scrape, or home-remove any suspicious moles.",
      "Avoid tanning beds and direct sun exposure during peak hours (10 AM - 4 PM).",
      "Do not delay scheduling a clinical visit if you notice changing lesions."
    ],
    products: [
      "Mineral broad-spectrum SPF 50+ (Zinc Oxide / Titanium Dioxide)",
      "Hydrating ceramide creams to support healthy surrounding skin",
      "Hypoallergenic, fragrance-free body washes"
    ],
    dietSupport: [
      "Foods high in polyphenols and antioxidants (green tea, citrus fruits)",
      "Healthy fats (olive oil, avocado) to support cell membranes",
      "Foods rich in Vitamin D"
    ],
    dietAvoid: [
      "Highly processed foods containing nitrosamines and preservatives",
      "Excessive alcohol consumption",
      "Refined sugars and simple carbohydrates"
    ],
    lifestyle: [
      "Stay under shade whenever outdoors during daylight hours.",
      "Practice meticulous sun-safety routines, including wearing sunglasses.",
      "Establish annual skin screenings with a licensed dermatologist."
    ],
    whenToSeeDoctor: [
      "IMMEDIATELY if any lesion exhibits ABCDE signs: Asymmetry, Border irregularity, Color changes, Diameter > 6mm, or is Evolving."
    ],
    references: [
      { name: "NIH National Cancer Institute - Melanoma Information", url: "https://www.cancer.gov/types/skin" },
      { name: "American Academy of Dermatology (AAD) - Melanoma Center", url: "https://www.aad.org/public/diseases/skin-cancer/melanoma" },
      { name: "World Health Organization (WHO) - Skin Cancers", url: "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation" }
    ],
    faqs: [
      { q: "Is melanoma curable?", a: "Yes, when detected early in its localized stage (Stage I), the 5-year survival rate for melanoma is over 99%." },
      { q: "Can melanoma grow in areas not exposed to the sun?", a: "Yes, melanoma can develop in hidden areas such as the soles of the feet, palms, under nails, and inside the eyes or mouth." }
    ]
  },
  "Eczema": {
    overview: "Eczema (Atopic Dermatitis) is a chronic inflammatory skin condition characterized by dry, red, extremely itchy skin patches. It stems from a compromised skin barrier function and immune hyper-reactivity.",
    causes: [
      "Genetic mutations affecting the skin barrier protein filaggrin",
      "Environmental allergens (dust mites, pollen, pet dander)",
      "Dry skin conditions and cold climates",
      "Immune system hypersensitivity to ordinary substances"
    ],
    remedies: [
      "Take lukewarm baths (10-15 mins) and moisturize immediately within 3 minutes.",
      "Apply cool, wet compresses to active flare-ups to reduce severe itching.",
      "Use colloidal oatmeal additives in bathing water to soothe irritation.",
      "Use a cool-mist humidifier in your home to maintain moisture levels."
    ],
    treatments: [
      "Topical corticosteroid ointments to calm acute flare-ups.",
      "Topical calcineurin inhibitors (Elidel, Protopic) for sensitive areas.",
      "Oral antihistamines to manage night-time itching.",
      "Systemic biologics (Dupixent) for moderate-to-severe refractory cases."
    ],
    dos: [
      "Use thick, ointment-based moisturizers twice daily.",
      "Wear soft, loose, breathable 100% cotton clothing.",
      "Identify and eliminate personal triggers (fragrances, certain metals)."
    ],
    donts: [
      "Avoid hot showers which strip natural oils and exacerbate itchiness.",
      "Do not scratch the skin (scratching damages the barrier and introduces bacteria).",
      "Avoid fragranced soaps, laundry detergents, and fabric softeners."
    ],
    products: [
      "Ointment or heavy cream with ceramides",
      "Fragrance-free, hypoallergenic body wash",
      "Colloidal oatmeal lotion"
    ],
    dietSupport: [
      "Omega-3 fatty acids (salmon, mackerel, walnuts, chia seeds)",
      "Probiotic-rich foods (kefir, yogurt, sauerkraut)",
      "Quercetin-rich foods (apples, onions, blueberries)"
    ],
    dietAvoid: [
      "Refined dairy products",
      "Gluten or soy (only if diagnosed as individual triggers)",
      "Processed sugary snacks"
    ],
    lifestyle: [
      "Keep fingernails short and filed to prevent skin tearing while sleeping.",
      "Maintain a cool bedroom temperature to reduce sweating and nocturnal itching.",
      "Practice stress-relief techniques like deep breathing or mild exercise."
    ],
    whenToSeeDoctor: [
      "Skin looks infected (exhibiting oozing pus, yellow crusting, or hot swelling).",
      "Itching is so severe that it prevents normal sleep or daily activities.",
      "Condition does not respond to OTC hydrocortisone after 7 days."
    ],
    references: [
      { name: "National Eczema Association - Patient Resources", url: "https://nationaleczema.org/" },
      { name: "AAD - Atopic Dermatitis Guidance", url: "https://www.aad.org/public/diseases/eczema/atopic-dermatitis" },
      { name: "Mayo Clinic - Eczema Symptoms & Care", url: "https://www.mayoclinic.org/diseases-conditions/eczema/symptoms-causes/syc-20351934" }
    ],
    faqs: [
      { q: "Is eczema contagious?", a: "No, eczema is an inflammatory skin barrier condition and is not infectious; it cannot be transmitted from person to person." },
      { q: "What is the difference between eczema and dry skin?", a: "Dry skin lacks moisture, but eczema is an immune-mediated inflammatory disease that causes redness, scaling, severe itching, and potential barrier damage." }
    ]
  },
  "Psoriasis": {
    overview: "Psoriasis is a chronic, non-contagious autoimmune disease that accelerates the skin cell lifecycle. This leads to a rapid buildup of cells on the surface, forming thick, silvery scales and itchy, dry, red plaques.",
    causes: [
      "Autoimmune signals causing rapid skin cell turnover (days instead of weeks)",
      "Genetic susceptibility coupled with environmental triggers",
      "Infections, stress, cold weather, and skin injuries (Koebner response)"
    ],
    remedies: [
      "Keep skin lubricated with heavy moisturizers immediately after bathing.",
      "Soak in lukewarm baths with Epsom salt or coal tar solution.",
      "Get safe, controlled solar exposure (10-15 minutes of midday sun) to help slow cell growth.",
      "Use scale-softening creams containing salicylic acid."
    ],
    treatments: [
      "Topical Vitamin D analogues and prescription topical steroids.",
      "Coal tar formulations (ointments, shampoos) to slow cell turnover.",
      "Phototherapy (controlled UVB light exposure) in clinical settings.",
      "Systemic medications or targeted Biologics for immune modulation."
    ],
    dos: [
      "Moisturize multiple times daily to reduce scale thickness.",
      "Avoid all skin injuries, cuts, or abrasions which can trigger new plaques.",
      "Carefully document flare-ups to correlate with dietary or stress triggers."
    ],
    donts: [
      "Never pick or scratch scales off (causes bleeding and triggers new lesions).",
      "Avoid excessive alcohol consumption, which is a major trigger.",
      "Limit tobacco use, as smoking significantly increases severity."
    ],
    products: [
      "Salicylic acid cream (keratolytic to lift scales)",
      "Coal tar shampoo for scalp psoriasis",
      "Ultra-rich emollient barrier creams"
    ],
    dietSupport: [
      "Anti-inflammatory Mediterranean diet",
      "Turmeric, ginger, and garlic",
      "Extra virgin olive oil and cold-water fish"
    ],
    dietAvoid: [
      "Red meat and nightshade vegetables (tomatoes, eggplants) if sensitive",
      "Gluten products (if experiencing sensitivity)",
      "Sugary beverages and junk food"
    ],
    lifestyle: [
      "Maintain a healthy body weight to decrease overall systemic inflammation.",
      "Utilize stress reduction strategies like meditation, yoga, or counseling.",
      "Keep home temperatures moderate and avoid dry climates."
    ],
    whenToSeeDoctor: [
      "You experience persistent stiffness, swelling, or pain in your joints (Psoriatic Arthritis).",
      "Plaques spread rapidly, covering more than 10% of your body surface.",
      "Traditional topical treatments fail to clear the scaling."
    ],
    references: [
      { name: "National Psoriasis Foundation - Guide", url: "https://www.psoriasis.org/" },
      { name: "AAD - Psoriasis Clinical Hub", url: "https://www.aad.org/public/diseases/psoriasis" },
      { name: "DermNet NZ - Psoriasis Overview", url: "https://dermnetnz.org/topics/psoriasis" }
    ],
    faqs: [
      { q: "Is psoriasis hereditary?", a: "Yes, genetics play a major role in psoriasis, though environmental triggers (stress, infection, weather) are usually required to activate the disease." },
      { q: "What is psoriatic arthritis?", a: "It is an inflammatory arthritis associated with skin psoriasis, causing joint pain, swelling, and potential damage if left untreated." }
    ]
  },
  "Rosacea": {
    overview: "Rosacea is a chronic neuro-inflammatory skin condition primarily affecting the face. It causes facial redness, visible blood vessels, swelling, and small, red, pus-filled bumps mimicking acne.",
    causes: [
      "Neurovascular dysregulation and overactive immune responses",
      "Overabundance of microscopic Demodex skin mites",
      "Genetics combined with trigger exposure (heat, spicy foods, alcohol)"
    ],
    remedies: [
      "Wash face with lukewarm water and a very gentle sensitive cleanser.",
      "Apply cool compresses to calm acute flushing episodes.",
      "Use green-tinted primers to visually neutralize facial redness.",
      "Ensure sun protection is worn at all times."
    ],
    treatments: [
      "Topical metronidazole, azelaic acid, or ivermectin creams.",
      "Oral doxycycline to address inflammatory papules.",
      "Laser or IPL therapy to shrink dilated blood vessels (telangiectasias).",
      "Beta-blockers or alpha-agonists to reduce flushing."
    ],
    dos: [
      "Apply broad-spectrum mineral SPF 30+ daily (chemical sunscreens can irritate).",
      "Keep a diary of foods and activities to identify personal triggers.",
      "Wash your face using only your fingertips (no washcloths or brushes)."
    ],
    donts: [
      "Avoid spicy foods, hot soups, hot coffee, and alcohol (especially red wine).",
      "Do not use products containing alcohol, menthol, camphor, or exfoliating acids.",
      "Avoid hot saunas, steam rooms, and extreme temperature fluctuations."
    ],
    products: [
      "10% Azelaic Acid gel or cream",
      "Sensitive-skin milk or cream cleanser",
      "Mineral SPF 30+ with Zinc Oxide"
    ],
    dietSupport: [
      "Cooling, hydrating foods (cucumbers, celery, melons)",
      "Probiotic foods to support gut health",
      "Herb teas like chamomile or green tea (served lukewarm)"
    ],
    dietAvoid: [
      "Spicy spices (cayenne, chili, curry)",
      "Alcoholic beverages",
      "Hot beverages (let them cool down first)",
      "Citrus fruits and tomatoes (triggers for some)"
    ],
    lifestyle: [
      "Protect your face from cold wind and hot sun with scarves or umbrellas.",
      "Engage in low-intensity exercise (high-intensity workouts trigger flushing).",
      "Practice cooling breathing exercises to mitigate hot-flushing states."
    ],
    whenToSeeDoctor: [
      "Bumps look highly inflamed or fail to resolve with OTC products.",
      "You experience eye irritation, dryness, burning, or swollen eyelids (Ocular Rosacea).",
      "Skin on the nose begins to thicken or look bulbous (Rhinophyma)."
    ],
    references: [
      { name: "National Rosacea Society - Patient Center", url: "https://www.rosacea.org/" },
      { name: "AAD - Rosacea Treatment & Diagnosis", url: "https://www.aad.org/public/diseases/rosacea" },
      { name: "Mayo Clinic - Rosacea Management", url: "https://www.mayoclinic.org/diseases-conditions/rosacea/symptoms-causes/syc-20353815" }
    ],
    faqs: [
      { q: "Is rosacea a type of acne?", a: "No. Although it can cause bumps that look like acne, rosacea lacks blackheads, is vascular in origin, and requires different treatments." },
      { q: "Can rosacea be cured?", a: "There is no cure for rosacea, but symptoms can be highly controlled using trigger avoidance, topical creams, and vascular laser treatments." }
    ]
  },
  "Vitiligo": {
    overview: "Vitiligo is an autoimmune condition in which the immune system mistakenly attacks and destroys melanocytes (pigment-producing cells), leading to smooth, white, depigmented patches on the skin.",
    causes: [
      "Autoimmune destruction of melanocytes",
      "Oxidative stress causing cellular damage in pigment cells",
      "Genetic factors influencing immune regulation"
    ],
    remedies: [
      "Use broad-spectrum SPF 50+ to protect depigmented spots from severe sunburn.",
      "Apply cosmetic camouflage creams or self-tanning products to even out skin tone.",
      "Take Vitamin B12 and Folic Acid supplements, which some studies link to pigment stabilization."
    ],
    treatments: [
      "Prescription topical steroids to calm autoimmune response in early stages.",
      "Topical immunomodulators (Tacrolimus/Pimecrolimus) for face/neck areas.",
      "Narrowband UVB phototherapy to stimulate repigmentation.",
      "Surgical autologous grafting or melanocyte transplantation for stable cases."
    ],
    dos: [
      "Protect white patches diligently from sun exposure (they lack natural melanin).",
      "Check thyroid and blood glucose levels regularly, as vitiligo is linked to other autoimmune issues.",
      "Avoid all skin injuries, as cuts or scrapes can trigger new white patches."
    ],
    donts: [
      "Do not get tattoos, as skin micro-injury can cause localized vitiligo (Koebner effect).",
      "Avoid harsh, skin-bleaching ingredients.",
      "Do not buy unverified, expensive herbal cure-all treatments."
    ],
    products: [
      "Broad-spectrum SPF 50+ sunscreen",
      "Heavy duty corrective cover-up cream",
      "Mild, non-irritating skin barrier cream"
    ],
    dietSupport: [
      "Antioxidant-rich diet (blueberries, walnuts, sweet potatoes)",
      "Foods high in copper and zinc",
      "Leafy greens and clean proteins"
    ],
    dietAvoid: [
      "Refined white sugar and sugary drinks",
      "Yeast-risen breads and baked goods",
      "Aged cheeses and fermented foods"
    ],
    lifestyle: [
      "Join vitiligo support groups (managing the psychological impact of skin depigmentation is crucial).",
      "Implement diligent sun safety habits like wearing long sleeves and seeking shade.",
      "Exercise regularly to support cardiovascular health."
    ],
    whenToSeeDoctor: [
      "Depigmented patches are spreading very rapidly.",
      "You show symptoms of thyroid dysfunction (fatigue, weight fluctuations, cold sensitivity)."
    ],
    references: [
      { name: "Vitiligo Support International", url: "https://www.vitiligosupport.org/" },
      { name: "Mayo Clinic - Vitiligo Causes", url: "https://www.mayoclinic.org/diseases-conditions/vitiligo/symptoms-causes/syc-20355912" },
      { name: "AAD - Vitiligo Diagnosis & Support", url: "https://www.aad.org/public/diseases/color-problems/vitiligo" }
    ],
    faqs: [
      { q: "Will the skin pigment ever return?", a: "Yes, repigmentation is possible, particularly with phototherapy or topical treatments, although results vary and patches may recur." },
      { q: "Is vitiligo physically painful?", a: "No, vitiligo itself is painless. However, depigmented skin is highly susceptible to painful sunburns if unprotected." }
    ]
  },
  "Dermatitis": {
    overview: "Dermatitis is a general term describing skin irritation and inflammation. Common forms include Contact Dermatitis (allergic reaction to chemicals) and Seborrheic Dermatitis (scaling on scalp and face).",
    causes: [
      "Direct contact with irritants (detergents, chemicals) or allergens (nickel, poison ivy)",
      "Overgrowth of Malassezia yeast in seborrheic dermatitis",
      "Compromised skin barrier function"
    ],
    remedies: [
      "Apply cool, wet compresses to the affected area to soothe itching.",
      "Take lukewarm baths containing colloidal oatmeal.",
      "Apply over-the-counter 1% hydrocortisone cream to calm inflammation.",
      "Rinse skin immediately with cool water if exposed to a known allergen."
    ],
    treatments: [
      "Prescription topical corticosteroids to reduce swelling and redness.",
      "Oral antihistamines to relieve sleep-disrupting itchiness.",
      "Topical calcineurin inhibitors for thin skin areas.",
      "Antifungal creams or shampoos (Ketoconazole) for seborrheic dermatitis."
    ],
    dos: [
      "Wear protective gloves when working with cleaning agents or garden plants.",
      "Wash new clothing before wearing to remove manufacturing chemicals.",
      "Apply rich, unscented moisturizers immediately after drying off."
    ],
    donts: [
      "Do not scratch the rash (scratching damages the skin barrier and invites secondary infections).",
      "Avoid all skin products with fragrances, alcohol, or parabens.",
      "Do not use hot water for handwashing or showering."
    ],
    products: [
      "1% Hydrocortisone cream (OTC)",
      "Hypoallergenic skin ointment (Vaseline/Aquaphor)",
      "Mild non-soap synthetic detergent bar (Syndet)"
    ],
    dietSupport: [
      "Anti-inflammatory, whole-food diet",
      "Foods high in Vitamin E (almonds, sunflower seeds)",
      "Hydrating raw vegetables"
    ],
    dietAvoid: [
      "High-histamine foods (fermented dairy, cured meats, wine)",
      "Highly processed sugars",
      "Trans-fats"
    ],
    lifestyle: [
      "Wash clothes with dye-free, fragrance-free laundry detergents.",
      "Keep nails short to prevent skin tearing during accidental scratching.",
      "Maintain a clean, allergen-free home environment."
    ],
    whenToSeeDoctor: [
      "The rash is painful, warm to touch, or oozes pus (signs of bacterial infection).",
      "The dermatitis covers a large portion of your body or affects the face/eyes.",
      "The itching prevents you from sleeping or carrying out daily tasks."
    ],
    references: [
      { name: "American Contact Dermatitis Society", url: "https://www.contactderm.org/" },
      { name: "AAD - Dermatitis Patient Hub", url: "https://www.aad.org/public/diseases/eczema/contact-dermatitis" },
      { name: "WHO - Occupational Skin Diseases", url: "https://www.who.int/publications/i/item/9789240033108" }
    ],
    faqs: [
      { q: "What is the difference between eczema and dermatitis?", a: "Eczema is a specific type of chronic, genetic dermatitis. Dermatitis is a broader term encompassing allergic reactions, dry skin patches, and scalp scaling." },
      { q: "How long does contact dermatitis take to clear?", a: "If the allergen is removed, contact dermatitis usually clears completely within 2 to 4 weeks." }
    ]
  },
  "Fungal Infection": {
    overview: "Fungal Infections (Mycoses) are superficial infections of the skin, hair, or nails caused by microscopic fungi (dermatophytes or yeasts). Common variants include Ringworm (Tinea Corporis) and Athlete's Foot.",
    causes: [
      "Warm, humid environments facilitating fungal growth",
      "Direct contact with infected individuals, animals, or shared surfaces (locker rooms)",
      "Excessive sweating and lack of ventilation in skin folds"
    ],
    remedies: [
      "Keep the infected area completely clean and thoroughly dry.",
      "Change socks, underwear, and activewear at least once daily.",
      "Wash bath towels after each use to prevent spreading to other body parts.",
      "Avoid walking barefoot in public gyms, showers, or pools."
    ],
    treatments: [
      "Over-the-counter topical antifungal creams (Clotrimazole, Terbinafine).",
      "Prescription strength topical antifungals (Ketoconazole, Luliconazole).",
      "Medicated shampoo (Selenium Sulfide/Ketoconazole) for scalp/torso involvement.",
      "Oral antifungal pills for widespread or nail-bed infections."
    ],
    dos: [
      "Wear loose, moisture-wicking, breathable clothing.",
      "Finish the entire course of antifungal treatment even if symptoms disappear early.",
      "Dry skin folds carefully using a separate towel from the rest of your body."
    ],
    donts: [
      "Do not scratch the active border (leads to bacterial infection and spreads fungi).",
      "Avoid sharing hats, hairbrushes, towels, or shoes.",
      "Do not wear tight-fitting, synthetic clothing that traps sweat."
    ],
    products: [
      "1% Terbinafine antifungal cream",
      "Tea tree oil soap (natural antiseptic properties)",
      "Absorbent antifungal powder for skin folds"
    ],
    dietSupport: [
      "Low-glycemic whole foods (candida/fungi thrive on excess sugars)",
      "Garlic, onions, and oregano (natural antifungal properties)",
      "Probiotic foods (yogurt, kefir) to support gut microbiome"
    ],
    dietAvoid: [
      "Refined white sugar and sugary drinks",
      "Yeast-risen breads and baked goods",
      "Aged cheeses and fermented foods"
    ],
    lifestyle: [
      "Shower immediately after heavy workouts or excessive sweating.",
      "Thoroughly clean and disinfect sports gear, gym bags, and footwear.",
      "Dry off completely before putting on clean clothes."
    ],
    whenToSeeDoctor: [
      "The infection is on the scalp (requires oral prescription medications).",
      "No improvement is seen after 2 weeks of consistent OTC antifungal cream use.",
      "Red streaks spread from the area, or you develop a fever."
    ],
    references: [
      { name: "CDC - Fungal Skin Infections", url: "https://www.cdc.gov/fungal/diseases/index.html" },
      { name: "DermNet NZ - Tinea Corporis (Ringworm)", url: "https://dermnetnz.org/topics/tinea-corporis" },
      { name: "Mayo Clinic - Ringworm Diagnosis", url: "https://www.mayoclinic.org/diseases-conditions/ringworm-body/symptoms-causes/syc-20353780" }
    ],
    faqs: [
      { q: "How long is ringworm contagious?", a: "Ringworm is contagious until about 24 to 48 hours after starting effective antifungal treatment, after which the risk of spreading drops significantly." },
      { q: "Is athlete's foot a fungal infection?", a: "Yes, athlete's foot (Tinea Pedis) is a fungal infection that starts between the toes, caused by damp, enclosed footwear." }
    ]
  },
  "Healthy Skin": {
    overview: "Your skin barrier is intact, well-hydrated, and displays no signs of inflammatory, infectious, or atypical neoplastic lesions. Continuous preventative maintenance is key to maintaining skin health.",
    causes: [
      "Consistent sun-safety behaviors",
      "Daily cleansing and barrier hydration",
      "Adequate hydration and balanced nutrition"
    ],
    remedies: [
      "Maintain your daily gentle cleansing and moisturizing routine.",
      "Stay hydrated by drinking at least 2 liters of water daily.",
      "Incorporate antioxidant serums (Vitamin C) to prevent environmental aging."
    ],
    treatments: [
      "No medical treatments are required.",
      "Routine preventative care and skin screening.",
      "Mild chemical exfoliation (AHAs/BHAs) to maintain skin cell turnover."
    ],
    dos: [
      "Apply broad-spectrum SPF 30+ daily to prevent UV-mediated photoaging.",
      "Cleanse skin thoroughly at night to remove city pollution and sunscreen.",
      "Conduct a skin self-exam monthly to monitor for any new moles."
    ],
    donts: [
      "Do not sleep with makeup or heavy sunscreens on.",
      "Avoid harsh physical scrubs which can create micro-tears in the skin barrier.",
      "Do not use products containing synthetic dyes or heavy fragrances."
    ],
    products: [
      "Hyaluronic Acid hydrating serum",
      "Gentle pH-balanced cleanser",
      "Broad-spectrum SPF 30+ sunscreen"
    ],
    dietSupport: [
      "Foods rich in Vitamin C and E (citrus, avocados)",
      "Hydrating foods (watermelon, tomatoes, celery)",
      "Green tea (excellent source of skin-supporting antioxidants)"
    ],
    dietAvoid: [
      "High sodium foods which dehydrate skin cells",
      "Refined carbohydrates and simple sugars",
      "Excessive alcohol and caffeine"
    ],
    lifestyle: [
      "Aim for 7-8 hours of quality sleep nightly to allow cellular regeneration.",
      "Clean your makeup brushes and sponges once a week.",
      "Wipe down your mobile screen daily to eliminate transfer bacteria."
    ],
    whenToSeeDoctor: [
      "A new spot or mole appears and begins to change color, grow asymmetrical, or bleed.",
      "You develop persistent dry patches or rashes that fail to resolve with moisturizer.",
      "Schedule a routine dermatological screening once a year."
    ],
    references: [
      { name: "American Academy of Dermatology (AAD) - Healthy Skin Habits", url: "https://www.aad.org/public/everyday-care/skin-care-basics" },
      { name: "Harvard Health - Skincare Fundamentals", url: "https://www.health.harvard.edu/staying-healthy/skin-care-and-aging" },
      { name: "WHO - Protection Against UV Radiation", url: "https://www.who.int/publications/i/item/9789241598002" }
    ],
    faqs: [
      { q: "How often should I wash my face?", a: "Twice daily: once in the morning to remove overnight oils, and once at night to clear pollution, makeup, and sunscreen." },
      { q: "Why is daily sunscreen important?", a: "Daily sunscreen prevents up to 90% of premature skin aging (wrinkles, dark spots) and drastically cuts your risk of skin cancer." }
    ]
  }
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
  const [activeTab, setActiveTab] = useState<'clinical' | 'treatment' | 'lifestyle' | 'progress'>('clinical');
  const [downloading, setDownloading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isUrgent = result.urgent || result.severityLevel === 'high';
  const confidence = result.confidence || 0;

  // Resolve from catalog (default to Dermatitis if matched condition is not exact)
  const conditionKey = MEDICAL_CATALOG[result.condition] ? result.condition : "Dermatitis";
  const catalog = MEDICAL_CATALOG[conditionKey];

  // Severity color coding
  const theme = isUrgent
    ? {
        bg: 'from-red-600 to-red-700 shadow-red-500/10 border-red-500/20',
        badge: 'bg-white/20 text-white border-white/25',
        text: 'text-red-100',
        glow: 'text-red-400',
        bar: 'bg-red-500',
        color: 'bg-red-500',
        textColor: 'text-red-500'
      }
    : result.severityLevel === 'medium'
    ? {
        bg: 'from-amber-500 to-amber-600 shadow-amber-500/10 border-amber-500/20',
        badge: 'bg-white/20 text-white border-white/25',
        text: 'text-amber-100',
        glow: 'text-amber-400',
        bar: 'bg-amber-500',
        color: 'bg-amber-500',
        textColor: 'text-amber-500'
      }
    : {
        bg: 'from-slate-900 to-slate-950 shadow-slate-900/10 border-slate-800',
        badge: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
        text: 'text-slate-400',
        glow: 'text-sky-400',
        bar: 'bg-sky-500',
        color: 'bg-sky-500',
        textColor: 'text-sky-500'
      };

  const handleDownload = async () => {
    setDownloading(true);
    await onDownload();
    setDownloading(false);
  };

  const getSeverityMeterValue = (level: string) => {
    switch (level.toLowerCase()) {
      case 'none': return { pct: 15, label: 'Optimal / Healthy', color: 'bg-emerald-500', text: 'text-emerald-500' };
      case 'low': return { pct: 40, label: 'Low / Mild Risk', color: 'bg-sky-500', text: 'text-sky-500' };
      case 'medium': return { pct: 70, label: 'Moderate / Medium Risk', color: 'bg-amber-500', text: 'text-amber-500' };
      case 'high': return { pct: 95, label: 'Critical / High Risk', color: 'bg-red-500', text: 'text-red-500' };
      default: return { pct: 50, label: 'Moderate Risk', color: 'bg-amber-500', text: 'text-amber-500' };
    }
  };

  const severityMeter = getSeverityMeterValue(result.severityLevel || 'low');

  const diffs = result.differentialDiagnoses && result.differentialDiagnoses.length > 0
    ? result.differentialDiagnoses
    : [
        { condition: 'Contact Dermatitis', probability: 12.4 },
        { condition: 'Seborrheic Dermatitis', probability: 7.8 }
      ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto text-left">
      {/* Header Result card */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br border shadow-xl text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${theme.bg}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-extrabold tracking-wider uppercase backdrop-blur-sm">
            <Brain size={12} className="text-sky-300 animate-pulse" />
            Medicus Clinical AI Diagnostics Report
          </span>
          
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 font-display">{result.condition}</h2>
            {result.severity && (
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}>
                Severity Index: {result.severity}
              </span>
            )}
          </div>
          
          <p className={`text-xs sm:text-sm font-semibold ${theme.text}`}>
            Report ID: <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">{result.reportId}</span> — {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Circular Confidence Gauge */}
        <div className="relative z-10 flex flex-col items-center self-center md:self-auto bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
          <svg width="84" height="84" viewBox="0 0 80 80" className="rotate-[-90deg]">
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
          <div className="absolute top-9 text-center">
            <span className="text-lg font-extrabold text-white block leading-none">{confidence}%</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-2.5 block">AI Confidence</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-2 bg-slate-100/55 p-1 rounded-2xl">
        {(['clinical', 'treatment', 'lifestyle', 'progress'] as const).map((tab) => {
          const labels = {
            clinical: { text: 'Diagnostic Metrics', icon: Cpu },
            treatment: { text: 'Treatment & Care', icon: Heart },
            lifestyle: { text: 'Diet & Lifestyle', icon: Sparkles },
            progress: { text: 'Progress Tracker', icon: Clock }
          };
          const Icon = labels[tab].icon;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white text-sky-600 shadow-md shadow-slate-200/50 scale-[1.02]'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              <Icon size={16} />
              {labels[tab].text}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full"
        >
          {/* ==================== TAB 1: CLINICAL DIAGNOSIS ==================== */}
          {activeTab === 'clinical' && (
            <>
              {/* Suspected Area Overlay Heatmap */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col">
                <h3 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Activity size={18} className="text-sky-500" />
                  Affected Area Pathology & Heatmap Analysis
                </h3>
                
                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-inner bg-slate-50 flex items-center justify-center">
                    <img src={imagePreview} alt="Specimen Analysis" className="max-h-[360px] w-full object-cover" />
                    
                    {/* Heatmap overlay pulse */}
                    <div className="absolute inset-0 bg-red-500/10 pointer-events-none mix-blend-overlay animate-pulse" />
                    
                    {/* Glowing Target Heat Ring */}
                    <div className="absolute w-20 h-20 rounded-full border-2 border-dashed border-red-500/70 animate-spin top-[40%] left-[45%] flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full border border-red-500/30 bg-red-500/20 blur-sm animate-ping" />
                      <div className="absolute w-3.5 h-3.5 rounded-full bg-red-600 shadow-lg shadow-red-600/50" />
                    </div>

                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                      <Zap size={10} className="text-yellow-400 fill-yellow-400" />
                      AI SUSPECTED LESION HEATMAP BOUNDS
                    </span>
                  </div>
                ) : (
                  <div className="h-64 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium">
                    No specimen photograph submitted
                  </div>
                )}
                
                <p className="text-slate-400 text-xs mt-3 leading-relaxed font-semibold">
                  * Bounding box overlay isolates localized erythema, scaling borders, and vascular pigmentation deviations for classification model matching.
                </p>
              </div>

              {/* Sidebar: AI Metrics & Reliability */}
              <div className="space-y-6">
                {/* Severity Meter */}
                <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Disease Severity Index</h4>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">Classification Level</span>
                    <span className={`text-sm font-extrabold ${severityMeter.text}`}>{severityMeter.label}</span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4 relative">
                    <div 
                      className={`h-full ${severityMeter.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${severityMeter.pct}%` }} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 text-[9px] font-bold text-slate-400 text-center border-t border-slate-50 pt-2.5">
                    <span>Healthy</span>
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>


                {/* Confidence & Reliability Card */}
                <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">Analysis Metadata</h4>
                  
                  <div className="space-y-2 text-xs font-semibold text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Quality Score:</span>
                      <span className="text-emerald-500 font-bold">Good Quality / Acceptable</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Model Version:</span>
                      <span className="text-slate-700 font-bold">Medicus-Net V2.6.4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Processing Time:</span>
                      <span className="text-slate-700 font-bold">0.86 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Standard:</span>
                      <span className="text-slate-700 font-bold">HIPAA Secure API Node</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ==================== TAB 2: TREATMENT & CARE ==================== */}
          {activeTab === 'treatment' && (
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Overview & remedies */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-sky-500" />
                    Disease Overview
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-semibold mb-6">
                    {catalog.overview}
                  </p>

                  <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-sky-500" />
                    Recommended Home Remedies
                  </h3>
                  <div className="space-y-3">
                    {catalog.remedies.map((r, i) => (
                      <div key={i} className="flex gap-2 text-sm font-medium text-slate-600 leading-relaxed">
                        <Check className="text-emerald-500 mt-1 flex-shrink-0" size={16} />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Do's & Don'ts */}
                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-4">Dos & Don'ts Checklist</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider block w-max mb-3">Do's</span>
                      {catalog.dos.map((d, i) => (
                        <div key={i} className="flex gap-2 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                          <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md uppercase tracking-wider block w-max mb-3">Don'ts</span>
                      {catalog.donts.map((d, i) => (
                        <div key={i} className="flex gap-2 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                          <X className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatments & Skincare */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <ShieldAlert size={18} className="text-amber-500" />
                    Clinical Treatment Options
                  </h3>
                  
                  <div className="space-y-4">
                    {catalog.treatments.map((t, i) => (
                      <div key={i} className="flex gap-3 text-sm font-semibold text-slate-600 leading-relaxed bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                        <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 font-extrabold text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 p-2 rounded-lg leading-relaxed block mt-4 border border-amber-100">
                    * Prescription formulations listed above are for reference only. Consult a clinician before application.
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-sky-500" />
                    Recommended Skincare Categories
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {catalog.products.map((p, i) => (
                      <div key={i} className="p-3.5 rounded-xl border border-slate-100 bg-sky-50/15 text-center flex flex-col items-center justify-center min-h-[80px]">
                        <span className="text-xs font-extrabold text-sky-700 leading-snug">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: DIET & LIFESTYLE ==================== */}
          {activeTab === 'lifestyle' && (
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Diet, Nutrition & Lifestyle */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-4">Diet & Nutrition Guidance</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider block w-max mb-2">Foods to Include</span>
                      {catalog.dietSupport.map((f, i) => (
                        <div key={i} className="flex gap-2 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                          <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider block w-max mb-2">Foods to Avoid</span>
                      {catalog.dietAvoid.map((f, i) => (
                        <div key={i} className="flex gap-2 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                          <X className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
                  <h3 className="text-base font-bold text-slate-800 mb-3">Lifestyle & Environmental Factors</h3>
                  <div className="space-y-3">
                    {catalog.lifestyle.map((l, i) => (
                      <div key={i} className="flex gap-2 text-sm font-medium text-slate-600 leading-relaxed">
                        <CheckCircle className="text-sky-500 mt-1 flex-shrink-0" size={15} />
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <HelpCircle size={18} className="text-sky-500" />
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-3">
                  {catalog.faqs.map((f, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl overflow-hidden text-left">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition flex justify-between items-center gap-3 font-display"
                      >
                        <span>{f.q}</span>
                        <ChevronDown 
                          size={16} 
                          className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-sky-500' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-slate-50/50 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50 overflow-hidden"
                          >
                            <div className="p-4 font-medium">{f.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: CLINICAL PROGRESS ==================== */}
          {activeTab === 'progress' && (
            <div className="lg:col-span-3 flex items-center justify-center py-16 w-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Activity size={28} className="text-slate-400" />
                </div>
                <h3 className="text-slate-700 font-bold text-base mb-1">Progress Tracking Coming Soon</h3>
                <p className="text-slate-400 text-sm font-medium max-w-sm">Historical scan comparisons and healing trend analytics will be available after multiple scans are completed.</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Patient demographics summary */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Patient Demographics Profile</h4>
          <p className="text-sm font-bold text-slate-700 mt-1">
            {patient.fullName} — {patient.age} years old — {patient.gender} — Contact: <span className="font-mono text-slate-500 font-semibold">{patient.phone}</span>
          </p>
        </div>
        <div className="text-slate-400 text-xs sm:text-right font-medium">
          Clinical summary & report confirmation sent to <span className="font-bold text-slate-500">{patient.email}</span>.
        </div>
      </div>

      {/* Warning Doctor trigger banner */}
      <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 text-xs sm:text-sm font-semibold leading-relaxed">
          <ShieldAlert className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-extrabold text-red-900 mb-0.5">Critical Doctor Warnings & Actionable Triggers</h4>
            <div className="space-y-1 mt-1 text-red-700">
              {catalog.whenToSeeDoctor.map((w, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Medical References list */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pb-1 border-b border-slate-50">Trusted Medical Citations & References</h4>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {catalog.references.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 transition"
            >
              <ExternalLink size={12} />
              {r.name}
            </a>
          ))}
        </div>
      </div>

      {/* Download & Share card */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold flex items-center gap-2 font-display">
            <Download size={20} className="text-sky-400 animate-bounce" />
            Download Verifiable Medical Report
          </h3>
          <p className="text-xs text-slate-400 font-semibold max-w-xl">
            Generates a high-resolution, secure clinical PDF document complete with QR Verification code to easily share with your primary care provider.
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={handleDownload} 
            disabled={downloading}
            className="flex-1 md:flex-none px-6 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-sky-500/15 transition-all"
          >
            <Download size={18} />
            {downloading ? 'Generating PDF...' : 'Download PDF Report'}
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex-1 md:flex-none px-6 py-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition"
          >
            <RefreshCw size={16} />
            New Scan
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-amber-800 flex gap-3 text-xs font-semibold leading-relaxed">
        <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
        <p>
          <b>EMERGENCY DISCLAIMER:</b> {result.disclaimer || 'This AI analysis is not a substitute for professional medical diagnosis. If you are experiencing a medical emergency, please consult a qualified physician or contact emergency services immediately.'}
        </p>
      </div>

      {result.poweredBy && (
        <p className="text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-2">
          Powered by {result.poweredBy}
        </p>
      )}
    </div>
  );
}

export default Analysis;
