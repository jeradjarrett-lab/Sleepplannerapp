import { useState, useEffect } from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrollNavProps {
  section: 'sleep' | 'caffeine' | 'jetlag';
}

interface NavItem {
  id: string;
  label: string;
  level: number;
}

export function ScrollNav({ section }: ScrollNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  // Define navigation items based on section
  useEffect(() => {
    const items: Record<string, NavItem[]> = {
      sleep: [
        { id: 'calculator', label: 'Sleep Calculator', level: 1 },
        { id: 'quick-answers', label: 'Quick Answers', level: 1 },
        { id: 'seo-content', label: 'Understanding Sleep Cycles', level: 1 },
        { id: 'sleep-stages', label: 'Four Stages of Sleep', level: 2 },
        { id: 'sleep-cycles', label: 'Why 90-Minute Cycles', level: 2 },
        { id: 'sleep-inertia', label: 'Sleep Inertia Problem', level: 2 },
        { id: 'optimizing-schedule', label: 'Optimizing Schedule', level: 2 },
        { id: 'benefits', label: 'Benefits of Calculator', level: 1 },
        { id: 'scientific-research', label: 'Scientific Research', level: 1 },
        { id: 'research-findings', label: 'Key Research Findings', level: 2 },
        { id: 'expert-recommendations', label: 'Expert Recommendations', level: 2 },
        { id: 'age-requirements', label: 'Age-Specific Requirements', level: 2 },
        { id: 'sleep-problems', label: 'Common Sleep Challenges', level: 1 },
        { id: 'how-to', label: 'How to Use', level: 1 },
        { id: 'comparison', label: 'Sleep Cycle Comparison', level: 1 },
        { id: 'faq', label: 'Frequently Asked Questions', level: 1 },
      ],
      caffeine: [
        { id: 'calculator', label: 'Caffeine Calculator', level: 1 },
        { id: 'quick-answers', label: 'Quick Answers', level: 1 },
        { id: 'seo-content', label: 'Caffeine and Sleep Science', level: 1 },
        { id: 'caffeine-effects', label: 'How Caffeine Affects Sleep', level: 2 },
        { id: 'half-life', label: 'Caffeine Half-Life', level: 2 },
        { id: 'sleep-stages-impact', label: 'Impact on Sleep Stages', level: 2 },
        { id: 'tolerance', label: 'Caffeine Tolerance', level: 2 },
        { id: 'optimal-timing', label: 'Optimal Caffeine Timing', level: 2 },
        { id: 'scientific-research', label: 'Scientific Research', level: 1 },
        { id: 'pharmacokinetics', label: 'Pharmacokinetics', level: 2 },
        { id: 'research-studies', label: 'Key Research Studies', level: 2 },
        { id: 'caffeine-content', label: 'Caffeine Content Guide', level: 2 },
        { id: 'metabolism-factors', label: 'Metabolism Factors', level: 2 },
        { id: 'benefits-risks', label: 'Benefits & Risks', level: 1 },
        { id: 'how-to', label: 'How to Use', level: 1 },
        { id: 'comparison', label: 'Caffeine Source Comparison', level: 1 },
        { id: 'faq', label: 'Frequently Asked Questions', level: 1 },
      ],
      jetlag: [
        { id: 'calculator', label: 'Jet Lag Calculator', level: 1 },
        { id: 'quick-answers', label: 'Quick Answers', level: 1 },
        { id: 'seo-content', label: 'Understanding Jet Lag', level: 1 },
        { id: 'science', label: 'Science of Jet Lag', level: 2 },
        { id: 'direction-matters', label: 'East vs West Travel', level: 2 },
        { id: 'pre-travel', label: 'Pre-Travel Strategies', level: 2 },
        { id: 'during-flight', label: 'During-Flight Strategies', level: 2 },
        { id: 'post-arrival', label: 'Post-Arrival Strategies', level: 2 },
        { id: 'additional-tips', label: 'Additional Tips', level: 2 },
        { id: 'scientific-research', label: 'Scientific Research', level: 1 },
        { id: 'circadian-rhythm', label: 'Circadian Rhythm Science', level: 2 },
        { id: 'research-studies', label: 'Landmark Research', level: 2 },
        { id: 'phase-response', label: 'Phase Response Curve', level: 2 },
        { id: 'melatonin', label: 'Melatonin Science', level: 2 },
        { id: 'time-zone-rules', label: 'Time Zone Crossing Rules', level: 2 },
        { id: 'special-populations', label: 'Special Populations', level: 1 },
        { id: 'how-to', label: 'How to Use', level: 1 },
        { id: 'comparison', label: 'Jet Lag Comparison', level: 1 },
        { id: 'faq', label: 'Frequently Asked Questions', level: 1 },
      ],
    };

    setNavItems(items[section] || []);
  }, [section]);

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Find all section headings
      const headings = navItems.map(item => {
        const element = document.getElementById(item.id);
        if (element) {
          return {
            id: item.id,
            offsetTop: element.offsetTop,
          };
        }
        return null;
      }).filter(Boolean) as { id: string; offsetTop: number }[];

      // Find the current section
      let currentId = '';
      for (let i = headings.length - 1; i >= 0; i--) {
        if (scrollPosition >= headings[i].offsetTop - 100) {
          currentId = headings[i].id;
          break;
        }
      }

      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems, activeId]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation - Fixed Left Side */}
      <nav
        className="hidden lg:block fixed left-4 top-24 w-64 max-h-[calc(100vh-120px)] overflow-y-auto z-40"
        aria-label="Table of contents"
      >
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <h3 className="text-white text-sm font-medium">On This Page</h3>
                </div>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Collapse navigation"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all text-sm ${
                        item.level === 2 ? 'pl-6' : ''
                      } ${
                        activeId === item.id
                          ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Scroll Progress Indicator */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-400"
                      style={{
                        width: `${Math.min(
                          100,
                          ((window.scrollY || 0) /
                            (document.documentElement.scrollHeight -
                              document.documentElement.clientHeight)) *
                            100
                        )}%`,
                      }}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          100,
                          ((window.scrollY || 0) /
                            (document.documentElement.scrollHeight -
                              document.documentElement.clientHeight)) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed State - Show Button */}
        <AnimatePresence>
          {isCollapsed && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => setIsCollapsed(false)}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-3 shadow-2xl hover:bg-white/10 transition-all"
              aria-label="Expand navigation"
            >
              <BookOpen className="w-5 h-5 text-blue-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Navigation - Fixed Bottom */}
      <nav
        className="lg:hidden fixed bottom-4 left-4 right-4 z-40"
        aria-label="Table of contents mobile"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-medium">Jump to Section</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/60 transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-3 max-h-48 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.slice(0, 8).map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        scrollToSection(item.id);
                        // Close the details element
                        const details = document.querySelector('details');
                        if (details) details.removeAttribute('open');
                      }}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all text-sm ${
                        activeId === item.id
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </nav>
    </>
  );
}
