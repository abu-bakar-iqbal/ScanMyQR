import React from 'react';
import { THEMES } from '../data/presetData';
import { Palette, Check } from 'lucide-react';

export default function ThemeSelector({ selectedThemeId, onSelectTheme }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-purple-600" />
          <span>Landing Page Themes</span>
        </label>
        <span className="text-xs text-gray-500">1-Click Theme Change</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {THEMES.map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onSelectTheme(theme.id)}
              className={`relative p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md bg-blue-50/20'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {/* Color swatch bar */}
              <div
                className="h-8 rounded-xl w-full mb-2 flex items-center justify-end px-2"
                style={{ background: theme.headerBg }}
              >
                {isSelected && (
                  <div className="w-5 h-5 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <span className="block text-xs font-bold text-gray-800">{theme.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
