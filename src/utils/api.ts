import axios from 'axios/dist/browser/axios.cjs';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AnalysisRecord {
  id: string;
  user_id?: string | null;
  user_email?: string | null;
  filename?: string;
  label: 'good' | 'defective';
  confidence: number;
  raw_score: number;
  threshold: number;
  recommendations: string[];
  created_at: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  created_at?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface DashboardSummary {
  user: AuthUser;
  stats: {
    total_scans: number;
    scans_this_month: number;
    fleet_health: number;
    alerts: number;
    current_status: 'Perfect' | 'Needs Check' | 'Action Required';
  };
}

export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),
  register: (fullName: string, email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/register', { fullName, email, password }),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
};

export const tyreAPI = {
  uploadImage: (imageData: FormData) =>
    apiClient.post<AnalysisRecord>('/tyres/analyze', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getAnalysisHistory: (params?: { user_id?: string; user_email?: string; limit?: number }) =>
    apiClient.get<AnalysisRecord[]>('/tyres/history', { params }),

  getAnalysisDetail: (id: string) => apiClient.get<AnalysisRecord>(`/tyres/${id}`),

  deleteAnalysis: (id: string) => apiClient.delete(`/tyres/${id}`),
};

export const userAPI = {
  getProfile: (params: { email?: string; user_id?: string }) =>
    apiClient.get<AuthUser>('/users/profile', { params }),
  getDashboard: (params: { email?: string; user_id?: string }) =>
    apiClient.get<DashboardSummary>('/users/dashboard', { params }),
  updateProfile: (data: {
    email?: string;
    user_id?: string;
    fullName?: string;
    phone?: string;
  }) => apiClient.put<AuthUser>('/users/profile', data),
  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post('/users/change-password', {
      oldPassword,
      newPassword,
    }),
  deleteAccount: (payload: { email?: string; user_id?: string }) =>
    apiClient.delete('/users/account', { data: payload }),
};

export default apiClient;
