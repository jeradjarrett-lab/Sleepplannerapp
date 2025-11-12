import { Info, Clock, Moon, Target } from 'lucide-react';

interface QuickAnswersProps {
  section: 'sleep' | 'caffeine' | 'jetlag';
}

export function QuickAnswers({ section }: QuickAnswersProps) {
  if (section === 'sleep') {
    return (
      <div className="mb-8 md:mb-12 bg-blue-500/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl md:text-2xl text-white mb-3">
              Quick Sleep Facts
            </h2>
            <div className="space-y-3 text-blue-100/90">
              <div className="flex gap-2">
                <Clock className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-200">Sleep Cycle Length:</strong> Each complete sleep cycle lasts approximately 90 minutes
                </div>
              </div>
              <div className="flex gap-2">
                <Target className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-200">Optimal Cycles:</strong> Adults need 4-6 complete cycles per night (6-9 hours)
                </div>
              </div>
              <div className="flex gap-2">
                <Moon className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-200">Best Wake Time:</strong> During light sleep at the end of a cycle, not during deep sleep
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          itemScope 
          itemType="https://schema.org/Thing"
          className="mt-4 pt-4 border-t border-blue-400/20"
        >
          <meta itemProp="name" content="Sleep Cycle Duration" />
          <meta itemProp="description" content="A complete sleep cycle lasts 90 minutes and includes light sleep, deep sleep, and REM sleep stages." />
        </div>
      </div>
    );
  }

  if (section === 'caffeine') {
    return (
      <div className="mb-8 md:mb-12 bg-amber-500/10 backdrop-blur-sm border border-amber-400/30 rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div className="w-full">
            <h2 className="text-xl md:text-2xl text-white mb-4">
              Caffeine Content Guide (Quick Reference)
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-lg p-4 border border-amber-400/20">
                <div className="text-amber-300 text-sm mb-1">Coffee (8 oz)</div>
                <div className="text-white text-xl">95mg</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-amber-400/20">
                <div className="text-amber-300 text-sm mb-1">Espresso (1 shot)</div>
                <div className="text-white text-xl">63mg</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-amber-400/20">
                <div className="text-amber-300 text-sm mb-1">Energy Drink (8 oz)</div>
                <div className="text-white text-xl">80mg</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-amber-400/20">
                <div className="text-amber-300 text-sm mb-1">Black Tea (8 oz)</div>
                <div className="text-white text-xl">47mg</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-amber-400/20">
                <div className="text-amber-300 text-sm mb-1">Green Tea (8 oz)</div>
                <div className="text-white text-xl">28mg</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-amber-400/20">
                <div className="text-amber-300 text-sm mb-1">Soda/Cola (12 oz)</div>
                <div className="text-white text-xl">34mg</div>
              </div>
            </div>
            
            <p className="text-amber-100/70 text-sm mt-4 italic">
              Caffeine half-life: ~5 hours | Daily limit for adults: 400mg
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (section === 'jetlag') {
    return (
      <div className="mb-8 md:mb-12 bg-amber-500/10 backdrop-blur-sm border border-amber-400/30 rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl md:text-2xl text-white mb-3">
              Essential Jet Lag Tips
            </h2>
            <ul className="space-y-2 text-amber-100/90 list-disc list-inside">
              <li>
                <strong className="text-amber-200">Recovery Time:</strong> Allow 1 day per time zone crossed (e.g., 6 time zones = 6 days)
              </li>
              <li>
                <strong className="text-amber-200">Direction Matters:</strong> Westward travel (gaining time) causes less jet lag than eastward
              </li>
              <li>
                <strong className="text-amber-200">Pre-Adjustment:</strong> Start shifting sleep schedule 2-3 days before departure
              </li>
              <li>
                <strong className="text-amber-200">Light Exposure:</strong> Bright light in the morning advances your clock; evening light delays it
              </li>
              <li>
                <strong className="text-amber-200">Stay Hydrated:</strong> Drink plenty of water before, during, and after flight
              </li>
              <li>
                <strong className="text-amber-200">Avoid Long Naps:</strong> Keep naps under 20-30 minutes to preserve nighttime sleep drive
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
