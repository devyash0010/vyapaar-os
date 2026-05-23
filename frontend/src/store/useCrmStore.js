import { create } from 'zustand';

export const useCrmStore = create((set) => ({
  customers: [],
  setCustomers: (customers) => set({ customers })
}));