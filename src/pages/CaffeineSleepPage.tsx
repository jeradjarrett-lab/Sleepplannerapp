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
import { ShareButtons } from "../components/ShareButtons";
import { StructuredData } from "../components/StructuredData";
import { updateCriticalSeo, updateNonCriticalSeo, updateStructuredData } from "../utils/seo-manager";

const seoData = {
  title: "Caffeine Calculator | When to Stop Drinking Coffee for Better Sleep",
  description: "Free caffeine calculator: Track coffee, tea, energy drinks and discover when to stop drinking caffeine. Based on caffeine half-life science. Get personalized bedtime recommendations and improve sleep quality tonight.",
  socialDescription: "Find out when to stop drinking coffee for better sleep! Track your caffeine intake and get your personalized cutoff time. ☕😴",
  keywords: "caffeine calculator, when to stop drinking coffee, caffeine half life, coffee and sleep, caffeine metabolism, caffeine bedtime, coffee sleep impact, caffeine cutoff time, how long does caffeine last, caffeine intake tracker, coffee calculator",
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
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="EyeLoveSleep" />
        <meta name="language" content="English" />
        
        {/* Google Discovery */}
        <meta property="article:published_time" content="2024-01-15T08:00:00+00:00" />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:author" content="EyeLoveSleep" />
        <meta property="article:section" content="Health & Wellness" />
        <meta property="article:tag" content="caffeine calculator" />
        <meta property="article:tag" content="coffee and sleep" />
        <meta property="article:tag" content="caffeine half life" />
        <meta name="news_keywords" content="caffeine calculator, coffee and sleep, when to stop drinking coffee, caffeine half life" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EyeLoveSleep" />
        <meta property="og:title" content="EyeLoveSleep Free Caffeine & Sleep Calculator" />
        <meta property="og:description" content={seoData.socialDescription} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:alt" content="Caffeine Calculator tracking coffee and caffeine intake with personalized sleep recommendations" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EyeLoveSleep" />
        <meta name="twitter:title" content="EyeLoveSleep Free Caffeine & Sleep Calculator" />
        <meta name="twitter:description" content={seoData.socialDescription} />
        <meta name="twitter:image" content={seoData.ogImage} />
        <meta name="twitter:image:alt" content="Caffeine Calculator tracking coffee and caffeine intake with personalized sleep recommendations" />
        
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
              {/* Hero Section with enhanced SEO */}
              <div className="text-center space-y-2 md:space-y-3">
                <h1 className="text-white">
                  Caffeine Calculator: When to Stop Drinking Coffee for Better Sleep
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Free caffeine sleep calculator. Track your coffee, tea, and energy drink intake. 
                  Discover exactly when to stop drinking caffeine based on half-life science. 
                  Get personalized recommendations to improve sleep quality tonight.
                </p>
              </div>

              {/* Calculator Component */}
              <CaffeineSleepCalculator />

              {/* Share Buttons */}
              <ShareButtons 
                title="Free Caffeine Calculator - Calculate Coffee Impact on Your Sleep"
                description="Find out when to stop drinking coffee for better sleep! Track your caffeine intake and get your personalized cutoff time."
                url="https://eyelovesleep.com/caffeine-sleep"
              />

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
      
      {/* Structured Data for SEO */}
      <StructuredData type="caffeine" />
    </>
  );
}
