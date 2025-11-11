import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { User, Info, Baby, Users, GraduationCap, Briefcase, Heart, Moon, Sun, Clock, Settings, ChevronDown } from 'lucide-react';
import { AdPlacement } from './AdPlacement';
import { TimeDial } from './TimeDial';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface AgeRecommendation {
  min: number;
  max: number;
  optimal: number;
  ageGroup: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface SleepSchedule {
  naps?: Array<{
    start: string;
    end: string;
    duration: number;
  }>;
  nightSleep: {
    bedtime: string;
    wakeTime: string;
    duration: number;
  };
  totalSleep: number;
  note?: string;
}

function getSuggestedSchedule(age: number): SleepSchedule | null {
  if (age < 0.25) { // 0-3 months
    return {
      naps: [
        { start: '9:00 AM', end: '10:30 AM', duration: 1.5 },
        { start: '12:00 PM', end: '2:00 PM', duration: 2 },
        { start: '3:30 PM', end: '5:00 PM', duration: 1.5 },
      ],
      nightSleep: {
        bedtime: '7:00 PM',
        wakeTime: '7:00 AM',
        duration: 12,
      },
      totalSleep: 17,
      note: 'Newborns sleep in multiple shorter periods throughout the day and night.',
    };
  }
  
  if (age < 1) { // 4-11 months
    return {
      naps: [
        { start: '9:30 AM', end: '11:00 AM', duration: 1.5 },
        { start: '1:30 PM', end: '3:00 PM', duration: 1.5 },
      ],
      nightSleep: {
        bedtime: '7:00 PM',
        wakeTime: '6:30 AM',
        duration: 11.5,
      },
      totalSleep: 14.5,
      note: 'Infants typically take 2-3 naps during the day.',
    };
  }
  
  if (age <= 2) { // 1-2 years
    return {
      naps: [
        { start: '12:30 PM', end: '2:30 PM', duration: 2 },
      ],
      nightSleep: {
        bedtime: '7:00 PM',
        wakeTime: '7:00 AM',
        duration: 12,
      },
      totalSleep: 14,
      note: 'Toddlers usually transition to one afternoon nap.',
    };
  }
  
  if (age <= 3) { // 3 years
    return {
      naps: [
        { start: '12:30 PM', end: '2:30 PM', duration: 2 },
      ],
      nightSleep: {
        bedtime: '7:00 PM',
        wakeTime: '7:00 AM',
        duration: 12,
      },
      totalSleep: 14,
      note: 'Most 3-year-olds still benefit from an afternoon nap.',
    };
  }
  
  if (age <= 4) { // 4 years
    return {
      naps: [
        { start: '1:00 PM', end: '2:30 PM', duration: 1.5 },
      ],
      nightSleep: {
        bedtime: '7:30 PM',
        wakeTime: '7:00 AM',
        duration: 11.5,
      },
      totalSleep: 13,
      note: 'Many 4-year-olds still nap, though some may be ready to drop it.',
    };
  }
  
  if (age <= 5) { // 5 years
    return {
      nightSleep: {
        bedtime: '7:30 PM',
        wakeTime: '6:30 AM',
        duration: 11,
      },
      totalSleep: 11,
      note: 'Most 5-year-olds no longer nap regularly.',
    };
  }
  
  if (age <= 9) { // 6-9 years
    return {
      nightSleep: {
        bedtime: '8:00 PM',
        wakeTime: '6:30 AM',
        duration: 10.5,
      },
      totalSleep: 10.5,
      note: 'Early school-age children need consistent bedtimes for optimal performance.',
    };
  }
  
  if (age <= 13) { // 10-13 years
    return {
      nightSleep: {
        bedtime: '8:30 PM',
        wakeTime: '6:30 AM',
        duration: 10,
      },
      totalSleep: 10,
      note: 'Preteens still need plenty of sleep despite increasing activities.',
    };
  }
  
  if (age <= 17) { // 14-17 years
    return {
      nightSleep: {
        bedtime: '9:30 PM',
        wakeTime: '6:30 AM',
        duration: 9,
      },
      totalSleep: 9,
      note: 'Teenagers often struggle with early school times and biological sleep shifts.',
    };
  }
  
  if (age <= 25) { // 18-25 years
    return {
      nightSleep: {
        bedtime: '10:30 PM',
        wakeTime: '6:30 AM',
        duration: 8,
      },
      totalSleep: 8,
      note: 'Young adults should maintain consistent sleep schedules despite busy lifestyles.',
    };
  }
  
  if (age <= 64) { // 26-64 years
    return {
      nightSleep: {
        bedtime: '10:30 PM',
        wakeTime: '6:30 AM',
        duration: 8,
      },
      totalSleep: 8,
      note: 'Adults benefit most from regular sleep-wake times, even on weekends.',
    };
  }
  
  // 65+ years
  return {
    nightSleep: {
      bedtime: '10:00 PM',
      wakeTime: '6:00 AM',
      duration: 8,
    },
    totalSleep: 8,
    note: 'Older adults may wake more during the night but should aim for 7-8 hours total.',
  };
}

function getAgeRecommendation(age: number): AgeRecommendation {
  if (age < 1) return { 
    min: 14, 
    max: 17, 
    optimal: 15.5, 
    ageGroup: 'Newborns (0-3 months)',
    description: 'Newborns need the most sleep as their bodies and brains are rapidly developing.',
    icon: <Baby className="w-6 h-6" />,
    color: 'pink'
  };
  if (age <= 2) return { 
    min: 11, 
    max: 14, 
    optimal: 12.5, 
    ageGroup: 'Toddlers (1-2 years)',
    description: 'Toddlers are very active and need plenty of sleep to support their growth and learning.',
    icon: <Baby className="w-6 h-6" />,
    color: 'purple'
  };
  if (age <= 5) return { 
    min: 10, 
    max: 13, 
    optimal: 11.5, 
    ageGroup: 'Preschoolers (3-5 years)',
    description: 'Preschoolers benefit from consistent sleep schedules to support cognitive development.',
    icon: <Users className="w-6 h-6" />,
    color: 'indigo'
  };
  if (age <= 13) return { 
    min: 9, 
    max: 11, 
    optimal: 10, 
    ageGroup: 'School Age (6-13 years)',
    description: 'School-age children need adequate sleep for memory consolidation and academic performance.',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'blue'
  };
  if (age <= 17) return { 
    min: 8, 
    max: 10, 
    optimal: 9, 
    ageGroup: 'Teenagers (14-17 years)',
    description: 'Teens often struggle with sleep due to biological changes and early school start times.',
    icon: <Users className="w-6 h-6" />,
    color: 'cyan'
  };
  if (age <= 25) return { 
    min: 7, 
    max: 9, 
    optimal: 8, 
    ageGroup: 'Young Adults (18-25 years)',
    description: 'Young adults need consistent sleep to support brain development and immune function.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'green'
  };
  if (age <= 64) return { 
    min: 7, 
    max: 9, 
    optimal: 8, 
    ageGroup: 'Adults (26-64 years)',
    description: 'Adults should prioritize sleep for optimal health, productivity, and emotional well-being.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'emerald'
  };
  return { 
    min: 7, 
    max: 8, 
    optimal: 7.5, 
    ageGroup: 'Older Adults (65+ years)',
    description: 'Older adults may sleep lighter but still need quality sleep for health and vitality.',
    icon: <Heart className="w-6 h-6" />,
    color: 'amber'
  };
}

const allAgeGroups: AgeRecommendation[] = [
  { 
    min: 14, max: 17, optimal: 15.5, 
    ageGroup: 'Newborns (0-3 months)',
    description: 'Newborns need the most sleep as their bodies and brains are rapidly developing.',
    icon: <Baby className="w-6 h-6" />,
    color: 'pink'
  },
  { 
    min: 11, max: 14, optimal: 12.5, 
    ageGroup: 'Toddlers (1-2 years)',
    description: 'Toddlers are very active and need plenty of sleep to support their growth and learning.',
    icon: <Baby className="w-6 h-6" />,
    color: 'purple'
  },
  { 
    min: 10, max: 13, optimal: 11.5, 
    ageGroup: 'Preschoolers (3-5 years)',
    description: 'Preschoolers benefit from consistent sleep schedules to support cognitive development.',
    icon: <Users className="w-6 h-6" />,
    color: 'indigo'
  },
  { 
    min: 9, max: 11, optimal: 10, 
    ageGroup: 'School Age (6-13 years)',
    description: 'School-age children need adequate sleep for memory consolidation and academic performance.',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'blue'
  },
  { 
    min: 8, max: 10, optimal: 9, 
    ageGroup: 'Teenagers (14-17 years)',
    description: 'Teens often struggle with sleep due to biological changes and early school start times.',
    icon: <Users className="w-6 h-6" />,
    color: 'cyan'
  },
  { 
    min: 7, max: 9, optimal: 8, 
    ageGroup: 'Young Adults (18-25 years)',
    description: 'Young adults need consistent sleep to support brain development and immune function.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'green'
  },
  { 
    min: 7, max: 9, optimal: 8, 
    ageGroup: 'Adults (26-64 years)',
    description: 'Adults should prioritize sleep for optimal health, productivity, and emotional well-being.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'emerald'
  },
  { 
    min: 7, max: 8, optimal: 7.5, 
    ageGroup: 'Older Adults (65+ years)',
    description: 'Older adults may sleep lighter but still need quality sleep for health and vitality.',
    icon: <Heart className="w-6 h-6" />,
    color: 'amber'
  }
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-200', icon: 'text-pink-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-200', icon: 'text-purple-400' },
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-200', icon: 'text-indigo-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-200', icon: 'text-blue-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-200', icon: 'text-cyan-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-200', icon: 'text-green-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-200', icon: 'text-emerald-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-200', icon: 'text-amber-400' }
  };
  
  return colorMap[color] || colorMap.blue;
};

// Helper function to convert time string to hours (e.g., "7:00 PM" -> 19)
function timeToHours(time: string): number {
  if (!time || !time.includes(' ')) {
    return 9; // Default fallback
  }
  
  const [timePart, period] = time.split(' ');
  if (!timePart || !timePart.includes(':')) {
    return 9; // Default fallback
  }
  
  const [hours, minutes] = timePart.split(':').map(Number);
  let hour24 = hours || 0;
  
  if (period === 'PM' && hours !== 12) {
    hour24 = hours + 12;
  } else if (period === 'AM' && hours === 12) {
    hour24 = 0;
  }
  
  return hour24 + (minutes || 0) / 60;
}

// Helper function to convert hours to time string (e.g., 19 -> "7:00 PM")
function hoursToTime(hours: number): string {
  const hour24 = Math.floor(hours) % 24;
  const minutes = Math.round((hours % 1) * 60);
  
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const minuteStr = minutes.toString().padStart(2, '0');
  
  return `${hour12}:${minuteStr} ${period}`;
}

// Helper function to convert HH:MM format to time string
function convertTo12Hour(time24: string): string {
  if (!time24 || !time24.includes(':')) {
    return '9:00 AM'; // Default fallback
  }
  
  const [hours, minutes] = time24.split(':').map(Number);
  let hour12 = (hours || 0) % 12;
  if (hour12 === 0) hour12 = 12;
  const period = (hours || 0) >= 12 ? 'PM' : 'AM';
  return `${hour12}:${(minutes || 0).toString().padStart(2, '0')} ${period}`;
}

// Calculate adjusted schedule based on custom bedtime, wake time, or total hours
function calculateAdjustedSchedule(
  baseSchedule: SleepSchedule,
  customBedtime: string,
  customWakeTime: string,
  adjustMode: 'bedtime' | 'waketime' | 'totalhours',
  customTotalHours?: number
): SleepSchedule {
  const nightDuration = customTotalHours || baseSchedule.nightSleep.duration;
  
  let newBedtime: string;
  let newWakeTime: string;
  
  if (adjustMode === 'bedtime' && customBedtime) {
    // User adjusted bedtime, calculate new wake time
    const bedtimeHours = timeToHours(convertTo12Hour(customBedtime));
    let wakeTimeHours = (bedtimeHours + nightDuration) % 24;
    
    newBedtime = convertTo12Hour(customBedtime);
    newWakeTime = hoursToTime(wakeTimeHours);
  } else if (adjustMode === 'waketime' && customWakeTime) {
    // User adjusted wake time, calculate new bedtime
    const wakeTimeHours = timeToHours(convertTo12Hour(customWakeTime));
    let bedtimeHours = wakeTimeHours - nightDuration;
    if (bedtimeHours < 0) bedtimeHours += 24;
    newBedtime = hoursToTime(bedtimeHours);
    newWakeTime = convertTo12Hour(customWakeTime);
  } else if (adjustMode === 'totalhours') {
    // User adjusted total hours, recalculate wake time based on current bedtime
    const bedtimeHours = timeToHours(convertTo12Hour(customBedtime));
    let wakeTimeHours = (bedtimeHours + nightDuration) % 24;
    
    newBedtime = convertTo12Hour(customBedtime);
    newWakeTime = hoursToTime(wakeTimeHours);
  } else {
    newBedtime = baseSchedule.nightSleep.bedtime;
    newWakeTime = baseSchedule.nightSleep.wakeTime;
  }
  
  return {
    ...baseSchedule,
    nightSleep: {
      bedtime: newBedtime,
      wakeTime: newWakeTime,
      duration: nightDuration,
    },
    totalSleep: (baseSchedule.naps?.reduce((sum, nap) => sum + nap.duration, 0) || 0) + nightDuration,
  };
}

// Helper to convert 12-hour time to 24-hour format for TimeDial
function convertTo24Hour(time: string): string {
  if (!time || !time.includes(' ')) {
    return '09:00'; // Default fallback
  }
  
  const [timePart, period] = time.split(' ');
  if (!timePart || !timePart.includes(':')) {
    return '09:00'; // Default fallback
  }
  
  const [hours, minutes] = timePart.split(':').map(Number);
  let hour24 = hours;
  
  if (period === 'PM' && hours !== 12) {
    hour24 = hours + 12;
  } else if (period === 'AM' && hours === 12) {
    hour24 = 0;
  }
  
  return `${hour24.toString().padStart(2, '0')}:${(minutes || 0).toString().padStart(2, '0')}`;
};

export function SleepRecommendations() {
  const [age, setAge] = useState<string>('');
  const [customBedtime, setCustomBedtime] = useState<string>('');
  const [customWakeTime, setCustomWakeTime] = useState<string>('');
  const [customTotalHours, setCustomTotalHours] = useState<number | null>(null);
  const [adjustMode, setAdjustMode] = useState<'bedtime' | 'waketime' | 'totalhours'>('bedtime');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [activeTimeMode, setActiveTimeMode] = useState<'bedtime' | 'waketime'>('bedtime');

  const ageNum = age ? parseFloat(age) : 0;
  const userRecommendation = ageNum > 0 ? getAgeRecommendation(ageNum) : undefined;
  const baseSchedule = ageNum > 0 ? getSuggestedSchedule(ageNum) : null;

  // Initialize custom times and hours when base schedule changes
  useEffect(() => {
    if (baseSchedule && baseSchedule.nightSleep) {
      const bedtime = convertTo24Hour(baseSchedule.nightSleep.bedtime);
      const wakeTime = convertTo24Hour(baseSchedule.nightSleep.wakeTime);
      
      setCustomBedtime(bedtime);
      setCustomWakeTime(wakeTime);
      setCustomTotalHours(baseSchedule.nightSleep.duration);
    } else {
      // Set default values if no schedule available
      setCustomBedtime('21:00');
      setCustomWakeTime('07:00');
      setCustomTotalHours(8);
    }
  }, [baseSchedule?.nightSleep?.bedtime, baseSchedule?.nightSleep?.wakeTime, baseSchedule?.nightSleep?.duration]);

  // Calculate adjusted schedule based on user's custom times or hours
  const suggestedSchedule = baseSchedule && (customBedtime || customWakeTime || customTotalHours) 
    ? calculateAdjustedSchedule(baseSchedule, customBedtime, customWakeTime, adjustMode, customTotalHours || undefined)
    : baseSchedule;

  const handleBedtimeChange = (time: string) => {
    // When bedtime changes, calculate the new wake time
    const nightDuration = customTotalHours || baseSchedule?.nightSleep.duration || 8;
    const bedtimeHours = timeToHours(convertTo12Hour(time));
    let wakeTimeHours = (bedtimeHours + nightDuration) % 24;
    
    const newWakeTime = hoursToTime(wakeTimeHours);
    const newWakeTime24 = convertTo24Hour(newWakeTime);
    
    // Update both times together to keep them in sync
    setCustomBedtime(time);
    setCustomWakeTime(newWakeTime24);
    setAdjustMode('bedtime');
  };

  const handleWakeTimeChange = (time: string) => {
    // When wake time changes, calculate the new bedtime
    const nightDuration = customTotalHours || baseSchedule?.nightSleep.duration || 8;
    const wakeTimeHours = timeToHours(convertTo12Hour(time));
    let bedtimeHours = wakeTimeHours - nightDuration;
    if (bedtimeHours < 0) bedtimeHours += 24;
    
    const newBedtime = hoursToTime(bedtimeHours);
    const newBedtime24 = convertTo24Hour(newBedtime);
    
    // Update both times together to keep them in sync
    setCustomWakeTime(time);
    setCustomBedtime(newBedtime24);
    setAdjustMode('waketime');
  };

  const handleTotalHoursChange = (hours: number) => {
    // Ensure hours is within the recommended range for the age
    const minHours = userRecommendation?.min || 7;
    const maxHours = userRecommendation?.max || 9;
    const validHours = Math.min(Math.max(hours, minHours), maxHours);
    
    // Recalculate wake time based on current bedtime and new total hours
    const bedtimeHours = timeToHours(convertTo12Hour(customBedtime));
    let wakeTimeHours = (bedtimeHours + validHours) % 24;
    
    const newWakeTime = hoursToTime(wakeTimeHours);
    const newWakeTime24 = convertTo24Hour(newWakeTime);
    
    // Update total hours and wake time together
    setCustomTotalHours(validHours);
    setCustomWakeTime(newWakeTime24);
    setAdjustMode('totalhours');
  };

  return (
    <div className="space-y-1 md:space-y-2">
      {/* Top Ad - Leaderboard (max 90px height) */}
      <AdPlacement size="leaderboard" maxHeight={90} className="hidden md:block" />
      <AdPlacement size="mobile" maxHeight={90} className="md:hidden" />

      {/* Hero Section */}
      <div className="text-center space-y-1 md:space-y-2 px-4">
        <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-full mb-1 md:mb-2">
          {/* Animated User Icon */}
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <User className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
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
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl">Sleep Recommendations by Age</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
          Discover how much sleep you need based on your age. Sleep requirements vary significantly 
          across different life stages.
        </p>
      </div>

      {/* Age Input Card */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-3 md:p-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-blue-400" />
            <h3 className="text-white">Find Your Sleep Needs</h3>
          </div>
          <div className="flex items-center gap-3">
            <label className="min-w-[100px] text-white">Your age:</label>
            <Input
              type="number"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="flex-1 h-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
          
          {userRecommendation && (
            <div className={`mt-4 p-4 rounded-lg border-2 animate-in fade-in duration-300 ${getColorClasses(userRecommendation.color).bg} ${getColorClasses(userRecommendation.color).border}`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border-2 ${getColorClasses(userRecommendation.color).border}`}>
                  <div className={getColorClasses(userRecommendation.color).icon}>
                    {userRecommendation.icon}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <p className={`${getColorClasses(userRecommendation.color).text}`}>
                      <strong>Age Group:</strong> {userRecommendation.ageGroup}
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className={`p-2 rounded-lg bg-white/10 ${getColorClasses(userRecommendation.color).text}`}>
                      <p className="text-xs opacity-70 mb-0.5">Recommended Range</p>
                      <p className="text-xl">{userRecommendation.min}-{userRecommendation.max} hours</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-white/10 ${getColorClasses(userRecommendation.color).text}`}>
                      <p className="text-xs opacity-70 mb-0.5">Optimal</p>
                      <p className="text-xl">{userRecommendation.optimal} hours</p>
                    </div>
                  </div>
                  <p className={`text-sm ${getColorClasses(userRecommendation.color).text} opacity-90`}>
                    {userRecommendation.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Sleep Schedule */}
          {suggestedSchedule && (
            <div className="mt-4 p-4 rounded-lg border-2 bg-blue-500/10 border-blue-500/30 animate-in fade-in duration-300">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h4 className="text-blue-200">Suggested Daily Sleep Schedule</h4>
                </div>

                {/* Adjust Times Section - Collapsible */}
                <Collapsible open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full p-4 rounded-lg bg-white/5 border border-blue-400/20 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4 text-blue-300" />
                          <p className="text-sm text-blue-200">Customize Your Schedule</p>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-blue-300 transition-transform duration-200 ${
                            isCustomizeOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="pt-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-blue-400/20 space-y-3">
                      {/* Total Hours Input */}
                      <div className="p-3 rounded-lg bg-white/5 border border-blue-400/20">
                        <label className="flex items-center gap-2 text-sm text-blue-200 mb-2">
                          <Clock className="w-4 h-4" />
                          Total Night Sleep Hours
                        </label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={userRecommendation?.min || 7}
                            max={userRecommendation?.max || 9}
                            step={0.5}
                            value={customTotalHours || baseSchedule?.nightSleep.duration || 8}
                            onChange={(e) => handleTotalHoursChange(parseFloat(e.target.value) || (userRecommendation?.optimal || 8))}
                            className="flex-1 h-9 bg-white/10 border-white/20 text-white text-center"
                          />
                          <span className="text-blue-200 text-sm">hours</span>
                        </div>
                        <p className="text-xs text-blue-200/50 mt-1.5">
                          Range: {userRecommendation?.min || 7}-{userRecommendation?.max || 9} hours (recommended for your age)
                        </p>
                      </div>

                      {/* Toggle between Bedtime and Wake Time */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveTimeMode('bedtime')}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                            activeTimeMode === 'bedtime'
                              ? 'bg-blue-500/30 border-2 border-blue-400/50 text-blue-100'
                              : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          <Moon className="w-4 h-4" />
                          <span className="text-sm">Adjust Bedtime</span>
                        </button>
                        
                        <button
                          onClick={() => setActiveTimeMode('waketime')}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                            activeTimeMode === 'waketime'
                              ? 'bg-amber-500/30 border-2 border-amber-400/50 text-amber-100'
                              : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          <Sun className="w-4 h-4" />
                          <span className="text-sm">Adjust Wake Time</span>
                        </button>
                      </div>

                      {/* Time Picker - Shows based on active mode */}
                      <div className="bg-[#1a2332] rounded-lg p-3">
                        {activeTimeMode === 'bedtime' ? (
                          <TimeDial
                            value={customBedtime}
                            onChange={handleBedtimeChange}
                            compact
                          />
                        ) : (
                          <TimeDial
                            value={customWakeTime}
                            onChange={handleWakeTimeChange}
                            compact
                          />
                        )}
                      </div>

                      <p className="text-xs text-blue-200/60 mt-2 italic">
                        💡 Adjusting total hours or one time will automatically recalculate to maintain your sleep schedule. Wake times will default to morning hours.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Naps */}
                {suggestedSchedule.naps && suggestedSchedule.naps.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-blue-200/80">Nap Times:</p>
                    <div className="grid gap-1.5">
                      {suggestedSchedule.naps.map((nap, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-blue-400/20">
                          <Moon className="w-4 h-4 text-blue-300" />
                          <div className="flex-1">
                            <p className="text-blue-100 text-sm">
                              Nap {suggestedSchedule.naps!.length > 1 ? `${index + 1}` : ''}
                            </p>
                            <p className="text-sm text-blue-200/70">
                              {nap.start} - {nap.end}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-blue-200">{nap.duration}h</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Night Sleep */}
                <div className="space-y-2">
                  <p className="text-sm text-blue-200/80">Nighttime Sleep:</p>
                  <div className="p-3 rounded-lg bg-white/5 border border-blue-400/20">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Moon className="w-4 h-4 text-blue-300" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-200/70">Bedtime</p>
                          <p className="text-lg text-blue-100">{suggestedSchedule.nightSleep.bedtime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Sun className="w-4 h-4 text-amber-300" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-200/70">Wake Time</p>
                          <p className="text-lg text-blue-100">{suggestedSchedule.nightSleep.wakeTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-blue-400/20">
                      <p className="text-sm text-blue-200/70">
                        Night sleep duration: <span className="text-blue-100 font-semibold">{suggestedSchedule.nightSleep.duration} hours</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Sleep */}
                <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-400/30">
                  <div className="flex items-center justify-between">
                    <p className="text-blue-200">Total Daily Sleep</p>
                    <p className="text-2xl text-blue-100">{suggestedSchedule.totalSleep} hours</p>
                  </div>
                </div>

                {/* Note */}
                {suggestedSchedule.note && (
                  <p className="text-sm text-blue-200/70 italic">
                    💡 {suggestedSchedule.note}
                  </p>
                )}

                <p className="text-xs text-blue-200/50 pt-2 border-t border-blue-400/20">
                  Note: These are suggested times. Adjust based on your daily routine and natural sleep patterns.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Ad Placement */}
      <AdPlacement size="medium" />

      {/* All Age Groups */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-white mb-1">Sleep Recommendations for All Ages</h2>
          <p className="text-white/60">Based on National Sleep Foundation Guidelines</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {allAgeGroups.map((group, index) => {
            const colors = getColorClasses(group.color);
            return (
              <Card 
                key={index} 
                className={`p-3 transition-all hover:shadow-xl ${colors.bg} ${colors.border} border-2`}
              >
                <div className="flex gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border-2 ${colors.border}`}>
                    <div className={colors.icon}>
                      {group.icon}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <h4 className={colors.text}>{group.ageGroup}</h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={`px-2 py-0.5 rounded-full bg-white/10 ${colors.text} text-sm`}>
                        {group.min}-{group.max} hours
                      </div>
                      <div className={`px-2 py-0.5 rounded-full bg-white/15 ${colors.text} text-sm`}>
                        ⭐ {group.optimal}h optimal
                      </div>
                    </div>
                    <p className={`text-sm ${colors.text} opacity-80`}>
                      {group.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Ad Placement */}
      <AdPlacement size="medium" />

      {/* Info Section */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 md:p-6">
        <div className="space-y-3 md:space-y-4 text-white/90">
          <h3 className="text-white text-lg md:text-xl">Why Sleep Needs Change With Age</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="text-white flex items-center gap-2">
                <Info className="w-4 h-4" />
                Infants & Children
              </h4>
              <p>
                Growing bodies and developing brains require more sleep. Deep sleep is crucial 
                for growth hormone release and memory consolidation during these critical years.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white flex items-center gap-2">
                <Info className="w-4 h-4" />
                Adults & Seniors
              </h4>
              <p>
                While sleep needs stabilize in adulthood, quality becomes increasingly important. 
                Older adults may experience lighter sleep but still need 7-8 hours for optimal health.
              </p>
            </div>
          </div>
          <p className="text-xs mt-4 opacity-70">
            Note: These are general guidelines. Individual sleep needs may vary. Consult a healthcare 
            professional if you have concerns about your sleep patterns.
          </p>
        </div>
      </Card>
    </div>
  );
}
