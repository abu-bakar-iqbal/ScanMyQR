import React, { useState } from 'react';
import { QrCode, Camera, BarChart3, Layers, Sparkles, ShieldCheck, Menu, X, Crown, User, LogIn } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenScanner, onOpenAnalytics, onOpenBulk, onOpenSaved }) {
  const { isLifetimePro, openPaymentModal } = useSubscription();
  const { user, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  ScanMyQR
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  PRO
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Items (Desktop) */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-colors"
            >
              <Camera className="w-4 h-4 text-blue-500" />
              <span>Scan QR</span>
            </button>

            <button
              onClick={onOpenAnalytics}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>Analytics</span>
            </button>

            <button
              onClick={onOpenBulk}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-colors"
            >
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Bulk QR</span>
            </button>

            <button
              onClick={onOpenSaved}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>My QRs</span>
            </button>
          </div>

          {/* User Profile & Subscription action */}
          <div className="flex items-center gap-2.5">
            
            {/* Account Switcher Button */}
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-blue-300 bg-gray-50 hover:bg-white text-xs font-bold text-gray-800 transition-all shadow-2xs"
            >
              {user ? (
                <>
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {isLifetimePro ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold shadow-2xs">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span className="hidden sm:inline">Lifetime VIP</span>
              </div>
            ) : (
              <button
                onClick={openPaymentModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-full shadow-md shadow-emerald-500/20 transition-all transform hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>$1 Lifetime</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 flex flex-col gap-1.5">
            <button
              onClick={() => { onOpenScanner(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <Camera className="w-4 h-4 text-blue-500" />
              <span>Scan QR Code</span>
            </button>
            <button
              onClick={() => { onOpenAnalytics(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>Scan Analytics</span>
            </button>
            <button
              onClick={() => { onOpenBulk(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Bulk QR Generator</span>
            </button>
            <button
              onClick={() => { onOpenSaved(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>My Saved QRs</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
