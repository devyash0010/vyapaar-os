import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { useBusinessStore } from '../../store/useBusinessStore';

export default function Header({ onQuickNewBill, currentView }) {
  const profile = useBusinessStore((state) => state.profile);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentDate}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium">Production Mode Ready</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {currentView !== 'pos' && onQuickNewBill && (
          <button
            onClick={onQuickNewBill}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Sale (POS)</span>
          </button>
        )}

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
            IN
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">{profile.legal_name || 'Merchant'}</p>
            <p className="text-[10px] text-slate-500 font-mono leading-none">GST Active</p>
          </div>
        </div>
      </div>
    </header>
  );
}