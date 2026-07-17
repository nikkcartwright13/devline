const LANG_KEY = "devline-lang";
const GEO_API = "https://ipwho.is/";

function languageForCountry(countryCode) {
  return countryCode === "GE" ? "ka" : "en";
}

// Only runs for first-time visitors (no saved language preference yet).
// Detects the visitor's country from their IP and sets Georgian for Georgia,
// English everywhere else. Fails silently and keeps the existing
// navigator-based language if the lookup doesn't succeed in time.
export async function applyGeoLanguage(i18n) {
  if (localStorage.getItem(LANG_KEY)) return;

  try {
    const res = await fetch(GEO_API);
    if (!res.ok) return;
    const data = await res.json();
    if (!data || data.success === false || !data.country_code) return;

    const lang = languageForCountry(data.country_code);
    await i18n.changeLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Network/geo lookup failed — keep whatever language was already detected.
  }
}
