import { create } from 'zustand';

export const useAuth = create((set) => ({
  user: { name: 'Admin', email: 'admin@vyapaaros.com', role: 'owner' },
  isAuthenticated: true,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
