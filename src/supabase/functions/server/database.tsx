/**
 * Database utility functions for EyeLoveSleep admin panel
 * Uses dedicated Supabase tables instead of key-value store
 */

import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const getClient = () => createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// ============================================================================
// Admin Users
// ============================================================================

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .maybeSingle();
  
  if (error) {
    if (error.message.includes('Could not find the table')) {
      throw new Error(`Database tables not created. Please run the SQL from /database-schema.sql in Supabase dashboard: https://supabase.com/dashboard/project/${Deno.env.get("SUPABASE_URL")?.split('//')[1]?.split('.')[0]}/sql/new`);
    }
    throw new Error(`Failed to get admin user: ${error.message}`);
  }
  
  return data;
}

export async function updateAdminPassword(email: string, passwordHash: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase
    .from('admin_users')
    .update({ 
      password_hash: passwordHash,
      updated_at: new Date().toISOString()
    })
    .eq('email', email);
  
  if (error) {
    throw new Error(`Failed to update password: ${error.message}`);
  }
}

// ============================================================================
// Admin Sessions
// ============================================================================

export interface AdminSession {
  id: string;
  token: string;
  user_id: string;
  created_at: string;
  expires_at: string;
}

export async function createSession(userId: string, token: string, expiresAt: Date): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase
    .from('admin_sessions')
    .insert({
      token,
      user_id: userId,
      expires_at: expiresAt.toISOString()
    });
  
  if (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }
}

export async function getSession(token: string): Promise<AdminSession | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('admin_sessions')
    .select('*')
    .eq('token', token)
    .maybeSingle();
  
  if (error) {
    throw new Error(`Failed to get session: ${error.message}`);
  }
  
  return data;
}

export async function deleteSession(token: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase
    .from('admin_sessions')
    .delete()
    .eq('token', token);
  
  if (error) {
    throw new Error(`Failed to delete session: ${error.message}`);
  }
}

export async function cleanupExpiredSessions(): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase
    .from('admin_sessions')
    .delete()
    .lt('expires_at', new Date().toISOString());
  
  if (error) {
    if (error.message.includes('Could not find the table')) {
      throw new Error(`Database tables not created. Please run the SQL from /database-schema.sql in Supabase dashboard.`);
    }
    console.error('Failed to cleanup expired sessions:', error.message);
  }
}

// ============================================================================
// Admin Configuration
// ============================================================================

export interface AdminConfig {
  id: string;
  config_data: {
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
  };
  updated_at: string;
  updated_by: string | null;
}

export async function getConfig(): Promise<AdminConfig['config_data'] | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('admin_config')
    .select('config_data')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    if (error.message.includes('Could not find the table')) {
      throw new Error(`Database tables not created. Please run the SQL from /database-schema.sql in Supabase dashboard: https://supabase.com/dashboard/project/${Deno.env.get("SUPABASE_URL")?.split('//')[1]?.split('.')[0]}/sql/new`);
    }
    throw new Error(`Failed to get config: ${error.message}`);
  }
  
  return data?.config_data || null;
}

export async function updateConfig(configData: AdminConfig['config_data'], userId?: string): Promise<void> {
  const supabase = getClient();
  
  // Get the current config ID (we only keep one config record)
  const { data: currentConfig } = await supabase
    .from('admin_config')
    .select('id')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (currentConfig) {
    // Update existing config
    const { error } = await supabase
      .from('admin_config')
      .update({
        config_data: configData,
        updated_at: new Date().toISOString(),
        updated_by: userId || null
      })
      .eq('id', currentConfig.id);
    
    if (error) {
      throw new Error(`Failed to update config: ${error.message}`);
    }
  } else {
    // Insert new config (shouldn't happen if DB is properly initialized)
    const { error } = await supabase
      .from('admin_config')
      .insert({
        config_data: configData,
        updated_by: userId || null
      });
    
    if (error) {
      throw new Error(`Failed to insert config: ${error.message}`);
    }
  }
}
