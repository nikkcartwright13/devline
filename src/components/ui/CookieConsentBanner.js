import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { T, GRAD, display } from "../../theme";
import { getStoredConsent, grantConsent, denyConsent, initAnalyticsIfConsented, isAnalyticsConfigured } from "../../lib/analytics";

export default function CookieConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;
    const stored = getStoredConsent();
    if (stored === "granted") initAnalyticsIfConsented();
    else if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="dl-fade-in px-5"
      style={{ position: "fixed", left: 0, right: 0, bottom: 16, zIndex: 200 }}
    >
      <div
        className="dl-card"
        style={{
          maxWidth: 720, margin: "0 auto", background: T.panel, border: `1px solid ${T.border}`,
          borderRadius: 16, padding: "18px 22px", boxShadow: "0 20px 50px rgba(16,26,51,.18)",
          display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
        }}
      >
        <p style={{ margin: 0, fontSize: 13.5, color: T.muted, flex: "1 1 260px", lineHeight: 1.6 }}>
          {t("cookieConsent.text")}
        </p>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            onClick={() => { denyConsent(); setVisible(false); }}
            style={{ ...display, fontSize: 13.5, fontWeight: 600, color: T.ink, background: "none", border: `1px solid ${T.border}`, borderRadius: 999, padding: "10px 18px", cursor: "pointer" }}
          >
            {t("cookieConsent.decline")}
          </button>
          <button
            onClick={() => { grantConsent(); setVisible(false); }}
            className="dl-btn"
            style={{ ...display, fontSize: 13.5, fontWeight: 600, color: "#fff", background: GRAD, border: "none", borderRadius: 999, padding: "10px 18px", cursor: "pointer" }}
          >
            {t("cookieConsent.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
