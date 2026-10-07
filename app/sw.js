/* IIP — shared app-shell service worker (scope: /app/).
   VERSION is the single source of truth: it names the cache and is reported to the pages,
   which compare it with their own APP_VERSION stamp. Bump it (and APP_VERSION in all four
   pages) on every deploy that changes a shell file.
   API responses (FMP, Groq) are NEVER cached: a stale reading that looks live is worse
   than no reading at all. */
const VERSION = '2.3.0';
const CACHE = 'iip-shell-v' + VERSION;
const FONTS = 'iip-fonts';
const SHELL = [
  './',
  './index.html',
  './iip-macro.html',
  './iip-research.html',
  './iip-portfolio.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  // No .catch: if any shell file is missing the install fails loudly and the previous
  // working worker stays in charge, instead of silently shipping a half-empty cache.
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      // Only touch IIP's own caches — the origin is shared with other apps.
      .then(ks => Promise.all(ks.filter(k => k.startsWith('iip-shell-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'VERSION' && e.ports[0]) e.ports[0].postMessage(VERSION);
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (/financialmodelingprep\.com|api\.groq\.com/.test(u.hostname)) return;

  // Web fonts: stale-while-revalidate so the first offline paint keeps its typography.
  if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (u.origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    // Network-first so deploys show up immediately; cached copy (and Home) when offline.
    e.respondWith(
      fetch(req)
        .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); return r; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  // Static assets: cache-first (they only change with a VERSION bump).
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); return r;
    }))
  );
});
