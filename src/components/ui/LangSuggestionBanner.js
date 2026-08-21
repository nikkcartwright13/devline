import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { T, GRAD, display } from "../../theme";
import { detectLanguageFromGeo } from "../../lib/geoLanguage";
import { langFromPathname, localizePath, stripLangPrefix } from "../../lib/langRouting";

const DISMISS_KEY = "devline-lang-banner-dismissed";

// A dismissible suggestion only — never an automatic redirect. Auto-redirecting
// by perceived location/IP would also redirect crawlers, hiding the other
// language versions of the site from search engines entirely.
export default function LangSuggestionBanner() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = router.asPath.split(/[?#]/)[0];
  const [suggested, setSuggested] = useState(null);
  const currentLang = langFromPathname(pathname);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    let cancelled = false;
    detectLanguageFromGeo().then((lang) => {
      if (!cancelled && lang && lang !== currentLang) setSuggested(lang);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!suggested) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setSuggested(null);
  };

  const targetHref = localizePath(stripLangPrefix(pathname), suggested);
  const messageKey = suggested === "ka" ? "langBanner.suggestKa" : "langBanner.suggestEn";

  return (
    <div
      className="dl-fade-in px-5"
      style={{
        background: T.panel, borderBottom: `1px solid ${T.border}`, padding: "10px 0",
        display: "flex", justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "center", maxWidth: 900 }}>
        <p style={{ margin: 0, fontSize: 13, color: T.muted }}>{t(messageKey)}</p>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Link
            href={targetHref}
            onClick={dismiss}
            className="dl-btn"
            style={{ ...display, fontSize: 12.5, fontWeight: 600, color: "#fff", background: GRAD, borderRadius: 999, padding: "7px 14px", textDecoration: "none" }}
          >
            {t("langBanner.switch")}
          </Link>
          <button
            onClick={dismiss}
            style={{ ...display, fontSize: 12.5, fontWeight: 600, color: T.ink, background: "none", border: `1px solid ${T.border}`, borderRadius: 999, padding: "7px 14px", cursor: "pointer" }}
          >
            {t("langBanner.dismiss")}
          </button>
        </div>
      </div>
    </div>
  );
}
