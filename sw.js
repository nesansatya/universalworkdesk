// WorkDesk Service Worker v14 — minimal, no caching
// Disabled caching so APK WebView always gets fresh content

const CACHE_NAME = "workdesk-v14";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Delete ALL old caches on activate
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Always go straight to network — no caching at all
  event.respondWith(fetch(event.request));
});
