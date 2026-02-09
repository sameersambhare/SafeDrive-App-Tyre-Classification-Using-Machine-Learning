import axios from 'axios';

// Replace with your actual API endpoint
const API_BASE_URL = 'https://api.safedrive.app/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  register: (fullName: string, email: string, password: string) =>
    apiClient.post('/auth/register', { fullName, email, password }),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
};

// Tyre analysis endpoints
export const tyreAPI = {
  uploadImage: (imageData: FormData) =>
    apiClient.post('/tyres/analyze', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAnalysisHistory: () => apiClient.get('/tyres/history'),
  getAnalysisDetail: (id: string) => apiClient.get(`/tyres/${id}`),
  deleteAnalysis: (id: string) => apiClient.delete(`/tyres/${id}`),
};

// User profile endpoints
export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data: any) => apiClient.put('/users/profile', data),
  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post('/users/change-password', {
      oldPassword,
      newPassword,
    }),
  deleteAccount: () => apiClient.delete('/users/account'),
};

// Export the client for custom requests
export default apiClient;
