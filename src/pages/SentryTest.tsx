import * as Sentry from "@sentry/react";
import { Button } from "@/components/ui/button";
import logger from "@/services/logger-service";

const SentryTest = () => {
  const handleManualError = () => {
    try {
      throw new Error("This is a test error from the Sentry Test page.");
    } catch (error) {
      logger.error({ error }, "Manually captured error for Sentry");
      Sentry.captureException(error);
    }
  };

  const handleUncaughtError = () => {
    logger.warn("Throwing an uncaught error to test Sentry's automatic capturing.");
    // This will be caught by Sentry's global error handler
    throw new Error("This is an uncaught test error.");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Sentry Alert Test Page</h1>
      <p>
        Use these buttons to test your Sentry integration and alerting setup.
      </p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button onClick={handleManualError}>
          Trigger Manually Captured Error
        </Button>
        <Button variant="destructive" onClick={handleUncaughtError}>
          Trigger Uncaught Error
        </Button>
      </div>
      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
        After clicking a button, you should see an issue appear in your Sentry project dashboard shortly.
        Depending on your Sentry alert settings, you should also receive a notification (e.g., by email).
      </p>
    </div>
  );
};

export default SentryTest;
