import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Package, 
  ArrowUpRight, 
  FileCheck2, 
  BarChart2,
  Percent
} from 'lucide-react';
import RevenueChart from '../components/shared/RevenueChart';
import { useBusinessStore } from '../store/useBusinessStore';

export default function Analytics() {
  const transactions = useBusinessStore((state) => state.transactions);
  const products = useBusinessStore((state) => state.products);

  const topProducts = products.slice(0, 4);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Business Reports & Analytics</h1>
        <p className="text-xs text-slate-500 mt-0.5">Sales performance, category revenue, and GST tax filing summary.</p>
      </div>

      {/* Advisory Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md w-fit">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Demand Restock Advisory</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Sunflower Oil & Rice weekend demand surge</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Based on the last 4 weeks of sales patterns, grocery staples experience a 28% demand spike on weekends. We recommend ordering an additional 30 units before Friday.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>GST Input Tax Credit (ITC) Summary</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">₹14,280 Input Tax Credit Eligible</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Purchase GST verified across all inventory inward invoices. Ready to reconcile for monthly GSTR-3B filing to reduce net tax liability.
          </p>
        </div>
      </div>

      {/* Sales Telemetry Chart & Channels Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col min-h-[380px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Revenue Breakdown (Daily)</h2>
              <p className="text-xs text-slate-500">Gross invoicing volume</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              Weekly Run Rate
            </span>
          </div>
          <div className="flex-1 w-full h-[300px]">
            <RevenueChart />
          </div>
        </div>

        {/* Payment Channels Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">Sales by Payment Mode</h2>
            <p className="text-xs text-slate-500 mb-5">Transaction distribution</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>UPI & QR Payments</span>
                  <span className="text-blue-600">58%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Cash on Counter</span>
                  <span className="text-emerald-600">32%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Debit / Credit Cards</span>
                  <span className="text-indigo-600">10%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Avg. Ticket Size:</span>
              <span className="font-bold text-slate-900">₹842.00</span>
            </div>
            <div className="flex justify-between">
              <span>Peak Sales Hour:</span>
              <span className="font-bold text-slate-900">6:00 PM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Moving Products Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Velocity Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Rank</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Unit Price</th>
                <th className="px-5 py-3">Current Stock</th>
                <th className="px-5 py-3 text-right">Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topProducts.map((p, i) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-500">#{i + 1}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900">{p.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700">₹{p.price}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{p.stock} units</td>
                  <td className="px-5 py-3.5 text-right font-bold text-emerald-600">High Turnover</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}