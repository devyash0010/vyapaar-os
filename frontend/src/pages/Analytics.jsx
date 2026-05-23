import React from 'react';
import { Card } from '@/components/ui/Card';

export default function Analytics() {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">GST & Analytics</h1>
      <Card className="p-12 flex flex-col items-center justify-center border-dashed text-center">
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">Analytics Engine Standby</h3>
        <p className="text-zinc-500 text-sm max-w-sm">Integrate the Scikit-Learn data endpoints to render GSTR-3B estimations and predictive demand forecasting.</p>
      </Card>
    </div>
  );
}