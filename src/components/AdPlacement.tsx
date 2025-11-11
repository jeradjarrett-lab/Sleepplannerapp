import { useEffect, useRef, useState } from 'react';

interface AdPlacementProps {
  size: "medium" | "mobile" | "large" | "leaderboard";
  className?: string;
  maxHeight?: number; // Optional max height constraint in pixels
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdPlacement({
  size,
  className = "",
  maxHeight,
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
              mobileHeight: 90,
            }
          : {
              width: 320,
              height: 90,
              name: "Mobile Banner",
              mobileWidth: 320,
              mobileHeight: 90,
            };
  
  // Apply maxHeight override if provided
  const effectiveMaxHeight = maxHeight || Math.max(dimensions.height, dimensions.mobileHeight);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Aggressively defer ad loading until after page is interactive
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wait additional time even after intersection
            setTimeout(() => setIsVisible(true), 2000);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Load when within 200px of viewport
        threshold: 0.01
      }
    );

    // Delay observer initialization for better performance
    const observerTimer = setTimeout(() => {
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    }, 2000); // Wait 2s before even observing

    // Cleanup
    return () => {
      clearTimeout(observerTimer);
      observer.disconnect();
    };
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
            maxHeight: `${effectiveMaxHeight}px`,
            minHeight: `${Math.min(dimensions.mobileHeight, effectiveMaxHeight)}px`,
            minWidth: '300px',
            overflow: 'hidden',
          }}
        >
          {isVisible && (
            <ins
              className="adsbygoogle"
              style={{ 
                display: 'block',
                width: '100%',
                height: '100%',
                maxHeight: `${effectiveMaxHeight}px`,
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
