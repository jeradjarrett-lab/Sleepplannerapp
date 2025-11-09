import { useState, useRef, useEffect } from 'react';
import { Slider } from './ui/slider';
import { Input } from './ui/input';

interface TimeDialProps {
  value: string; // Format: "HH:MM"
  onChange: (time: string) => void;
  label?: string;
  compact?: boolean;
}

export function TimeDial({ value, onChange, label, compact = false }: TimeDialProps) {
  // Validate and parse the time value with fallback
  const validValue = value && value.includes(':') ? value : '09:00';
  const [hours, minutes] = validValue.split(':').map(Number);
  
  const [period, setPeriod] = useState<'AM' | 'PM'>(hours >= 12 ? 'PM' : 'AM');
  const [editingHour, setEditingHour] = useState(false);
  const [editingMinute, setEditingMinute] = useState(false);
  const [tempHourValue, setTempHourValue] = useState('');
  const [tempMinuteValue, setTempMinuteValue] = useState('');
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);
  
  const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  // Sync period state when the value prop changes
  useEffect(() => {
    const newPeriod = hours >= 12 ? 'PM' : 'AM';
    if (newPeriod !== period) {
      setPeriod(newPeriod);
    }
  }, [hours]);

  useEffect(() => {
    if (editingHour && hourInputRef.current) {
      setTempHourValue(displayHour.toString());
      hourInputRef.current.focus();
      hourInputRef.current.select();
    }
  }, [editingHour]);

  useEffect(() => {
    if (editingMinute && minuteInputRef.current) {
      setTempMinuteValue(minutes.toString());
      minuteInputRef.current.focus();
      minuteInputRef.current.select();
    }
  }, [editingMinute]);

  const handleHourChange = (values: number[]) => {
    const hour = values[0];
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) {
      hour24 = hour + 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }
    onChange(`${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  };

  const handleMinuteChange = (values: number[]) => {
    const minute = values[0];
    onChange(`${hours.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  };

  const handlePeriodToggle = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    let newHour = hours;
    if (newPeriod === 'PM' && hours < 12) {
      newHour = hours + 12;
    } else if (newPeriod === 'AM' && hours >= 12) {
      newHour = hours - 12;
    }
    onChange(`${newHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  };

  const handleHourInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.length <= 2) {
      setTempHourValue(inputValue);
    }
  };

  const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.length <= 2) {
      setTempMinuteValue(inputValue);
    }
  };

  const commitHourValue = () => {
    let hour = parseInt(tempHourValue) || 1;
    
    if (hour > 12) hour = 12;
    if (hour < 1) hour = 1;
    
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) {
      hour24 = hour + 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }
    onChange(`${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  };

  const commitMinuteValue = () => {
    let minute = parseInt(tempMinuteValue) || 0;
    
    if (minute > 59) minute = 59;
    if (minute < 0) minute = 0;
    
    onChange(`${hours.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  };

  const handleHourBlur = () => {
    commitHourValue();
    setEditingHour(false);
  };

  const handleMinuteBlur = () => {
    commitMinuteValue();
    setEditingMinute(false);
  };

  const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitHourValue();
      setEditingHour(false);
    } else if (e.key === 'Escape') {
      setEditingHour(false);
    }
  };

  const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitMinuteValue();
      setEditingMinute(false);
    } else if (e.key === 'Escape') {
      setEditingMinute(false);
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {label && (
        <label className="block text-center text-white mb-2">
          {label}
        </label>
      )}

      {/* Digital Time Display */}
      <div className={`flex items-center justify-center gap-2 ${compact ? 'py-2' : 'py-4'}`}>
        {/* Hours */}
        <div 
          className={`bg-[#2d3748] rounded-lg shadow-lg cursor-pointer hover:bg-[#374151] transition-colors ${compact ? 'px-2 py-2' : 'px-4 py-3'}`}
          onClick={() => setEditingHour(true)}
        >
          {editingHour ? (
            <Input
              ref={hourInputRef}
              type="text"
              value={tempHourValue}
              onChange={handleHourInputChange}
              onBlur={handleHourBlur}
              onKeyDown={handleHourKeyDown}
              className={`text-center bg-transparent border-none text-white font-mono p-0 focus:ring-0 ${compact ? 'w-10 h-8 text-2xl' : 'w-16 h-12 text-4xl'}`}
              maxLength={2}
              placeholder="00"
            />
          ) : (
            <span className={`text-white/90 tracking-wider font-mono ${compact ? 'text-2xl' : 'text-4xl'}`}>
              {displayHour.toString().padStart(2, '0')}
            </span>
          )}
        </div>
        
        <div className={`text-white/60 ${compact ? 'text-xl' : 'text-3xl'}`}>:</div>
        
        {/* Minutes */}
        <div 
          className={`bg-[#2d3748] rounded-lg shadow-lg cursor-pointer hover:bg-[#374151] transition-colors ${compact ? 'px-2 py-2' : 'px-4 py-3'}`}
          onClick={() => setEditingMinute(true)}
        >
          {editingMinute ? (
            <Input
              ref={minuteInputRef}
              type="text"
              value={tempMinuteValue}
              onChange={handleMinuteInputChange}
              onBlur={handleMinuteBlur}
              onKeyDown={handleMinuteKeyDown}
              className={`text-center bg-transparent border-none text-white font-mono p-0 focus:ring-0 ${compact ? 'w-10 h-8 text-2xl' : 'w-16 h-12 text-4xl'}`}
              maxLength={2}
              placeholder="00"
            />
          ) : (
            <span className={`text-white/90 tracking-wider font-mono ${compact ? 'text-2xl' : 'text-4xl'}`}>
              {minutes.toString().padStart(2, '0')}
            </span>
          )}
        </div>
        
        {/* Period */}
        <button
          onClick={handlePeriodToggle}
          className={`bg-[#2d3748] rounded-lg shadow-lg ml-2 hover:bg-[#374151] transition-colors ${compact ? 'px-2 py-2' : 'px-3 py-3'}`}
        >
          <span className={`text-white/90 ${compact ? 'text-lg' : 'text-2xl'}`}>
            {period}
          </span>
        </button>
      </div>

      <p className={`text-center text-white/40 ${compact ? 'text-xs mb-1' : 'text-xs mb-2'}`}>
        Click on time to type or use sliders below
      </p>

      {/* Hours Slider */}
      <div className={compact ? 'space-y-1' : 'space-y-2'}>
        <div className="flex justify-between items-center">
          <label className={`text-white/70 ${compact ? 'text-xs' : ''}`}>Hours</label>
          <span className={`text-white/50 ${compact ? 'text-xs' : 'text-sm'}`}>{displayHour}</span>
        </div>
        <Slider
          value={[displayHour]}
          onValueChange={handleHourChange}
          min={1}
          max={12}
          step={1}
          className="w-full"
        />
      </div>

      {/* Minutes Slider */}
      <div className={compact ? 'space-y-1' : 'space-y-2'}>
        <div className="flex justify-between items-center">
          <label className={`text-white/70 ${compact ? 'text-xs' : ''}`}>Minutes</label>
          <span className={`text-white/50 ${compact ? 'text-xs' : 'text-sm'}`}>{minutes}</span>
        </div>
        <Slider
          value={[minutes]}
          onValueChange={handleMinuteChange}
          min={0}
          max={59}
          step={1}
          className="w-full"
        />
      </div>

      {/* AM/PM Toggle */}
      <div className="flex items-center justify-center pt-2">
        <button
          onClick={handlePeriodToggle}
          className="relative w-28 h-12 bg-[#2d3748] rounded-full shadow-lg overflow-hidden transition-all hover:bg-[#374151]"
        >
          {/* Sliding background */}
          <div
            className="absolute top-1 bottom-1 w-12 bg-white rounded-full transition-all duration-300 ease-out shadow-md"
            style={{
              left: period === 'AM' ? '4px' : 'calc(100% - 52px)',
            }}
          />
          
          {/* AM/PM Text */}
          <div className="relative h-full flex items-center justify-around px-3">
            <span
              className={`font-bold transition-colors z-10 ${
                period === 'AM' ? 'text-gray-900' : 'text-white/60'
              }`}
            >
              AM
            </span>
            <span
              className={`font-bold transition-colors z-10 ${
                period === 'PM' ? 'text-gray-900' : 'text-white/60'
              }`}
            >
              PM
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
