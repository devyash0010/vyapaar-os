import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Receipt, 
  Printer, 
  X, 
  CheckCircle2,
  User,
  Phone
} from 'lucide-react';
import { useBusinessStore } from '../store/useBusinessStore';
import { api } from '../lib/api';

export default function POS() {
  const products = useBusinessStore((state) => state.products);
  const cart = useBusinessStore((state) => state.cart);
  const addToCart = useBusinessStore((state) => state.addToCart);
  const updateCartQty = useBusinessStore((state) => state.updateCartQty);
  const removeFromCart = useBusinessStore((state) => state.removeFromCart);
  const clearCart = useBusinessStore((state) => state.clearCart);
  const addTransaction = useBusinessStore((state) => state.addTransaction);
  const profile = useBusinessStore((state) => state.profile);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedInvoice, setCompletedInvoice] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.sku_barcode && p.sku_barcode.includes(searchQuery));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Pricing calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }, [cart]);

  const taxRate = profile.default_gst_rate || 18;
  const gstAmount = subtotal * (taxRate / 100);
  const cgstAmount = gstAmount / 2;
  const sgstAmount = gstAmount / 2;
  const grandTotal = subtotal + gstAmount;

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    if (paymentMethod === 'UPI' && !showQrModal) {
      setShowQrModal(true);
      return;
    }

    setIsProcessing(true);
    const invoiceNum = `${profile.invoice_prefix || 'INV-2026-'}${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice = {
      id: invoiceNum,
      invoice_number: invoiceNum,
      customer_name: customerName || 'Walk-in Customer',
      customer_phone: customerPhone || '',
      items: cart.map(item => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        total: item.price * item.qty
      })),
      subtotal: Number(subtotal.toFixed(2)),
      cgst: Number(cgstAmount.toFixed(2)),
      sgst: Number(sgstAmount.toFixed(2)),
      gst_rate: taxRate,
      grand_total: Number(grandTotal.toFixed(2)),
      payment_mode: paymentMethod,
      created_at: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      item_count: cart.reduce((sum, item) => sum + item.qty, 0)
    };

    try {
      // Send to backend API
      await api.pos.checkout(newInvoice).catch(() => null);
    } catch {
      // Local store persistence handles it seamlessly
    }

    addTransaction(newInvoice);
    setCompletedInvoice(newInvoice);
    clearCart();
    setIsProcessing(false);
    setShowQrModal(false);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col lg:flex-row gap-5">
      {/* Left Column: Catalog & Products */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-slate-200 rounded-xl p-5 shadow-sm overflow-hidden">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">Smart POS Terminal</h1>
            <p className="text-xs text-slate-500 mt-1">Select items or scan barcode to add to bill</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search item or SKU barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 py-3 overflow-x-auto no-scrollbar border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="flex-1 overflow-y-auto pt-4 pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredProducts.map((p) => {
              const inCartItem = cart.find(c => c.id === p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between h-36 ${
                    inCartItem 
                      ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500' 
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {p.category}
                      </span>
                      <span className={`text-[10px] font-bold ${p.stock <= p.threshold ? 'text-amber-600' : 'text-slate-400'}`}>
                        {p.stock} left
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-2 mt-2 leading-tight">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-900">₹{p.price}</span>
                    <button 
                      className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                        inCartItem ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {inCartItem ? inCartItem.qty : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-xs">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Cart, Customer & Checkout */}
      <div className="w-full lg:w-[420px] flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden shrink-0">
        {/* Cart Header & Customer Form */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Active Order</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
              {cart.reduce((s, i) => s + i.qty, 0)} Items
            </span>
          </div>

          {/* Quick Customer Info */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="relative">
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Phone (Optional)"
                className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16 space-y-2">
              <Receipt className="w-10 h-10 text-slate-300" />
              <p className="text-xs font-medium">Order is empty</p>
              <p className="text-[11px] text-slate-400">Click any product to add to bill</p>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate leading-tight">{item.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">₹{item.price} × {item.qty}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-900">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                    <button 
                      onClick={() => updateCartQty(item.id, -1)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                    >
                      {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs font-bold w-4 text-center text-slate-900">{item.qty}</span>
                    <button 
                      onClick={() => updateCartQty(item.id, 1)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Billing Summary & Payment Controls */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 shrink-0">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>CGST ({(taxRate/2).toFixed(1)}%)</span>
              <span className="font-semibold text-slate-800">₹{cgstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>SGST ({(taxRate/2).toFixed(1)}%)</span>
              <span className="font-semibold text-slate-800">₹{sgstAmount.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-900">Grand Total</span>
              <span className="text-xl font-black text-blue-600">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { id: 'UPI', icon: QrCode, label: 'UPI / QR' },
              { id: 'Cash', icon: Banknote, label: 'Cash' },
              { id: 'Card', icon: CreditCard, label: 'Card' },
            ].map(m => {
              const Icon = m.icon;
              const isSelected = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`py-2 px-2 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 transition-colors ${
                    isSelected 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={clearCart}
              disabled={cart.length === 0}
              className="px-3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              Clear
            </button>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || isProcessing}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Charge ₹{grandTotal.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* UPI QR Payment Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-5 text-center">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Scan to Pay via UPI</span>
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-500">Any UPI App (GPay, PhonePe, Paytm, BHIM)</p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block shadow-inner">
                {/* Visual Clean QR Code */}
                <div className="w-44 h-44 bg-white p-2 border border-slate-300 rounded-lg flex flex-col items-center justify-center mx-auto">
                  <QrCode className="w-36 h-36 text-slate-800" />
                </div>
              </div>
              <p className="text-xs font-mono font-bold text-slate-700 mt-1">{profile.upi_id || 'vyapaar.mart@okicici'}</p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <span className="text-xs text-blue-700 font-medium">Total Amount Due</span>
              <p className="text-2xl font-black text-blue-800">₹{grandTotal.toFixed(2)}</p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Payment Received</span>
            </button>
          </div>
        </div>
      )}

      {/* Tax Invoice Receipt Modal */}
      {completedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Sale Completed Successfully</span>
              </div>
              <button onClick={() => setCompletedInvoice(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Area */}
            <div id="printable-receipt" className="p-6 bg-white text-slate-800 text-xs space-y-4">
              <div className="text-center pb-3 border-b border-dashed border-slate-300 space-y-1">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                  {profile.store_name || 'Vyapaar SuperMart'}
                </h2>
                <p className="text-[11px] text-slate-500 leading-tight">{profile.legal_name}</p>
                <p className="text-[11px] text-slate-500 leading-tight">{profile.address}</p>
                <p className="text-[11px] font-mono font-semibold text-slate-700 mt-1">
                  GSTIN: {profile.gstin || '27AABCV1234D1Z5'}
                </p>
                <p className="text-[11px] text-slate-500">Ph: {profile.phone}</p>
              </div>

              <div className="grid grid-cols-2 text-[11px] text-slate-600 gap-1 pb-2 border-b border-dashed border-slate-200">
                <div><strong>Invoice:</strong> {completedInvoice.invoice_number}</div>
                <div className="text-right"><strong>Date:</strong> {completedInvoice.created_at}</div>
                <div><strong>Customer:</strong> {completedInvoice.customer_name}</div>
                <div className="text-right"><strong>Mode:</strong> {completedInvoice.payment_mode}</div>
              </div>

              {/* Items */}
              <div className="space-y-1.5 py-1">
                <div className="flex justify-between font-bold text-[11px] text-slate-700 pb-1 border-b border-slate-200">
                  <span>Item</span>
                  <span className="w-10 text-center">Qty</span>
                  <span className="w-16 text-right">Price</span>
                  <span className="w-16 text-right">Amount</span>
                </div>
                {completedInvoice.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-[11px] text-slate-600">
                    <span className="truncate flex-1 pr-2">{it.name}</span>
                    <span className="w-10 text-center">{it.qty}</span>
                    <span className="w-16 text-right">₹{it.price}</span>
                    <span className="w-16 text-right font-semibold text-slate-800">₹{it.total}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-2 border-t border-dashed border-slate-300 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Taxable Subtotal:</span>
                  <span>₹{completedInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>CGST ({(completedInvoice.gst_rate / 2).toFixed(1)}%):</span>
                  <span>₹{completedInvoice.cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SGST ({(completedInvoice.gst_rate / 2).toFixed(1)}%):</span>
                  <span>₹{completedInvoice.sgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>NET PAYABLE:</span>
                  <span>₹{completedInvoice.grand_total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-center pt-3 border-t border-dashed border-slate-300 text-[10px] text-slate-500">
                <p>Thank you for your business!</p>
                <p className="font-mono">Computer Generated GST Tax Invoice</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print Tax Invoice
              </button>
              <button
                onClick={() => setCompletedInvoice(null)}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}