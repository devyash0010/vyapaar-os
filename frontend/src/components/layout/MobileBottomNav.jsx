import React from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings } from 'lucide-react';
import { useBusinessStore } from '../../store/useBusinessStore';

export default function MobileBottomNav({ currentView, onNavigate }) {
  const cart = useBusinessStore((state) => state.cart);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'pos', label: 'Billing', icon: ShoppingCart, badge: cartItemCount > 0 ? cartItemCount : null },
    { id: 'inventory', label: 'Stock', icon: Package },
    { id: 'customers', label: 'Parties', icon: Users },
    { id: 'settings', label: 'More', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 flex items-center justify-around h-14 px-1 shadow-lg pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
