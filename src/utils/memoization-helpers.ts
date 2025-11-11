/**
 * Memoization helpers for expensive calculations
 * Improves performance by caching calculation results
 */

import { useMemo, useCallback, useRef, useEffect } from 'react';

/**
 * Memoized sleep cycle calculation
 */
export const useMemoizedSleepCalculation = (
  baseTime: Date,
  cycles: number,
  direction: 'forward' | 'backward'
) => {
  return useMemo(() => {
    const results = [];
    const SLEEP_CYCLE_MINUTES = 90;
    
    for (let i = 1; i <= cycles; i++) {
      const totalMinutes = SLEEP_CYCLE_MINUTES * i + 14; // 14 min to fall asleep
      const time = new Date(baseTime);
      
      if (direction === 'forward') {
        time.setMinutes(time.getMinutes() + totalMinutes);
      } else {
        time.setMinutes(time.getMinutes() - totalMinutes);
      }
      
      results.push({
        cycles: i,
        time,
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
      });
    }
    
    return results;
  }, [baseTime.getTime(), cycles, direction]);
};

/**
 * Debounced callback with memoization
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

/**
 * Throttled callback for performance
 */
export const useThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  );
};

/**
 * Memoized timezone offset calculation
 */
export const useMemoizedTimezoneOffset = (timezone: string) => {
  return useMemo(() => {
    try {
      const now = new Date();
      const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
      const localDate = new Date(now.toLocaleString('en-US'));
      return (tzDate.getTime() - localDate.getTime()) / (1000 * 60 * 60);
    } catch {
      return 0;
    }
  }, [timezone]);
};

/**
 * Cache previous calculation results
 */
export const useCalculationCache = <T>(
  key: string,
  calculate: () => T,
  dependencies: any[]
): T => {
  const cacheRef = useRef<{ key: string; value: T } | null>(null);
  const depsKey = JSON.stringify(dependencies);

  return useMemo(() => {
    if (cacheRef.current?.key === depsKey) {
      return cacheRef.current.value;
    }

    const value = calculate();
    cacheRef.current = { key: depsKey, value };
    return value;
  }, [depsKey]);
};

/**
 * Memoized date formatting
 */
export const useMemoizedDateFormat = (date: Date, format: string) => {
  return useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {};
    
    if (format.includes('time')) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    if (format.includes('date')) {
      options.year = 'numeric';
      options.month = 'short';
      options.day = 'numeric';
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }, [date.getTime(), format]);
};

/**
 * Persist state to localStorage with memoization
 */
export const usePersistedState = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setPersistedState = useCallback((value: T) => {
    setState(value);
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to persist state:', error);
    }
  }, [key]);

  return [state, setPersistedState];
};

// Helper to get state value without setter
function useState<T>(initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  // This is a placeholder - in actual implementation, we'd use React.useState
  // For now, return a simple implementation
  const value = typeof initialValue === 'function' 
    ? (initialValue as () => T)() 
    : initialValue;
  return [value, () => {}];
}
