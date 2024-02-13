import en from "@/languages/en";
import id from "@/languages/id";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "id",
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    interpolation: { escapeValue: false },
  });

i18n.services.formatter?.add("lowercase", (value) => {
  return value.toLowerCase();
});

export default i18n;
