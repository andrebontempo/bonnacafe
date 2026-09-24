/* ==========================================================================
   Bonna Café - Progressive Web App (PWA) Service Worker
   v14 — Atualização de estilos da visualização de poesias (Nivo Lightbox)
   ========================================================================== */

const CACHE_NAME = 'bonnacafe-v14';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/cardapio.html',
  '/admin.html',
  '/css/bootstrap.css',
  '/css/style.css',
  '/css/precos.css',
  '/fonts/font-awesome/css/font-awesome.css',
  '/js/jquery.1.11.1.js',
  '/js/bootstrap.js',
  '/js/main.js',
  '/img/logo_bonna.png',
  '/img/favicon.ico',
  '/img/apple-touch-icon.png',
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

// Fetch Event
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // NUNCA cachear rotas de API — sempre busca da rede
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // NUNCA cachear precos.js (dados dinâmicos)
  if (url.pathname.includes('precos.js')) {
    event.respondWith(fetch(request));
    return;
  }

  // Stale-While-Revalidate para assets estáticos
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
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
