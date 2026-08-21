import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { LANGS, langFromPathname, localizePath, stripLangPrefix } from "../lib/langRouting";

const SITE_URL = "https://devline.digital";

// og:locale expects language_TERRITORY, not a bare i18next language code.
const OG_LOCALE = { ka: "ka_GE", en: "en_US", ru: "ru_RU", de: "de_DE", pl: "pl_PL" };

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Devline.digital",
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  email: "hello@devline.digital",
  areaServed: "Worldwide",
};

export default function Seo({ title, description, jsonLd, noindex }) {
  const { t } = useTranslation();
  const router = useRouter();
  // router.pathname is the matched route pattern (e.g. "/en/services/[slug]"),
  // not the raw browser URL — deliberately not router.asPath. asPath reflects
  // whatever the visitor actually typed, which for the shared static 404 page
  // can be anything and would then disagree with what was pre-rendered at
  // build time for "/404", causing a hydration mismatch on every mismatched
  // 404 visit. Swapping in query params keeps dynamic segments resolved.
  const pathname = Object.entries(router.query).reduce(
    (p, [key, value]) => p.replace(`[${key}]`, value),
    router.pathname
  );
  const siteName = t("meta.siteName");
  const desc = description || t("meta.defaultDescription");
  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — ${t("meta.defaultTitleSuffix")}`;
  const lang = langFromPathname(pathname);
  const barePath = stripLangPrefix(pathname);
  const canonical = `${SITE_URL}${localizePath(barePath, lang)}`;
  const ogImage = `${SITE_URL}/og-image.jpg`;
  const extraSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />
      {!noindex && LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${SITE_URL}${localizePath(barePath, l)}`} />
      ))}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizePath(barePath, "ka")}`} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={OG_LOCALE[lang] || "en_US"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
      {extraSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </Head>
  );
}
