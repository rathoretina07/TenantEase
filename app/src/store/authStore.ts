import { create } from 'zustand';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'tenant' | 'manager';
  profileImg?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: 'manager' | 'tenant') => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initFromStorage: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  role: 'MANAGER' | 'TENANT';
  firstName: string;
  lastName: string;
}

// Helper to map backend role to frontend role
const mapRole = (role: string): 'tenant' | 'manager' => {
  return role === 'MANAGER' ? 'manager' : 'tenant';
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Called on app start to restore session from localStorage
  initFromStorage: () => {
    const token = localStorage.getItem('tenant_ease_token');
    const userRaw = localStorage.getItem('tenant_ease_user');
    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw);
        set({ user, token, isAuthenticated: true });
      } catch {
        localStorage.removeItem('tenant_ease_token');
        localStorage.removeItem('tenant_ease_user');
      }
    }
  },

  login: async (email, password, _role) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: backendUser } = res.data;

      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.profile
          ? `${backendUser.profile.firstName} ${backendUser.profile.lastName}`
          : backendUser.email,
        role: mapRole(backendUser.role),
        profileImg: backendUser.profile?.avatarUrl ?? undefined,
      };

      localStorage.setItem('tenant_ease_token', token);
      localStorage.setItem('tenant_ease_user', JSON.stringify(user));

      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.';
      set({ error: msg, isLoading: false });
      throw new Error(msg);
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/register', data);
      const { token, user: backendUser } = res.data;

      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.profile
          ? `${backendUser.profile.firstName} ${backendUser.profile.lastName}`
          : backendUser.email,
        role: mapRole(backendUser.role),
      };

      localStorage.setItem('tenant_ease_token', token);
      localStorage.setItem('tenant_ease_user', JSON.stringify(user));

      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Registration failed. Please try again.';
      set({ error: msg, isLoading: false });
      throw new Error(msg);
    }
  },

  logout: () => {
    localStorage.removeItem('tenant_ease_token');
    localStorage.removeItem('tenant_ease_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setLoading: (isLoading) => set({ isLoading }),
}));
