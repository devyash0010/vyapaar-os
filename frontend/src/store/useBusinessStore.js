import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_PRODUCTS = [
  { id: 'PROD-001', name: 'Premium Basmati Rice 5kg', category: 'Grocery', sku_barcode: '8901030382012', purchase_price: 680, price: 850, stock: 45, threshold: 15, gst_rate: 5, status: 'In Stock' },
  { id: 'PROD-002', name: 'Sunflower Cooking Oil 1L', category: 'Grocery', sku_barcode: '8901030382029', purchase_price: 130, price: 165, stock: 12, threshold: 20, gst_rate: 5, status: 'Low Stock' },
  { id: 'PROD-003', name: 'Organic Wild Honey 500g', category: 'Food', sku_barcode: '8901030382036', purchase_price: 210, price: 299, stock: 4, threshold: 10, gst_rate: 12, status: 'Critical' },
  { id: 'PROD-004', name: 'Whole Wheat Chakki Atta 10kg', category: 'Grocery', sku_barcode: '8901030382043', purchase_price: 360, price: 420, stock: 30, threshold: 15, gst_rate: 5, status: 'In Stock' },
  { id: 'PROD-005', name: 'Green Tea Detox 100 Bags', category: 'Beverages', sku_barcode: '8901030382050', purchase_price: 180, price: 250, stock: 60, threshold: 20, gst_rate: 12, status: 'In Stock' },
  { id: 'PROD-006', name: 'California Almonds 500g', category: 'Dry Fruits', sku_barcode: '8901030382067', purchase_price: 370, price: 450, stock: 25, threshold: 10, gst_rate: 12, status: 'In Stock' },
  { id: 'PROD-007', name: 'Cashews Whole Grade A 500g', category: 'Dry Fruits', sku_barcode: '8901030382074', purchase_price: 440, price: 550, stock: 18, threshold: 10, gst_rate: 12, status: 'In Stock' },
  { id: 'PROD-008', name: 'Dishwash Liquid Gel 500ml', category: 'Cleaning', sku_barcode: '8901030382081', purchase_price: 72, price: 99, stock: 80, threshold: 25, gst_rate: 18, status: 'In Stock' },
  { id: 'PROD-009', name: 'Tomato Ketchup 1kg', category: 'Food', sku_barcode: '8901030382098', purchase_price: 105, price: 140, stock: 42, threshold: 15, gst_rate: 12, status: 'In Stock' },
  { id: 'PROD-010', name: 'Washing Detergent Powder 2kg', category: 'Cleaning', sku_barcode: '8901030382104', purchase_price: 240, price: 320, stock: 55, threshold: 20, gst_rate: 18, status: 'In Stock' },
];

const INITIAL_CUSTOMERS = [
  { id: 'CUS-001', name: 'Rajesh Enterprises', phone: '+91 98765 43210', email: 'rajesh@enterprises.in', total_spent: 145200, points: 1450, last_visit: 'Today' },
  { id: 'CUS-002', name: 'Sharma General Store', phone: '+91 91234 56789', email: 'sharma@store.com', total_spent: 84500, points: 840, last_visit: '2 days ago' },
  { id: 'CUS-003', name: 'Anjali Desai', phone: '+91 99887 76655', email: 'anjali.d@gmail.com', total_spent: 12400, points: 120, last_visit: '1 week ago' },
  { id: 'CUS-004', name: 'TechCorp India', phone: '+91 88776 65544', email: 'billing@techcorp.in', total_spent: 320000, points: 3200, last_visit: 'Yesterday' },
  { id: 'CUS-005', name: 'Vikram Singh', phone: '+91 77665 54433', email: 'vikram.s@outlook.com', total_spent: 5800, points: 58, last_visit: '3 weeks ago' },
];

const INITIAL_TRANSACTIONS = [
  { id: 'INV-2026-001', invoice_number: 'INV-2026-001', customer_name: 'Rajesh Enterprises', customer_phone: '+91 98765 43210', subtotal: 12288.13, cgst: 1105.93, sgst: 1105.94, grand_total: 14500.0, payment_mode: 'UPI', status: 'Completed', created_at: 'Today, 10:23 AM', item_count: 5 },
  { id: 'INV-2026-002', invoice_number: 'INV-2026-002', customer_name: 'Walk-in Customer', customer_phone: '', subtotal: 1779.66, cgst: 160.17, sgst: 160.17, grand_total: 2100.0, payment_mode: 'Cash', status: 'Completed', created_at: 'Today, 09:45 AM', item_count: 2 },
  { id: 'INV-2026-003', invoice_number: 'INV-2026-003', customer_name: 'Sharma General Store', customer_phone: '+91 91234 56789', subtotal: 7161.02, cgst: 644.49, sgst: 644.49, grand_total: 8450.0, payment_mode: 'Card', status: 'Completed', created_at: 'Yesterday', item_count: 4 },
];

export const useBusinessStore = create(
  persist(
    (set, get) => ({
      // Store Business Profile
      profile: {
        store_name: 'Vyapaar SuperMart',
        legal_name: 'Vyapaar Retail India Pvt Ltd',
        gstin: '27AABCV1234D1Z5',
        phone: '+91 98765 43210',
        email: 'billing@vyapaarsupermart.com',
        address: 'Shop No. 12, Commercial Complex, MG Road, Mumbai, Maharashtra - 400001',
        upi_id: 'vyapaar.mart@okicici',
        default_gst_rate: 18,
        invoice_prefix: 'INV-2026-',
      },
      updateProfile: (newProfile) => set((state) => ({
        profile: { ...state.profile, ...newProfile }
      })),

      // Products State
      products: INITIAL_PRODUCTS,
      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({
        products: [product, ...state.products]
      })),
      removeProduct: (productId) => set((state) => ({
        products: state.products.filter(p => p.id !== productId)
      })),

      // Customers State
      customers: INITIAL_CUSTOMERS,
      setCustomers: (customers) => set({ customers }),
      addCustomer: (customer) => set((state) => ({
        customers: [customer, ...state.customers]
      })),

      // Transactions / Invoices State
      transactions: INITIAL_TRANSACTIONS,
      addTransaction: (tx) => set((state) => ({
        transactions: [tx, ...state.transactions]
      })),

      // Smart POS Cart State
      cart: [],
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, qty: 1 }] };
      }),
      updateCartQty: (id, delta) => set((state) => ({
        cart: state.cart
          .map(item => (item.id === id ? { ...item, qty: item.qty + delta } : item))
          .filter(item => item.qty > 0)
      })),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'vyapaar-business-storage',
      partialize: (state) => ({
        profile: state.profile,
        products: state.products,
        customers: state.customers,
        transactions: state.transactions,
      }),
    }
  )
);