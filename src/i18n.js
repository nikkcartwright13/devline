import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ka from "./locales/ka.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import de from "./locales/de.json";
import pl from "./locales/pl.json";

// Language is driven entirely by the URL (see src/lib/langRouting.js and
// src/index.js), never by browser locale or geolocation — each language has
// its own crawlable path so search engines can index every version.
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ka: { translation: ka },
      en: { translation: en },
      ru: { translation: ru },
      de: { translation: de },
      pl: { translation: pl },
    },
    lng: "ka",
    fallbackLng: "ka",
    // "ru" has no routed URL while the language switch for it is disabled;
    // the resource stays loaded so it still renders for any stale deep link.
    supportedLngs: ["ka", "en", "de", "pl", "ru"],
    interpolation: { escapeValue: false },
  });

export default i18n;
