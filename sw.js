const CACHE_NAME = 'ani-math-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './styles_2.css',
  './scripts.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
