/**
 * Middle/Bottom Responsive Ad Component
 * React-compatible Google AdSense implementation
 */

import { useEffect, useRef } from 'react';

interface AmpAdMiddleProps {
  className?: string;
}

export function AmpAdMiddle({ className = "" }: AmpAdMiddleProps) {
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
          className="mx-auto"
          style={{
            maxWidth: '100%',
            maxHeight: '320px',
          }}
          ref={adRef}
        >
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
            }}
            data-ad-format="fluid"
            data-ad-layout-key="-6t+ed+2i-1n-4w"
            data-ad-client="ca-pub-0855352021512673"
            data-ad-slot="6473288478"
          />
        </div>
      </div>
    </div>
  );
}
