/* Legacy IIP service worker stub (kept at repo root for installs made before v2.3.0,
   when the whole suite lived at the repo root). Browsers re-check this file on every
   visit to the old scope; on activation it removes IIP's old caches and unregisters.
   The live service worker is /app/sw.js. Safe to delete a few weeks after release. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('iip-')) await caches.delete(k);
  await self.registration.unregister();
})()));
