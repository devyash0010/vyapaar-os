import React from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Smart POS', icon: ShoppingCart, active: false },
    { label: 'Inventory', icon: Package, active: false },
    { label: 'Customers', icon: Users, active: false },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 shrink-0">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-sm font-bold">V</span>
        </div>
        <span className="font-bold text-lg text-slate-900">Vyapaar OS</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              item.active 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-slate-400'}`} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5 text-slate-400 hover:text-red-500" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}