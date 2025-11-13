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
import { updateCriticalSeo, updateNonCriticalSeo, updateStructuredData } from "../utils/seo-manager";

const seoData = {
  title: "Free Caffeine Calculator - Calculate Coffee & Sleep Impact, Caffeine Half-Life Calculator | EyeLoveSleep",
  description: "Use our free caffeine and sleep calculator to track caffeine intake and discover when to stop drinking coffee. Our caffeine calculator uses half-life science to calculate how coffee, tea, and energy drinks affect sleep quality. Get personalized caffeine cutoff times with our science-based caffeine intake calculator.",
  socialDescription: "Find out when to stop drinking coffee for better sleep! Track your caffeine intake and get your personalized cutoff time. ☕😴",
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
    </>
  );
}
