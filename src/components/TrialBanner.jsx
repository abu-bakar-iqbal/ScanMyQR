import React from 'react';
import { Clock, Zap, Crown } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';

export default function TrialBanner() {
  const { isLifetimePro, timeRemaining, openPaymentModal } = useSubscription();

  if (isLifetimePro) return null;

  const { days, hours, minutes, seconds, isExpired } = timeRemaining;

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white text-xs sm:text-sm py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
          </span>
          <span className="font-semibold tracking-wide">
            {isExpired ? '⚠️ 7-Day Free Trial Expired' : '🎁 7-Day Free Trial Active:'}
          </span>
          {!isExpired && (
            <div className="flex items-center gap-1 font-mono font-bold bg-black/20 px-2 py-0.5 rounded-md text-xs">
              <Clock className="w-3.5 h-3.5 text-emerald-200" />
              <span>
                {days}d {hours.toString().padStart(2, '0')}h {minutes.toString().padStart(2, '0')}m {seconds.toString().padStart(2, '0')}s
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-emerald-100 text-xs">
            {isExpired ? 'Unlock unlimited QR generation forever' : 'Unlimited QR generation & download during trial'}
          </span>
          <button
            onClick={openPaymentModal}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold px-3 py-1 rounded-full text-xs transition-transform transform hover:scale-105 shadow-md"
          >
            <Crown className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
            <span>Get $1 Lifetime Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}
