-- ============================================================================
-- EyeLoveSleep Admin Panel Database Schema
-- Run this in Supabase SQL Editor: 
-- https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/sql
-- ============================================================================

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Create admin_config table
CREATE TABLE IF NOT EXISTS admin_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@eyelovesleep.app', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9')
ON CONFLICT (email) DO NOTHING;

-- Insert default configuration
INSERT INTO admin_config (config_data)
SELECT jsonb_build_object(
  'adsEnabled', true,
  'adPlacements', jsonb_build_object(
    'headerBanner', jsonb_build_object('enabled', true, 'code', ''),
    'sidebarTop', jsonb_build_object('enabled', true, 'code', ''),
    'sidebarBottom', jsonb_build_object('enabled', true, 'code', ''),
    'contentTop', jsonb_build_object('enabled', true, 'code', ''),
    'contentBottom', jsonb_build_object('enabled', true, 'code', ''),
    'footerBanner', jsonb_build_object('enabled', true, 'code', '')
  ),
  'customScripts', '[]'::jsonb,
  'security', jsonb_build_object(
    'maxLoginAttempts', 5,
    'sessionTimeout', 24,
    'requireStrongPassword', false
  ),
  'seo', jsonb_build_object(
    'siteName', 'EyeLoveSleep',
    'pages', jsonb_build_object(
      'sleepCalculator', jsonb_build_object(
        'title', 'Sleep Calculator - Calculate Best Bedtime & Wake Time',
        'description', 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles. Get personalized sleep recommendations for better rest.',
        'keywords', 'sleep calculator, bedtime calculator, wake time calculator, sleep cycles, REM sleep'
      ),
      'sleepRecommendations', jsonb_build_object(
        'title', 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
        'description', 'Find recommended sleep hours for all ages from newborns to seniors. Based on National Sleep Foundation guidelines.',
        'keywords', 'sleep recommendations, sleep by age, how much sleep, sleep guidelines, NSF'
      ),
      'jetLagCalculator', jsonb_build_object(
        'title', 'Jet Lag Calculator - Adjust to New Time Zones Faster',
        'description', 'Beat jet lag with our smart calculator. Get a personalized adjustment plan for your destination timezone.',
        'keywords', 'jet lag calculator, timezone adjustment, travel sleep, jet lag recovery'
      )
    )
  )
)
WHERE NOT EXISTS (SELECT 1 FROM admin_config);
