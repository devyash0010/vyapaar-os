import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowRight, 
  PlusCircle, 
  FileText,
  CreditCard
} from 'lucide-react';
import RevenueChart from '../components/shared/RevenueChart';
import { useBusinessStore } from '../store/useBusinessStore';

export default function Dashboard({ onNavigate }) {
  const transactions = useBusinessStore((state) => state.transactions);
  const products = useBusinessStore((state) => state.products);
  const customers = useBusinessStore((state) => state.customers);

  const lowStockItems = products.filter(p => p.stock <= p.threshold);

  const totalRevenue = transactions.reduce((acc, tx) => acc + (tx.grand_total || 0), 0);

  const kpis = [
    {
      title: 'Today\'s Sales',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      change: '+14.2% vs yesterday',
      isPositive: true,
      icon: TrendingUp,
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Completed Orders',
      value: (transactions.length + 124).toString(),
      change: '+8.1% this week',
      isPositive: true,
      icon: ShoppingBag,
      accent: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      title: 'Active Customers',
      value: customers.length.toString(),
      change: '+12 new this month',
      isPositive: true,
      icon: Users,
      accent: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockItems.length.toString(),
      change: 'Action required',
      isPositive: false,
      icon: AlertTriangle,
      accent: 'text-amber-600 bg-amber-50 border-amber-200'
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-5 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Business Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time telemetry and POS sales activity.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onNavigate && onNavigate('inventory')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
          >
            Manage Stock
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('pos')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Start New Bill (POS)
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.title}</span>
                <div className={`p-2 rounded-lg border ${kpi.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                  <span className={`font-semibold ${kpi.isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col min-h-[380px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Weekly Revenue & Order Trend</h2>
              <p className="text-xs text-slate-500">Gross sales across retail POS and UPI</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              Last 7 Days
            </span>
          </div>
          <div className="flex-1 w-full h-[300px]">
            <RevenueChart />
          </div>
        </div>

        {/* Low Stock Items Alert Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Low Stock Reorder List</h2>
              <p className="text-xs text-slate-500">Items below minimum safety threshold</p>
            </div>
            <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded text-[11px] font-bold">
              {lowStockItems.length} Urgent
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[290px]">
            {lowStockItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 text-xs">
                All stock levels are optimal.
              </div>
            ) : (
              lowStockItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.category} • SKU: {item.sku_barcode}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      {item.stock} left
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Min: {item.threshold}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <button 
            onClick={() => onNavigate && onNavigate('inventory')}
            className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            Open Inventory Table <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent POS Invoices</h2>
            <p className="text-xs text-slate-500">Live sales ledger with payment status</p>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('pos')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            New Billing <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Invoice #</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Payment Mode</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3 text-right">Grand Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.slice(0, 6).map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-semibold text-slate-900">{tx.invoice_number || tx.id}</td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium">{tx.customer_name || 'Walk-in Customer'}</td>
                  <td className="px-5 py-3.5 text-slate-500">{tx.created_at}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      <CreditCard className="w-3 h-3 text-slate-500" />
                      {tx.payment_mode || 'Cash'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{tx.item_count || 1} items</td>
                  <td className="px-5 py-3.5 text-right font-bold text-slate-900">
                    ₹{Number(tx.grand_total || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}