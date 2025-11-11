import { ArrowRight, Moon, User, Plane } from 'lucide-react';
import { Card } from './ui/card';

interface RelatedLinksProps {
  currentSection: 'sleep' | 'recommendations' | 'jetlag';
  onNavigate: (section: 'sleep' | 'recommendations' | 'jetlag') => void;
}

export function RelatedLinks({ currentSection, onNavigate }: RelatedLinksProps) {
  const links = {
    sleep: [
      {
        section: 'recommendations' as const,
        icon: User,
        title: 'Sleep Recommendations by Age',
        description: 'Find out exactly how much sleep you need based on your age group with NSF guidelines.',
        keywords: 'sleep by age, sleep requirements, how much sleep',
      },
      {
        section: 'jetlag' as const,
        icon: Plane,
        title: 'Jet Lag Calculator',
        description: 'Planning to travel? Calculate jet lag recovery time and get a personalized adjustment plan.',
        keywords: 'jet lag calculator, time zone adjustment, travel sleep',
      },
    ],
    recommendations: [
      {
        section: 'sleep' as const,
        icon: Moon,
        title: 'Sleep Cycle Calculator',
        description: 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles.',
        keywords: 'sleep calculator, bedtime calculator, 90-minute cycles',
      },
      {
        section: 'jetlag' as const,
        icon: Plane,
        title: 'Jet Lag Calculator',
        description: 'Beat jet lag with our science-based calculator and adjustment strategies.',
        keywords: 'jet lag calculator, beat jet lag, time zone travel',
      },
    ],
    jetlag: [
      {
        section: 'sleep' as const,
        icon: Moon,
        title: 'Sleep Cycle Calculator',
        description: 'Optimize your sleep schedule with our 90-minute sleep cycle calculator.',
        keywords: 'sleep calculator, optimal bedtime, wake time calculator',
      },
      {
        section: 'recommendations' as const,
        icon: User,
        title: 'Sleep by Age',
        description: 'Learn how much sleep you should get based on your age and life stage.',
        keywords: 'sleep recommendations, sleep by age, sleep hours',
      },
    ],
  };

  const currentLinks = links[currentSection];

  return (
    <section className="mt-12 md:mt-16" aria-labelledby="related-tools">
      <div className="text-center mb-6">
        <h2 id="related-tools" className="text-2xl md:text-3xl text-white mb-2">
          Explore More Sleep Tools
        </h2>
        <p className="text-white/60 text-sm md:text-base">
          Comprehensive sleep calculators and recommendations for better rest
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {currentLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Card
              key={link.section}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
              onClick={() => onNavigate(link.section)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate(link.section);
                }
              }}
              aria-label={`Navigate to ${link.title}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white mb-2 flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                    {link.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    {link.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {link.keywords.split(', ').map((keyword, index) => (
                      <span
                        key={index}
                        className="text-xs text-blue-300/80 bg-blue-500/10 px-2 py-1 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional SEO text */}
      <div className="mt-8 text-center">
        <p className="text-white/50 text-xs md:text-sm max-w-3xl mx-auto">
          All our sleep tools are <strong className="text-white/70">free to use</strong> and based on{' '}
          <strong className="text-white/70">scientific research</strong>. Whether you need a{' '}
          <strong className="text-white/70">sleep calculator</strong>,{' '}
          <strong className="text-white/70">bedtime calculator</strong>,{' '}
          <strong className="text-white/70">jet lag calculator</strong>, or{' '}
          <strong className="text-white/70">sleep recommendations by age</strong>, 
          we have you covered with evidence-based tools.
        </p>
      </div>
    </section>
  );
}
