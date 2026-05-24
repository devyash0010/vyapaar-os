import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, Receipt } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Premium Basmati Rice 5kg', price: 850, category: 'Grocery', stock: 45 },
  { id: '2', name: 'Sunflower Oil 1L', price: 165, category: 'Grocery', stock: 120 },
  { id: '3', name: 'Organic Honey 500g', price: 299, category: 'Food', stock: 15 },
  { id: '4', name: 'Whole Wheat Atta 10kg', price: 420, category: 'Grocery', stock: 30 },
  { id: '5', name: 'Green Tea 100 bags', price: 250, category: 'Beverages', stock: 60 },
  { id: '6', name: 'Premium Almonds 500g', price: 450, category: 'Dry Fruits', stock: 25 },
  { id: '7', name: 'Cashews Whole 500g', price: 550, category: 'Dry Fruits', stock: 20 },
  { id: '8', name: 'Tomato Ketchup 1kg', price: 140, category: 'Food', stock: 40 },
  { id: '9', name: 'Washing Powder 2kg', price: 320, category: 'Cleaning', stock: 50 },
  { id: '10', name: 'Dishwash Liquid 500ml', price: 99, category: 'Cleaning', stock: 80 },
];

export default function POS() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const gst = subtotal * 0.18; // Flat 18% GST for demo
  const grandTotal = subtotal + gst;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Payment of ₹${grandTotal.toFixed(2)} received via ${paymentMethod}.\nInvoice generated successfully!`);
    clearCart();
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* Left: Product Grid */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Smart Terminal</h1>
            <p className="text-sm text-zinc-400 mt-1">Fast billing and inventory checkout.</p>
          </div>
          <div className="relative w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search products or scan barcode..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder:text-zinc-500 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 cursor-pointer hover:border-blue-500/50 hover:bg-zinc-800/50 transition-all group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800/50">
                    {product.category}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">{product.stock} in stock</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex-1 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-bold text-white">₹{product.price}</span>
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <Plus className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
              <Search className="w-8 h-8 opacity-50" />
              <p>No products found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Cart & Billing */}
      <div className="w-full lg:w-[400px] flex flex-col bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden shrink-0 h-[calc(100vh-8rem)]">
        
        <div className="p-5 border-b border-zinc-800/50 bg-zinc-950/50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
            <h2 className="text-base font-bold text-white">Current Order</h2>
          </div>
          <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-500/20">
            {cart.length} Items
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-3 opacity-60">
              <Receipt className="w-12 h-12" />
              <p className="text-sm">Scan items or click to add</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="p-3 bg-zinc-950/50 border border-zinc-800/50 rounded-xl flex gap-3 group hover:border-zinc-700 transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-zinc-200 truncate">{item.name}</h4>
                  <div className="text-xs text-zinc-500 mt-1">₹{item.price} / unit</div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="text-sm font-bold text-white mb-2">₹{item.price * item.qty}</span>
                  <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                    <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-zinc-800 hover:text-white text-zinc-400 rounded-md transition-colors">
                      {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs font-bold w-4 text-center text-white">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-zinc-800 hover:text-white text-zinc-400 rounded-md transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-zinc-950/80 border-t border-zinc-800/50 shrink-0 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-200 font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>CGST & SGST (18%)</span>
              <span className="text-zinc-200 font-medium">₹{gst.toFixed(2)}</span>
            </div>
            <div className="pt-2 mt-2 border-t border-zinc-800/50 flex justify-between items-center">
              <span className="text-zinc-300 font-semibold">Grand Total</span>
              <span className="text-2xl font-bold text-blue-400">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'UPI', icon: QrCode },
              { id: 'Card', icon: CreditCard },
              { id: 'Cash', icon: Banknote }
            ].map(method => (
              <button 
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all ${
                  paymentMethod === method.id 
                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                    : 'bg-zinc-900 border-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <method.icon className="w-4 h-4" />
                {method.id}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={clearCart}
              disabled={cart.length === 0}
              className="px-4 py-3 bg-zinc-900 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/30 text-zinc-400 hover:text-red-400 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              Charge ₹{grandTotal.toFixed(2)}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}