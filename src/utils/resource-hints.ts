/**
 * Add resource hints for faster loading of external resources
 * Call this early in the application lifecycle
 */

export const addResourceHints = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const resourceHints = [
    // Google AdSense
    { rel: 'preconnect', href: 'https://pagead2.googlesyndication.com', crossOrigin: true },
    { rel: 'preconnect', href: 'https://adservice.google.com', crossOrigin: true },
    { rel: 'preconnect', href: 'https://googleads.g.doubleclick.net', crossOrigin: true },
    { rel: 'dns-prefetch', href: 'https://pagead2.googlesyndication.com' },
    { rel: 'dns-prefetch', href: 'https://adservice.google.com' },
    { rel: 'dns-prefetch', href: 'https://googleads.g.doubleclick.net' },
    
    // ShareThis
    { rel: 'dns-prefetch', href: 'https://platform-api.sharethis.com' },
  ];

  // Check if hints already exist to avoid duplicates
  const existingHints = new Set(
    Array.from(document.head.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"]'))
      .map(link => link.getAttribute('href'))
  );

  resourceHints.forEach(({ rel, href, crossOrigin }) => {
    if (!existingHints.has(href)) {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (crossOrigin) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    }
  });
};
