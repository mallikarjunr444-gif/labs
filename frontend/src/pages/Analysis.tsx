import React, { useCallback, useRef, useState } from 'react';
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
  disclaimer?: string;
};

const STEPS = [
  { id: 1, label: 'Patient Info', icon: 'P' },
  { id: 2, label: 'Image Upload', icon: 'I' },
  { id: 3, label: 'ISIC Validation', icon: 'V' },
  { id: 4, label: 'AI Analysis', icon: 'A' },
  { id: 5, label: 'Prediction', icon: 'R' },
  { id: 6, label: 'Report', icon: 'D' },
  { id: 7, label: 'Delivery', icon: 'M' },
] as const;

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
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: '#374151',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {type === 'select' ? (
      <select
        value={form[name]}
        onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
        required={required}
        style={{
          padding: '12px 14px',
          borderRadius: 10,
          border: `1.5px solid ${errors[name] ? '#ef4444' : '#e2e8f0'}`,
          background: '#f8fafc',
          fontSize: 15,
          color: form[name] ? '#1e293b' : '#94a3b8',
          outline: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          appearance: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: 40,
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        <option value="">{placeholder || `Select ${label}`}</option>
        {(options || []).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
        required={required}
        placeholder={placeholder}
        style={{
          padding: '12px 14px',
          borderRadius: 10,
          border: `1.5px solid ${errors[name] ? '#ef4444' : '#e2e8f0'}`,
          background: '#f8fafc',
          fontSize: 15,
          color: '#1e293b',
          outline: 'none',
          fontFamily: 'inherit',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      />
    )}
    {errors[name] && <span style={{ fontSize: 12, color: '#ef4444', marginTop: 2 }}>! {errors[name]}</span>}
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
      const confidenceRaw = Number(data?.prediction?.confidence ?? 0);
      const normalized: AnalysisResult = {
        condition: data?.prediction?.disease || 'Dermatology Assessment',
        confidence: Math.max(0, Math.min(100, Math.round(confidenceRaw <= 1 ? confidenceRaw * 100 : confidenceRaw))),
        reportId: data?.analysis_id || `AN-${Date.now()}`,
        precautions: Array.isArray(data?.recommendations) ? data.recommendations : [],
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
      <PremiumNavbar />

      <main style={{ paddingTop: 96, paddingBottom: 60 }}>
        <div style={{ textAlign: 'center', padding: '40px 24px 32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: 100,
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 600,
              color: '#0284c7',
              marginBottom: 16,
              letterSpacing: '0.02em',
            }}
          >
            Clinical AI Dermatology Analysis
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
            Start Your Skin Analysis
          </h1>
          <p style={{ color: '#64748b', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Follow the workflow for a comprehensive clinical assessment.
          </p>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto 40px', padding: '0 16px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minWidth: 'max-content', padding: '0 8px' }}>
            {STEPS.map((s, i) => {
              const isActive = step === s.id;
              const isDone = step > s.id;
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isActive ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : isDone ? '#22c55e' : '#e2e8f0',
                        color: isActive || isDone ? '#fff' : '#94a3b8',
                        fontWeight: 700,
                        boxShadow: isActive ? '0 4px 16px rgba(14,165,233,0.35)' : 'none',
                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {isDone ? 'OK' : s.icon}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: isActive ? 700 : 500, color: isActive ? '#0284c7' : isDone ? '#16a34a' : '#94a3b8', whiteSpace: 'nowrap' }}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 60, height: 2, background: step > s.id ? '#22c55e' : '#e2e8f0', margin: '0 4px 20px', transition: 'background 0.4s ease' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {loading && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}
          >
            <div style={{ width: 64, height: 64, border: '4px solid rgba(255,255,255,0.15)', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 600, margin: '0 0 8px' }}>Processing Analysis</p>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{loadingStep}</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
            <ResultCard result={result} patient={form} imagePreview={imagePreview} onDownload={downloadPDF} />
          </div>
        )}

        {!result && !loading && (
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: 900,
              margin: '0 auto',
              padding: '0 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 24px' }}>Patient Information</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
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

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    Phone Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <PhoneInputCustom value={form.phone} onChange={(val) => setForm((p) => ({ ...p, phone: val }))} required />
                  {errors.phone && (
                    <span style={{ fontSize: 12, color: '#ef4444', marginTop: 4, display: 'block' }}>! {errors.phone}</span>
                  )}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
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
                <div style={{ marginTop: 16, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, color: '#dc2626', fontSize: 14 }}>
                  ! {errors.submit}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Image Upload</h3>

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
                  style={{
                    border: `2px dashed ${dragOver ? '#0ea5e9' : imagePreview ? '#22c55e' : '#cbd5e1'}`,
                    borderRadius: 14,
                    padding: 20,
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: dragOver ? '#f0f9ff' : imagePreview ? '#f0fdf4' : '#f8fafc',
                    transition: 'all 0.2s',
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" style={{ maxHeight: 140, maxWidth: '100%', borderRadius: 10, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
                      <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Image ready - click to change</span>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 36 }}>IMG</div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#374151' }}>Drop image here or click to upload</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>JPG, PNG, WEBP - Max 10MB</p>
                    </>
                  )}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                />
                {errors.image && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 8 }}>! {errors.image}</p>}
              </div>

              <div style={{ background: '#fff', borderRadius: 16, padding: '16px 20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Validation Status
                </h4>
                {[
                  { label: 'Image Validation', ready: !!imagePreview },
                  { label: 'Patient Info', ready: !!(form.fullName && form.email && form.phone && form.age && form.gender) },
                  { label: 'ISIC Ready', ready: false },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#475569' }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: item.ready ? '#dcfce7' : '#f1f5f9', color: item.ready ? '#16a34a' : '#94a3b8' }}>
                      {item.ready ? 'Ready' : 'Waiting'}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: 'none',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 8px 24px rgba(14,165,233,0.35)',
                }}
              >
                Start AI Analysis
              </button>
            </div>

            <div
              style={{
                gridColumn: '1 / -1',
                background: '#fff',
                borderRadius: 14,
                padding: '14px 20px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Powered by
              </span>
              {['ISIC Dermatology Validation', 'Hugging Face Medical Vision', 'Secure Clinical Database'].map((t) => (
                <span key={t} style={{ fontSize: 13, fontWeight: 600, color: '#0284c7' }}>
                  - {t}
                </span>
              ))}
            </div>
          </form>
        )}

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            form[style*='grid-template-columns'] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
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
  const isUrgent = result.condition.toLowerCase().includes('melanoma');
  const confidence = result.confidence || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          background: isUrgent
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : 'linear-gradient(135deg, #0ea5e9, #6366f1)',
          borderRadius: 20,
          padding: 32,
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div>
          {isUrgent && (
            <div
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 100,
                padding: '4px 14px',
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 12,
                display: 'inline-block',
                letterSpacing: '0.1em',
              }}
            >
              URGENT - SEEK MEDICAL ATTENTION
            </div>
          )}
          <h2 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800 }}>{result.condition}</h2>
          <p style={{ margin: 0, fontSize: 15, opacity: 0.85 }}>
            Report ID: {result.reportId} - {new Date().toLocaleDateString()}
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="#fff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(confidence / 100) * 201} 201`}
              transform="rotate(-90 40 40)"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
            <text x="40" y="45" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">
              {confidence}%
            </text>
          </svg>
          <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.8 }}>Confidence</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Patient Details</h3>
          {[
            ['Name', patient.fullName],
            ['Email', patient.email],
            ['Phone', patient.phone],
            ['Age', patient.age],
            ['Gender', patient.gender],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#64748b' }}>{k}</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{v}</span>
            </div>
          ))}
          {imagePreview && <img src={imagePreview} alt="Uploaded" style={{ width: '100%', borderRadius: 10, marginTop: 16, maxHeight: 160, objectFit: 'cover' }} />}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Clinical Guidance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(result.precautions || []).slice(0, 4).map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#374151' }}>
                <span style={{ color: '#0ea5e9', flexShrink: 0 }}>-</span>
                {p}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: 12, background: '#fef9c3', borderRadius: 10, fontSize: 12, color: '#854d0e', lineHeight: 1.6 }}>
            {result.disclaimer || 'This AI analysis is not a substitute for professional medical diagnosis.'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={onDownload} style={{ flex: 1, padding: 14, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          Download PDF Report
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{ flex: 1, padding: 14, borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#fff', color: '#374151', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          New Analysis
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
        Official healthcare report can be delivered to {patient.email}.
      </p>

      <style>{`
        @media (max-width: 768px) {
          div[style*='grid-template-columns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Analysis;
