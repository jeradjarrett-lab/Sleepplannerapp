import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Moon, Sun, AlertCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { AdPlacement } from './AdPlacement';
import { TimeDial } from './TimeDial';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface SleepCycle {
  time: string;
  cycles: number;
}

// Comprehensive sleep tips database
const sleepTips = [
  "Keep your bedroom cool (60-67°F or 15-19°C) for optimal sleep quality.",
  "Avoid caffeine at least 6 hours before bedtime for better sleep.",
  "Exercise regularly, but not within 3 hours of your bedtime.",
  "Create a relaxing bedtime routine to signal your body it's time to sleep.",
  "Avoid screens (phones, tablets, TV) at least 1 hour before bed.",
  "Keep your bedroom dark - even small amounts of light can disrupt sleep.",
  "Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8.",
  "Avoid large meals within 2-3 hours of bedtime.",
  "If you can't sleep after 20 minutes, get up and do a calming activity.",
  "Maintain a consistent sleep schedule, even on weekends.",
  "Use your bed only for sleep - not for work, eating, or watching TV.",
  "Avoid alcohol before bed - it may help you fall asleep but disrupts sleep quality.",
  "Take a warm bath 1-2 hours before bed to help you relax.",
  "Keep a notepad by your bed to write down worrying thoughts.",
  "Use white noise or earplugs if you're sensitive to sound.",
  "Invest in a comfortable mattress and pillows - they make a huge difference.",
  "Get exposure to natural sunlight during the day to regulate your circadian rhythm.",
  "Avoid napping after 3 PM if you have trouble sleeping at night.",
  "Try progressive muscle relaxation: tense and release each muscle group.",
  "Keep pets out of your bedroom if they disturb your sleep.",
  "Limit fluid intake 2 hours before bed to avoid nighttime bathroom trips.",
  "Use lavender aromatherapy - studies show it can improve sleep quality.",
  "Try reading a physical book (not on a screen) before bed.",
  "Practice meditation or mindfulness to calm racing thoughts.",
  "Avoid clock-watching - it can increase anxiety about sleep.",
  "Open your curtains first thing in the morning to help wake up naturally.",
  "Consider blackout curtains if streetlights or early sun disturb your sleep.",
  "Keep your bedroom at a comfortable humidity level (30-50%).",
  "Try sleep yoga or gentle stretching before bed.",
  "Avoid spicy or acidic foods close to bedtime - they can cause discomfort.",
  "Use the bedroom only for sleep and intimacy - train your brain to associate it with rest.",
  "If you snore loudly, consider getting checked for sleep apnea.",
  "Try magnesium supplements (consult your doctor first) - they may improve sleep.",
  "Listen to calming music or nature sounds before bed.",
  "Wear comfortable, breathable sleepwear - cotton or bamboo works best.",
  "Keep your bedroom well-ventilated for better air quality.",
  "Try chamomile tea 30-60 minutes before bed for its calming effects.",
  "Avoid intense mental activities (work emails, stressful news) before bed.",
  "Use a weighted blanket - many people find them calming and sleep-inducing.",
  "Practice gratitude journaling before bed to reduce stress and anxiety.",
  "If you wake up during the night, avoid checking your phone or clock.",
  "Try the 'body scan' meditation technique to relax your entire body.",
  "Limit daytime naps to 20-30 minutes to avoid disrupting nighttime sleep.",
  "Create a sleep-friendly environment: cool, dark, quiet, and comfortable.",
  "Avoid sugar and refined carbs before bed - they can cause energy spikes.",
  "Try sleeping on your side or back - stomach sleeping can cause neck pain.",
  "Use a sleep mask if you can't make your room completely dark.",
  "Keep your feet warm - cold feet can make it harder to fall asleep.",
  "Try visualization techniques: imagine a peaceful, calming scene.",
  "Avoid vigorous exercise right before bed - opt for gentle stretching instead."
];

// Sleep Tips Component
function SleepTips() {
  const [currentTips, setCurrentTips] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRandomTips = () => {
    const shuffled = [...sleepTips].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    setCurrentTips(getRandomTips());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentTips(getRandomTips());
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 md:p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-white text-base md:text-lg">Sleep Tips</h3>
          </div>
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className="space-y-2">
          {currentTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <p className="text-xs md:text-sm text-white/80">{tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// Convert 24-hour time to 12-hour format with AM/PM
function formatTime12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function generateSleepTimes(baseTime: string, mode: 'wake' | 'sleep'): SleepCycle[] {
  const [hours, minutes] = baseTime.split(':').map(Number);
  const baseMinutes = hours * 60 + minutes;
  const sleepCycleDuration = 90; // minutes
  const fallAsleepTime = 15; // minutes to fall asleep
  
  const results: SleepCycle[] = [];
  
  for (let cycles = 4; cycles <= 6; cycles++) {
    const totalSleepMinutes = cycles * sleepCycleDuration;
    let targetMinutes: number;
    
    if (mode === 'wake') {
      // Calculate bedtime from wake time
      targetMinutes = baseMinutes - totalSleepMinutes - fallAsleepTime;
      if (targetMinutes < 0) targetMinutes += 24 * 60;
    } else {
      // Calculate wake time from bedtime
      targetMinutes = baseMinutes + fallAsleepTime + totalSleepMinutes;
      if (targetMinutes >= 24 * 60) targetMinutes -= 24 * 60;
    }
    
    const targetHours = Math.floor(targetMinutes / 60);
    const targetMins = targetMinutes % 60;
    const period = targetHours >= 12 ? 'PM' : 'AM';
    const displayHours = targetHours === 0 ? 12 : targetHours > 12 ? targetHours - 12 : targetHours;
    
    results.push({
      time: `${displayHours}:${targetMins.toString().padStart(2, '0')} ${period}`,
      cycles: cycles
    });
  }
  
  return results;
}

export function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState('07:00');
  const [bedTime, setBedTime] = useState('22:00');

  const wakeResults = generateSleepTimes(wakeTime, 'wake');
  const sleepResults = generateSleepTimes(bedTime, 'sleep');

  return (
    <div className="space-y-1 md:space-y-2">
      {/* Top Ad - Leaderboard */}
      <AdPlacement size="leaderboard" className="hidden md:block" />
      <AdPlacement size="mobile" className="md:hidden" />

      {/* Hero Section */}
      <div className="text-center space-y-1 px-4">
        <div className="relative inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-500/20 rounded-full mb-1">
          {/* Animated Moon Icon */}
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Moon className="w-6 h-6 md:w-7 md:h-7 text-blue-400" />
          </motion.div>
          
          {/* Floating Z's */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute text-blue-300/80 pointer-events-none"
              initial={{ 
                opacity: 0, 
                x: 15 + index * 6, 
                y: -8,
                scale: 0.7 + index * 0.12
              }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                x: 15 + index * 6 + 8,
                y: [-8, -25 - index * 12],
                scale: 0.7 + index * 0.12,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "easeOut",
              }}
              style={{
                fontSize: `${1 + index * 0.25}rem`,
                fontWeight: 'bold',
              }}
            >
              Z
            </motion.div>
          ))}
        </div>
        <h1 className="text-white text-xl md:text-2xl">Sleep Calculator</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-xs md:text-sm">
          Calculate the best time to go to bed or wake up based on 90-minute sleep cycles.
        </p>
      </div>

      {/* Calculator Card */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
        <Tabs defaultValue="wake" className="p-3 md:p-4">
          <TabsList className="grid w-full grid-cols-2 mb-3 bg-white/5">
            <TabsTrigger value="wake" className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Sun className="w-4 h-4" />
              I want to wake up at...
            </TabsTrigger>
            <TabsTrigger value="sleep" className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Moon className="w-4 h-4" />
              I want to sleep at...
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wake" className="space-y-2">
            <TimeDial
              value={wakeTime}
              onChange={setWakeTime}
              label="Wake up time:"
            />

            {/* Results */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-start gap-2 text-xs md:text-sm text-white/70">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                <p>
                  If you want to wake up at <strong className="text-white">{formatTime12Hour(wakeTime)}</strong>, 
                  you should go to bed at one of these times:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {wakeResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2.5 md:p-3 rounded-lg border-2 transition-all hover:shadow-lg ${
                      index === 1
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="text-center space-y-0.5">
                      <div className="text-2xl md:text-2xl text-white">{result.time}</div>
                      <div className="text-xs text-white/60">
                        {result.cycles} sleep cycles ({result.cycles * 1.5}h)
                      </div>
                      {index === 1 && (
                        <div className="text-xs text-blue-400 mt-0.5">
                          ⭐ Recommended
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-2">
            <TimeDial
              value={bedTime}
              onChange={setBedTime}
              label="Bedtime:"
            />

            {/* Results */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-start gap-2 text-xs md:text-sm text-white/70">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                <p>
                  If you go to bed at <strong className="text-white">{formatTime12Hour(bedTime)}</strong>, 
                  you should wake up at one of these times:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {sleepResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2.5 md:p-3 rounded-lg border-2 transition-all hover:shadow-lg ${
                      index === 1
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="text-center space-y-0.5">
                      <div className="text-2xl md:text-2xl text-white">{result.time}</div>
                      <div className="text-xs text-white/60">
                        {result.cycles} sleep cycles ({result.cycles * 1.5}h)
                      </div>
                      {index === 1 && (
                        <div className="text-xs text-blue-400 mt-0.5">
                          ⭐ Recommended
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Middle Ad Placement */}
      <AdPlacement size="medium" />

      {/* Sleep Tips Section */}
      <SleepTips />

      {/* Bottom Ad Placement */}
      <AdPlacement size="medium" />
    </div>
  );
}
