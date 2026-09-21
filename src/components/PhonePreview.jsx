import React, { useState } from 'react';
import { THEMES } from '../data/presetData';
import { getPlatformIconComponent } from './BrandIcons';
import {
  ArrowRight,
  Shield,
  Lock,
  Send,
  CheckCircle2,
  Link as LinkIcon
} from 'lucide-react';

export default function PhonePreview({ type = 'multilink', data }) {
  const [unlocked, setUnlocked] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const activeTheme = THEMES.find(t => t.id === data?.themeId) || THEMES[0];

  const handleUnlock = (e) => {
    e.preventDefault();
    if (inputPin === data.pinCode) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setTimeout(() => {
      setLeadSubmitted(false);
      setLeadName('');
      setLeadPhone('');
    }, 3000);
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] aspect-[9/18.5] bg-slate-900 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 shadow-blue-950/40 select-none">
      
      {/* Phone Hardware Notch & Camera */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center gap-2">
        <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800"></div>
        <div className="w-10 h-1.5 rounded-full bg-slate-800"></div>
      </div>

      {/* Screen Container */}
      <div className="relative w-full h-full bg-slate-100 rounded-[38px] overflow-hidden flex flex-col font-sans border border-slate-700/50">
        
        {/* Status Bar */}
        <div className="h-7 pt-1 px-6 flex items-center justify-between text-[11px] font-bold text-slate-700 z-20 shrink-0">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span>5G</span>
            <div className="w-4 h-2 bg-slate-700 rounded-xs"></div>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none relative pb-8">
          
          {/* Handle Password Protected Screen */}
          {data?.passwordProtected && !unlocked ? (
            <div className="min-h-full p-6 bg-slate-900 text-white flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center border border-amber-500/30">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Protected Page</h3>
                <p className="text-xs text-slate-400 mt-1">Please enter PIN code to access this bio page.</p>
              </div>

              <form onSubmit={handleUnlock} className="w-full space-y-3">
                <input
                  type="password"
                  maxLength="6"
                  placeholder="Enter PIN"
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  className="w-full text-center px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-amber-400"
                />
                {pinError && <span className="text-xs text-red-400 block">Incorrect PIN code</span>}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Unlock Content
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Top Colored Header Banner Area (Matching Reference Screenshot) */}
              <div
                className="h-32 w-full transition-all duration-300 relative"
                style={{ background: activeTheme.headerBg }}
              ></div>

              {/* Main White Card Overlapping Header (Exact Replica of User Screenshot) */}
              <div className="relative -mt-16 mx-3 bg-white rounded-3xl p-5 shadow-lg border border-slate-100/80 text-center space-y-4">
                
                {/* Curved Cutout with Logo Avatar */}
                <div className="relative -mt-14 mb-2 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md border border-slate-100 flex items-center justify-center overflow-hidden">
                    {data?.avatarUrl ? (
                      <img
                        src={data.avatarUrl}
                        alt="Logo Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                        FA
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Title & Description */}
                <div className="space-y-2">
                  <h2 className="text-lg font-black text-gray-900 leading-snug">
                    {data?.profileTitle || 'Your Business Name'}
                  </h2>
                  <p className="text-xs text-gray-600 font-normal leading-relaxed px-1">
                    {data?.profileDescription || 'Add your bio or business description here.'}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3"></div>

                {/* Section Title */}
                <div className="text-left font-bold text-gray-800 text-xs tracking-wide">
                  {data?.sectionTitle || 'Find me on'}
                </div>

                {/* Interactive Link Cards List (Matching Image style) */}
                <div className="space-y-2.5 text-left">
                  {data?.links?.filter(l => l.active).map((link) => {
                    const IconComp = getPlatformIconComponent(link.icon);
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 shadow-xs hover:shadow-md transition-all active:scale-98"
                      >
                        <div className="flex items-center gap-3">
                          {/* Icon in colored circle */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                            style={{ backgroundColor: link.color || '#2563eb' }}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {link.title}
                            </span>
                            {link.subtext && (
                              <span className="text-[11px] font-normal text-gray-400">
                                {link.subtext}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right Directional Arrow */}
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </a>
                    );
                  })}
                </div>

                {/* Lead Contact Form Widget */}
                {data?.leadFormEnabled && (
                  <div className="mt-6 pt-4 border-t border-slate-100 text-left space-y-3 bg-slate-50 p-3.5 rounded-2xl">
                    <span className="text-xs font-bold text-gray-800 block">
                      {data.leadFormTitle || 'Request a Quick Callback'}
                    </span>

                    {leadSubmitted ? (
                      <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Message Sent! We will contact you.</span>
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-white"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-white"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Request</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}

              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
