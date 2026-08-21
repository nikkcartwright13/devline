import { useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/router";
import i18n from "../src/i18n";
import { langFromPathname } from "../src/lib/langRouting";
import { initThemeMode } from "../src/lib/themeMode";
import Layout from "../src/components/layout/Layout";
import "../src/styles/animations.css";
import "../src/index.css";

// router.pathname is the matched route pattern (e.g. "/en/services/[slug]",
// or "/404" for the shared not-found page) — it's what static generation
// used to decide the language for this exact page, and it stays correct on
// the client too regardless of what URL the visitor actually typed (unlike
// router.asPath, which for an unmatched path reflects the real browser URL
// and would disagree with whatever "/404" was pre-rendered as).
function useLangFromRoute() {
  const router = useRouter();
  const lang = langFromPathname(router.pathname);
  const isFirstRender = useRef(true);

  // Safe to mutate i18n synchronously, mid-render, only on the very first
  // render of this component instance — that covers both the Node.js SSG
  // pass and the client's initial hydration pass, and in both cases nothing
  // else is mounted yet to react to the change mid-render. On every render
  // after that (client-side route changes), isFirstRender.current has
  // already been flipped by the effect below, so this is skipped and the
  // effect handles it instead — never mutating shared i18next state while
  // some other already-mounted component (e.g. LangSuggestionBanner) is
  // rendering, which React otherwise warns about.
  if (isFirstRender.current && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang);
  }

  useLayoutEffect(() => {
    isFirstRender.current = false;
    if (i18n.resolvedLanguage !== lang) i18n.changeLanguage(lang);
  }, [lang]);
}

export default function App({ Component, pageProps }) {
  useLangFromRoute();

  useEffect(() => {
    initThemeMode();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
