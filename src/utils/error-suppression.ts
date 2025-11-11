/**
 * Error Suppression Utility
 * 
 * Suppresses harmless console errors from third-party scripts (AdSense, analytics, etc.)
 * that don't affect functionality but clutter the console.
 */

/**
 * List of error patterns to suppress
 * These are known harmless errors from third-party scripts
 */
const SUPPRESSED_ERROR_PATTERNS = [
  // TCF (Transparency & Consent Framework) API errors
  '__tcfapiLocator',
  'TCF IFRAME LOCATOR',
  'TCF IFRAME LOCATOR API',
  'LT.JS:', // LibreTCF errors
  'setting up the TCF',
  'problem while setting up',
  
  // Cross-origin frame access errors (common with ad scripts)
  'cross-origin frame',
  'Blocked a frame with origin',
  'Blocked a frame from accessing a cross-origin frame',
  'accessing a cross-origin frame',
  
  // SecurityError from iframe access attempts
  'SecurityError: Failed to read',
  'SecurityError: Blocked a frame',
  'Failed to read a named property',
  
  // AdSense consent/privacy errors (harmless)
  '__gppLocator',
  '__uspapi',
  '__tcfapi',
  
  // Common third-party script errors that don't affect functionality
  'ResizeObserver loop limit exceeded', // Harmless - just means layout changed
  'ResizeObserver loop completed with undelivered notifications',
];

/**
 * Check if an error message matches any suppressed pattern
 */
function shouldSuppressError(message: string): boolean {
  if (!message) return false;
  
  const lowerMessage = message.toLowerCase();
  return SUPPRESSED_ERROR_PATTERNS.some(pattern => 
    lowerMessage.includes(pattern.toLowerCase())
  );
}

/**
 * Initialize error suppression
 * Call this early in the application lifecycle
 */
export function initErrorSuppression() {
  if (typeof window === 'undefined') return;
  
  // Store original console methods for debugging
  (window as any).__originalConsoleError = console.error;
  (window as any).__originalConsoleWarn = console.warn;
  (window as any).__originalConsoleLog = console.log;
  
  // Suppress console.error for known harmless errors
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const errorMsg = args.join(' ').toString();
    
    if (shouldSuppressError(errorMsg)) {
      // In development, log suppressed errors at a lower level
      if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
        console.debug('🔇 [Suppressed Error]:', errorMsg);
      }
      return;
    }
    
    // Log all other errors normally
    originalConsoleError.apply(console, args);
  };
  
  // Also suppress console.log for these errors (some scripts use console.log for errors)
  const originalConsoleLog = console.log;
  console.log = (...args: any[]) => {
    const logMsg = args.join(' ').toString();
    
    if (shouldSuppressError(logMsg)) {
      if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
        console.debug('🔇 [Suppressed Log]:', logMsg);
      }
      return;
    }
    
    originalConsoleLog.apply(console, args);
  };
  
  // Suppress console.warn for known harmless warnings
  const originalConsoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    const warnMsg = args.join(' ').toString();
    
    if (shouldSuppressError(warnMsg)) {
      if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
        console.debug('🔇 [Suppressed Warning]:', warnMsg);
      }
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };
  
  // Global error event listener (capture phase to catch errors early)
  window.addEventListener('error', (event) => {
    const errorMsg = event.message || event.error?.message || event.error?.toString() || '';
    const errorStack = event.error?.stack || '';
    const fullError = `${errorMsg} ${errorStack}`;
    
    if (shouldSuppressError(fullError)) {
      if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
        console.debug('🔇 [Suppressed Global Error]:', errorMsg);
      }
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }, true);
  
  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || '';
    
    if (shouldSuppressError(reason)) {
      event.preventDefault();
      return false;
    }
  });
  
  // Expose debugging tools to window in development
  if (import.meta.env?.DEV || process.env.NODE_ENV === 'development') {
    (window as any).errorSuppression = {
      disable: disableErrorSuppression,
      restore: restoreConsole,
      getPatterns: getSuppressedPatterns,
      addPattern: addSuppressedPattern,
      removePattern: removeSuppressedPattern,
    };
    
    console.info(
      `✅ [Error Suppression] Initialized - suppressing ${SUPPRESSED_ERROR_PATTERNS.length} error patterns\n` +
      `   To see suppressed errors, check console.debug level.\n` +
      `   Debug tools: window.errorSuppression.disable(), .restore(), .getPatterns()`
    );
  }
}

/**
 * Restore original console methods (for debugging)
 */
export function restoreConsole() {
  if (typeof window === 'undefined') return;
  
  const original = window as any;
  if (original.__originalConsoleError) {
    console.error = original.__originalConsoleError;
  }
  if (original.__originalConsoleWarn) {
    console.warn = original.__originalConsoleWarn;
  }
  
  console.info('✅ [Error Suppression] Console methods restored to original');
}

/**
 * Add a custom error pattern to suppress
 * Useful for app-specific third-party scripts
 */
export function addSuppressedPattern(pattern: string) {
  if (!SUPPRESSED_ERROR_PATTERNS.includes(pattern)) {
    SUPPRESSED_ERROR_PATTERNS.push(pattern);
  }
}

/**
 * Remove a suppressed error pattern
 */
export function removeSuppressedPattern(pattern: string) {
  const index = SUPPRESSED_ERROR_PATTERNS.indexOf(pattern);
  if (index > -1) {
    SUPPRESSED_ERROR_PATTERNS.splice(index, 1);
  }
}

/**
 * Get all currently suppressed patterns (for debugging)
 */
export function getSuppressedPatterns(): string[] {
  return [...SUPPRESSED_ERROR_PATTERNS];
}

/**
 * Temporarily disable error suppression (for debugging)
 */
export function disableErrorSuppression() {
  console.warn('[Error Suppression] Disabled - all errors will show in console');
  SUPPRESSED_ERROR_PATTERNS.length = 0;
}
