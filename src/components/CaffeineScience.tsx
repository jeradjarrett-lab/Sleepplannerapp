import { Microscope, Coffee, Brain, Clock, AlertTriangle, CheckCircle, FileText, TrendingUp } from 'lucide-react';

export function CaffeineScience() {
  return (
    <article className="mt-8 space-y-6">
      {/* Scientific Research Section */}
      <section id="scientific-research" className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
        <div className="flex items-start gap-3 mb-6">
          <Microscope className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl text-white mb-4">
              Scientific Research on Caffeine and Sleep
            </h2>
            
            <div className="space-y-4 text-amber-100/90 leading-relaxed">
              <p>
                Caffeine is the <strong className="text-amber-200">world's most widely consumed psychoactive substance</strong>, with approximately 90% of adults consuming it daily. Understanding its pharmacological effects on sleep architecture is crucial for optimizing both alertness and sleep quality.
              </p>
              
              <h3 id="pharmacokinetics" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Caffeine Pharmacokinetics and Metabolism
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-amber-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <Clock className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-amber-200">Half-Life Duration</h4>
                  </div>
                  <p className="text-sm text-amber-100/80">
                    Caffeine has an average half-life of 5-6 hours, meaning it takes this long for your body to eliminate half of the consumed caffeine. However, this varies significantly based on genetics, age, medications, and smoking status. Some individuals (slow metabolizers) can have half-lives exceeding 9 hours.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-amber-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <Brain className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-amber-200">Mechanism of Action</h4>
                  </div>
                  <p className="text-sm text-amber-100/80">
                    Caffeine works by blocking adenosine receptors in the brain. Adenosine is a neurotransmitter that accumulates throughout the day, promoting sleepiness. By blocking these receptors, caffeine prevents the natural sleep drive from building up, keeping you alert but potentially disrupting nighttime sleep.
                  </p>
                </div>
              </div>
              
              <h3 id="research-studies" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Key Research Studies on Caffeine's Sleep Impact
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-amber-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-amber-200">Journal of Clinical Sleep Medicine (2013) - Landmark Timing Study</h4>
                  </div>
                  <p className="text-sm text-amber-100/80">
                    Researchers at Wayne State University and Henry Ford Hospital found that consuming 400mg of caffeine <strong>even 6 hours before bedtime</strong> significantly disrupted sleep. Participants lost over 1 hour of sleep without consciously realizing their sleep was affected. This groundbreaking study demonstrated that afternoon coffee can impact nighttime sleep more than people realize.
                  </p>
                  <div className="mt-2 p-2 bg-amber-500/20 rounded text-xs text-amber-200">
                    <strong>Key Finding:</strong> Caffeine consumed 6 hours before bed reduced total sleep time by 63 minutes on average.
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-amber-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-amber-200">Science Translational Medicine (2015) - Circadian Disruption</h4>
                  </div>
                  <p className="text-sm text-amber-100/80">
                    A study at the University of Colorado Boulder revealed that caffeine consumption 3 hours before bedtime delayed the circadian melatonin rhythm by approximately 40 minutes. This is equivalent to half the effect of bright light exposure and can significantly impact your body's internal clock, making it harder to fall asleep at your desired time.
                  </p>
                  <div className="mt-2 p-2 bg-amber-500/20 rounded text-xs text-amber-200">
                    <strong>Key Finding:</strong> Evening caffeine delays your biological clock, not just masks sleepiness.
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-amber-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-amber-200">Sleep Medicine Reviews (2016) - REM Sleep Reduction</h4>
                  </div>
                  <p className="text-sm text-amber-100/80">
                    A comprehensive meta-analysis of 58 studies found that caffeine consumption reduces REM (Rapid Eye Movement) sleep by an average of 15-20%. REM sleep is crucial for emotional regulation, memory consolidation, and learning. Chronic REM sleep reduction can lead to mood disturbances and cognitive impairments.
                  </p>
                  <div className="mt-2 p-2 bg-amber-500/20 rounded text-xs text-amber-200">
                    <strong>Key Finding:</strong> Caffeine specifically targets REM sleep, the most restorative sleep stage for brain function.
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-amber-400/20">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <h4 className="text-amber-200">Neuropsychopharmacology (2018) - Adenosine System</h4>
                  </div>
                  <p className="text-sm text-amber-100/80">
                    Research from the National Institutes of Health demonstrated that caffeine's effects on adenosine receptors can persist up to 8-10 hours in slow metabolizers, particularly those with genetic variations in the CYP1A2 enzyme. This explains why some individuals are highly sensitive to caffeine while others can drink espresso before bed.
                  </p>
                  <div className="mt-2 p-2 bg-amber-500/20 rounded text-xs text-amber-200">
                    <strong>Key Finding:</strong> Genetic factors determine individual caffeine sensitivity - up to 9-hour half-life in some people.
                  </div>
                </div>
              </div>
              
              <h3 id="caffeine-content" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Caffeine Content in Common Beverages & Foods
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-amber-500/20 border-b border-amber-400/30">
                    <tr>
                      <th className="text-left p-3 text-amber-200">Item</th>
                      <th className="text-left p-3 text-amber-200">Serving Size</th>
                      <th className="text-left p-3 text-amber-200">Caffeine Content</th>
                      <th className="text-left p-3 text-amber-200">Peak Effect Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-400/10">
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Brewed Coffee</td>
                      <td className="p-3 text-amber-100/80">8 oz (240ml)</td>
                      <td className="p-3 text-amber-100/80">95-165 mg</td>
                      <td className="p-3 text-amber-100/80">30-60 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Espresso</td>
                      <td className="p-3 text-amber-100/80">1 oz (30ml)</td>
                      <td className="p-3 text-amber-100/80">47-75 mg</td>
                      <td className="p-3 text-amber-100/80">30-60 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Energy Drink (Red Bull)</td>
                      <td className="p-3 text-amber-100/80">8.4 oz (250ml)</td>
                      <td className="p-3 text-amber-100/80">75-80 mg</td>
                      <td className="p-3 text-amber-100/80">45-60 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Black Tea</td>
                      <td className="p-3 text-amber-100/80">8 oz (240ml)</td>
                      <td className="p-3 text-amber-100/80">25-48 mg</td>
                      <td className="p-3 text-amber-100/80">30-50 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Green Tea</td>
                      <td className="p-3 text-amber-100/80">8 oz (240ml)</td>
                      <td className="p-3 text-amber-100/80">25-29 mg</td>
                      <td className="p-3 text-amber-100/80">30-50 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Cola Soda</td>
                      <td className="p-3 text-amber-100/80">12 oz (355ml)</td>
                      <td className="p-3 text-amber-100/80">23-35 mg</td>
                      <td className="p-3 text-amber-100/80">30-45 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Dark Chocolate</td>
                      <td className="p-3 text-amber-100/80">1 oz (28g)</td>
                      <td className="p-3 text-amber-100/80">12-25 mg</td>
                      <td className="p-3 text-amber-100/80">60-120 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Pre-Workout Supplement</td>
                      <td className="p-3 text-amber-100/80">1 scoop</td>
                      <td className="p-3 text-amber-100/80">150-300 mg</td>
                      <td className="p-3 text-amber-100/80">30-60 min</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-amber-100/90">Caffeine Pill</td>
                      <td className="p-3 text-amber-100/80">1 tablet</td>
                      <td className="p-3 text-amber-100/80">100-200 mg</td>
                      <td className="p-3 text-amber-100/80">30-45 min</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 id="metabolism-factors" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                Individual Factors Affecting Caffeine Metabolism
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-amber-500/10 border-l-4 border-amber-400 rounded">
                  <h4 className="text-amber-200 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Genetic Factors
                  </h4>
                  <ul className="space-y-1 text-sm text-amber-100/80 list-disc list-inside">
                    <li>CYP1A2 enzyme variants (fast vs slow metabolizers)</li>
                    <li>ADORA2A gene variations affect sensitivity</li>
                    <li>Up to 95% variation in metabolism rate</li>
                    <li>Family history predicts tolerance</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-500/10 border-l-4 border-amber-400 rounded">
                  <h4 className="text-amber-200 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Lifestyle Factors
                  </h4>
                  <ul className="space-y-1 text-sm text-amber-100/80 list-disc list-inside">
                    <li>Smoking increases metabolism (50% faster)</li>
                    <li>Pregnancy slows metabolism significantly</li>
                    <li>Oral contraceptives extend half-life</li>
                    <li>Alcohol consumption affects clearance</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-500/10 border-l-4 border-amber-400 rounded">
                  <h4 className="text-amber-200 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Age & Health
                  </h4>
                  <ul className="space-y-1 text-sm text-amber-100/80 list-disc list-inside">
                    <li>Metabolism slows with age (30% slower at 60+)</li>
                    <li>Liver function affects clearance rate</li>
                    <li>Medications can double or triple half-life</li>
                    <li>Body composition influences distribution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits and Risks Section */}
      <section id="benefits-risks" className="bg-gradient-to-br from-green-500/10 to-amber-500/10 backdrop-blur-sm border border-green-400/20 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
        <h2 className="text-2xl md:text-3xl text-white mb-6">
          Caffeine Benefits & Sleep Risks: Evidence-Based Analysis
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-green-300 mb-2">Proven Benefits of Caffeine</h3>
                <ul className="space-y-2 text-sm text-green-100/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span><strong className="text-green-200">Enhanced Alertness:</strong> Improves reaction time by 15-20% within 30 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span><strong className="text-green-200">Cognitive Performance:</strong> Boosts working memory, attention, and focus for 2-3 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span><strong className="text-green-200">Physical Performance:</strong> Increases endurance by 11-12% in athletic activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span><strong className="text-green-200">Mood Enhancement:</strong> Reduces risk of depression by 13% at moderate intake (2-3 cups/day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span><strong className="text-green-200">Disease Prevention:</strong> Associated with 29% lower risk of Parkinson's disease</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span><strong className="text-green-200">Metabolic Benefits:</strong> Increases metabolic rate by 3-11% for 3 hours</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-amber-300 mb-2">Sleep-Related Risks</h3>
                <ul className="space-y-2 text-sm text-amber-100/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-amber-200">Delayed Sleep Onset:</strong> Can increase time to fall asleep by 30-60 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-amber-200">Reduced Total Sleep:</strong> Each 100mg can decrease sleep by 20-40 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-amber-200">REM Suppression:</strong> Reduces REM sleep by 15-20%, affecting memory and mood</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-amber-200">Sleep Fragmentation:</strong> Increases nighttime awakenings by 2-3x</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-amber-200">Circadian Disruption:</strong> Evening caffeine delays body clock by 40+ minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-amber-200">Dependency Risk:</strong> Regular use leads to tolerance and withdrawal symptoms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-amber-200">Anxiety Amplification:</strong> High doses (&gt;400mg) can trigger anxiety and jitters</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
          <h4 className="text-blue-300 mb-2 flex items-center gap-2">
            <Coffee className="w-5 h-5" />
            Expert Consensus: Optimal Caffeine Timing
          </h4>
          <p className="text-sm text-blue-100/80">
            The American Academy of Sleep Medicine recommends avoiding caffeine <strong className="text-blue-200">at least 6-8 hours before bedtime</strong>. For a 10 PM bedtime, this means no caffeine after 2-4 PM. Individual sensitivity varies, so the Caffeine & Sleep Calculator above helps you determine your personal cutoff time based on your typical consumption patterns and desired bedtime.
          </p>
        </div>
      </section>
    </article>
  );
}
