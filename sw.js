const CACHE_NAME = 'toro-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/style.css', 
  '/assets/logo_toro.png'
];

// Instalar y guardar en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cacheando archivos para modo offline...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// Activar y tomar el control
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Responder desde la caché aunque no haya internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    }).catch(() => {
      // Si no hay internet y no está en caché, devuelve el index
      return caches.match('/index.html');
    })
  );
});