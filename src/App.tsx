import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { addResourceHints } from "./utils/resource-hints";
import { initPerformanceMonitoring } from "./utils/performance-monitor";
import { initCacheManager } from "./utils/cache-manager";
import { registerServiceWorker } from "./utils/service-worker-registration";
import { initCriticalCSS } from "./utils/critical-css";
import { initResourcePrioritization } from "./utils/resource-prioritization";
import { initErrorSuppression } from "./utils/error-suppression";
import { setupAutoIndexNow } from "./utils/indexnow";

// Import cache debug tools in development
if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
  import('./utils/cache-debug');
}

// Initialize critical CSS and resource prioritization ASAP
if (typeof window !== 'undefined') {
  initCriticalCSS();
  initResourcePrioritization();
  initErrorSuppression();
}

// Lazy load page components
const SleepCalculatorPage = lazy(() => import("./pages/SleepCalculatorPage"));
const CaffeineSleepPage = lazy(() => import("./pages/CaffeineSleepPage"));
const JetLagPage = lazy(() => import("./pages/JetLagPage"));

// Lazy load Toaster for toast notifications
const Toaster = lazy(() => import("./components/ui/sonner").then(m => ({ default: m.Toaster })));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white/70">Loading...</p>
      </div>
    </div>
  );
}

// Google Analytics page view tracker for SPA
function GoogleAnalyticsTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Load GA config script once when app mounts
    const loadGAConfig = () => {
      if (document.querySelector('script[src="/ga-config.js"]')) {
        return; // Already loaded
      }
      
      const script = document.createElement('script');
      script.src = '/ga-config.js';
      script.async = true;
      document.head.appendChild(script);
    };
    
    // Load GA after a short delay to not block initial render
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGAConfig, { timeout: 2000 });
    } else {
      setTimeout(loadGAConfig, 2000);
    }
  }, []);
  
  useEffect(() => {
    // Track page views on route change
    // Wait for gtag to be available
    const trackPageView = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_path: location.pathname + location.search,
          page_location: window.location.href,
          page_title: document.title
        });
        
        if (import.meta.env?.DEV) {
          console.log('📊 GA Page View:', location.pathname);
        }
      } else {
        // GA not loaded yet, try again in 1 second
        setTimeout(trackPageView, 1000);
      }
    };
    
    trackPageView();
  }, [location]);
  
  return null;
}

export default function App() {
  useEffect(() => {
    // Initialize performance monitoring
    if (typeof window !== 'undefined') {
      // Add resource hints for critical resources
      addResourceHints();
      
      // Initialize performance monitoring
      initPerformanceMonitoring();
      
      // Initialize cache manager
      initCacheManager();
      
      // Register service worker for offline support and caching
      registerServiceWorker();
      
      // Setup IndexNow for instant search engine indexing
      setupAutoIndexNow();
      
      // Load analytics and share scripts after page is interactive (deferred for performance)
      loadThirdPartyScripts();
    }
  }, []);

  // Load third-party scripts (analytics & social sharing) after page is interactive
  const loadThirdPartyScripts = () => {
    // Use requestIdleCallback for optimal performance - loads when browser is idle
    const loadScripts = () => {
      // Load Histats Analytics
      loadHistatsAnalytics();
      
      // Load ShareThis social sharing buttons
      loadShareThisButtons();
    };

    // Load after 5 seconds when browser is idle (no performance impact)
    // Increased delay to improve LCP and FCP scores
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setTimeout(loadScripts, 5000);
      }, { timeout: 8000 });
    } else {
      // Fallback for older browsers
      setTimeout(loadScripts, 6000);
    }
  };

  // Histats Analytics - Performance optimized
  const loadHistatsAnalytics = () => {
    try {
      // Initialize Histats variables
      (window as any)._Hasync = (window as any)._Hasync || [];
      (window as any)._Hasync.push(['Histats.start', '1,4990579,4,0,0,0,00010000']);
      (window as any)._Hasync.push(['Histats.fasi', '1']);
      (window as any)._Hasync.push(['Histats.track_hits', '']);
      
      // Create and load script asynchronously
      const script = document.createElement('script');
      script.src = '//s10.histats.com/js15_as.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      if (import.meta.env?.DEV) {
        console.log('✅ Histats Analytics loaded (deferred)');
      }
    } catch (error) {
      if (import.meta.env?.DEV) {
        console.warn('Histats Analytics failed to load:', error);
      }
    }
  };

  // ShareThis Social Sharing Buttons - Performance optimized
  const loadShareThisButtons = () => {
    try {
      // Create and load ShareThis script asynchronously
      const script = document.createElement('script');
      script.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=67345a6c3e563f00197169d2&product=inline-share-buttons&source=platform';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      if (import.meta.env?.DEV) {
        console.log('✅ ShareThis buttons loaded (deferred)');
      }
    } catch (error) {
      if (import.meta.env?.DEV) {
        console.warn('ShareThis buttons failed to load:', error);
      }
    }
  };

  return (
    <HelmetProvider>
      <Router>
        <GoogleAnalyticsTracker />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<SleepCalculatorPage />} />
            <Route path="/caffeine-sleep" element={<CaffeineSleepPage />} />
            <Route path="/jet-lag" element={<JetLagPage />} />
            {/* Fallback route */}
            <Route path="*" element={<SleepCalculatorPage />} />
          </Routes>
          <Toaster />
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
