import { create } from 'zustand';

export const useBusinessStore = create((set) => ({
  cart: [],
  products: [
    { id: '1', sku: 'SKU001', name: 'Premium Basmati Rice', price: 110, stock: 45, category: 'Grocery' },
    { id: '2', sku: 'SKU002', name: 'Sunflower Oil 1L', price: 145, stock: 8, category: 'Grocery' },
  ],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, qty: 1 }] };
  }),
  updateCartQty: (id, delta) => set((state) => ({
    cart: state.cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
  })),
  clearCart: () => set({ cart: [] })
}));import { create } from 'zustand';

export const useBusinessStore = create((set) => ({
  cart: [],
  products: [
    { id: '1', sku: 'SKU001', name: 'Premium Basmati Rice', price: 110, stock: 45, category: 'Grocery' },
    { id: '2', sku: 'SKU002', name: 'Sunflower Oil 1L', price: 145, stock: 8, category: 'Grocery' },
  ],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, qty: 1 }] };
  }),
  updateCartQty: (id, delta) => set((state) => ({
    cart: state.cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
  })),
  clearCart: () => set({ cart: [] })
}));