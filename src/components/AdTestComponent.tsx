/**
 * Ad Test Component - For Debugging Ad Display Issues
 * 
 * Usage: Temporarily add this component to your page to test if ads are working
 * <AdTestComponent />
 */

import { useEffect, useState } from 'react';

export function AdTestComponent() {
  const [diagnostics, setDiagnostics] = useState({
    scriptLoaded: false,
    adsbyGoogleExists: false,
    adsbyGoogleLength: 0,
    adElements: 0,
    adStatuses: [] as string[],
  });

  useEffect(() => {
    // Run diagnostics after a delay to allow everything to load
    const timer = setTimeout(() => {
      const scriptLoaded = !!document.querySelector('script[src*="adsbygoogle.js"]');
      const adsbyGoogleExists = typeof window.adsbygoogle !== 'undefined';
      const adsbyGoogleLength = window.adsbygoogle ? window.adsbygoogle.length : 0;
      
      const adElements = document.querySelectorAll('.adsbygoogle');
      const adStatuses = Array.from(adElements).map((el, i) => {
        const status = el.getAttribute('data-adsbygoogle-status') || 'not processed';
        const filled = el.getAttribute('data-ad-status') || 'unknown';
        return `Ad ${i + 1}: ${status} | Fill: ${filled}`;
      });

      setDiagnostics({
        scriptLoaded,
        adsbyGoogleExists,
        adsbyGoogleLength,
        adElements: adElements.length,
        adStatuses,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const runManualCheck = () => {
    console.log('=== AdSense Diagnostics ===');
    console.log('Script loaded:', !!document.querySelector('script[src*="adsbygoogle.js"]'));
    console.log('window.adsbygoogle exists:', typeof window.adsbygoogle !== 'undefined');
    console.log('window.adsbygoogle length:', window.adsbygoogle ? window.adsbygoogle.length : 0);
    
    const ads = document.querySelectorAll('.adsbygoogle');
    console.log('Total ad elements:', ads.length);
    
    ads.forEach((ad, i) => {
      console.log(`\nAd ${i + 1}:`);
      console.log('  Status:', ad.getAttribute('data-adsbygoogle-status'));
      console.log('  Ad status:', ad.getAttribute('data-ad-status'));
      console.log('  Client:', ad.getAttribute('data-ad-client'));
      console.log('  Slot:', ad.getAttribute('data-ad-slot'));
      console.log('  Has content:', ad.innerHTML.length > 0);
    });
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-md text-xs z-50">
      <h3 className="font-bold mb-2 text-sm">🔍 AdSense Diagnostics</h3>
      
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-2">
          <span className={diagnostics.scriptLoaded ? 'text-green-400' : 'text-red-400'}>
            {diagnostics.scriptLoaded ? '✓' : '✗'}
          </span>
          <span>AdSense script loaded</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={diagnostics.adsbyGoogleExists ? 'text-green-400' : 'text-red-400'}>
            {diagnostics.adsbyGoogleExists ? '✓' : '✗'}
          </span>
          <span>window.adsbygoogle exists</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-blue-400">ℹ</span>
          <span>Ads pushed: {diagnostics.adsbyGoogleLength}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-blue-400">ℹ</span>
          <span>Ad elements: {diagnostics.adElements}</span>
        </div>
      </div>

      {diagnostics.adStatuses.length > 0 && (
        <div className="mb-3 space-y-1">
          <div className="font-semibold text-yellow-400">Ad Statuses:</div>
          {diagnostics.adStatuses.map((status, i) => (
            <div key={i} className="pl-2 text-[10px]">{status}</div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <button
          onClick={runManualCheck}
          className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
        >
          Run Console Check
        </button>
        
        <div className="text-[10px] text-white/60 space-y-1">
          <p>• Ads won't show on localhost</p>
          <p>• Need AdSense approval</p>
          <p>• Disable ad blockers</p>
          <p>• Wait 30min after deploy</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/20 text-[10px] text-white/60">
        See <code>/ADS-TROUBLESHOOTING.md</code> for full guide
      </div>
    </div>
  );
}
