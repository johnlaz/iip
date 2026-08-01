/* IIP — one shared app-shell cache for all four pages.
   API responses are NEVER cached: a stale reading that looks live is worse
   than no reading at all. Bump CACHE's version suffix to force a refresh
   after deploying changes to any of the shell files below. */
const CACHE = 'iip-shell-v1.5';
const SHELL = [
  './',
  './index.html',
  './iip-macro.html',
  './iip-research.html',
  './iip-portfolio.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (/financialmodelingprep\.com|api\.groq\.com/.test(u.hostname)) return;
  if (e.request.method !== 'GET') return;
  if (u.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
