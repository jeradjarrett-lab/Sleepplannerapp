import { projectId, publicAnonKey } from './supabase/info.tsx';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bb7cbf27`;

export interface AdminConfig {
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
  security: {
    maxLoginAttempts: number;
    sessionTimeout: number;
    requireStrongPassword: boolean;
  };
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

// Get stored session token
function getSessionToken(): string | null {
  return localStorage.getItem('admin_session_token');
}

// Set session token
function setSessionToken(token: string) {
  localStorage.setItem('admin_session_token', token);
}

// Clear session token
function clearSessionToken() {
  localStorage.removeItem('admin_session_token');
}

// Login
export async function login(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    console.log('🔐 Attempting login to:', `${API_BASE_URL}/admin/login`);
    
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ password })
    });

    console.log('📡 Response status:', response.status);
    
    let data;
    try {
      data = await response.json();
      console.log('📦 Response data:', data);
    } catch (parseError) {
      console.error('❌ Failed to parse response JSON:', parseError);
      const text = await response.text();
      console.error('❌ Response text:', text);
      return { success: false, error: 'Invalid response from server' };
    }

    if (!response.ok) {
      console.error('❌ Login failed:', data.error);
      return { success: false, error: data.error || 'Login failed' };
    }

    // Check if we got a token
    if (!data.token) {
      console.error('❌ No token in response');
      return { success: false, error: 'No authentication token received' };
    }

    // Save the token
    setSessionToken(data.token);
    console.log('✅ Login successful, token saved');

    // Return success (may or may not have success:true in response)
    return { success: true, token: data.token };
  } catch (error) {
    console.error('❌ Login API error:', error);
    return { success: false, error: 'Network error during login: ' + (error instanceof Error ? error.message : String(error)) };
  }
}

// Logout
export async function logout(): Promise<void> {
  try {
    const token = getSessionToken();
    if (token) {
      await fetch(`${API_BASE_URL}/admin/logout`, {
        method: 'POST',
        headers: {
          'X-Admin-Token': token,
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
    }
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    clearSessionToken();
  }
}

// Get configuration
export async function getConfig(): Promise<{ success: boolean; config?: AdminConfig; error?: string }> {
  try {
    const token = getSessionToken();
    console.log('📡 Getting config, token exists:', !!token);
    if (!token) {
      return { success: false, error: 'No session token' };
    }

    console.log('📡 Fetching config from:', `${API_BASE_URL}/admin/config`);
    const response = await fetch(`${API_BASE_URL}/admin/config`, {
      method: 'GET',
      headers: {
        'X-Admin-Token': token,
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    console.log('📡 Config response status:', response.status);
    
    let data;
    try {
      data = await response.json();
      console.log('📦 Config response data:', data);
    } catch (jsonError) {
      console.error('❌ Failed to parse JSON response:', jsonError);
      return { success: false, error: `Failed to parse server response: ${jsonError.message}` };
    }

    if (!response.ok) {
      const errorMsg = data.error || data.message || `Server returned ${response.status}`;
      console.error('❌ Config request failed:', errorMsg);
      console.error('   Full error data:', JSON.stringify(data, null, 2));
      if (response.status === 401) {
        console.log('🔒 Clearing session token due to 401');
        clearSessionToken();
      }
      return { success: false, error: errorMsg };
    }

    console.log('✅ Config loaded successfully');
    return { success: true, config: data };
  } catch (error) {
    console.error('❌ Get config API error:', error);
    console.error('   Error type:', error.constructor.name);
    console.error('   Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return { success: false, error: 'Network error: ' + (error instanceof Error ? error.message : String(error)) };
  }
}

// Update configuration
export async function updateConfig(config: AdminConfig): Promise<{ success: boolean; error?: string }> {
  try {
    const token = getSessionToken();
    if (!token) {
      return { success: false, error: 'No session token' };
    }

    const response = await fetch(`${API_BASE_URL}/admin/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': token,
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify(config)
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        clearSessionToken();
      }
      return { success: false, error: data.error || 'Failed to update config' };
    }

    return { success: true };
  } catch (error) {
    console.error('Update config API error:', error);
    return { success: false, error: 'Network error' };
  }
}

// Change password
export async function changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    const token = getSessionToken();
    if (!token) {
      return { success: false, error: 'No session token' };
    }

    const response = await fetch(`${API_BASE_URL}/admin/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': token,
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        clearSessionToken();
      }
      return { success: false, error: data.error || 'Failed to change password' };
    }

    return { success: true };
  } catch (error) {
    console.error('Change password API error:', error);
    return { success: false, error: 'Network error' };
  }
}

// Check if user has active session
export function hasSession(): boolean {
  return !!getSessionToken();
}
