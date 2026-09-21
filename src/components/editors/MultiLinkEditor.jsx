import React, { useState } from 'react';
import { SOCIAL_PLATFORMS } from '../../data/presetData';
import ThemeSelector from '../ThemeSelector';
import { getPlatformIconComponent } from '../BrandIcons';
import {
  User,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Shield,
  Mail,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

export default function MultiLinkEditor({ data, onChange }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'links', 'design', 'settings'

  const updateField = (field, val) => {
    onChange({
      ...data,
      [field]: val
    });
  };

  const handleAvatarFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      updateField('avatarUrl', evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSocial = (platform) => {
    const newLink = {
      id: 'l_' + Date.now(),
      platformId: platform.id,
      title: platform.name,
      subtext: platform.defaultSubtext,
      url: platform.prefix,
      icon: platform.icon,
      active: true,
      color: platform.color
    };

    onChange({
      ...data,
      links: [...data.links, newLink]
    });
  };

  const handleUpdateLink = (id, updatedFields) => {
    const updated = data.links.map(l => (l.id === id ? { ...l, ...updatedFields } : l));
    onChange({ ...data, links: updated });
  };

  const handleDeleteLink = (id) => {
    const updated = data.links.filter(l => l.id !== id);
    onChange({ ...data, links: updated });
  };

  const handleMoveLink = (index, direction) => {
    const updated = [...data.links];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange({ ...data, links: updated });
  };

  return (
    <div className="space-y-6">
      
      {/* Editor Sub-Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'profile' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          👤 Profile Bio
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('links')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'links' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🔗 Social Links ({data.links.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'design' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🎨 Page Themes
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'settings' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ⚙️ Options
        </button>
      </div>

      {/* Tab 1: Profile Info */}
      {activeTab === 'profile' && (
        <div className="space-y-4 animate-fadeIn">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Business / Profile Title
            </label>
            <input
              type="text"
              value={data.profileTitle}
              onChange={(e) => updateField('profileTitle', e.target.value)}
              placeholder="e.g. Fakhr Almas Technical Services"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Description / Bio Text
            </label>
            <textarea
              rows="3"
              value={data.profileDescription}
              onChange={(e) => updateField('profileDescription', e.target.value)}
              placeholder="40-Minutes Arrival Guaranteed! 24/7 Electricians, Plumbers & Handyman services..."
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Avatar Logo Upload & URL option */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Avatar / Business Logo Image
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0 shadow-xs">
                {data.avatarUrl ? (
                  <img src={data.avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-400" />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs border border-blue-200">
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo File</span>
                  <input type="file" accept="image/*" onChange={handleAvatarFileUpload} className="hidden" />
                </label>

                <input
                  type="text"
                  value={data.avatarUrl}
                  onChange={(e) => updateField('avatarUrl', e.target.value)}
                  placeholder="Or paste image URL (https://...)"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Section Heading Text
            </label>
            <input
              type="text"
              value={data.sectionTitle}
              onChange={(e) => updateField('sectionTitle', e.target.value)}
              placeholder="e.g. Find me on"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

        </div>
      )}

      {/* Tab 2: Social Links Management */}
      {activeTab === 'links' && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Quick Platform Add Buttons */}
          <div>
            <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Quick Add Manual Platform Options
            </span>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_PLATFORMS.map((platform) => {
                const IconComp = getPlatformIconComponent(platform.icon);
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handleAddSocial(platform)}
                    className="px-3 py-1.5 rounded-xl border border-gray-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <IconComp className="w-3.5 h-3.5 text-blue-600" />
                    <span>{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links List */}
          <div className="space-y-3">
            <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Manage Active Links ({data.links.length})
            </span>

            {data.links.map((link, idx) => {
              const IconComp = getPlatformIconComponent(link.icon);
              return (
                <div
                  key={link.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    link.active ? 'bg-white border-gray-200 shadow-2xs' : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: link.color || '#2563eb' }}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{link.title}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveLink(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveLink(idx, 1)}
                        disabled={idx === data.links.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateLink(link.id, { active: !link.active })}
                        className={`p-1 ${link.active ? 'text-blue-600' : 'text-gray-400'}`}
                      >
                        {link.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">Link Title</label>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">Subtext / Subtitle</label>
                      <input
                        type="text"
                        value={link.subtext}
                        onChange={(e) => handleUpdateLink(link.id, { subtext: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">Destination URL</label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Tab 3: Design & Themes */}
      {activeTab === 'design' && (
        <div className="space-y-4 animate-fadeIn">
          <ThemeSelector
            selectedThemeId={data.themeId}
            onSelectTheme={(themeId) => updateField('themeId', themeId)}
          />
        </div>
      )}

      {/* Tab 4: Advanced Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Lead Contact Form Widget */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-bold text-gray-900">Lead Contact Form</span>
              </div>
              <input
                type="checkbox"
                checked={data.leadFormEnabled}
                onChange={(e) => updateField('leadFormEnabled', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>
            {data.leadFormEnabled && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Form Header Title</label>
                <input
                  type="text"
                  value={data.leadFormTitle}
                  onChange={(e) => updateField('leadFormTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs"
                />
              </div>
            )}
          </div>

          {/* Password Protection */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-bold text-gray-900">Password Lock</span>
              </div>
              <input
                type="checkbox"
                checked={data.passwordProtected}
                onChange={(e) => updateField('passwordProtected', e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
            </div>
            {data.passwordProtected && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Enter 4-Digit PIN Code</label>
                <input
                  type="password"
                  maxLength="6"
                  value={data.pinCode}
                  onChange={(e) => updateField('pinCode', e.target.value)}
                  placeholder="1234"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-mono"
                />
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
