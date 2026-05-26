import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string);
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string);

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables not set. Some features will be disabled.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
};

// Session management
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

export const onAuthStateChange = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((_event: any, session: any) => {
    callback(session);
  });
};

// Database operations
export const uploadAnalysisReport = async (userId: string, report: any) => {
  const { data, error } = await supabase
    .from('analysis_reports')
    .insert([
      {
        user_id: userId,
        report_data: report,
        created_at: new Date(),
      },
    ])
    .select();

  return { data, error };
};

export const getUserReports = async (userId: string) => {
  const { data, error } = await supabase
    .from('analysis_reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

// File upload to Supabase storage
export const uploadImageToStorage = async (userId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('medical-images')
    .upload(fileName, file);

  if (error) return { data: null, error };

  // Get public URL
  const { data: publicData } = supabase.storage
    .from('medical-images')
    .getPublicUrl(fileName);

  return { data: publicData, error: null };
};

// Save analysis history
export const saveAnalysisHistory = async (
  userId: string,
  patientName: string,
  imageUrl: string,
  analysisResult: any
) => {
  const { data, error } = await supabase
    .from('analysis_history')
    .insert([
      {
        user_id: userId,
        patient_name: patientName,
        image_url: imageUrl,
        analysis_result: analysisResult,
        created_at: new Date(),
      },
    ])
    .select();

  return { data, error };
};

export default supabase;
