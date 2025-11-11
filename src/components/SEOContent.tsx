import { BookOpen, Brain, Moon, Globe, Award, TrendingUp } from 'lucide-react';

interface SEOContentProps {
  section: 'sleep' | 'recommendations' | 'jetlag';
}

export function SEOContent({ section }: SEOContentProps) {
  if (section === 'sleep') {
    return (
      <article className="mt-12 md:mt-16 space-y-8">
        {/* Main Educational Content */}
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
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
                
                <h3 className="text-xl text-white mt-6 mb-3">
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
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  Why 90-Minute Cycles Matter
                </h3>
                
                <p>
                  Research shows that the average complete sleep cycle lasts approximately <strong className="text-blue-200">90 minutes</strong>. While this can vary slightly from person to person (typically 80-120 minutes), the 90-minute average provides an excellent baseline for calculating optimal sleep times. By aligning your wake time with the end of a complete cycle, you maximize the chances of waking during light sleep.
                </p>
                
                <p>
                  Most adults need <strong className="text-blue-200">5-6 complete sleep cycles</strong> per night, translating to 7.5-9 hours of total sleep. However, quality matters more than quantity. Six complete cycles (9 hours) where you wake naturally at the end is far superior to 10 hours of interrupted or poorly-timed sleep.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  The Sleep Inertia Problem
                </h3>
                
                <p>
                  <strong className="text-blue-200">Sleep inertia</strong> is the groggy, confused state you experience when waking from deep sleep. It can impair cognitive function and physical coordination for 15-60 minutes after waking. Studies have shown that sleep inertia can be as impairing as being legally intoxicated, affecting decision-making, reaction time, and mood.
                </p>
                
                <p>
                  By using our <strong className="text-blue-200">bedtime calculator</strong> to wake at the end of a cycle, you can minimize or eliminate sleep inertia entirely. This is why some people feel refreshed after 7.5 hours but exhausted after 8 hours—they're waking at different points in their sleep cycle.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
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
        <section className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 md:p-8 shadow-2xl">
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

  if (section === 'recommendations') {
    return (
      <article className="mt-12 md:mt-16 space-y-8">
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-4">
                Sleep Requirements by Age: Evidence-Based Guidelines
              </h2>
              
              <div className="space-y-4 text-purple-100/90 leading-relaxed">
                <p>
                  <strong className="text-purple-200">Sleep needs</strong> change dramatically throughout life. The National Sleep Foundation, in collaboration with leading sleep experts, has established comprehensive guidelines based on decades of research. Understanding these age-specific requirements is essential for optimal health, cognitive development, and overall wellbeing.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  Why Sleep Needs Change With Age
                </h3>
                
                <p>
                  As we age, our <strong className="text-purple-200">circadian rhythm</strong>, sleep architecture, and biological needs evolve. Newborns spend about 50% of their sleep in REM (compared to 20-25% in adults) because brain development requires extensive neural processing. Teenagers experience a natural shift in their circadian rhythm, becoming "night owls" due to hormonal changes. Older adults often sleep lighter and wake more frequently due to changes in sleep regulation hormones like melatonin.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  Infant and Child Sleep: Critical for Development
                </h3>
                
                <p>
                  <strong className="text-purple-200">Newborns (0-3 months)</strong> need 14-17 hours of sleep distributed throughout the day and night. Their sleep cycles are shorter (50-60 minutes) and they haven't yet developed a circadian rhythm, which is why they wake frequently for feeding. This high sleep requirement supports rapid brain development—infants form over 1 million neural connections per second during the first few years of life.
                </p>
                
                <p>
                  <strong className="text-purple-200">Infants (4-11 months)</strong> need 12-15 hours, including naps. By this age, circadian rhythms begin to develop, and sleep becomes more consolidated at night. This is when parents can start establishing healthy sleep routines and habits that will benefit the child for years to come.
                </p>
                
                <p>
                  <strong className="text-purple-200">Toddlers (1-2 years)</strong> require 11-14 hours. As they transition from two naps to one, maintaining consistency becomes crucial. Sleep deprivation in toddlers manifests as hyperactivity, tantrums, and difficulty focusing—often misinterpreted as behavioral issues rather than insufficient sleep.
                </p>
                
                <p>
                  <strong className="text-purple-200">Preschoolers (3-5 years)</strong> need 10-13 hours. Many children drop their nap during this period. Adequate sleep at this age is associated with better emotional regulation, improved learning capacity, and reduced risk of childhood obesity.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  School-Age Children and Teenagers
                </h3>
                
                <p>
                  <strong className="text-purple-200">School-age children (6-13 years)</strong> need 9-11 hours of sleep. Studies consistently show that children who get adequate sleep perform better academically, have better attendance, show improved athletic performance, and experience fewer behavioral problems. Unfortunately, early school start times and increasing homework loads often compromise sleep during these critical years.
                </p>
                
                <p>
                  <strong className="text-purple-200">Teenagers (14-17 years)</strong> need 8-10 hours, but fewer than 15% get this amount on school nights. The teenage brain undergoes a <strong className="text-purple-200">delayed sleep phase shift</strong>—their natural bedtime shifts later (around 11 PM or midnight), while schools typically start at 7-8 AM. This biological-social mismatch results in chronic sleep deprivation, contributing to poor academic performance, increased risk of accidents, mental health issues, and obesity.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  Adult Sleep Requirements
                </h3>
                
                <p>
                  <strong className="text-purple-200">Adults (18-64 years)</strong> need 7-9 hours of sleep per night. While individual needs vary, consistently getting less than 7 hours is associated with numerous health risks: increased risk of cardiovascular disease, diabetes, obesity, weakened immune function, cognitive impairment, and mental health disorders. The "sleep debt" accumulated from chronic sleep deprivation cannot be fully repaid with weekend catch-up sleep.
                </p>
                
                <p>
                  <strong className="text-purple-200">Older adults (65+ years)</strong> need 7-8 hours. While the total amount needed decreases slightly, sleep quality often declines due to medical conditions, medications, changes in circadian rhythm, and decreased production of sleep-promoting hormones. Older adults should focus on sleep quality through proper sleep hygiene, regular exercise, and managing health conditions that interfere with sleep.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  Consequences of Insufficient Sleep
                </h3>
                
                <p>
                  Chronic sleep deprivation affects every system in the body. <strong className="text-purple-200">Short-term effects</strong> include impaired attention, memory, decision-making, and increased accident risk. One night of poor sleep can impair cognitive function as much as being legally intoxicated.
                </p>
                
                <p>
                  <strong className="text-purple-200">Long-term consequences</strong> are even more serious: increased risk of obesity (sleep deprivation affects hormones that regulate hunger), type 2 diabetes, cardiovascular disease, hypertension, stroke, depression, anxiety, and reduced life expectancy. In children, chronic sleep deprivation can permanently affect brain development and academic potential.
                </p>
                
                <div className="mt-6 p-5 bg-green-500/10 border-2 border-green-400/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-green-200 mb-2">Key Takeaway</h4>
                      <p className="text-green-100/90 text-sm">
                        Sleep is not a luxury—it's a biological necessity. Prioritizing adequate sleep for yourself and your children is one of the most important health decisions you can make. Use our age-based recommendations as a starting point, but also pay attention to how you feel: if you wake up refreshed, maintain energy throughout the day, and don't rely on caffeine to function, you're likely getting enough sleep.
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
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  The Science of Jet Lag
                </h3>
                
                <p>
                  Your <strong className="text-amber-200">circadian rhythm</strong> is an internal biological clock that regulates sleep-wake cycles, hormone release, body temperature, and other physiological processes over a 24-hour period. This rhythm is primarily controlled by the suprachiasmatic nucleus (SCN) in the brain's hypothalamus, which responds to light exposure.
                </p>
                
                <p>
                  When you travel across time zones, your internal clock remains synchronized to your home time zone while the external environment operates on a different schedule. This mismatch creates jet lag symptoms: <strong className="text-amber-200">fatigue, insomnia, difficulty concentrating, digestive issues, mood changes, and reduced physical performance</strong>. The severity depends on several factors: number of time zones crossed, direction of travel, individual differences, and timing of light exposure.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  Why Direction Matters: East vs. West
                </h3>
                
                <p>
                  <strong className="text-amber-200">Westward travel</strong> (e.g., New York to Los Angeles) typically causes less severe jet lag because you're "gaining" time. Your day becomes longer, which aligns better with the body's natural tendency toward a slightly-longer-than-24-hour circadian rhythm. Most people find it easier to stay awake longer than to fall asleep earlier.
                </p>
                
                <p>
                  <strong className="text-amber-200">Eastward travel</strong> (e.g., Los Angeles to New York) requires you to advance your clock, going to bed and waking earlier than your body wants. This is physiologically more challenging. Research shows that circadian rhythm adjusts approximately 1 hour per day when traveling east, but 1.5 hours per day when traveling west.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
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
                
                <h3 className="text-xl text-white mt-6 mb-3">
                  During-Flight Strategies
                </h3>
                
                <p>
                  <strong className="text-amber-200">Immediately set your watch</strong> to your destination's time zone when you board the plane. This mental shift helps you start thinking in the new time frame. For flight timing: if you arrive in the morning, try to stay awake during the flight; if you arrive in the evening, try to sleep on the plane.
                </p>
                
                <p>
                  <strong className="text-amber-200">Stay hydrated</strong>—airplane cabin air is extremely dry (10-20% humidity vs. 30-65% normally), which exacerbates fatigue. Drink water regularly and avoid excessive alcohol and caffeine, both of which can disrupt sleep quality and dehydrate you further.
                </p>
                
                <h3 className="text-xl text-white mt-6 mb-3">
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
                
                <h3 className="text-xl text-white mt-6 mb-3">
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
