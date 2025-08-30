import * as Sentry from "@sentry/react";

export function initializeSentry() {
  // In a real application, you should get these values from environment variables
  const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
  const APP_ENV = import.meta.env.MODE || 'development';

  if (!SENTRY_DSN) {
    console.warn("Sentry DSN not found. Sentry will not be initialized.");
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      }),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    environment: APP_ENV,
    // Release versioning
    release: `agrimarket@${import.meta.env.VITE_APP_VERSION}`,
  });

  console.log("Sentry initialized");
}
