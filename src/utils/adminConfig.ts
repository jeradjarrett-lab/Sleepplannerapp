// Admin configuration management utilities

export interface AdConfig {
  enabled: boolean;
  headerAd: {
    enabled: boolean;
    code: string;
  };
  mediumAd: {
    enabled: boolean;
    code: string;
  };
  largeAd: {
    enabled: boolean;
    code: string;
  };
}

export interface CustomScript {
  id: string;
  name: string;
  enabled: boolean;
  code: string;
  placement: 'head' | 'body';
}

export interface AdminConfig {
  ads: AdConfig;
  customScripts: CustomScript[];
}

const ADMIN_CONFIG_KEY = 'eyeLoveSleep_adminConfig';
const ADMIN_PASSWORD_KEY = 'eyeLoveSleep_adminPassword';

// Default configuration
const defaultConfig: AdminConfig = {
  ads: {
    enabled: true,
    headerAd: {
      enabled: true,
      code: `<!-- Google AdSense Header Ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
    },
    mediumAd: {
      enabled: true,
      code: `<!-- Google AdSense Medium Ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
    },
    largeAd: {
      enabled: true,
      code: `<!-- Google AdSense Large Ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
    }
  },
  customScripts: [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      enabled: false,
      placement: 'head',
      code: `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`
    }
  ]
};

// Get admin configuration
export function getAdminConfig(): AdminConfig {
  try {
    const stored = localStorage.getItem(ADMIN_CONFIG_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading admin config:', error);
  }
  return defaultConfig;
}

// Save admin configuration
export function saveAdminConfig(config: AdminConfig): void {
  try {
    localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving admin config:', error);
  }
}

// Reset to default configuration
export function resetAdminConfig(): void {
  localStorage.removeItem(ADMIN_CONFIG_KEY);
}

// Password management
export function setAdminPassword(password: string): void {
  // In production, this should be hashed and stored securely on backend
  localStorage.setItem(ADMIN_PASSWORD_KEY, password);
}

export function getAdminPassword(): string | null {
  return localStorage.getItem(ADMIN_PASSWORD_KEY);
}

export function verifyAdminPassword(password: string): boolean {
  const stored = getAdminPassword();
  // Default password if none set
  if (!stored) {
    return password === 'admin123';
  }
  return password === stored;
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem('eyeLoveSleep_adminAuth') === 'true';
}

export function setAdminAuthenticated(authenticated: boolean): void {
  if (authenticated) {
    sessionStorage.setItem('eyeLoveSleep_adminAuth', 'true');
  } else {
    sessionStorage.removeItem('eyeLoveSleep_adminAuth');
  }
}
