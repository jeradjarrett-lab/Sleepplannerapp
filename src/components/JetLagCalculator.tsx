import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plane, Sun, Moon, Coffee, ArrowRight, MapPin, Calendar as CalendarIcon, Clock, AlertCircle, Lightbulb, Bed, Eye, EyeOff } from 'lucide-react';
import { AdPlacement } from './AdPlacement';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { TimeDial } from './TimeDial';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { format } from 'date-fns@4.1.0';
import { TimeZoneMap } from './TimeZoneMap';
import { TimezoneCombobox, allTimezones } from './TimezoneCombobox';
import { motion } from 'motion/react';

export function JetLagCalculator() {
  const [fromTimezone, setFromTimezone] = useState('');
  const [toTimezone, setToTimezone] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [departureTime, setDepartureTime] = useState('09:00');
  const [arrivalDate, setArrivalDate] = useState<Date>();
  const [arrivalTime, setArrivalTime] = useState('18:00');
  const [showPlan, setShowPlan] = useState(false);

  // Helper function to convert time string to minutes
  const timeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Helper function to check if arrival is after departure
  const isArrivalAfterDeparture = (): boolean => {
    if (!departureDate || !arrivalDate) return true;
    
    const depDateTime = new Date(departureDate);
    const arrDateTime = new Date(arrivalDate);
    
    // Set the time on both dates
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
    
    depDateTime.setHours(depHours, depMinutes, 0, 0);
    arrDateTime.setHours(arrHours, arrMinutes, 0, 0);
    
    return arrDateTime > depDateTime;
  };

  // Handle departure date change - adjust arrival date if needed
  const handleDepartureDateChange = (date: Date | undefined) => {
    setDepartureDate(date);
    
    // If arrival date exists and is before new departure date, clear it
    if (date && arrivalDate && arrivalDate < date) {
      setArrivalDate(undefined);
    }
  };

  // Handle arrival date change - ensure it's after departure
  const handleArrivalDateChange = (date: Date | undefined) => {
    if (!date) {
      setArrivalDate(date);
      return;
    }
    
    // Check if arrival date+time would be after departure date+time
    if (departureDate) {
      const depDateTime = new Date(departureDate);
      const arrDateTime = new Date(date);
      
      const [depHours, depMinutes] = departureTime.split(':').map(Number);
      const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
      
      depDateTime.setHours(depHours, depMinutes, 0, 0);
      arrDateTime.setHours(arrHours, arrMinutes, 0, 0);
      
      if (arrDateTime <= depDateTime) {
        // If same day, adjust arrival time to be at least 1 hour after departure
        if (date.toDateString() === departureDate.toDateString()) {
          const newArrivalMinutes = timeToMinutes(departureTime) + 60;
          const newHours = Math.floor(newArrivalMinutes / 60) % 24;
          const newMinutes = newArrivalMinutes % 60;
          setArrivalTime(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`);
        }
      }
    }
    
    setArrivalDate(date);
  };

  // Handle arrival time change - ensure it's after departure if same day
  const handleArrivalTimeChange = (time: string) => {
    setArrivalTime(time);
    
    // If same day, ensure arrival time is after departure time
    if (departureDate && arrivalDate && departureDate.toDateString() === arrivalDate.toDateString()) {
      const depMinutes = timeToMinutes(departureTime);
      const arrMinutes = timeToMinutes(time);
      
      if (arrMinutes <= depMinutes) {
        // Adjust to at least 1 hour after departure
        const newArrivalMinutes = depMinutes + 60;
        const newHours = Math.floor(newArrivalMinutes / 60) % 24;
        const newMinutes = newArrivalMinutes % 60;
        setArrivalTime(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleCalculate = () => {
    if (fromTimezone && toTimezone && departureDate) {
      setShowPlan(true);
    }
  };

  const fromTz = allTimezones.find(tz => tz.value === fromTimezone);
  const toTz = allTimezones.find(tz => tz.value === toTimezone);
  const timeDiff = toTz && fromTz ? toTz.offset - fromTz.offset : 0;
  const isEastward = timeDiff > 0;
  const hoursDiff = Math.abs(timeDiff);

  // Convert 24-hour time to 12-hour format with AM/PM
  const formatTime12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getJetLagSeverity = (hours: number) => {
    if (hours <= 2) return { level: 'Minimal', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    if (hours <= 5) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    if (hours <= 8) return { level: 'Significant', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
    return { level: 'Severe', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
  };

  // Calculate sleep schedule adjustments
  const calculateSleepSchedule = () => {
    if (!departureDate) return [];
    
    const daysToAdjust = Math.min(Math.ceil(hoursDiff / 2), 5); // Max 5 days of pre-adjustment
    const shiftPerDay = isEastward ? -60 : 60; // minutes to shift each day (earlier for east, later for west)
    const schedule = [];
    
    // Pre-departure days
    for (let i = daysToAdjust; i >= 1; i--) {
      const dayDate = new Date(departureDate);
      dayDate.setDate(dayDate.getDate() - i);
      
      const minutesShift = shiftPerDay * (daysToAdjust - i + 1);
      const baseBedtime = 22 * 60; // 10 PM in minutes
      const baseWaketime = 7 * 60; // 7 AM in minutes
      
      const adjustedBedtime = baseBedtime + minutesShift;
      const adjustedWaketime = baseWaketime + minutesShift;
      
      const bedHour = Math.floor((adjustedBedtime + 24 * 60) % (24 * 60) / 60);
      const bedMin = Math.floor((adjustedBedtime + 24 * 60) % 60);
      const wakeHour = Math.floor((adjustedWaketime + 24 * 60) % (24 * 60) / 60);
      const wakeMin = Math.floor((adjustedWaketime + 24 * 60) % 60);
      
      schedule.push({
        day: `Day -${i}`,
        date: dayDate,
        bedtime: `${bedHour.toString().padStart(2, '0')}:${bedMin.toString().padStart(2, '0')}`,
        waketime: `${wakeHour.toString().padStart(2, '0')}:${wakeMin.toString().padStart(2, '0')}`,
        lightExposure: isEastward ? 'morning' : 'evening',
        notes: `Shift ${Math.abs(minutesShift)} minutes ${isEastward ? 'earlier' : 'later'}`,
        phase: 'preparation'
      });
    }
    
    // Travel day
    schedule.push({
      day: 'Travel Day',
      date: departureDate,
      bedtime: 'On plane',
      waketime: 'On plane',
      lightExposure: 'Set watch to destination time',
      notes: isEastward ? 'Try to sleep on plane if nighttime at destination' : 'Stay awake during flight',
      phase: 'travel'
    });
    
    // Post-arrival days - approximately 1 day per time zone crossed
    // Rule of thumb: It takes about 1 day per time zone to fully adjust
    let recoveryDays = Math.ceil(hoursDiff);
    
    // Minimum 2 days for any jet lag, maximum 14 days for extreme cases
    recoveryDays = Math.max(2, Math.min(recoveryDays, 14));
    
    // Eastward travel is harder, so add extra recovery time for significant eastward travel
    if (isEastward && hoursDiff > 5) {
      recoveryDays = Math.min(recoveryDays + Math.ceil(hoursDiff * 0.2), 14);
    }
    
    for (let i = 1; i <= recoveryDays; i++) {
      const dayDate = arrivalDate ? new Date(arrivalDate) : new Date(departureDate);
      if (!arrivalDate) {
        dayDate.setDate(dayDate.getDate() + 1); // Estimate next day if no arrival date
      }
      dayDate.setDate(dayDate.getDate() + i - 1);
      
      // Gradually adjust to destination time
      const progressPercent = i / recoveryDays;
      const destinationBedtime = 22; // 10 PM
      const destinationWaketime = 7; // 7 AM
      
      const bedHour = destinationBedtime;
      const wakeHour = destinationWaketime;
      
      let dayNotes = '';
      const percentAdjusted = Math.round((i / recoveryDays) * 100);
      
      if (i === 1) {
        dayNotes = 'First day is critical: Stay awake until at least 9 PM local time. No naps longer than 20 minutes. Get sunlight exposure.';
      } else if (i === 2) {
        dayNotes = 'Continue with local schedule. Short power nap (20 min max) OK if needed. Avoid caffeine after 2 PM.';
      } else if (i === 3) {
        dayNotes = 'Your body is adjusting. Maintain consistent sleep/wake times. Exercise helps but avoid late workouts.';
      } else if (i <= Math.ceil(recoveryDays / 2)) {
        dayNotes = `About ${percentAdjusted}% adjusted. Keep following the local schedule. Stay consistent with sleep times.`;
      } else if (i < recoveryDays - 1) {
        dayNotes = `About ${percentAdjusted}% adjusted. Most symptoms should be fading. Stick to your routine and avoid late nights.`;
      } else if (i === recoveryDays - 1) {
        dayNotes = 'Nearly fully adjusted. Your circadian rhythm is aligning with local time. Keep up the good habits.';
      } else {
        dayNotes = 'Final adjustment day. You should feel completely synchronized with the new timezone.';
      }
      
      schedule.push({
        day: `Day ${i}`,
        date: dayDate,
        bedtime: `${bedHour.toString().padStart(2, '0')}:00`,
        waketime: `${wakeHour.toString().padStart(2, '0')}:00`,
        lightExposure: isEastward ? 'Seek bright light in morning, avoid in evening' : 'Seek light in evening, wear sunglasses in morning',
        notes: dayNotes,
        phase: 'recovery'
      });
    }
    
    return schedule;
  };

  const severity = getJetLagSeverity(hoursDiff);
  const sleepSchedule = showPlan ? calculateSleepSchedule() : [];

  return (
    <div className="space-y-1 md:space-y-2">
      {/* Top Ad - Leaderboard (max 90px height) */}
      <AdPlacement size="leaderboard" maxHeight={90} className="hidden md:block" />
      <AdPlacement size="mobile" maxHeight={90} className="md:hidden" />

      {/* Hero Section */}
      <div className="text-center space-y-1 md:space-y-2 px-4">
        <div className="relative inline-block">
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-purple-500/20 rounded-full mb-1 md:mb-2"
            animate={{
              y: [0, -12, 0],
              x: [0, 8, 0, -8, 0],
              rotate: [0, -3, 0, 3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Plane className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
          </motion.div>
          
          {/* Animated ZZZ sleep symbols */}
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="absolute text-purple-300/60 pointer-events-none select-none"
              style={{
                left: '60%',
                top: '20%',
                fontSize: index === 0 ? '12px' : index === 1 ? '16px' : '20px',
              }}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 0.8, 0.6, 0],
                y: [0, -40, -60, -80],
                x: [0, 10, 15, 20],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "easeOut",
              }}
            >
              Z
            </motion.span>
          ))}
        </div>
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl">Jet Lag Calculator</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
          Planning a trip across time zones? Calculate your jet lag and get personalized 
          recommendations to adjust your sleep schedule before and during travel.
        </p>
      </div>

      {/* Calculator Card */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-3 md:p-5">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Departing From Section */}
            <div className="space-y-3 p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-white pb-2 border-b border-white/10">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h3 className="text-white">Departing From</h3>
              </div>
              
              <TimezoneCombobox
                value={fromTimezone}
                onChange={setFromTimezone}
                placeholder="Search or select departure timezone..."
                label="Location"
              />

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <CalendarIcon className="w-4 h-4" />
                  Date <span className="text-red-400">*</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-10 justify-start text-left bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1e293b] border-white/20">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={handleDepartureDateChange}
                      initialFocus
                      className="text-white"
                      disabled={(date) => {
                        // Disable dates before today
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="w-4 h-4" />
                  Time
                </label>
                <div className="bg-white/10 rounded-lg p-2 border border-white/20">
                  <TimeDial
                    value={departureTime}
                    onChange={setDepartureTime}
                    compact
                  />
                </div>
              </div>
            </div>

            {/* Traveling To Section */}
            <div className="space-y-3 p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-white pb-2 border-b border-white/10">
                <Plane className="w-5 h-5 text-purple-400" />
                <h3 className="text-white">Traveling To</h3>
              </div>
              
              <TimezoneCombobox
                value={toTimezone}
                onChange={setToTimezone}
                placeholder="Search or select destination timezone..."
                label="Location"
              />

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <CalendarIcon className="w-4 h-4" />
                  Arrival Date <span className="text-white/40 text-xs">(Optional)</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-10 justify-start text-left bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {arrivalDate ? format(arrivalDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1e293b] border-white/20">
                    <Calendar
                      mode="single"
                      selected={arrivalDate}
                      onSelect={handleArrivalDateChange}
                      initialFocus
                      className="text-white"
                      disabled={(date) => {
                        // Disable dates before departure date
                        if (departureDate) {
                          return date < departureDate;
                        }
                        return false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="w-4 h-4" />
                  Arrival Time <span className="text-white/40 text-xs">(Optional)</span>
                </label>
                <div className="bg-white/10 rounded-lg p-2 border border-white/20">
                  <TimeDial
                    value={arrivalTime}
                    onChange={handleArrivalTimeChange}
                    compact
                  />
                </div>
              </div>
              
              {/* Validation warning */}
              {arrivalDate && departureDate && !isArrivalAfterDeparture() && (
                <div className="flex items-start gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">
                    Arrival date and time must be after departure date and time. Please adjust your times.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Map */}
          {(fromTimezone || toTimezone) && (
            <div className="pt-2">
              <TimeZoneMap
                fromCity={fromTz?.city || ''}
                toCity={toTz?.city || ''}
                fromOffset={fromTz?.offset || 0}
                toOffset={toTz?.offset || 0}
              />
            </div>
          )}

          <Button 
            onClick={handleCalculate}
            disabled={!fromTimezone || !toTimezone || !departureDate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Calculate Jet Lag Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Results */}
        {showPlan && fromTz && toTz && departureDate && (
          <div className="mt-4 space-y-4 pt-4 border-t border-white/10 animate-in fade-in duration-500">
            {/* Time Difference Summary */}
            <div className={`p-4 rounded-xl ${severity.bg} border-2 ${severity.border} ${severity.color}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-sm opacity-75 mb-1">Time Difference</div>
                  <div className="text-2xl">
                    {hoursDiff} {hoursDiff === 1 ? 'hour' : 'hours'} {isEastward ? 'ahead' : 'behind'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-75 mb-1">Jet Lag Severity</div>
                  <div className="text-2xl">{severity.level}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-current/20">
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    {isEastward 
                      ? 'Eastward travel is typically harder to adjust to. Start preparation early.' 
                      : 'Westward travel is usually easier to adjust to than eastward travel.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Recovery Days Display */}
            <div className="grid md:grid-cols-3 gap-3">
              <Card className="p-3 bg-blue-500/10 border-2 border-blue-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200/70">Time Zones Crossed</div>
                    <div className="text-2xl text-blue-100">{Math.ceil(hoursDiff)}</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3 bg-green-500/10 border-2 border-green-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-200/70">Estimated Recovery</div>
                    <div className="text-2xl text-green-100">
                      {sleepSchedule.filter(d => d.phase === 'recovery').length} days
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3 bg-purple-500/10 border-2 border-purple-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-200/70">Recovery Rate</div>
                    <div className="text-2xl text-purple-100">~1 day/zone</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Detailed Day-by-Day Schedule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white">Your Personalized Sleep Schedule</h3>
                <div className="text-sm text-white/60">
                  {sleepSchedule.length} day plan
                </div>
              </div>

              <Tabs defaultValue="before" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 h-auto p-1">
                  <TabsTrigger value="before" className="flex items-center gap-2 data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-100">
                    <Bed className="w-4 h-4" />
                    <span>Before Flight</span>
                    <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white/20">
                      {sleepSchedule.filter(d => d.phase === 'preparation').length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="travel" className="flex items-center gap-2 data-[state=active]:bg-purple-500/30 data-[state=active]:text-purple-100">
                    <Plane className="w-4 h-4" />
                    <span>Flight Day</span>
                  </TabsTrigger>
                  <TabsTrigger value="after" className="flex items-center gap-2 data-[state=active]:bg-green-500/30 data-[state=active]:text-green-100">
                    <Sun className="w-4 h-4" />
                    <span>After Flight</span>
                    <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white/20">
                      {sleepSchedule.filter(d => d.phase === 'recovery').length}
                    </span>
                  </TabsTrigger>
                </TabsList>

                {/* Before Flight Tab */}
                <TabsContent value="before" className="mt-3 space-y-3">
                  {sleepSchedule.filter(d => d.phase === 'preparation').map((day, index) => {
                    const style = {
                      bg: 'bg-blue-500/10',
                      border: 'border-blue-500/30',
                      icon: <Bed className="w-5 h-5" />,
                      iconBg: 'bg-blue-500'
                    };

                    return (
                      <Card key={index} className={`p-3 ${style.bg} border-2 ${style.border}`}>
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 w-9 h-9 ${style.iconBg} rounded-full flex items-center justify-center text-white`}>
                            {style.icon}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h4 className="text-white mb-0.5">{day.day}</h4>
                              <div className="text-xs text-white/60">
                                {format(day.date, 'EEEE, MMMM d, yyyy')}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2 rounded-lg bg-white/10">
                                <div className="flex items-center gap-1 mb-0.5">
                                  <Moon className="w-3 h-3 text-white/60" />
                                  <span className="text-xs text-white/60">Bedtime</span>
                                </div>
                                <div className="text-white">{formatTime12Hour(day.bedtime)}</div>
                              </div>
                              <div className="p-2 rounded-lg bg-white/10">
                                <div className="flex items-center gap-1 mb-0.5">
                                  <Sun className="w-3 h-3 text-white/60" />
                                  <span className="text-xs text-white/60">Wake Time</span>
                                </div>
                                <div className="text-white">{formatTime12Hour(day.waketime)}</div>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="text-xs text-white/80 mb-0.5">
                                  <strong>Light Exposure:</strong> {day.lightExposure}
                                </div>
                                <div className="text-xs text-white/70">{day.notes}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </TabsContent>

                {/* Flight Day Tab */}
                <TabsContent value="travel" className="mt-3 space-y-3">
                  {sleepSchedule.filter(d => d.phase === 'travel').map((day, index) => {
                    const style = {
                      bg: 'bg-purple-500/10',
                      border: 'border-purple-500/30',
                      icon: <Plane className="w-5 h-5" />,
                      iconBg: 'bg-purple-500'
                    };

                    return (
                      <Card key={index} className={`p-3 ${style.bg} border-2 ${style.border}`}>
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 w-9 h-9 ${style.iconBg} rounded-full flex items-center justify-center text-white`}>
                            {style.icon}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h4 className="text-white mb-0.5">{day.day}</h4>
                              <div className="text-xs text-white/60">
                                {format(day.date, 'EEEE, MMMM d, yyyy')}
                              </div>
                            </div>

                            <div className="p-2 rounded-lg bg-white/10">
                              <div className="text-sm text-white/90">
                                <ul className="space-y-0.5 list-disc list-inside">
                                  <li>Set your watch to destination time immediately</li>
                                  <li>Stay hydrated and avoid excessive alcohol</li>
                                  <li>Move around the cabin regularly</li>
                                </ul>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="text-xs text-white/80 mb-0.5">
                                  <strong>Light Exposure:</strong> {day.lightExposure}
                                </div>
                                <div className="text-xs text-white/70">{day.notes}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </TabsContent>

                {/* After Flight Tab */}
                <TabsContent value="after" className="mt-3 space-y-3">
                  {sleepSchedule.filter(d => d.phase === 'recovery').map((day, index) => {
                    const style = {
                      bg: 'bg-green-500/10',
                      border: 'border-green-500/30',
                      icon: <Sun className="w-5 h-5" />,
                      iconBg: 'bg-green-500'
                    };

                    return (
                      <Card key={index} className={`p-3 ${style.bg} border-2 ${style.border}`}>
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 w-9 h-9 ${style.iconBg} rounded-full flex items-center justify-center text-white`}>
                            {style.icon}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h4 className="text-white mb-0.5">{day.day}</h4>
                              <div className="text-xs text-white/60">
                                {format(day.date, 'EEEE, MMMM d, yyyy')}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2 rounded-lg bg-white/10">
                                <div className="flex items-center gap-1 mb-0.5">
                                  <Moon className="w-3 h-3 text-white/60" />
                                  <span className="text-xs text-white/60">Bedtime</span>
                                </div>
                                <div className="text-white">{formatTime12Hour(day.bedtime)}</div>
                              </div>
                              <div className="p-2 rounded-lg bg-white/10">
                                <div className="flex items-center gap-1 mb-0.5">
                                  <Sun className="w-3 h-3 text-white/60" />
                                  <span className="text-xs text-white/60">Wake Time</span>
                                </div>
                                <div className="text-white">{formatTime12Hour(day.waketime)}</div>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="text-xs text-white/80 mb-0.5">
                                  <strong>Light Exposure:</strong> {day.lightExposure}
                                </div>
                                <div className="text-xs text-white/70">{day.notes}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </TabsContent>
              </Tabs>
            </div>



            {/* Additional Tips */}
            <Card className="p-6 bg-indigo-500/10 border-2 border-indigo-500/30">
              <div className="flex gap-3">
                <Coffee className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="text-indigo-200">Additional Tips for Success</h4>
                  <ul className="text-sm text-indigo-200/90 space-y-1 list-disc list-inside">
                    <li>Use caffeine strategically - avoid after 2 PM destination time</li>
                    <li>Stay hydrated throughout your journey (8-10 glasses of water daily)</li>
                    <li>Exercise at your destination, but avoid vigorous activity close to bedtime</li>
                    <li>Eat meals at local times to help reset your circadian rhythm</li>
                    <li>Consider melatonin supplements (0.5-3mg) 30 minutes before bedtime at destination (consult your doctor first)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>

      {/* Middle Ad Placement */}
      <AdPlacement size="medium" />

      {/* Info Section */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 md:p-6">
        <div className="space-y-3 md:space-y-4 text-white/90">
          <h3 className="text-white text-lg md:text-xl">Understanding Jet Lag & Recovery Time</h3>
          <p className="text-sm md:text-base">
            Jet lag occurs when your body's internal clock (circadian rhythm) is out of sync with 
            the time zone you're in. Traveling east is generally harder to adjust to than traveling 
            west because it's easier to stay up late than to fall asleep early.
          </p>
          <p className="text-sm md:text-base">
            <strong>Recovery Time Rule:</strong> Research shows it takes approximately <strong>1 day per time zone crossed</strong> to 
            fully adjust to a new time zone. For eastward travel across 5+ time zones, your body may need 
            20-30% more time to recover due to the greater difficulty of advancing your sleep schedule.
          </p>
          <p className="text-sm md:text-base">
            Light exposure is the most powerful tool for resetting your circadian rhythm. Strategic 
            use of bright light and darkness can help you adjust more quickly to your new time zone.
          </p>
        </div>
      </Card>

      {/* Bottom Ad Placement */}
      <AdPlacement size="medium" />
    </div>
  );
}
