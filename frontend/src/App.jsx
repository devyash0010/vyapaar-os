import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // If not logged in, show ONLY the Login page
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen bg-slate-50 selection:bg-blue-500/30">
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  // If logged in, show the simple safe Dashboard layout
  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar onLogout={() => setIsAuthenticated(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}