import React from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart2, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ currentView, onNavigate, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pos', label: 'Smart POS', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800/50 flex flex-col h-screen shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/50 shrink-0">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
          <span className="text-white text-sm font-bold">V</span>
        </div>
        <span className="font-bold text-lg text-white tracking-tight">Vyapaar OS</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-500/10 text-blue-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-blue-500/20' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-zinc-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800/50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4 text-zinc-500 group-hover:text-red-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}