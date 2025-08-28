import { getCookieConsentValue } from "react-cookie-consent";

export const initializeTracking = () => {
  const consent = getCookieConsentValue("agrimarketCookieConsent");
  if (consent === "true") {
    console.log("Tracking is enabled. Initializing Google Analytics...");
    // In a real application, you would add your Google Analytics script here.
    // For example:
    // const script = document.createElement("script");
    // script.src = "https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID";
    // script.async = true;
    // document.head.appendChild(script);
  }
};

export const disableTracking = () => {
  console.log("Tracking is disabled.");
  // In a real application, you would add logic here to disable tracking.
  // This might involve removing cookies or telling analytics libraries to opt-out.
};
