import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen bg-slate-50 selection:bg-blue-500/30">
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={() => setIsAuthenticated(false)} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'pos' && <POS />}
          {currentView === 'inventory' && <Inventory />}
          {currentView === 'customers' && <Customers />}
          {currentView === 'analytics' && <Analytics />}
          {currentView === 'settings' && (
            <div className="flex items-center justify-center h-full text-zinc-500">
              Settings Module (Coming Soon)
            </div>
          )}
        </main>
      </div>
    </div>
  );
}