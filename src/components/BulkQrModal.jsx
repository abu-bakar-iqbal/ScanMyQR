import React, { useState } from 'react';
import { X, Layers, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import QRCode from 'qrcode';

export default function BulkQrModal({ isOpen, onClose }) {
  const [inputText, setInputText] = useState('');
  const [generatedItems, setGeneratedItems] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateBulk = async () => {
    const lines = inputText.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    setIsGenerating(true);
    const results = [];

    for (let i = 0; i < lines.length; i++) {
      const text = lines[i];
      try {
        const dataUrl = await QRCode.toDataURL(text, { width: 300, margin: 2 });
        results.push({
          id: i,
          text,
          dataUrl
        });
      } catch (err) {
        console.error(err);
      }
    }

    setGeneratedItems(results);
    setIsGenerating(false);
  };

  const downloadAll = () => {
    generatedItems.forEach((item, index) => {
      const a = document.createElement('a');
      a.href = item.dataUrl;
      a.download = `qr-code-${index + 1}.png`;
      a.click();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Bulk QR Code Generator</h3>
              <p className="text-xs text-gray-500">Paste multiple URLs or text (1 per line) to generate batch QR codes</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Enter URLs / Data (One line per QR code)
            </label>
            <textarea
              rows="5"
              placeholder={`https://instagram.com/myaccount\nhttps://facebook.com/mypage\nhttps://wa.me/971589800861\nhttps://mywebsite.com`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleGenerateBulk}
              disabled={isGenerating || !inputText.trim()}
              className="py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all flex items-center gap-2"
            >
              {isGenerating ? 'Generating QRs...' : '🚀 Generate Batch QR Codes'}
            </button>

            {generatedItems.length > 0 && (
              <button
                onClick={downloadAll}
                className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download All ({generatedItems.length} QRs)</span>
              </button>
            )}
          </div>

          {/* Grid Preview */}
          {generatedItems.length > 0 && (
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Generated QRs ({generatedItems.length})</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {generatedItems.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-center space-y-2">
                    <img src={item.dataUrl} alt={`QR ${item.id}`} className="w-28 h-28 mx-auto bg-white p-1 rounded-xl shadow-xs" />
                    <span className="block text-[11px] font-mono text-gray-700 truncate" title={item.text}>
                      {item.text}
                    </span>
                    <a
                      href={item.dataUrl}
                      download={`qr-${item.id + 1}.png`}
                      className="block w-full py-1.5 bg-white hover:bg-gray-100 text-purple-700 font-bold text-xs rounded-lg border border-gray-200"
                    >
                      Download PNG
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
