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
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#71717a', fontSize: 12}} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#71717a', fontSize: 12}} 
            tickFormatter={(val) => `₹${val/1000}k`} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#f4f4f5' }}
            itemStyle={{ color: '#f4f4f5', fontWeight: 600 }}
            labelStyle={{ color: '#a1a1aa', fontSize: '12px', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#09090b', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}