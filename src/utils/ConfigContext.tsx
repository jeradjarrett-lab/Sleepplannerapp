import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from './supabase/info.tsx';

export interface PublicConfig {
  adsEnabled: boolean;
  adPlacements: {
    [key: string]: {
      enabled: boolean;
      code: string;
    };
  };
  customScripts: Array<{
    id: string;
    name: string;
    code: string;
    enabled: boolean;
    placement: 'head' | 'body';
  }>;
  seo: {
    siteName: string;
    pages: {
      sleepCalculator: {
        title: string;
        description: string;
        keywords: string;
      };
      sleepRecommendations: {
        title: string;
        description: string;
        keywords: string;
      };
      jetLagCalculator: {
        title: string;
        description: string;
        keywords: string;
      };
    };
  };
}

interface ConfigContextType {
  config: PublicConfig | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PublicConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bb7cbf27`;
      const response = await fetch(`${API_BASE_URL}/public/config`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }

      const data = await response.json();
      console.log('📡 ConfigContext: Fetched config:', data);
      console.log('  - adsEnabled:', data.adsEnabled);
      console.log('  - adPlacements:', Object.keys(data.adPlacements || {}));
      console.log('  - seo.siteName:', data.seo?.siteName);
      setConfig(data);
    } catch (err) {
      console.error('❌ Failed to load public config:', err);
      setError(err instanceof Error ? err.message : 'Failed to load configuration');
      
      // Set default config on error
      setConfig({
        adsEnabled: true,
        adPlacements: {
          headerBanner: { enabled: true, code: '' },
          sidebarTop: { enabled: true, code: '' },
          sidebarBottom: { enabled: true, code: '' },
          contentTop: { enabled: true, code: '' },
          contentBottom: { enabled: true, code: '' },
          footerBanner: { enabled: true, code: '' }
        },
        customScripts: [],
        seo: {
          siteName: 'EyeLoveSleep',
          pages: {
            sleepCalculator: {
              title: 'Sleep Calculator - Calculate Best Bedtime & Wake Time',
              description: 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles.',
              keywords: 'sleep calculator, bedtime calculator, wake time calculator'
            },
            sleepRecommendations: {
              title: 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
              description: 'Find recommended sleep hours for all ages.',
              keywords: 'sleep recommendations, sleep by age'
            },
            jetLagCalculator: {
              title: 'Jet Lag Calculator - Adjust to New Time Zones Faster',
              description: 'Beat jet lag with our smart calculator.',
              keywords: 'jet lag calculator, timezone adjustment'
            }
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const value: ConfigContextType = {
    config,
    loading,
    error,
    refetch: fetchConfig
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
