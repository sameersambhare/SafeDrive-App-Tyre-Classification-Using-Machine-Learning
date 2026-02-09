/**
 * Enterprise-Level State Management with Zustand
 * Global state for authentication, user data, and app settings
 */

import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  vehicleInfo?: {
    make: string;
    model: string;
    year: number;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      // const response = await api.post('/auth/login', { email, password });
      // set({ isAuthenticated: true, user: response.data.user, token: response.data.token });
      set({ isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: 'Login failed', loading: false });
    }
  },

  register: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      set({ loading: false });
    } catch (error) {
      set({ error: 'Registration failed', loading: false });
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
  },

  setUser: (user) => {
    set({ user });
  },

  setLoading: (loading) => {
    set({ loading });
  },

  setError: (error) => {
    set({ error });
  },
}));

export interface ScanHistory {
  id: string;
  timestamp: Date;
  imageUrl: string;
  result: {
    wearLevel: number;
    condition: 'good' | 'fair' | 'poor';
    recommendation: string;
  };
}

export interface HistoryState {
  scans: ScanHistory[];
  loading: boolean;
  addScan: (scan: ScanHistory) => void;
  removeScan: (id: string) => void;
  fetchScans: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  scans: [],
  loading: false,

  addScan: (scan) => {
    set((state) => ({ scans: [scan, ...state.scans] }));
  },

  removeScan: (id) => {
    set((state) => ({ scans: state.scans.filter((s) => s.id !== id) }));
  },

  fetchScans: async () => {
    set({ loading: true });
    try {
      // API call would go here
      // const response = await api.get('/scans');
      // set({ scans: response.data });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  setLoading: (loading) => {
    set({ loading });
  },
}));

export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  language: 'en' | 'es' | 'fr';
  theme: 'primary' | 'secondary' | 'custom';
}

export interface SettingsState {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  darkMode: false,
  notifications: true,
  language: 'en',
  theme: 'primary',
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },

  resetSettings: () => {
    set({ settings: defaultSettings });
  },
}));
