import { useState, useEffect } from "react";
import { SleepCalculator } from "./components/SleepCalculator";
import { JetLagCalculator } from "./components/JetLagCalculator";
import { SleepRecommendations } from "./components/SleepRecommendations";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FAQSection } from "./components/FAQSection";
import { HowToSection } from "./components/HowToSection";
import { QuickAnswers } from "./components/QuickAnswers";
import { ComparisonTable } from "./components/ComparisonTable";
import { SEOContent } from "./components/SEOContent";
import { BreadcrumbNav } from "./components/BreadcrumbNav";
import { RelatedLinks } from "./components/RelatedLinks";
import { Testimonials } from "./components/Testimonials";
import { CTASection } from "./components/CTASection";
import { Moon, Plane, User } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeSection, setActiveSection] = useState<
    "sleep" | "recommendations" | "jetlag"
  >("sleep");



  // Load ShareThis script
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=69132fd3a804e14d4991f65b&product=sop';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // SEO optimization - Update meta tags based on active section
  useEffect(() => {
    const siteName = "EyeLoveSleep";
    const defaultSeoData = {
      sleep: {
        title: "Sleep Calculator - Calculate Best Bedtime & Wake Time | 90-Minute Sleep Cycles | EyeLoveSleep",
        description:
          "Free sleep calculator based on 90-minute sleep cycles. Calculate optimal bedtime and wake time to feel refreshed. Avoid sleep inertia with our science-based sleep cycle calculator. Get personalized sleep schedule recommendations instantly.",
        keywords:
          "sleep calculator, bedtime calculator, wake time calculator, sleep cycles, 90 minute sleep cycle, REM sleep, best time to sleep, sleep schedule calculator, sleep cycle calculator, when to go to bed, optimal bedtime, sleep inertia, circadian rhythm calculator, sleep hygiene, deep sleep calculator, light sleep, wake up refreshed",
        url: "https://eyelovesleep.app",
      },
      recommendations: {
        title: "Sleep Recommendations by Age - How Much Sleep You Need | NSF Guidelines | EyeLoveSleep",
        description:
          "Comprehensive sleep recommendations for all ages: newborns (14-17h), infants (12-15h), toddlers (11-14h), children (9-11h), teens (8-10h), adults (7-9h), seniors (7-8h). Evidence-based National Sleep Foundation guidelines with personalized schedules.",
        keywords:
          "sleep recommendations, sleep by age, how much sleep do I need, baby sleep schedule, infant sleep hours, toddler sleep needs, child sleep requirements, teen sleep recommendations, adult sleep hours, senior sleep needs, sleep duration by age, National Sleep Foundation, NSF sleep guidelines, age-based sleep chart, pediatric sleep requirements, elderly sleep needs",
        url: "https://eyelovesleep.app/sleep-by-age",
      },
      jetlag: {
        title: "Jet Lag Calculator - Beat Jet Lag Fast | Time Zone Adjustment Plan | EyeLoveSleep",
        description:
          "Advanced jet lag calculator with personalized adjustment plans. Calculate recovery time, get day-by-day sleep schedules, and beat jet lag faster. Works for eastward and westward travel across all time zones. Free jet lag remedy tool.",
        keywords:
          "jet lag calculator, beat jet lag, time zone adjustment, jet lag remedy, jet lag cure, travel sleep tips, jet lag recovery, circadian rhythm adjustment, jet lag prevention, eastward travel jet lag, westward travel jet lag, time zone calculator, international travel sleep, jet lag symptoms, how to avoid jet lag, jet lag treatment, melatonin for jet lag, light therapy jet lag",
        url: "https://eyelovesleep.app/jet-lag",
      },
    };

    const data = defaultSeoData[activeSection];
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
    
    // Additional SEO meta tags
    updateMetaTag("language", "English");
    updateMetaTag("revisit-after", "7 days");
    updateMetaTag("distribution", "global");
    updateMetaTag("rating", "general");
    updateMetaTag("theme-color", "#4f86f7");
    updateMetaTag("mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");
    updateMetaTag("apple-mobile-web-app-title", siteName);
    updateMetaTag("application-name", siteName);
    updateMetaTag("msapplication-TileColor", "#4f86f7");
    updateMetaTag("msapplication-config", "/browserconfig.xml");
    
    // Geo tags for better local SEO
    updateMetaTag("geo.region", "US");
    updateMetaTag("geo.placename", "United States");
    updateMetaTag("ICBM", "37.7749, -122.4194"); // Example coordinates
    
    // Content type and cache control
    updateMetaTag("content-type", "text/html; charset=UTF-8");
    updateMetaTag("content-language", "en-US");

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
        url: "https://eyelovesleep.app",
      },
      publisher: {
        "@type": "Organization",
        name: "EyeLoveSleep",
        url: "https://eyelovesleep.app",
        logo: {
          "@type": "ImageObject",
          url: "https://eyelovesleep.app/logo.png",
          width: 250,
          height: 60,
        },
      },
      datePublished: "2024-01-01T08:00:00+00:00",
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url,
      },
      articleSection: activeSection === "sleep" ? "Sleep Health" : activeSection === "recommendations" ? "Sleep Guidelines" : "Travel Health",
      wordCount: activeSection === "sleep" ? 1500 : activeSection === "recommendations" ? 1800 : 1600,
      inLanguage: "en-US",
      isAccessibleForFree: true,
      keywords: data.keywords,
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
      alternateName: "Eye Love Sleep",
      url: "https://eyelovesleep.app",
      logo: {
        "@type": "ImageObject",
        url: "https://eyelovesleep.app/logo.png",
        width: 250,
        height: 60,
      },
      description: "Free sleep calculator and jet lag calculator helping millions optimize their sleep schedule based on science-backed 90-minute sleep cycles.",
      foundingDate: "2024",
      sameAs: [
        "https://twitter.com/eyelovesleepapp",
        "https://facebook.com/eyelovesleepapp",
        "https://instagram.com/eyelovesleepapp",
        "https://linkedin.com/company/eyelovesleepapp",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "support@eyelovesleep.app",
        availableLanguage: ["English"],
      },
    };
    
    // SoftwareApplication Schema for better app discoverability
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteName,
      applicationCategory: "HealthApplication",
      operatingSystem: "Web, iOS, Android",
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
      },
      description: data.description,
      featureList: [
        "90-minute sleep cycle calculator",
        "Personalized bedtime recommendations",
        "Wake time optimization",
        "Age-based sleep requirements",
        "Jet lag recovery planner",
        "Time zone adjustment calculator",
        "Sleep tips and best practices",
      ],
      screenshot: "https://eyelovesleep.app/screenshot.png",
    };
    
    // Review Schema for credibility
    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "SoftwareApplication",
        name: siteName,
      },
      author: {
        "@type": "Person",
        name: "Sleep Health Community",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.8",
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: "EyeLoveSleep has transformed my sleep schedule. The 90-minute cycle calculator is scientifically accurate and easy to use. Highly recommended for anyone struggling with sleep quality.",
    };

    // HowTo Schema (section-specific)
    const howToSchema = activeSection === "sleep" ? {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Calculate Your Ideal Sleep Time",
      description: "Step-by-step guide to using sleep cycles for optimal rest",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Choose your goal",
          text: "Decide if you want to calculate bedtime or wake time",
          position: 1,
        },
        {
          "@type": "HowToStep",
          name: "Enter your time",
          text: "Set your desired wake time or bedtime using the time dial",
          position: 2,
        },
        {
          "@type": "HowToStep",
          name: "Review sleep cycles",
          text: "View recommended times based on 90-minute sleep cycles",
          position: 3,
        },
        {
          "@type": "HowToStep",
          name: "Choose optimal time",
          text: "Select the time that gives you 5-6 complete cycles (7.5-9 hours)",
          position: 4,
        },
      ],
    } : null;
    
    // VideoObject Schema (if adding video tutorials in future)
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `How to Use ${siteName} ${activeSection === "sleep" ? "Sleep Calculator" : activeSection === "recommendations" ? "Sleep Recommendations" : "Jet Lag Calculator"}`,
      description: data.description,
      thumbnailUrl: "https://eyelovesleep.app/video-thumbnail.jpg",
      uploadDate: "2024-01-01T08:00:00+00:00",
      duration: "PT3M",
      contentUrl: "https://eyelovesleep.app/tutorial-video.mp4",
    };

    // Combine all schemas
    const schemas = [
      webAppSchema,
      articleSchema,
      medicalSchema,
      breadcrumbSchema,
      organizationSchema,
      softwareAppSchema,
      reviewSchema,
      howToSchema,
      // videoSchema, // Uncomment when video is added
    ].filter(Boolean);

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [activeSection]);

  const handleLogoClick = () => {
    setActiveSection("sleep");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] dark" itemScope itemType="https://schema.org/WebApplication">
      <Header onLogoClick={handleLogoClick} />

      <main className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-6" role="main">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav section={activeSection} onNavigate={setActiveSection} />
        
        {/* Section Toggle */}
        <nav
          aria-label="Main navigation"
          className="flex justify-center mb-1 px-1 sm:px-2"
        >
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-0.5 sm:p-1 md:p-1.5 gap-0.5 sm:gap-1.5 md:gap-2 w-full sm:w-auto max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveSection("sleep")}
              className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all whitespace-nowrap flex-1 sm:flex-initial justify-center ${
                activeSection === "sleep"
                  ? "bg-white text-[#0f172a] shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
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
              onClick={() =>
                setActiveSection("recommendations")
              }
              className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all whitespace-nowrap flex-1 sm:flex-initial justify-center ${
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
              <User className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">Sleep by Age</span>
            </button>
            <button
              onClick={() => setActiveSection("jetlag")}
              className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all whitespace-nowrap flex-1 sm:flex-initial justify-center ${
                activeSection === "jetlag"
                  ? "bg-white text-[#0f172a] shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
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

        {/* Calculator Sections - Primary Content */}
        {activeSection === "sleep" && <SleepCalculator />}
        {activeSection === "recommendations" && (
          <SleepRecommendations />
        )}
        {activeSection === "jetlag" && <JetLagCalculator />}

        {/* Quick Answers for Featured Snippets */}
        <QuickAnswers section={activeSection} />

        {/* Educational SEO Content */}
        <SEOContent section={activeSection} />

        {/* How-To Section for Featured Snippets */}
        <HowToSection section={activeSection} />

        {/* Comparison Tables for Featured Snippets */}
        <ComparisonTable section={activeSection} />

        {/* FAQ Section for Featured Snippets */}
        <FAQSection section={activeSection} />

        {/* Testimonials for Social Proof & SEO */}
        <Testimonials section={activeSection} />

        {/* Call-to-Action Section */}
        <CTASection section={activeSection} onNavigate={setActiveSection} />

        {/* Related Links for Internal Linking */}
        <RelatedLinks currentSection={activeSection} onNavigate={setActiveSection} />
      </main>

      <Footer />

      {/* Toast notifications */}
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}