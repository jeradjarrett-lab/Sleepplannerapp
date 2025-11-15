// Google Analytics Configuration - Delayed Loading for Performance
// This file is served from /public and won't be processed by Vite build
// Loads GA AFTER page is interactive to avoid blocking render

(function() {
  // Don't load GA if DNT is enabled
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', 'G-8R36J5H706', {
    'send_page_view': false  // We'll send page views manually from React
  });

  // Load GA script asynchronously AFTER page is interactive
  function loadGA() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-8R36J5H706';
    
    // Add to head
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
    
    if (window.__DEV__) {
      console.log('✅ GA script loaded (deferred)');
    }
  }

  // Load GA when browser is idle or after 3 seconds
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGA, { timeout: 3000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(loadGA, 3000);
  }
})();
