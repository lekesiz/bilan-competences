import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async (email: string, password: string) => {
    // TODO: Replace with actual API call
    set({ 
      isAuthenticated: true,
      isAdmin: false,
      user: {
        id: '1',
        email,
        name: 'Test User',
        profession: 'Software Developer',
        experience: '3-5 ans',
        interests: ['Développement logiciel', 'UI/UX Design'],
        createdAt: new Date()
      }
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },
  register: async (email: string, password: string, name: string) => {
    // TODO: Replace with actual API call
    set({ 
      isAuthenticated: true,
      isAdmin: false,
      user: {
        id: '1',
        email,
        name,
        createdAt: new Date()
      }
    });
  },
  updateProfile: async (profileData: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...profileData } : null
    }));
  }
}));