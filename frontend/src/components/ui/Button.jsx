import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-border",
    ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className} px-4 py-2.5`} {...props}>
      {children}
    </button>
  );
}