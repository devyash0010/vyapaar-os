import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface border border-border rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}