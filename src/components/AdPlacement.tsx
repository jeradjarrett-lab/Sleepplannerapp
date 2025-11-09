import { useConfig } from '../utils/ConfigContext';

interface AdPlacementProps {
  size: 'medium' | 'mobile' | 'large' | 'leaderboard';
  className?: string;
}

export function AdPlacement({ size, className = '' }: AdPlacementProps) {
  const { config } = useConfig();
  
  // Don't render if config is not loaded yet
  if (!config) {
    console.log('🔴 AdPlacement: Config not loaded');
    return null;
  }
  
  // Check if ads are enabled globally
  if (!config.adsEnabled) {
    console.log('🔴 AdPlacement: Ads globally disabled');
    return null;
  }

  // Map size to ad placement key
  let placementKey: string;
  
  if (size === 'leaderboard') {
    placementKey = 'headerBanner';
  } else if (size === 'large') {
    placementKey = 'footerBanner';
  } else if (size === 'medium') {
    placementKey = 'sidebarTop';
  } else {
    // Mobile
    placementKey = 'contentTop';
  }

  console.log(`🎯 AdPlacement: size=${size}, placementKey=${placementKey}`);

  const adConfig = config.adPlacements?.[placementKey];

  // Check if this specific ad placement exists and is enabled
  if (!adConfig) {
    console.log(`🔴 AdPlacement: No ad config found for ${placementKey}`);
    return null;
  }
  
  if (!adConfig.enabled) {
    console.log(`🔴 AdPlacement: ${placementKey} is disabled`);
    return null;
  }
  
  const hasCode = adConfig.code && adConfig.code.trim() !== '';
  
  if (!hasCode) {
    console.log(`⚠️ AdPlacement: ${placementKey} has no ad code - showing placeholder`);
    // Show placeholder in development/testing
    return (
      <div className={`flex justify-center py-4 md:py-6 ${className}`}>
        <div className="w-full max-w-full overflow-hidden">
          <div className="text-center mb-2">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Advertisement (Placeholder)</span>
          </div>
          <div 
            className="mx-auto rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center"
            style={{ 
              width: '100%',
              maxWidth: size === 'medium' ? '300px' : '728px',
              minHeight: size === 'medium' ? '250px' : '90px'
            }}
          >
            <div className="text-center p-4">
              <p className="text-white/60 text-sm mb-2">Ad Slot: {placementKey}</p>
              <p className="text-white/40 text-xs">Go to Admin Panel to add ad code</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  console.log(`✅ AdPlacement: Rendering ad for ${placementKey}`);

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
