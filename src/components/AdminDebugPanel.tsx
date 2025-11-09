import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RefreshCw, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bb7cbf27`;

export function AdminDebugPanel() {
  const [loading, setLoading] = useState(false);
  const [testPassword, setTestPassword] = useState('admin123');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [insertLoading, setInsertLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const checkAdminUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/debug/check-admin`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      setDebugInfo({ type: 'admin-check', data, status: response.status });
    } catch (error) {
      setDebugInfo({ 
        type: 'admin-check', 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
    setLoading(false);
  };

  const hashPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/debug/hash-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ password: testPassword })
      });
      const data = await response.json();
      setDebugInfo({ type: 'hash', data, status: response.status });
    } catch (error) {
      setDebugInfo({ 
        type: 'hash', 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
    setLoading(false);
  };

  const testDbConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/db-test`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      setDebugInfo({ type: 'db-test', data, status: response.status });
    } catch (error) {
      setDebugInfo({ 
        type: 'db-test', 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
    setLoading(false);
  };

  const insertAdminUser = async () => {
    if (!confirm('This will insert the default admin user (admin@eyelovesleep.app) with password "admin123". Continue?')) {
      return;
    }
    
    setInsertLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/debug/insert-admin`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { 
          status: 'error', 
          error: `Non-JSON response: ${text.substring(0, 200)}`,
          statusCode: response.status
        };
      }
      
      setDebugInfo({ type: 'insert-admin', data, status: response.status });
      
      // If successful, refresh the admin check
      if (response.ok && data.status === 'ok') {
        setTimeout(() => {
          checkAdminUser();
        }, 1000);
      }
    } catch (error) {
      setDebugInfo({ 
        type: 'insert-admin',
        data: {
          status: 'error',
          error: error instanceof Error ? error.message : String(error)
        }
      });
    }
    setInsertLoading(false);
  };

  const testLogin = async () => {
    setLoginLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ password: testPassword })
      });
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        data = { error: `Non-JSON response: ${text.substring(0, 200)}` };
      }
      
      setDebugInfo({ type: 'test-login', data, status: response.status });
    } catch (error) {
      setDebugInfo({ 
        type: 'test-login',
        data: {
          error: error instanceof Error ? error.message : String(error)
        }
      });
    }
    setLoginLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-white text-3xl mb-2">Admin Debug Panel</h1>
          <p className="text-white/60">Diagnose authentication and database issues</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          <h2 className="text-white text-xl mb-4">Diagnostic Tools</h2>
          
          <div className="space-y-4">
            {/* Test Database Connection */}
            <div>
              <h3 className="text-white/80 mb-2">1. Test Database Connection</h3>
              <Button
                onClick={testDbConnection}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Test Database
              </Button>
            </div>

            {/* Check Admin User */}
            <div>
              <h3 className="text-white/80 mb-2">2. Check Admin User Exists</h3>
              <div className="flex gap-2">
                <Button
                  onClick={checkAdminUser}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                  Check Admin User
                </Button>
                <Button
                  onClick={insertAdminUser}
                  disabled={insertLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {insertLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                  Insert Admin User
                </Button>
              </div>
              <p className="text-xs text-white/50 mt-2">If admin user is missing, click "Insert Admin User" to create it</p>
            </div>

            {/* Test Login */}
            <div>
              <h3 className="text-white/80 mb-2">3. Test Login</h3>
              <div className="flex gap-2">
                <Input
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter password to test"
                />
                <Button
                  onClick={testLogin}
                  disabled={loginLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loginLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                  Test Login
                </Button>
              </div>
              <p className="text-xs text-white/50 mt-2">Test the login flow with the password above</p>
            </div>

            {/* Hash Password */}
            <div>
              <h3 className="text-white/80 mb-2">4. Hash Password for Testing</h3>
              <div className="flex gap-2">
                <Input
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter password to hash"
                />
                <Button
                  onClick={hashPassword}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                  Hash
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Debug Results */}
        {debugInfo && (
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl">Results</h2>
              {debugInfo.status && (
                <div className="flex items-center gap-2">
                  {debugInfo.status === 200 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className={debugInfo.status === 200 ? 'text-green-400' : 'text-red-400'}>
                    Status: {debugInfo.status}
                  </span>
                </div>
              )}
            </div>

            {debugInfo.error ? (
              <div className="bg-red-500/20 border border-red-400/30 rounded p-4">
                <p className="text-red-300 mb-2">Error:</p>
                <code className="text-red-200 text-sm">{debugInfo.error}</code>
              </div>
            ) : (
              <div className="bg-white/10 rounded p-4">
                <pre className="text-white text-xs overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(debugInfo.data, null, 2)}
                </pre>
              </div>
            )}

            {/* Interpretation */}
            {debugInfo.type === 'admin-check' && debugInfo.data && (
              <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded">
                <p className="text-blue-200 mb-2">Interpretation:</p>
                {debugInfo.data.adminExists ? (
                  <div className="space-y-1 text-sm">
                    <p className="text-green-300">✅ Admin user exists in database</p>
                    <p className="text-white/70">Email: {debugInfo.data.email}</p>
                    <p className="text-white/70">Password hash: {debugInfo.data.passwordHashPreview}</p>
                    {debugInfo.data.passwordHashLength !== 64 && (
                      <p className="text-yellow-300">⚠️ Warning: Password hash length is {debugInfo.data.passwordHashLength}, expected 64</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p className="text-red-300">❌ Admin user NOT found in database</p>
                    <p className="text-white/70">{debugInfo.data.message}</p>
                    {debugInfo.data.tableExists && (
                      <>
                        <p className="text-yellow-300">⚠️ Table exists but user was not inserted</p>
                        <p className="text-white/70">Users in table: {debugInfo.data.userCount}</p>
                        {debugInfo.data.existingUsers && debugInfo.data.existingUsers.length > 0 && (
                          <p className="text-white/70">Existing users: {debugInfo.data.existingUsers.join(', ')}</p>
                        )}
                        <div className="mt-3 p-3 bg-green-500/20 border border-green-400/30 rounded">
                          <p className="text-green-300 mb-2">✨ Quick Fix:</p>
                          <p className="text-white/80">Click the "Insert Admin User" button above to create the admin user automatically!</p>
                        </div>
                      </>
                    )}
                    {!debugInfo.data.tableExists && (
                      <p className="text-white/70 mt-2">You need to run the SQL from /database-schema.sql</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {debugInfo.type === 'insert-admin' && debugInfo.data && (
              <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded">
                <p className="text-blue-200 mb-2">Admin User Creation:</p>
                {debugInfo.data.status === 'ok' ? (
                  <div className="space-y-1 text-sm">
                    <p className="text-green-300">✅ Admin user created successfully!</p>
                    <p className="text-white/70">Email: {debugInfo.data.email}</p>
                    <p className="text-white/70 mt-2">You can now log in with:</p>
                    <div className="mt-2 p-2 bg-white/10 rounded">
                      <p className="text-white">Email: <code className="text-blue-300">admin@eyelovesleep.app</code></p>
                      <p className="text-white">Password: <code className="text-blue-300">admin123</code></p>
                    </div>
                    <div className="mt-3">
                      <Button
                        onClick={() => window.location.hash = 'admin'}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Go to Admin Login →
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p className="text-red-300">❌ Failed to create admin user</p>
                    <p className="text-white/70">{debugInfo.data.error || debugInfo.data.message || 'Unknown error'}</p>
                    {debugInfo.data.hint && (
                      <p className="text-yellow-300">💡 {debugInfo.data.hint}</p>
                    )}
                    {debugInfo.data.code && (
                      <p className="text-white/50 text-xs">Error code: {debugInfo.data.code}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {debugInfo.type === 'test-login' && debugInfo.data && (
              <div className="mt-4 p-4 bg-purple-500/20 border border-purple-400/30 rounded">
                <p className="text-purple-200 mb-2">Login Test Result:</p>
                {debugInfo.data.success || debugInfo.data.token ? (
                  <div className="space-y-2 text-sm">
                    <p className="text-green-300">✅ Login successful!</p>
                    {debugInfo.data.token && (
                      <div>
                        <p className="text-white/70">Session token received:</p>
                        <p className="text-white/50 text-xs font-mono break-all mt-1">{debugInfo.data.token}</p>
                      </div>
                    )}
                    {debugInfo.data.email && (
                      <p className="text-white/70">Email: {debugInfo.data.email}</p>
                    )}
                    <div className="mt-3 p-3 bg-green-500/20 border border-green-400/30 rounded">
                      <p className="text-green-300 mb-2">✨ Login is working!</p>
                      <p className="text-white/80">You can now log in at the admin page with password: <code className="text-blue-300">{testPassword}</code></p>
                      <Button
                        onClick={() => window.location.hash = 'admin'}
                        className="bg-blue-600 hover:bg-blue-700 mt-2"
                      >
                        Go to Admin Login →
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p className="text-red-300">❌ Login failed</p>
                    <p className="text-white/70">{debugInfo.data.error || 'Unknown error'}</p>
                    {debugInfo.status && (
                      <p className="text-white/50 text-xs">HTTP Status: {debugInfo.status}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {debugInfo.type === 'hash' && debugInfo.data && (
              <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded">
                <p className="text-blue-200 mb-2">Password Hash:</p>
                <div className="space-y-1 text-sm">
                  <p className="text-white/70">Input: <code className="text-white">{debugInfo.data.password}</code></p>
                  <p className="text-white/70">Hash: <code className="text-white">{debugInfo.data.hash}</code></p>
                  {debugInfo.data.password === 'admin123' && (
                    <div className="mt-2">
                      {debugInfo.data.hash === '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' ? (
                        <p className="text-green-300">✅ Hash matches expected value for "admin123"</p>
                      ) : (
                        <div>
                          <p className="text-red-300">❌ Hash does NOT match expected value</p>
                          <p className="text-white/70 text-xs mt-1">Expected: 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9</p>
                          <p className="text-white/70 text-xs">Got: {debugInfo.data.hash}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {debugInfo.type === 'db-test' && debugInfo.data && (
              <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded">
                <p className="text-blue-200 mb-2">Database Status:</p>
                {debugInfo.data.status === 'ok' ? (
                  <div className="space-y-1 text-sm">
                    <p className="text-green-300">✅ Database connected successfully</p>
                    <p className="text-white/70">Admin user exists: {debugInfo.data.adminUserExists ? 'Yes' : 'No'}</p>
                    <p className="text-white/70">Config exists: {debugInfo.data.configExists ? 'Yes' : 'No'}</p>
                  </div>
                ) : (
                  <div className="space-y-1 text-sm">
                    <p className="text-red-300">❌ Database connection failed</p>
                    <p className="text-white/70">{debugInfo.data.error}</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-6">
          <h2 className="text-white text-xl mb-4">Setup Instructions</h2>
          <div className="space-y-3 text-white/70 text-sm">
            <div className="p-3 bg-white/5 rounded">
              <p className="text-white mb-2">Step 1: Create Database Tables</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Go to <a href="https://supabase.com/dashboard/project/qglpvmhpkbptyfmseqre/sql/new" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Supabase SQL Editor</a></li>
                <li>Copy the SQL from <code className="text-blue-300">/database-schema.sql</code></li>
                <li>Paste and click "RUN"</li>
              </ol>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <p className="text-white mb-2">Step 2: Verify Setup</p>
              <p>Use the diagnostic tools above to verify:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                <li>Database connection is working</li>
                <li>Admin user exists with correct password hash</li>
                <li>Password "admin123" hashes to the expected value</li>
              </ul>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <p className="text-white mb-2">Expected Values:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Admin email: <code className="text-blue-300">admin@eyelovesleep.app</code></li>
                <li>Default password: <code className="text-blue-300">admin123</code></li>
                <li>Password hash length: <code className="text-blue-300">64 characters</code></li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <button
            onClick={() => window.location.hash = 'admin'}
            className="text-sm text-white/50 hover:text-white/80 transition-colors underline-offset-2 hover:underline"
          >
            ← Back to Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}
