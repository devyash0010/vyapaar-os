import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Plus, MoreVertical, PackageCheck, AlertCircle } from 'lucide-react';

const DUMMY_INVENTORY = [
  { id: 'SKU-001', name: 'Premium Basmati Rice 5kg', category: 'Grocery', stock: 12, threshold: 20, price: '₹850', status: 'Low Stock' },
  { id: 'SKU-002', name: 'Sunflower Oil 1L', category: 'Grocery', stock: 120, threshold: 15, price: '₹165', status: 'In Stock' },
  { id: 'SKU-003', name: 'Organic Honey 500g', category: 'Food', stock: 4, threshold: 10, price: '₹299', status: 'Critical' },
  { id: 'SKU-004', name: 'Whole Wheat Atta 10kg', category: 'Grocery', stock: 30, threshold: 15, price: '₹420', status: 'In Stock' },
  { id: 'SKU-005', name: 'Green Tea 100 bags', category: 'Beverages', stock: 60, threshold: 20, price: '₹250', status: 'In Stock' },
  { id: 'SKU-006', name: 'Premium Almonds 500g', category: 'Dry Fruits', stock: 25, threshold: 10, price: '₹450', status: 'In Stock' },
];

export default function Inventory() {
  const [search, setSearch] = useState('');

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Low Stock': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Inventory Management</h1>
          <p className="text-sm text-zinc-400 mt-1">Track stock levels, categories, and low stock alerts.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/20">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl"><PackageCheck className="w-6 h-6 text-blue-500" /></div>
          <div>
            <p className="text-sm font-medium text-zinc-400">Total Products</p>
            <h3 className="text-2xl font-bold text-white">1,248</h3>
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl"><AlertTriangle className="w-6 h-6 text-amber-500" /></div>
          <div>
            <p className="text-sm font-medium text-zinc-400">Low Stock Alerts</p>
            <h3 className="text-2xl font-bold text-white">12</h3>
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-xl"><AlertCircle className="w-6 h-6 text-red-500" /></div>
          <div>
            <p className="text-sm font-medium text-zinc-400">Out of Stock</p>
            <h3 className="text-2xl font-bold text-white">3</h3>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-5 border-b border-zinc-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-950/30">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by SKU, Name, or Category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder:text-zinc-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/80 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800/50">
                <th className="px-6 py-4">SKU Code</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {DUMMY_INVENTORY.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-mono text-zinc-400">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-zinc-200">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.stock}</span>
                      <span className="text-xs text-zinc-500">/ {item.threshold} min</span>
                    </div>
                    <div className="w-24 bg-zinc-800 rounded-full h-1 mt-1.5">
                      <div 
                        className={`h-1 rounded-full ${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min((item.stock / item.threshold) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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