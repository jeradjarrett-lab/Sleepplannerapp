/**
 * Optimized SEO Manager - Defers non-critical metadata updates
 */

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  url: string;
}

// Cache for meta elements to avoid repeated queries
const metaCache = new Map<string, HTMLMetaElement>();

const updateMetaTag = (
  name: string,
  content: string,
  isProperty = false,
) => {
  const cacheKey = `${isProperty ? 'property' : 'name'}:${name}`;
  let element = metaCache.get(cacheKey);
  
  if (!element) {
    const attribute = isProperty ? "property" : "name";
    element = document.querySelector(
      `meta[${attribute}="${name}"]`,
    ) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    
    metaCache.set(cacheKey, element);
  }
  
  element.setAttribute("content", content);
};

export const updateCriticalSeo = (data: SeoData, siteName: string) => {
  // Only update critical SEO tags immediately
  document.title = data.title;
  updateMetaTag("description", data.description);
  updateMetaTag("keywords", data.keywords);
  
  // Open Graph - critical for social sharing
  updateMetaTag("og:title", data.title, true);
  updateMetaTag("og:description", data.description, true);
  updateMetaTag("og:url", data.url, true);
  
  // Update canonical
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = data.url;
};

export const updateNonCriticalSeo = (data: SeoData, siteName: string, section: string) => {
  // Defer non-critical SEO updates using requestIdleCallback
  const updateNonCritical = () => {
    // Additional SEO meta tags
    updateMetaTag("author", siteName);
    updateMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    updateMetaTag("theme-color", "#4f86f7");
    updateMetaTag("mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");
    updateMetaTag("apple-mobile-web-app-title", siteName);
    
    // Get section-specific image
    const ogImage = section === "sleep" 
      ? "https://eyelovesleep.com/og-sleep-calculator.png"
      : section === "caffeine"
      ? "https://eyelovesleep.com/og-caffeine-calculator.png"
      : section === "jetlag"
      ? "https://eyelovesleep.com/og-jet-lag-calculator.png"
      : "https://eyelovesleep.com/og-image.png";
    
    // Open Graph tags for Facebook, LinkedIn, etc.
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:image:secure_url", ogImage, true);
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);
    updateMetaTag("og:image:type", "image/png", true);
    updateMetaTag("og:image:alt", data.title, true);
    updateMetaTag("og:locale", "en_US", true);
    updateMetaTag("og:updated_time", new Date().toISOString(), true);
    
    // Twitter Card tags for better Twitter/X sharing
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", "@EyeLoveSleep"); // Add your Twitter handle here
    updateMetaTag("twitter:creator", "@EyeLoveSleep"); // Add your Twitter handle here
    updateMetaTag("twitter:title", data.title);
    updateMetaTag("twitter:description", data.description);
    updateMetaTag("twitter:image", ogImage);
    updateMetaTag("twitter:image:alt", data.title);
    
    // Additional meta tags for other platforms
    updateMetaTag("application-name", siteName);
    updateMetaTag("msapplication-TileColor", "#4f86f7");
    updateMetaTag("msapplication-TileImage", "/mstile-144x144.png");
  };
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(updateNonCritical);
  } else {
    setTimeout(updateNonCritical, 100);
  }
};

export const updateStructuredData = (data: SeoData, siteName: string, section: string) => {
  // Defer structured data updates for better performance
  const updateSchemas = () => {
    // Remove existing schemas
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => script.remove());
    
    // Only add most important schemas
    const schemas = [
      // WebApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: siteName,
        applicationCategory: "HealthApplication",
        description: data.description,
        url: data.url,
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      // Organization Schema
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: "https://eyelovesleep.com",
        logo: {
          "@type": "ImageObject",
          url: "https://eyelovesleep.com/logo.png",
        },
      },
      // BreadcrumbList Schema
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://eyelovesleep.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: section === "sleep" ? "Sleep Calculator" : section === "caffeine" ? "Caffeine & Sleep" : "Jet Lag Calculator",
            item: data.url,
          },
        ],
      },
    ];
    
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  };
  
  // Defer structured data even more
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(updateSchemas, { timeout: 2000 });
  } else {
    setTimeout(updateSchemas, 500);
  }
};

export const seoData = {
  sleep: {
    title: "Sleep Calculator - Calculate Best Bedtime & Wake Time | 90-Minute Sleep Cycles | EyeLoveSleep",
    description: "Free sleep calculator based on 90-minute sleep cycles. Calculate optimal bedtime and wake time to feel refreshed. Avoid sleep inertia with our science-based sleep cycle calculator. Get personalized sleep schedule recommendations instantly.",
    keywords: "sleep calculator, bedtime calculator, wake time calculator, sleep cycles, 90 minute sleep cycle, REM sleep, best time to sleep, sleep schedule calculator, sleep cycle calculator, when to go to bed, optimal bedtime, sleep inertia, circadian rhythm calculator, sleep hygiene, deep sleep calculator, light sleep, wake up refreshed",
    url: "https://eyelovesleep.com",
  },
  caffeine: {
    title: "Caffeine & Sleep Calculator - When to Stop Drinking Coffee for Better Sleep | EyeLoveSleep",
    description: "Free caffeine sleep calculator. Track caffeine intake and discover optimal bedtime based on caffeine half-life. Calculate how coffee, tea, and energy drinks affect your sleep quality. Science-based recommendations for caffeine cutoff times.",
    keywords: "caffeine calculator, caffeine and sleep, caffeine half life, coffee and sleep, when to stop drinking coffee, caffeine metabolism, caffeine bedtime calculator, coffee sleep impact, energy drink sleep, tea caffeine content, how caffeine affects sleep, caffeine cutoff time, sleep quality caffeine, decaf switch time",
    url: "https://eyelovesleep.com/caffeine-sleep",
  },
  jetlag: {
    title: "Jet Lag Calculator - Beat Jet Lag Fast | Time Zone Adjustment Plan | EyeLoveSleep",
    description: "Advanced jet lag calculator with personalized adjustment plans. Calculate recovery time, get day-by-day sleep schedules, and beat jet lag faster. Works for eastward and westward travel across all time zones. Free jet lag remedy tool.",
    keywords: "jet lag calculator, beat jet lag, time zone adjustment, jet lag remedy, jet lag cure, travel sleep tips, jet lag recovery, circadian rhythm adjustment, jet lag prevention, eastward travel jet lag, westward travel jet lag, time zone calculator, international travel sleep, jet lag symptoms, how to avoid jet lag, jet lag treatment, melatonin for jet lag, light therapy jet lag",
    url: "https://eyelovesleep.com/jet-lag",
  },
};
