import { getAdminConfig } from '../utils/adminConfig';

interface AdPlacementProps {
  size: 'medium' | 'mobile' | 'large' | 'leaderboard';
  className?: string;
}

export function AdPlacement({ size, className = '' }: AdPlacementProps) {
  const config = getAdminConfig();
  
  // Check if ads are enabled globally
  if (!config.ads.enabled) {
    return null;
  }

  // Map size to ad configuration
  let adConfig;
  let adName;
  
  if (size === 'leaderboard' || size === 'large') {
    adConfig = config.ads.largeAd;
    adName = 'Large Ad';
  } else if (size === 'medium') {
    adConfig = config.ads.mediumAd;
    adName = 'Medium Ad';
  } else {
    // Mobile uses medium ad config as fallback
    adConfig = config.ads.headerAd;
    adName = 'Header Ad';
  }

  // Check if this specific ad placement is enabled
  if (!adConfig.enabled) {
    return null;
  }

  const dimensions = size === 'medium' 
    ? { width: 300, height: 250, name: 'Medium Rectangle', mobileWidth: 300, mobileHeight: 250 } 
    : size === 'large'
    ? { width: 728, height: 90, name: 'Leaderboard', mobileWidth: 320, mobileHeight: 50 }
    : size === 'leaderboard'
    ? { width: 728, height: 90, name: 'Leaderboard Banner', mobileWidth: 320, mobileHeight: 100 }
    : { width: 320, height: 100, name: 'Mobile Banner', mobileWidth: 320, mobileHeight: 100 };

  return (
    <div className={`flex justify-center py-4 md:py-6 ${className}`}>
      <div className="w-full max-w-full overflow-hidden">
        <div className="text-center mb-2">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">Advertisement</span>
        </div>
        <div 
          className="mx-auto rounded-lg overflow-hidden"
          style={{ 
            width: '100%',
            maxWidth: `${dimensions.width}px`,
            minHeight: `${dimensions.mobileHeight}px`
          }}
        >
          {/* Render the actual ad code from admin config */}
          <div dangerouslySetInnerHTML={{ __html: adConfig.code }} />
        </div>
      </div>
    </div>
  );
}
