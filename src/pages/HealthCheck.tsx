import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import logger from '@/services/logger-service';

const HealthCheck = () => {
  const [status, setStatus] = useState<'loading' | 'healthy' | 'unhealthy'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        // This is a simple query to check if we can connect to the database.
        // We are selecting a single row from the 'profiles' table.
        // In a real-world scenario, you might want a dedicated health_check table.
        const { error } = await supabase.from('profiles').select('id').limit(1);

        if (error) {
          throw error;
        }

        setStatus('healthy');
        logger.info('Health check: Supabase connection is healthy.');
      } catch (e: any) {
        setStatus('unhealthy');
        setError(e.message);
        logger.error({ error: e }, 'Health check: Supabase connection failed.');
      }
    };

    checkSupabaseConnection();
  }, []);

  // Note: This component renders a UI, but for a programmatic health check,
  // you would typically configure your server to respond with a specific
  // HTTP status code based on the health check result.
  // For a client-side app like this, this page can be used for manual checks
  // or by a monitoring service that can render JavaScript.

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Application Health Check</h1>
      <p>
        Status:
        <span style={{ color: status === 'healthy' ? 'green' : status === 'unhealthy' ? 'red' : 'orange' }}>
          {status.toUpperCase()}
        </span>
      </p>
      {error && (
        <div>
          <h2>Error Details:</h2>
          <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            {error}
          </pre>
        </div>
      )}
      {status === 'healthy' && <p>All systems operational.</p>}
    </div>
  );
};

export default HealthCheck;
