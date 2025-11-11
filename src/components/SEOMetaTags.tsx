/**
 * SEO Meta Tags Component
 * This component provides additional meta tags for better SEO performance
 */

export function SEOMetaTags() {
  return (
    <>
      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://platform-api.sharethis.com" />
      
      {/* DNS prefetch for improved loading */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Favicon and app icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Manifest for PWA */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Alternative languages (add as needed) */}
      <link rel="alternate" hrefLang="en" href="https://eyelovesleep.app" />
      <link rel="alternate" hrefLang="x-default" href="https://eyelovesleep.app" />
    </>
  );
}

/**
 * Sitemap data for SEO
 * This data structure helps search engines understand the site architecture
 */
export const sitemapData = {
  pages: [
    {
      url: 'https://eyelovesleep.app',
      title: 'Sleep Calculator - Calculate Best Bedtime & Wake Time',
      description: 'Free sleep calculator based on 90-minute sleep cycles',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://eyelovesleep.app/sleep-by-age',
      title: 'Sleep Recommendations by Age - NSF Guidelines',
      description: 'Evidence-based sleep requirements for all ages',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://eyelovesleep.app/jet-lag',
      title: 'Jet Lag Calculator - Beat Jet Lag Fast',
      description: 'Calculate jet lag recovery time and adjustment plans',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ],
  keywords: [
    'sleep calculator',
    'bedtime calculator',
    'wake time calculator',
    'sleep cycles',
    '90 minute sleep cycle',
    'REM sleep calculator',
    'jet lag calculator',
    'time zone adjustment',
    'sleep by age',
    'sleep recommendations',
    'circadian rhythm',
    'sleep hygiene tips',
    'optimal bedtime',
    'best wake time',
    'sleep schedule calculator',
    'National Sleep Foundation guidelines',
    'beat jet lag',
    'sleep inertia',
    'deep sleep calculator',
    'light sleep stages',
  ],
};

/**
 * Robots meta tag configurations for different pages
 */
export const robotsConfig = {
  sleep: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  recommendations: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  jetlag: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
};

/**
 * Open Graph image configurations
 */
export const ogImageConfig = {
  sleep: {
    url: 'https://eyelovesleep.app/og-sleep-calculator.png',
    alt: 'EyeLoveSleep Sleep Calculator - Calculate optimal bedtime and wake time',
  },
  recommendations: {
    url: 'https://eyelovesleep.app/og-sleep-by-age.png',
    alt: 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
  },
  jetlag: {
    url: 'https://eyelovesleep.app/og-jet-lag-calculator.png',
    alt: 'Jet Lag Calculator - Beat jet lag with personalized adjustment plans',
  },
};
