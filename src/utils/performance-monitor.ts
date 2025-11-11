/**
 * Performance Monitoring Utilities
 * Track and log Core Web Vitals
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Log Core Web Vitals to console (in development)
 * In production, you could send these to an analytics service
 */
export const logWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Check if PerformanceObserver is supported
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        
        console.log('🎨 LCP (Largest Contentful Paint):', {
          value: `${lcp.toFixed(0)}ms`,
          rating: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor',
          target: '< 2500ms'
        });
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          
          console.log('⚡ FID (First Input Delay):', {
            value: `${fid.toFixed(0)}ms`,
            rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor',
            target: '< 100ms'
          });
        });
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        
        console.log('📏 CLS (Cumulative Layout Shift):', {
          value: clsValue.toFixed(3),
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
          target: '< 0.1'
        });
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // CLS not supported
    }
  }

  // Navigation Timing (fallback for older browsers)
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log('📊 Performance Timing:', {
        'Total Page Load': `${pageLoadTime}ms`,
        'Server Response': `${connectTime}ms`,
        'DOM Render': `${renderTime}ms`,
      });
    }, 0);
  });
};

/**
 * Check if page is being served from cache
 */
export const checkCacheStatus = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    
    if (perfEntries.length > 0) {
      const navTiming = perfEntries[0];
      const cacheStatus = navTiming.transferSize === 0 ? 'cache' : 
                         navTiming.transferSize < 1000 ? 'cache (with validation)' : 
                         'network';
      
      console.log('💾 Cache Status:', cacheStatus);
    }
  });
};

/**
 * Initialize performance monitoring
 * Call this once when the app starts
 */
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Performance Monitoring Enabled');
    logWebVitals();
    checkCacheStatus();
  }
};
