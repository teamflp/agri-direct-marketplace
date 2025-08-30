import { getCookieConsentValue } from "react-cookie-consent";
import { onCLS, onINP, onLCP, Metric } from 'web-vitals';
import logger from '@/services/logger-service';

function sendToAnalytics(metric: Metric) {
  // In a real application, you would send this data to your analytics service.
  // For example, using Google Analytics:
  // gtag('event', metric.name, {
  //   value: metric.delta,
  //   // The `id` value will be unique to the current page load. When sending
  //   // multiple values from the same page (e.g. for CLS), it's useful to
  //   // include this value so you can associate them on the back-end.
  //   id: metric.id,
  // });

  // For now, we'll just log to the console.
  logger.info({ metric }, `[Web Vitals] ${metric.name}`);
}

export const initializeTracking = () => {
  const consent = getCookieConsentValue("agrimarketCookieConsent");
  if (consent === "true") {
    logger.info("Tracking consented. Initializing Core Web Vitals reporting...");
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);

    logger.info("Initializing Google Analytics (placeholder)...");
    // In a real application, you would add your Google Analytics script here.
    // For example:
    // const script = document.createElement("script");
    // script.src = "https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID";
    // script.async = true;
    // document.head.appendChild(script);
  }
};

export const disableTracking = () => {
  logger.warn("Tracking is disabled.");
  // In a real application, you would add logic here to disable tracking.
  // This might involve removing cookies or telling analytics libraries to opt-out.
};
