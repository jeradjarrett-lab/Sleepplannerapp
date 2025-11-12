import { useState } from 'react';
import { Card } from './ui/card';
import { Coffee, AlertCircle, Moon, Clock, Lightbulb, TrendingDown } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Slider } from './ui/slider';
import { TimeDial } from './TimeDial';

interface CaffeineIntake {
  amount: number;
  time: string;
}

interface SleepRecommendation {
  bedtime: string;
  caffeineLevel: number;
  quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  color: string;
  emoji: string;
  description: string;
}

// Common caffeine sources (mg per serving)
const CAFFEINE_SOURCES = [
  { name: 'Coffee (8 oz)', amount: 95 },
  { name: 'Espresso (1 shot)', amount: 63 },
  { name: 'Energy Drink (8 oz)', amount: 80 },
  { name: 'Black Tea (8 oz)', amount: 47 },
  { name: 'Green Tea (8 oz)', amount: 28 },
  { name: 'Soda/Cola (12 oz)', amount: 34 },
  { name: 'Dark Chocolate (1 oz)', amount: 24 },
];

// Caffeine half-life is approximately 5 hours
const CAFFEINE_HALF_LIFE = 5;

function calculateCaffeineLevel(intakes: CaffeineIntake[], currentTime: string): number {
  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  const currentMinutesTotal = currentHours * 60 + currentMinutes;
  
  let totalCaffeine = 0;
  
  intakes.forEach(intake => {
    const [intakeHours, intakeMinutes] = intake.time.split(':').map(Number);
    let intakeMinutesTotal = intakeHours * 60 + intakeMinutes;
    
    // Calculate hours elapsed
    let hoursElapsed = (currentMinutesTotal - intakeMinutesTotal) / 60;
    
    // Handle overnight scenarios
    if (hoursElapsed < 0) {
      hoursElapsed += 24;
    }
    
    // Calculate remaining caffeine using exponential decay
    // Formula: C(t) = C0 * (0.5)^(t/half-life)
    const remainingCaffeine = intake.amount * Math.pow(0.5, hoursElapsed / CAFFEINE_HALF_LIFE);
    totalCaffeine += remainingCaffeine;
  });
  
  return Math.round(totalCaffeine);
}

function generateBedtimeRecommendations(
  totalCaffeine: number,
  lastIntakeTime: string
): SleepRecommendation[] {
  const recommendations: SleepRecommendation[] = [];
  const [lastHours, lastMinutes] = lastIntakeTime.split(':').map(Number);
  const lastIntakeMinutes = lastHours * 60 + lastMinutes;
  
  // Generate recommendations for 6-12 hours after last intake
  const recommendedWaitHours = [6, 8, 10, 12];
  
  recommendedWaitHours.forEach(hours => {
    let bedtimeMinutes = lastIntakeMinutes + (hours * 60);
    
    // Handle overnight
    if (bedtimeMinutes >= 24 * 60) {
      bedtimeMinutes -= 24 * 60;
    }
    
    const bedtimeHours = Math.floor(bedtimeMinutes / 60);
    const bedtimeMins = bedtimeMinutes % 60;
    const period = bedtimeHours >= 12 ? 'PM' : 'AM';
    const displayHours = bedtimeHours === 0 ? 12 : bedtimeHours > 12 ? bedtimeHours - 12 : bedtimeHours;
    
    // Calculate caffeine level at this bedtime
    const caffeineLevel = Math.round(totalCaffeine * Math.pow(0.5, hours / CAFFEINE_HALF_LIFE));
    
    // Determine sleep quality based on caffeine level
    let quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    let color: string;
    let emoji: string;
    let description: string;
    
    if (caffeineLevel > 100) {
      quality = 'Poor';
      color = 'text-red-400';
      emoji = '😫';
      description = 'High caffeine - poor sleep likely';
    } else if (caffeineLevel > 50) {
      quality = 'Fair';
      color = 'text-orange-400';
      emoji = '😴';
      description = 'Moderate caffeine - may affect sleep';
    } else if (caffeineLevel > 25) {
      quality = 'Good';
      color = 'text-blue-400';
      emoji = '😊';
      description = 'Low caffeine - good sleep expected';
    } else {
      quality = 'Excellent';
      color = 'text-green-400';
      emoji = '⭐';
      description = 'Minimal caffeine - excellent sleep';
    }
    
    recommendations.push({
      bedtime: `${displayHours}:${bedtimeMins.toString().padStart(2, '0')} ${period}`,
      caffeineLevel,
      quality,
      color,
      emoji,
      description,
    });
  });
  
  return recommendations;
}

export function CaffeineSleepCalculator() {
  const [caffeineAmount, setCaffeineAmount] = useState<string>('');
  const [intakeTime, setIntakeTime] = useState<string>('09:00');
  const [caffeineIntakes, setCaffeineIntakes] = useState<CaffeineIntake[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('');

  const totalCaffeineConsumed = caffeineIntakes.reduce((sum, intake) => sum + intake.amount, 0);
  const lastIntake = caffeineIntakes.length > 0 
    ? caffeineIntakes[caffeineIntakes.length - 1] 
    : null;

  const handleAddCaffeine = () => {
    const amount = Number(caffeineAmount);
    if (amount > 0 && intakeTime) {
      setCaffeineIntakes([...caffeineIntakes, { amount, time: intakeTime }]);
      setCaffeineAmount('');
    }
  };

  const handleQuickAdd = (source: typeof CAFFEINE_SOURCES[0]) => {
    setCaffeineIntakes([...caffeineIntakes, { amount: source.amount, time: intakeTime }]);
    setSelectedSource('');
  };

  const handleReset = () => {
    setCaffeineIntakes([]);
    setCaffeineAmount('');
  };

  const recommendations = lastIntake 
    ? generateBedtimeRecommendations(totalCaffeineConsumed, lastIntake.time)
    : [];

  // Current caffeine level at 10 PM (typical bedtime)
  const currentCaffeineAt10PM = lastIntake 
    ? calculateCaffeineLevel(caffeineIntakes, '22:00')
    : 0;

  return (
    <div id="calculator" className="space-y-1 md:space-y-2 scroll-mt-24">
      {/* Hero Section */}
      <header className="text-center space-y-1 px-4">
        <div className="relative inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-amber-500/20 rounded-full mb-1">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Coffee className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />
          </motion.div>
          
          {/* Zzzzz sleep animation */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute text-blue-300/70 pointer-events-none select-none"
              initial={{ 
                opacity: 0, 
                x: -8 + index * 5, 
                y: -8,
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                y: [-8, -25 - index * 10],
                x: -8 + index * 5 + Math.sin(index) * 8,
                scale: [0.5, 0.8 + index * 0.15, 1 + index * 0.1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeOut",
              }}
              style={{
                fontSize: `${0.6 + index * 0.15}rem`,
                fontStyle: 'italic',
              }}
            >
              z
            </motion.div>
          ))}
        </div>
        <h1 className="text-white text-xl md:text-2xl">Caffeine & Sleep Calculator</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-xs md:text-sm">
          Track your caffeine intake and discover the optimal bedtime based on caffeine metabolism. 
          Understand how caffeine affects your sleep quality.
        </p>
      </header>

      {/* Caffeine Input Card */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-3 md:p-4">
        <div className="space-y-3">
          <h2 className="text-white text-lg flex items-center gap-2">
            <Coffee className="w-5 h-5 text-amber-400" />
            Track Your Caffeine Intake
          </h2>

          {/* Quick Add Buttons */}
          <div className="space-y-2">
            <Label className="text-white/90 text-sm">Quick Add Common Sources:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {CAFFEINE_SOURCES.map((source) => (
                <Button
                  key={source.name}
                  onClick={() => handleQuickAdd(source)}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-amber-400/50 text-xs h-auto py-2 flex flex-col items-start gap-0.5"
                >
                  <span className="font-medium">{source.name}</span>
                  <span className="text-amber-300 text-[10px]">{source.amount}mg</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <Label className="text-white/90 text-sm">
              Time Consumed
            </Label>
            <TimeDial
              value={intakeTime}
              onChange={setIntakeTime}
              compact={true}
            />
          </div>

          {/* Manual Input */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="caffeine-amount" className="text-white/90 text-sm">
                Caffeine Amount (mg)
              </Label>
              <Input
                id="caffeine-amount"
                type="number"
                min="0"
                max="500"
                value={caffeineAmount}
                onChange={(e) => setCaffeineAmount(e.target.value)}
                placeholder="e.g., 95"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleAddCaffeine}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                disabled={!caffeineAmount || Number(caffeineAmount) <= 0}
              >
                Add Caffeine
              </Button>
            </div>
          </div>

          {/* Current Intake Summary */}
          {caffeineIntakes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-white text-sm mb-2">Today's Caffeine Intake:</h3>
                  <div className="space-y-1">
                    {caffeineIntakes.map((intake, index) => (
                      <div key={index} className="text-xs text-white/80 flex items-center gap-2">
                        <Coffee className="w-3 h-3 text-amber-400" />
                        <span>{intake.amount}mg at {intake.time}</span>
                        <button
                          onClick={() => setCaffeineIntakes(caffeineIntakes.filter((_, i) => i !== index))}
                          className="ml-auto text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <p className="text-white">
                      <strong>Total: {totalCaffeineConsumed}mg</strong>
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Estimated caffeine at 10 PM: <strong className="text-amber-300">{currentCaffeineAt10PM}mg</strong>
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  Reset
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Sleep Impact & Recommendations */}
      <AnimatePresence>
        {caffeineIntakes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-3 md:p-4">
              <div className="space-y-4">
                <h2 className="text-white text-lg flex items-center gap-2">
                  <Moon className="w-5 h-5 text-blue-400" />
                  Sleep Impact & Bedtime Recommendations
                </h2>

                {/* Key Information */}
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <h3 className="text-blue-200 text-sm">Caffeine Half-Life</h3>
                    </div>
                    <p className="text-xs text-white/80">
                      Caffeine has a half-life of <strong className="text-white">~5 hours</strong>. 
                      This means after 5 hours, 50% of the caffeine is still in your system.
                    </p>
                  </div>

                  <div className="p-3 bg-purple-500/10 border border-purple-400/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-purple-400" />
                      <h3 className="text-purple-200 text-sm">Sleep Quality Impact</h3>
                    </div>
                    <p className="text-xs text-white/80">
                      Even <strong className="text-white">25mg</strong> of caffeine at bedtime can reduce sleep quality. 
                      Aim for less than 25mg for optimal rest.
                    </p>
                  </div>
                </div>

                {/* Bedtime Recommendations */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs md:text-sm text-white/70">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Based on your total caffeine intake of <strong className="text-white">{totalCaffeineConsumed}mg</strong>, 
                      here are your recommended bedtimes:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-2.5 md:p-3 rounded-lg border-2 transition-all hover:shadow-lg ${
                          rec.quality === 'Excellent'
                            ? 'bg-green-600/20 border-green-500'
                            : rec.quality === 'Good'
                            ? 'bg-blue-600/20 border-blue-500'
                            : rec.quality === 'Fair'
                            ? 'bg-orange-600/20 border-orange-500'
                            : 'bg-red-600/20 border-red-500'
                        }`}
                      >
                        <div className="text-center space-y-1">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-lg">{rec.emoji}</span>
                            <span className={`text-xs ${rec.color}`}>
                              {rec.quality}
                            </span>
                          </div>
                          <div className="text-2xl md:text-2xl text-white">{rec.bedtime}</div>
                          <div className="text-xs text-white/60">
                            {rec.caffeineLevel}mg remaining
                          </div>
                          <div className="text-xs text-white/50">
                            {rec.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Educational Content */}
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <h3 className="text-white">Understanding Your Results</h3>
                      <div className="text-sm text-white/80 space-y-2">
                        <p>
                          <strong className="text-blue-300">How it works:</strong> Caffeine is metabolized exponentially. 
                          After 5 hours, half remains; after 10 hours, one quarter remains.
                        </p>
                        <p>
                          <strong className="text-green-300">Optimal bedtime:</strong> Choose a bedtime when your caffeine 
                          level is below 25mg for the best sleep quality.
                        </p>
                        <p>
                          <strong className="text-amber-300">Pro tip:</strong> Avoid caffeine 6-8 hours before your target 
                          bedtime. If you drink coffee at 2 PM, aim to sleep after 10 PM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Section */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h2 className="text-white text-lg md:text-xl">Caffeine & Sleep Science</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-blue-300 mb-2">How Caffeine Affects Sleep</h3>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Blocks adenosine receptors (the "sleepy" chemical)</li>
                <li>Reduces total sleep time and sleep efficiency</li>
                <li>Decreases deep sleep (slow-wave sleep)</li>
                <li>Increases sleep onset latency (time to fall asleep)</li>
                <li>Effects persist even when you feel alert</li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-purple-300 mb-2">Caffeine Metabolism Facts</h3>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Half-life varies: 3-7 hours (average 5 hours)</li>
                <li>Genetics affect metabolism speed (CYP1A2 gene)</li>
                <li>Pregnancy can double elimination time</li>
                <li>Smokers metabolize 50% faster than non-smokers</li>
                <li>Tolerance doesn't prevent sleep disruption</li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-green-300 mb-2">Recommended Daily Limits</h3>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Adults: Up to 400mg per day (4 cups of coffee)</li>
                <li>Pregnant women: Up to 200mg per day</li>
                <li>Teens (12-18): Up to 100mg per day</li>
                <li>Children: Avoid caffeine when possible</li>
                <li>Cut off at least 6 hours before bed</li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-amber-300 mb-2">Better Sleep Strategies</h3>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Have last caffeine before 2 PM for 10 PM bedtime</li>
                <li>Switch to decaf after lunch</li>
                <li>Stay hydrated to help flush caffeine</li>
                <li>Exercise helps metabolize caffeine faster</li>
                <li>Track your personal sensitivity level</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
