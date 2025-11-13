import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { addResourceHints } from "./utils/resource-hints";
import { initPerformanceMonitoring } from "./utils/performance-monitor";
import { initCacheManager } from "./utils/cache-manager";
import { registerServiceWorker } from "./utils/service-worker-registration";
import { initCriticalCSS } from "./utils/critical-css";
import { initResourcePrioritization } from "./utils/resource-prioritization";
import { initErrorSuppression } from "./utils/error-suppression";

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
    }
  }, []);

  return (
    <HelmetProvider>
      <Router>
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
