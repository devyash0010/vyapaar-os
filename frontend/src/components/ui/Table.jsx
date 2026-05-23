import React from 'react';

export function Table({ headers, children }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="text-xs uppercase text-zinc-500 bg-zinc-900/50 border-b border-border">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-6 py-4 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {children}
        </tbody>
      </table>
    </div>
  );
}