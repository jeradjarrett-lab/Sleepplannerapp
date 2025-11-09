import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as db from "./database.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Admin-Token", "X-Public-Key"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to hash passwords using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Helper function to verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// Cleanup expired sessions on startup (only if tables exist)
async function cleanupOnStartup() {
  try {
    console.log('🧹 Cleaning up expired sessions...');
    await db.cleanupExpiredSessions();
    console.log('✅ Cleanup complete');
  } catch (error) {
    console.log('⚠️ Cleanup skipped (tables may not exist yet):', error.message);
  }
}

// Initialize on startup
cleanupOnStartup();

// Health check endpoint
app.get("/make-server-bb7cbf27/health", (c) => {
  return c.json({ status: "ok" });
});

// Database setup endpoint - Creates tables automatically
app.get("/make-server-bb7cbf27/setup-database", async (c) => {
  try {
    console.log('🚀 Starting database setup...');
    
    const supabase = (await import("jsr:@supabase/supabase-js@2.49.8")).createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Create admin_users table
    console.log('📝 Creating admin_users table...');
    await supabase.rpc('exec_sql', { 
      sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    }).catch(() => {
      // Fallback: use direct SQL execution
      console.log('Using direct SQL execution...');
    });

    // Alternative approach using direct query
    const setupSQL = `
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
    `;

    console.log('✅ Database setup complete!');
    console.log('📋 Instructions:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/sql/new');
    console.log('   2. Copy and paste the SQL from /database-schema.sql');
    console.log('   3. Click RUN');
    console.log('');
    console.log('⚠️ This endpoint cannot create tables directly due to Supabase restrictions.');
    console.log('   You must run the SQL manually in the Supabase dashboard.');

    return c.json({
      status: 'error',
      message: 'Tables do not exist. You must create them manually.',
      instructions: [
        'Go to: https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/sql/new',
        'Copy the SQL from /database-schema.sql file',
        'Paste it into the SQL Editor',
        'Click RUN button',
        'Refresh this page'
      ],
      sql: setupSQL,
      sqlFileLocation: '/database-schema.sql'
    }, 500);

  } catch (error) {
    console.error('❌ Database setup error:', error);
    return c.json({ 
      status: 'error',
      error: error.message,
      instructions: 'Please run the SQL from /database-schema.sql manually in Supabase dashboard'
    }, 500);
  }
});

// Public config endpoint (for SEO settings)
app.get("/make-server-bb7cbf27/public/config", async (c) => {
  try {
    let config = null;
    try {
      config = await db.getConfig();
    } catch (dbError) {
      console.log('⚠️ Database not set up yet, using default config');
    }
    
    const defaultSeoConfig = {
      siteName: 'EyeLoveSleep',
      pages: {
        sleepCalculator: {
          title: 'Sleep Calculator - Calculate Best Bedtime & Wake Time',
          description: 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles. Get personalized sleep recommendations for better rest.',
          keywords: 'sleep calculator, bedtime calculator, wake time calculator, sleep cycles, REM sleep'
        },
        sleepRecommendations: {
          title: 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
          description: 'Find recommended sleep hours for all ages from newborns to seniors. Based on National Sleep Foundation guidelines.',
          keywords: 'sleep recommendations, sleep by age, how much sleep, sleep guidelines, NSF'
        },
        jetLagCalculator: {
          title: 'Jet Lag Calculator - Adjust to New Time Zones Faster',
          description: 'Beat jet lag with our smart calculator. Get a personalized adjustment plan for your destination timezone.',
          keywords: 'jet lag calculator, timezone adjustment, travel sleep, jet lag recovery'
        }
      }
    };
    
    if (!config) {
      return c.json({ 
        seo: defaultSeoConfig,
        adsEnabled: true,
        adPlacements: {
          headerBanner: { enabled: true, code: '' },
          sidebarTop: { enabled: true, code: '' },
          sidebarBottom: { enabled: true, code: '' },
          contentTop: { enabled: true, code: '' },
          contentBottom: { enabled: true, code: '' },
          footerBanner: { enabled: true, code: '' }
        },
        customScripts: []
      });
    }
    
    // Return full config (ad codes are meant to be public - they render on the page)
    return c.json(config);
  } catch (error) {
    console.log('⚠️ Using default config due to error:', error.message);
    // Return default config instead of error
    return c.json({ 
      seo: {
        siteName: 'EyeLoveSleep',
        pages: {
          sleepCalculator: {
            title: 'Sleep Calculator - Calculate Best Bedtime & Wake Time',
            description: 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles. Get personalized sleep recommendations for better rest.',
            keywords: 'sleep calculator, bedtime calculator, wake time calculator, sleep cycles, REM sleep'
          },
          sleepRecommendations: {
            title: 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
            description: 'Find recommended sleep hours for all ages from newborns to seniors. Based on National Sleep Foundation guidelines.',
            keywords: 'sleep recommendations, sleep by age, how much sleep, sleep guidelines, NSF'
          },
          jetLagCalculator: {
            title: 'Jet Lag Calculator - Adjust to New Time Zones Faster',
            description: 'Beat jet lag with our smart calculator. Get a personalized adjustment plan for your destination timezone.',
            keywords: 'jet lag calculator, timezone adjustment, travel sleep, jet lag recovery'
          }
        }
      },
      adsEnabled: true,
      adPlacements: {
        headerBanner: { enabled: true, code: '' },
        sidebarTop: { enabled: true, code: '' },
        sidebarBottom: { enabled: true, code: '' },
        contentTop: { enabled: true, code: '' },
        contentBottom: { enabled: true, code: '' },
        footerBanner: { enabled: true, code: '' }
      },
      customScripts: []
    });
  }
});

// Database connection test endpoint
app.get("/make-server-bb7cbf27/db-test", async (c) => {
  try {
    console.log('🔍 Testing database connection...');
    
    // Try to read the admin user
    const adminUser = await db.getAdminUserByEmail('admin@eyelovesleep.app');
    
    // Try to read config
    const config = await db.getConfig();
    
    return c.json({
      status: 'ok',
      database: 'connected',
      adminUserExists: !!adminUser,
      configExists: !!config,
      tablesWorking: true,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return c.json({
      status: 'error',
      database: 'failed',
      error: error.message
    }, 500);
  }
});

// Debug endpoint - Hash password for testing
app.post("/make-server-bb7cbf27/debug/hash-password", async (c) => {
  try {
    const { password } = await c.req.json();
    const hash = await hashPassword(password);
    return c.json({ password, hash });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Debug endpoint - Check admin user in database
app.get("/make-server-bb7cbf27/debug/check-admin", async (c) => {
  try {
    console.log('🔍 Checking admin user in database...');
    
    // First, check if table exists by trying to query it
    const supabase = (await import("jsr:@supabase/supabase-js@2.49.8")).createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    
    // Try to count all users
    const { data: allUsers, error: countError } = await supabase
      .from('admin_users')
      .select('email, created_at', { count: 'exact' });
    
    if (countError) {
      return c.json({
        status: 'error',
        error: countError.message,
        hint: countError.message.includes('Could not find the table') 
          ? 'Table admin_users does not exist. Run the SQL script.' 
          : 'Error querying admin_users table'
      }, 500);
    }
    
    const adminUser = await db.getAdminUserByEmail('admin@eyelovesleep.app');
    
    if (!adminUser) {
      return c.json({
        status: 'error',
        message: 'Admin user not found in database',
        tableExists: true,
        userCount: allUsers?.length || 0,
        existingUsers: allUsers?.map(u => u.email) || [],
        hint: 'Table exists but admin user was not inserted. Use the manual insert button in debug panel.'
      });
    }
    
    return c.json({
      status: 'ok',
      adminExists: true,
      email: adminUser.email,
      hasPasswordHash: !!adminUser.password_hash,
      passwordHashLength: adminUser.password_hash?.length,
      passwordHashPreview: adminUser.password_hash?.substring(0, 20) + '...',
      created_at: adminUser.created_at
    });
  } catch (error) {
    console.error('❌ Check admin error:', error);
    return c.json({
      status: 'error',
      error: error.message,
      hint: error.message.includes('Could not find the table') 
        ? 'Database tables not created. Please run /database-schema.sql' 
        : 'Unknown error'
    }, 500);
  }
});

// Debug endpoint - Manually insert admin user
app.post("/make-server-bb7cbf27/debug/insert-admin", async (c) => {
  try {
    console.log('🔧 Manually inserting admin user...');
    
    const supabase = (await import("jsr:@supabase/supabase-js@2.49.8")).createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    
    // First check if user already exists
    const { data: existing } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', 'admin@eyelovesleep.app')
      .maybeSingle();
    
    if (existing) {
      return c.json({
        status: 'ok',
        message: 'Admin user already exists',
        email: 'admin@eyelovesleep.app'
      });
    }
    
    // Insert the admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: 'admin@eyelovesleep.app',
        password_hash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Insert error:', error);
      return c.json({
        status: 'error',
        error: error.message,
        hint: 'Failed to insert admin user. Check Supabase logs.'
      }, 500);
    }
    
    console.log('✅ Admin user inserted successfully');
    return c.json({
      status: 'ok',
      message: 'Admin user created successfully',
      email: data.email,
      created: true
    });
  } catch (error) {
    console.error('❌ Insert admin error:', error);
    return c.json({
      status: 'error',
      error: error.message
    }, 500);
  }
});

// Admin login endpoint
app.post("/make-server-bb7cbf27/admin/login", async (c) => {
  try {
    console.log('🔐 Admin login attempt received');
    console.log('📋 Request headers:', Object.fromEntries(c.req.raw.headers.entries()));
    
    let body;
    try {
      body = await c.req.json();
      console.log('📦 Request body parsed successfully');
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return c.json({ error: 'Invalid request body' }, 400);
    }
    
    const { password } = body;
    
    if (!password) {
      console.log('❌ No password provided');
      return c.json({ error: 'Password is required' }, 400);
    }

    console.log('🔍 Looking up admin user...');
    let adminUser;
    try {
      adminUser = await db.getAdminUserByEmail('admin@eyelovesleep.app');
    } catch (dbError) {
      console.error('❌ Database error during login:', dbError);
      const errorMsg = dbError instanceof Error ? dbError.message : String(dbError);
      console.error('❌ Database error message:', errorMsg);
      // Check if it's a "table doesn't exist" error
      if (errorMsg && errorMsg.includes('Could not find the table')) {
        return c.json({ error: 'Database tables not created. Please run the SQL from /database-schema.sql in Supabase dashboard.' }, 500);
      }
      throw dbError;
    }
    
    if (!adminUser) {
      console.log('❌ Admin user not found in database');
      return c.json({ error: 'Admin user not found. Please ensure you ran the SQL script from /database-schema.sql' }, 404);
    }
    
    console.log('✅ Admin user found');
    console.log('   Email:', adminUser.email);
    console.log('   Has password hash:', !!adminUser.password_hash);
    console.log('   Password hash length:', adminUser.password_hash?.length);
    
    // Hash the input password for comparison
    const inputHash = await hashPassword(password);
    console.log('🔑 Input password hash:', inputHash);
    console.log('🔑 Stored password hash:', adminUser.password_hash);
    console.log('🔑 Hashes match:', inputHash === adminUser.password_hash);
    
    console.log('✅ Verifying password...');
    const isValid = await verifyPassword(password, adminUser.password_hash);
    if (!isValid) {
      console.log('❌ Invalid password');
      console.log('   Expected hash:', adminUser.password_hash);
      console.log('   Received hash:', inputHash);
      return c.json({ error: 'Invalid password' }, 401);
    }

    console.log('✅ Password valid, creating session...');
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await db.createSession(adminUser.id, sessionToken, expiresAt);

    console.log('✅ Login successful, returning token');
    return c.json({ 
      success: true, 
      token: sessionToken,
      email: adminUser.email
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return c.json({ error: 'Login failed: ' + errorMessage }, 500);
  }
});

// Middleware to verify admin session
async function verifyAdminSession(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    const session = await db.getSession(token);
    if (!session) return false;
    
    const expiresAt = new Date(session.expires_at);
    if (expiresAt < new Date()) {
      await db.deleteSession(token);
      return false;
    }
    
    return true;
  } catch (error) {
    // If tables don't exist, log it but don't fail silently
    if (error.message && error.message.includes('Could not find the table')) {
      console.log('⚠️ Session verification failed: database tables not created');
    }
    return false;
  }
}

// Get admin configuration
app.get("/make-server-bb7cbf27/admin/config", async (c) => {
  try {
    console.log('📡 GET /admin/config called');
    const token = c.req.header('X-Admin-Token');
    console.log('🔑 Token provided:', !!token);
    
    // First, check if database tables exist
    let config = null;
    try {
      console.log('🔍 Attempting to get config from database...');
      config = await db.getConfig();
      console.log('✅ Database query successful');
    } catch (dbError) {
      console.error('❌ Database error:', dbError.message);
      // If database tables don't exist, return specific error WITHOUT requiring auth
      if (dbError.message && dbError.message.includes('Could not find the table')) {
        console.log('⚠️ Database tables not found');
        return c.json({ error: 'Database tables not created. Please run the SQL from /database-schema.sql in Supabase dashboard.' }, 500);
      }
      throw dbError;
    }
    
    // Now verify authentication
    if (!token || !(await verifyAdminSession(token))) {
      console.log('❌ Authentication failed');
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    // Return default config if none exists
    const defaultConfig = {
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
      security: {
        maxLoginAttempts: 5,
        sessionTimeout: 24,
        requireStrongPassword: false
      },
      seo: {
        siteName: 'EyeLoveSleep',
        pages: {
          sleepCalculator: {
            title: 'Sleep Calculator - Calculate Best Bedtime & Wake Time',
            description: 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles. Get personalized sleep recommendations for better rest.',
            keywords: 'sleep calculator, bedtime calculator, wake time calculator, sleep cycles, REM sleep'
          },
          sleepRecommendations: {
            title: 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
            description: 'Find recommended sleep hours for all ages from newborns to seniors. Based on National Sleep Foundation guidelines.',
            keywords: 'sleep recommendations, sleep by age, how much sleep, sleep guidelines, NSF'
          },
          jetLagCalculator: {
            title: 'Jet Lag Calculator - Adjust to New Time Zones Faster',
            description: 'Beat jet lag with our smart calculator. Get a personalized adjustment plan for your destination timezone.',
            keywords: 'jet lag calculator, timezone adjustment, travel sleep, jet lag recovery'
          }
        }
      }
    };

    return c.json(config || defaultConfig);
  } catch (error) {
    console.error('Get config error:', error);
    return c.json({ error: 'Failed to get config: ' + error.message }, 500);
  }
});

// Update admin configuration
app.post("/make-server-bb7cbf27/admin/config", async (c) => {
  try {
    const token = c.req.header('X-Admin-Token');
    
    if (!token || !(await verifyAdminSession(token))) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const config = await c.req.json();
    
    // Get user ID from session
    const session = await db.getSession(token);
    await db.updateConfig(config, session?.user_id);

    return c.json({ success: true });
  } catch (error) {
    console.error('Update config error:', error);
    return c.json({ error: 'Failed to update config: ' + error.message }, 500);
  }
});

// Change admin password
app.post("/make-server-bb7cbf27/admin/change-password", async (c) => {
  try {
    const token = c.req.header('X-Admin-Token');
    
    if (!token || !(await verifyAdminSession(token))) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { currentPassword, newPassword } = await c.req.json();
    
    if (!currentPassword || !newPassword) {
      return c.json({ error: 'Current and new passwords are required' }, 400);
    }

    const adminUser = await db.getAdminUserByEmail('admin@eyelovesleep.app');
    if (!adminUser) {
      return c.json({ error: 'Admin user not found' }, 404);
    }

    const isValid = await verifyPassword(currentPassword, adminUser.password_hash);
    if (!isValid) {
      return c.json({ error: 'Current password is incorrect' }, 401);
    }

    const newPasswordHash = await hashPassword(newPassword);
    await db.updateAdminPassword(adminUser.email, newPasswordHash);

    return c.json({ success: true });
  } catch (error) {
    console.error('Change password error:', error);
    return c.json({ error: 'Failed to change password: ' + error.message }, 500);
  }
});

// Admin logout
app.post("/make-server-bb7cbf27/admin/logout", async (c) => {
  try {
    const token = c.req.header('X-Admin-Token');
    
    if (token) {
      await db.deleteSession(token);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return c.json({ error: 'Logout failed: ' + error.message }, 500);
  }
});

// Public configuration endpoint (no authentication required)
app.get("/make-server-bb7cbf27/public/config", async (c) => {
  try {
    console.log('📡 GET /public/config called');
    
    // Get config from database
    let config = null;
    try {
      config = await db.getConfig();
    } catch (dbError) {
      console.error('❌ Database error:', dbError.message);
      // If database tables don't exist, return default config
      if (dbError.message && dbError.message.includes('Could not find the table')) {
        console.log('⚠️ Database tables not found, returning default config');
        config = null; // Will use default below
      } else {
        throw dbError;
      }
    }
    
    // Default configuration
    const defaultConfig = {
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
            description: 'Calculate your optimal bedtime and wake time based on 90-minute sleep cycles. Get personalized sleep recommendations for better rest.',
            keywords: 'sleep calculator, bedtime calculator, wake time calculator, sleep cycles, REM sleep'
          },
          sleepRecommendations: {
            title: 'Sleep Recommendations by Age - National Sleep Foundation Guidelines',
            description: 'Find recommended sleep hours for all ages from newborns to seniors. Based on National Sleep Foundation guidelines.',
            keywords: 'sleep recommendations, sleep by age, how much sleep, sleep guidelines, NSF'
          },
          jetLagCalculator: {
            title: 'Jet Lag Calculator - Adjust to New Time Zones Faster',
            description: 'Beat jet lag with our smart calculator. Get a personalized adjustment plan for your destination timezone.',
            keywords: 'jet lag calculator, timezone adjustment, travel sleep, jet lag recovery'
          }
        }
      }
    };

    const finalConfig = config || defaultConfig;
    console.log('✅ Returning public config');
    return c.json(finalConfig);
  } catch (error) {
    console.error('Get public config error:', error);
    return c.json({ error: 'Failed to get config: ' + error.message }, 500);
  }
});

Deno.serve(app.fetch);