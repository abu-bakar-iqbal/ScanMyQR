import React from 'react';
import { QR_STYLE_PRESETS } from '../data/presetData';
import {
  Palette,
  Sparkles,
  Diamond,
  Circle,
  Square,
  Upload,
  Check,
  Heart,
  Star
} from 'lucide-react';

export default function QrCustomizer({ styling, onChangeStyling }) {
  const {
    fgColor = '#000000',
    bgColor = '#ffffff',
    eyeShape = 'square',
    eyeInnerShape = 'square',
    moduleShape = 'square',
    frameText = 'SCAN ME',
    frameColor = '#2563eb',
    logoUrl = ''
  } = styling;

  const updateStyle = (key, val) => {
    onChangeStyling({
      ...styling,
      [key]: val
    });
  };

  const handleApplyPreset = (preset) => {
    onChangeStyling({
      ...styling,
      fgColor: preset.fgColor,
      bgColor: preset.bgColor,
      moduleShape: preset.moduleShape,
      eyeShape: preset.eyeShape,
      eyeInnerShape: preset.eyeInnerShape,
      frameColor: preset.frameColor,
      frameText: preset.frameText
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      updateStyle('logoUrl', evt.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* 1-Click QR Style Templates Gallery */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>1-Click Pre-Designed QR Templates</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QR_STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="p-2.5 rounded-2xl border border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50/40 text-left transition-all shadow-2xs group"
            >
              <div
                className="h-7 w-full rounded-xl mb-1.5 flex items-center justify-center text-xs font-bold shadow-2xs"
                style={{
                  backgroundColor: preset.frameColor,
                  color: '#ffffff'
                }}
              >
                {preset.moduleShape.toUpperCase()}
              </div>

              <span className="block text-xs font-bold text-gray-800 group-hover:text-blue-600 truncate">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dot Styles Selection (Diamond, Dot, Square, Rectangle, Leaf) */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Select QR Dot Pattern Style
        </label>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs">
          {[
            { id: 'square', label: 'Square', icon: Square },
            { id: 'dot', label: 'Circle Dot', icon: Circle },
            { id: 'rounded', label: 'Rounded', icon: Square },
            { id: 'diamond', label: 'Diamond', icon: Diamond },
            { id: 'heart', label: 'Heart', icon: Heart },
            { id: 'star', label: 'Star', icon: Star },
            { id: 'rectangle', label: 'Bar / Rectangle', icon: Square }
          ].map((item) => {
            const isSelected = moduleShape === item.id;
            const IconComp = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateStyle('moduleShape', item.id)}
                className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <IconComp className="w-4 h-4 shrink-0 text-blue-600" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Eye Outer & Inner Shapes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Corner Eye Frame Shape
          </label>

          <select
            value={eyeShape}
            onChange={(e) => updateStyle('eyeShape', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold bg-white"
          >
            <option value="square">Square Frame</option>
            <option value="rounded">Rounded Frame</option>
            <option value="circle">Circle Frame</option>
            <option value="leaf">Leaf Frame</option>
            <option value="diamond">Diamond Frame</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Corner Eye Pupil Center
          </label>

          <select
            value={eyeInnerShape}
            onChange={(e) => updateStyle('eyeInnerShape', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold bg-white"
          >
            <option value="square">Square Pupil</option>
            <option value="circle">Circle Pupil</option>
            <option value="diamond">Diamond Pupil</option>
          </select>
        </div>
      </div>

      {/* Color Customization */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
            QR Code Color
          </label>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => updateStyle('fgColor', e.target.value)}
              className="w-9 h-9 rounded-xl border border-gray-200 cursor-pointer"
            />

            <span className="font-mono text-gray-700 font-semibold">
              {fgColor}
            </span>
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
            Frame Banner Color
          </label>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={frameColor}
              onChange={(e) => updateStyle('frameColor', e.target.value)}
              className="w-9 h-9 rounded-xl border border-gray-200 cursor-pointer"
            />

            <span className="font-mono text-gray-700 font-semibold">
              {frameColor}
            </span>
          </div>
        </div>
      </div>

      {/* Center Logo Upload */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Upload Custom Center Logo
        </label>

        <div className="flex items-center gap-2">
          <label className="cursor-pointer px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs flex items-center gap-2 border border-blue-200">
            <Upload className="w-4 h-4" />
            <span>Upload Logo Image</span>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>

          {logoUrl && (
            <button
              type="button"
              onClick={() => updateStyle('logoUrl', '')}
              className="text-xs text-red-500 font-bold hover:underline"
            >
              Remove Logo
            </button>
          )}
        </div>
      </div>

      {/* CTA Frame Banner Text */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          CTA Frame Banner Text
        </label>

        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            'SCAN ME',
            'FOLLOW US',
            'CONNECT',
            'WATCH VIDEO',
            'VIEW PDF',
            'none'
          ].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => updateStyle('frameText', f)}
              className={`py-1.5 px-2 rounded-xl border text-[11px] font-bold uppercase transition-all ${
                frameText === f
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}