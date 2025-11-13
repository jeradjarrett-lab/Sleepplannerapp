import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import { NavigationMenu } from "../components/NavigationMenu";
import { Footer } from "../components/Footer";
import { CaffeineSleepCalculator } from "../components/CaffeineSleepCalculator";
import { CaffeineScience } from "../components/CaffeineScience";
import { QuickAnswers } from "../components/QuickAnswers";
import { SEOContent } from "../components/SEOContent";
import { HowToSection } from "../components/HowToSection";
import { ComparisonTable } from "../components/ComparisonTable";
import { FAQSection } from "../components/FAQSection";
import { ScrollNav } from "../components/ScrollNav";
import { ScrollToTop } from "../components/ScrollToTop";
import { updateCriticalSeo, updateNonCriticalSeo, updateStructuredData } from "../utils/seo-manager";

const seoData = {
  title: "Free Caffeine Calculator - Calculate Coffee & Sleep Impact, Caffeine Half-Life Calculator | EyeLoveSleep",
  description: "Use our free caffeine and sleep calculator to track caffeine intake and discover when to stop drinking coffee. Our caffeine calculator uses half-life science to calculate how coffee, tea, and energy drinks affect sleep quality. Get personalized caffeine cutoff times with our science-based caffeine intake calculator.",
  keywords: "caffeine calculator, free caffeine calculator, caffeine and sleep calculator, caffeine half life calculator, coffee and sleep calculator, when to stop drinking coffee calculator, caffeine metabolism calculator, caffeine bedtime calculator, coffee sleep impact calculator, energy drink calculator, caffeine intake calculator, tea caffeine calculator, how caffeine affects sleep calculator, caffeine cutoff time calculator, sleep quality calculator, caffeine tracker, coffee calculator",
  url: "https://eyelovesleep.com/caffeine-sleep",
  canonical: "https://eyelovesleep.com/caffeine-sleep",
  ogImage: "https://eyelovesleep.com/og-caffeine-calculator.png",
  section: "caffeine",
};

export default function CaffeineSleepPage() {
  useEffect(() => {
    // Update SEO tags
    updateCriticalSeo(seoData, "EyeLoveSleep");
    updateNonCriticalSeo(seoData, "EyeLoveSleep", "caffeine");
    updateStructuredData(seoData, "EyeLoveSleep", "caffeine");
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
        <NavigationMenu currentPage="caffeine" />
        <ScrollNav section="caffeine" />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-2 md:py-3 max-w-7xl">
            <div className="space-y-1 md:space-y-2">
              {/* Hero Section */}
              <div className="text-center space-y-2 md:space-y-3">
                <h1 className="text-white">
                  Free Caffeine & Sleep Calculator - Calculate Coffee Impact & Caffeine Half-Life
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Use our free caffeine calculator to track how coffee affects your sleep. Calculate your daily caffeine intake 
                  and discover the optimal cutoff time to stop drinking coffee, tea, or energy drinks 
                  for better sleep quality based on caffeine half-life science.
                </p>
              </div>

              {/* Calculator Component */}
              <section id="calculator">
                <CaffeineSleepCalculator />
              </section>

              {/* Quick Answers */}
              <QuickAnswers section="caffeine" />

              {/* SEO Content */}
              <SEOContent section="caffeine" />

              {/* Science-Backed Educational Content */}
              <CaffeineScience />

              {/* How To Use */}
              <HowToSection section="caffeine" />

              {/* Comparison Table */}
              <ComparisonTable section="caffeine" />

              {/* FAQ Section */}
              <FAQSection section="caffeine" />
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
