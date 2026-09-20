import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 42000, orders: 120 },
  { name: 'Tue', revenue: 58000, orders: 155 },
  { name: 'Wed', revenue: 51000, orders: 140 },
  { name: 'Thu', revenue: 74000, orders: 190 },
  { name: 'Fri', revenue: 89000, orders: 230 },
  { name: 'Sat', revenue: 95000, orders: 250 },
  { name: 'Sun', revenue: 112000, orders: 290 },
];

export default function RevenueChart() {
  return (
    <div className="h-full w-full min-h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            dy={8} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            tickFormatter={(val) => `₹${val/1000}k`} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderColor: '#cbd5e1', 
              borderRadius: '8px', 
              color: '#0f172a',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            itemStyle={{ color: '#2563eb', fontWeight: 600 }}
            labelStyle={{ color: '#64748b', fontSize: '11px', marginBottom: '2px', fontWeight: 500 }}
            formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#2563eb" 
            strokeWidth={2.5} 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            activeDot={{ r: 5, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}