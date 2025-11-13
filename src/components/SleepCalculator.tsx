import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Moon, Sun, AlertCircle, Lightbulb, RefreshCw, Clock, Coffee, User } from 'lucide-react';
import { TimeDial } from './TimeDial';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SleepCycle {
  time: string;
  cycles: number;
  rating: 'Poor' | 'Fair' | 'Good' | 'Ideal';
  ratingColor: string;
  ratingEmoji: string;
  description: string;
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
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6">
      <aside className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h2 className="text-white text-lg md:text-xl">Essential Sleep Hygiene Guide</h2>
          </div>
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Refresh sleep tips"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
          </Button>
        </div>
        
        {/* Introductory Educational Content */}
        <div className="p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
          <p className="text-sm md:text-base text-blue-100/90 leading-relaxed">
            <strong className="text-blue-200">Sleep hygiene</strong> refers to the habits and environmental factors that contribute to quality sleep. Research shows that combining optimal sleep timing (using our calculator above) with proper sleep hygiene can improve sleep quality by up to 50%. Below are evidence-based practices recommended by sleep scientists and the National Sleep Foundation.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-white text-base md:text-lg flex items-center gap-2">
            <Moon className="w-5 h-5 text-blue-400" />
            Quick Tips for Better Sleep Tonight
          </h3>
          {currentTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
              <p className="text-sm md:text-base text-white/80">{tip}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Comprehensive Sleep Hygiene Information */}
        <div className="mt-6 space-y-4">
          <h3 className="text-white text-base md:text-lg">Complete Sleep Optimization Strategies</h3>
          
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-blue-300 mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Environment Optimization
              </h4>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Keep bedroom temperature between 60-67°F (15-19°C)</li>
                <li>Use blackout curtains or eye masks to block light</li>
                <li>Minimize noise with earplugs or white noise machines</li>
                <li>Invest in a comfortable, supportive mattress</li>
                <li>Use breathable, natural fiber bedding materials</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-purple-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timing & Routine
              </h4>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Maintain consistent sleep/wake times daily</li>
                <li>Avoid long naps (keep under 20-30 minutes)</li>
                <li>Get 10-15 minutes of morning sunlight exposure</li>
                <li>Avoid screens 1-2 hours before bedtime</li>
                <li>Create a relaxing pre-sleep routine</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-green-300 mb-2">Diet & Substances</h4>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Avoid caffeine 6+ hours before bedtime</li>
                <li>Limit alcohol (disrupts REM sleep)</li>
                <li>Don't eat heavy meals within 3 hours of sleep</li>
                <li>Stay hydrated but limit fluids before bed</li>
                <li>Consider light snacks if hungry (not full meals)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-amber-300 mb-2">Physical Activity</h4>
              <ul className="text-sm text-white/80 space-y-1.5 list-disc list-inside">
                <li>Exercise regularly (30+ minutes daily)</li>
                <li>Avoid vigorous exercise 3 hours before bed</li>
                <li>Try relaxation techniques (meditation, yoga)</li>
                <li>Practice deep breathing exercises</li>
                <li>Gentle stretching can promote relaxation</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg">
            <h4 className="text-white mb-2">💡 Pro Tip: The 15-Minute Rule</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              If you can't fall asleep within 15 minutes, get out of bed and do a quiet, non-stimulating activity in low light until you feel sleepy. This prevents your brain from associating your bed with wakefulness. Return to bed only when you feel drowsy, not just tired.
            </p>
          </div>
          
          <div className="p-4 bg-orange-500/10 border border-orange-400/20 rounded-lg">
            <h4 className="text-orange-200 mb-2">When to See a Doctor</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Consult a healthcare provider if you experience persistent insomnia, loud snoring, gasping for air during sleep, excessive daytime sleepiness, difficulty staying awake while driving, or if sleep problems significantly impact your daily life. These could be signs of sleep disorders like sleep apnea, restless leg syndrome, or narcolepsy that require professional treatment.
            </p>
          </div>
        </div>
      </aside>
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

// Age-based sleep recommendations based on National Sleep Foundation guidelines
function getRecommendedSleepByAge(age: number | null): { 
  minHours: number; 
  maxHours: number; 
  ageGroup: string;
  minCycles: number;
  maxCycles: number;
} | null {
  if (age === null || age < 0 || age > 120) return null;
  
  if (age <= 0.25) { // 0-3 months (newborns)
    return { minHours: 14, maxHours: 17, ageGroup: 'Newborns (0-3 months)', minCycles: 9, maxCycles: 11 };
  } else if (age < 1) { // 4-11 months (infants)
    return { minHours: 12, maxHours: 15, ageGroup: 'Infants (4-11 months)', minCycles: 8, maxCycles: 10 };
  } else if (age <= 2) { // 1-2 years (toddlers)
    return { minHours: 11, maxHours: 14, ageGroup: 'Toddlers (1-2 years)', minCycles: 7, maxCycles: 9 };
  } else if (age <= 5) { // 3-5 years (preschoolers)
    return { minHours: 10, maxHours: 13, ageGroup: 'Preschoolers (3-5 years)', minCycles: 7, maxCycles: 9 };
  } else if (age <= 13) { // 6-13 years (school-age)
    return { minHours: 9, maxHours: 11, ageGroup: 'School-age (6-13 years)', minCycles: 6, maxCycles: 7 };
  } else if (age <= 17) { // 14-17 years (teens)
    return { minHours: 8, maxHours: 10, ageGroup: 'Teens (14-17 years)', minCycles: 5, maxCycles: 7 };
  } else if (age <= 25) { // 18-25 years (young adults)
    return { minHours: 7, maxHours: 9, ageGroup: 'Young Adults (18-25 years)', minCycles: 5, maxCycles: 6 };
  } else if (age <= 64) { // 26-64 years (adults)
    return { minHours: 7, maxHours: 9, ageGroup: 'Adults (26-64 years)', minCycles: 5, maxCycles: 6 };
  } else { // 65+ years (older adults)
    return { minHours: 7, maxHours: 8, ageGroup: 'Older Adults (65+ years)', minCycles: 5, maxCycles: 5 };
  }
}

// Get rating based on number of sleep cycles and optional age
function getSleepCycleRating(cycles: number, age: number | null = null): { 
  rating: 'Poor' | 'Fair' | 'Good' | 'Ideal'; 
  ratingColor: string; 
  ratingEmoji: string;
  description: string;
  isRecommendedForAge?: boolean;
} {
  let isRecommendedForAge = false;
  
  // If age is provided, check if this cycle count is recommended for their age
  if (age !== null) {
    const ageRec = getRecommendedSleepByAge(age);
    if (ageRec) {
      isRecommendedForAge = cycles >= ageRec.minCycles && cycles <= ageRec.maxCycles;
    }
  }
  
  switch(cycles) {
    case 4:
      return {
        rating: 'Fair',
        ratingColor: 'text-orange-400',
        ratingEmoji: '😴',
        description: 'Minimum recommended',
        isRecommendedForAge
      };
    case 5:
      return {
        rating: 'Good',
        ratingColor: 'text-blue-400',
        ratingEmoji: '😊',
        description: 'Good for most adults',
        isRecommendedForAge
      };
    case 6:
      return {
        rating: 'Ideal',
        ratingColor: 'text-green-400',
        ratingEmoji: '⭐',
        description: 'Optimal sleep duration',
        isRecommendedForAge
      };
    case 7:
      return {
        rating: 'Good',
        ratingColor: 'text-blue-400',
        ratingEmoji: '😌',
        description: 'Extended rest',
        isRecommendedForAge
      };
    default:
      return {
        rating: 'Poor',
        ratingColor: 'text-red-400',
        ratingEmoji: '😫',
        description: 'Not recommended',
        isRecommendedForAge: false
      };
  }
}

function generateSleepTimes(baseTime: string, mode: 'wake' | 'sleep', age: number | null = null): SleepCycle[] {
  const [hours, minutes] = baseTime.split(':').map(Number);
  const baseMinutes = hours * 60 + minutes;
  const sleepCycleDuration = 90; // minutes
  const fallAsleepTime = 15; // minutes to fall asleep
  
  const results: SleepCycle[] = [];
  
  // Determine cycle range based on age
  let minCycles = 4;
  let maxCycles = 7;
  
  // If age is provided, expand range to ensure we show up to 4 recommended times
  if (age !== null) {
    const ageRec = getRecommendedSleepByAge(age);
    if (ageRec) {
      // Expand range to show at least 4 options around the recommended cycles
      minCycles = Math.max(3, ageRec.minCycles - 1);
      maxCycles = Math.min(11, ageRec.maxCycles + 1);
    }
  }
  
  for (let cycles = minCycles; cycles <= maxCycles; cycles++) {
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
    
    const ratingInfo = getSleepCycleRating(cycles, age);
    
    results.push({
      time: `${displayHours}:${targetMins.toString().padStart(2, '0')} ${period}`,
      cycles: cycles,
      ...ratingInfo
    });
  }
  
  return results;
}

export function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState('07:00');
  const [bedTime, setBedTime] = useState('22:00');
  const [age, setAge] = useState<string>('');

  // Parse age as number or null if not provided
  const parsedAge = age.trim() !== '' && !isNaN(Number(age)) ? Number(age) : null;
  const ageRecommendation = getRecommendedSleepByAge(parsedAge);

  const wakeResults = generateSleepTimes(wakeTime, 'wake', parsedAge);
  const sleepResults = generateSleepTimes(bedTime, 'sleep', parsedAge);

  // When age is provided, separate recommended vs optional times
  let recommendedWakeResults: SleepCycle[] = [];
  let optionalWakeResults: SleepCycle[] = [];
  let recommendedSleepResults: SleepCycle[] = [];
  let optionalSleepResults: SleepCycle[] = [];

  if (parsedAge !== null && ageRecommendation) {
    // Split into recommended (within age range) and optional (outside but close)
    recommendedWakeResults = wakeResults.filter(r => r.isRecommendedForAge);
    optionalWakeResults = wakeResults.filter(r => !r.isRecommendedForAge);
    
    recommendedSleepResults = sleepResults.filter(r => r.isRecommendedForAge);
    optionalSleepResults = sleepResults.filter(r => !r.isRecommendedForAge);
    
    // Ensure we show up to 4 recommended times (already handled in generateSleepTimes)
    // Limit optional to 2 extra options
    optionalWakeResults = optionalWakeResults.slice(0, 2);
    optionalSleepResults = optionalSleepResults.slice(0, 2);
  }
  
  // Final display results
  const filteredWakeResults = parsedAge !== null ? recommendedWakeResults : wakeResults;
  const filteredSleepResults = parsedAge !== null ? recommendedSleepResults : sleepResults;

  return (
    <div id="calculator" className="space-y-1 md:space-y-2 scroll-mt-24">
      {/* Hero Section - Content First, Ads After */}
      <header className="text-center space-y-1 px-4">
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
        <h1 className="text-white text-xl md:text-2xl">Sleep Cycle Calculator - Find Your Perfect Bedtime & Wake Time</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-xs md:text-sm">
          Calculate the best time to go to bed or wake up based on 90-minute sleep cycles. Free bedtime calculator for optimal rest and energy.
        </p>
      </header>

      {/* Calculator Card */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
        <Tabs defaultValue="wake" className="p-3 md:p-4">
          <TabsList className="grid w-full grid-cols-2 mb-3 bg-white/5">
            <TabsTrigger value="wake" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Sun className="w-4 h-4" />
              I want to wake up at...
            </TabsTrigger>
            <TabsTrigger value="sleep" className="gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Moon className="w-4 h-4" />
              I want to sleep at...
            </TabsTrigger>
          </TabsList>

          {/* Optional Age Input */}
          <div className="mb-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="space-y-2">
              <Label htmlFor="age-input" className="text-white/90 text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                Your Age (Optional) - Get personalized recommendations
              </Label>
              <Input
                id="age-input"
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age for personalized advice"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400"
              />
              {parsedAge !== null && ageRecommendation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg"
                >
                  <p className="text-sm text-white/90">
                    <strong className="text-blue-300">{ageRecommendation.ageGroup}:</strong> Based on National Sleep Foundation guidelines, 
                    you need <strong className="text-white">{ageRecommendation.minHours}-{ageRecommendation.maxHours} hours</strong> of sleep 
                    per night ({ageRecommendation.minCycles}-{ageRecommendation.maxCycles} sleep cycles). 
                    We'll show you up to 4 recommended sleep times that match your age-specific needs, plus a few optional alternatives.
                  </p>
                </motion.div>
              )}
              {age.trim() !== '' && parsedAge === null && (
                <p className="text-sm text-orange-300">Please enter a valid age (0-120 years)</p>
              )}
              {age.trim() === '' && (
                <p className="text-xs text-white/50">Leave blank to see all standard sleep cycle options</p>
              )}
            </div>
          </div>

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
                  you should go to bed at one of these times{parsedAge !== null && ageRecommendation ? (
                    <span className="text-blue-300"> (personalized for age {parsedAge})</span>
                  ) : ''}:
                </p>
              </div>

              {filteredWakeResults.length === 0 && parsedAge !== null && (
                <div className="p-4 bg-orange-500/20 border border-orange-400/30 rounded-lg text-center">
                  <p className="text-sm text-orange-200">
                    No standard sleep cycles match your age recommendations. 
                    Consider consulting a sleep specialist for personalized advice.
                  </p>
                </div>
              )}

              {/* Recommended Times */}
              {parsedAge !== null && filteredWakeResults.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-sm text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Recommended for Your Age ({filteredWakeResults.length} option{filteredWakeResults.length !== 1 ? 's' : ''})
                  </h3>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {filteredWakeResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2.5 md:p-3 rounded-lg border-2 transition-all hover:shadow-lg ${
                      parsedAge !== null && result.isRecommendedForAge
                        ? 'bg-purple-600/20 border-purple-400 ring-2 ring-purple-400/50'
                        : result.rating === 'Ideal'
                        ? 'bg-green-600/20 border-green-500'
                        : result.rating === 'Good'
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg">{result.ratingEmoji}</span>
                        <span className={`text-xs ${result.ratingColor}`}>
                          {result.rating}
                        </span>
                      </div>
                      {parsedAge !== null && result.isRecommendedForAge && (
                        <div className="text-xs text-purple-300 flex items-center justify-center gap-1">
                          ✨ Perfect for you
                        </div>
                      )}
                      <div className="text-2xl md:text-2xl text-white">{result.time}</div>
                      <div className="text-xs text-white/60">
                        {result.cycles} cycles ({result.cycles * 1.5}h)
                      </div>
                      <div className="text-xs text-white/50">
                        {result.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Times (when age is provided) */}
              {parsedAge !== null && optionalWakeResults.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm text-white/60 mb-2">
                    Other Options (outside recommended range)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {optionalWakeResults.map((result, index) => (
                      <div
                        key={`optional-${index}`}
                        className="p-2.5 md:p-3 rounded-lg border border-white/20 bg-white/5 transition-all hover:border-white/40 opacity-75"
                      >
                        <div className="text-center space-y-1">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-lg">{result.ratingEmoji}</span>
                            <span className={`text-xs ${result.ratingColor}`}>
                              {result.rating}
                            </span>
                          </div>
                          <div className="text-2xl md:text-2xl text-white/80">{result.time}</div>
                          <div className="text-xs text-white/50">
                            {result.cycles} cycles ({result.cycles * 1.5}h)
                          </div>
                          <div className="text-xs text-white/40">
                            {result.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  you should wake up at one of these times{parsedAge !== null && ageRecommendation ? (
                    <span className="text-blue-300"> (personalized for age {parsedAge})</span>
                  ) : ''}:
                </p>
              </div>

              {filteredSleepResults.length === 0 && parsedAge !== null && (
                <div className="p-4 bg-orange-500/20 border border-orange-400/30 rounded-lg text-center">
                  <p className="text-sm text-orange-200">
                    No standard sleep cycles match your age recommendations. 
                    Consider consulting a sleep specialist for personalized advice.
                  </p>
                </div>
              )}

              {/* Recommended Times */}
              {parsedAge !== null && filteredSleepResults.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-sm text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Recommended for Your Age ({filteredSleepResults.length} option{filteredSleepResults.length !== 1 ? 's' : ''})
                  </h3>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {filteredSleepResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2.5 md:p-3 rounded-lg border-2 transition-all hover:shadow-lg ${
                      parsedAge !== null && result.isRecommendedForAge
                        ? 'bg-purple-600/20 border-purple-400 ring-2 ring-purple-400/50'
                        : result.rating === 'Ideal'
                        ? 'bg-green-600/20 border-green-500'
                        : result.rating === 'Good'
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg">{result.ratingEmoji}</span>
                        <span className={`text-xs ${result.ratingColor}`}>
                          {result.rating}
                        </span>
                      </div>
                      {parsedAge !== null && result.isRecommendedForAge && (
                        <div className="text-xs text-purple-300 flex items-center justify-center gap-1">
                          ✨ Perfect for you
                        </div>
                      )}
                      <div className="text-2xl md:text-2xl text-white">{result.time}</div>
                      <div className="text-xs text-white/60">
                        {result.cycles} cycles ({result.cycles * 1.5}h)
                      </div>
                      <div className="text-xs text-white/50">
                        {result.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Times (when age is provided) */}
              {parsedAge !== null && optionalSleepResults.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm text-white/60 mb-2">
                    Other Options (outside recommended range)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {optionalSleepResults.map((result, index) => (
                      <div
                        key={`optional-${index}`}
                        className="p-2.5 md:p-3 rounded-lg border border-white/20 bg-white/5 transition-all hover:border-white/40 opacity-75"
                      >
                        <div className="text-center space-y-1">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-lg">{result.ratingEmoji}</span>
                            <span className={`text-xs ${result.ratingColor}`}>
                              {result.rating}
                            </span>
                          </div>
                          <div className="text-2xl md:text-2xl text-white/80">{result.time}</div>
                          <div className="text-xs text-white/50">
                            {result.cycles} cycles ({result.cycles * 1.5}h)
                          </div>
                          <div className="text-xs text-white/40">
                            {result.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Sleep Tips Section - Substantial Educational Content */}
      <SleepTips />
    </div>
  );
}
