// src/components/layout/AppShell.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell() {
  return (
    <div className="flex h-screen w-screen bg-[#09090b] relative overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col relative h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}