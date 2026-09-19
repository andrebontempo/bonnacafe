/* ==========================================================================
   Bonna Café - Progressive Web App (PWA) Service Worker
   ========================================================================== */

const CACHE_NAME = 'bonnacafe-v8';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/cardapio.html',
  '/reajuste.html',
  '/css/bootstrap.css',
  '/css/style.css?v=8',
  '/css/precos.css?v=5',
  '/fonts/font-awesome/css/font-awesome.css',
  '/js/jquery.1.11.1.js',
  '/js/bootstrap.js',
  '/js/precos.js?v=5',
  '/js/main.js?v=8',
  '/img/logo_bonna.png',
  '/img/favicon.ico?v=2',
  '/img/apple-touch-icon.png',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/manifest.json'
];

// Install Event: Pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Non-critical precache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches & claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate for static assets, Network-First for API calls
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests or chrome-extension requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Network-First strategy for API routes (e.g., /api/items)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Stale-While-Revalidate strategy for static resources
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // If network fails and no cached response, fallback to offline index or cached match
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
