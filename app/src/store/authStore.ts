import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'tenant' | 'manager';
  profileImg?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock initial user for development purposes
const mockUser: User = {
  id: 'mock-123',
  email: 'manager@tenantease.com',
  name: 'Alex',
  role: 'manager',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser, // Replace with null in production
  isAuthenticated: true, // Replace with false in production
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
