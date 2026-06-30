const CACHE_NAME = 'toro-v51'; 
const assets = [
  './',
  './index.html',
  './styles/style.css',
  './assets/logo_toro.png',
  './manifest.json'
];

// Instalación
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});


self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // SI NO HAY RED (Modo Offline), buscamos en el caché
        return caches.match(e.request).then(cacheResponse => {
          return cacheResponse || caches.match('./index.html');
        });
      })
  );
});