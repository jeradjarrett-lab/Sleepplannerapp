import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import { NavigationMenu } from "../components/NavigationMenu";
import { Footer } from "../components/Footer";
import { SleepCalculator } from "../components/SleepCalculator";
import { ScienceBackedContent } from "../components/ScienceBackedContent";
import { ScrollNav } from "../components/ScrollNav";
import { ScrollToTop } from "../components/ScrollToTop";
import { updateCriticalSeo, updateNonCriticalSeo, updateStructuredData } from "../utils/seo-manager";

const seoData = {
  title: "Free Sleep Calculator - Bedtime & Wake Time Calculator Based on 90-Min Cycles | EyeLoveSleep",
  description: "Use our free sleep cycle calculator to find the perfect bedtime and wake time. Our sleep calculator uses 90-minute REM cycles to help you wake up refreshed. Calculate your optimal sleep schedule instantly with our science-backed sleep calculator tool.",
  keywords: "sleep calculator, free sleep calculator, bedtime calculator, wake time calculator, sleep cycle calculator, 90 minute sleep cycle calculator, REM sleep calculator, best time to sleep calculator, sleep schedule calculator, when to go to bed calculator, optimal bedtime calculator, sleep inertia calculator, circadian rhythm calculator, sleep hygiene calculator, deep sleep calculator, light sleep calculator, wake up calculator, sleep time calculator, sleep cycle tool",
  url: "https://eyelovesleep.com",
  canonical: "https://eyelovesleep.com",
  ogImage: "https://eyelovesleep.com/og-sleep-calculator.png",
  section: "sleep",
};

export default function SleepCalculatorPage() {
  useEffect(() => {
    // Update SEO tags
    updateCriticalSeo(seoData, "EyeLoveSleep");
    updateNonCriticalSeo(seoData, "EyeLoveSleep", "sleep");
    updateStructuredData(seoData, "EyeLoveSleep", "sleep");
  }, []);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.ogImage} />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <NavigationMenu currentPage="sleep" />
        <ScrollNav section="sleep" />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-2 md:py-3 max-w-7xl">
            <div className="space-y-1 md:space-y-2">
              {/* Hero Section */}
              <div className="text-center space-y-2 md:space-y-3">
                <h1 className="text-white">
                  Free Sleep Cycle Calculator - Calculate Your Perfect Bedtime & Wake Time
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Use our free sleep calculator to find your optimal bedtime or wake time based on 90-minute sleep cycles. 
                  This bedtime calculator helps you wake up refreshed and avoid sleep inertia by timing your sleep perfectly with science-backed REM cycles.
                </p>
              </div>

              {/* Calculator Component */}
              <SleepCalculator />

              {/* Educational Content */}
              <ScienceBackedContent section="sleep" />
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
