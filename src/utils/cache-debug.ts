/**
 * Cache Debugging Utilities
 * Helper functions to inspect and debug caching in development
 */

import { cacheManager } from './cache-manager';
import { clearAllCaches, isServiceWorkerActive } from './service-worker-registration';

/**
 * Get comprehensive cache statistics
 */
export const getCacheStats = async () => {
  const stats = {
    serviceWorker: {
      active: isServiceWorkerActive(),
      controller: navigator.serviceWorker?.controller?.scriptURL || 'None',
      registrations: 0,
    },
    localStorage: {
      size: 0,
      sizeFormatted: '0 B',
      keys: [] as string[],
    },
    cacheStorage: {
      caches: [] as string[],
      totalSize: 0,
      totalSizeFormatted: '0 B',
      entries: {} as Record<string, number>,
    },
  };

  // Service Worker info
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    stats.serviceWorker.registrations = registrations.length;
  }

  // localStorage info
  try {
    const localStorageSize = cacheManager.getSize();
    stats.localStorage.size = localStorageSize;
    stats.localStorage.sizeFormatted = formatBytes(localStorageSize);
    
    const keys = Object.keys(localStorage);
    stats.localStorage.keys = keys.filter(k => k.startsWith('eyelovesleep_'));
  } catch (error) {
    console.warn('Failed to get localStorage stats:', error);
  }

  // Cache Storage info
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      stats.cacheStorage.caches = cacheNames;

      let totalSize = 0;
      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        stats.cacheStorage.entries[cacheName] = requests.length;

        // Estimate size (approximate)
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      stats.cacheStorage.totalSize = totalSize;
      stats.cacheStorage.totalSizeFormatted = formatBytes(totalSize);
    } catch (error) {
      console.warn('Failed to get cache storage stats:', error);
    }
  }

  return stats;
};

/**
 * Print cache statistics to console
 */
export const printCacheStats = async () => {
  const stats = await getCacheStats();
  
  console.group('🗄️ Cache Statistics');
  
  console.group('⚙️ Service Worker');
  console.log('Active:', stats.serviceWorker.active ? '✅' : '❌');
  console.log('Controller:', stats.serviceWorker.controller);
  console.log('Registrations:', stats.serviceWorker.registrations);
  console.groupEnd();

  console.group('💾 localStorage');
  console.log('Size:', stats.localStorage.sizeFormatted);
  console.log('Keys:', stats.localStorage.keys);
  console.groupEnd();

  console.group('📦 Cache Storage');
  console.log('Total Size:', stats.cacheStorage.totalSizeFormatted);
  console.log('Caches:', stats.cacheStorage.caches);
  console.table(stats.cacheStorage.entries);
  console.groupEnd();

  console.groupEnd();

  return stats;
};

/**
 * Clear all caches and reload
 */
export const resetAllCaches = async () => {
  console.log('🧹 Clearing all caches...');
  
  // Clear service worker caches
  await clearAllCaches();
  
  // Clear localStorage
  cacheManager.clearAll();
  
  // Clear session storage
  sessionStorage.clear();
  
  console.log('✅ All caches cleared!');
  console.log('🔄 Reloading page...');
  
  // Hard reload
  window.location.reload();
};

/**
 * Get performance metrics
 */
export const getPerformanceMetrics = () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) {
    console.warn('Performance navigation timing not available');
    return null;
  }

  const metrics = {
    dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
    tcp: Math.round(navigation.connectEnd - navigation.connectStart),
    request: Math.round(navigation.responseStart - navigation.requestStart),
    response: Math.round(navigation.responseEnd - navigation.responseStart),
    dom: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
    load: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
    total: Math.round(navigation.loadEventEnd - navigation.fetchStart),
  };

  return metrics;
};

/**
 * Print performance metrics
 */
export const printPerformanceMetrics = () => {
  const metrics = getPerformanceMetrics();
  
  if (!metrics) return;

  console.group('⚡ Performance Metrics');
  console.log('DNS Lookup:', `${metrics.dns}ms`);
  console.log('TCP Connection:', `${metrics.tcp}ms`);
  console.log('Request:', `${metrics.request}ms`);
  console.log('Response:', `${metrics.response}ms`);
  console.log('DOM Processing:', `${metrics.dom}ms`);
  console.log('Load Event:', `${metrics.load}ms`);
  console.log('─────────────────────');
  console.log('Total:', `${metrics.total}ms`);
  console.groupEnd();

  return metrics;
};

/**
 * Get cached resources list
 */
export const getCachedResources = async () => {
  if (!('caches' in window)) {
    console.warn('Cache Storage API not available');
    return [];
  }

  const resources: Array<{ cache: string; url: string; type: string }> = [];

  try {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const url = new URL(request.url);
        const type = getResourceType(url.pathname);
        
        resources.push({
          cache: cacheName,
          url: request.url,
          type,
        });
      }
    }
  } catch (error) {
    console.error('Failed to get cached resources:', error);
  }

  return resources;
};

/**
 * Print cached resources grouped by type
 */
export const printCachedResources = async () => {
  const resources = await getCachedResources();
  
  if (resources.length === 0) {
    console.log('No cached resources found');
    return;
  }

  const grouped = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource.url);
    return acc;
  }, {} as Record<string, string[]>);

  console.group('📋 Cached Resources');
  Object.entries(grouped).forEach(([type, urls]) => {
    console.group(`${type} (${urls.length})`);
    urls.forEach(url => console.log(url));
    console.groupEnd();
  });
  console.groupEnd();

  return grouped;
};

/**
 * Helper: Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Helper: Determine resource type from URL
 */
function getResourceType(pathname: string): string {
  if (pathname.match(/\.(js|jsx|ts|tsx)$/)) return 'JavaScript';
  if (pathname.match(/\.(css)$/)) return 'CSS';
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)) return 'Image';
  if (pathname.match(/\.(woff|woff2|ttf|otf|eot)$/)) return 'Font';
  if (pathname.match(/\.(html?)$/)) return 'HTML';
  if (pathname.match(/\.(json)$/)) return 'JSON';
  return 'Other';
}

/**
 * Add debug commands to window object for easy console access
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).cacheDebug = {
    stats: getCacheStats,
    print: printCacheStats,
    reset: resetAllCaches,
    performance: printPerformanceMetrics,
    resources: printCachedResources,
  };

  console.log(
    '%c💡 Cache Debug Available',
    'background: #4f86f7; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
  );
  console.log('Use window.cacheDebug for debugging:');
  console.log('  • cacheDebug.print() - Show cache stats');
  console.log('  • cacheDebug.performance() - Show performance metrics');
  console.log('  • cacheDebug.resources() - List cached resources');
  console.log('  • cacheDebug.reset() - Clear all caches and reload');
}

export default {
  getCacheStats,
  printCacheStats,
  resetAllCaches,
  getPerformanceMetrics,
  printPerformanceMetrics,
  getCachedResources,
  printCachedResources,
};
