import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, Clock, Menu } from 'lucide-react';
import { useBusinessStore } from '../../store/useBusinessStore';

export default function Header({ onQuickNewBill, currentView, onToggleMobileMenu }) {
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
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate max-w-[130px] sm:max-w-none">{currentDate}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium">Ready</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {currentView !== 'pos' && onQuickNewBill && (
          <button
            onClick={onQuickNewBill}
            className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">New Sale</span>
          </button>
        )}

        <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1"></div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0">
            {profile.store_name ? profile.store_name.charAt(0).toUpperCase() : 'V'}
          </div>
          <div className="hidden lg:block text-left max-w-[140px]">
            <p className="text-xs font-semibold text-slate-800 leading-tight truncate">{profile.legal_name || 'Merchant'}</p>
            <p className="text-[10px] text-slate-500 font-mono leading-none truncate">GST Active</p>
          </div>
        </div>
      </div>
    </header>
  );
}