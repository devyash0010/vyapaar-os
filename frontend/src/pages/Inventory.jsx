import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Search, Printer, Trash2 } from 'lucide-react';

export default function POS() {
  const { products, cart, addToCart, updateCartQty, clearCart } = useBusinessStore();
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-100 mb-4">Smart Terminal</h1>
          <Input icon={Search} placeholder="Scan barcode or search SKU..." />
        </div>
        <div className="grid grid-cols-3 gap-4 overflow-y-auto pb-4">
          {products.map(p => (
            <Card key={p.id} className="p-4 hover:border-primary cursor-pointer transition-colors" onClick={() => addToCart(p)}>
              <div className="text-xs text-zinc-500 mb-2">{p.sku}</div>
              <div className="font-semibold text-sm mb-4 text-zinc-200">{p.name}</div>
              <div className="text-lg font-bold text-primary">₹{p.price}</div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="w-[400px] flex flex-col overflow-hidden shrink-0 shadow-2xl">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <span className="font-semibold text-zinc-100">Current Order ({cart.length})</span>
          <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-400">Clear</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-3 rounded-xl border border-border">
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-200">{item.name}</div>
                <div className="text-xs text-zinc-500">₹{item.price} x {item.qty}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-semibold text-zinc-100">₹{item.price * item.qty}</div>
                <button onClick={() => updateCartQty(item.id, -item.qty)} className="text-zinc-500 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border bg-zinc-900/50 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold text-zinc-100">
            <span>Total Payable</span>
            <span className="text-primary">₹{total}</span>
          </div>
          <Button className="w-full gap-2"><Printer className="w-4 h-4"/> Commit & Print Invoice</Button>
        </div>
      </Card>
    </div>
  );
}