/**
 * Performance utilities for optimizing page load speed
 */

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preconnect to external domains
  const domains = [
    'https://pagead2.googlesyndication.com',
    'https://adservice.google.com',
    'https://googleads.g.doubleclick.net',
  ];

  domains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Also add dns-prefetch as fallback
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = domain;
    document.head.appendChild(dnsPrefetch);
  });
};

/**
 * Defer non-critical scripts
 */
export const deferNonCriticalScripts = (callback: () => void, delay: number = 3000) => {
  if (typeof window === 'undefined') return;

  // Wait for page to be interactive
  if (document.readyState === 'complete') {
    setTimeout(callback, delay);
  } else {
    window.addEventListener('load', () => {
      setTimeout(callback, delay);
    });
  }
};

/**
 * Optimize images with lazy loading attributes
 */
export const optimizeImage = (src: string, alt: string = '') => {
  return {
    src,
    alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Request idle callback wrapper with fallback
 */
export const requestIdleCallbackPolyfill = (callback: () => void) => {
  if (typeof window === 'undefined') return;

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
};
