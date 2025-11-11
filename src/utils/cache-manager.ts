/**
 * Cache Manager for EyeLoveSleep
 * Handles localStorage caching for user preferences and calculation results
 */

interface CacheConfig {
  ttl?: number; // Time to live in milliseconds
  version?: string; // Cache version for invalidation
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: string;
}

const CACHE_VERSION = '1.0.0';
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

class CacheManager {
  private prefix = 'eyelovesleep_';

  /**
   * Store data in localStorage with expiration
   */
  set<T>(key: string, data: T, config: CacheConfig = {}): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        version: config.version || CACHE_VERSION,
      };
      localStorage.setItem(
        this.prefix + key,
        JSON.stringify(entry)
      );
    } catch (error) {
      console.warn('Cache set failed:', error);
      // Handle quota exceeded errors gracefully
      this.clearExpired();
    }
  }

  /**
   * Retrieve data from localStorage if not expired
   */
  get<T>(key: string, config: CacheConfig = {}): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      const ttl = config.ttl || DEFAULT_TTL;
      const isExpired = Date.now() - entry.timestamp > ttl;
      const isVersionMismatch = entry.version !== (config.version || CACHE_VERSION);

      if (isExpired || isVersionMismatch) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Cache get failed:', error);
      return null;
    }
  }

  /**
   * Remove specific cache entry
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('Cache remove failed:', error);
    }
  }

  /**
   * Clear all expired cache entries
   */
  clearExpired(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach(key => {
        if (!key.startsWith(this.prefix)) return;

        try {
          const item = localStorage.getItem(key);
          if (!item) return;

          const entry: CacheEntry<any> = JSON.parse(item);
          if (now - entry.timestamp > DEFAULT_TTL) {
            localStorage.removeItem(key);
          }
        } catch {
          // Invalid entry, remove it
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Cache cleanup failed:', error);
    }
  }

  /**
   * Clear all cache entries for this app
   */
  clearAll(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Cache clear all failed:', error);
    }
  }

  /**
   * Get cache size in bytes (approximate)
   */
  getSize(): number {
    try {
      let size = 0;
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            size += item.length + key.length;
          }
        }
      });
      return size;
    } catch {
      return 0;
    }
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

/**
 * User preferences caching
 */
export interface UserPreferences {
  defaultWakeTime?: string;
  defaultBedTime?: string;
  defaultTimezone?: string;
  preferredSleepCycles?: number;
  lastVisit?: number;
}

export const getUserPreferences = (): UserPreferences => {
  return cacheManager.get<UserPreferences>('preferences') || {};
};

export const setUserPreferences = (preferences: Partial<UserPreferences>): void => {
  const current = getUserPreferences();
  cacheManager.set('preferences', {
    ...current,
    ...preferences,
    lastVisit: Date.now(),
  });
};

/**
 * Calculation results caching
 */
export interface CalculationCache {
  sleepTimes?: any[];
  wakeTimes?: any[];
  jetLagPlan?: any;
  timestamp: number;
}

export const getCachedCalculation = (type: string): any | null => {
  return cacheManager.get(`calc_${type}`, { ttl: 24 * 60 * 60 * 1000 }); // 24 hour TTL
};

export const setCachedCalculation = (type: string, data: any): void => {
  cacheManager.set(`calc_${type}`, data, { ttl: 24 * 60 * 60 * 1000 });
};

/**
 * Initialize cache cleanup on app start
 */
export const initCacheManager = (): void => {
  // Clear expired entries on startup
  cacheManager.clearExpired();

  // Set up periodic cleanup (every hour)
  if (typeof window !== 'undefined') {
    setInterval(() => {
      cacheManager.clearExpired();
    }, 60 * 60 * 1000);
  }
};
