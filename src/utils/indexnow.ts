/**
 * IndexNow - Instant Search Engine Notification
 * 
 * Notifies search engines (Bing, Yandex, Naver, etc.) instantly when content changes
 * instead of waiting for crawlers. This significantly speeds up indexing.
 * 
 * Learn more: https://www.indexnow.org/
 */

// Your IndexNow API Key (must match the key file in /public/)
export const INDEXNOW_KEY = '8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b';

/**
 * Submit URL(s) to IndexNow for instant indexing
 * 
 * @param urls - Single URL string or array of URLs to submit
 * @returns Promise<boolean> - True if successful
 */
export async function notifyIndexNow(urls: string | string[]): Promise<boolean> {
  try {
    const urlList = Array.isArray(urls) ? urls : [urls];
    
    // IndexNow API endpoint (Bing's endpoint - it notifies all partners)
    const endpoint = 'https://api.indexnow.org/indexnow';
    
    // Get the host from the first URL
    const host = new URL(urlList[0]).host;
    
    // Prepare the request body
    const body = {
      host: host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList: urlList
    };
    
    console.log('🚀 IndexNow: Submitting URLs for instant indexing:', urlList);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors', // Enable CORS
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    });
    
    if (response.ok || response.status === 202) {
      console.log('✅ IndexNow: Successfully submitted to search engines!');
      return true;
    } else {
      const responseText = await response.text().catch(() => 'No response body');
      console.warn(`⚠️ IndexNow: Response status ${response.status}`, responseText);
      return false;
    }
  } catch (error) {
    // CORS errors or network issues are common in development
    // Log warning instead of error to avoid alarming users
    console.warn('⚠️ IndexNow: Could not reach IndexNow API (this is normal if testing locally):', error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Notify IndexNow for all main pages
 * Call this when deploying or updating content
 */
export async function notifyAllPages(baseUrl: string = 'https://eyelovesleep.com'): Promise<void> {
  const allPages = [
    baseUrl,                              // Homepage / Sleep Calculator
    `${baseUrl}/caffeine-sleep`,          // Caffeine Calculator
    `${baseUrl}/jet-lag`                  // Jet Lag Calculator
  ];
  
  await notifyIndexNow(allPages);
}

/**
 * Notify IndexNow for a single page
 * Useful for when specific content is updated
 */
export async function notifySinglePage(path: string, baseUrl: string = 'https://eyelovesleep.com'): Promise<void> {
  const fullUrl = path.startsWith('http') ? path : `${baseUrl}${path}`;
  await notifyIndexNow(fullUrl);
}

/**
 * Get IndexNow submission statistics (for debugging)
 */
export function getIndexNowStats() {
  return {
    key: INDEXNOW_KEY,
    keyFileUrl: `https://eyelovesleep.com/${INDEXNOW_KEY}.txt`,
    apiEndpoint: 'https://api.indexnow.org/indexnow',
    supportedEngines: ['Bing', 'Yandex', 'Naver', 'Seznam.cz', 'Yep'],
    verificationUrl: `https://eyelovesleep.com/${INDEXNOW_KEY}.txt`
  };
}

/**
 * Automatically notify IndexNow on initial page load
 * Only runs once per session to avoid spam
 */
export function setupAutoIndexNow(baseUrl: string = 'https://eyelovesleep.com'): void {
  // Only run in production (check for localhost or development indicators)
  if (typeof window === 'undefined') {
    return; // Not in browser environment
  }
  
  // Check if running in development or on non-production domain
  const isDev = 
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.port === '5173' || // Vite default port
    window.location.port === '3000' ||   // Common dev port
    window.location.hostname.includes('figma.com'); // Figma preview
  
  if (isDev) {
    console.log('📝 IndexNow: Skipped (not on production domain)');
    return;
  }
  
  // Only notify once per session
  const sessionKey = 'indexnow_notified';
  if (sessionStorage.getItem(sessionKey)) {
    return;
  }
  
  // Mark as notified
  sessionStorage.setItem(sessionKey, 'true');
  
  // Get current page URL
  const currentUrl = `${baseUrl}${window.location.pathname}`;
  
  // Notify after a short delay to not block page load
  setTimeout(() => {
    notifyIndexNow(currentUrl).then((success) => {
      if (success) {
        console.log('✅ IndexNow: Auto-notification sent for:', currentUrl);
      }
    }).catch((err) => {
      // Silently catch errors - don't disrupt user experience
      console.debug('IndexNow notification failed (non-critical):', err);
    });
  }, 2000);
}
