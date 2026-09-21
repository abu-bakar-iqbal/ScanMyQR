import React from 'react';
import { Layers, FileText, Palette, Download, Check } from 'lucide-react';

export default function StepperNav({ currentStep, onSelectStep }) {
  const steps = [
    { id: 1, title: 'Choose Type', icon: Layers, desc: 'Multi-Link, Media, Map' },
    { id: 2, title: 'Add Content & Files', icon: FileText, desc: 'Links, Photos, Videos' },
    { id: 3, title: 'Design & Style QR', icon: Palette, desc: 'Dots, Hearts, Colors' },
    { id: 4, title: 'Preview & Download', icon: Download, desc: 'High-Res PNG, Link' }
  ];

  return (
    <div className="bg-white p-3.5 rounded-3xl shadow-sm border border-slate-200/80 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const IconComp = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100/60'
                  : 'bg-gray-50/70 text-gray-600 border-gray-100 hover:bg-gray-100'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 shadow-2xs'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <IconComp className="w-4 h-4" />}
              </div>

              <div className="truncate">
                <span className="text-xs font-black block truncate">{step.title}</span>
                <span
                  className={`text-[10px] block truncate ${
                    isActive ? 'text-blue-100' : isCompleted ? 'text-emerald-700' : 'text-gray-400'
                  }`}
                >
                  {step.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
