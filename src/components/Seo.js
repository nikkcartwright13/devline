import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://devline.digital";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Devline.digital",
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  email: "hello@devline.digital",
  address: { "@type": "PostalAddress", addressLocality: "Tbilisi", addressCountry: "GE" },
};

export default function Seo({ title, description, jsonLd }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const siteName = t("meta.siteName");
  const desc = description || t("meta.defaultDescription");
  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — ${t("meta.defaultTitleSuffix")}`;
  const lang = i18n.resolvedLanguage || i18n.language || "ka";
  const canonical = `${SITE_URL}${pathname}`;
  const extraSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <script type="application/ld+json">{JSON.stringify(ORGANIZATION_JSON_LD)}</script>
      {extraSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}
