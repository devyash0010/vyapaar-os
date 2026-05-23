import React from 'react';

export function Input({ icon: Icon, className = '', ...props }) {
  return (
    <div className="relative flex items-center w-full">
      {Icon && <Icon className="absolute left-3 w-4 h-4 text-zinc-500" />}
      <input 
        className={`w-full bg-zinc-900 border border-border rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 ${className}`}
        {...props}
      />
    </div>
  );
}