import { AlertCircle, Database, ExternalLink, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DatabaseStatus } from './DatabaseStatus';

export function DatabaseSetupRequired() {
  const sqlScript = `-- Create admin_users table
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
WHERE NOT EXISTS (SELECT 1 FROM admin_config);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    alert('SQL copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full bg-slate-800/90 border-blue-500/30 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-500/20 rounded-lg">
            <AlertCircle className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h1 className="text-white text-2xl">Database Setup Required</h1>
            <p className="text-slate-400">One-time setup (takes 2 minutes)</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-4">
            <p className="text-slate-300">
              The admin panel database tables haven't been created yet. Follow these simple steps to complete the setup:
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Open Supabase SQL Editor</h3>
                <Button
                  onClick={() => window.open('https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/sql/new', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open SQL Editor
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Copy the SQL Script</h3>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="border-blue-500/50 hover:bg-blue-500/10 text-blue-400"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Copy SQL to Clipboard
                </Button>
                <p className="text-slate-400 text-sm mt-2">
                  Or find it in <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">/database-schema.sql</code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Paste and Run</h3>
                <p className="text-slate-300">
                  Paste the SQL into the editor and click the <span className="text-blue-400 font-semibold">RUN</span> button
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  (Or press Cmd+Enter on Mac, Ctrl+Enter on Windows)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-2">Refresh This Page</h3>
                <p className="text-slate-300">
                  Once the SQL runs successfully, refresh this page and the admin panel will be ready!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-6">
            <h4 className="text-blue-400 mb-2">ℹ️ Why is this needed?</h4>
            <p className="text-slate-300 text-sm">
              For security reasons, Supabase Edge Functions cannot create database tables automatically. 
              This is a one-time setup that creates three tables: <code className="text-blue-400">admin_users</code>, 
              <code className="text-blue-400"> admin_sessions</code>, and <code className="text-blue-400">admin_config</code>.
            </p>
          </div>

          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
            <h4 className="text-amber-400 mb-2">🔐 Default Login</h4>
            <p className="text-slate-300 text-sm">
              After setup, login with password: <code className="bg-slate-900 px-2 py-1 rounded text-amber-400">admin123</code>
              <br />
              <span className="text-amber-400">⚠️ Change this password immediately in the Security settings!</span>
            </p>
          </div>

          {/* Database Status Checker */}
          <div className="mt-6">
            <DatabaseStatus />
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              I've Run the SQL - Refresh Page
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
