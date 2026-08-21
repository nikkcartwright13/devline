import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { T, body } from "../../theme";
import { langFromPathname } from "../../lib/langRouting";
import Header from "./Header";
import Footer from "./Footer";
import ScrollManager from "./ScrollManager";
import CookieConsentBanner from "../ui/CookieConsentBanner";
import LangSuggestionBanner from "../ui/LangSuggestionBanner";

// The URL is the single source of truth for language: every route lives
// under its own path (/, /en/*, /de/*, /pl/*), so switching routes must
// keep i18next's active language in lockstep for both content and <html lang>.
function useLangFromUrl() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const lang = langFromPathname(pathname);

  useLayoutEffect(() => {
    if (i18n.resolvedLanguage !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);
}

export default function Layout() {
  useLangFromUrl();

  return (
    <div style={{ ...body, background: T.base, color: T.ink, minHeight: "100vh" }}>
      <ScrollManager />
      <LangSuggestionBanner />
      <Header />
      <Outlet />
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
