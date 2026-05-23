import React, { useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';

export default function CopilotPanel({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your AI Business Copilot. How can I help you optimize Vyapaar today?' }
  ]);

  if (!isOpen) return null;

  const handleSend = () => {
    if(!query) return;
    setMessages([...messages, { role: 'user', text: query }]);
    setQuery('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'I am analyzing your MongoDB transactional data for the requested metrics...' }]);
    }, 600);
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col z-50 transition-transform">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2 className="font-bold">Vyapaar AI Copilot</h2>
        </div>
        <button onClick={onClose}><X className="w-5 h-5 text-zinc-400 hover:text-white" /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-200 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-xl outline-none text-sm focus:border-emerald-500" 
          placeholder="Ask about sales, stock..." 
        />
        <button onClick={handleSend} className="bg-emerald-600 text-white p-2 rounded-xl"><Send className="w-5 h-5" /></button>
      </div>
    </div>
  );
}