# Database Setup - FINAL INSTRUCTIONS

## Current Status

✅ **Code is ready** - All database integration code has been implemented
❌ **Database tables not created** - You need to run the SQL script once

## The Errors You're Seeing

```
Failed to cleanup expired sessions: Could not find the table 'public.admin_sessions' in the schema cache
Login error: Failed to get admin user: Could not find the table 'public.admin_users' in the schema cache
Public config error: Failed to get config: Could not find the table 'public.admin_config' in the schema cache
```

**These errors are NORMAL** - they appear because the database tables don't exist yet.

## How to Fix (2 Minutes)

### Option 1: Automatic Setup Screen (EASIEST)

1. Try to access your admin panel (`/admin` or add `?admin=true` to your URL)
2. You should see a friendly blue setup screen with instructions
3. Click "Open SQL Editor" button
4. Click "Copy SQL to Clipboard" button
5. Paste in SQL Editor and click RUN
6. Refresh the page - done!

### Option 2: Manual Setup

1. **Open this link:** https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/sql/new

2. **Copy the SQL** from `/database-schema.sql` file (or see below)

3. **Paste and click RUN**

4. **Done!** Refresh your app

## The SQL Script

<details>
<summary>Click to expand SQL (or copy from /database-schema.sql)</summary>

```sql
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

-- Create indexes
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
```

</details>

## What Happens After Setup

1. ✅ All errors will disappear
2. ✅ Admin login will work (password: `admin123`)
3. ✅ You can configure ads, scripts, and SEO settings
4. ✅ Settings are saved to your Supabase database
5. ✅ Everything works!

## Default Login

- **Password:** `admin123`
- **⚠️ IMPORTANT:** Change this immediately in Security Settings!

## What Was Changed

### New Files Created:
- `/supabase/functions/server/database.tsx` - Database utility functions
- `/components/DatabaseSetupRequired.tsx` - Friendly setup screen
- `/database-schema.sql` - SQL script to create tables
- This README

### Files Updated:
- `/supabase/functions/server/index.tsx` - Uses new database layer
- `/components/AdminPage.tsx` - Shows setup screen if needed

### Protected Files (Not Modified):
- `/supabase/functions/server/kv_store.tsx` - Still exists as fallback
- `/utils/supabase/info.tsx` - Already has your credentials

## Why Can't This Be Automatic?

Supabase Edge Functions cannot create database tables for security reasons. 
You must create them through the Supabase dashboard SQL Editor.

**This is a ONE-TIME setup.** Once the tables are created, you'll never need to do this again.

## Troubleshooting

### "Can't access Supabase dashboard"
- URL: https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre
- Make sure you're logged into the correct account

### "SQL execution failed"
- Make sure you copied the ENTIRE script
- Click RUN (or Cmd+Enter / Ctrl+Enter)
- Try again (it's safe to run multiple times)

### "Still seeing errors after running SQL"
- Refresh your application page
- Clear browser cache
- Check if tables exist in Table Editor: https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/editor

### "Tables were created but login doesn't work"
- Check browser console for errors
- Make sure you're using password: `admin123`
- Try clearing localStorage

## Verification

After running the SQL, verify tables exist:

1. Go to: https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/editor
2. You should see 3 tables:
   - `admin_users` (1 row - your admin account)
   - `admin_sessions` (0 rows initially)
   - `admin_config` (1 row - default configuration)

---

**That's it! Once you run the SQL, everything will work perfectly.**
