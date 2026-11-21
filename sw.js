/* Fut-ball ⚽ — Service Worker mínimo.
   Solo habilita la instalación en la pantalla de inicio (PWA).
   NO cachea nada: siempre se descarga la versión más nueva del juego. */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k)))) // limpia cachés viejas
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Solo la navegación pasa por el SW (red directa, sin caché). El resto (API, PeerJS, imágenes) sigue su curso normal.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => new Response(
        '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="background:#0b1911;color:#fff;font-family:sans-serif;text-align:center;padding:12vh 20px"><h1>Fut-ball ⚽</h1><p>Sin conexión. Conectate a internet y volvé a abrir el juego.</p></body>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      ))
    );
  }
});
