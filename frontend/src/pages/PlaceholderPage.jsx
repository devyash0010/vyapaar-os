// src/pages/PlaceholderPage.jsx
import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center">
        <span className="text-zinc-500 font-medium">{title.charAt(0)}</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">{title}</h1>
        <p className="text-sm text-zinc-500 max-w-sm mt-2">This module is part of the future scalable architecture and will be connected to the FastAPI backend.</p>
      </div>
    </div>
  );
}