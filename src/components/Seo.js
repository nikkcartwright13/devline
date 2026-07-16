import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function Seo({ title, description }) {
  const { t, i18n } = useTranslation();
  const siteName = t("meta.siteName");
  const desc = description || t("meta.defaultDescription");
  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — ${t("meta.defaultTitleSuffix")}`;
  const lang = i18n.resolvedLanguage || i18n.language || "ka";

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
