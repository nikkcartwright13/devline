const GEO_API = "https://ipwho.is/";

function languageForCountry(countryCode) {
  return countryCode === "GE" ? "ka" : "en";
}

// Looks up the visitor's likely language from their IP. Never mutates i18n
// or the URL itself — Google explicitly advises against auto-redirecting by
// perceived location, since it can hide a page's other-language version from
// crawlers entirely. Callers (LangSuggestionBanner) use this only to offer a
// dismissible "view in X" link.
export async function detectLanguageFromGeo() {
  try {
    const res = await fetch(GEO_API);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.success === false || !data.country_code) return null;
    return languageForCountry(data.country_code);
  } catch {
    return null;
  }
}
