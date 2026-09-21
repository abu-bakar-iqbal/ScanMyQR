// Data presets for Multi-Link QR generator, themes, and QR design templates

export const SOCIAL_PLATFORMS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'MessageCircle',
    color: '#25D366',
    bgColor: '#E8FADF',
    defaultSubtext: 'Chat on WhatsApp',
    placeholder: '+18005550199 or wa.me link',
    prefix: 'https://wa.me/'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
    color: '#E4405F',
    bgColor: '#FDEBF0',
    defaultSubtext: 'Follow on Instagram',
    placeholder: 'https://instagram.com/yourhandle',
    prefix: 'https://instagram.com/'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
    color: '#1877F2',
    bgColor: '#E7F1FF',
    defaultSubtext: 'Connect on Facebook',
    placeholder: 'https://facebook.com/yourpage',
    prefix: 'https://facebook.com/'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'Video',
    color: '#000000',
    bgColor: '#F2F2F2',
    defaultSubtext: 'Watch on TikTok',
    placeholder: 'https://tiktok.com/@yourhandle',
    prefix: 'https://tiktok.com/@'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0A66C2',
    bgColor: '#E8F2FD',
    defaultSubtext: 'Network on LinkedIn',
    placeholder: 'https://linkedin.com/in/profile',
    prefix: 'https://linkedin.com/in/'
  },
  {
    id: 'web',
    name: 'Website',
    icon: 'Globe',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    defaultSubtext: 'Visit Official Website',
    placeholder: 'https://example.com',
    prefix: 'https://'
  },
  {
    id: 'google_review',
    name: 'Google Review',
    icon: 'Star',
    color: '#EA4335',
    bgColor: '#FCE8E6',
    defaultSubtext: 'Give Us a Review',
    placeholder: 'https://g.page/r/.../review',
    prefix: 'https://'
  },
  {
    id: 'custom',
    name: 'Custom Link',
    icon: 'Link',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    defaultSubtext: 'Click to open',
    placeholder: 'https://...',
    prefix: ''
  }
];

export const THEMES = [
  {
    id: 'default',
    name: 'Enterprise Blue & White',
    headerBg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    cardBg: '#ffffff',
    textColor: '#1f2937',
    subtextColor: '#6b7280',
    accentColor: '#2563eb',
    buttonStyle: 'rounded-2xl shadow-sm border border-gray-100'
  },
  {
    id: 'glassmorphism',
    name: 'Modern Glassmorphism',
    headerBg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    textColor: '#0f172a',
    subtextColor: '#475569',
    accentColor: '#8b5cf6',
    buttonStyle: 'rounded-2xl backdrop-blur-md bg-white/70 border border-white/40 shadow-lg'
  },
  {
    id: 'dark_pro',
    name: 'Sleek Dark Mode',
    headerBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    cardBg: '#1e293b',
    textColor: '#f8fafc',
    subtextColor: '#94a3b8',
    accentColor: '#38bdf8',
    buttonStyle: 'rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-lg'
  },
  {
    id: 'sunset_glow',
    name: 'Sunset Vibrant',
    headerBg: 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)',
    cardBg: '#ffffff',
    textColor: '#1c1917',
    subtextColor: '#78716c',
    accentColor: '#f97316',
    buttonStyle: 'rounded-2xl shadow-md border border-orange-100'
  },
  {
    id: 'emerald_nature',
    name: 'Emerald Luxe',
    headerBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    cardBg: '#ffffff',
    textColor: '#064e3b',
    subtextColor: '#047857',
    accentColor: '#10b981',
    buttonStyle: 'rounded-xl border border-emerald-100 shadow-md'
  }
];

export const QR_STYLE_PRESETS = [
  {
    id: 'classic_black',
    name: 'Classic Black',
    fgColor: '#000000',
    bgColor: '#ffffff',
    moduleShape: 'square',
    eyeShape: 'square',
    eyeInnerShape: 'square',
    frameColor: '#1e293b',
    frameText: 'SCAN ME'
  },
  {
    id: 'bold_dots',
    name: 'Bold Circle Dots',
    fgColor: '#2563eb',
    bgColor: '#ffffff',
    moduleShape: 'dot',
    eyeShape: 'circle',
    eyeInnerShape: 'circle',
    frameColor: '#2563eb',
    frameText: 'SCAN ME'
  },
  {
    id: 'heart_love',
    name: 'Heart Romance',
    fgColor: '#e11d48',
    bgColor: '#fff1f2',
    moduleShape: 'heart',
    eyeShape: 'rounded',
    eyeInnerShape: 'heart',
    frameColor: '#e11d48',
    frameText: 'FOLLOW US'
  },
  {
    id: 'diamond_luxury',
    name: 'Diamond Luxury',
    fgColor: '#7c3aed',
    bgColor: '#ffffff',
    moduleShape: 'diamond',
    eyeShape: 'diamond',
    eyeInnerShape: 'diamond',
    frameColor: '#7c3aed',
    frameText: 'CONNECT'
  },
  {
    id: 'emerald_leaf',
    name: 'Emerald Leaf',
    fgColor: '#059669',
    bgColor: '#f0fdf4',
    moduleShape: 'rounded',
    eyeShape: 'leaf',
    eyeInnerShape: 'circle',
    frameColor: '#059669',
    frameText: 'SCAN ME'
  },
  {
    id: 'bar_tech',
    name: 'Tech Bar',
    fgColor: '#0284c7',
    bgColor: '#ffffff',
    moduleShape: 'rectangle',
    eyeShape: 'rounded',
    eyeInnerShape: 'square',
    frameColor: '#0284c7',
    frameText: 'WATCH VIDEO'
  },
  {
    id: 'star_magic',
    name: 'Star Magic',
    fgColor: '#d97706',
    bgColor: '#fffbeb',
    moduleShape: 'star',
    eyeShape: 'circle',
    eyeInnerShape: 'star',
    frameColor: '#d97706',
    frameText: 'VIEW PDF'
  }
];

export const INITIAL_MULTI_LINK_DATA = {
  profileTitle: 'Apex Global Enterprise Solutions',
  profileDescription: 'Premier digital transformation, enterprise consulting & professional services. Connecting global clients to innovative technology solutions.',
  avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&auto=format&fit=crop&q=80',
  headerBgColor: '#2563eb',
  themeId: 'default',
  sectionTitle: 'Connect with Us',
  passwordProtected: false,
  pinCode: '',
  leadFormEnabled: true,
  leadFormTitle: 'Request a Quick Consultation',
  links: [
    {
      id: 'l1',
      platformId: 'web',
      title: 'Official Website',
      subtext: 'Explore Enterprise Services',
      url: 'https://apex-global.com',
      icon: 'Globe',
      active: true,
      color: '#0284C7'
    },
    {
      id: 'l2',
      platformId: 'whatsapp',
      title: 'WhatsApp Support',
      subtext: 'Direct 24/7 Client Desk',
      url: 'https://wa.me/18005550199',
      icon: 'MessageCircle',
      active: true,
      color: '#25D366'
    },
    {
      id: 'l3',
      platformId: 'linkedin',
      title: 'LinkedIn Corporate',
      subtext: 'Follow Industry Updates',
      url: 'https://linkedin.com/company/apex-global',
      icon: 'Linkedin',
      active: true,
      color: '#0A66C2'
    },
    {
      id: 'l4',
      platformId: 'google_review',
      title: 'Google Business Review',
      subtext: 'Share Client Feedback',
      url: 'https://g.page/r/apexglobal/review',
      icon: 'Star',
      active: true,
      color: '#EA4335'
    }
  ]
};
