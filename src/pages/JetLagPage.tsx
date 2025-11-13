import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import { NavigationMenu } from "../components/NavigationMenu";
import { Footer } from "../components/Footer";
import { JetLagCalculator } from "../components/JetLagCalculator";
import { JetLagScience } from "../components/JetLagScience";
import { QuickAnswers } from "../components/QuickAnswers";
import { SEOContent } from "../components/SEOContent";
import { HowToSection } from "../components/HowToSection";
import { ComparisonTable } from "../components/ComparisonTable";
import { FAQSection } from "../components/FAQSection";
import { ScrollNav } from "../components/ScrollNav";
import { ScrollToTop } from "../components/ScrollToTop";
import { updateCriticalSeo, updateNonCriticalSeo, updateStructuredData } from "../utils/seo-manager";

const seoData = {
  title: "Free Jet Lag Calculator - Calculate Recovery Time & Time Zone Adjustment Plan | EyeLoveSleep",
  description: "Use our free jet lag calculator to beat jet lag fast with personalized adjustment plans. Our time zone calculator helps you calculate recovery time, get day-by-day sleep schedules, and adapt faster. Works for eastward and westward travel across all time zones. Free circadian rhythm adjustment calculator.",
  socialDescription: "Beat jet lag faster! Get a personalized day-by-day adjustment plan for any time zone. Perfect for business and leisure travelers. ✈️🌍",
  keywords: "jet lag calculator, free jet lag calculator, beat jet lag calculator, time zone adjustment calculator, time zone calculator, jet lag remedy calculator, travel sleep calculator, jet lag recovery calculator, circadian rhythm calculator, jet lag prevention calculator, eastward travel calculator, westward travel calculator, international travel calculator, jet lag symptoms calculator, how to avoid jet lag calculator, jet lag treatment calculator, melatonin calculator, light therapy calculator",
  url: "https://eyelovesleep.com/jet-lag",
  canonical: "https://eyelovesleep.com/jet-lag",
  ogImage: "https://eyelovesleep.com/og-jet-lag-calculator.png",
  section: "jetlag",
};

export default function JetLagPage() {
  useEffect(() => {
    // Update SEO tags
    updateCriticalSeo(seoData, "EyeLoveSleep");
    updateNonCriticalSeo(seoData, "EyeLoveSleep", "jetlag");
    updateStructuredData(seoData, "EyeLoveSleep", "jetlag");
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
        <meta property="og:title" content="EyeLoveSleep Free Jet Lag Calculator" />
        <meta property="og:description" content={seoData.socialDescription} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:alt" content="Jet Lag Calculator with time zone map showing personalized adjustment plans for travelers" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EyeLoveSleep" />
        <meta name="twitter:title" content="EyeLoveSleep Free Jet Lag Calculator" />
        <meta name="twitter:description" content={seoData.socialDescription} />
        <meta name="twitter:image" content={seoData.ogImage} />
        <meta name="twitter:image:alt" content="Jet Lag Calculator with time zone map showing personalized adjustment plans for travelers" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <NavigationMenu currentPage="jetlag" />
        <ScrollNav section="jetlag" />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-2 md:py-3 max-w-7xl">
            <div className="space-y-1 md:space-y-2">
              {/* Hero Section */}
              <div className="text-center space-y-2 md:space-y-3">
                <h1 className="text-white">
                  Free Jet Lag Calculator - Calculate Time Zone Recovery & Adjustment Plan
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Use our free jet lag calculator to beat jet lag with a personalized adjustment plan. Calculate your recovery time 
                  and get day-by-day recommendations for sleep, light exposure, and melatonin to 
                  quickly adapt to your new time zone with our circadian rhythm calculator.
                </p>
              </div>

              {/* Calculator Component */}
              <section id="calculator">
                <JetLagCalculator />
              </section>

              {/* Quick Answers */}
              <QuickAnswers section="jetlag" />

              {/* SEO Content */}
              <SEOContent section="jetlag" />

              {/* Science-Backed Educational Content */}
              <JetLagScience />

              {/* How To Use */}
              <HowToSection section="jetlag" />

              {/* Comparison Table */}
              <ComparisonTable section="jetlag" />

              {/* FAQ Section */}
              <FAQSection section="jetlag" />
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
