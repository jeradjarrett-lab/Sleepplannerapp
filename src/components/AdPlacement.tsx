import { useEffect, useRef, useState } from 'react';

interface AdPlacementProps {
  size: "medium" | "mobile" | "large" | "leaderboard";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdPlacement({
  size,
  className = "",
}: AdPlacementProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const dimensions =
    size === "medium"
      ? {
          width: 300,
          height: 250,
          name: "Medium Rectangle",
          mobileWidth: 300,
          mobileHeight: 250,
        }
      : size === "large"
        ? {
            width: 728,
            height: 90,
            name: "Leaderboard",
            mobileWidth: 320,
            mobileHeight: 50,
          }
        : size === "leaderboard"
          ? {
              width: 728,
              height: 90,
              name: "Leaderboard Banner",
              mobileWidth: 320,
              mobileHeight: 100,
            }
          : {
              width: 320,
              height: 100,
              name: "Mobile Banner",
              mobileWidth: 320,
              mobileHeight: 100,
            };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Check if the container is actually visible (not hidden by CSS)
    const checkVisibility = () => {
      if (!containerRef.current) return false;
      
      const rect = containerRef.current.getBoundingClientRect();
      const styles = window.getComputedStyle(containerRef.current);
      
      // Check if element is visible and has dimensions
      const visible = 
        styles.display !== 'none' &&
        styles.visibility !== 'hidden' &&
        styles.opacity !== '0' &&
        rect.width > 0 &&
        rect.height > 0;
        
      return visible;
    };

    // Wait for container to be visible
    const visibilityCheck = setInterval(() => {
      if (checkVisibility()) {
        setIsVisible(true);
        clearInterval(visibilityCheck);
      }
    }, 100);

    // Cleanup
    return () => clearInterval(visibilityCheck);
  }, []);

  useEffect(() => {
    // Only load ad if visible and not already loaded
    if (!isVisible || adLoaded || !adRef.current) return;
    
    const loadAd = () => {
      try {
        // Load AdSense script if not already loaded
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
          const script = document.createElement('script');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0855352021512673';
          script.async = true;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
          
          // Wait for script to load
          script.onload = () => {
            setTimeout(pushAd, 200);
          };
        } else {
          // Script already loaded, push ad after a delay
          setTimeout(pushAd, 200);
        }
      } catch (err) {
        console.error('AdSense script load error:', err);
      }
    };

    const pushAd = () => {
      try {
        if (adRef.current && window.adsbygoogle) {
          // Double check visibility before pushing
          const rect = adRef.current.getBoundingClientRect();
          if (rect.width > 0) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setAdLoaded(true);
          }
        }
      } catch (err) {
        console.error('AdSense push error:', err);
      }
    };

    loadAd();
  }, [isVisible, adLoaded]);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center py-4 md:py-6 ${className}`}
    >
      <div className="w-full max-w-full overflow-hidden px-2">
        <div className="text-center mb-2">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">
            Advertisement
          </span>
        </div>
        <div
          ref={adRef}
          className="mx-auto"
          style={{
            width: "100%",
            maxWidth: `${dimensions.width}px`,
            minHeight: `${dimensions.mobileHeight}px`,
            minWidth: '300px',
          }}
        >
          {isVisible && (
            <ins
              className="adsbygoogle"
              style={{ 
                display: 'block',
                width: '100%',
                minHeight: `${dimensions.mobileHeight}px`,
              }}
              data-ad-client="ca-pub-0855352021512673"
              data-ad-slot="2434396144"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          )}
        </div>
      </div>
    </div>
  );
}