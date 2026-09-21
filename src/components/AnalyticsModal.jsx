import React from 'react';
import { X, BarChart3, Eye, Smartphone, Globe, TrendingUp, Calendar, Layers, PieChart } from 'lucide-react';
import { useQrStorage } from '../context/QrStorageContext';

export default function AnalyticsModal({ isOpen, onClose }) {
  const { analytics } = useQrStorage();

  if (!isOpen) return null;

  const { totalScans, uniqueVisitors, qrTypeBreakdown, osBreakdown, dailyActivity, savedQrCount } = analytics;

  const maxDailyScans = Math.max(...dailyActivity.map(d => d.scans), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Real-Time Scan Analytics & Charts</h3>
              <p className="text-xs text-gray-500">Live statistics computed directly from your saved QR codes ({savedQrCount} active QRs)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Real Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
              <div className="flex items-center justify-between text-blue-600 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">Total Real Scans</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-3xl font-black text-blue-950">{totalScans}</span>
              <span className="block text-[11px] text-blue-600 font-medium mt-1">Live recorded scans</span>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
              <div className="flex items-center justify-between text-indigo-600 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">Unique Visitors</span>
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-3xl font-black text-indigo-950">{uniqueVisitors}</span>
              <span className="block text-[11px] text-indigo-600 font-medium mt-1">Distinct IP addresses</span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 bg-purple-50 border border-purple-100 rounded-2xl">
              <div className="flex items-center justify-between text-purple-600 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">Active QR Codes</span>
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-3xl font-black text-purple-950">{savedQrCount}</span>
              <span className="block text-[11px] text-purple-600 font-medium mt-1">In your private workspace</span>
            </div>
          </div>

          {/* GRAPH 1: 7-Day Real Scan Activity Bar Chart */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Graph 1: 7-Day Real Scan Activity</span>
              </h4>
              <span className="text-xs font-semibold text-blue-600 bg-blue-100/60 px-2.5 py-0.5 rounded-md">Live Stream</span>
            </div>

            <div className="flex items-end justify-between gap-2 h-36 pt-4 px-2 border-b border-slate-200">
              {dailyActivity.map((item, idx) => {
                const heightPercent = Math.max(10, Math.round((item.scans / maxDailyScans) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-blue-600 opacity-80 group-hover:opacity-100">
                      {item.scans}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all group-hover:from-blue-700 group-hover:to-indigo-600 shadow-xs"
                    ></div>
                    <span className="text-xs font-medium text-gray-600">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Multiple Graphs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* GRAPH 2: QR Types Distribution */}
            <div className="bg-white p-5 border border-gray-200 rounded-2xl space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-600" />
                <span>Graph 2: QR Code Types Distribution</span>
              </h4>

              {qrTypeBreakdown.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No QR codes created yet.</p>
              ) : (
                <div className="space-y-3 pt-1">
                  {qrTypeBreakdown.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-800">
                        <span className="capitalize">{item.type} QR</span>
                        <span className="text-indigo-600">{item.percentage}% ({item.count})</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* GRAPH 3: Device OS Breakdown */}
            <div className="bg-white p-5 border border-gray-200 rounded-2xl space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Graph 3: Device OS Traffic Breakdown</span>
              </h4>

              <div className="space-y-3 pt-1">
                {osBreakdown.map((osItem, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-gray-800">
                      <span>{osItem.os}</span>
                      <span className="text-emerald-600">{osItem.percentage}% ({osItem.count} scans)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2.5 rounded-full"
                        style={{ width: `${osItem.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
