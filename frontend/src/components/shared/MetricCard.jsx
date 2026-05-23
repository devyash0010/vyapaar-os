// src/components/shared/MetricCard.jsx
import React from 'react';

export default function MetricCard({ title, value, change, isPositive, icon: Icon }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-20 h-20 transform rotate-12 text-zinc-100" />
      </div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-sm font-medium text-zinc-400">{title}</span>
        <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 group-hover:border-blue-500/50 transition-colors">
          <Icon className="w-4 h-4 text-zinc-300 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-zinc-100 mb-2 relative z-10">{value}</h3>
      <div className="flex items-center gap-2 relative z-10">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${isPositive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
          {change}
        </span>
        <span className="text-xs text-zinc-500">vs last month</span>
      </div>
    </div>
  );
}