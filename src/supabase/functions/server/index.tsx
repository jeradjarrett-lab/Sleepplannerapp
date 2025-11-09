import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
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

// Initialize default admin user if none exists
async function initializeDefaultAdmin() {
  try {
    console.log('🚀 Initializing admin user...');
    const existingAdmin = await kv.get('admin_user');
    if (!existingAdmin) {
      console.log('📝 Creating default admin user...');
      const defaultPassword = 'admin123';
      const passwordHash = await hashPassword(defaultPassword);
      await kv.set('admin_user', {
        email: 'admin@eyelovesleep.app',
        passwordHash,
        createdAt: new Date().toISOString()
      });
      console.log('✅ Default admin user created with password: admin123');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing default admin:', error);
  }
}

// Initialize on startup
initializeDefaultAdmin();

// Health check endpoint
app.get("/make-server-bb7cbf27/health", (c) => {
  return c.json({ status: "ok" });
});

// Public config endpoint (for SEO settings)
app.get("/make-server-bb7cbf27/public/config", async (c) => {
  try {
    const config = await kv.get('admin_config');
    
    if (!config) {
      // Return default SEO config
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
        }
      });
    }
    
    // Return only SEO config (don't expose ad codes or other sensitive data)
    return c.json({
      seo: config.seo || {
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
    });
  } catch (error) {
    console.error('Public config error:', error);
    return c.json({ error: 'Failed to get config: ' + error.message }, 500);
  }
});

// Database connection test endpoint
app.get("/make-server-bb7cbf27/db-test", async (c) => {
  try {
    console.log('🔍 Testing database connection...');
    
    // Try to read the admin user
    const adminUser = await kv.get('admin_user');
    
    // Try a simple set/get test
    const testKey = 'db_test_' + Date.now();
    await kv.set(testKey, { test: true, timestamp: new Date().toISOString() });
    const testValue = await kv.get(testKey);
    await kv.del(testKey);
    
    return c.json({
      status: 'ok',
      database: 'connected',
      adminUserExists: !!adminUser,
      kvStoreWorking: !!testValue,
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

// Admin login endpoint
app.post("/make-server-bb7cbf27/admin/login", async (c) => {
  try {
    console.log('🔐 Admin login attempt received');
    const { password } = await c.req.json();
    
    if (!password) {
      console.log('❌ No password provided');
      return c.json({ error: 'Password is required' }, 400);
    }

    console.log('🔍 Looking up admin user...');
    const adminUser = await kv.get('admin_user');
    if (!adminUser) {
      console.log('❌ Admin user not found in database');
      return c.json({ error: 'Admin user not found' }, 404);
    }
    
    console.log('✅ Admin user found, verifying password...');
    const isValid = await verifyPassword(password, adminUser.passwordHash);
    if (!isValid) {
      console.log('❌ Invalid password');
      return c.json({ error: 'Invalid password' }, 401);
    }

    console.log('✅ Password valid, creating session...');
    // Generate a simple session token (in production, use JWT)
    const sessionToken = crypto.randomUUID();
    await kv.set(`admin_session:${sessionToken}`, {
      email: adminUser.email,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    });

    console.log('✅ Login successful, returning token');
    return c.json({ 
      success: true, 
      token: sessionToken,
      email: adminUser.email
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return c.json({ error: 'Login failed: ' + error.message }, 500);
  }
});

// Middleware to verify admin session
async function verifyAdminSession(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    const session = await kv.get(`admin_session:${token}`);
    if (!session) return false;
    
    const expiresAt = new Date(session.expiresAt);
    if (expiresAt < new Date()) {
      await kv.del(`admin_session:${token}`);
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// Get admin configuration
app.get("/make-server-bb7cbf27/admin/config", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !(await verifyAdminSession(token))) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const config = await kv.get('admin_config');
    
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
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !(await verifyAdminSession(token))) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const config = await c.req.json();
    await kv.set('admin_config', config);

    return c.json({ success: true });
  } catch (error) {
    console.error('Update config error:', error);
    return c.json({ error: 'Failed to update config: ' + error.message }, 500);
  }
});

// Change admin password
app.post("/make-server-bb7cbf27/admin/change-password", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !(await verifyAdminSession(token))) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { currentPassword, newPassword } = await c.req.json();
    
    if (!currentPassword || !newPassword) {
      return c.json({ error: 'Current and new passwords are required' }, 400);
    }

    const adminUser = await kv.get('admin_user');
    if (!adminUser) {
      return c.json({ error: 'Admin user not found' }, 404);
    }

    const isValid = await verifyPassword(currentPassword, adminUser.passwordHash);
    if (!isValid) {
      return c.json({ error: 'Current password is incorrect' }, 401);
    }

    const newPasswordHash = await hashPassword(newPassword);
    await kv.set('admin_user', {
      ...adminUser,
      passwordHash: newPasswordHash,
      updatedAt: new Date().toISOString()
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Change password error:', error);
    return c.json({ error: 'Failed to change password: ' + error.message }, 500);
  }
});

// Admin logout
app.post("/make-server-bb7cbf27/admin/logout", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token) {
      await kv.del(`admin_session:${token}`);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return c.json({ error: 'Logout failed: ' + error.message }, 500);
  }
});

Deno.serve(app.fetch);