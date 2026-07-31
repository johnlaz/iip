/* IIP Macro — app-shell cache only.
   API responses are NEVER cached: a stale macro reading that looks live is
   worse than no reading at all. */
const CACHE='iip-macro-v1.3.0';
const SHELL=['./','./index.html'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).catch(()=>{})));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  // never intercept data providers
  if(/financialmodelingprep\.com|api\.groq\.com/.test(u.hostname)) return;
  if(e.request.method!=='GET') return;
  if(u.origin!==self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(r=>{
      const cp=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
      return r;
    }).catch(()=>caches.match(e.request))
  );
});