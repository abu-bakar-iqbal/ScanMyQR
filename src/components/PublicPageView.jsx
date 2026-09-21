import React, { useState } from 'react';
import { decodePayload } from '../utils/payloadEncoder';
import { THEMES } from '../data/presetData';
import { getPlatformIconComponent } from './BrandIcons';
import {
  ArrowRight,
  Shield,
  Lock,
  Download,
  MapPin,
  FileText,
  Play,
  Send,
  CheckCircle2,
  QrCode,
  Link as LinkIcon
} from 'lucide-react';

export default function PublicPageView() {
  const hash = window.location.hash;
  const decoded = decodePayload(hash);

  const [unlocked, setUnlocked] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  if (!decoded || !decoded.data) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <QrCode className="w-12 h-12 text-blue-500 mx-auto" />
          <h2 className="text-2xl font-bold">Invalid QR Code Link</h2>
          <p className="text-sm text-slate-400">The requested QR code payload could not be loaded.</p>
          <a href="/" className="inline-block px-4 py-2 bg-blue-600 rounded-xl font-bold text-xs">
            Go to ScanMyQR Home
          </a>
        </div>
      </div>
    );
  }

  const { type, data } = decoded;
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
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 font-sans">
      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-0 sm:rounded-[36px] shadow-2xl overflow-hidden relative flex flex-col border border-slate-200">
        
        {/* Protected PIN Gate */}
        {data?.passwordProtected && !unlocked ? (
          <div className="min-h-screen sm:min-h-[500px] p-8 bg-slate-900 text-white flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center border border-amber-500/30">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Protected QR Content</h2>
            <p className="text-xs text-slate-400">Please enter PIN code to view this page.</p>

            <form onSubmit={handleUnlock} className="w-full space-y-3 pt-2">
              <input
                type="password"
                maxLength="6"
                placeholder="Enter PIN"
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value)}
                className="w-full text-center px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white font-mono text-xl focus:outline-none focus:border-amber-400"
              />
              {pinError && <span className="text-xs text-red-400 block">Incorrect PIN code</span>}
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-sm shadow-lg"
              >
                Unlock Content
              </button>
            </form>
          </div>
        ) : (
          <div>
            
            {/* TYPE 1: MULTI-LINK BIO LANDING PAGE */}
            {type === 'multilink' && (
              <div>
                {/* Header Banner */}
                <div
                  className="h-36 w-full"
                  style={{ background: activeTheme.headerBg }}
                ></div>

                {/* Overlapping White Card (Matching Reference Screenshot) */}
                <div className="relative -mt-16 mx-4 mb-8 bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center space-y-5">
                  
                  {/* Logo Avatar */}
                  <div className="relative -mt-16 mb-2 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg border border-slate-100 flex items-center justify-center overflow-hidden">
                      {data?.avatarUrl ? (
                        <img
                          src={data.avatarUrl}
                          alt="Profile Avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl">
                          FA
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h1 className="text-xl font-black text-gray-900 leading-snug">
                      {data?.profileTitle || 'Business Name'}
                    </h1>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {data?.profileDescription}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3"></div>

                  {/* Section Title */}
                  <div className="text-left font-bold text-gray-800 text-sm tracking-wide">
                    {data?.sectionTitle || 'Find me on'}
                  </div>

                  {/* Social & Custom Link Cards */}
                  <div className="space-y-3 text-left">
                    {data?.links?.filter(l => l.active).map((link) => {
                      const IconComp = getPlatformIconComponent(link.icon);
                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className="w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                              style={{ backgroundColor: link.color || '#2563eb' }}
                            >
                              <IconComp className="w-6 h-6" />
                            </div>

                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {link.title}
                              </span>
                              {link.subtext && (
                                <span className="text-xs text-gray-400">
                                  {link.subtext}
                                </span>
                              )}
                            </div>
                          </div>

                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Lead Contact Form */}
                  {data?.leadFormEnabled && (
                    <div className="mt-8 pt-5 border-t border-slate-100 text-left space-y-3 bg-slate-50 p-4 rounded-2xl">
                      <h3 className="text-sm font-bold text-gray-900">
                        {data.leadFormTitle || 'Request a Quick Callback'}
                      </h3>

                      {leadSubmitted ? (
                        <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>Thank you! We will get back to you shortly.</span>
                        </div>
                      ) : (
                        <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                          <input
                            type="text"
                            required
                            placeholder="Your Full Name"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Phone Number"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white"
                          />
                          <button
                            type="submit"
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send Callback Request</span>
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* TYPE 2: IMAGE / PHOTO GALLERY */}
            {type === 'image' && (
              <div className="p-6 text-center space-y-4">
                <h1 className="text-xl font-bold text-gray-900">{data?.title || 'Photo View'}</h1>
                {data?.imageUrl && (
                  <img src={data.imageUrl} alt="QR Photo" className="w-full h-auto rounded-2xl shadow-md border" />
                )}
                {data?.description && <p className="text-sm text-gray-600">{data.description}</p>}
              </div>
            )}

            {/* TYPE 3: VIDEO */}
            {type === 'video' && (
              <div className="p-6 text-center space-y-4">
                <h1 className="text-xl font-bold text-gray-900">{data?.title || 'Video Player'}</h1>
                <a
                  href={data?.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 bg-red-600 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Watch Video Stream</span>
                </a>
              </div>
            )}

            {/* TYPE 4: PDF */}
            {type === 'pdf' && (
              <div className="p-6 text-center space-y-4">
                <h1 className="text-xl font-bold text-gray-900">{data?.title || 'Document Download'}</h1>
                <a
                  href={data?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 bg-blue-600 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-5 h-5" />
                  <span>Open / Download PDF Document</span>
                </a>
              </div>
            )}

            {/* TYPE 5: MAP */}
            {type === 'map' && (
              <div className="p-6 text-center space-y-4">
                <h1 className="text-xl font-bold text-gray-900">{data?.locationName || 'Location Map'}</h1>
                <a
                  href={data?.mapUrl || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 bg-emerald-600 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Get Turn-by-Turn Navigation</span>
                </a>
              </div>
            )}

            {/* Footer Branding */}
            <div className="p-4 text-center border-t border-slate-100 bg-slate-50 text-[11px] text-gray-400 font-medium">
              Powered by <span className="font-bold text-blue-600">ScanMyQR Pro</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
