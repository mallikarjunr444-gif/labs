import axios from 'axios';
import { getApiBaseUrl } from './apiBase';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================================
// ANALYSIS ENDPOINTS
// ============================================================================

export const analyzeImage = async (formData: FormData) => {
  try {
    const response = await api.post('/analysis/start', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message || 'Analysis failed',
    };
  }
};

export const getAnalysisResult = async (analysisId: string) => {
  try {
    const response = await api.get(`/analysis/${analysisId}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

// ============================================================================
// REPORT ENDPOINTS
// ============================================================================

export const generateReport = async (analysisId: string) => {
  try {
    const response = await api.post(`/reports/${analysisId}/generate`, {}, {
      responseType: 'blob',
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const downloadReport = async (reportId: string) => {
  try {
    const response = await api.get(`/reports/${reportId}/download`, {
      responseType: 'blob',
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const emailReport = async (reportId: string, email: string) => {
  try {
    const response = await api.post(`/reports/${reportId}/email`, { email });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

// ============================================================================
// HISTORY ENDPOINTS
// ============================================================================

export const getAnalysisHistory = async (limit: number = 10) => {
  try {
    const response = await api.get('/history', { params: { limit } });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const deleteHistoryEntry = async (historyId: string) => {
  try {
    const response = await api.delete(`/history/${historyId}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

// ============================================================================
// HEALTH CHECK
// ============================================================================

export const checkBackendHealth = async () => {
  try {
    const response = await api.get('/health');
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

// ============================================================================
// VALIDATION ENDPOINTS
// ============================================================================

export const validateImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/validate/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};

export default api;
