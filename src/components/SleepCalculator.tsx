import { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Moon, Sun, AlertCircle } from 'lucide-react';
import { AdPlacement } from './AdPlacement';
import { TimeDial } from './TimeDial';
import { motion } from 'motion/react';

interface SleepCycle {
  time: string;
  cycles: number;
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
      <div className="text-center space-y-1 md:space-y-2 px-4">
        <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-full mb-1 md:mb-2">
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
            <Moon className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
          </motion.div>
          
          {/* Floating Z's */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute text-blue-300/80 pointer-events-none"
              initial={{ 
                opacity: 0, 
                x: 20 + index * 8, 
                y: -10,
                scale: 0.8 + index * 0.15
              }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                x: 20 + index * 8 + 10,
                y: [-10, -30 - index * 15],
                scale: 0.8 + index * 0.15,
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "easeOut",
              }}
              style={{
                fontSize: `${1.2 + index * 0.3}rem`,
                fontWeight: 'bold',
              }}
            >
              Z
            </motion.div>
          ))}
        </div>
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl">Sleep Calculator</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
          Calculate the best time to go to bed or wake up based on 90-minute sleep cycles. 
          A good night's sleep consists of 4-6 complete sleep cycles.
        </p>
      </div>

      {/* Calculator Card */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
        <Tabs defaultValue="wake" className="p-4 md:p-6">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/5">
            <TabsTrigger value="wake" className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Sun className="w-4 h-4" />
              I want to wake up at...
            </TabsTrigger>
            <TabsTrigger value="sleep" className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Moon className="w-4 h-4" />
              I want to sleep at...
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wake" className="space-y-3">
            <TimeDial
              value={wakeTime}
              onChange={setWakeTime}
              label="Wake up time:"
            />

            {/* Results */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-start gap-2 text-sm text-white/70">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  If you want to wake up at <strong className="text-white">{formatTime12Hour(wakeTime)}</strong>, 
                  you should go to bed at one of these times:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {wakeResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                      index === 1
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="text-center space-y-1">
                      <div className="text-3xl text-white">{result.time}</div>
                      <div className="text-sm text-white/60">
                        {result.cycles} sleep cycles ({result.cycles * 1.5}h)
                      </div>
                      {index === 1 && (
                        <div className="text-xs text-blue-400 mt-1">
                          ⭐ Recommended
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-3">
            <TimeDial
              value={bedTime}
              onChange={setBedTime}
              label="Bedtime:"
            />

            {/* Results */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-start gap-2 text-sm text-white/70">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  If you go to bed at <strong className="text-white">{formatTime12Hour(bedTime)}</strong>, 
                  you should wake up at one of these times:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sleepResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                      index === 1
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="text-center space-y-1">
                      <div className="text-3xl text-white">{result.time}</div>
                      <div className="text-sm text-white/60">
                        {result.cycles} sleep cycles ({result.cycles * 1.5}h)
                      </div>
                      {index === 1 && (
                        <div className="text-xs text-blue-400 mt-1">
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

      {/* Info Section */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 md:p-6">
        <div className="space-y-3 md:space-y-4 text-white/90">
          <h3 className="text-white text-lg md:text-xl">How does this work?</h3>
          <p className="text-sm md:text-base">
            Sleep cycles last about 90 minutes. Waking up at the end of a cycle, 
            rather than in the middle, helps you feel more refreshed and energized.
          </p>
          <p className="text-sm md:text-base">
            The calculator adds 15 minutes to each bedtime to account for the time 
            it takes to fall asleep. For the best results, aim for 4-6 complete cycles 
            (6-9 hours of sleep).
          </p>
        </div>
      </Card>

      {/* Bottom Ad Placement */}
      <AdPlacement size="medium" />
    </div>
  );
}
