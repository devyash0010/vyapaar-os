import React from 'react';
import { TrendingUp, Users, ShoppingBag, Wallet } from 'lucide-react';

export default function Dashboard() {
  const metrics = [
    { title: "Gross Revenue", value: "₹5,42,500", change: "+14.2%", isPositive: true, icon: TrendingUp },
    { title: "Active Customers", value: "1,420", change: "+8.1%", isPositive: true, icon: Users },
    { title: "Items Sold", value: "3,842", change: "+2.4%", isPositive: true, icon: ShoppingBag },
    { title: "Outstanding Dues", value: "₹42,850", change: "-5.2%", isPositive: false, icon: Wallet },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back. Here is your minimal safe operational view.</p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500">{metric.title}</span>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <metric.icon className="w-4 h-4 text-slate-600" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{metric.value}</h3>
            
            <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded border ${
              metric.isPositive 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                : 'bg-amber-50 text-amber-600 border-amber-200'
            }`}>
              {metric.change} vs last month
            </span>
          </div>
        ))}
      </div>

      {/* Safe Placeholder for Future Content */}
      <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Ready for Expansion</h3>
        <p className="text-sm text-slate-500 max-w-md">
          This dashboard is currently running on pure, lightweight React. Charts, tables, and AI Copilot integrations can be safely added here.
        </p>
      </div>

    </div>
  );
}