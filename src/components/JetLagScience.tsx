import { Microscope, Plane, Sun, Moon, Clock, AlertTriangle, CheckCircle, FileText, Users, Brain } from 'lucide-react';

export function JetLagScience() {
  return (
    <article className="mt-8 space-y-6">
      {/* Scientific Research Section */}
      <section id="scientific-research" className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
        <div className="flex items-start gap-3 mb-6">
          <Microscope className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl text-white mb-4">
              Scientific Research on Jet Lag and Circadian Rhythms
            </h2>
            
            <div className="space-y-4 text-blue-100/90 leading-relaxed">
              <p>
                <strong className="text-blue-200">Jet lag disorder</strong>, clinically known as "desynchronosis," is a circadian rhythm sleep disorder that occurs when your internal biological clock becomes misaligned with the external environment due to rapid travel across multiple time zones. Understanding the underlying science is essential for effective prevention and treatment.
              </p>
              
              <h3 id="circadian-rhythm" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                The Circadian Rhythm System: Your Body's Master Clock
              </h3>
              
              <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <h4 className="text-blue-200">Suprachiasmatic Nucleus (SCN)</h4>
                </div>
                <p className="text-sm text-blue-100/80">
                  Located in the hypothalamus, the SCN is your brain's master circadian pacemaker, containing approximately 20,000 neurons that generate 24-hour rhythms. The SCN regulates sleep-wake cycles, body temperature, hormone release, blood pressure, and virtually every physiological process in your body.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <Sun className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-blue-200">Light as the Primary Zeitgeber</h4>
                  </div>
                  <p className="text-sm text-blue-100/80">
                    Light is the strongest environmental cue (zeitgeber) that entrains your circadian rhythm. Specialized retinal ganglion cells detect blue wavelength light (460-480nm) and send signals directly to the SCN, triggering the suppression of melatonin and signaling "daytime" to your body.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <Moon className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-blue-200">Melatonin: The Darkness Hormone</h4>
                  </div>
                  <p className="text-sm text-blue-100/80">
                    The pineal gland secretes melatonin in response to darkness signals from the SCN. Melatonin levels begin rising 2-3 hours before habitual bedtime, peak during the night (around 2-4 AM), and decrease in the morning. This hormone regulates the timing of sleep, not sleep itself.
                  </p>
                </div>
              </div>
              
              <h3 id="research-studies" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Landmark Research Studies on Jet Lag
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-blue-200">Nature (2002) - Asymmetry of Eastward vs Westward Travel</h4>
                  </div>
                  <p className="text-sm text-blue-100/80">
                    Research by Waterhouse et al. demonstrated that <strong>eastward flights are significantly more challenging</strong> than westward flights. The human circadian clock has a natural period of approximately 24.2 hours (slightly longer than 24 hours), making it easier to delay sleep (westward) than advance it (eastward). Adaptation rate: ~1 day per time zone westward, ~1.5 days per time zone eastward.
                  </p>
                  <div className="mt-2 p-2 bg-blue-500/20 rounded text-xs text-blue-200">
                    <strong>Key Finding:</strong> Eastward jet lag takes 50% longer to recover from than westward jet lag.
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-blue-200">Journal of Biological Rhythms (2007) - Pre-Adaptation Strategy</h4>
                  </div>
                  <p className="text-sm text-blue-100/80">
                    Stanford University researchers found that gradually shifting sleep schedules 2-3 days before travel can reduce jet lag severity by up to 65%. Participants who shifted their sleep-wake times by 1-2 hours per day before crossing 6+ time zones reported significantly fewer symptoms and faster adaptation.
                  </p>
                  <div className="mt-2 p-2 bg-blue-500/20 rounded text-xs text-blue-200">
                    <strong>Key Finding:</strong> Pre-travel circadian adjustment dramatically reduces jet lag duration.
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-blue-200">Chronobiology International (2016) - Light Exposure Timing</h4>
                  </div>
                  <p className="text-sm text-blue-100/80">
                    A comprehensive study published in Chronobiology International demonstrated that <strong>timed light exposure is the most effective non-pharmacological intervention</strong> for jet lag. Strategic bright light exposure (&gt;2,500 lux) at specific times can shift the circadian clock by 1-3 hours per day. Morning light delays the clock (useful for westward), evening light advances it (useful for eastward).
                  </p>
                  <div className="mt-2 p-2 bg-blue-500/20 rounded text-xs text-blue-200">
                    <strong>Key Finding:</strong> Properly timed light exposure accelerates circadian adaptation by 200-300%.
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-blue-200">Sleep Medicine Reviews (2018) - Cognitive Impairment</h4>
                  </div>
                  <p className="text-sm text-blue-100/80">
                    Meta-analysis of jet lag studies revealed that cognitive performance decreases by 20-30% during the adaptation period. Reaction time, decision-making, and working memory are particularly affected. Athletes competing within 2-3 days of crossing 4+ time zones show measurably worse performance metrics.
                  </p>
                  <div className="mt-2 p-2 bg-blue-500/20 rounded text-xs text-blue-200">
                    <strong>Key Finding:</strong> Jet lag significantly impairs cognitive and physical performance for 3-7 days.
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-blue-200">Cell Metabolism (2019) - Gastrointestinal Effects</h4>
                  </div>
                  <p className="text-sm text-blue-100/80">
                    Research at the Weizmann Institute revealed that gut microbiome composition is regulated by circadian rhythms. Jet lag disrupts these rhythms, leading to digestive issues and metabolic changes. The study found that timing meals to destination time zones (even before travel) can help realign gut bacteria and reduce GI symptoms.
                  </p>
                  <div className="mt-2 p-2 bg-blue-500/20 rounded text-xs text-blue-200">
                    <strong>Key Finding:</strong> Meal timing is a powerful zeitgeber for resetting circadian rhythms.
                  </div>
                </div>
              </div>
              
              <h3 id="phase-response" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Phase Response Curve: The Science of Circadian Shifting
              </h3>
              
              <div className="p-4 bg-blue-500/10 border-l-4 border-blue-400 rounded mb-4">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-200 mb-2">Understanding the Phase Response Curve (PRC)</h4>
                    <p className="text-sm text-blue-100/80">
                      The PRC describes how light exposure at different times of day affects your circadian rhythm. This is the scientific foundation for all jet lag strategies:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-blue-100/80">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-blue-200">Light before core body temperature minimum (CBTmin):</strong> Delays circadian phase (makes you want to sleep later - useful for westward travel)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-blue-200">Light after CBTmin:</strong> Advances circadian phase (makes you want to sleep earlier - useful for eastward travel)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-blue-200">CBTmin occurs approximately 2 hours before habitual wake time</strong> (e.g., if you wake at 7 AM, CBTmin is around 5 AM)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-blue-200">Dead zone:</strong> Light exposure in the middle of the day (noon-4 PM) has minimal circadian shifting effects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 id="melatonin" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Melatonin Supplementation: Evidence and Timing
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <h4 className="text-blue-200 mb-2">Proven Effectiveness</h4>
                  <p className="text-sm text-blue-100/80">
                    A Cochrane systematic review (2023) analyzing 23 studies found that melatonin (0.5-5mg) taken at destination bedtime reduces jet lag symptoms in travelers crossing 5+ time zones. It's particularly effective for eastward travel and shows benefits for both sleep quality and daytime alertness.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-blue-400/20">
                  <h4 className="text-blue-200 mb-2">Optimal Timing Protocol</h4>
                  <ul className="space-y-1 text-sm text-blue-100/80 list-disc list-inside">
                    <li>Take 0.5-5mg at destination bedtime</li>
                    <li>Begin on arrival day, continue for 2-4 nights</li>
                    <li>Avoid daytime doses (can worsen jet lag)</li>
                    <li>Lower doses (0.5-1mg) may be as effective as higher doses</li>
                    <li>Consult physician if on medications</li>
                  </ul>
                </div>
              </div>
              
              <h3 id="time-zone-rules" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Time Zone Crossing Rules: When to Adjust vs Maintain
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-blue-500/20 border-b border-blue-400/30">
                    <tr>
                      <th className="text-left p-3 text-blue-200">Time Zones Crossed</th>
                      <th className="text-left p-3 text-blue-200">Trip Duration</th>
                      <th className="text-left p-3 text-blue-200">Recommended Strategy</th>
                      <th className="text-left p-3 text-blue-200">Expected Adaptation Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-400/10">
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-blue-100/90">1-2 zones</td>
                      <td className="p-3 text-blue-100/80">Any duration</td>
                      <td className="p-3 text-blue-100/80">Adjust immediately to destination time</td>
                      <td className="p-3 text-blue-100/80">1-2 days</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-blue-100/90">3-4 zones</td>
                      <td className="p-3 text-blue-100/80">&lt; 3 days</td>
                      <td className="p-3 text-blue-100/80">Consider staying on home time if feasible</td>
                      <td className="p-3 text-blue-100/80">N/A</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-blue-100/90">3-4 zones</td>
                      <td className="p-3 text-blue-100/80">&gt; 3 days</td>
                      <td className="p-3 text-blue-100/80">Adjust to destination time</td>
                      <td className="p-3 text-blue-100/80">3-4 days</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-blue-100/90">5-8 zones</td>
                      <td className="p-3 text-blue-100/80">&lt; 2 days</td>
                      <td className="p-3 text-blue-100/80">Stay on home time, use light/darkness strategically</td>
                      <td className="p-3 text-blue-100/80">N/A</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-blue-100/90">5-8 zones</td>
                      <td className="p-3 text-blue-100/80">&gt; 2 days</td>
                      <td className="p-3 text-blue-100/80">Full adjustment with pre-adaptation 3 days before</td>
                      <td className="p-3 text-blue-100/80">5-8 days</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-blue-100/90">9-12 zones</td>
                      <td className="p-3 text-blue-100/80">Any duration</td>
                      <td className="p-3 text-blue-100/80">Treat as opposite direction (9 zones east = 15 zones west)</td>
                      <td className="p-3 text-blue-100/80">Varies by direction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Populations Section */}
      <section id="special-populations" className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
        <h2 className="text-2xl md:text-3xl text-white mb-6 flex items-center gap-3">
          <Users className="w-8 h-8 text-purple-400" />
          Special Populations: Age-Specific Considerations
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 bg-white/5 rounded-lg border border-purple-400/20">
            <h3 className="text-lg text-purple-300 mb-3">Children & Adolescents</h3>
            <ul className="space-y-2 text-sm text-purple-100/80">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Children adapt <strong>faster</strong> than adults (typically 50% quicker recovery)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Maintain consistent meal times to stabilize rhythms</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Avoid melatonin in children without medical supervision</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Use natural light exposure as primary adjustment tool</span>
              </li>
            </ul>
          </div>
          
          <div className="p-5 bg-white/5 rounded-lg border border-purple-400/20">
            <h3 className="text-lg text-purple-300 mb-3">Adults (18-64)</h3>
            <ul className="space-y-2 text-sm text-purple-100/80">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Standard adaptation rate: 1 day per time zone westward, 1.5 days eastward</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Melatonin 0.5-5mg effective for eastward flights</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Exercise timing can accelerate adaptation (morning for eastward, evening for westward)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Caffeine strategic use: align with destination wake times</span>
              </li>
            </ul>
          </div>
          
          <div className="p-5 bg-white/5 rounded-lg border border-purple-400/20">
            <h3 className="text-lg text-purple-300 mb-3">Older Adults (65+)</h3>
            <ul className="space-y-2 text-sm text-purple-100/80">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Adaptation takes <strong>longer</strong> due to weaker circadian signals (add 25-30% to recovery time)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Bright light therapy (10,000 lux) highly effective</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Higher risk of falls and confusion during adaptation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Melatonin lower doses (0.5-1mg) recommended</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
          <h4 className="text-blue-300 mb-2 flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Frequent Flyer Considerations
          </h4>
          <p className="text-sm text-blue-100/80">
            <strong className="text-blue-200">Chronic jet lag</strong> affects flight crews and business travelers crossing multiple time zones regularly. Research shows that repeated circadian disruption can lead to cumulative health effects including increased cardiovascular risk, metabolic syndrome, and cognitive decline. The American Academy of Sleep Medicine recommends at least 3-4 days of circadian realignment between major trips when possible. For unavoidable frequent travel, prioritize sleep quality, maintain exercise routines, and consider consulting a sleep specialist for personalized strategies.
          </p>
        </div>
      </section>
    </article>
  );
}
