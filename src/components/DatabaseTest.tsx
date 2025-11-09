import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function DatabaseTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const testConnection = async () => {
    setStatus('testing');
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-bb7cbf27/db-test`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      console.log('Database test result:', data);
      setResult(data);
      setStatus(response.ok ? 'success' : 'error');
    } catch (error) {
      console.error('Database test error:', error);
      setResult({ error: error instanceof Error ? error.message : String(error) });
      setStatus('error');
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl">Database Connection Test</h2>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-400">
          Project ID: <code className="bg-gray-800 px-2 py-1 rounded">{projectId}</code>
        </p>
        <p className="text-sm text-gray-400">
          Server URL: <code className="bg-gray-800 px-2 py-1 rounded text-xs">
            https://{projectId}.supabase.co/functions/v1/make-server-bb7cbf27
          </code>
        </p>
      </div>

      <Button 
        onClick={testConnection}
        disabled={status === 'testing'}
        className="w-full"
      >
        {status === 'testing' ? 'Testing...' : 'Test Database Connection'}
      </Button>

      {result && (
        <div className="mt-4">
          <h3 className="text-sm mb-2">Result:</h3>
          <pre className={`p-4 rounded-lg overflow-auto text-xs ${
            status === 'success' ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'
          }`}>
            {JSON.stringify(result, null, 2)}
          </pre>
          
          {status === 'success' && result.adminUserExists && (
            <p className="mt-2 text-sm text-green-400">
              ✅ Admin user found! You can login with password: <code className="bg-gray-800 px-2 py-1 rounded">admin123</code>
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
