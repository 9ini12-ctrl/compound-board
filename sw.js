const CACHE = "compound-board-shell-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c)=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Only cache same-origin GET requests
  if(e.request.method !== "GET" || url.origin !== location.origin) return;
  // BYPASS_FUNCTIONS: never cache Netlify Functions (must always be fresh)
  if(url.pathname.startsWith("/.netlify/functions/")){
    e.respondWith(fetch(e.request, {cache:"no-store"}));
    return;
  }
  e.respondWith(
    caches.match(e.request).then((hit)=> hit || fetch(e.request).then((res)=>{
      const copy = res.clone();
      caches.open(CACHE).then((c)=>c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(()=>hit))
  );
});
