/**
 * Advanced Resource Prioritization
 * Optimizes loading order and priority for maximum performance
 */

/**
 * Preload critical resources with high priority
 */
export const preloadCriticalResources = (): void => {
  if (typeof document === 'undefined') return;

  const preloads = [
    // Critical font - Inter Regular
    {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      crossorigin: 'anonymous',
      fetchpriority: 'high'
    },
  ];

  preloads.forEach(attrs => {
    // Check if already exists
    const existing = document.head.querySelector(`link[href="${attrs.href}"]`);
    if (existing) return;

    const link = document.createElement('link');
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'crossorigin') {
        link.setAttribute(key, value as string);
      } else if (key === 'fetchpriority') {
        link.setAttribute('fetchpriority', value as string);
      } else {
        (link as any)[key] = value;
      }
    });
    
    document.head.appendChild(link);
  });
};

/**
 * Add fetchpriority hints to existing resources
 */
export const optimizeResourcePriority = (): void => {
  if (typeof document === 'undefined') return;

  // High priority for LCP image if exists
  const lcpImage = document.querySelector('img:first-of-type');
  if (lcpImage) {
    lcpImage.setAttribute('fetchpriority', 'high');
    lcpImage.setAttribute('loading', 'eager'); // Don't lazy load LCP
  }

  // Low priority for below-the-fold images
  const images = document.querySelectorAll('img:not(:first-of-type)');
  images.forEach((img, index) => {
    if (index > 2) { // After first 3 images
      img.setAttribute('fetchpriority', 'low');
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    }
  });
};

/**
 * Defer non-critical scripts
 */
export const deferNonCriticalScripts = (): void => {
  if (typeof document === 'undefined') return;

  const scripts = document.querySelectorAll('script[src]');
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    
    // Skip critical scripts
    if (!src || src.includes('vite') || src.includes('app')) return;
    
    // Defer third-party scripts
    if (src.includes('google') || src.includes('sharethis') || src.includes('gstatic')) {
      script.setAttribute('defer', 'true');
      script.setAttribute('async', 'true');
    }
  });
};

/**
 * Reduce third-party impact
 */
export const minimizeThirdPartyImpact = (): void => {
  if (typeof document === 'undefined') return;

  // Defer Google AdSense further
  const adsenseScripts = document.querySelectorAll('script[src*="adsbygoogle"]');
  adsenseScripts.forEach(script => {
    const parent = script.parentElement;
    if (parent) {
      parent.removeChild(script);
      
      // Re-add after delay
      setTimeout(() => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('src') || '';
        newScript.async = true;
        newScript.defer = true;
        document.head.appendChild(newScript);
      }, 5000); // 5 second delay
    }
  });
};

/**
 * Optimize CSS delivery
 */
export const optimizeCSSDelivery = (): void => {
  if (typeof document === 'undefined') return;

  // Make non-critical stylesheets async
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((link, index) => {
    // Keep first stylesheet (critical) synchronous
    if (index === 0) return;
    
    // Make others async
    const href = link.getAttribute('href');
    if (href && !href.includes('globals')) {
      link.setAttribute('media', 'print');
      link.addEventListener('load', function onLoad() {
        this.setAttribute('media', 'all');
        this.removeEventListener('load', onLoad);
      });
    }
  });
};

/**
 * Break up long tasks using requestIdleCallback
 */
export const breakUpLongTasks = <T extends (...args: any[]) => any>(
  tasks: T[],
  callback?: () => void
): void => {
  if (typeof requestIdleCallback === 'undefined') {
    // Fallback for browsers without requestIdleCallback
    tasks.forEach(task => task());
    callback?.();
    return;
  }

  let currentIndex = 0;

  function processTasks(deadline: IdleDeadline) {
    while (deadline.timeRemaining() > 0 && currentIndex < tasks.length) {
      tasks[currentIndex]();
      currentIndex++;
    }

    if (currentIndex < tasks.length) {
      requestIdleCallback(processTasks);
    } else {
      callback?.();
    }
  }

  requestIdleCallback(processTasks);
};

/**
 * Reduce JavaScript execution time
 */
export const optimizeJavaScriptExecution = (): void => {
  // Use passive event listeners for better scroll performance
  if (typeof window !== 'undefined') {
    const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
    
    passiveEvents.forEach(eventName => {
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      
      EventTarget.prototype.addEventListener = function(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
      ) {
        if (passiveEvents.includes(type)) {
          const opts = typeof options === 'object' ? options : {};
          opts.passive = opts.passive !== false; // Default to passive
          return originalAddEventListener.call(this, type, listener, opts);
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });
  }
};

/**
 * Implement resource prioritization
 */
export const initResourcePrioritization = (): void => {
  // Immediate: Preload critical resources
  preloadCriticalResources();
  
  // On DOMContentLoaded: Optimize priorities
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeResourcePriority();
      deferNonCriticalScripts();
      optimizeCSSDelivery();
    });
  } else {
    optimizeResourcePriority();
    deferNonCriticalScripts();
    optimizeCSSDelivery();
  }
  
  // After load: Minimize third-party impact
  window.addEventListener('load', () => {
    requestIdleCallback(() => {
      minimizeThirdPartyImpact();
    });
  });
  
  // Optimize JavaScript execution
  optimizeJavaScriptExecution();
};

/**
 * Monitor and log Largest Contentful Paint
 */
export const monitorLCP = (): void => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      console.log('🎯 LCP:', {
        time: `${lastEntry.renderTime || lastEntry.loadTime}ms`,
        element: lastEntry.element?.tagName,
        size: lastEntry.size,
        url: lastEntry.url
      });
      
      // Stop observing after final LCP
      observer.disconnect();
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Silently fail if LCP observation is not supported
  }
};

// Auto-init in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  initResourcePrioritization();
}
