import React from 'react';
import { TrendingUp, Users, ShoppingBag, Package, ArrowUpRight, ArrowRight, AlertCircle } from 'lucide-react';
import RevenueChart from '../components/shared/RevenueChart';

export default function Dashboard() {
  const metrics = [
    { title: "Total Revenue", value: "₹5,42,500", change: "+14.2%", isPositive: true, icon: TrendingUp },
    { title: "Orders", value: "1,248", change: "+8.1%", isPositive: true, icon: ShoppingBag },
    { title: "Customers", value: "842", change: "+12.4%", isPositive: true, icon: Users },
    { title: "Inventory Items", value: "4,192", change: "-2.1%", isPositive: false, icon: Package },
  ];

  const recentTransactions = [
    { id: 'INV-2026-001', customer: 'Rajesh Enterprises', amount: '₹14,500', status: 'Completed', date: 'Today, 10:23 AM' },
    { id: 'INV-2026-002', customer: 'Walk-in Customer', amount: '₹2,100', status: 'Completed', date: 'Today, 09:45 AM' },
    { id: 'INV-2026-003', customer: 'Sharma Traders', amount: '₹8,450', status: 'Pending', date: 'Yesterday' },
    { id: 'INV-2026-004', customer: 'TechCorp India', amount: '₹42,000', status: 'Completed', date: 'Yesterday' },
  ];

  const lowStockItems = [
    { name: 'Premium Basmati Rice 5kg', stock: 12, threshold: 20 },
    { name: 'Sunflower Oil 1L', stock: 8, threshold: 15 },
    { name: 'Organic Honey 500g', stock: 4, threshold: 10 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">System Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">Real-time overview of your business operations.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-zinc-950 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm">
          Generate Report <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-5 hover:border-zinc-700 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <metric.icon className="w-16 h-16 transform rotate-12" />
            </div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-sm font-medium text-zinc-400">{metric.title}</span>
              <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group-hover:border-blue-500/30 transition-colors">
                <metric.icon className="w-4 h-4 text-zinc-300 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{metric.value}</h3>
            
            <div className="flex items-center gap-2 relative z-10">
              <span className={`inline-flex items-center text-[11px] font-semibold px-1.5 py-0.5 rounded-md border ${
                metric.isPositive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {metric.change}
              </span>
              <span className="text-xs text-zinc-500 font-medium">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 flex flex-col min-h-[350px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-white">Weekly Sales Overview</h2>
            <select className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-1.5 outline-none focus:border-blue-500/50 cursor-pointer">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex-1">
            <RevenueChart />
          </div>
        </div>

        {/* Inventory Summary Widget */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-white">Low Stock Alerts</h2>
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-xs font-bold">
              Action Required
            </span>
          </div>
          <div className="flex-1 space-y-4">
            {lowStockItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                <div className="p-2 bg-amber-500/10 rounded-lg shrink-0 h-fit">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-zinc-200 truncate">{item.name}</h4>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-semibold text-red-400">{item.stock} left</span>
                    <span className="text-[10px] text-zinc-500">Min: {item.threshold}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${(item.stock / item.threshold) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2">
            View All Inventory
          </button>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800/50 flex justify-between items-center">
          <h2 className="text-base font-bold text-white">Recent Transactions</h2>
          <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            View Ledger <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-950/50 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {recentTransactions.map((tx, i) => (
                <tr key={i} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-300 font-mono">{tx.id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{tx.customer}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      tx.status === 'Completed' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-white text-right">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}