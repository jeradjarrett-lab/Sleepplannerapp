import { useEffect, useRef } from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title?: string;
  description?: string;
  url?: string;
}

export function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const shareContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // ShareThis script will automatically populate this div when it loads
    // The script looks for elements with class "sharethis-inline-share-buttons"
    // and initializes them with share buttons
    
    // Optional: Force re-initialization if ShareThis is already loaded
    if ((window as any).__sharethis__) {
      try {
        (window as any).__sharethis__.initialize();
      } catch (e) {
        // Silent fail - ShareThis will initialize on its own
      }
    }
  }, []);

  return (
    <div className="my-6 py-4 border-t border-white/10">
      <div className="flex items-center gap-3 mb-3">
        <Share2 className="w-5 h-5 text-blue-400" />
        <h3 className="text-white/90">Share this calculator:</h3>
      </div>
      
      {/* ShareThis inline share buttons - Populated by ShareThis script */}
      <div 
        ref={shareContainerRef}
        className="sharethis-inline-share-buttons"
        data-title={title}
        data-description={description}
        data-url={url}
      />
      
      {/* Fallback message while ShareThis loads */}
      <noscript>
        <p className="text-white/60 text-sm">
          Please enable JavaScript to see share buttons
        </p>
      </noscript>
    </div>
  );
}
