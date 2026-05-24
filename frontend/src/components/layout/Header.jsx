import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 flex items-center justify-between shrink-0 sticky top-0 z-10">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search transactions, customers (Cmd+K)..." 
            className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder:text-zinc-500 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-medium hover:bg-indigo-500/20 transition-all">
          <Sparkles className="w-3.5 h-3.5" /> AI Copilot
        </button>
        
        <div className="w-px h-5 bg-zinc-800 mx-1"></div>

        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
          <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}