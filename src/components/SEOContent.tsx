import { BookOpen, Brain, Moon, Globe, Award, TrendingUp } from 'lucide-react';

interface SEOContentProps {
  section: 'sleep' | 'caffeine' | 'jetlag';
}

export function SEOContent({ section }: SEOContentProps) {
  if (section === 'sleep') {
    return (
      <article className="mt-12 md:mt-16 space-y-8">
        {/* Main Educational Content */}
        <section id="seo-content" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Understanding Sleep Cycles: The Science Behind Better Sleep
              </h2>
              
              <div className="space-y-4 text-blue-100/90 leading-relaxed">
                <p>
                  <strong className="text-blue-200">Sleep cycles</strong> are the foundation of quality rest. Each night, your body progresses through multiple 90-minute cycles, each containing distinct stages: light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. Understanding and optimizing these cycles is the key to waking up refreshed instead of groggy.
                </p>
                
                <p>
                  The <strong className="text-blue-200">sleep cycle calculator</strong> uses scientific research to help you time your sleep perfectly. When you wake up at the end of a complete cycle during light sleep, you experience minimal sleep inertia—that groggy, disoriented feeling that can last up to an hour. By contrast, waking during deep sleep leaves you feeling exhausted, regardless of total sleep duration.
                </p>
                
                <h3 id="sleep-stages" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  The Four Stages of Sleep
                </h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <h4 className="text-blue-200 mb-2">Stage 1: Light Sleep (N1)</h4>
                    <p className="text-sm">
                      This is the transition between wakefulness and sleep, lasting only a few minutes. Your heartbeat, breathing, and eye movements slow down, and your muscles relax. This stage accounts for about 5% of total sleep time.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <h4 className="text-blue-200 mb-2">Stage 2: Light Sleep (N2)</h4>
                    <p className="text-sm">
                      Your body temperature drops, eye movements stop, and brain waves slow down with occasional bursts of rapid waves called sleep spindles. This stage prepares your body for deep sleep and accounts for about 45% of total sleep.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <h4 className="text-blue-200 mb-2">Stage 3: Deep Sleep (N3)</h4>
                    <p className="text-sm">
                      Also called slow-wave sleep, this is when your body repairs and regenerates tissues, builds muscle and bone, and strengthens the immune system. Deep sleep is crucial for physical recovery and accounts for about 25% of sleep.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <h4 className="text-blue-200 mb-2">REM Sleep</h4>
                    <p className="text-sm">
                      During REM sleep, your brain is highly active, processing emotions and consolidating memories. Your eyes move rapidly, heart rate increases, and most vivid dreams occur. REM sleep accounts for about 25% of total sleep and is essential for learning and mood regulation.
                    </p>
                  </div>
                </div>
                
                <h3 id="sleep-cycles" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Why 90-Minute Cycles Matter
                </h3>
                
                <p>
                  Research shows that the average complete sleep cycle lasts approximately <strong className="text-blue-200">90 minutes</strong>. While this can vary slightly from person to person (typically 80-120 minutes), the 90-minute average provides an excellent baseline for calculating optimal sleep times. By aligning your wake time with the end of a complete cycle, you maximize the chances of waking during light sleep.
                </p>
                
                <p>
                  Most adults need <strong className="text-blue-200">5-6 complete sleep cycles</strong> per night, translating to 7.5-9 hours of total sleep. However, quality matters more than quantity. Six complete cycles (9 hours) where you wake naturally at the end is far superior to 10 hours of interrupted or poorly-timed sleep.
                </p>
                
                <h3 id="sleep-inertia" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  The Sleep Inertia Problem
                </h3>
                
                <p>
                  <strong className="text-blue-200">Sleep inertia</strong> is the groggy, confused state you experience when waking from deep sleep. It can impair cognitive function and physical coordination for 15-60 minutes after waking. Studies have shown that sleep inertia can be as impairing as being legally intoxicated, affecting decision-making, reaction time, and mood.
                </p>
                
                <p>
                  By using our <strong className="text-blue-200">bedtime calculator</strong> to wake at the end of a cycle, you can minimize or eliminate sleep inertia entirely. This is why some people feel refreshed after 7.5 hours but exhausted after 8 hours—they're waking at different points in their sleep cycle.
                </p>
                
                <h3 id="optimizing-schedule" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Optimizing Your Sleep Schedule
                </h3>
                
                <p>
                  To get the most from our <strong className="text-blue-200">sleep calculator</strong>, remember to account for the time it takes to fall asleep (typically 10-20 minutes). If the calculator suggests a 10:00 PM bedtime, try to be in bed with lights out by 9:45 PM. Consistency is also crucial—maintaining regular sleep and wake times, even on weekends, helps regulate your circadian rhythm and improves overall sleep quality.
                </p>
                
                <div className="mt-6 p-5 bg-green-500/10 border-2 border-green-400/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-green-200 mb-2">Pro Tip for Maximum Sleep Quality</h4>
                      <p className="text-green-100/90 text-sm">
                        Combine the 90-minute sleep cycle timing with good sleep hygiene: keep your bedroom cool (60-67°F), dark, and quiet; avoid screens for 1-2 hours before bed; and maintain a consistent sleep schedule. This combination can dramatically improve both sleep quality and daytime alertness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Benefits of Using a Sleep Cycle Calculator
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-white/5 rounded-lg border border-purple-400/20">
                  <h3 className="text-purple-200 mb-2 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Enhanced Cognitive Function
                  </h3>
                  <p className="text-purple-100/80 text-sm">
                    Waking at the right point in your sleep cycle improves memory consolidation, problem-solving abilities, creativity, and decision-making throughout the day.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-purple-400/20">
                  <h3 className="text-purple-200 mb-2 flex items-center gap-2">
                    <Moon className="w-5 h-5" />
                    Reduced Morning Grogginess
                  </h3>
                  <p className="text-purple-100/80 text-sm">
                    Eliminate sleep inertia by timing your wake-up with light sleep phases. Wake up feeling refreshed and alert instead of groggy and disoriented.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-purple-400/20">
                  <h3 className="text-purple-200 mb-2">Better Energy Levels</h3>
                  <p className="text-purple-100/80 text-sm">
                    Proper sleep cycle alignment leads to sustained energy throughout the day, reducing the need for excessive caffeine and avoiding afternoon crashes.
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border border-purple-400/20">
                  <h3 className="text-purple-200 mb-2">Improved Mood & Mental Health</h3>
                  <p className="text-purple-100/80 text-sm">
                    Quality sleep reduces stress, anxiety, and irritability. REM sleep, in particular, plays a crucial role in emotional processing and mood regulation.
                  </p>
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
      <article className="mt-12 md:mt-16 space-y-8">
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Caffeine and Sleep: Science-Based Guide
              </h2>
              
              <div className="space-y-4 text-amber-100/90 leading-relaxed">
                <p>
                  <strong className="text-amber-200">Caffeine</strong> is the world's most widely consumed psychoactive substance, with over 90% of adults consuming it daily. While caffeine provides benefits like increased alertness and improved performance, understanding its effects on sleep is crucial for maintaining healthy sleep patterns and overall wellbeing.
                </p>
                
                <h3 id="caffeine-effects" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  How Caffeine Affects Your Sleep
                </h3>
                
                <p>
                  Caffeine works by blocking <strong className="text-amber-200">adenosine receptors</strong> in the brain. Adenosine is a neurotransmitter that builds up throughout the day, creating sleep pressure and making you feel tired. When caffeine blocks these receptors, it prevents the natural sleep drive from building, keeping you alert. However, this mechanism continues to affect your sleep even hours after consumption, disrupting sleep architecture and reducing overall sleep quality.
                </p>
                
                <h3 id="half-life" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Understanding Caffeine Half-Life
                </h3>
                
                <p>
                  The <strong className="text-amber-200">half-life of caffeine</strong> is approximately 5 hours in healthy adults, meaning it takes 5 hours for your body to eliminate half of the caffeine you consumed. If you drink 200mg of caffeine at 2 PM, you'll still have about 100mg in your system at 7 PM, 50mg at midnight, and 25mg at 5 AM. This extended presence in your system is why afternoon coffee can disrupt nighttime sleep.
                </p>
                
                <p>
                  Individual caffeine metabolism varies significantly based on genetics (particularly the CYP1A2 gene), age, medications, and lifestyle factors. Smokers metabolize caffeine about 50% faster than non-smokers, while pregnant women may take twice as long to eliminate it. Understanding your personal metabolism is key to optimizing caffeine timing.
                </p>
                
                <h3 id="sleep-stages-impact" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Caffeine's Impact on Sleep Stages
                </h3>
                
                <p>
                  Research shows that caffeine consumed even <strong className="text-amber-200">6 hours before bedtime</strong> can significantly reduce total sleep time and sleep efficiency. It particularly affects deep sleep (slow-wave sleep), which is crucial for physical restoration and memory consolidation. Studies have found that 400mg of caffeine taken 6 hours before bed reduces sleep by more than 1 hour.
                </p>
                
                <p>
                  Even when you fall asleep normally after consuming caffeine, your sleep architecture is disrupted. You spend less time in restorative deep sleep stages and may experience more frequent awakenings during the night, even if you don't fully remember them in the morning.
                </p>
                
                <h3 id="tolerance" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Caffeine Tolerance and Sleep
                </h3>
                
                <p>
                  A common misconception is that <strong className="text-amber-200">caffeine tolerance</strong> prevents sleep disruption. While regular caffeine consumers may not feel as jittery or wired, objective sleep studies show that caffeine still impairs sleep quality regardless of tolerance. Your body adapts to the stimulant effects you consciously notice, but the adenosine-blocking mechanism continues to disrupt sleep architecture.
                </p>
                
                <p>
                  Regular caffeine users often underestimate its impact because they've forgotten what truly refreshing, uninterrupted sleep feels like. Many people who eliminate or reduce caffeine report dramatic improvements in sleep quality within 1-2 weeks, even if they didn't think caffeine was affecting them.
                </p>
                
                <h3 id="optimal-timing" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Optimal Caffeine Timing for Better Sleep
                </h3>
                
                <p>
                  For most people, the best strategy is to avoid caffeine at least <strong className="text-amber-200">8-10 hours before bedtime</strong>. If you plan to sleep at 10 PM, have your last caffeinated beverage no later than noon or 2 PM. This allows enough time for your body to metabolize most of the caffeine, reducing its impact on sleep quality.
                </p>
                
                <p>
                  Consider front-loading your caffeine consumption to the morning hours when adenosine levels are naturally highest. This provides energy when you need it most while minimizing evening sleep disruption. Switching to decaffeinated options after lunch can help maintain the ritual and taste of coffee without the sleep penalty.
                </p>
                
                <div className="mt-6 p-5 bg-green-500/10 border-2 border-green-400/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-green-200 mb-2">Key Takeaway</h4>
                      <p className="text-green-100/90 text-sm">
                        Caffeine is a powerful tool for alertness, but timing is everything. By understanding caffeine metabolism and strategically planning your intake, you can enjoy the benefits of caffeine without sacrificing sleep quality. Use our calculator to track your caffeine consumption and discover your optimal cutoff time for the best possible sleep.
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
      <article className="mt-12 md:mt-16 space-y-8">
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-6">
            <Globe className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Understanding and Conquering Jet Lag: A Complete Guide
              </h2>
              
              <div className="space-y-4 text-amber-100/90 leading-relaxed">
                <p>
                  <strong className="text-amber-200">Jet lag</strong>, medically known as desynchronosis, is a temporary sleep disorder that occurs when your internal circadian clock becomes misaligned with the local time at your destination. For the millions of people who travel across time zones each year, jet lag can significantly impact both the enjoyment and productivity of their trips.
                </p>
                
                <h3 id="science" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  The Science of Jet Lag
                </h3>
                
                <p>
                  Your <strong className="text-amber-200">circadian rhythm</strong> is an internal biological clock that regulates sleep-wake cycles, hormone release, body temperature, and other physiological processes over a 24-hour period. This rhythm is primarily controlled by the suprachiasmatic nucleus (SCN) in the brain's hypothalamus, which responds to light exposure.
                </p>
                
                <p>
                  When you travel across time zones, your internal clock remains synchronized to your home time zone while the external environment operates on a different schedule. This mismatch creates jet lag symptoms: <strong className="text-amber-200">fatigue, insomnia, difficulty concentrating, digestive issues, mood changes, and reduced physical performance</strong>. The severity depends on several factors: number of time zones crossed, direction of travel, individual differences, and timing of light exposure.
                </p>
                
                <h3 id="direction-matters" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Why Direction Matters: East vs. West
                </h3>
                
                <p>
                  <strong className="text-amber-200">Westward travel</strong> (e.g., New York to Los Angeles) typically causes less severe jet lag because you're "gaining" time. Your day becomes longer, which aligns better with the body's natural tendency toward a slightly-longer-than-24-hour circadian rhythm. Most people find it easier to stay awake longer than to fall asleep earlier.
                </p>
                
                <p>
                  <strong className="text-amber-200">Eastward travel</strong> (e.g., Los Angeles to New York) requires you to advance your clock, going to bed and waking earlier than your body wants. This is physiologically more challenging. Research shows that circadian rhythm adjusts approximately 1 hour per day when traveling east, but 1.5 hours per day when traveling west.
                </p>
                
                <h3 id="pre-travel" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Pre-Travel Adjustment Strategies
                </h3>
                
                <p>
                  The most effective way to minimize jet lag is to <strong className="text-amber-200">pre-adjust your sleep schedule</strong> before departure. For eastward travel, go to bed 1-2 hours earlier each night for 3 days before your trip. For westward travel, stay up 1-2 hours later. Combine this with strategic light exposure: bright light in the morning for eastward travel, bright light in the evening for westward travel.
                </p>
                
                <div className="p-4 bg-amber-500/10 border border-amber-400/20 rounded-lg my-4">
                  <h4 className="text-amber-200 mb-2">Example Pre-Adjustment Schedule</h4>
                  <p className="text-sm">
                    If traveling from San Francisco to Paris (9 hours ahead), start 3 days before departure:<br/>
                    Day 1: Bedtime at 10 PM (instead of midnight)<br/>
                    Day 2: Bedtime at 8 PM<br/>
                    Day 3: Bedtime at 6 PM<br/>
                    This pre-adjustment can reduce recovery time from 9 days to 3-4 days.
                  </p>
                </div>
                
                <h3 id="during-flight" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  During-Flight Strategies
                </h3>
                
                <p>
                  <strong className="text-amber-200">Immediately set your watch</strong> to your destination's time zone when you board the plane. This mental shift helps you start thinking in the new time frame. For flight timing: if you arrive in the morning, try to stay awake during the flight; if you arrive in the evening, try to sleep on the plane.
                </p>
                
                <p>
                  <strong className="text-amber-200">Stay hydrated</strong>—airplane cabin air is extremely dry (10-20% humidity vs. 30-65% normally), which exacerbates fatigue. Drink water regularly and avoid excessive alcohol and caffeine, both of which can disrupt sleep quality and dehydrate you further.
                </p>
                
                <h3 id="post-arrival" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Post-Arrival Strategies
                </h3>
                
                <p>
                  Upon arrival, <strong className="text-amber-200">immediately adopt the local schedule</strong> for meals, activities, and sleep. This is perhaps the most important strategy. Even if you're exhausted, avoid long naps—limit them to 20-30 minutes if absolutely necessary.
                </p>
                
                <p>
                  <strong className="text-amber-200">Light exposure</strong> is your most powerful tool for resetting your circadian rhythm. For eastward travel, seek bright light (ideally sunlight) in the morning and avoid it in the evening. For westward travel, seek light in the evening and avoid morning light. If natural sunlight isn't available, light therapy lamps (10,000 lux) can be effective.
                </p>
                
                <p>
                  <strong className="text-amber-200">Melatonin supplementation</strong> can help, but timing is crucial. Take 0.5-5mg of melatonin 30 minutes before bedtime at your destination. Melatonin is most effective for eastward travel and for the first few nights after arrival. Consult with a healthcare provider before using supplements.
                </p>
                
                <h3 id="additional-tips" className="text-xl text-white mt-6 mb-3 scroll-mt-24">
                  Additional Tips for Faster Recovery
                </h3>
                
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-amber-200">Exercise strategically:</strong> Morning exercise for eastward travel, evening exercise for westward travel can help shift your circadian rhythm.</li>
                  <li><strong className="text-amber-200">Eat at local meal times:</strong> Food intake is a powerful zeitgeber (time cue) for your body clock.</li>
                  <li><strong className="text-amber-200">Stay active:</strong> Physical activity during the day promotes better sleep at night and helps reset your rhythm.</li>
                  <li><strong className="text-amber-200">Avoid important decisions:</strong> Jet lag impairs cognitive function—avoid making critical decisions during the first 1-2 days.</li>
                  <li><strong className="text-amber-200">Be patient:</strong> Full adjustment takes time. Don't expect perfect sleep on the first night.</li>
                </ul>
                
                <div className="mt-6 p-5 bg-green-500/10 border-2 border-green-400/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-green-200 mb-2">Expert Recommendation</h4>
                      <p className="text-green-100/90 text-sm">
                        For business travelers crossing multiple time zones frequently, maintaining your home time zone for trips shorter than 3 days can be more effective than trying to adjust. For longer trips, use our jet lag calculator to create a personalized adjustment plan starting 3 days before departure. Combining pre-adjustment with strategic light exposure and proper sleep hygiene can reduce jet lag recovery time by up to 50%.
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

  return null;
}
