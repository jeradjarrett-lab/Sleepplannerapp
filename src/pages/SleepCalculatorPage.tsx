import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import { NavigationMenu } from "../components/NavigationMenu";
import { Footer } from "../components/Footer";
import { SleepCalculator } from "../components/SleepCalculator";
import { ScienceBackedContent } from "../components/ScienceBackedContent";
import { ScrollNav } from "../components/ScrollNav";
import { ScrollToTop } from "../components/ScrollToTop";
import { ShareButtons } from "../components/ShareButtons";
import { QuickAnswers } from "../components/QuickAnswers";
import { SEOContent } from "../components/SEOContent";
import { HowToSection } from "../components/HowToSection";
import { ComparisonTable } from "../components/ComparisonTable";
import { FAQSection } from "../components/FAQSection";
import { StructuredData } from "../components/StructuredData";
import { updateCriticalSeo, updateNonCriticalSeo, updateStructuredData } from "../utils/seo-manager";

const seoData = {
  title: "Sleep Calculator | Free Bedtime & Wake Time Calculator - 90 Minute Sleep Cycles",
  description: "Calculate your perfect bedtime and wake time with our free sleep cycle calculator. Based on 90-minute REM sleep cycles. Wake up refreshed, never groggy. Scientifically proven to improve sleep quality and morning alertness.",
  socialDescription: "Calculate your perfect bedtime and wake time based on 90-minute sleep cycles. Wake up refreshed, not groggy! ⏰💤",
  keywords: "sleep calculator, bedtime calculator, wake time calculator, sleep cycle calculator, 90 minute sleep cycles, REM sleep calculator, when to go to bed, optimal bedtime, sleep schedule calculator, wake up refreshed, sleep inertia, circadian rhythm, deep sleep, light sleep stages, sleep quality calculator",
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
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="EyeLoveSleep" />
        <meta name="language" content="English" />
        
        {/* Google Discovery */}
        <meta property="article:published_time" content="2024-01-15T08:00:00+00:00" />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:author" content="EyeLoveSleep" />
        <meta property="article:section" content="Health & Wellness" />
        <meta property="article:tag" content="sleep calculator" />
        <meta property="article:tag" content="bedtime calculator" />
        <meta property="article:tag" content="sleep cycles" />
        <meta name="news_keywords" content="sleep calculator, bedtime calculator, wake time, sleep cycles, REM sleep" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EyeLoveSleep" />
        <meta property="og:title" content="EyeLoveSleep Free Online Sleep Calculator" />
        <meta property="og:description" content={seoData.socialDescription} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:alt" content="Sleep Calculator showing optimal bedtime and wake time based on 90-minute sleep cycles" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EyeLoveSleep" />
        <meta name="twitter:title" content="EyeLoveSleep Free Online Sleep Calculator" />
        <meta name="twitter:description" content={seoData.socialDescription} />
        <meta name="twitter:image" content={seoData.ogImage} />
        <meta name="twitter:image:alt" content="Sleep Calculator showing optimal bedtime and wake time based on 90-minute sleep cycles" />
        
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
              {/* Hero Section with enhanced SEO */}
              <div className="text-center space-y-2 md:space-y-3">
                <h1 className="text-white">
                  Sleep Calculator: Calculate Perfect Bedtime & Wake Time
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Free sleep cycle calculator based on 90-minute REM cycles. Calculate your optimal bedtime or wake time to wake up refreshed, not groggy. 
                  This bedtime calculator helps you wake up refreshed and avoid sleep inertia by timing your sleep perfectly with science-backed REM cycles.
                </p>
              </div>

              {/* Calculator Component */}
              <SleepCalculator />

              {/* Share Buttons */}
              <ShareButtons 
                title="Free Sleep Calculator - Calculate Perfect Bedtime & Wake Time"
                description="Calculate your optimal bedtime and wake time based on 90-minute sleep cycles. Wake up refreshed!"
                url="https://eyelovesleep.com/"
              />

              {/* Quick Answers */}
              <QuickAnswers section="sleep" />

              {/* SEO Content */}
              <SEOContent section="sleep" />

              {/* Science-Backed Educational Content */}
              <ScienceBackedContent section="sleep" />

              {/* How To Use */}
              <HowToSection section="sleep" />

              {/* Comparison Table */}
              <ComparisonTable section="sleep" />

              {/* FAQ Section */}
              <FAQSection section="sleep" />
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
      
      {/* Structured Data for SEO */}
      <StructuredData type="sleep" />
    </>
  );
}
