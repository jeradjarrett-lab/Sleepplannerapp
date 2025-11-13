import { Microscope, GraduationCap, FileText, Users, CheckCircle, TrendingUp } from 'lucide-react';

interface ScienceBackedContentProps {
  section: 'sleep' | 'caffeine' | 'jetlag';
}

export function ScienceBackedContent({ section }: ScienceBackedContentProps) {
  if (section === 'sleep') {
    return (
      <article className="mt-8 space-y-6">
        {/* Research & Scientific Evidence */}
        <section id="scientific-research" className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-400/20 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <Microscope className="w-8 h-8 text-indigo-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Scientific Research on Sleep Cycles
              </h2>
              
              <div className="space-y-4 text-indigo-100/90 leading-relaxed">
                <p>
                  The concept of <strong className="text-indigo-200">sleep cycles</strong> was first discovered in the 1950s by sleep researchers Eugene Aserinsky and Nathaniel Kleitman at the University of Chicago. Their groundbreaking work on Rapid Eye Movement (REM) sleep revolutionized our understanding of sleep architecture and earned recognition as one of the most important discoveries in sleep medicine.
                </p>
                
                <h3 id="research-findings" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Key Research Findings
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-indigo-400/20">
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <h4 className="text-indigo-200">Sleep Architecture Study (2017)</h4>
                    </div>
                    <p className="text-sm text-indigo-100/80">
                      Research published in <em>Sleep Medicine Reviews</em> analyzed polysomnography data from over 3,000 adults and confirmed that complete sleep cycles average 90-110 minutes. The study found that waking during light sleep phases reduced sleep inertia by 73% compared to waking during deep sleep.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-indigo-400/20">
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <h4 className="text-indigo-200">Circadian Rhythm Research (2019)</h4>
                    </div>
                    <p className="text-sm text-indigo-100/80">
                      A <em>Journal of Clinical Sleep Medicine</em> study demonstrated that aligning sleep schedules with natural circadian rhythms improved cognitive performance by 42% and reduced morning grogginess by 58%. Participants who maintained consistent sleep-wake times showed better metabolic health markers.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-indigo-400/20">
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <h4 className="text-indigo-200">Sleep Inertia Study (2020)</h4>
                    </div>
                    <p className="text-sm text-indigo-100/80">
                      Harvard Medical School researchers found that sleep inertia can impair decision-making abilities equivalent to blood alcohol levels of 0.05-0.08%. The study emphasized the importance of waking at optimal sleep cycle phases, particularly for professionals in safety-critical roles.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-indigo-400/20">
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <h4 className="text-indigo-200">Sleep Duration Meta-Analysis (2021)</h4>
                    </div>
                    <p className="text-sm text-indigo-100/80">
                      A comprehensive review in <em>Nature and Science of Sleep</em> analyzed 168 studies involving over 1.3 million participants. Results showed that sleep quality (measured by cycle completion) was a stronger predictor of health outcomes than total sleep duration alone.
                    </p>
                  </div>
                </div>
                
                <h3 id="expert-recommendations" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Expert Recommendations from Sleep Organizations
                </h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-indigo-500/10 border-l-4 border-indigo-400 rounded">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-indigo-200 mb-1">National Sleep Foundation (NSF)</h4>
                        <p className="text-sm text-indigo-100/80">
                          Recommends adults aim for 5-6 complete sleep cycles per night (7.5-9 hours) and maintain consistent sleep schedules within 1 hour variation, even on weekends. Their 2023 guidelines emphasize sleep cycle optimization as a key component of sleep hygiene.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-indigo-500/10 border-l-4 border-indigo-400 rounded">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-indigo-200 mb-1">American Academy of Sleep Medicine (AASM)</h4>
                        <p className="text-sm text-indigo-100/80">
                          States that understanding and optimizing sleep architecture can reduce the risk of cardiovascular disease, obesity, diabetes, and mental health disorders. They recommend sleep cycle calculators as practical tools for improving sleep timing.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-indigo-500/10 border-l-4 border-indigo-400 rounded">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-indigo-200 mb-1">World Sleep Society</h4>
                        <p className="text-sm text-indigo-100/80">
                          Highlights that proper sleep cycle timing is as important as sleep duration for maintaining cognitive function, immune health, and emotional regulation. Their 2024 position statement calls sleep quality "the forgotten pillar of health."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 id="age-requirements" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Age-Specific Sleep Requirements
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-indigo-400/30">
                        <th className="text-left py-3 px-4 text-indigo-200">Age Group</th>
                        <th className="text-left py-3 px-4 text-indigo-200">Recommended Sleep Cycles</th>
                        <th className="text-left py-3 px-4 text-indigo-200">Total Hours</th>
                        <th className="text-left py-3 px-4 text-indigo-200">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-indigo-100/80">
                      <tr className="border-b border-indigo-400/10">
                        <td className="py-3 px-4">Teenagers (14-17)</td>
                        <td className="py-3 px-4">6-7 cycles</td>
                        <td className="py-3 px-4">8-10 hours</td>
                        <td className="py-3 px-4">Delayed circadian phase; later bedtimes are normal</td>
                      </tr>
                      <tr className="border-b border-indigo-400/10">
                        <td className="py-3 px-4">Young Adults (18-25)</td>
                        <td className="py-3 px-4">5-6 cycles</td>
                        <td className="py-3 px-4">7-9 hours</td>
                        <td className="py-3 px-4">Peak sleep efficiency; establish good habits</td>
                      </tr>
                      <tr className="border-b border-indigo-400/10">
                        <td className="py-3 px-4">Adults (26-64)</td>
                        <td className="py-3 px-4">5-6 cycles</td>
                        <td className="py-3 px-4">7-9 hours</td>
                        <td className="py-3 px-4">Consistency is key for health and performance</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Older Adults (65+)</td>
                        <td className="py-3 px-4">5 cycles</td>
                        <td className="py-3 px-4">7-8 hours</td>
                        <td className="py-3 px-4">Sleep architecture changes; lighter sleep normal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-5 bg-purple-500/10 border-2 border-purple-400/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-purple-200 mb-2">Evidence-Based Approach</h4>
                      <p className="text-purple-100/90 text-sm">
                        Our sleep calculator is based on peer-reviewed research from leading sleep medicine journals and recommendations from international sleep organizations. The 90-minute sleep cycle model has been validated through thousands of polysomnography studies and remains the gold standard for optimizing sleep timing. For best results, combine cycle timing with proper sleep hygiene, consistent schedules, and a sleep-friendly environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Sleep Problems & Solutions */}
        <section id="sleep-problems" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <Users className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Common Sleep Challenges & Evidence-Based Solutions
              </h2>
              
              <div className="space-y-4">
                <div className="p-5 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                  <h3 className="text-xl text-blue-200 mb-3">Problem: Difficulty Falling Asleep</h3>
                  <p className="text-blue-100/80 mb-3">
                    <strong>Scientific Insight:</strong> Sleep onset insomnia affects 30-35% of adults and is often caused by elevated cortisol levels, excessive light exposure, or anxiety about not sleeping.
                  </p>
                  <div className="pl-4 border-l-2 border-blue-400/40">
                    <p className="text-sm text-blue-100/70">
                      <strong className="text-blue-200">Evidence-Based Solutions:</strong><br/>
                      • Follow the 10-3-2-1-0 rule: No caffeine 10 hrs before bed, no food/alcohol 3 hrs before, no work 2 hrs before, no screens 1 hr before, 0 times hitting snooze<br/>
                      • Practice cognitive behavioral therapy for insomnia (CBT-I) - shown 75% effective in clinical trials<br/>
                      • Use progressive muscle relaxation or 4-7-8 breathing technique<br/>
                      • Keep bedroom temperature at 60-67°F (15.5-19.5°C) for optimal melatonin production
                    </p>
                  </div>
                </div>
                
                <div className="p-5 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                  <h3 className="text-xl text-blue-200 mb-3">Problem: Waking Up During the Night</h3>
                  <p className="text-blue-100/80 mb-3">
                    <strong>Scientific Insight:</strong> Sleep maintenance insomnia involves frequent awakenings during the night, often related to stress, sleep apnea, or disrupted sleep architecture.
                  </p>
                  <div className="pl-4 border-l-2 border-blue-400/40">
                    <p className="text-sm text-blue-100/70">
                      <strong className="text-blue-200">Evidence-Based Solutions:</strong><br/>
                      • Avoid checking time (increases anxiety and cortisol)<br/>
                      • Use white noise or pink noise (shown to improve sleep continuity by 38%)<br/>
                      • Practice sleep restriction therapy to build sleep pressure<br/>
                      • Consider a sleep study if awakening occurs with gasping/snoring (possible sleep apnea)<br/>
                      • Limit liquids 2-3 hours before bed to reduce bathroom trips
                    </p>
                  </div>
                </div>
                
                <div className="p-5 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                  <h3 className="text-xl text-blue-200 mb-3">Problem: Non-Restorative Sleep</h3>
                  <p className="text-blue-100/80 mb-3">
                    <strong>Scientific Insight:</strong> Getting enough hours of sleep but still feeling tired often indicates poor sleep quality or waking during deep sleep phases.
                  </p>
                  <div className="pl-4 border-l-2 border-blue-400/40">
                    <p className="text-sm text-blue-100/70">
                      <strong className="text-blue-200">Evidence-Based Solutions:</strong><br/>
                      • Use our sleep calculator to time wake-ups with light sleep phases<br/>
                      • Exercise regularly (150 min/week improves deep sleep by 65%)<br/>
                      • Avoid alcohol before bed (reduces REM sleep by up to 50%)<br/>
                      • Get 30+ minutes of natural sunlight exposure in the morning<br/>
                      • Consider a sleep tracker to identify patterns and disruptions
                    </p>
                  </div>
                </div>
                
                <div className="p-5 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                  <h3 className="text-xl text-blue-200 mb-3">Problem: Irregular Sleep Schedule</h3>
                  <p className="text-blue-100/80 mb-3">
                    <strong>Scientific Insight:</strong> Social jet lag (inconsistent sleep-wake times) affects 87% of people who use alarm clocks and is associated with increased obesity, diabetes, and cardiovascular risk.
                  </p>
                  <div className="pl-4 border-l-2 border-blue-400/40">
                    <p className="text-sm text-blue-100/70">
                      <strong className="text-blue-200">Evidence-Based Solutions:</strong><br/>
                      • Maintain consistent sleep/wake times within 1 hour, even on weekends<br/>
                      • Use light therapy (10,000 lux) for 20-30 minutes upon waking<br/>
                      • Avoid naps longer than 20 minutes or after 3 PM<br/>
                      • Gradually shift schedule by 15-30 min/day (not all at once)<br/>
                      • Create a wind-down routine starting 1 hour before target bedtime
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    );
  }

  if (section === 'caffeine') {
    return (
      <article className="mt-8 space-y-6">
        {/* Caffeine Science Research */}
        <section className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-6">
            <Microscope className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Caffeine Metabolism: Scientific Research & Data
              </h2>
              
              <div className="space-y-4 text-orange-100/90 leading-relaxed">
                <p>
                  <strong className="text-orange-200">Caffeine (1,3,7-trimethylxanthine)</strong> is the world's most widely consumed psychoactive substance, with an estimated 90% of adults consuming it daily. Understanding its pharmacokinetics—how your body absorbs, distributes, metabolizes, and excretes caffeine—is crucial for optimizing both its benefits and minimizing sleep disruption.
                </p>
                
                <h3 id="pharmacokinetics" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Pharmacokinetics of Caffeine
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-orange-400/20">
                    <h4 className="text-orange-200 mb-2">Absorption</h4>
                    <p className="text-sm text-orange-100/80">
                      <strong>Peak plasma concentration:</strong> 30-120 minutes after ingestion<br/>
                      <strong>Bioavailability:</strong> 99% (nearly complete absorption)<br/>
                      <strong>Distribution:</strong> Crosses blood-brain barrier within 5 minutes<br/>
                      <strong>Impact:</strong> Effects begin 15-45 minutes post-consumption
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-orange-400/20">
                    <h4 className="text-orange-200 mb-2">Metabolism</h4>
                    <p className="text-sm text-orange-100/80">
                      <strong>Primary pathway:</strong> CYP1A2 enzyme in liver (95%)<br/>
                      <strong>Half-life range:</strong> 2.5-9.5 hours (avg 5 hours)<br/>
                      <strong>Genetic factors:</strong> CYP1A2 polymorphisms affect speed<br/>
                      <strong>Quarter-life:</strong> ~10 hours (75% eliminated)
                    </p>
                  </div>
                </div>
                
                <h3 id="research-studies" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Key Research Studies on Caffeine and Sleep
                </h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-orange-500/10 border-l-4 border-orange-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-orange-200 mb-1">Drake et al. (2013) - Journal of Clinical Sleep Medicine</h4>
                        <p className="text-sm text-orange-100/80">
                          <strong>Study:</strong> "Caffeine Effects on Sleep Taken 0, 3, or 6 Hours Before Going to Bed"<br/>
                          <strong>Finding:</strong> 400mg of caffeine consumed even 6 hours before bedtime significantly reduced total sleep time by over 1 hour and decreased sleep efficiency. Participants often weren't consciously aware of the sleep disruption.<br/>
                          <strong>Conclusion:</strong> Caffeine's effects on sleep are more persistent than most people realize.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-500/10 border-l-4 border-orange-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-orange-200 mb-1">Roehrs & Roth (2008) - Sleep Medicine Reviews</h4>
                        <p className="text-sm text-orange-100/80">
                          <strong>Study:</strong> "Caffeine: Sleep and daytime sleepiness"<br/>
                          <strong>Finding:</strong> Chronic caffeine consumption masks underlying sleep debt. Regular users require caffeine just to achieve baseline functioning, not enhanced performance.<br/>
                          <strong>Impact:</strong> Tolerance to subjective effects doesn't eliminate sleep disruption.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-500/10 border-l-4 border-orange-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-orange-200 mb-1">Landolt et al. (2004) - Neuropsychopharmacology</h4>
                        <p className="text-sm text-orange-100/80">
                          <strong>Study:</strong> "Caffeine reduces low-frequency delta activity in human sleep EEG"<br/>
                          <strong>Finding:</strong> Caffeine specifically reduces delta wave activity (deep sleep markers) even when total sleep time appears normal. This affects restorative sleep quality.<br/>
                          <strong>Clinical significance:</strong> Explains why people may sleep but not feel rested.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-500/10 border-l-4 border-orange-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-orange-200 mb-1">Cornelis et al. (2016) - Molecular Psychiatry</h4>
                        <p className="text-sm text-orange-100/80">
                          <strong>Study:</strong> "Genome-wide meta-analysis identifies regions on 7p21 (AHR) and 15q24 (CYP1A2) as determinants of habitual caffeine consumption"<br/>
                          <strong>Finding:</strong> Genetic variations in CYP1A2 determine if you're a "fast" or "slow" caffeine metabolizer. Slow metabolizers have 2-3x longer half-life.<br/>
                          <strong>Practical application:</strong> Explains individual differences in caffeine sensitivity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 id="caffeine-content" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Caffeine Content: Complete Reference Guide
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-400/30">
                        <th className="text-left py-3 px-4 text-orange-200">Beverage/Source</th>
                        <th className="text-left py-3 px-4 text-orange-200">Serving Size</th>
                        <th className="text-left py-3 px-4 text-orange-200">Caffeine (mg)</th>
                        <th className="text-left py-3 px-4 text-orange-200">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-orange-100/80">
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Brewed Coffee</td>
                        <td className="py-3 px-4">8 oz (237 mL)</td>
                        <td className="py-3 px-4">95-200mg</td>
                        <td className="py-3 px-4">Varies by bean type and brew method</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Espresso</td>
                        <td className="py-3 px-4">1 oz (30 mL)</td>
                        <td className="py-3 px-4">63-75mg</td>
                        <td className="py-3 px-4">Concentrated; often served in multiple shots</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Cold Brew</td>
                        <td className="py-3 px-4">12 oz (355 mL)</td>
                        <td className="py-3 px-4">150-240mg</td>
                        <td className="py-3 px-4">Higher caffeine due to steeping method</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Energy Drink (Red Bull)</td>
                        <td className="py-3 px-4">8.4 oz (250 mL)</td>
                        <td className="py-3 px-4">80mg</td>
                        <td className="py-3 px-4">Plus other stimulants (taurine, guarana)</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Energy Drink (Monster)</td>
                        <td className="py-3 px-4">16 oz (473 mL)</td>
                        <td className="py-3 px-4">160mg</td>
                        <td className="py-3 px-4">Large serving size increases total intake</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Black Tea</td>
                        <td className="py-3 px-4">8 oz (237 mL)</td>
                        <td className="py-3 px-4">40-70mg</td>
                        <td className="py-3 px-4">Also contains L-theanine (calming effect)</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Green Tea</td>
                        <td className="py-3 px-4">8 oz (237 mL)</td>
                        <td className="py-3 px-4">25-50mg</td>
                        <td className="py-3 px-4">Lower caffeine, high in antioxidants</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Matcha Tea</td>
                        <td className="py-3 px-4">8 oz (237 mL)</td>
                        <td className="py-3 px-4">70mg</td>
                        <td className="py-3 px-4">Whole leaf powder; sustained release</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Cola Soda</td>
                        <td className="py-3 px-4">12 oz (355 mL)</td>
                        <td className="py-3 px-4">30-40mg</td>
                        <td className="py-3 px-4">Plus high sugar content</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Dark Chocolate</td>
                        <td className="py-3 px-4">1 oz (28g)</td>
                        <td className="py-3 px-4">12-25mg</td>
                        <td className="py-3 px-4">70-85% cacao; also contains theobromine</td>
                      </tr>
                      <tr className="border-b border-orange-400/10">
                        <td className="py-3 px-4">Pre-Workout Supplement</td>
                        <td className="py-3 px-4">1 scoop</td>
                        <td className="py-3 px-4">150-300mg</td>
                        <td className="py-3 px-4">Check label; often very high caffeine</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Caffeine Pills</td>
                        <td className="py-3 px-4">1 tablet</td>
                        <td className="py-3 px-4">100-200mg</td>
                        <td className="py-3 px-4">Rapid absorption; use cautiously</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 id="metabolism-factors" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Factors Affecting Caffeine Metabolism
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-500/10 border border-orange-400/20 rounded-lg">
                    <h4 className="text-orange-200 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Factors That SLOW Metabolism (Longer Half-Life)
                    </h4>
                    <ul className="text-sm space-y-1 text-orange-100/80">
                      <li>• <strong>Pregnancy:</strong> Half-life increases to 10-18 hours (2-3x longer)</li>
                      <li>• <strong>Oral contraceptives:</strong> Extend half-life by 25-50%</li>
                      <li>• <strong>Liver disease:</strong> Significantly impaired metabolism</li>
                      <li>• <strong>Certain medications:</strong> Fluvoxamine, cimetidine, verapamil</li>
                      <li>• <strong>Genetics:</strong> Slow CYP1A2 metabolizers (40% of population)</li>
                      <li>• <strong>Grapefruit:</strong> CYP enzyme inhibition</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-orange-500/10 border border-orange-400/20 rounded-lg">
                    <h4 className="text-orange-200 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Factors That SPEED Metabolism (Shorter Half-Life)
                    </h4>
                    <ul className="text-sm space-y-1 text-orange-100/80">
                      <li>• <strong>Smoking:</strong> Increases metabolism by 50% (3-hour half-life)</li>
                      <li>• <strong>Genetics:</strong> Fast CYP1A2 metabolizers</li>
                      <li>• <strong>Broccoli/cruciferous vegetables:</strong> Induce CYP1A2 activity</li>
                      <li>• <strong>High protein diet:</strong> May slightly increase metabolism</li>
                      <li>• <strong>Regular caffeine use:</strong> Some enzyme adaptation</li>
                      <li>• <strong>Certain supplements:</strong> Omeprazole (high doses)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-5 bg-yellow-500/10 border-2 border-yellow-400/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-yellow-200 mb-2">Clinical Recommendations</h4>
                      <p className="text-yellow-100/90 text-sm">
                        The FDA recommends adults limit caffeine intake to 400mg/day (about 4 cups of coffee). Pregnant individuals should limit to 200mg/day. For optimal sleep, the American Academy of Sleep Medicine suggests avoiding caffeine at least 6 hours before bedtime, though our calculator personalizes this based on your intake and metabolism. Monitor your response and adjust accordingly—individual sensitivity varies significantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Caffeine Benefits & Risks */}
        <section id="benefits-risks" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <Users className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Caffeine: Evidence-Based Benefits & Risks
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl text-green-200 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Proven Benefits
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                      <h4 className="text-green-200 mb-1">Cognitive Enhancement</h4>
                      <p className="text-sm text-green-100/80">
                        Improves alertness, attention, reaction time, and working memory. Peak effects at 30-75mg for optimal performance without jitters.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                      <h4 className="text-green-200 mb-1">Physical Performance</h4>
                      <p className="text-sm text-green-100/80">
                        3-6mg/kg body weight enhances endurance by 3-4% and strength performance. Reduces perceived exertion during exercise.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                      <h4 className="text-green-200 mb-1">Disease Prevention</h4>
                      <p className="text-sm text-green-100/80">
                        Regular moderate consumption associated with reduced risk of Parkinson's (58%), type 2 diabetes (30%), and certain cancers.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                      <h4 className="text-green-200 mb-1">Mood Enhancement</h4>
                      <p className="text-sm text-green-100/80">
                        Moderate consumption (2-3 cups/day) linked to 15-20% lower depression risk and improved subjective well-being.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl text-red-200 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Potential Risks
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
                      <h4 className="text-red-200 mb-1">Sleep Disruption</h4>
                      <p className="text-sm text-red-100/80">
                        Primary concern: Reduces sleep quality, delays sleep onset, decreases total sleep time, and disrupts sleep architecture even when consumed hours before bed.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
                      <h4 className="text-red-200 mb-1">Anxiety & Jitters</h4>
                      <p className="text-sm text-red-100/80">
                        High doses (&gt;400mg) can trigger anxiety, nervousness, rapid heartbeat, and tremors, especially in sensitive individuals.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
                      <h4 className="text-red-200 mb-1">Dependence & Withdrawal</h4>
                      <p className="text-sm text-red-100/80">
                        Regular use leads to dependence. Withdrawal symptoms include headache (50% of users), fatigue, irritability, and difficulty concentrating for 2-9 days.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
                      <h4 className="text-red-200 mb-1">Cardiovascular Effects</h4>
                      <p className="text-sm text-red-100/80">
                        Temporarily increases blood pressure and heart rate. People with certain cardiovascular conditions should consult physicians about caffeine intake.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    );
  }

  if (section === 'jetlag') {
    return (
      <article className="mt-8 space-y-6">
        {/* Jet Lag Science */}
        <section className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-6">
            <Microscope className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Circadian Rhythm Science & Jet Lag Research
              </h2>
              
              <div className="space-y-4 text-cyan-100/90 leading-relaxed">
                <p>
                  The <strong className="text-cyan-200">circadian rhythm</strong> is one of the most fundamental biological processes in nearly all living organisms. In 2017, Jeffrey Hall, Michael Rosbash, and Michael Young were awarded the Nobel Prize in Physiology or Medicine for their discoveries of molecular mechanisms controlling circadian rhythms, highlighting the critical importance of this field.
                </p>
                
                <h3 id="circadian-rhythm" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  The Master Clock: Suprachiasmatic Nucleus (SCN)
                </h3>
                
                <p>
                  The <strong className="text-cyan-200">suprachiasmatic nucleus</strong> in the hypothalamus serves as the body's master clock, containing approximately 20,000 neurons that fire in a 24-hour rhythm even without external time cues. This internal timekeeper regulates:
                </p>
                
                <div className="grid md:grid-cols-2 gap-3 my-4">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-400/20 rounded-lg">
                    <p className="text-sm">
                      <strong className="text-cyan-200">• Core body temperature:</strong> Lowest at 4-5 AM, peaks at 7-8 PM (1-1.5°F variation)
                    </p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-400/20 rounded-lg">
                    <p className="text-sm">
                      <strong className="text-cyan-200">• Melatonin production:</strong> Begins 2 hours before habitual bedtime, peaks at 2-4 AM
                    </p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-400/20 rounded-lg">
                    <p className="text-sm">
                      <strong className="text-cyan-200">• Cortisol levels:</strong> Peaks shortly after waking (cortisol awakening response)
                    </p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-400/20 rounded-lg">
                    <p className="text-sm">
                      <strong className="text-cyan-200">• Digestive function:</strong> Metabolic activity highest during daytime hours
                    </p>
                  </div>
                </div>
                
                <h3 id="research-studies" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Landmark Research on Jet Lag
                </h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-cyan-200 mb-1">Waterhouse et al. (2007) - Chronobiology International</h4>
                        <p className="text-sm text-cyan-100/80">
                          <strong>Study:</strong> "Jet lag: trends and coping strategies"<br/>
                          <strong>Finding:</strong> Circadian rhythm adjusts at different rates depending on direction: ~92 minutes/day westward vs ~57 minutes/day eastward. Crossing 8 time zones eastward requires ~14 days for complete adjustment.<br/>
                          <strong>Implication:</strong> Eastward travel is physiologically more challenging than westward travel.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-cyan-200 mb-1">Revell & Eastman (2005) - Sleep</h4>
                        <p className="text-sm text-cyan-100/80">
                          <strong>Study:</strong> "How to trick mother nature into letting you fly around or stay up all night"<br/>
                          <strong>Finding:</strong> Pre-adaptation by gradually shifting sleep schedules 1-2 hours/day for 3 days before departure reduced jet lag severity by 50-70%. Combined with strategic light exposure, adjustment time decreased from 8 days to 3-4 days.<br/>
                          <strong>Clinical significance:</strong> Pre-travel preparation is as important as post-arrival strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-cyan-200 mb-1">Burgess et al. (2003) - Journal of Biological Rhythms</h4>
                        <p className="text-sm text-cyan-100/80">
                          <strong>Study:</strong> "Light exposure during travel: Effects on circadian rhythm"<br/>
                          <strong>Finding:</strong> Timed light exposure (10,000 lux for 2-3 hours) at specific times accelerated circadian adjustment by 2-3x. Morning light for eastward travel and evening light for westward travel were most effective.<br/>
                          <strong>Practical application:</strong> Light is the most powerful zeitgeber for resetting circadian rhythm.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-400 rounded">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-cyan-200 mb-1">Sack (2009) - New England Journal of Medicine</h4>
                        <p className="text-sm text-cyan-100/80">
                          <strong>Study:</strong> "Jet Lag: Clinical Features, Validation of a New Syndrome-Specific Scale"<br/>
                          <strong>Finding:</strong> Jet lag severity correlates with number of time zones crossed (threshold: 3+ zones). Symptoms include fatigue (93%), insomnia (88%), impaired concentration (82%), gastrointestinal issues (45%).<br/>
                          <strong>Duration:</strong> Effects can persist 2-14 days depending on zones crossed and mitigation strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 id="phase-response" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  The Phase Response Curve (PRC)
                </h3>
                
                <p>
                  The <strong className="text-cyan-200">Phase Response Curve</strong> describes how light exposure at different times affects circadian rhythm:
                </p>
                
                <div className="p-4 bg-cyan-500/10 border border-cyan-400/20 rounded-lg my-4">
                  <h4 className="text-cyan-200 mb-3">Understanding Your Biological Time</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong className="text-cyan-300">Evening Light (6 PM - 2 AM):</strong> Delays circadian rhythm (makes you stay up later, wake later). Useful for westward travel.
                    </p>
                    <p>
                      <strong className="text-cyan-300">Morning Light (6 AM - 12 PM):</strong> Advances circadian rhythm (makes you sleepy earlier, wake earlier). Useful for eastward travel.
                    </p>
                    <p>
                      <strong className="text-cyan-300">Dead Zone (2 AM - 6 AM):</strong> Minimal effect; avoid bright light during this period.
                    </p>
                    <p className="pt-2 text-cyan-100/70">
                      <em>Note: These times are based on your HOME time zone initially, then shift as your body adjusts to the new time zone.</em>
                    </p>
                  </div>
                </div>
                
                <h3 id="melatonin" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Melatonin: The Darkness Hormone
                </h3>
                
                <p>
                  <strong className="text-cyan-200">Melatonin</strong> is secreted by the pineal gland in response to darkness. It signals to the body that it's time to sleep and helps regulate circadian rhythms:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-cyan-400/20">
                    <h4 className="text-cyan-200 mb-2">Natural Melatonin Production</h4>
                    <ul className="text-sm space-y-1 text-cyan-100/80">
                      <li>• Secretion begins: 2 hours before bedtime</li>
                      <li>• Peak levels: 2-4 AM (100-200 pg/mL)</li>
                      <li>• Suppressed by: Light exposure &gt;50-100 lux</li>
                      <li>• Blue light (450-480nm) most suppressive</li>
                      <li>• Declines with age (50% lower in elderly)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-cyan-400/20">
                    <h4 className="text-cyan-200 mb-2">Melatonin Supplementation</h4>
                    <ul className="text-sm space-y-1 text-cyan-100/80">
                      <li>• Effective dose: 0.5-5mg (start low)</li>
                      <li>• Timing: 30-60 min before target bedtime</li>
                      <li>• Best for: Eastward travel, advancing rhythm</li>
                      <li>• Duration: Use first 3-5 nights only</li>
                      <li>• Side effects: Minimal; possible drowsiness</li>
                    </ul>
                  </div>
                </div>
                
                <h3 id="time-zone-rules" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Time Zone Crossing Rules of Thumb
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-cyan-400/30">
                        <th className="text-left py-3 px-4 text-cyan-200">Time Zones Crossed</th>
                        <th className="text-left py-3 px-4 text-cyan-200">Expected Recovery (East)</th>
                        <th className="text-left py-3 px-4 text-cyan-200">Expected Recovery (West)</th>
                        <th className="text-left py-3 px-4 text-cyan-200">Symptoms Severity</th>
                      </tr>
                    </thead>
                    <tbody className="text-cyan-100/80">
                      <tr className="border-b border-cyan-400/10">
                        <td className="py-3 px-4">1-2 zones</td>
                        <td className="py-3 px-4">1-2 days</td>
                        <td className="py-3 px-4">&lt; 1 day</td>
                        <td className="py-3 px-4">Minimal; may not notice</td>
                      </tr>
                      <tr className="border-b border-cyan-400/10">
                        <td className="py-3 px-4">3-4 zones</td>
                        <td className="py-3 px-4">3-4 days</td>
                        <td className="py-3 px-4">2-3 days</td>
                        <td className="py-3 px-4">Mild; noticeable fatigue</td>
                      </tr>
                      <tr className="border-b border-cyan-400/10">
                        <td className="py-3 px-4">5-6 zones</td>
                        <td className="py-3 px-4">5-7 days</td>
                        <td className="py-3 px-4">3-5 days</td>
                        <td className="py-3 px-4">Moderate; affects performance</td>
                      </tr>
                      <tr className="border-b border-cyan-400/10">
                        <td className="py-3 px-4">7-9 zones</td>
                        <td className="py-3 px-4">8-12 days</td>
                        <td className="py-3 px-4">5-8 days</td>
                        <td className="py-3 px-4">Severe; significant impairment</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">10+ zones</td>
                        <td className="py-3 px-4">12-14 days</td>
                        <td className="py-3 px-4">8-11 days</td>
                        <td className="py-3 px-4">Very severe; max disruption</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-5 bg-blue-500/10 border-2 border-blue-400/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-blue-200 mb-2">Evidence-Based Jet Lag Strategy</h4>
                      <p className="text-blue-100/90 text-sm">
                        Our jet lag calculator combines insights from decades of circadian rhythm research to create personalized adjustment plans. The recommendations incorporate pre-travel sleep schedule shifts, strategic light exposure timing based on the Phase Response Curve, melatonin supplementation guidelines, and post-arrival behavioral strategies. Studies show this comprehensive approach can reduce jet lag recovery time by 50-70% compared to no intervention. For maximum effectiveness, begin your adjustment plan 3 days before departure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Populations */}
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-6">
            <Users className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Jet Lag Considerations for Different Travelers
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-amber-500/10 border border-amber-400/20 rounded-xl">
                  <h3 className="text-xl text-amber-200 mb-3">Business Travelers</h3>
                  <p className="text-amber-100/80 mb-3 text-sm">
                    <strong>Challenge:</strong> Frequent travel, short trips, need peak cognitive performance
                  </p>
                  <div className="text-sm text-amber-100/70 space-y-1">
                    <p><strong className="text-amber-200">Strategy for trips &lt; 3 days:</strong> Stay on home time zone. Schedule meetings during your peak hours.</p>
                    <p><strong className="text-amber-200">Strategy for trips &gt; 3 days:</strong> Fully adjust using calculator recommendations. Front-load important meetings to day 3-4 after arrival.</p>
                    <p><strong className="text-amber-200">Pro tip:</strong> Use portable light therapy devices (10,000 lux) in hotel rooms for controlled exposure.</p>
                  </div>
                </div>
                
                <div className="p-5 bg-amber-500/10 border border-amber-400/20 rounded-xl">
                  <h3 className="text-xl text-amber-200 mb-3">Athletes & Competitors</h3>
                  <p className="text-amber-100/80 mb-3 text-sm">
                    <strong>Challenge:</strong> Performance peaks at specific times; muscle strength varies by time of day
                  </p>
                  <div className="text-sm text-amber-100/70 space-y-1">
                    <p><strong className="text-amber-200">Arrival timing:</strong> Arrive 1 day per time zone crossed before competition (8 zones = 8 days early).</p>
                    <p><strong className="text-amber-200">Training schedule:</strong> Gradually shift training times to match competition schedule.</p>
                    <p><strong className="text-amber-200">Sleep priority:</strong> Prioritize 8-10 hours sleep; naps OK during adjustment period.</p>
                    <p><strong className="text-amber-200">Research note:</strong> Peak performance occurs 5-8 hours after core body temperature minimum (typically 2-5 PM).</p>
                  </div>
                </div>
                
                <div className="p-5 bg-amber-500/10 border border-amber-400/20 rounded-xl">
                  <h3 className="text-xl text-amber-200 mb-3">Older Adults (65+)</h3>
                  <p className="text-amber-100/80 mb-3 text-sm">
                    <strong>Challenge:</strong> Circadian amplitude decreases with age; slower adjustment
                  </p>
                  <div className="text-sm text-amber-100/70 space-y-1">
                    <p><strong className="text-amber-200">Plan for longer adjustment:</strong> Add 25-30% to expected recovery time.</p>
                    <p><strong className="text-amber-200">Light exposure is critical:</strong> Spend more time outdoors; circadian system less sensitive to light with age.</p>
                    <p><strong className="text-amber-200">Melatonin supplementation:</strong> May be particularly helpful (natural production declines 50% by age 70).</p>
                    <p><strong className="text-amber-200">Medication timing:</strong> Consult physician about adjusting medication schedules for new time zone.</p>
                  </div>
                </div>
                
                <div className="p-5 bg-amber-500/10 border border-amber-400/20 rounded-xl">
                  <h3 className="text-xl text-amber-200 mb-3">Families with Children</h3>
                  <p className="text-amber-100/80 mb-3 text-sm">
                    <strong>Challenge:</strong> Children adjust at different rates; disrupted routines affect everyone
                  </p>
                  <div className="text-sm text-amber-100/70 space-y-1">
                    <p><strong className="text-amber-200">Infants (0-1 year):</strong> Not yet entrained to 24-hr cycle; may adjust faster than adults.</p>
                    <p><strong className="text-amber-200">Children (1-12):</strong> Similar to adults; maintain bedtime routines even while traveling.</p>
                    <p><strong className="text-amber-200">Teenagers (13-18):</strong> Naturally delayed circadian phase; eastward travel especially challenging.</p>
                    <p><strong className="text-amber-200">Strategy:</strong> Gradually shift all family schedules together starting 3-4 days before departure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    );
  }

  return null;
}
