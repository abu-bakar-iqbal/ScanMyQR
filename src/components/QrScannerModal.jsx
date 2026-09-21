import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, CheckCircle2, Copy, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { scanQrFromImageCanvas, scanQrFromFile } from '../utils/qrScanner';

export default function QrScannerModal({ isOpen, onClose, onUseScannedData }) {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' or 'upload'
  const [scannedResult, setScannedResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const startCamera = async () => {
    setErrorMsg(null);
    setScannedResult(null);
    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        await videoRef.current.play();
        requestAnimationFrame(tickScan);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Camera access failed. Please check permissions or switch to file upload.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const tickScan = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const decoded = scanQrFromImageCanvas(canvas);
      if (decoded) {
        setScannedResult(decoded);
        stopCamera();
        return;
      }
    }
    animFrameId.current = requestAnimationFrame(tickScan);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setScannedResult(null);

    try {
      const result = await scanQrFromFile(file);
      setScannedResult(result);
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : 'Unable to decode QR code from uploaded image.');
    }
  };

  const copyToClipboard = () => {
    if (scannedResult) {
      navigator.clipboard.writeText(scannedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUrl = scannedResult && (scannedResult.startsWith('http://') || scannedResult.startsWith('https://'));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">QR Scanner</h3>
              <p className="text-xs text-gray-500">Scan any QR code via camera or image upload</p>
            </div>
          </div>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-5">
            <button
              onClick={() => { setActiveTab('camera'); setErrorMsg(null); setScannedResult(null); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'camera' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Live Camera</span>
            </button>
            <button
              onClick={() => { setActiveTab('upload'); stopCamera(); setErrorMsg(null); setScannedResult(null); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'upload' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image File</span>
            </button>
          </div>

          {/* Scanned Result View */}
          {scannedResult ? (
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-4 animate-scaleUp">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span>QR Code Decoded Successfully!</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-blue-100 text-sm font-mono text-gray-800 break-all max-h-36 overflow-y-auto">
                {scannedResult}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {isUrl && (
                  <a
                    href={scannedResult}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[130px] py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Link</span>
                  </a>
                )}
                <button
                  onClick={copyToClipboard}
                  className="flex-1 min-w-[120px] py-2.5 px-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
                <button
                  onClick={() => {
                    if (onUseScannedData) onUseScannedData(scannedResult);
                    onClose();
                  }}
                  className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-indigo-200"
                >
                  <span>✨ Create New QR Code from Scanned Data</span>
                </button>
              </div>

              <button
                onClick={() => { setScannedResult(null); if (activeTab === 'camera') startCamera(); }}
                className="w-full text-center text-xs font-semibold text-blue-600 hover:underline pt-1 flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Scan Another QR Code</span>
              </button>
            </div>
          ) : (
            <div>
              {/* Tab 1: Live Camera Viewfinder */}
              {activeTab === 'camera' && (
                <div className="relative bg-black rounded-2xl overflow-hidden aspect-square max-h-80 flex items-center justify-center shadow-inner">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                  ></video>
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Scanning Viewfinder Frame */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 border-2 border-emerald-400 rounded-2xl relative flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                        {/* Animated Laser Scanning Line */}
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute top-0 animate-laser"></div>
                        <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full absolute bottom-3">
                          Align QR code within frame
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Upload File */}
              {activeTab === 'upload' && (
                <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-gray-50 hover:bg-blue-50/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="qr-file-input"
                  />
                  <label htmlFor="qr-file-input" className="cursor-pointer block space-y-3">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 block">Click to upload QR Image</span>
                      <span className="text-xs text-gray-500">Supports PNG, JPG, JPEG, WebP</span>
                    </div>
                  </label>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
