// Gjør appen tilgjengelig uten nett. Øk versjonsnummeret når du endrer filene.
const CACHE = 'timelogg-v9';
const ASSETS = ['./', './index.html', './firebase-config.js', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// Mellomlagrer bare appens egne filer og Firebase-biblioteket.
// Innlogging (/__/auth) og kommunikasjon med databasen går alltid rett på nett.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const own = url.origin === location.origin && !url.pathname.startsWith('/__/');
  const lib = url.origin === 'https://www.gstatic.com' && url.pathname.startsWith('/firebasejs/');
  if (!own && !lib) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request).then(res => {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
