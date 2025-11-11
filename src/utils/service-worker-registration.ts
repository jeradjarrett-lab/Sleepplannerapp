/**
 * Service Worker Registration Utility
 * Registers and manages the service worker lifecycle
 */

export const registerServiceWorker = async (): Promise<void> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[SW] Service workers not supported');
    return;
  }

  // Only register in production or if explicitly enabled
  const isDev = import.meta.env?.DEV || process.env.NODE_ENV === 'development';
  if (isDev) {
    console.log('[SW] Service worker disabled in development');
    return;
  }

  try {
    // Wait for page to be fully loaded before registering
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve, { once: true });
      });
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    console.log('[SW] Service worker registered:', registration.scope);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      console.log('[SW] New service worker found, installing...');

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New service worker available, prompt user to refresh
          console.log('[SW] New version available, reload to update');
          
          // Show update notification (optional - you could add a toast here)
          if (window.confirm('A new version of EyeLoveSleep is available. Reload to update?')) {
            window.location.reload();
          }
        }
      });
    });

    // Check for updates periodically (every hour)
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);

  } catch (error) {
    console.error('[SW] Service worker registration failed:', error);
  }
};

/**
 * Unregister all service workers (for debugging)
 */
export const unregisterServiceWorker = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(reg => reg.unregister()));
    console.log('[SW] All service workers unregistered');
  } catch (error) {
    console.error('[SW] Service worker unregistration failed:', error);
  }
};

/**
 * Check if service worker is active
 */
export const isServiceWorkerActive = (): boolean => {
  return !!(navigator.serviceWorker?.controller);
};

/**
 * Clear all caches (for debugging)
 */
export const clearAllCaches = async (): Promise<void> => {
  if (!('caches' in window)) return;

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('[Cache] All caches cleared');
  } catch (error) {
    console.error('[Cache] Failed to clear caches:', error);
  }
};
