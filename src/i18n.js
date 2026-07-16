import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ka from "./locales/ka.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import de from "./locales/de.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ka: { translation: ka },
      en: { translation: en },
      ru: { translation: ru },
      de: { translation: de },
    },
    fallbackLng: "ka",
    supportedLngs: ["ka", "en", "ru", "de"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "devline-lang",
      caches: ["localStorage"],
    },
  });

export default i18n;
