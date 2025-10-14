// src/components/CookieConsent.jsx
import React, { useEffect, useState } from "react";

const COOKIE_NAME = "cookie_consent"; // values: "true" | "false" | absent

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; samesite=strict`;
}

export default function CookieConsent({ onAccept, onDecline, rememberDecline = true }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = /(^|; )cookie_consent=true(;|$)/.test(document.cookie);
    const hasDeclined = /(^|; )cookie_consent=false(;|$)/.test(document.cookie);
    if (!hasConsent && !(rememberDecline && hasDeclined)) setVisible(true);
  }, [rememberDecline]);

  const accept = () => {
    setCookie(COOKIE_NAME, "true", 365);
    setVisible(false);
    if (onAccept) onAccept();
  };

  const decline = () => {
    if (rememberDecline) setCookie(COOKIE_NAME, "false", 365);
    setVisible(false);
    if (onDecline) onDecline();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

      <div
        className="pointer-events-auto fixed bottom-6 left-1/2 transform -translate-x-1/2
                   flex items-center gap-4 p-1 z-50"
        role="dialog"
        aria-label="Cookie consent"
      >
        <button
          onClick={accept}
          aria-label="Accept cookies"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center
                     font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Yes
        </button>

        <button
          onClick={decline}
          aria-label="Decline cookies"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center
                     font-semibold shadow-md hover:scale-105 transition-transform"
        >
          No
        </button>
      </div>
    </div>
  );
}
