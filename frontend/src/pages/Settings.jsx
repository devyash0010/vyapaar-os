import React, { useState } from 'react';
import { Store, Save, CheckCircle2, QrCode, Shield, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { useBusinessStore } from '../store/useBusinessStore';

export default function Settings() {
  const profile = useBusinessStore((state) => state.profile);
  const updateProfile = useBusinessStore((state) => state.updateProfile);

  const [storeName, setStoreName] = useState(profile.store_name || '');
  const [legalName, setLegalName] = useState(profile.legal_name || '');
  const [gstin, setGstin] = useState(profile.gstin || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [email, setEmail] = useState(profile.email || '');
  const [address, setAddress] = useState(profile.address || '');
  const [upiId, setUpiId] = useState(profile.upi_id || '');
  const [taxRate, setTaxRate] = useState(profile.default_gst_rate || 18);
  const [invoicePrefix, setInvoicePrefix] = useState(profile.invoice_prefix || 'INV-2026-');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      store_name: storeName,
      legal_name: legalName,
      gstin: gstin,
      phone: phone,
      email: email,
      address: address,
      upi_id: upiId,
      default_gst_rate: Number(taxRate),
      invoice_prefix: invoicePrefix,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Store & GST Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Configure your business profile, GSTIN, UPI QR ID, and bill formats.</p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">Business settings saved successfully. Updated details will appear on all future tax invoices and screens.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Profile */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-sm font-bold text-slate-900">
            <Store className="w-4 h-4 text-blue-600" />
            <span>Store Identity & Legal Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Display Store / Shop Name *</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="e.g. Vyapaar SuperMart"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registered Legal Entity Name</label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="e.g. Vyapaar Retail India Pvt Ltd"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">GSTIN / Tax ID (15 digits) *</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                placeholder="27AABCV1234D1Z5"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Store Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Store Address (printed on invoices)</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shop No. 12, Commercial Complex, MG Road, Mumbai, Maharashtra - 400001"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* UPI & Taxes */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-sm font-bold text-slate-900">
            <QrCode className="w-4 h-4 text-emerald-600" />
            <span>Digital Payments & Taxation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Merchant UPI VPA (for QR codes)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="vyapaar.mart@okicici"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Default GST Rate</label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600"
              >
                <option value={0}>0% (Exempt)</option>
                <option value={5}>5% (Basic Essentials)</option>
                <option value={12}>12% (Standard)</option>
                <option value={18}>18% (General Retail)</option>
                <option value={28}>28% (Luxury / Aerated)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Invoice Prefix</label>
              <input
                type="text"
                value={invoicePrefix}
                onChange={(e) => setInvoicePrefix(e.target.value)}
                placeholder="INV-2026-"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-600 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" /> Save Business Profile
          </button>
        </div>
      </form>
    </div>
  );
}