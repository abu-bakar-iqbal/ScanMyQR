import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Video, FileText, MapPin, AlertCircle, CheckCircle2, HardDrive, Play, Link, Globe } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export function ImageQrEditor({ data, onChange }) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of 10MB.`);
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      onChange({
        ...data,
        imageUrl: evt.target.result,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Gallery / Photo Title
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="e.g. My Portfolio Gallery / Product Showcase"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold"
        />
      </div>

      {/* 10MB Image File Upload */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Upload Image File (Max 10MB)
        </label>
        <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-5 text-center bg-gray-50 hover:bg-blue-50/40 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-file-upload"
          />
          <label htmlFor="image-file-upload" className="cursor-pointer block space-y-2">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-900 block">Click to upload photo / image</span>
              <span className="text-[11px] text-gray-500">Supports PNG, JPG, JPEG, WebP (Max 10 MB)</span>
            </div>
          </label>
        </div>

        {data.fileName && (
          <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{data.fileName}</span>
            </div>
            <span className="text-[11px] text-emerald-600 shrink-0">{data.fileSize}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mt-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Or Enter External Image URL
        </label>
        <input
          type="text"
          value={data.imageUrl || ''}
          onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
          placeholder="https://images.unsplash.com/photo-..."
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Image Description / Caption
        </label>
        <textarea
          rows="2"
          value={data.description || ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Brief description..."
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm"
        ></textarea>
      </div>
    </div>
  );
}

export function VideoQrEditor({ data, onChange }) {
  const [selectedCloud, setSelectedCloud] = useState('drive');

  const cloudPresets = [
    { id: 'drive', name: 'Google Drive', placeholder: 'https://drive.google.com/file/d/.../view', icon: HardDrive, color: '#1FA463' },
    { id: 'youtube', name: 'YouTube', placeholder: 'https://www.youtube.com/watch?v=...', icon: Play, color: '#FF0000' },
    { id: 'dropbox', name: 'Dropbox', placeholder: 'https://www.dropbox.com/s/.../video.mp4', icon: HardDrive, color: '#0061FF' },
    { id: 'onedrive', name: 'OneDrive', placeholder: 'https://1drv.ms/v/s!...', icon: HardDrive, color: '#0078D4' },
    { id: 'custom', name: 'Cloud Video URL', placeholder: 'https://mycloud.com/video.mp4', icon: Link, color: '#6366F1' }
  ];

  const currentCloud = cloudPresets.find(c => c.id === selectedCloud) || cloudPresets[0];

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Video Title
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="e.g. Product Demo / Technical Services Video"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold"
        />
      </div>

      {/* Cloud Service Selector Buttons */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Select Video Cloud Storage Source
        </label>
        <div className="flex flex-wrap gap-2">
          {cloudPresets.map((cloud) => {
            const IconComp = cloud.icon;
            const isSelected = selectedCloud === cloud.id;
            return (
              <button
                key={cloud.id}
                type="button"
                onClick={() => setSelectedCloud(cloud.id)}
                className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <IconComp className="w-4 h-4" style={{ color: cloud.color }} />
                <span>{cloud.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cloud Link Input */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
          <HardDrive className="w-4 h-4 text-blue-600" />
          <span>Enter {currentCloud.name} Shareable Video Link</span>
        </label>
        <input
          type="url"
          value={data.videoUrl || ''}
          onChange={(e) => onChange({ ...data, videoUrl: e.target.value, cloudType: selectedCloud })}
          placeholder={currentCloud.placeholder}
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono bg-white focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-[11px] text-gray-500 block">
          Paste any shareable link from Google Drive, Dropbox, OneDrive, YouTube, or your cloud storage to generate an instant QR code.
        </span>
      </div>
    </div>
  );
}

export function PdfQrEditor({ data, onChange }) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of 10MB.`);
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      onChange({
        ...data,
        pdfUrl: evt.target.result,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          PDF / Document Title
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="e.g. Restaurant Menu 2026.pdf / Product Catalog"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold"
        />
      </div>

      {/* 10MB PDF File Upload */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Upload PDF File (Max 10MB)
        </label>
        <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-5 text-center bg-gray-50 hover:bg-blue-50/40 transition-colors">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-file-upload"
          />
          <label htmlFor="pdf-file-upload" className="cursor-pointer block space-y-2">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-900 block">Click to upload PDF Document</span>
              <span className="text-[11px] text-gray-500">Supports PDF format (Max 10 MB)</span>
            </div>
          </label>
        </div>

        {data.fileName && (
          <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{data.fileName}</span>
            </div>
            <span className="text-[11px] text-emerald-600 shrink-0">{data.fileSize}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mt-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Or Enter External PDF / Google Drive Link
        </label>
        <input
          type="text"
          value={data.pdfUrl || ''}
          onChange={(e) => onChange({ ...data, pdfUrl: e.target.value })}
          placeholder="https://drive.google.com/file/d/... or PDF URL"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono"
        />
      </div>
    </div>
  );
}

export function MapQrEditor({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Location / Business Name
        </label>
        <input
          type="text"
          value={data.locationName || ''}
          onChange={(e) => onChange({ ...data, locationName: e.target.value })}
          placeholder="e.g. Fakhr Almas Technical Services Dubai"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Google Maps Link or Location Coordinates
        </label>
        <input
          type="text"
          value={data.mapUrl || ''}
          onChange={(e) => onChange({ ...data, mapUrl: e.target.value })}
          placeholder="https://maps.google.com/?q=Business+Bay+Dubai"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono"
        />
      </div>
    </div>
  );
}

export function StandardUrlEditor({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Target Website URL
        </label>
        <input
          type="url"
          value={data.url || ''}
          onChange={(e) => onChange({ ...data, url: e.target.value })}
          placeholder="https://example.com"
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono"
        />
      </div>
    </div>
  );
}
