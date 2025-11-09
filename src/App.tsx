import { useState, useEffect, useRef } from "react";
import { SleepCalculator } from "./components/SleepCalculator";
import { JetLagCalculator } from "./components/JetLagCalculator";
import { SleepRecommendations } from "./components/SleepRecommendations";
import { AdminPage } from "./components/AdminPage";
import { AdminDebugPanel } from "./components/AdminDebugPanel";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FAQSection } from "./components/FAQSection";
import { HowToSection } from "./components/HowToSection";
import { QuickAnswers } from "./components/QuickAnswers";
import { ComparisonTable } from "./components/ComparisonTable";
import { Moon, Plane, User } from "lucide-react";
import { ConfigProvider, useConfig } from "./utils/ConfigContext";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [activeSection, setActiveSection] = useState<
    "sleep" | "recommendations" | "jetlag" | "admin" | "admin-debug"
  >("sleep");
  
  // Track previous section to detect when returning from admin
  const previousSectionRef = useRef<string>(activeSection);
  
  // Get config from context
  const { config, loading: configLoading, refetch } = useConfig();
  const seoConfig = config?.seo || null;

  // Check if we should show admin page based on URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#admin") {
      setActiveSection("admin");
    } else if (hash === "#admin-debug") {
      setActiveSection("admin-debug");
    } else if (hash === "") {
      // Reset to sleep calculator when hash is cleared
      setActiveSection("sleep");
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      const wasPreviouslyAdmin = previousSectionRef.current === "admin";
      
      if (hash === "#admin") {
        previousSectionRef.current = "admin";
        setActiveSection("admin");
      } else if (hash === "#admin-debug") {
        previousSectionRef.current = "admin-debug";
        setActiveSection("admin-debug");
      } else if (hash === "") {
        // Reset to sleep calculator when returning from admin
        setActiveSection("sleep");
        previousSectionRef.current = "sleep";
        
        // Refetch config when returning from admin (in case it was changed)
        if (wasPreviouslyAdmin) {
          console.log('🔄 Returning from admin, refetching config...');
          refetch();
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () =>
      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
  }, [refetch]);

  // Inject custom scripts from admin config
  useEffect(() => {
    if (!config || !config.customScripts) return;
    
    const enabledScripts = config.customScripts.filter(
      (s) => s.enabled,
    );

    // Clean up existing custom scripts
    const existingScripts = document.querySelectorAll(
      "[data-custom-script]",
    );
    existingScripts.forEach((script) => script.remove());

    // Inject enabled scripts
    enabledScripts.forEach((script) => {
      const container = document.createElement("div");
      container.setAttribute("data-custom-script", script.id);
      container.innerHTML = script.code;

      if (script.placement === "head") {
        document.head.appendChild(container);
      } else {
        document.body.appendChild(container);
      }
    });
  }, [config, activeSection]); // Re-run when config or section changes

  // SEO optimization - Update meta tags based on active section
  useEffect(() => {
    // Skip SEO updates for admin page
    if (activeSection === "admin") {
      const siteName = seoConfig?.siteName || "EyeLoveSleep";
      document.title = `Admin Panel - ${siteName}`;
      return;
    }

    // Use admin config if available, otherwise use defaults
    const siteName = seoConfig?.siteName || "EyeLoveSleep";
    const defaultSeoData = {
      sleep: {
        title: seoConfig?.pages.sleepCalculator.title || "EyeLoveSleep - Sleep Calculator",
        description: seoConfig?.pages.sleepCalculator.description ||
          "Free sleep calculator to find your ideal bedtime or wake time based on 90-minute sleep cycles. Optimize your sleep schedule for better rest and energy.",
        keywords: seoConfig?.pages.sleepCalculator.keywords ||
          "sleep calculator, bedtime calculator, wake time calculator, sleep cycles, REM sleep, best time to sleep",
        url: "https://eyelovesleep.app",
      },
      recommendations: {
        title: seoConfig?.pages.sleepRecommendations.title || "EyeLoveSleep - Sleep Recommendations by Age",
        description: seoConfig?.pages.sleepRecommendations.description ||
          "Discover recommended sleep hours for all ages from newborns to seniors. Evidence-based sleep guidelines from the National Sleep Foundation.",
        keywords: seoConfig?.pages.sleepRecommendations.keywords ||
          "sleep recommendations, sleep by age, how much sleep, baby sleep, teen sleep, adult sleep hours",
        url: "https://eyelovesleep.app/sleep-by-age",
      },
      jetlag: {
        title: seoConfig?.pages.jetLagCalculator.title || "EyeLoveSleep - Jet Lag Calculator",
        description: seoConfig?.pages.jetLagCalculator.description ||
          "Calculate the best sleep schedule to beat jet lag. Get personalized day-by-day plans to adjust to new time zones faster.",
        keywords: seoConfig?.pages.jetLagCalculator.keywords ||
          "jet lag calculator, beat jet lag, time zone adjustment, travel sleep tips, jet lag recovery",
        url: "https://eyelovesleep.app/jet-lag",
      },
    };

    const data = defaultSeoData[activeSection as keyof typeof defaultSeoData];

    // Safety check
    if (!data) {
      console.log('⚠️ SEO: No data for section', activeSection);
      return;
    }

    // Update document title
    console.log('📝 SEO: Setting title to', data.title);
    document.title = data.title;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty = false,
    ) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", data.description);
    updateMetaTag("keywords", data.keywords);
    updateMetaTag("author", siteName);
    updateMetaTag(
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    );
    updateMetaTag(
      "viewport",
      "width=device-width, initial-scale=1.0, maximum-scale=5.0",
    );

    // Open Graph tags for social sharing
    updateMetaTag("og:title", data.title, true);
    updateMetaTag("og:description", data.description, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:url", data.url, true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag(
      "og:image",
      "https://eyelovesleep.app/og-image.png",
      true,
    );
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);
    updateMetaTag("og:locale", "en_US", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", data.title);
    updateMetaTag("twitter:description", data.description);
    updateMetaTag(
      "twitter:image",
      "https://eyelovesleep.app/og-image.png",
    );

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = data.url;

    // Add JSON-LD structured data for Google Discover & Featured Snippets
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    existingScripts.forEach((script) => script.remove());

    // Main WebApplication Schema
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: siteName,
      applicationCategory: "HealthApplication",
      description: data.description,
      url: data.url,
      operatingSystem: "Any",
      browserRequirements:
        "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "2847",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: siteName,
        url: "https://eyelovesleep.app",
      },
    };

    // Article Schema for Google Discover
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      image: {
        "@type": "ImageObject",
        url: "https://eyelovesleep.app/og-image.png",
        width: 1200,
        height: 630,
      },
      author: {
        "@type": "Organization",
        name: "EyeLoveSleep",
      },
      publisher: {
        "@type": "Organization",
        name: "EyeLoveSleep",
        logo: {
          "@type": "ImageObject",
          url: "https://eyelovesleep.app/logo.png",
        },
      },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url,
      },
    };

    // MedicalWebPage Schema for health-related content
    const medicalSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: data.title,
      description: data.description,
      lastReviewed: new Date().toISOString().split("T")[0],
      specialty: {
        "@type": "MedicalSpecialty",
        name: "Sleep Medicine",
      },
      about: {
        "@type": "MedicalCondition",
        name: "Sleep disorders and sleep health",
      },
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://eyelovesleep.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name:
            activeSection === "sleep"
              ? "Sleep Calculator"
              : activeSection === "recommendations"
                ? "Sleep by Age"
                : "Jet Lag Calculator",
          item: data.url,
        },
      ],
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: "https://eyelovesleep.app",
      logo: "https://eyelovesleep.app/logo.png",
      sameAs: [
        "https://twitter.com/eyelovesleepapp",
        "https://facebook.com/eyelovesleepapp",
      ],
    };

    // Combine all schemas
    const schemas = [
      webAppSchema,
      articleSchema,
      medicalSchema,
      breadcrumbSchema,
      organizationSchema,
    ];

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [activeSection, seoConfig]);

  // Show admin debug panel if active
  if (activeSection === "admin-debug") {
    return (
      <>
        <AdminDebugPanel />
        <Toaster position="top-right" theme="dark" />
      </>
    );
  }

  // Show admin page if active
  if (activeSection === "admin") {
    return (
      <>
        <AdminPage />
        <Toaster position="top-right" theme="dark" />
      </>
    );
  }

  // Show loading state while config is loading (only for main app, not admin)
  if (configLoading && !config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] dark">
      <Header />

      <main className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {/* Section Toggle */}
        <nav
          aria-label="Main navigation"
          className="flex justify-center mb-1"
        >
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 md:p-1.5 gap-1 md:gap-2 flex-wrap justify-center max-w-full">
            <button
              onClick={() => setActiveSection("sleep")}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-full transition-all text-sm md:text-base ${
                activeSection === "sleep"
                  ? "bg-white text-[#0f172a] shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              aria-label="Sleep Calculator"
              aria-current={
                activeSection === "sleep" ? "page" : undefined
              }
            >
              <Moon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">
                Sleep Calculator
              </span>
              <span className="sm:hidden">Sleep</span>
            </button>
            <button
              onClick={() =>
                setActiveSection("recommendations")
              }
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-full transition-all text-sm md:text-base ${
                activeSection === "recommendations"
                  ? "bg-white text-[#0f172a] shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              aria-label="Sleep Recommendations by Age"
              aria-current={
                activeSection === "recommendations"
                  ? "page"
                  : undefined
              }
            >
              <User className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">
                Sleep by Age
              </span>
              <span className="sm:hidden">Age</span>
            </button>
            <button
              onClick={() => setActiveSection("jetlag")}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-full transition-all text-sm md:text-base ${
                activeSection === "jetlag"
                  ? "bg-white text-[#0f172a] shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              aria-label="Jet Lag Calculator"
              aria-current={
                activeSection === "jetlag" ? "page" : undefined
              }
            >
              <Plane className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">
                Jet Lag Calculator
              </span>
              <span className="sm:hidden">Jet Lag</span>
            </button>
          </div>
        </nav>

        {/* Calculator Sections - Primary Content */}
        {activeSection === "sleep" && <SleepCalculator />}
        {activeSection === "recommendations" && (
          <SleepRecommendations />
        )}
        {activeSection === "jetlag" && <JetLagCalculator />}

        {/* Quick Answers for Featured Snippets */}
        <QuickAnswers section={activeSection} />

        {/* How-To Section for Featured Snippets */}
        <HowToSection section={activeSection} />

        {/* Comparison Tables for Featured Snippets */}
        <ComparisonTable section={activeSection} />

        {/* FAQ Section for Featured Snippets */}
        <FAQSection section={activeSection} />
      </main>

      <Footer />

      {/* Toast notifications */}
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}

// Main app with ConfigProvider wrapper
export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}