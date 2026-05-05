const CACHE_NAME = 'life-os-v10';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './cfa-study.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS).catch((err) => console.warn('Cache add failed:', err))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // network-first: JS files + inbox.json — ต้องได้ใหม่เสมอ
  if (req.url.includes('.js') || req.url.includes('inbox.json')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            caches.open(CACHE_NAME).then((c) => c.put(req, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // cache-first: fonts, icons, css
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        caches.open(CACHE_NAME).then((c) => c.put(req, res.clone()));
      }
      return res;
    }))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
