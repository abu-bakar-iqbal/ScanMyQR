import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { authModalOpen, closeAuthModal, login, user, logout } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email, name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {user ? 'My Profile Account' : isRegister ? 'Create Pro Account' : 'Account Sign In'}
              </h3>
              <p className="text-xs text-gray-500">Access and manage your isolated QR codes</p>
            </div>
          </div>
          <button onClick={closeAuthModal} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {user ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-blue-500 p-0.5 shadow-md">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              </div>

              <div>
                <h4 className="text-lg font-black text-gray-900">{user.name}</h4>
                <span className="text-xs text-gray-500 block font-mono">{user.email}</span>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-100">
                  {user.role} • {user.company}
                </span>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Private Workspace Active: Showing your saved QRs only</span>
              </div>

              <button
                onClick={() => { logout(); closeAuthModal(); }}
                className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl border border-red-200"
              >
                Sign Out of Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <LogIn className="w-4 h-4" />
                <span>{isRegister ? 'Register & Continue' : 'Sign In to Workspace'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  {isRegister ? 'Already have an account? Sign In' : 'Need an account? Register free'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
