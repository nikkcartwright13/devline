import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ka from "./locales/ka.json";
import en from "./locales/en.json";
import de from "./locales/de.json";
import pl from "./locales/pl.json";

// Language is driven entirely by the URL (see src/lib/langRouting.js and
// pages/_app.js), never by browser locale or geolocation — each language has
// its own crawlable path so search engines can index every version.
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ka: { translation: ka },
      en: { translation: en },
      de: { translation: de },
      pl: { translation: pl },
    },
    lng: "ka",
    fallbackLng: "ka",
    supportedLngs: ["ka", "en", "de", "pl"],
    interpolation: { escapeValue: false },
  });

export default i18n;
