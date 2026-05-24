import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import RevenueChart from '../components/shared/RevenueChart'; // Reusing the chart

const TOP_PRODUCTS = [
  { name: 'Premium Basmati Rice 5kg', sales: 142, rev: '₹1,20,700' },
  { name: 'Sunflower Oil 1L', sales: 384, rev: '₹63,360' },
  { name: 'Cashews Whole 500g', sales: 89, rev: '₹48,950' },
];

export default function Analytics() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Business Intelligence <Sparkles className="w-5 h-5 text-indigo-400" />
        </h1>
        <p className="text-sm text-zinc-400 mt-1">AI-driven analytics and health scoring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Insights Panel */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900/20 to-blue-900/10 border border-indigo-500/20 rounded-2xl overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="p-6 border-b border-indigo-500/10 flex items-center gap-3 bg-zinc-950/30">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Vyapaar AI Insights</h3>
              <p className="text-xs text-indigo-300/70">Generated 2 mins ago</p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-950/50 border border-zinc-800/50 p-4 rounded-xl hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-zinc-200">Demand Surge Forecast</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Expect a 25% increase in "Sunflower Oil" demand this weekend based on historical monthly patterns. Recommend stocking 50 additional units.
              </p>
            </div>
            
            <div className="bg-zinc-950/50 border border-zinc-800/50 p-4 rounded-xl hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-bold text-zinc-200">GST Optimization</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Unclaimed Input Tax Credit (ITC) of ₹4,200 detected in recent transport invoices. Ready to apply to this month's GSTR-3B filing.
              </p>
            </div>
          </div>
        </div>

        {/* Business Health Score */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
           <Activity className="absolute top-4 right-4 w-5 h-5 text-zinc-700" />
           <h3 className="font-bold text-white w-full text-left mb-4">Business Health</h3>
           
           <div className="relative w-36 h-36 mt-4 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
               <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="45" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" strokeLinecap="round" />
             </svg>
             <div className="absolute flex flex-col items-center justify-center">
               <span className="text-3xl font-black text-white tracking-tighter">82</span>
               <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Excellent</span>
             </div>
           </div>

           <div className="mt-8 space-y-3 w-full text-left">
             <div className="flex justify-between items-center text-sm">
               <span className="text-zinc-400">Cash Flow</span>
               <span className="font-semibold text-white">Healthy</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-zinc-400">Inventory Turnover</span>
               <span className="font-semibold text-emerald-400">Optimal</span>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Full Analytics Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 flex flex-col min-h-[350px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-white">Sales & Orders Telemetry</h2>
          </div>
          <div className="flex-1">
            <RevenueChart />
          </div>
        </div>

        {/* Top Products Widget */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/30">
            <h2 className="text-base font-bold text-white">Top Moving Products</h2>
          </div>
          <div className="p-4 flex-1 space-y-2">
            {TOP_PRODUCTS.map((prod, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 hover:bg-zinc-800/30 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200">{prod.name}</h4>
                    <p className="text-xs text-zinc-500">{prod.sales} units sold</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-emerald-400">{prod.rev}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-zinc-800/50">
            <button className="w-full text-xs font-semibold text-blue-400 hover:text-blue-300 flex justify-center items-center gap-1 transition-colors">
              View Full Report <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}