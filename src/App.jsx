import React, { useState, useEffect } from 'react';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { QrStorageProvider, useQrStorage } from './context/QrStorageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import TrialBanner from './components/TrialBanner';
import PaymentModal from './components/PaymentModal';
import QrScannerModal from './components/QrScannerModal';
import AnalyticsModal from './components/AnalyticsModal';
import BulkQrModal from './components/BulkQrModal';
import AuthModal from './components/AuthModal';

import StepperNav from './components/StepperNav';
import MultiLinkEditor from './components/editors/MultiLinkEditor';
import {
  ImageQrEditor,
  VideoQrEditor,
  PdfQrEditor,
  MapQrEditor,
  StandardUrlEditor
} from './components/editors/MediaQrEditors';

import QrCustomizer from './components/QrCustomizer';
import PhonePreview from './components/PhonePreview';
import QrPreview from './components/QrPreview';
import PublicPageView from './components/PublicPageView';

import { INITIAL_MULTI_LINK_DATA } from './data/presetData';
import { generatePublicPageUrl } from './utils/payloadEncoder';
import {
  Globe,
  Image as ImageIcon,
  Video,
  FileText,
  MapPin,
  Link,
  Smartphone,
  QrCode,
  Sparkles,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  User
} from 'lucide-react';

function MainApp() {
  const { saveQrCode, savedQrs, deleteQrCode } = useQrStorage();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1); // 1: Type, 2: Content, 3: Design, 4: Download
  const [activeQrType, setActiveQrType] = useState('multilink');

  const [multiLinkData, setMultiLinkData] = useState(INITIAL_MULTI_LINK_DATA);

  const [imageData, setImageData] = useState({
    title: 'Product Showcase Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    description: 'High performance sports shoes collection.',
    fileName: '',
    fileSize: ''
  });

  const [videoData, setVideoData] = useState({
    title: 'Enterprise Platform Demo',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  });

  const [pdfData, setPdfData] = useState({
    title: 'Apex Corporate Services Catalog 2026.pdf',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: '',
    fileSize: ''
  });

  const [mapData, setMapData] = useState({
    locationName: 'Apex Global Headquarters',
    mapUrl: 'https://maps.google.com/?q=New+York+NY'
  });

  const [urlData, setUrlData] = useState({
    url: 'https://online-qr-generator.com'
  });

  // Custom QR Styling State
  const [qrStyling, setQrStyling] = useState({
    fgColor: '#000000',
    bgColor: '#ffffff',
    moduleShape: 'dot',
    eyeShape: 'circle',
    eyeInnerShape: 'circle',
    frameText: 'SCAN ME',
    frameColor: '#2563eb',
    logoUrl: ''
  });

  // Modal open states
  const [scannerOpen, setScannerOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);

  const [copiedLink, setCopiedLink] = useState(false);

  // Handle Hash routing for public page view
  const [isPublicRoute, setIsPublicRoute] = useState(window.location.hash.includes('#id=') || window.location.hash.includes('#view='));

  useEffect(() => {
    const handleHashChange = () => {
      setIsPublicRoute(window.location.hash.includes('#id=') || window.location.hash.includes('#view='));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isPublicRoute) {
    return <PublicPageView />;
  }

  const getCurrentData = () => {
    switch (activeQrType) {
      case 'multilink':
        return multiLinkData;
      case 'image':
        return imageData;
      case 'video':
        return videoData;
      case 'pdf':
        return pdfData;
      case 'map':
        return mapData;
      case 'url':
        return urlData;
      default:
        return multiLinkData;
    }
  };

  const publicUrl = generatePublicPageUrl(activeQrType, getCurrentData());

  const copyShareableUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleUseScannedData = (scannedText) => {
    setActiveQrType('url');
    setUrlData({ url: scannedText });
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* 7-Day Trial Top Announcement Banner */}
      <TrialBanner />

      {/* Main Header Navbar */}
      <Navbar
        onOpenScanner={() => setScannerOpen(true)}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
        onOpenBulk={() => setBulkOpen(true)}
        onOpenSaved={() => setSavedModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Page Hero Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-extrabold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Multi-Link Bio & Universal QR Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Create Custom <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Easy-to-Scan QR Codes</span>
          </h1>
        </div>

        {/* Step-by-Step Wizard Stepper Navigation */}
        <StepperNav
          currentStep={currentStep}
          onSelectStep={(stepId) => setCurrentStep(stepId)}
        />

        {/* 2-Column Wizard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Step Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-6">
            
            {/* STEP 1: CHOOSE QR TYPE */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-lg font-black text-gray-900">Step 1: Select QR Code Type</h2>
                  <p className="text-xs text-gray-500">Choose what type of content you want to encode into your QR code.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => { setActiveQrType('multilink'); setCurrentStep(2); }}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      activeQrType === 'multilink'
                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">Multi-Link Bio Page</span>
                      <span className="text-xs text-gray-500">Instagram, Facebook, TikTok, LinkedIn, WhatsApp & Web</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveQrType('image'); setCurrentStep(2); }}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      activeQrType === 'image'
                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">Image / Photo (10MB)</span>
                      <span className="text-xs text-gray-500">Upload photos or gallery showcase</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveQrType('video'); setCurrentStep(2); }}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      activeQrType === 'video'
                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">Video QR (Cloud Link)</span>
                      <span className="text-xs text-gray-500">Google Drive, Dropbox, YouTube, Vimeo video links</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveQrType('pdf'); setCurrentStep(2); }}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      activeQrType === 'pdf'
                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">PDF Document (10MB)</span>
                      <span className="text-xs text-gray-500">Upload PDF menus, catalogs or files</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveQrType('map'); setCurrentStep(2); }}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      activeQrType === 'map'
                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">Google Maps Location</span>
                      <span className="text-xs text-gray-500">Turn-by-turn navigation QR</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveQrType('url'); setCurrentStep(2); }}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      activeQrType === 'url'
                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Link className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">Single Website URL</span>
                      <span className="text-xs text-gray-500">Direct link QR code</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ADD CONTENT & FILES */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-gray-900">Step 2: Add Content & Links</h2>
                    <p className="text-xs text-gray-500">Fill in details and upload files or cloud links.</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full uppercase">
                    {activeQrType}
                  </span>
                </div>

                {activeQrType === 'multilink' && (
                  <MultiLinkEditor data={multiLinkData} onChange={setMultiLinkData} />
                )}
                {activeQrType === 'image' && (
                  <ImageQrEditor data={imageData} onChange={setImageData} />
                )}
                {activeQrType === 'video' && (
                  <VideoQrEditor data={videoData} onChange={setVideoData} />
                )}
                {activeQrType === 'pdf' && (
                  <PdfQrEditor data={pdfData} onChange={setPdfData} />
                )}
                {activeQrType === 'map' && (
                  <MapQrEditor data={mapData} onChange={setMapData} />
                )}
                {activeQrType === 'url' && (
                  <StandardUrlEditor data={urlData} onChange={setUrlData} />
                )}
              </div>
            )}

            {/* STEP 3: DESIGN & STYLE QR */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-lg font-black text-gray-900">Step 3: Real-time QR Code Customizer</h2>
                  <p className="text-xs text-gray-500">Customize dot shapes (Heart, Diamond, Dot, Square, Bar), colors, and logo. Watch real-time changes on right!</p>
                </div>

                <QrCustomizer styling={qrStyling} onChangeStyling={setQrStyling} />
              </div>
            )}

            {/* STEP 4: PREVIEW & DOWNLOAD */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-lg font-black text-gray-900">Step 4: Download & Share Dashboard</h2>
                  <p className="text-xs text-gray-500">Your high-resolution QR code is ready to download and publish.</p>
                </div>

                <div className="p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl space-y-4 shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Verified Scannable & Published</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {getCurrentData()?.profileTitle || getCurrentData()?.title || 'Custom QR Code'}
                    </h3>
                    <p className="text-xs text-blue-100 mt-1">
                      Type: <span className="font-semibold uppercase">{activeQrType}</span> • Encoded with low-density easy-to-scan modules.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={copyShareableUrl}
                      className="py-2.5 px-4 bg-white hover:bg-gray-100 text-blue-900 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ExternalLink className="w-4 h-4 text-blue-600" />}
                      <span>{copiedLink ? 'Share Link Copied!' : 'Copy Shareable Page Link'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">QR Code Details</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                    <div>Dot Style: <span className="font-bold text-gray-900 uppercase">{qrStyling.moduleShape}</span></div>
                    <div>Eye Shape: <span className="font-bold text-gray-900 uppercase">{qrStyling.eyeShape}</span></div>
                    <div>Frame CTA: <span className="font-bold text-gray-900 uppercase">{qrStyling.frameText}</span></div>
                    <div>Account: <span className="font-bold text-gray-900">{user?.name || 'Guest User'}</span></div>
                  </div>
                </div>

              </div>
            )}

            {/* Navigation Stepper Controls at Bottom of Left Column */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-30 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                disabled={currentStep === 4}
                className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic Live Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            
            {/* Contextual Right Preview based on current Step */}
            {currentStep === 3 ? (
              // Step 3: Show Real-Time Live QR Code Preview Card with styling state!
              <div className="animate-fadeIn space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider px-1">
                  <span>Live Real-time QR Preview</span>
                  <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Updating Live</span>
                  </span>
                </div>
                <QrPreview
                  qrType={activeQrType}
                  data={getCurrentData()}
                  customStyling={qrStyling}
                  onSaveQr={saveQrCode}
                />
              </div>
            ) : currentStep === 4 ? (
              // Step 4: Show Live Vector Canvas QR Preview with Download Controls
              <div className="animate-fadeIn space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider px-1">
                  <span>Final High-Res Vector QR Code</span>
                </div>
                <QrPreview
                  qrType={activeQrType}
                  data={getCurrentData()}
                  customStyling={qrStyling}
                  onSaveQr={saveQrCode}
                />
              </div>
            ) : (
              // Step 1 & 2: Show Mobile Phone Landing Page Preview
              <div className="animate-fadeIn space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider px-1">
                  <span>Live Mobile Page Preview</span>
                </div>
                <PhonePreview type={activeQrType} data={getCurrentData()} />
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-xs text-gray-500 mt-16">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-gray-700">ScanMyQR Pro — Real-time Multi-Link & Universal QR Code Platform</p>
          <p>© 2026 ScanMyQR. All rights reserved. 7-Day Free Trial & $1 Lifetime Access.</p>
        </div>
      </footer>

      {/* Global Modals */}
      <PaymentModal />
      <AuthModal />
      <QrScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onUseScannedData={handleUseScannedData}
      />
      <AnalyticsModal
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />
      <BulkQrModal
        isOpen={bulkOpen}
        onClose={() => setBulkOpen(false)}
      />

      {/* User Isolated Saved QRs Modal */}
      {savedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 max-h-[85vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  {user ? `${user.name}'s Saved QRs (${savedQrs.length})` : `My Saved QRs (${savedQrs.length})`}
                </h3>
              </div>
              <button onClick={() => setSavedModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1">
              {savedQrs.length === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <p className="text-sm text-gray-500">No saved QR codes in your account yet.</p>
                  <p className="text-xs text-blue-600 font-semibold">Download a QR in Step 4 to save it to your workspace!</p>
                </div>
              ) : (
                savedQrs.map((qr) => (
                  <div key={qr.id} className="p-3.5 bg-gray-50 rounded-2xl border flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">{qr.title}</span>
                      <span className="text-xs text-gray-500 font-mono">Type: {qr.type} • Created {new Date(qr.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => deleteQrCode(qr.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <QrStorageProvider>
          <MainApp />
        </QrStorageProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}
