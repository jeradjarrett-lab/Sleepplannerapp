import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';

export function DatabaseStatus() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkDatabase = async () => {
    setLoading(true);
    setError(null);
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
      console.log('Database status:', data);
      setStatus(data);
    } catch (err) {
      console.error('Database check error:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkDatabase();
  }, []);

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl">Database Status</h2>
        <Button
          onClick={checkDatabase}
          disabled={loading}
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-white/60" />
          <p className="text-white/60 mt-2">Checking database...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-200 font-medium mb-1">Connection Error</p>
              <p className="text-red-200/70 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && status && (
        <div className="space-y-3">
          <StatusRow
            label="Database Connection"
            status={status.status === 'ok'}
            details={status.database}
          />
          <StatusRow
            label="Admin User Table"
            status={status.adminUserExists !== undefined}
            details={status.adminUserExists ? 'User exists' : 'No user found'}
          />
          <StatusRow
            label="Config Table"
            status={status.configExists !== undefined}
            details={status.configExists ? 'Config exists' : 'No config yet'}
          />
          <StatusRow
            label="Tables Working"
            status={status.tablesWorking}
            details={status.message}
          />

          {status.status === 'error' && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-200 text-sm font-mono">{status.error}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function StatusRow({ label, status, details }: { label: string; status: boolean; details: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <div className="flex items-center gap-3">
        {status ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )}
        <span className="text-white">{label}</span>
      </div>
      <span className="text-white/60 text-sm">{details}</span>
    </div>
  );
}
