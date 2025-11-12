/**
 * Critical CSS Utilities
 * Extracts and inlines critical CSS for faster First Contentful Paint
 */

/**
 * Get critical CSS that should be inlined in the document head
 * This includes only the styles needed for above-the-fold content
 */
export const getCriticalCSS = (): string => {
  return `
    /* Critical CSS for above-the-fold content */
    *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
    html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;tab-size:4}
    body{margin:0;line-height:inherit;background:linear-gradient(135deg,#0f172a,#1e293b,#0f172a);min-height:100vh;color:#f8fafc}
    
    /* Header and navigation - critical for LCP */
    .header{display:flex;align-items:center;justify-content:space-between;padding:1rem;background:rgba(15,23,42,0.8);backdrop-filter:blur(10px)}
    .logo{font-size:1.5rem;font-weight:700;color:#4f86f7}
    
    /* Navigation toggle - critical for interactivity */
    .nav-toggle{display:flex;gap:0.25rem;background:rgba(30,41,59,0.8);border-radius:9999px;padding:0.25rem}
    .nav-button{padding:0.5rem 1rem;border-radius:9999px;transition:all 0.2s;cursor:pointer}
    .nav-button.active{background:#4f86f7;color:#fff}
    
    /* Loading spinner - critical for perceived performance */
    @keyframes spin{to{transform:rotate(360deg)}}
    .animate-spin{animation:spin 1s linear infinite}
    
    /* Hide non-critical content initially */
    .below-fold{content-visibility:auto;contain-intrinsic-size:0 500px}
  `.trim();
};

/**
 * Inject critical CSS into document head
 */
export const injectCriticalCSS = (): void => {
  if (typeof document === 'undefined') return;
  
  // Check if critical CSS is already injected
  if (document.getElementById('critical-css')) return;
  
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = getCriticalCSS();
  
  // Insert at the beginning of head for highest priority
  const firstStyleOrLink = document.head.querySelector('style, link[rel="stylesheet"]');
  if (firstStyleOrLink) {
    document.head.insertBefore(style, firstStyleOrLink);
  } else {
    document.head.appendChild(style);
  }
};

/**
 * Preload critical resources for faster LCP
 */
export const preloadCriticalResources = (): void => {
  if (typeof document === 'undefined') return;
  
  // Preload Inter font (most critical font weight)
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.as = 'font';
  fontPreload.type = 'font/woff2';
  fontPreload.crossOrigin = 'anonymous';
  fontPreload.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
  
  // Only add if not already present
  if (!document.head.querySelector(`link[href="${fontPreload.href}"]`)) {
    document.head.appendChild(fontPreload);
  }
};

/**
 * Optimize font loading with font-display
 */
export const optimizeFontLoading = (): void => {
  if (typeof document === 'undefined') return;
  
  // Add font-display: optional to Google Fonts
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.includes('display=')) {
      link.setAttribute('href', `${href}${href.includes('?') ? '&' : '?'}display=optional`);
    }
  });
};

/**
 * Use content-visibility for below-the-fold content
 */
export const enableContentVisibility = (): void => {
  if (typeof document === 'undefined') return;
  if (!CSS.supports('content-visibility', 'auto')) return;
  
  // Apply content-visibility to below-the-fold sections
  const belowFoldSelectors = [
    '.faq-section',
    '.how-to-section',
    '.comparison-table',
    'footer'
  ];
  
  belowFoldSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.contentVisibility = 'auto';
        el.style.containIntrinsicSize = '0 500px';
      }
    });
  });
};

/**
 * Defer non-critical CSS
 */
export const deferNonCriticalCSS = (): void => {
  if (typeof document === 'undefined') return;
  
  // Find all stylesheets
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
  stylesheets.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip critical stylesheets (main globals.css should load normally)
    if (href?.includes('globals.css')) return;
    
    // Defer non-critical stylesheets
    link.setAttribute('media', 'print');
    link.addEventListener('load', function() {
      this.setAttribute('media', 'all');
    });
  });
};

/**
 * Initialize all critical CSS optimizations
 */
export const initCriticalCSS = (): void => {
  // Inject critical CSS immediately
  injectCriticalCSS();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Optimize font loading
  requestAnimationFrame(() => {
    optimizeFontLoading();
  });
  
  // Enable content-visibility when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enableContentVisibility);
  } else {
    enableContentVisibility();
  }
};
