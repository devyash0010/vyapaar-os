import React, { useState } from 'react';
import { Mail, Lock, KeyRound, Sparkles, Command, ArrowLeft, Send } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [view, setView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Password reset link sent to ${email}`);
      setView('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden font-sans selection:bg-blue-500/30 antialiased">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md p-6 sm:p-10 relative z-10 space-y-12 animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/20 ring-1 ring-slate-200">
            <span className="text-white text-xl font-black tracking-tighter">V</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Vyapaar OS</h1>
          <p className="text-sm font-medium text-slate-500 max-w-[280px] leading-relaxed">
            AI-Powered Business Operating System for Indian SMBs
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
          <div className="p-10">
            {view === 'login' && (
              <div className="space-y-8 animate-in slide-in-from-left-4 fade-in duration-300">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Sign In</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 ml-1">Email or Username</label>
                    <div className="relative group/input">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
                        placeholder="Enter your email"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                        <kbd className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-medium text-slate-400">
                          <Command className="w-3 h-3" /> E
                        </kbd>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-xs font-semibold text-slate-700">Password</label>
                      <button 
                        type="button" 
                        onClick={() => setView('forgot_password')}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative group/input">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-blue-600 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-wider transition-colors"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-10 flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Authenticating..." : "Sign In securely"}
                    {!isLoading && <KeyRound className="w-4 h-4 text-blue-100 group-hover:text-white transition-colors" />}
                  </button>
                </form>
              </div>
            )}

            {view === 'forgot_password' && (
              <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
                <div>
                  <button 
                    onClick={() => setView('login')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-6"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                  </button>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Reset Password</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                  </p>
                </div>
                
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 ml-1">Email Address</label>
                    <div className="relative group/input">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-blue-600 transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full mt-10 flex items-center justify-center gap-2.5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold transition-all shadow-md active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                    {!isLoading && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-center text-xs text-slate-500 mt-8 font-medium">
          &copy; 2026 Vyapaar OS. All systems operational.
        </p>
      </div>
    </div>
  );
}