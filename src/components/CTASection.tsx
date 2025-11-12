import { Moon, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface CTASectionProps {
  section: 'sleep' | 'caffeine' | 'jetlag';
  onNavigate: (section: 'sleep' | 'caffeine' | 'jetlag') => void;
}

export function CTASection({ section, onNavigate }: CTASectionProps) {
  const ctaContent = {
    sleep: {
      title: "Ready to Wake Up Refreshed?",
      description: "Start using our free sleep calculator now and discover your perfect bedtime. Thousands of users have already improved their sleep quality.",
      buttonText: "Calculate My Bedtime",
      keywords: "sleep calculator, bedtime calculator, calculate sleep",
    },
    caffeine: {
      title: "Optimize Your Caffeine & Sleep",
      description: "Track your caffeine intake and discover the perfect bedtime for quality sleep. Stop guessing when to have your last coffee.",
      buttonText: "Calculate Caffeine Impact",
      keywords: "caffeine calculator, coffee and sleep, caffeine bedtime",
    },
    jetlag: {
      title: "Beat Jet Lag on Your Next Trip",
      description: "Don't let jet lag ruin your travel. Calculate your adjustment plan now and arrive at your destination fully energized.",
      buttonText: "Calculate Jet Lag",
      keywords: "jet lag calculator, beat jet lag, travel better",
    },
  };

  const content = ctaContent[section];

  return (
    <section className="mt-12 md:mt-16 mb-8 md:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-sm border-2 border-blue-400/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Moon className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl text-white">
            {content.title}
          </h2>

          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-base md:text-lg gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105"
            >
              {content.buttonText}
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>100% Free • No Sign-Up Required</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-white/50 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Used by 100,000+ People</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>4.8★ Rating</span>
            </div>
          </div>

          {/* Hidden SEO keywords */}
          <div className="sr-only">
            {content.keywords}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
