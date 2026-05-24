import React from 'react';
import { Search, Star, IndianRupee, Mail, Phone, Users, UserPlus } from 'lucide-react';

const DUMMY_CUSTOMERS = [
  { id: 'CUS-001', name: 'Rajesh Enterprises', email: 'rajesh@example.com', phone: '+91 98765 43210', spent: '₹1,45,200', points: 1250, lastVisit: 'Today' },
  { id: 'CUS-002', name: 'Sharma Traders', email: 'sharma@example.com', phone: '+91 91234 56789', spent: '₹84,500', points: 840, lastVisit: '2 days ago' },
  { id: 'CUS-003', name: 'Anjali Desai', email: 'anjali.d@example.com', phone: '+91 99887 76655', spent: '₹12,400', points: 120, lastVisit: '1 week ago' },
  { id: 'CUS-004', name: 'TechCorp India', email: 'billing@techcorp.in', phone: '+91 88776 65544', spent: '₹3,20,000', points: 3200, lastVisit: 'Yesterday' },
  { id: 'CUS-005', name: 'Vikram Singh', email: 'vikram.s@example.com', phone: '+91 77665 54433', spent: '₹5,800', points: 58, lastVisit: '3 weeks ago' },
];

export default function Customers() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Customer CRM</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage profiles, track loyalty, and view spending history.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/20">
          <UserPlus className="w-4 h-4" /> New Customer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Col: Top Customers Widget */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <div className="p-3 bg-blue-500/10 rounded-full mb-3">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">842</h3>
            <p className="text-sm font-medium text-zinc-400">Total Registered Customers</p>
            <div className="mt-4 pt-4 border-t border-zinc-800/50 w-full flex justify-between text-sm">
              <span className="text-zinc-500">Active this month</span>
              <span className="font-semibold text-emerald-400">+124</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Star className="w-16 h-16" /></div>
            <h3 className="text-sm font-bold text-indigo-300 mb-4 uppercase tracking-wider">Top Patron</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold">TC</div>
              <div>
                <h4 className="font-bold text-white">TechCorp India</h4>
                <p className="text-xs text-indigo-300/70">3,200 Loyalty Points</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-white">
              <IndianRupee className="w-4 h-4 text-indigo-400" /> 3,20,000 Lifetime Value
            </div>
          </div>
        </div>

        {/* Right Col: Customer List */}
        <div className="lg:col-span-3 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-950/30">
            <h2 className="font-bold text-white">Customer Directory</h2>
            <div className="relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Search phone or name..." 
                className="w-full pl-10 pr-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm outline-none focus:border-blue-500/50 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/80 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800/50">
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Total Spent</th>
                  <th className="px-6 py-4">Loyalty Tier</th>
                  <th className="px-6 py-4">Last Visit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {DUMMY_CUSTOMERS.map((cust) => (
                  <tr key={cust.id} className="hover:bg-zinc-800/30 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-200">{cust.name}</div>
                      <div className="text-xs text-zinc-500 font-mono mt-0.5">{cust.id}</div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                        <Phone className="w-3 h-3 text-zinc-500" /> {cust.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Mail className="w-3 h-3 text-zinc-600" /> {cust.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{cust.spent}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 bg-zinc-800/50 w-fit px-2 py-1 rounded-md border border-zinc-700/50">
                        <Star className={`w-3.5 h-3.5 ${cust.points > 1000 ? 'text-amber-400 fill-amber-400' : 'text-zinc-400'}`} />
                        <span className="text-xs font-bold text-zinc-300">{cust.points} pts</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">{cust.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}