import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Header } from "./components/Header";
import { Moon, Plane, Coffee } from "lucide-react";
import { motion } from "motion/react";
import { updateCriticalSeo, updateNonCriticalSeo, updateStructuredData, seoData } from "./utils/seo-manager";
import { addResourceHints } from "./utils/resource-hints";
import { initPerformanceMonitoring } from "./utils/performance-monitor";
import { initCacheManager } from "./utils/cache-manager";
import { registerServiceWorker } from "./utils/service-worker-registration";
import { initCriticalCSS } from "./utils/critical-css";
import { initResourcePrioritization, monitorLCP } from "./utils/resource-prioritization";
import { initErrorSuppression } from "./utils/error-suppression";

// Import cache debug tools in development
if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
  import('./utils/cache-debug');
}

// Initialize critical CSS and resource prioritization ASAP
if (typeof window !== 'undefined') {
  initCriticalCSS();
  initResourcePrioritization();
  initErrorSuppression(); // Suppress harmless third-party script errors
}

// Lazy load heavy components for better initial load performance
const SleepCalculator = lazy(() => import("./components/SleepCalculator").then(m => ({ default: m.SleepCalculator })));
const JetLagCalculator = lazy(() => import("./components/JetLagCalculator").then(m => ({ default: m.JetLagCalculator })));
const CaffeineSleepCalculator = lazy(() => import("./components/CaffeineSleepCalculator").then(m => ({ default: m.CaffeineSleepCalculator })));

// Lazy load below-the-fold components
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));
const FAQSection = lazy(() => import("./components/FAQSection").then(m => ({ default: m.FAQSection })));
const HowToSection = lazy(() => import("./components/HowToSection").then(m => ({ default: m.HowToSection })));
const QuickAnswers = lazy(() => import("./components/QuickAnswers").then(m => ({ default: m.QuickAnswers })));
const ComparisonTable = lazy(() => import("./components/ComparisonTable").then(m => ({ default: m.ComparisonTable })));
const SEOContent = lazy(() => import("./components/SEOContent").then(m => ({ default: m.SEOContent })));
const ScienceBackedContent = lazy(() => import("./components/ScienceBackedContent").then(m => ({ default: m.ScienceBackedContent })));
const BreadcrumbNav = lazy(() => import("./components/BreadcrumbNav").then(m => ({ default: m.BreadcrumbNav })));
const RelatedLinks = lazy(() => import("./components/RelatedLinks").then(m => ({ default: m.RelatedLinks })));
const CTASection = lazy(() => import("./components/CTASection").then(m => ({ default: m.CTASection })));
const Toaster = lazy(() => import("./components/ui/sonner").then(m => ({ default: m.Toaster })));
const ScrollToTop = lazy(() => import("./components/ScrollToTop").then(m => ({ default: m.ScrollToTop })));
const ScrollNav = lazy(() => import("./components/ScrollNav").then(m => ({ default: m.ScrollNav })));

export default function App() {
  // Check for initial section from static page generation
  const getInitialSection = (): "sleep" | "caffeine" | "jetlag" => {
    // Check if set by static page generation script
    if (typeof window !== 'undefined' && (window as any).__INITIAL_SECTION__) {
      return (window as any).__INITIAL_SECTION__;
    }
    // Fallback: detect from URL pathname
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('caffeine')) return 'caffeine';
      if (path.includes('jet-lag')) return 'jetlag';
    }
    return 'sleep';
  };
  
  const [activeSection, setActiveSection] = useState<
    "sleep" | "caffeine" | "jetlag"
  >(getInitialSection());
  
  // Refs for navigation buttons to track position for sliding animation
  const sleepRef = useRef<HTMLButtonElement>(null);
  const caffeineRef = useRef<HTMLButtonElement>(null);
  const jetlagRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Initialize performance optimizations and caching
  useEffect(() => {
    addResourceHints();
    initPerformanceMonitoring();
    initCacheManager();
    
    // Register service worker for offline support and faster repeat visits
    registerServiceWorker();
    
    // Monitor LCP in development
    if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
      monitorLCP();
    }
  }, []);

  // Defer ShareThis script to improve initial load performance
  useEffect(() => {
    // Delay loading ShareThis until page is fully loaded and idle
    const loadShareThis = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=69132fd3a804e14d4991f65b&product=sop';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => {
        setTimeout(loadShareThis, 3000);
      }, { timeout: 5000 });
      
      return () => {
        cancelIdleCallback(idleId);
      };
    } else {
      const timer = setTimeout(loadShareThis, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  // Defer Histats analytics to improve initial load performance
  useEffect(() => {
    // Delay loading Histats until page is fully loaded and idle
    const loadHistats = () => {
      // Initialize Histats variables
      (window as any)._Hasync = (window as any)._Hasync || [];
      (window as any)._Hasync.push(['Histats.start', '1,4990579,4,0,0,0,00010000']);
      (window as any)._Hasync.push(['Histats.fasi', '1']);
      (window as any)._Hasync.push(['Histats.track_hits', '']);
      
      // Load Histats script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//s10.histats.com/js15_as.js';
      script.async = true;
      script.defer = true;
      
      // Append to head or body
      const target = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
      if (target) {
        target.appendChild(script);
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    // Load even later than ShareThis to minimize performance impact
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => {
        setTimeout(loadHistats, 4000); // 4 seconds delay
      }, { timeout: 6000 });
      
      return () => {
        cancelIdleCallback(idleId);
      };
    } else {
      const timer = setTimeout(loadHistats, 5000); // 5 seconds fallback
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  // Optimized SEO - Updates critical meta tags immediately, defers non-critical ones
  useEffect(() => {
    const siteName = "EyeLoveSleep";
    const data = seoData[activeSection];
    
    // Update critical SEO immediately for fast initial render
    updateCriticalSeo(data, siteName);
    
    // Defer non-critical meta tags to improve performance
    updateNonCriticalSeo(data, siteName, activeSection);
    
    // Defer structured data to avoid blocking render
    updateStructuredData(data, siteName, activeSection);
  }, [activeSection]);

  // Update indicator position when active section changes
  useEffect(() => {
    const updateIndicator = () => {
      let activeRef;
      if (activeSection === "sleep") activeRef = sleepRef;
      else if (activeSection === "caffeine") activeRef = caffeineRef;
      else activeRef = jetlagRef;

      if (activeRef?.current) {
        const parent = activeRef.current.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const buttonRect = activeRef.current.getBoundingClientRect();
          setIndicatorStyle({
            left: buttonRect.left - parentRect.left,
            width: buttonRect.width,
          });
        }
      }
    };

    // Update immediately
    updateIndicator();

    // Update on resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  const handleLogoClick = () => {
    setActiveSection("sleep");
  };

  // Optimized loading placeholder with skeleton for better UX
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // Minimal skeleton for below-the-fold content
  const MinimalSkeleton = () => (
    <div className="h-20 bg-slate-800/20 animate-pulse rounded-lg"></div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] dark" itemScope itemType="https://schema.org/WebApplication">
      <Header onLogoClick={handleLogoClick} />

      <main className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6" role="main">
        {/* Breadcrumb Navigation */}
        <Suspense fallback={null}>
          <BreadcrumbNav section={activeSection} onNavigate={setActiveSection} />
        </Suspense>
        
        {/* Section Toggle */}
        <nav
          aria-label="Main navigation"
          className="flex justify-center mb-1 px-1 sm:px-2"
        >
          <div className="inline-flex relative bg-white/10 backdrop-blur-sm rounded-full p-0.5 sm:p-1 md:p-1.5 gap-0.5 sm:gap-1.5 md:gap-2 w-full sm:w-auto max-w-full overflow-x-auto">
            {/* Animated sliding indicator */}
            <motion.div
              className="absolute bg-white rounded-full shadow-lg"
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                height: "calc(100% - 0.25rem)",
                top: "0.125rem",
              }}
            />
            
            <button
              ref={sleepRef}
              onClick={() => setActiveSection("sleep")}
              className={`relative z-10 flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-colors whitespace-nowrap flex-1 sm:flex-initial justify-center ${
                activeSection === "sleep"
                  ? "text-[#0f172a]"
                  : "text-white/70 hover:text-white"
              }`}
              aria-label="Sleep Calculator"
              aria-current={
                activeSection === "sleep" ? "page" : undefined
              }
            >
              <Moon className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">Sleep Calculator</span>
            </button>
            <button
              ref={caffeineRef}
              onClick={() => setActiveSection("caffeine")}
              className={`relative z-10 flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-colors whitespace-nowrap flex-1 sm:flex-initial justify-center ${
                activeSection === "caffeine"
                  ? "text-[#0f172a]"
                  : "text-white/70 hover:text-white"
              }`}
              aria-label="Caffeine & Sleep Calculator"
              aria-current={
                activeSection === "caffeine" ? "page" : undefined
              }
            >
              <Coffee className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">Caffeine & Sleep</span>
            </button>
            <button
              ref={jetlagRef}
              onClick={() => setActiveSection("jetlag")}
              className={`relative z-10 flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-colors whitespace-nowrap flex-1 sm:flex-initial justify-center ${
                activeSection === "jetlag"
                  ? "text-[#0f172a]"
                  : "text-white/70 hover:text-white"
              }`}
              aria-label="Jet Lag Calculator"
              aria-current={
                activeSection === "jetlag" ? "page" : undefined
              }
            >
              <Plane className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">Jet Lag Calculator</span>
            </button>
          </div>
        </nav>

        {/* Scroll Navigation Menu */}
        <Suspense fallback={null}>
          <ScrollNav section={activeSection} />
        </Suspense>

        {/* Calculator Sections - Primary Content with Lazy Loading */}
        <Suspense fallback={<LoadingSpinner />}>
          {activeSection === "sleep" && <SleepCalculator />}
          {activeSection === "caffeine" && (
            <CaffeineSleepCalculator />
          )}
          {activeSection === "jetlag" && <JetLagCalculator />}
        </Suspense>

        {/* Below-the-fold content with lazy loading and content-visibility */}
        <div className="below-fold">
          <Suspense fallback={<MinimalSkeleton />}>
            {/* Quick Answers for Featured Snippets */}
            <QuickAnswers section={activeSection} />

            {/* Educational SEO Content */}
            <SEOContent section={activeSection} />

            {/* Science-Backed Research Content */}
            <ScienceBackedContent section={activeSection} />

            {/* How-To Section for Featured Snippets */}
            <HowToSection section={activeSection} />

            {/* Comparison Tables for Featured Snippets */}
            <ComparisonTable section={activeSection} />

            {/* FAQ Section for Featured Snippets */}
            <FAQSection section={activeSection} />

            {/* Call-to-Action Section */}
            <CTASection section={activeSection} onNavigate={setActiveSection} />

            {/* Related Links for Internal Linking */}
            <RelatedLinks currentSection={activeSection} onNavigate={setActiveSection} />
          </Suspense>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Scroll to top button */}
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>

      {/* Toast notifications */}
      <Suspense fallback={null}>
        <Toaster position="top-right" theme="dark" />
      </Suspense>
    </div>
  );
}