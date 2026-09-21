import React, { useRef, useEffect, useState } from 'react';
import { renderCustomQrToCanvas } from '../utils/qrCustomRenderer';
import { generatePublicPageUrl } from '../utils/payloadEncoder';
import {
  Download,
  Copy,
  Share2,
  CheckCircle2,
  Sparkles,
  Palette,
  ExternalLink
} from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';

export default function QrPreview({ qrType, data, customStyling, onSaveQr }) {
  const canvasRef = useRef(null);
  const { isLifetimePro } = useSubscription();

  const styling = customStyling || {};
  const fgColor = styling.fgColor || '#000000';
  const bgColor = styling.bgColor || '#ffffff';
  const eyeShape = styling.eyeShape || 'square';
  const eyeInnerShape = styling.eyeInnerShape || 'square';
  const moduleShape = styling.moduleShape || 'dot';
  const frameText = styling.frameText || 'SCAN ME';
  const frameColor = styling.frameColor || '#2563eb';
  const logoUrl = styling.logoUrl || data?.avatarUrl || null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  // Generate target QR URL payload
  const publicUrl = generatePublicPageUrl(qrType, data);

  useEffect(() => {
    if (canvasRef.current && publicUrl) {
      renderCustomQrToCanvas(canvasRef.current, publicUrl, {
        fgColor,
        bgColor,
        eyeShape,
        eyeInnerShape,
        moduleShape,
        logoUrl,
        frameText,
        frameColor,
        frameTextColor: '#ffffff'
      });
    }
  }, [publicUrl, fgColor, bgColor, eyeShape, eyeInnerShape, moduleShape, frameText, frameColor, logoUrl]);

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    if (onSaveQr) {
      onSaveQr({
        title: data?.profileTitle || data?.title || 'Custom QR',
        type: qrType,
        data,
        styling: { fgColor, bgColor, frameText, frameColor, moduleShape, eyeShape }
      });
    }
  };

  const copyImageToClipboard = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2000);
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-5">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Live QR Code Canvas</h3>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Vector Active</span>
        </span>
      </div>

      {/* Canvas Renderer Box */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 flex items-center justify-center min-h-[320px] shadow-inner relative">
        <canvas ref={canvasRef} className="max-w-full h-auto drop-shadow-md rounded-2xl" />
      </div>

      {/* Export Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={downloadPng}
          className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all transform active:scale-98"
        >
          <Download className="w-4 h-4" />
          <span>Download PNG</span>
        </button>

        <button
          onClick={copyImageToClipboard}
          className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all transform active:scale-98"
        >
          {copiedImage ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copiedImage ? 'Image Copied!' : 'Copy QR Image'}</span>
        </button>

        <button
          onClick={copyPublicUrl}
          className="col-span-2 py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-indigo-200"
        >
          {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ExternalLink className="w-4 h-4" />}
          <span>{copiedLink ? 'Shareable Link Copied!' : 'Copy Shareable Mobile URL'}</span>
        </button>
      </div>

    </div>
  );
}
