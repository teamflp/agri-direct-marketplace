import React from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
import { initializeTracking, disableTracking } from "@/lib/tracking";

const CookieConsentBanner = () => {
  const handleAccept = () => {
    initializeTracking();
  };

  const handleDecline = () => {
    disableTracking();
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="J'accepte"
      declineButtonText="Je refuse"
      cookieName="agrimarketCookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      declineButtonStyle={{ fontSize: "13px" }}
      expires={150}
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
    >
      Ce site utilise des cookies pour améliorer l'expérience utilisateur.{" "}
      <span style={{ fontSize: "10px" }}>
        Consultez notre{" "}
        <Link to="/legal/cookies" style={{ color: "#FBBF24" }}>
          politique de cookies
        </Link>
        .
      </span>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
