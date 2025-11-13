/**
 * Service Worker for EyeLoveSleep
 * Provides offline functionality and aggressive caching for fast repeat visits
 */

const CACHE_VERSION = 'v1.2.0';
const CACHE_NAME = `eyelovesleep-${CACHE_VERSION}`;
const RUNTIME_CACHE = `eyelovesleep-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `eyelovesleep-images-${CACHE_VERSION}`;

// Cache size limits
const MAX_RUNTIME_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 30;

// Resources to cache immediately on install
// Note: Build assets will be cached on-demand due to dynamic hashed filenames
const PRECACHE_URLS = [
  '/',
  '/index.html',
];

// Utility to limit cache size
const limitCacheSize = async (cacheName, maxSize) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxSize) {
    await cache.delete(keys[0]);
    await limitCacheSize(cacheName, maxSize);
  }
};

// Cache strategies
const CACHE_STRATEGIES = {
  // Network first (for HTML)
  networkFirst: async (request) => {
    try {
      const networkResponse = await fetch(request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;
      throw error;
    }
  },

  // Cache first (for static assets)
  cacheFirst: async (request) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    try {
      const networkResponse = await fetch(request);
      
      // Only cache successful responses
      if (networkResponse && networkResponse.status === 200) {
        const url = new URL(request.url);
        const cacheName = request.destination === 'image' ? IMAGE_CACHE : RUNTIME_CACHE;
        const cache = await caches.open(cacheName);
        
        // Clone the response before caching
        cache.put(request, networkResponse.clone());
        
        // Limit cache size to prevent storage bloat
        const maxSize = request.destination === 'image' ? MAX_IMAGE_CACHE_SIZE : MAX_RUNTIME_CACHE_SIZE;
        setTimeout(() => limitCacheSize(cacheName, maxSize), 0);
      }
      
      return networkResponse;
    } catch (error) {
      throw error;
    }
  },

  // Network only (for API calls and ads)
  networkOnly: async (request) => {
    return fetch(request);
  },
};

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching core resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  const validCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => !validCaches.includes(name))
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - handle caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests except for fonts and images
  if (url.origin !== location.origin && 
      !request.destination.match(/font|image/)) {
    return;
  }

  // Skip Chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Determine cache strategy based on request type
  let strategy;

  if (request.destination === 'document') {
    // HTML - network first (always fresh)
    strategy = CACHE_STRATEGIES.networkFirst;
  } else if (
    request.destination.match(/script|style|font|image/) ||
    url.pathname.match(/\.(js|css|woff2?|ttf|otf|eot|png|jpg|jpeg|gif|svg|webp|ico)$/)
  ) {
    // Static assets - cache first (fast repeat visits)
    strategy = CACHE_STRATEGIES.cacheFirst;
  } else if (
    url.hostname.includes('googlesyndication') ||
    url.hostname.includes('googletagmanager') ||
    url.hostname.includes('sharethis')
  ) {
    // Third-party scripts - network only (always fresh)
    strategy = CACHE_STRATEGIES.networkOnly;
  } else {
    // Default - network first with cache fallback
    strategy = CACHE_STRATEGIES.networkFirst;
  }

  event.respondWith(strategy(request));
});

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  // Could implement offline calculation queue here
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received:', event);
  // Could implement sleep reminders here
});

console.log('[SW] Service worker loaded');
