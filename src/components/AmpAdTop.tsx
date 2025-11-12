/**
 * Top Leaderboard Ad Component (728x90)
 * React-compatible Google AdSense implementation
 */

import { useEffect, useRef } from 'react';

interface AmpAdTopProps {
  className?: string;
}

export function AmpAdTop({ className = "" }: AmpAdTopProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Push ad only once when component mounts
    if (adRef.current && !isAdPushed.current) {
      try {
        // @ts-ignore - adsbygoogle is loaded from external script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch (error) {
        console.log('Ad push error:', error);
      }
    }
  }, []);

  return (
    <div className={`flex justify-center py-4 md:py-6 ${className}`}>
      <div className="w-full max-w-full overflow-hidden px-2">
        <div className="text-center mb-2">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">
            Advertisement
          </span>
        </div>
        <div 
          className="mx-auto flex justify-center"
          style={{
            maxWidth: '728px',
            minHeight: '90px',
            maxHeight: '90px',
          }}
          ref={adRef}
        >
          <ins
            className="adsbygoogle"
            style={{
              display: 'inline-block',
              width: '728px',
              height: '90px',
            }}
            data-ad-client="ca-pub-0855352021512673"
            data-ad-slot="7978490572"
          />
        </div>
      </div>
    </div>
  );
}
