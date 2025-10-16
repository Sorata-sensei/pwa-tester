const CACHE_NAME = "pwa-template-v1";
const BASE_URL = self.location.pathname.replace(/service-worker\.js$/, '');
const urlsToCache = [
  BASE_URL,
  `${BASE_URL}index.html`,
  `${BASE_URL}assets/style.css`,
  `${BASE_URL}manifest.json`,
  `${BASE_URL}icons/icon-192x192.png`,
  `${BASE_URL}icons/icon-512x512.png`
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => !cacheWhitelist.includes(key) && caches.delete(key)))
    )
  );
});
