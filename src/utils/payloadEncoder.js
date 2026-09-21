// Compressed & Short URL Payload Helper for Low-Density Easy-to-Scan QR Codes

const STORAGE_PREFIX = 'scanmyqr_published_';

export function savePublishedPage(type, data) {
  const id = 'p_' + Math.random().toString(36).substring(2, 9);
  const payload = { type, data, createdAt: Date.now() };

  try {
    localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(payload));
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }

  // Also compress data into a short URL string fallback
  const compactJson = JSON.stringify({
    t: type,
    ttl: data.profileTitle || data.title || '',
    desc: data.profileDescription || data.description || '',
    img: data.avatarUrl || data.imageUrl || '',
    lnks: (data.links || []).map(l => ({ t: l.title, u: l.url, i: l.icon, c: l.color, s: l.subtext }))
  });

  const base64Short = btoa(encodeURIComponent(compactJson));
  return { id, base64Short };
}

export function generatePublicPageUrl(type, data) {
  // Store payload locally & generate ultra-short URL
  const { id } = savePublishedPage(type, data);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#id=${id}`;
}

export function decodePayload(hash) {
  if (!hash) return null;

  try {
    // 1. Check ID from localStorage
    const matchId = hash.match(/id=([a-zA-Z0-9_]+)/);
    if (matchId && matchId[1]) {
      const pageId = matchId[1];
      const stored = localStorage.getItem(STORAGE_PREFIX + pageId);
      if (stored) {
        return JSON.parse(stored);
      }
    }

    // 2. Check compact base64 payload fallback
    const matchView = hash.match(/view=([^&]+)/);
    if (matchView && matchView[1]) {
      const decodedJson = decodeURIComponent(atob(matchView[1]));
      const parsed = JSON.parse(decodedJson);
      
      if (parsed.t) {
        // Reconstruct from compact fallback
        return {
          type: parsed.t,
          data: {
            profileTitle: parsed.ttl,
            profileDescription: parsed.desc,
            avatarUrl: parsed.img,
            sectionTitle: 'Find me on',
            links: (parsed.lnks || []).map((l, idx) => ({
              id: 'l_' + idx,
              title: l.t,
              url: l.u,
              icon: l.i || 'Globe',
              color: l.c || '#2563eb',
              subtext: l.s || '',
              active: true
            }))
          }
        };
      }
      return parsed;
    }
  } catch (err) {
    console.error('Payload decode error:', err);
  }

  return null;
}
