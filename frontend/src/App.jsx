import React, { useState, useEffect } from 'react';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileBottomNav from './components/layout/MobileBottomNav';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('vyapaar_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('vyapaar_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen w-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar with Desktop mode + Mobile Slide-over Drawer */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          currentView={currentView} 
          onQuickNewBill={() => setCurrentView('pos')} 
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        {/* Main Content: with bottom padding on mobile for MobileBottomNav */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 lg:p-8 bg-slate-50 pb-20 md:pb-8">
          {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
          {currentView === 'pos' && <POS />}
          {currentView === 'inventory' && <Inventory />}
          {currentView === 'customers' && <Customers />}
          {currentView === 'analytics' && <Analytics />}
          {currentView === 'settings' && <Settings />}
        </main>

        {/* Bottom Navigation for Mobile Phones */}
        <MobileBottomNav 
          currentView={currentView} 
          onNavigate={setCurrentView} 
        />
      </div>
    </div>
  );
}